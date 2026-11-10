import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  nuevaPartida, restaurarPartida, responder, revelar, continuar,
} from '../src/aventura/motorNarrativo.ts';

const root = resolve(import.meta.dirname, '../..');
const json = (p: string) => JSON.parse(readFileSync(resolve(root, p), 'utf-8'));
const aventura = json('content/aventura/parte_1/capitulo_01.json');
const historia = json('content/historia/parte_1/capitulo_01.json');
const registro = json('content/capitulos/registro.json');
const manifest = json('assets/scenes/manifest.json');
const rondas = aventura.rondas;
const episodio = aventura.episodioId;

test('Capítulo I: cinco decisiones, preimágenes exclusivas y continuidad canónica', () => {
  assert.equal(episodio, 'DQ.P1.C01.E01');
  assert.equal(rondas.length, 5);
  assert.deepEqual(rondas.map((r: { id: string }) => r.id),
    Array.from({ length: 5 }, (_, i) => 'AV2-I1-0' + (i + 1)));
  assert.equal(new Set(rondas.map((r: any) => r.imagenPrevia.uri)).size, 5);
  assert.equal(rondas.filter((r: any) => r.checkpoint).length, 2);
  for (const r of rondas) {
    assert.equal(r.opciones.length, 3);
    assert.equal(r.opciones.filter((o: any) => o.id === r.correcta).length, 1);
    assert.ok(!r.contexto.includes('Sancho'));
    for (const img of [r.imagenPrevia, r.imagenConsecuencia]) {
      assert.ok(existsSync(resolve(root, 'assets', img.uri.replace('assets://', ''))));
    }
  }
  assert.equal(aventura.revision_visual, 'pendiente');
});

test('Capítulo I: 11 escenas/25 intervenciones TS-001, planos reales aprobados', () => {
  assert.equal(historia.escenas.length, 11);
  const pasos = historia.escenas.flatMap((s: any) => s.intervenciones);
  assert.equal(pasos.length, 25);
  assert.equal(new Set(pasos.map((p: any) => p.id)).size, 25);
  for (const p of pasos) {
    assert.ok(p.texto_visible.trim().length >= 15);
    assert.ok(p.localizador.includes('DQ.SRC.0005'));
    const media = manifest.images.find((i: any) => i.id === p.imagen);
    assert.ok(media, p.imagen);
    assert.equal(media.review_state, 'aprobada');
    assert.ok(existsSync(resolve(root, media.relative_path)));
    assert.notEqual(p.imagen, 'p1_c01_biblioteca_pre');
  }
  const h7 = historia.escenas.find((s: any) => s.id === 'H07').intervenciones;
  assert.deepEqual(h7.map((p: any) => p.imagen), [
    'p1_c01_r03_armas_morrion_pre',
    'p1_c01_h07_celada_rota_story',
    'p1_c01_r03_celada_reforzada_post',
  ]);
  assert.ok(registro.capitulos.some((c: any) => c.capituloId === aventura.capituloId));
  assert.ok(registro.capitulos.some((c: any) => c.capituloId === 'DQ.P1.C08'));
});

test('guardados de episodios distintos nunca se restauran como I.8', () => {
  const p1 = nuevaPartida(0, episodio);
  const p8 = nuevaPartida();
  assert.equal(p1.episodio, episodio);
  assert.equal(p8.episodio, 'DQ.P1.C08.E01');
  const escrito = JSON.stringify({ version: 2, episodio, partida: p1 });
  assert.deepEqual(restaurarPartida(escrito, rondas, episodio), p1);
  assert.equal(restaurarPartida(escrito, rondas), null);
  let p = responder(p1, rondas[0], rondas[0].correcta);
  p = revelar(p);
  p = continuar(p, rondas);
  assert.equal(p.indice, 1);
  assert.equal(p.episodio, episodio);
});

test('IDs de episodio técnicos únicos y anclados al capítulo en la selección activable', () => {
  const ids = new Set<string>();
  for (const ficha of registro.capitulos) {
    assert.ok(ficha.episodioId.startsWith(ficha.capituloId + '.E'), ficha.capituloId);
    assert.ok(!ids.has(ficha.episodioId), 'episodio duplicado: ' + ficha.episodioId);
    ids.add(ficha.episodioId);
  }
  const i1 = registro.capitulos.find((c: any) => c.capituloId === 'DQ.P1.C01');
  assert.equal(i1?.episodioId, 'DQ.P1.C01.E01');
  // El capítulo II podrá publicarse únicamente con su propio episodio.
  const i2 = registro.capitulos.find((c: any) => c.capituloId === 'DQ.P1.C02');
  if (i2) assert.equal(i2.episodioId, 'DQ.P1.C02.E01');
  const i8 = registro.capitulos.find((c: any) => c.capituloId === 'DQ.P1.C08');
  assert.equal(i8?.episodioId, 'DQ.P1.C08.E01');
});


