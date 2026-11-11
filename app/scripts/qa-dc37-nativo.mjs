// Ejecutar exclusivamente con el binario QA y un perfil WebView2 separado.
// Ver CONFORMIDAD_Y_QA.md: nunca conectar al perfil habitual del jugador.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
assert.equal(process.env.DC37_PERFIL_QA,'com.javierrb35.elquijote.dc37qa','confirmar perfil aislado QA');
const browser=await chromium.connectOverCDP('http://127.0.0.1:9223');
const context=browser.contexts()[0], page=context.pages()[0];
assert.equal(page.url(),'http://tauri.localhost/');
assert.equal(await page.evaluate(()=>'__TAURI_INTERNALS__' in window),true);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const reanudar=process.env.DC37_REANUDAR==='1';
await context.setOffline(true);
await page.reload();
await page.getByRole('button',{name:/Modo Historia/}).waitFor();
const results=[];
for(const cap of ['01','02','04','05','08']) {
  await page.locator('#selector-capitulo').selectOption(`DQ.P1.C${cap}`);
  await page.getByRole('button',{name:/Modo Historia/}).click();
  await page.locator('.texto').waitFor();
  if (!reanudar) await page.getByRole('button',{name:'Siguiente intervención (enter)'}).click();
  else assert.match(await page.locator('.progreso-texto').innerText(),/Intervención 2 de/);
  const texto=await page.locator('.texto').innerText();
  await page.getByRole('button',{name:'Ocultar texto',exact:true}).click();
  await page.waitForTimeout(400);
  await page.getByRole('button',{name:'Mostrar texto',exact:true}).click();
  assert.equal(await page.locator('.texto').innerText(),texto);
  await page.getByRole('button',{name:'Volver al menú (escape)'}).click();
  await page.getByRole('button',{name:/Modo Historia/}).click();
  assert.equal(await page.locator('.texto').innerText(),texto);
  await page.getByRole('button',{name:'Volver al menú (escape)'}).click();
  await page.getByRole('button',{name:/Modo Aventura/}).click();
  if (!reanudar) await page.locator('.an-opcion').first().click();
  else await page.getByRole('button',{name:'Descubrir qué sucede',exact:true}).waitFor();
  const resultado=await page.locator('.an-panel').innerText();
  await page.getByRole('button',{name:'Menú',exact:true}).click();
  await page.getByRole('button',{name:/Modo Aventura/}).click();
  assert.equal(await page.locator('.an-panel').innerText(),resultado);
  await page.getByRole('button',{name:'Menú',exact:true}).click();
  results.push({capitulo:`DQ.P1.C${cap}`,historia:'PASS: texto, contemplación, restauración nativa',aventura:'PASS: respuesta y restauración nativa'});
}
await page.screenshot({path:resolve(import.meta.dirname,'../../docs/qa/dc37/evidencias/nativo-offline.png')});
assert.deepEqual(errors,[]);
const metadata=await page.evaluate(()=>({width:innerWidth,height:innerHeight,dpr:devicePixelRatio,online:navigator.onLine}));
await writeFile(resolve(import.meta.dirname,`../../docs/qa/dc37/evidencias/${reanudar?'nativo-reinicio':'nativo'}.json`),JSON.stringify({estado:'PASS',entorno:'Tauri debug custom-protocol; WebView2 Windows; perfil QA independiente; recursos locales del repositorio, no instalador distribuible',tras_reinicio:reanudar,metadata,capitulos:results,errores_consola:errors},null,2)+'\n');
console.log({estado:'PASS',metadata,capitulos:results.length});
await context.setOffline(false);
await browser.close();
