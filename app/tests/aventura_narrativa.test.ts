import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  PUNTOS_INICIALES, PUNTOS_MAXIMOS, VERSION_PARTIDA, EPISODIO_AVENTURA,
  nuevaPartida, ordenarOpciones, responder, revelar, continuar, restaurarPartida,
  type Partida,
} from '../src/aventura/motorNarrativo.ts';
import { RONDAS_AVENTURA } from '../src/aventura/guionNarrativo.ts';

const R = RONDAS_AVENTURA;

test('guion piloto: 9 anticipaciones, 3 tramos de 3 y única continuación canónica', () => {
  assert.equal(R.length, 9);
  assert.equal(new Set(R.map((q) => q.id)).size, 9);
  assert.deepEqual(R.filter((q) => q.checkpoint).map((q) => q.id), [R[2].id, R[5].id, R[8].id]);
  for (const ronda of R) {
    assert.equal(ronda.opciones.length, 3);
    assert.equal(new Set(ronda.opciones.map((o) => o.id)).size, 3);
    assert.equal(ronda.opciones.filter((o) => o.id === ronda.correcta).length, 1);
    assert.ok(ronda.contexto.length > 25 && ronda.consecuencia.length > 20);
  }
});

test('imágenes: 9 preimágenes distintas y consecuencias reales de Aventura/Historia', () => {
  assert.equal(new Set(R.map((q) => q.imagenPrevia.uri)).size, R.length);
  const fuentes = R.flatMap((q) => [q.imagenPrevia, q.imagenConsecuencia]);
  assert.ok(fuentes.some((m) => m.medioId?.startsWith('DQ.MA.')));
  assert.ok(fuentes.some((m) => !m.medioId && m.uri.includes('story_')));
  for (const img of fuentes) {
    assert.ok(img.uri.startsWith('assets://scenes/part_1/chapter_08/'));
    assert.ok(existsSync(resolve('..', 'assets', img.uri.replace('assets://', ''))), img.uri);
    assert.ok(img.alt.length > 15);
  }
  for (const ronda of R) {
    if (ronda.pasajeId) assert.ok(existsSync(resolve('..', 'content/piloto/passages', ronda.pasajeId + '.json')));
  }
});

test('puntuación: 3 de inicio, acierto +1 y fallo -1, siempre limitada a 0..5', () => {
  let p = nuevaPartida();
  assert.equal(p.puntos, PUNTOS_INICIALES);
  p = responder(p, R[0], R[0].correcta);
  assert.equal(p.puntos, 4);
  assert.equal(p.fase, 'resultado');
  assert.equal(p.aciertoActual, true);
  assert.equal(responder(p, R[0], 'b'), p); // no doble puntuación
  p = revelar(p);
  p = continuar(p, R);
  assert.equal(p.indice, 1);
  p = responder(p, R[1], R[1].opciones.find((x) => x.id !== R[1].correcta)!.id);
  assert.equal(p.puntos, 3);
  assert.equal(p.errores, 1);
  const max = responder({ ...nuevaPartida(), puntos: 5 }, R[0], R[0].correcta);
  assert.equal(max.puntos, PUNTOS_MAXIMOS);
});

test('G1: al llegar a cero se ve el resultado y la consecuencia antes del retorno', () => {
  let p = nuevaPartida();
  for (let i = 0; i < 3; i++) {
    const otra = R[i].opciones.find((o) => o.id !== R[i].correcta)!.id;
    p = responder(p, R[i], otra);
    assert.equal(p.fase, 'resultado');
    p = revelar(p);
    assert.equal(p.fase, 'revelacion');
    if (i < 2) p = continuar(p, R);
  }
  assert.equal(p.puntos, 0);
  assert.equal(p.indice, 2);
  assert.equal(p.fase, 'revelacion');
  p = continuar(p, R);
  assert.equal(p.indice, 0);
  assert.equal(p.puntos, 3);
  assert.equal(p.fase, 'pregunta');
  assert.equal(p.intento, 1);
  assert.equal(p.errores, 3);
});

test('B2: atravesar un checkpoint bonifica +1, guarda después y no duplica al abrirlo', () => {
  const base: Partida = {
    ...nuevaPartida(), indice: 2, puntos: 3, fase: 'revelacion',
    seleccion: R[2].correcta, aciertoActual: true,
  };
  const cp = continuar(base, R);
  assert.equal(cp.fase, 'checkpoint');
  assert.equal(cp.puntos, 4);
  assert.deepEqual(cp.checkpoint, { indice: 3, puntos: 4 });
  assert.equal(continuar(cp, R).puntos, 4);
  assert.equal(continuar(cp, R).indice, 3);
  const reingreso = continuar({ ...base, intento: 2 }, R);
  assert.equal(reingreso.puntos, 4); // bonificación otra vez por cruce real
  const cpTope = continuar({ ...base, puntos: 5 }, R);
  assert.equal(cpTope.puntos, 5);
});

test('restauración tras derrota usa el último checkpoint, mínimo 3', () => {
  const prev: Partida = {
    ...nuevaPartida(), indice: 4, puntos: 0, fase: 'revelacion',
    checkpoint: { indice: 3, puntos: 4 }, seleccion: R[4].opciones[1].id,
    aciertoActual: false,
  };
  const p = continuar(prev, R);
  assert.equal(p.indice, 3);
  assert.equal(p.puntos, 4);
  assert.equal(p.intento, 1);
});

test('D1: reordenación real de opciones al repetir, sin alterar la respuesta correcta', () => {
  for (const ronda of R) {
    const a = ordenarOpciones(ronda, 0);
    const b = ordenarOpciones(ronda, 1);
    assert.notDeepEqual(a.map((o) => o.id), b.map((o) => o.id));
    assert.equal(a.find((o) => o.id === ronda.correcta)?.id, ronda.correcta);
    assert.equal(b.find((o) => o.id === ronda.correcta)?.id, ronda.correcta);
  }
});

test('reanudación validada y progreso antiguo no interpretado como puntos', () => {
  const p = nuevaPartida();
  const raw = JSON.stringify({ version: VERSION_PARTIDA, episodio: EPISODIO_AVENTURA, partida: p });
  assert.deepEqual(restaurarPartida(raw, R), p);
  assert.equal(restaurarPartida('{"DQ.Q.000101":{"acierto":true}}', R), null);
  assert.equal(restaurarPartida('basura', R), null);
  assert.equal(restaurarPartida(JSON.stringify({
    version: 2, episodio: EPISODIO_AVENTURA, partida: { ...p, puntos: 999 },
  }), R), null);
});

test('el último checkpoint da paso a cierre sin posición inválida', () => {
  const p: Partida = {
    ...nuevaPartida(), indice: 8, puntos: 4, fase: 'revelacion',
    seleccion: R[8].correcta, aciertoActual: true,
    checkpoint: { indice: 6, puntos: 4 },
  };
  const cp = continuar(p, R);
  assert.equal(cp.fase, 'checkpoint');
  assert.equal(cp.checkpoint.indice, 9);
  const fin = continuar(cp, R);
  assert.equal(fin.fase, 'completada');
  assert.equal(fin.indice, 8);
  const raw = JSON.stringify({ version: VERSION_PARTIDA, episodio: EPISODIO_AVENTURA, partida: fin });
  assert.deepEqual(restaurarPartida(raw, R), fin);
});
