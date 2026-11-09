import test from 'node:test';
import assert from 'node:assert/strict';
import { requiereVistaDedicada } from '../src/cine/composicion.ts';

test('pregunta ordinaria 768px con 330px de opciones mantiene la escena', () => {
  assert.equal(requiereVistaDedicada(330, 768, 'pregunta'), false);
});

test('pregunta extensa cambia a vista separada, nunca a scroll sobre imagen', () => {
  assert.equal(requiereVistaDedicada(560, 768, 'pregunta'), true);
});

test('narración legible dentro del presupuesto de 1080px', () => {
  assert.equal(requiereVistaDedicada(670, 1080, 'narracion'), false);
});

test('desbordamiento geométrico obliga a vista separada aunque la altura sea corta', () => {
  assert.equal(requiereVistaDedicada(250, 800, 'pregunta', true), true);
});

test('dimensiones imposibles fallan de forma segura', () => {
  assert.equal(requiereVistaDedicada(NaN, 800, 'narracion'), true);
  assert.equal(requiereVistaDedicada(200, 0, 'pregunta'), true);
});
