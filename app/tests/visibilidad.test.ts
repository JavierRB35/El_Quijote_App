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
  respuestasGuardadas,
  respuestasVisibles,
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

test('conservación de progreso P0: Q.101 y Q.107 guardadas, Q.107 bloqueada, se responde Q.103', () => {
  const { preguntas, beats } = episodioC08();
  const { visibles } = separarVisibles(preguntas, pasajesNarrados(beats));
  const idsVisibles = new Set(visibles.map((q) => q.id));
  const idsConocidos = new Set(preguntas.map((q) => q.id));
  // Q.107 sigue bloqueada en el paquete real
  assert.equal(idsVisibles.has('DQ.Q.000107'), false, 'precondición: Q.107 bloqueada');

  // 1) partida previa: Q.101 y Q.107 respondidas (Q.107 antes de su bloqueo)
  const crudo = JSON.stringify({
    'DQ.Q.000101': { acierto: true, seleccion: ['DQ.Q.000101.O02'] },
    'DQ.Q.000107': { acierto: true, seleccion: ['DQ.Q.000107.O01'] },
  });
  const guardadas = respuestasGuardadas(crudo, idsConocidos);
  assert.deepEqual(
    Object.keys(guardadas).sort(),
    ['DQ.Q.000101', 'DQ.Q.000107'],
    'la respuesta de la bloqueada Q.107 sigue ALMACENADA',
  );

  // 2) se muestra y contabiliza solo lo accesible
  const hoy = respuestasVisibles(guardadas, idsVisibles);
  assert.deepEqual(Object.keys(hoy), ['DQ.Q.000101']);
  assert.equal(
    Object.values(hoy).filter((r) => r.acierto).length,
    1,
    'Q.107 no incrementa el marcador',
  );

  // 3) se responde Q.103 y el autoguardado escribe el estado completo
  const trasResponder = { ...guardadas, 'DQ.Q.000103': { acierto: true, seleccion: ['DQ.Q.000103.O01'] } };
  const serializado = JSON.stringify(trasResponder);
  assert.deepEqual(Object.keys(JSON.parse(serializado)).sort(), [
    'DQ.Q.000101',
    'DQ.Q.000103',
    'DQ.Q.000107',
  ], 'el guardado conserva Q.107 junto a la nueva respuesta');

  // 4) restauración posterior: Q.107 sigue almacenada, sin mostrarse ni contar
  const restauradas = respuestasGuardadas(serializado, idsConocidos);
  assert.equal(restauradas['DQ.Q.000107'].acierto, true);
  assert.equal('DQ.Q.000107' in respuestasVisibles(restauradas, idsVisibles), false);
  assert.deepEqual(Object.keys(respuestasVisibles(restauradas, idsVisibles)).sort(), [
    'DQ.Q.000101',
    'DQ.Q.000103',
  ]);
});

test('conservación de progreso P0: al desbloquearse Q.107 su respuesta anterior cuenta', () => {
  const { preguntas } = episodioC08();
  const guardadas = {
    'DQ.Q.000101': { acierto: true, seleccion: ['x'] },
    'DQ.Q.000107': { acierto: false, seleccion: ['y'] },
  };
  // narración ampliada: se añade cobertura de los pasajes de frailes (P0007)
  const narradosAmpliados = new Set([
    'DQ.P1.C08.P0001',
    'DQ.P1.C08.P0002',
    'DQ.P1.C08.P0003',
    'DQ.P1.C08.P0004',
    'DQ.P1.C08.P0005',
    'DQ.P1.C08.P0006',
    'DQ.P1.C08.P0012',
    'DQ.P1.C08.P0013',
    'DQ.P1.C08.P0014',
    'DQ.P1.C08.P0015',
    'DQ.P1.C08.P0016',
    'DQ.P1.C08.P0017',
    'DQ.P1.C08.P0007',
    'DQ.P1.C08.P0008',
    'DQ.P1.C08.P0009',
  ]);
  const { visibles } = separarVisibles(preguntas, narradosAmpliados);
  assert.equal(visibles.some((q) => q.id === 'DQ.Q.000107'), true, 'Q.107 desbloqueada');
  const hoy = respuestasVisibles(guardadas, new Set(visibles.map((q) => q.id)));
  assert.equal('DQ.Q.000107' in hoy, true, 'su respuesta anterior se recupera');
  assert.equal(Object.values(hoy).filter((r) => r.acierto).length, 1);
});

test('conservación de progreso P0: entradas desconocidas o malformadas no son respuestas válidas', () => {
  const idsConocidos = new Set(['DQ.Q.000101', 'DQ.Q.000103', 'DQ.Q.000105', 'DQ.Q.000106']);
  const guardadas = respuestasGuardadas(
    JSON.stringify({
      'DQ.Q.000101': { acierto: true, seleccion: ['a'] },
      'DQ.Q.000103': { acierto: false, seleccion: 'roto' }, // malformada
      'DQ.Q.000105': { acierto: 'false', seleccion: ['a'] }, // no convertir a true
      'DQ.Q.000106': { acierto: true, seleccion: [123] }, // tipos inválidos
      'DQ.Q.999999': { acierto: true, seleccion: ['x'] }, // desconocida
      basura: { acierto: true, seleccion: [] }, // id fuera del episodio
    }),
    idsConocidos,
  );
  assert.deepEqual(Object.keys(guardadas), ['DQ.Q.000101']);
  // guardado corrupto, vacío o con JSON no-objeto → sin carga asumida
  assert.deepEqual(respuestasGuardadas('{roto', idsConocidos), {});
  assert.deepEqual(respuestasGuardadas(null, idsConocidos), {});
  assert.deepEqual(respuestasGuardadas('null', idsConocidos), {});
  // reinicio de partida: guardado limpio → sin respuestas
  assert.deepEqual(respuestasGuardadas('{}', idsConocidos), {});
});
