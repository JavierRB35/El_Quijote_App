import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { nuevaPartida, responder, revelar, continuar, restaurarPartida } from '../src/aventura/motorNarrativo.ts';

const root = resolve(import.meta.dirname, '../..');
const json = (p: string) => JSON.parse(readFileSync(resolve(root, p), 'utf-8'));
const aventura = json('content/aventura/parte_1/capitulo_03.json');
const historia = json('content/historia/parte_1/capitulo_03.json');
const medios = json('assets/scenes/manifest.json');
const rondas = aventura.rondas;

test('I.3: editorial preparado, sin activar ni intercambiar imágenes de otras fechas', () => {
  assert.equal(aventura.episodioId, historia.episodioId);
  assert.equal(aventura.episodioId, 'DQ.P1.C03.E01');
  assert.equal(aventura.estado_editorial, 'en_revision');
  assert.equal(historia.estado_editorial, 'en_revision');
  assert.equal(aventura.revision_visual, 'pendiente');
  assert.equal(rondas.length, 4);
  assert.deepEqual(rondas.map((r: any) => r.correcta), ['b', 'b', 'b', 'b']);
  assert.equal(new Set(rondas.map((r: any) => r.imagenPrevia.uri)).size, 4);
  for (const ronda of rondas) {
    assert.equal(ronda.opciones.length, 3);
    assert.equal(ronda.opciones.filter((o: any) => o.id === ronda.correcta).length, 1);
    for (const im of [ronda.imagenPrevia, ronda.imagenConsecuencia]) {
      assert.ok(existsSync(resolve(root, 'assets', im.uri.replace('assets://', ''))), im.uri);
    }
  }
  assert.equal(historia.escenas.length, 11);
  const intervenciones = historia.escenas.flatMap((s: any) => s.intervenciones);
  assert.equal(intervenciones.length, 30);
  assert.equal(new Set(intervenciones.map((x: any) => x.id)).size, 30);
  for (const i of intervenciones) {
    assert.ok(i.texto_visible.length >= 15);
    assert.ok(i.localizador.includes('DQ.SRC.0005'));
    const asset = medios.images.find((m: any) => m.id === i.imagen);
    assert.ok(asset && existsSync(resolve(root, asset.relative_path)), i.id);
  }
});

test('I.3: motor y guardado por episodio mantienen aislados I.2 e I.8', () => {
  const episodio = aventura.episodioId;
  const p = nuevaPartida(0, episodio);
  assert.equal(p.puntos, 3);
  assert.equal(restaurarPartida(JSON.stringify({version: 2, episodio, partida: p}), rondas, 'DQ.P1.C08.E01'), null);
  let q = responder(p, rondas[0], rondas[0].correcta);
  assert.equal(q.puntos, 4);
  q = revelar(q);
  assert.equal(q.fase, 'revelacion');
  q = continuar(q, rondas);
  assert.equal(q.indice, 1);
  q = responder(q, rondas[1], 'a');
  assert.equal(q.puntos, 3);
  q = revelar(q);
  q = continuar(q, rondas);
  assert.equal(q.fase, 'checkpoint');
});

test('I.3: la preimagen R02 es candidatura pendiente y el menú no anticipa activación', () => {
  assert.ok(rondas[1].imagenPrevia.uri.endsWith('p1_c03_vela_armas_pre.webp'));
  const imagen = medios.images.find((m: any) => m.id === 'p1_c03_vela_armas_pre');
  assert.ok(imagen && ['borrador', 'aprobada'].includes(imagen.review_state));
  const capitulos = json('content/capitulos/registro.json').capitulos;
  assert.ok(!capitulos.some((x: any) => x.capituloId === aventura.capituloId));
});
