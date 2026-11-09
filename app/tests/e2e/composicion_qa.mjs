// QA de navegador real: Chromium + Vite + paquete editorial y assets de GitHub.
// Ejecutar: node app/tests/e2e/composicion_qa.mjs etiqueta http://127.0.0.1:1420 [clasica|v2]
// Las capturas son PNG reales. El JSON separa medidas, incidencias y pruebas no cubiertas.
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const [label = 'after', origin = 'http://127.0.0.1:1420', tipo = 'clasica'] = process.argv.slice(2);
const salida = path.resolve(process.env.QA_OUTPUT || 'qa-resultados');
await fs.mkdir(salida, {recursive: true});
const resoluciones = [[1920,1080],[1366,768],[1280,800]];
const escalas = ['medio','grande','muy_grande'];
const browser = await chromium.launch({headless:true, args:['--no-sandbox']});
const registros = [];

async function sesion(w,h,escala,modo) {
  const context = await browser.newContext({viewport:{width:w,height:h}, deviceScaleFactor:1, reducedMotion:'reduce'});
  await context.addInitScript((t) => {
    localStorage.setItem('quijote.ajustes', JSON.stringify({texto:t,movimiento:'reducido'}));
  }, escala);
  const page = await context.newPage();
  const id = [label,tipo,modo,w+'x'+h,escala].join('-');
  const reg = {id, viewport:{width:w,height:h}, escala, modo,estado:'PENDIENTE',errores:[]};
  try {
    await page.goto(origin,{waitUntil:'domcontentloaded',timeout:40000});
    await page.getByRole('button',{name: modo === 'historia'?/Modo Historia/:modo==='museo'?/Museo/:/Modo Aventura/}).first().click({timeout:20000});
    const selector = modo==='aventura'?'.panel-pregunta, .an-panel':modo==='historia'?'.banda-texto.visible':'.museo';
    await page.waitForSelector(selector,{timeout:24000,state:'visible'});
    await page.waitForTimeout(1700);
    reg.metricas = await page.evaluate((modo) => {
      const sel=modo==='aventura'?'.panel-pregunta, .an-panel':modo==='historia'?'.banda-texto.visible':'.museo-visor, .museo';
      const nodo=document.querySelector(sel);
      const r=nodo?.getBoundingClientRect();
      const vis=n => {
        const b=n.getBoundingClientRect(), s=getComputedStyle(n);
        return b.width>0&&b.height>0&&s.display!=='none'&&s.visibility!=='hidden'&&b.top>=-1&&b.left>=-1&&b.right<=innerWidth+1&&b.bottom<=innerHeight+1;
      };
      const opciones=[...document.querySelectorAll('.opcion,.an-opcion')];
      const image=document.querySelector('.plano.activo,.an-obra img,.museo-visor img');
      const ir=image?.getBoundingClientRect();
      const imcs=image?getComputedStyle(image):null;
      const s=nodo?getComputedStyle(nodo):null;
      const ratio=(a,b)=>b?Math.round(a/b*10000)/100:null;
      const imW=image?.naturalWidth||0, imH=image?.naturalHeight||0;
      const cajaW=ir?.width||0, cajaH=ir?.height||0;
      const ajuste=imcs?.objectFit||null;
      const escalaImg=imW&&imH?(ajuste==='cover'?Math.max(cajaW/imW,cajaH/imH):Math.min(cajaW/imW,cajaH/imH)):0;
      const realW=imW*escalaImg,realH=imH*escalaImg;
      const viewportArea=innerWidth*innerHeight;
      const visibles=opciones.map((x,i)=>({i,texto:x.textContent?.trim().slice(0,90),visible:vis(x),alto:Math.round(x.getBoundingClientRect().height)}));
      return {
        hayPanel:Boolean(nodo), panel:{ancho:Math.round(r?.width||0),alto:Math.round(r?.height||0),
          ocupacionViewportPct:ratio((r?.width||0)*(r?.height||0),viewportArea),
          proporcionAlturaViewportPct:ratio((r?.height||0),innerHeight),
          top:Math.round(r?.top||0),bottom:Math.round(r?.bottom||0),
          scrollHeight:nodo?.scrollHeight??null,clientHeight:nodo?.clientHeight??null,
          scrollWidth:nodo?.scrollWidth??null,clientWidth:nodo?.clientWidth??null,
          overflowY:s?.overflowY??null,overflowX:s?.overflowX??null},
        imagen:{cargada:Boolean(image?.complete&&imW>0),anchoOriginal:imW,altoOriginal:imH,
          objectFit:ajuste,anchoCaja:Math.round(cajaW),altoCaja:Math.round(cajaH),
          anchoDibujado:Math.round(realW),altoDibujado:Math.round(realH),
          superficieDibujadaPct:ratio(Math.min(cajaW,realW)*Math.min(cajaH,realH),viewportArea),
          perdidaPorCoverPct:ajuste==='cover'?ratio((realW*realH-cajaW*cajaH),realW*realH):0},
        opciones:visibles,alternativasSimultaneas:visibles.every(o=>o.visible),
        vistaDedicada:Boolean(document.querySelector('.cine.vista-dedicada')),
        opcionFontPx:opciones[0]?Number.parseFloat(getComputedStyle(opciones[0]).fontSize):null,
        scrollPagina:document.scrollingElement?.scrollHeight>innerHeight+2,
        overlayConScroll:Boolean(nodo&&s&&(s.overflowY==='auto'||s.overflowY==='scroll')&&nodo.scrollHeight>nodo.clientHeight+2),
        textoPreferencia:document.documentElement.dataset.ajusteTexto??null
      };
    },modo);
    reg.estado='MEDIDO';
    await page.screenshot({path:path.join(salida,id+'.png'),fullPage:true,animations:'disabled'});

    if(modo==='museo'){
      // No confundir la portada y las miniaturas de selección con el visor de obra.
      await page.locator('.museo-destacada').first().click({timeout:12000});
      await page.waitForSelector('.museo-obra-img',{state:'visible',timeout:15000});
      await page.waitForFunction(() => document.querySelector('.museo-obra-img')?.naturalWidth>0,
        {timeout:10000});
      reg.museoVisor=await page.evaluate(()=>{
        const img=document.querySelector('.museo-obra-img');
        const obra=document.querySelector('.museo-obra');
        const b=img.getBoundingClientRect();
        return {cargada:img.complete&&img.naturalWidth>0,
          anchoOriginal:img.naturalWidth,altoOriginal:img.naturalHeight,
          objectFit:getComputedStyle(img).objectFit,
          anchoCaja:Math.round(b.width),altoCaja:Math.round(b.height),
          fichaScrollable:Boolean(document.querySelector('.museo-ficha') &&
            document.querySelector('.museo-ficha').scrollHeight>document.querySelector('.museo-ficha').clientHeight),
          obraVisible:Boolean(obra&&obra.getBoundingClientRect().width>0)};
      });
      await page.screenshot({path:path.join(salida,id+'-visor.png'),animations:'disabled'});
      if(reg.museoVisor.objectFit!=='contain'||!reg.museoVisor.cargada)throw Error('Visor de obra sin contain o asset');
      await page.getByRole('button',{name:'Ver la obra completa (ampliar)'}).click({timeout:6000});
      await page.waitForSelector('.museo-completa',{state:'visible',timeout:6000});
      await page.screenshot({path:path.join(salida,id+'-obra-completa.png'),animations:'disabled'});
      await page.keyboard.press('Escape');
      await page.waitForSelector('.museo-completa',{state:'hidden',timeout:6000});
      reg.museoVisor.escCierraZoom=true;
    }

    if (modo==='aventura' && w===1366 && escala==='medio') {
      reg.recorrido=[];
      // Capturas de cada pregunta accesible: llegar al hotspot Q112 sin saltar restricciones antispoiler.
      for(let i=0;i<12;i++){
        const pantalla=await page.evaluate(() => ({
          enunciado:document.querySelector('.enunciado,.an-pregunta')?.textContent?.slice(0,120),
          opciones:[...document.querySelectorAll('.opcion,.an-opcion')].map(x=>({
            texto:x.textContent?.slice(0,100),r:(()=>{const b=x.getBoundingClientRect();return {top:b.top,bottom:b.bottom}})()
          })),
          estado:document.querySelector('.cine')?.className||document.querySelector('.aventura-n2')?.className
        }));
        reg.recorrido.push(pantalla);
        if(i<10)await page.screenshot({path:path.join(salida,id+'-ronda-'+i+'.png'),animations:'disabled'});
        const opcion=page.locator('.opcion,.an-opcion').first();
        if(await opcion.count()===0)break;
        await opcion.click({timeout:5000});
        await page.waitForTimeout(150);
        const comprobar=page.getByRole('button',{name:/Comprobar/});
        if(await comprobar.count()>0)await comprobar.first().click();
        const next=page.getByRole('button',{name:/Seguir adelante|Descubrir qué sucede|Siguiente decisión|Continuar aventura|Completar hazaña|Volver al checkpoint/}).first();
        if(await next.count()===0)break;
        await next.click({timeout:5000});
        if(tipo==='v2'){
          const next2=page.getByRole('button',{name:/Siguiente decisión|Continuar aventura|Completar hazaña|Volver al checkpoint/}).first();
          if(await next2.count()>0)await next2.click({timeout:5000});
        }
        await page.waitForTimeout(250);
      }
    }
    if(modo==='historia'&&w===1366&&escala==='medio'){
      const boton=page.getByRole('button',{name:/Siguiente intervención/});
      for(let n=0;n<4;n++){if(await boton.isEnabled())await boton.click();await page.waitForTimeout(300);}
      await page.screenshot({path:path.join(salida,id+'-avance.png'),animations:'disabled'});
    }
  } catch (error) {
    reg.estado='ERROR';reg.errores.push(String(error).slice(0,800));
    try{await page.screenshot({path:path.join(salida,id+'-error.png'),fullPage:true});}catch{}
  }
  registros.push(reg);
  await context.close();
}
try{
 for(const [w,h] of resoluciones){
   for(const t of escalas){
     await sesion(w,h,t,'aventura');
     if(label.startsWith('despues'))await sesion(w,h,t,'historia');
   }
 }
 if(label.startsWith('despues'))await sesion(1366,768,'muy_grande','museo');
} finally { await browser.close(); }
const escalasInsuficientes=[];
for(const [w,h] of resoluciones) {
  const rows=registros.filter(x=>x.modo==='aventura'&&x.estado==='MEDIDO'&&x.viewport.width===w&&x.viewport.height===h);
  const medio=rows.find(x=>x.escala==='medio')?.metricas.opcionFontPx;
  const enorme=rows.find(x=>x.escala==='muy_grande')?.metricas.opcionFontPx;
  if(medio&&enorme&&enorme/medio<1.25)escalasInsuficientes.push({ancho:w,alto:h,ratio:Math.round(enorme/medio*100)/100});
}
const total=registros.length;
const fallo=registros.filter(x=>x.estado!=='MEDIDO');
const precaucion=registros.filter(x=>x.estado==='MEDIDO'&&x.modo==='aventura'&&
  ( (x.metricas.panel.proporcionAlturaViewportPct>42 && x.metricas.panel.ancho>x.viewport.width*.70)
    || x.metricas.panel.ocupacionViewportPct>=x.metricas.imagen.superficieDibujadaPct*.95
    || x.metricas.imagen.superficieDibujadaPct<35
    || !x.metricas.alternativasSimultaneas || x.metricas.overlayConScroll || x.metricas.vistaDedicada));
const resumen={label,tipo,origin,total,medidos:total-fallo.length,errores:fallo.map(x=>x.id),escalasInsuficientes,
  precauciones:precaucion.map(x=>({id:x.id,panelAlturaPct:x.metricas.panel.proporcionAlturaViewportPct,
    areaPanelPct:x.metricas.panel.ocupacionViewportPct,
    areaImagenPct:x.metricas.imagen.superficieDibujadaPct,
    alternativas:x.metricas.alternativasSimultaneas,scroll:x.metricas.overlayConScroll, dedic:x.metricas.vistaDedicada})),registros};
await fs.writeFile(path.join(salida,label+'-'+tipo+'-metricas.json'),JSON.stringify(resumen,null,2));
console.log('QA_BROWSER_RESULT='+JSON.stringify({total:resumen.total,medidos:resumen.medidos,errores:resumen.errores,escalasInsuficientes:resumen.escalasInsuficientes,precauciones:resumen.precauciones}));
if(fallo.length||precaucion.length||escalasInsuficientes.length)process.exitCode=1;
