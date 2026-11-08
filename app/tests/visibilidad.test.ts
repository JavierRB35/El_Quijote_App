// Visibilidad narrativa (encargo P1 §D) contra el paquete real: Q.101–Q.106 y
// Q.112 (molinos y embestida, narrados en I01–I16) desbloqueadas; Q.107–Q.111
// (frailes, señora y vizcaíno, aún no narrados) bloqueadas sin simular
// contenido. La relación es por identificadores de pasaje, no por posición de
// fichero. Incluye la compatibilidad de progreso con guardados antiguos.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Beat, Pregunta } from '../src/contrato.ts';
import {
  pasajesNarrados,
  preguntaDesbloqueada,
  respuestasValidas,
  separarVisibles,
} from '../src/aventura/visibilidad.ts';

const RAIZ = join(import.meta.dirname, '..', '..');
const PILOTO = join(RAIZ, 'content', 'piloto');

interface Paquete {
  files: Record<string, string[]>;
}

function leerPaquete(): Paquete {
  return JSON.parse(readFileSync(join(PILOTO, 'package.json'), 'utf-8')) as Paquete;
}

function leerRegistros<T>(rutas: string[]): T[] {
  return rutas.map((rel) => JSON.parse(readFileSync(join(PILOTO, rel), 'utf-8')) as T);
}

function episodioC08(): { preguntas: Pregunta[]; beats: Beat[] } {
  const paquete = leerPaquete();
  const preguntas = leerRegistros<Pregunta>(paquete.files['questions'] ?? []).filter(
    (q) => q.episode_id === 'DQ.P1.C08.E01',
  );
  const beats = leerRegistros<Beat>(paquete.files['beats'] ?? []);
  return { preguntas, beats };
}

test('pasajesNarrados: une los passage_ids de todas las intervenciones', () => {
  const beats = [
    {
      id: 'B1',
      utterances: [
        { utterance_id: 'u1', passage_ids: ['P1', 'P2'] },
        { utterance_id: 'u2', passage_ids: ['P3'] },
      ],
    },
    { id: 'B2', utterances: [{ utterance_id: 'u3', passage_ids: undefined }] },
  ] as unknown as Beat[];
  assert.deepEqual([...pasajesNarrados(beats)].sort(), ['P1', 'P2', 'P3']);
});

test('preguntaDesbloqueada: exige TODOS los pasajes narrados; sin pasajes, desbloqueada', () => {
  const narrados = new Set(['P1']);
  const q = (pasajes: string[] | undefined) =>
    ({ id: 'Q', passage_ids: pasajes }) as unknown as Pregunta;
  assert.equal(preguntaDesbloqueada(q(['P1']), narrados), true);
  assert.equal(preguntaDesbloqueada(q(['P1', 'P2']), narrados), false);
  assert.equal(preguntaDesbloqueada(q(undefined), narrados), true);
});

test('secuencia narrativa real del episodio DQ.P1.C08.E01 (contrato encargo P1 §D)', () => {
  const { preguntas, beats } = episodioC08();
  assert.equal(preguntas.length, 12, 'el episodio mantiene sus 12 preguntas');
  const { visibles, bloqueadas } = separarVisibles(preguntas, pasajesNarrados(beats));
  assert.deepEqual(
    visibles.map((q) => q.id),
    [
      'DQ.Q.000101',
      'DQ.Q.000102',
      'DQ.Q.000103',
      'DQ.Q.000104',
      'DQ.Q.000105',
      'DQ.Q.000106',
      'DQ.Q.000112',
    ],
    'solo molinos (Q.101–Q.106) y embestida visual (Q.112) desbloqueadas',
  );
  assert.deepEqual(
    bloqueadas.map((q) => q.id),
    [
      'DQ.Q.000107',
      'DQ.Q.000108',
      'DQ.Q.000109',
      'DQ.Q.000110',
      'DQ.Q.000111',
    ],
    'frailes, señora y vizcaíno (Q.107–Q.111) bloqueadas hasta que la narración las alcance',
  );
});

test('compatibilidad de progreso: guardado con preguntas hoy bloqueadas se recupera sin ellas', () => {
  const guardado = JSON.stringify({
    'DQ.Q.000101': { acierto: true, seleccion: ['DQ.Q.000101.O02'] },
    'DQ.Q.000107': { acierto: true, seleccion: ['DQ.Q.000107.O01'] }, // hoy bloqueada
    'DQ.Q.999999': { acierto: false, seleccion: ['x'] }, // inexistente
    'DQ.Q.000103': { acierto: false, seleccion: 'roto' }, // malformada
  });
  const { visibles } = separarVisibles(episodioC08().preguntas, pasajesNarrados(episodioC08().beats));
  const valido = respuestasValidas(guardado, new Set(visibles.map((q) => q.id)));
  assert.deepEqual(Object.keys(valido).sort(), ['DQ.Q.000101']);
  assert.deepEqual(valido['DQ.Q.000101'], { acierto: true, seleccion: ['DQ.Q.000101.O02'] });
  // guardado corrupto o vacío → sin carga asumida
  assert.deepEqual(respuestasValidas('{roto', new Set(['DQ.Q.000101'])), {});
  assert.deepEqual(respuestasValidas(null, new Set(['DQ.Q.000101'])), {});
});
