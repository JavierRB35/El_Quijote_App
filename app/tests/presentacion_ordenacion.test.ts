// Prueba de presentación no resuelta (corrección P1 de ordenación): para TODAS
// las preguntas de ordenación del paquete real —incluida DQ.Q.000108— el orden
// con que se presentan las opciones no puede coincidir con correct_order ni
// depender del azar; y el consumidor garantiza esa propiedad en runtime.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Pregunta } from '../src/contrato.ts';
import { desordenFijo, ordenPresentacion } from '../src/aventura/presentacion.ts';

const RAIZ = join(import.meta.dirname, '..', '..');

function cargarPregunta(rutaRelativa: string): Pregunta {
  return JSON.parse(readFileSync(join(RAIZ, 'content', 'piloto', rutaRelativa), 'utf-8')) as Pregunta;
}

function preguntasDeOrdenacionDelPaquete(): Pregunta[] {
  const paquete = JSON.parse(
    readFileSync(join(RAIZ, 'content', 'piloto', 'package.json'), 'utf-8'),
  ) as { files: Record<string, string[]> };
  const rutas = paquete.files['questions'] ?? [];
  const preguntas = rutas.map(cargarPregunta);
  return preguntas.filter((q) => q.interaction.type === 'ordering');
}

test('desordenFijo: rotación determinista, nunca identidad', () => {
  const ids = ['a', 'b', 'c', 'd'];
  const primera = desordenFijo(ids, 'DQ.Q.000108');
  assert.deepEqual(primera, desordenFijo(ids, 'DQ.Q.000108')); // estable
  assert.notDeepEqual(primera, ids); // jamás el orden original
  assert.deepEqual([...primera].sort(), [...ids].sort()); // mismos elementos
  assert.deepEqual(desordenFijo(['x'], 'semilla'), ['x']); // caso trivial
  assert.notDeepEqual(desordenFijo(ids, 'otra'), desordenFijo(ids, 'otra').map(() => '')); // sanidad
});

test('ordenPresentacion: passthrough cuando los datos ya no están resueltos', () => {
  const pregunta = {
    id: 'DQ.Q.000108',
    interaction: {
      type: 'ordering' as const,
      options: [
        { id: 'O3', label: 'tercera' },
        { id: 'O1', label: 'primera' },
      ],
      correct_order: ['O1', 'O3'],
    },
  } as unknown as Pregunta;
  assert.deepEqual(ordenPresentacion(pregunta), ['O3', 'O1']);
});

test('ordenPresentacion: garantiza presentación no resuelta aunque los datos vengan resueltos', () => {
  const pregunta = {
    id: 'DQ.Q.000108',
    interaction: {
      type: 'ordering' as const,
      options: [
        { id: 'O1', label: 'primera' },
        { id: 'O2', label: 'segunda' },
        { id: 'O3', label: 'tercera' },
        { id: 'O4', label: 'cuarta' },
      ],
      correct_order: ['O1', 'O2', 'O3', 'O4'],
    },
  } as unknown as Pregunta;
  const visible = ordenPresentacion(pregunta);
  assert.notDeepEqual(visible, ['O1', 'O2', 'O3', 'O4']);
  assert.deepEqual([...visible].sort(), ['O1', 'O2', 'O3', 'O4']);
  assert.deepEqual(visible, ordenPresentacion(pregunta)); // sin azar
});

test('presentación no resuelta en TODAS las ordering del paquete real (incluida DQ.Q.000108)', () => {
  const ordenaciones = preguntasDeOrdenacionDelPaquete();
  assert.ok(ordenaciones.length >= 4, `había ${ordenaciones.length} ordering en el paquete`);
  assert.ok(
    ordenaciones.some((q) => q.id === 'DQ.Q.000108'),
    'DQ.Q.000108 debe estar entre las ordering del paquete',
  );
  for (const pregunta of ordenaciones) {
    const inter = pregunta.interaction;
    const idsDatos = inter.options.map((o) => o.id);
    const correcta = inter.correct_order ?? [];
    // 1) en datos: la presentación no puede ser el orden correcto
    assert.notDeepEqual(
      idsDatos,
      correcta,
      `${pregunta.id}: el array de opciones se presenta ya resuelto en datos`,
    );
    // 2) en runtime: la presentación efectiva tampoco puede serlo
    const visible = ordenPresentacion(pregunta);
    assert.notDeepEqual(
      visible,
      correcta,
      `${pregunta.id}: la presentación efectiva coincide con correct_order`,
    );
    // 3) misma colección de opciones por identificador (evaluación intacta)
    assert.deepEqual([...visible].sort(), [...correcta].sort(), `${pregunta.id}: cambia el conjunto`);
  }
});
