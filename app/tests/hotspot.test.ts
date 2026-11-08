// Geometría del hotspot (P0, Issue #75): el mapeo entre hotspot_area
// normalizada del contrato y coordenadas de pantalla resuelve el object-fit
// real — cover recorta (la zona puede salir del encuadre), contain añade
// letterbox (el fotograma íntegro cabe). Casos con números exactos sobre las
// imágenes reales del piloto (acuarela 833×1041; escena 1672×941).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  coordenadasImagen,
  puntoEnZona,
  rectaContenido,
  rectaZonaEnPantalla,
} from '../src/cine/hotspot.ts';

const ZONA_Q112 = { x: 0.3, y: 0.22, w: 0.45, h: 0.5 }; // hotspot_area real de Q.000112

const casiIgual = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) < eps;

test('contain: la acuarela 833×1041 cabe íntegra en 1366×768 con bandas laterales', () => {
  const r = rectaContenido(833, 1041, 1366, 768, 'contain');
  assert.equal(r.h, 768); // limita el alto
  assert.ok(casiIgual(r.w, 768 * (833 / 1041))); // ≈ 614.5
  assert.equal(r.y, 0);
  assert.ok(casiIgual(r.x, (1366 - r.w) / 2)); // letterbox centrado
  // La zona de Q.112 queda ÍNTEGRA dentro del viewport
  const zona = rectaZonaEnPantalla(ZONA_Q112, r);
  assert.ok(zona.x >= 0 && zona.x + zona.w <= 1366);
  assert.ok(zona.y >= 0 && zona.y + zona.h <= 768);
});

test('cover: la acuarela recorta en vertical y la zona superior sale del encuadre', () => {
  const r = rectaContenido(833, 1041, 1366, 768, 'cover');
  assert.equal(r.w, 1366); // limita el ancho
  assert.ok(r.h > 768); // desborda el alto (recorte centrado)
  assert.ok(r.y < 0);
  // Un punto sobre la parte alta de la imagen (y=0.22 de la zona) queda FUERA
  const pantallaZona = rectaZonaEnPantalla(ZONA_Q112, r);
  assert.ok(pantallaZona.y < 0, 'con cover la zona empieza fuera de pantalla: por eso el hotspot usa contain');
});

test('cover: escena 16:9 nativa (1672×941) casi sin recorte en 1366×768', () => {
  const r = rectaContenido(1672, 941, 1366, 768, 'cover');
  assert.equal(r.w, 1366);
  assert.ok(Math.abs(r.h - 768) < 1); // recorte marginal (<1 px)
});

test('coordenadasImagen: mapea el centro y rechaza las bandas de letterbox', () => {
  const r = rectaContenido(833, 1041, 1366, 768, 'contain');
  const centro = coordenadasImagen(r.x + r.w / 2, r.y + r.h / 2, r);
  assert.ok(centro && casiIgual(centro.u, 0.5) && casiIgual(centro.v, 0.5));
  // Banda izquierda (letterbox): fuera de la imagen → null (no es respuesta)
  assert.equal(coordenadasImagen(10, 384, r), null);
  assert.equal(coordenadasImagen(1360, 384, r), null);
  // Esquina inferior derecha de la imagen
  const esquina = coordenadasImagen(r.x + r.w, r.y + r.h, r);
  assert.ok(esquina && casiIgual(esquina.u, 1) && casiIgual(esquina.v, 1));
});

test('puntoEnZona: bordes inclusivos y rechazo fuera', () => {
  assert.equal(puntoEnZona(0.3, 0.22, ZONA_Q112), true);
  assert.equal(puntoEnZona(0.75, 0.72, ZONA_Q112), true);
  assert.equal(puntoEnZona(0.5, 0.5, ZONA_Q112), true);
  assert.equal(puntoEnZona(0.299, 0.5, ZONA_Q112), false);
  assert.equal(puntoEnZona(0.5, 0.721, ZONA_Q112), false);
});

test('rectaZonaEnPantalla: la zona de Q.112 en contain es clicable dentro del viewport', () => {
  const r = rectaContenido(833, 1041, 1366, 768, 'contain');
  const zona = rectaZonaEnPantalla(ZONA_Q112, r);
  assert.ok(zona.w > 100 && zona.h > 200, 'tamaño señable a 1366×768');
  assert.ok(zona.x >= r.x && zona.x + zona.w <= r.x + r.w, 'dentro de la imagen dibujada');
});

test('guardia: dimensiones no positivas devuelven la caja sin lanzar', () => {
  assert.deepEqual(rectaContenido(0, 0, 800, 600, 'contain'), { x: 0, y: 0, w: 800, h: 600 });
  assert.deepEqual(rectaContenido(833, 1041, 0, 0, 'cover'), { x: 0, y: 0, w: 0, h: 0 });
  assert.equal(coordenadasImagen(1, 1, { x: 0, y: 0, w: 0, h: 0 }), null);
});

test('alineación del letterbox: con panel a la derecha la obra pega a la izquierda', () => {
  const r = rectaContenido(833, 1041, 1366, 768, 'contain', 'inicio');
  assert.equal(r.x, 0, 'sin banda a la izquierda: la obra arranca en el borde');
  assert.ok(casiIgual(r.x + r.w, 768 * (833 / 1041)));
  // La zona de Q.112 sigue íntegra y ahora AÚN más lejos del panel derecho
  const zona = rectaZonaEnPantalla(ZONA_Q112, r);
  assert.ok(zona.x >= 0 && zona.x + zona.w < 700);
  const rFin = rectaContenido(833, 1041, 1366, 768, 'contain', 'fin');
  assert.ok(casiIgual(rFin.x + rFin.w, 1366), 'alineación fin: obra pegada al borde derecho');
  const rCentro = rectaContenido(833, 1041, 1366, 768, 'contain');
  assert.ok(casiIgual(rCentro.x, (1366 - rCentro.w) / 2), 'centro por defecto');
});
