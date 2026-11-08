// Presentación de opciones (corrección P1 de ordenación): las opciones de una
// pregunta de ordenación no deben presentarse inicialmente en el orden
// correcto ni depender del azar para aparecer desordenadas. La presentación es
// determinista: la misma pregunta se muestra siempre en el mismo orden, y si
// el orden de los datos coincidiera con correct_order, se aplica un desorden
// fijo derivado del identificador de la pregunta (nunca aleatorio, nunca el
// correcto). La evaluación sigue haciéndose por identificadores.
import type { Interaccion, Pregunta } from '../contrato.ts';

function mismosIds(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((id, i) => id === b[i]);
}

/** Desorden fijo no trivial: rotación determinista en [1, n-1], jamás identidad. */
export function desordenFijo(ids: string[], semilla: string): string[] {
  const n = ids.length;
  if (n < 2) return [...ids];
  let hash = 2166136261; // FNV-1a sobre la semilla (id de la pregunta)
  for (let i = 0; i < semilla.length; i++) {
    hash ^= semilla.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const salto = 1 + (hash >>> 0) % (n - 1);
  return ids.slice(salto).concat(ids.slice(0, salto));
}

/**
 * Orden de presentación de las opciones de una pregunta. Para ordering,
 * garantiza que el orden visible difiera de correct_order; para el resto de
 * tipos se respeta el orden de datos (el consumidor es fiel al paquete).
 */
export function ordenPresentacion(pregunta: Pregunta): string[] {
  const inter: Interaccion = pregunta.interaction;
  const ids = inter.options.map((o) => o.id);
  if (inter.type !== 'ordering') return ids;
  const correcta = inter.correct_order ?? [];
  if (!correcta.length || !mismosIds(ids, correcta)) return ids;
  return desordenFijo(ids, pregunta.id);
}
