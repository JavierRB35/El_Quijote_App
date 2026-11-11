import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { nuevaPartida, responder, revelar, continuar, restaurarPartida } from '../src/aventura/motorNarrativo.ts';

const root = resolve(import.meta.dirname, '../..');
const json = (p: string) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));
const a = json('content/aventura/parte_1/capitulo_05.json');
const h = json('content/historia/parte_1/capitulo_05.json');

test('I.5: contenido activable en el piloto y TS-001 íntegro', () => {
  assert.equal(json('content/capitulos/registro.json').capitulos.filter((c: any) => c.capituloId === a.capituloId).length, 1);
  assert.equal(a.estado_editorial, 'piloto_integrado');
  assert.equal(h.estado_editorial, 'piloto_integrado');
  assert.equal(a.revision_visual, 'pendiente');
  assert.equal(a.rondas.length, 5);
  assert.equal(new Set(a.rondas.map((r: any) => r.imagenPrevia.uri)).size, 5);
  assert.deepEqual(a.rondas.map((r: any) => r.correcta), ['b','a','c','a','b']);
  const intervenciones = h.escenas.flatMap((e: any) => e.intervenciones);
  assert.equal(h.escenas.length, 11);
  assert.equal(intervenciones.length, 30);
  assert.ok(intervenciones.every((i: any) => /^H\d{2}-I\d{2}$/.test(i.id)));
  assert.ok(intervenciones.every((i: any) => i.texto_visible.length >= 15 && i.imagen));
  assert.equal(intervenciones.filter((i: any) => i.tipo_texto === 'CITA_LITERAL').length, 1);
});

test('I.5: checkpoints, revelación canónica y progreso separado por episodio', () => {
  const rondas = a.rondas;
  const ep = a.episodioId;
  let p = nuevaPartida(0, ep);
  assert.equal(restaurarPartida(JSON.stringify({ version: 2, episodio: ep, partida: p }), rondas, 'DQ.P1.C04.E01'), null);
  for (let i = 0; i < 5; i++) {
    p = responder(p, rondas[i], rondas[i].correcta);
    assert.equal(p.fase, 'resultado');
    p = revelar(p);
    assert.equal(p.fase, 'revelacion');
    p = continuar(p, rondas);
    if (i === 2 || i === 4) {
      assert.equal(p.fase, 'checkpoint');
      p = continuar(p, rondas);
    }
  }
  assert.equal(p.fase, 'completada');
  assert.equal(p.checkpoint.indice, 5);
});
