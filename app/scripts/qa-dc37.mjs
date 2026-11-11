// QA real de la UI, sin recursos sintéticos ni cambios de contenido.
import { chromium } from '@playwright/test';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { nuevaPartida, responder, revelar, continuar } from '../src/aventura/motorNarrativo.ts';

const root = resolve(import.meta.dirname, '../..');
const out = resolve(root, 'docs/qa/dc37/evidencias');
await mkdir(out,{recursive:true});
const json = async p=>JSON.parse(await readFile(resolve(root,p),'utf8'));
const fichas=(await json('content/capitulos/registro.json')).capitulos;
const packageData=await json('content/piloto/package.json');
let count=0;
const chapters=[];
for(const f of fichas) {
  const n=f.capituloId.slice(-2);
  const aventura=await json(`content/aventura/parte_1/capitulo_${n}.json`);
  let historia=[];
  if(n!=='08') {
    const h=await json(`content/historia/parte_1/capitulo_${n}.json`);
    for(const [si,s] of h.escenas.entries()) for(const u of s.intervenciones) {
      const num=String(920000+(++count));
      historia.push({id:u.id,texto:u.texto_visible,progreso:{version:1,episodio_id:f.episodioId,
        escena_id:`${f.episodioId}.S${String(si+1).padStart(2,'0')}`,beat_id:'DQ.BEAT.'+num,
        intervencion_id:'DQ.INT.'+num,avance_automatico:false}});
    }
  } else {
    const beats=await Promise.all(packageData.files.beats.map(p=>json('content/piloto/'+p)));
    beats.sort((a,b)=>a.scene_id.localeCompare(b.scene_id)||a.order-b.order);
    for(const b of beats) for(const u of b.utterances) historia.push({id:u.utterance_id,texto:u.texto_visible,
      progreso:{version:1,episodio_id:f.episodioId,escena_id:b.scene_id,beat_id:b.id,intervencion_id:u.utterance_id,avance_automatico:false}});
  }
  chapters.push({f,aventura,historia});
}
const browser=await chromium.launch({channel:process.env.QA_BROWSER_CHANNEL||'msedge',headless:true});
const context=await browser.newContext({viewport:{width:1366,height:768},reducedMotion:'reduce'});
const page=await context.newPage();
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
// Offline de servicios externos; localhost sirve el paquete real, NO prueba instalador sin red.
await context.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'||route.request().url().startsWith('blob:')?route.continue():route.abort());
await page.goto(process.env.QA_URL||'http://127.0.0.1:1420/');
await page.getByRole('button',{name:/Modo Historia/}).waitFor();
const observations=[];
const key=(mode,f)=>f.capituloId==='DQ.P1.C08'?(mode==='historia'?'quijote.progreso_historia':'quijote.progreso'):`quijote.${mode}.${f.episodioId}`;
async function menu() {
  if(await page.locator('.lienzo-vivo').count()) await page.getByRole('button',{name:/^(Volver al menú \(escape\)|Menú)$/}).click();
}
async function enter(ch,mode,value,size='medio') {
  await menu();
  await page.locator('#selector-capitulo').selectOption(ch.f.capituloId);
  await page.evaluate(({key,value,size})=>{
    localStorage.setItem(key,JSON.stringify(value));
    localStorage.setItem('quijote.ajustes',JSON.stringify({texto:size,movimiento:'reducido'}));
  },{key:key(mode,ch.f),value,size});
  await page.getByRole('button',{name:mode==='historia'?/Modo Historia/:/Modo Aventura/}).click();
  await page.locator('.lv-pergamino').waitFor();
}
async function measure(tag) {
  await page.waitForTimeout(30);
  const result=await page.locator('.lienzo-vivo').evaluate(el=>{
    const p=el.querySelector('.lv-pergamino'), r=p.getBoundingClientRect();
    const s=getComputedStyle(p);
    const outside=[...p.querySelectorAll('p,h1,h2,button')].filter(e=>e.getClientRects().length&&getComputedStyle(e).position!=='absolute').filter(e=>{
      const b=e.getBoundingClientRect();return b.left<r.left-1||b.right>r.right+1||b.top<r.top-1||b.bottom>r.bottom+1;
    }).length;
    return {cabe:el.dataset.cabe==='true',composicion:el.dataset.composicion,
      interno:['auto','scroll','hidden','clip'].includes(s.overflowY),fuera:outside,
      enViewport:r.bottom<=innerHeight-32&&r.right<=innerWidth&&r.top>=0,
      cabeceraLibre:el.querySelector('.lv-cabecera').getBoundingClientRect().bottom<=r.top,
      ancho:innerWidth,alto:innerHeight,fuente:getComputedStyle(p.querySelector('.texto,.an-contexto')||p).fontSize};
  });
  observations.push({...tag,...result});
  return result;
}
// Recorrido íntegro: cada intervención y cada fase de cada ronda.
for(const ch of chapters) {
  await enter(ch,'historia',ch.historia[0].progreso);
  for(const [i,u] of ch.historia.entries()) {
    const actual=await page.locator('.texto').innerText();
    assert.equal(actual.replace(/\s+/g,' ').trim(),u.texto.replace(/\s+/g,' ').trim(),u.id);
    await measure({suite:'integral',modo:'historia',capitulo:ch.f.capituloId,id:u.id});
    if(i+1<ch.historia.length) await page.getByRole('button',{name:'Siguiente intervención (enter)'}).click();
  }
  await page.getByRole('button',{name:'Ver cierre del episodio',exact:true}).click();
  await measure({suite:'integral',modo:'historia',capitulo:ch.f.capituloId,id:'cierre'});
  await page.getByRole('button',{name:'Atrás (flecha izquierda)',exact:true}).click();
  assert.equal((await page.locator('.texto').innerText()).replace(/\s+/g,' ').trim(),ch.historia.at(-1).texto.replace(/\s+/g,' ').trim());
  let partida=nuevaPartida(0,ch.f.episodioId);
  await enter(ch,'aventura',{version:2,episodio:ch.f.episodioId,partida});
  for(const r of ch.aventura.rondas) {
    assert.equal(await page.locator('.an-opcion').count(),r.opciones.length);
    assert.equal((await page.locator('.an-contexto').innerText()).trim(),r.contexto);
    await measure({suite:'integral',modo:'aventura',capitulo:ch.f.capituloId,id:r.id,fase:'pregunta'});
    await page.getByRole('button',{name:new RegExp(r.opciones.find(o=>o.id===r.correcta).texto.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))}).click();
    partida=responder(partida,r,r.correcta);
    await measure({suite:'integral',modo:'aventura',capitulo:ch.f.capituloId,id:r.id,fase:'resultado'});
    await page.getByRole('button',{name:'Descubrir qué sucede',exact:true}).click();
    partida=revelar(partida);
    await measure({suite:'integral',modo:'aventura',capitulo:ch.f.capituloId,id:r.id,fase:'revelacion'});
    assert.equal((await page.locator('.an-consecuencia').innerText()).trim(),r.consecuencia);
    await page.locator('.an-panel .an-primario').click();
    partida=continuar(partida,ch.aventura.rondas);
    if(partida.fase==='checkpoint') {
      await measure({suite:'integral',modo:'aventura',capitulo:ch.f.capituloId,id:r.id,fase:'checkpoint'});
      await page.locator('.an-panel .an-primario').click();
      partida=continuar(partida,ch.aventura.rondas);
    }
  }
  await measure({suite:'integral',modo:'aventura',capitulo:ch.f.capituloId,id:'cierre',fase:'completada'});
  console.log('Recorrido completo',ch.f.capituloId);
}
// Matriz: cinco resoluciones, tres escalas de texto, tres escalas equivalentes
// de viewport. No confundir esta simulación con cambiar el DPI de Windows.
for(const [w,h] of [[1920,1080],[1366,768],[1280,800],[2560,1440],[3840,2160]]) {
  for(const scale of [1,1.25,1.5]) for(const size of ['medio','grande','muy_grande']) {
    await page.setViewportSize({width:Math.floor(w/scale),height:Math.floor(h/scale)});
    for(const ch of chapters) {
      const longest=ch.historia.reduce((a,b)=>a.texto.length>b.texto.length?a:b);
      await enter(ch,'historia',longest.progreso,size);
      await measure({suite:'matriz',modo:'historia',capitulo:ch.f.capituloId,id:longest.id,resolucion:`${w}x${h}`,escala:scale,texto:size});
      const index=ch.aventura.rondas.reduce((best,r,i,arr)=>r.contexto.length+r.pregunta.length+r.opciones.reduce((s,o)=>s+o.texto.length,0)>arr[best].contexto.length+arr[best].pregunta.length+arr[best].opciones.reduce((s,o)=>s+o.texto.length,0)?i:best,0);
      const partida={...nuevaPartida(0,ch.f.episodioId),indice:index};
      await enter(ch,'aventura',{version:2,episodio:ch.f.episodioId,partida},size);
      await measure({suite:'matriz',modo:'aventura',capitulo:ch.f.capituloId,id:ch.aventura.rondas[index].id,resolucion:`${w}x${h}`,escala:scale,texto:size});
    }
  }
  console.log('Matriz completa',w,h);
}
await page.setViewportSize({width:1366,height:768});
const first=chapters[0];
await enter(first,'historia',{...first.historia[2].progreso,avance_automatico:true});
await page.getByRole('button',{name:'Ocultar texto',exact:true}).click();
// Desenfocar el botón: Espacio sobre él significa mostrar texto, como exige teclado.
await page.locator('.lv-imagen').click({position:{x:400,y:650}});
const before=await page.evaluate(k=>localStorage.getItem(k),key('historia',first.f));
await page.keyboard.press('ArrowRight');await page.keyboard.press('r');await page.keyboard.press('Space');
await page.waitForTimeout(3500);
assert.equal(await page.evaluate(k=>localStorage.getItem(k),key('historia',first.f)),before,'avance oculto');
await page.getByRole('button',{name:'Mostrar texto',exact:true}).click();
await page.waitForTimeout(3500);
assert.equal(await page.evaluate(k=>localStorage.getItem(k),key('historia',first.f)),before,'reanuda sola');
await page.getByRole('button',{name:'Continuar (espacio)',exact:true}).waitFor();
await page.screenshot({path:resolve(out,'historia-1366.png')});
await page.getByRole('button',{name:'Ocultar texto',exact:true}).click();
await page.screenshot({path:resolve(out,'contemplacion-1366.png')});
await page.getByRole('button',{name:'Mostrar texto',exact:true}).click();
await enter(first,'aventura',{version:2,episodio:first.f.episodioId,partida:nuevaPartida(0,first.f.episodioId)});
const beforeAdventure=await page.evaluate(k=>localStorage.getItem(k),key('aventura',first.f));
await page.getByRole('button',{name:'Ocultar texto',exact:true}).focus();
await page.keyboard.press('Enter');
assert.equal(await page.locator('.lv-pergamino').isVisible(),false);
await page.keyboard.press('ArrowRight');
await page.keyboard.press('Enter');
assert.equal(await page.locator('.lv-pergamino').isVisible(),true);
assert.equal(await page.evaluate(k=>localStorage.getItem(k),key('aventura',first.f)),beforeAdventure,'partida cambia al contemplar');
await page.screenshot({path:resolve(out,'aventura-1366.png')});
await page.getByRole('button',{name:'Menú',exact:true}).click();
await page.screenshot({path:resolve(out,'menu-1366.png')});
await page.getByRole('button',{name:/Museo · Galería/}).click();
await page.waitForTimeout(500);
await page.screenshot({path:resolve(out,'museo-1366.png')});
const failures=observations.filter(x=>!x.cabe||x.interno||x.fuera||!x.enViewport||!x.cabeceraLibre);
await writeFile(resolve(out,'mediciones.json'),JSON.stringify({entorno:'Microsoft Edge headless Windows; DPI simulado por viewport, NO prueba DPI nativa',
  observaciones:observations,fallos:failures,errores_consola:errors,funcionales:'PASS: texto íntegro, secuencia, contemplación, reanudación explícita, teclado y progreso'},null,2)+'\n');
console.log(JSON.stringify({observaciones:observations.length,fallos_composicion:failures.length,errores_consola:errors}));
await browser.close();
assert.deepEqual(errors,[]);
assert.deepEqual(failures,[], 'desbordamientos: consultar evidencias/mediciones.json');