const aventuraII = json('content/aventura/parte_1/capitulo_02.json');
const historiaII = json('content/historia/parte_1/capitulo_02.json');

test('I.2: cinco decisiones con preimágenes únicas y consecuencias comprobadas', () => {
  assert.equal(aventuraII.episodioId, 'DQ.P1.C02.E01');
  assert.equal(aventuraII.estado_editorial, 'piloto_integrado');
  assert.equal(aventuraII.revision_visual, 'pendiente');
  assert.deepEqual(aventuraII.rondas.map((r: any) => r.id),
    Array.from({ length: 5 }, (_, i) => 'AV2-I2-0' + (i + 1)));
  assert.equal(new Set(aventuraII.rondas.map((r: any) => r.imagenPrevia.uri)).size, 5);
  assert.equal(aventuraII.rondas.filter((r: any) => r.checkpoint).length, 2);
  for (const r of aventuraII.rondas) {
    assert.equal(r.opciones.length, 3);
    assert.equal(r.opciones.filter((o: any) => o.id === r.correcta).length, 1);
    assert.equal(r.pasajeId, null);
    for (const img of [r.imagenPrevia, r.imagenConsecuencia]) {
      assert.ok(img.alt.length >= 16);
      const path = 'assets/' + img.uri.replace('assets://', '');
      assert.ok(existsSync(resolve(root, path)), path);
      const m = manifest.images.find((x: any) => x.relative_path === path);
      assert.equal(m?.review_state, 'aprobada', path);
      assert.equal(m.part, 1);
      assert.equal(m.chapter, 2);
    }
  }
  assert.ok(aventuraII.rondas[3].imagenPrevia.uri.endsWith('p1_c02_h07_ventero_acogida_story.webp'));
  assert.ok(aventuraII.rondas[4].imagenConsecuencia.uri.endsWith('p1_c02_h10_cana_vino_story.webp'));
});

test('I.2: Historia 11 escenas, 25 intervenciones y recursos aprobados', () => {
  assert.equal(historiaII.episodioId, 'DQ.P1.C02.E01');
  assert.equal(historiaII.revision_visual, 'pendiente');
  assert.equal(historiaII.escenas.length, 11);
  const pasos = historiaII.escenas.flatMap((e: any) => e.intervenciones);
  assert.equal(pasos.length, 25);
  assert.equal(new Set(pasos.map((p: any) => p.id)).size, 25);
  for (const p of pasos) {
    assert.ok(p.texto_visible.length >= 15);
    assert.ok(p.localizador.includes('DQ.SRC.0005'));
    const m = manifest.images.find((x: any) => x.id === p.imagen);
    assert.ok(m, p.imagen);
    assert.equal(m.review_state, 'aprobada');
    assert.equal(m.part, 1);
    assert.equal(m.chapter, 2);
    assert.ok(existsSync(resolve(root, m.relative_path)), p.imagen);
  }
  assert.equal(registro.capitulos.find((c: any) => c.capituloId === 'DQ.P1.C02')?.episodioId,
    'DQ.P1.C02.E01');
});

test('I.2: partida no se confunde con I.1 ni I.8', () => {
  const p = nuevaPartida(0, 'DQ.P1.C02.E01');
  const raw = JSON.stringify({ version: 2, episodio: 'DQ.P1.C02.E01', partida: p });
  assert.deepEqual(restaurarPartida(raw, aventuraII.rondas, 'DQ.P1.C02.E01'), p);
  assert.equal(restaurarPartida(raw, aventuraII.rondas, 'DQ.P1.C01.E01'), null);
  assert.equal(restaurarPartida(raw, aventuraII.rondas), null);
  let next = responder(p, aventuraII.rondas[0], aventuraII.rondas[0].correcta);
  next = revelar(next);
  next = continuar(next, aventuraII.rondas);
  assert.equal(next.indice, 1);
  assert.equal(next.episodio, 'DQ.P1.C02.E01');
});
