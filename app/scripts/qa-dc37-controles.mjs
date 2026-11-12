// Regresión específica de controles DC-37: geometría fija y 2 segundos.
// Vite real en 127.0.0.1:1420; Microsoft Edge/Chromium con Playwright.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: process.env.QA_BROWSER_CHANNEL || 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 }, reducedMotion: 'reduce' });
  await page.goto(process.env.QA_URL || 'http://127.0.0.1:1420/');
  await page.getByRole('button', { name: /Modo Historia/ }).click();
  const toolbar = page.locator('.lv-controles-cine');
  await toolbar.waitFor();
  assert.equal(await page.locator('.lv-pergamino .controles, .lv-pergamino .lv-control-flotante').count(), 0);
  const medidas = async () => page.locator('.lv-control-flotante').evaluateAll(els => els.map(el => {
    const r = el.getBoundingClientRect();
    return { pos: el.className, x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
  }));
  const inicial = await medidas();
  assert.equal(inicial.length, 3);
  assert(inicial[0].x < 100 && inicial[2].x > 1260);
  assert(Math.abs(inicial[1].x - 683) < 2);
  await page.mouse.move(220, 480);
  assert.equal(await toolbar.getAttribute('data-visibles'), 'true');
  await page.waitForTimeout(2300);
  assert.equal(await toolbar.getAttribute('data-visibles'), 'false', 'debe ocultarse tras 2 segundos de inactividad');
  await page.mouse.move(240, 460);
  assert.equal(await toolbar.getAttribute('data-visibles'), 'true');
  await page.getByRole('button', { name: 'Pausa (espacio)' }).click();
  await page.getByRole('button', { name: 'Siguiente intervención (enter)' }).click();
  assert.deepEqual(await medidas(), inicial, 'los controles se mueven al cambiar de intervención');
  await page.getByRole('button', { name: 'Ajustes de texto y movimiento' }).click();
  assert.equal(await page.getByRole('button', { name: 'Repetir intervención (R)' }).count(), 1);
  assert.equal(await page.getByRole('button', { name: 'Repetir beat (B)' }).count(), 1);
  assert.equal(await page.getByRole('button', { name: /Autoavance:/ }).count(), 1);
  await page.getByRole('button', { name: 'Ajustes de texto y movimiento' }).click();
  await page.getByRole('button', { name: 'Ocultar texto' }).click();
  assert.equal(await toolbar.count(), 0, 'sin avance en contemplación');
  await page.getByRole('button', { name: 'Mostrar texto' }).click();
  await page.getByRole('button', { name: 'Volver al menú (escape)' }).click();
  await page.getByRole('button', { name: /Modo Aventura/ }).click();
  assert.equal(await page.locator('.lv-pergamino .an-primario').count(), 0);
  await page.locator('.an-opcion').first().click();
  assert.equal(await page.getByRole('button', { name: 'Descubrir qué sucede' }).count(), 1);
  assert.equal(await page.locator('.lv-pergamino .lv-control-flotante').count(), 0);
  assert.equal(await page.locator('.lv-control-derecha').count(), 1);
  console.log('PASS: controles fijos, dos segundos, reproducción fuera del pergamino, accesibilidad y Aventura');
} finally {
  await browser.close();
}
