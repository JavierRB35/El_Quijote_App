import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const [tipo='clasica', origen='http://127.0.0.1:1420', etiqueta='profundo']=process.argv.slice(2);
const esV2=tipo==='v2';
const rondas=esV2?(await import('../../src/aventura/guionNarrativo.ts')).RONDAS_AVENTURA:[];
const dir=path.resolve(process.env.QA_OUTPUT||'qa-resultados');
await fs.mkdir(dir,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const pruebas=[];
const anotar=(nombre,pass,detalle)=>pruebas.push({nombre,estado:pass?'PASS':'FAIL',detalle});
const selector=esV2?'.an-opcion':'.opcion';

async function original(page,nombre){
 const img=page.locator('.plano.activo,.an-obra img').first();
 try{
   const data=await img.evaluate(async (el)=>{
      const res=await fetch(el.currentSrc);
      if(!res.ok)throw Error('HTTP '+res.status);
      const blob=await res.blob();
      return new Promise((ok,err)=>{
        const f=new FileReader();
        f.onload=()=>ok({b64:f.result,tipo:blob.type,width:el.naturalWidth,height:el.naturalHeight});
        f.onerror=()=>err(Error('Fallo FileReader'));
        f.readAsDataURL(blob);
      });
   });
   const ext=data.tipo.includes('webp')?'webp':data.tipo.includes('png')?'png':'jpg';
   await fs.writeFile(path.join(dir,'asset-original-'+etiqueta+'-'+nombre+'.'+ext),Buffer.from(data.b64.split(',')[1],'base64'));
   anotar('Fuente original '+nombre,true,data.width+'x'+data.height+' '+data.tipo);
 }catch(e){anotar('Fuente original '+nombre,false,String(e));}
}

async function verificarLayout(page,etapa){
 const m=await page.evaluate(()=>{
   const p=document.querySelector('.panel-pregunta,.an-panel');
   const botones=[...document.querySelectorAll('.opcion,.an-opcion')];
   const ps=p&&getComputedStyle(p);
   const rect=p?.getBoundingClientRect();
   const todo=botones.every(el=>{
     const r=el.getBoundingClientRect();
     return r.top>=0 && r.left>=0 && r.right<=innerWidth+1 && r.bottom<=innerHeight+1;
   });
   return {botones:botones.length,todo,scroll:Boolean(p&&['auto','scroll'].includes(ps.overflowY)&&p.scrollHeight>p.clientHeight+2),
     vistaDedicada:Boolean(document.querySelector('.vista-dedicada')),altoPanel:Math.round(rect?.height||0)};
 });
 anotar('Composición '+etapa,m.botones>0&&m.todo&&!m.scroll&&!m.vistaDedicada,JSON.stringify(m));
}

async function ejecutar(escala){
 const c=await browser.newContext({viewport:{width:1366,height:768},reducedMotion:'reduce'});
 await c.addInitScript(t=>localStorage.setItem('quijote.ajustes',JSON.stringify({texto:t,movimiento:'reducido'})),escala);
 const page=await c.newPage();
 const prefijo=etiqueta+'-'+tipo+'-'+escala;
 try{
  await page.goto(origen,{waitUntil:'domcontentloaded'});
  await page.getByRole('button',{name:/Modo Aventura/}).click();
  await page.waitForSelector(selector,{state:'visible',timeout:15000});

  // Accesibilidad de Escape dentro de ajustes: no debe abandonar Aventura.
  await page.getByRole('button',{name:/Ajustes de texto y movimiento/}).click({timeout:7000});
  await page.keyboard.press('Escape');
  anotar('Escape y regreso de foco '+escala,await page.locator(selector).count()>0,'Aventura permanece tras cerrar ajustes');

  const total=esV2?9:7;
  for(let i=0;i<total;i++){
    await page.waitForSelector(selector,{state:'visible',timeout:10000});
    await verificarLayout(page,'ronda '+(i+1)+' '+escala);
    if(i===0&&escala==='medio')await original(page,'inicio');
    if(!esV2&&i===6&&escala==='medio')await original(page,'hotspot');
    if((i===0||i===total-1)&&escala==='muy_grande')
      await page.screenshot({path:path.join(dir,prefijo+'-ronda-'+(i+1)+'.png'),animations:'disabled'});

    if(esV2){
      const correcta=rondas[i]?.opciones.find(x=>x.id===rondas[i].correcta)?.texto;
      if(!correcta)throw Error('guion sin respuesta correcta en ronda '+(i+1));
      const btn=page.locator('.an-opcion').filter({hasText:correcta}).first();
      await btn.focus();
      await page.keyboard.press('Enter');
      await page.waitForSelector('.an-primario',{state:'visible'});
      anotar('Teclado v2 ronda '+(i+1)+' '+escala,
        (await page.locator('.an-panel').innerText()).includes('¡Has acertado!'),'Enter produjo resultado correcto');
    }else if(i===6){
      const zona=page.locator('.capa-senal');
      await zona.waitFor({state:'visible',timeout:6000});
      const r=await zona.boundingBox();
      if(!r)throw Error('hotspot sin caja');
      await page.mouse.click(r.x+r.width*.525,r.y+r.height*.47);
      await page.waitForSelector('.feedback-lectura',{state:'visible'});
      anotar('Hotspot real Q112 '+escala,
        (await page.locator('.veredicto').innerText()).includes('Así es.'),'coordenadas dentro de hotspot_area');
    }else{
      await page.locator('.opcion').first().focus();
      await page.keyboard.press('Enter');
      const verificar=page.getByRole('button',{name:'Comprobar'});
      if(await verificar.count())await verificar.click();
      await page.waitForSelector('.feedback-lectura',{state:'visible'});
      anotar('Teclado clásico ronda '+(i+1)+' '+escala,true,'Enter activa alternativa');
    }

    if(i===total-1){await page.screenshot({path:path.join(dir,prefijo+'-final.png'),animations:'disabled'});break;}
    if(esV2){
      await page.getByRole('button',{name:'Descubrir qué sucede'}).click();
      anotar('Consecuencia visible ronda '+(i+1)+' '+escala,await page.locator('.an-consecuencia').isVisible(),'texto íntegro en pantalla');
      await page.getByRole('button',{name:/Siguiente decisión|Completar hazaña|Volver al checkpoint/}).first().click();
      for(let j=0;j<3&&!(await page.locator('.an-opcion').count());j++){
        const btn=page.getByRole('button',{name:/Continuar aventura|Siguiente decisión/}).first();
        if(await btn.count())await btn.click();
      }
    }else{
      await page.getByRole('button',{name:'Seguir adelante'}).click();
    }

    if(i===0){
      await page.waitForTimeout(180);
      const guardado=await page.evaluate(()=>localStorage.getItem('quijote.progreso'));
      anotar('Guardado '+tipo+' '+escala,Boolean(guardado),'persistencia real de desarrollo en localStorage');
      await page.reload({waitUntil:'domcontentloaded'});
      await page.getByRole('button',{name:/Modo Aventura/}).click();
      await page.waitForSelector(selector,{state:'visible'});
      const texto=await page.locator(esV2?'.an-pretitle':'.progreso-texto').first().innerText();
      anotar('Restauración '+tipo+' '+escala,esV2?texto.includes('Decisión 2'):texto.includes('2 / 7'),texto);
    }
  }
 }catch(e){
   anotar('Recorrido completo '+tipo+' '+escala,false,String(e).slice(0,700));
   try{await page.screenshot({path:path.join(dir,prefijo+'-error.png'),fullPage:true});}catch{}
 }
 await c.close();
}
try{for(const escala of ['medio','muy_grande'])await ejecutar(escala);}
finally{await browser.close();}
const fallos=pruebas.filter(x=>x.estado==='FAIL');
await fs.writeFile(path.join(dir,'recorrido-'+etiqueta+'-'+tipo+'.json'),JSON.stringify({pruebas,fallos},null,2));
console.log('QA_PROFUNDO_RESULT='+JSON.stringify({tipo,total:pruebas.length,fallos:fallos.map(x=>x.nombre+' '+x.detalle)}));
if(fallos.length)process.exitCode=1;