// Visibilidad narrativa (encargo P1 §D): la comprobación de los pasajes
// disponibles en los beats indica qué contenido ESTÁ IMPLEMENTADO en la
// narración del episodio (cobertura del catálogo), no qué ha leído
// personalmente el jugador. El Modo Aventura sigue siendo una modalidad
// independiente y aquí no se introduce ningún bloqueo por progreso
// individual. La relación es por identificadores (question.passage_ids ↔
// beat.utterances.passage_ids), nunca por posición de fichero: cuando la
// narración incorpore nuevos beats, las preguntas bloqueadas se desbloquean
// solas, sin cambios en la UI ni simulación de contenido no implementado
// (p. ej., lances posteriores a I16).
import type { Beat, Pregunta } from '../contrato.ts';

/** Pasajes ya narrados: los citados por alguna intervención de los beats. */
export function pasajesNarrados(beats: Beat[]): Set<string> {
  const narrados = new Set<string>();
  for (const beat of beats) {
    for (const intervencion of beat.utterances) {
      for (const pasaje of intervencion.passage_ids ?? []) narrados.add(pasaje);
    }
  }
  return narrados;
}

/** Una pregunta está desbloqueada si TODOS sus pasajes de apoyo ya se narraron. */
export function preguntaDesbloqueada(pregunta: Pregunta, narrados: ReadonlySet<string>): boolean {
  return (pregunta.passage_ids ?? []).every((p) => narrados.has(p));
}

export interface SeparacionVisibilidad {
  visibles: Pregunta[];
  bloqueadas: Pregunta[];
}

/** Separa las preguntas del episodio según la cobertura real de la narración. */
export function separarVisibles(preguntas: Pregunta[], narrados: ReadonlySet<string>): SeparacionVisibilidad {
  const visibles: Pregunta[] = [];
  const bloqueadas: Pregunta[] = [];
  for (const pregunta of preguntas) {
    (preguntaDesbloqueada(pregunta, narrados) ? visibles : bloqueadas).push(pregunta);
  }
  return { visibles, bloqueadas };
}

/** Forma de una respuesta guardada en progreso.json (EF-AV-08). */
export interface RespuestaGuardada {
  acierto: boolean;
  seleccion: string[];
}

/**
 * Recuperación de partida (EF-AV-08/EF-PER) con conservación de progreso:
 * se aceptan TODAS las entradas bien formadas de preguntas conocidas del
 * episodio, INCLUIDAS las de preguntas hoy bloqueadas — su respuesta anterior
 * debe seguir almacenada para cuando se desbloqueen (corrección P0: el
 * autoguardado nunca puede borrar respuestas válidas). Los IDs desconocidos y
 * los datos malformados se descartan sin dar por buena la carga (§7.3).
 * El marcador, el avance y la navegación usan solo respuestasVisibles().
 */
export function respuestasGuardadas(
  crudo: string | null,
  idsConocidos: ReadonlySet<string>,
): Record<string, RespuestaGuardada> {
  if (!crudo) return {};
  let guardado: unknown;
  try {
    guardado = JSON.parse(crudo);
  } catch {
    return {};
  }
  if (!guardado || typeof guardado !== 'object') return {};
  const guardadas: Record<string, RespuestaGuardada> = {};
  for (const [id, valor] of Object.entries(guardado as Record<string, unknown>)) {
    if (!idsConocidos.has(id)) continue;
    const r = valor as Partial<RespuestaGuardada> | null;
    if (r && typeof r === 'object' && Array.isArray(r.seleccion)) {
      guardadas[id] = { acierto: Boolean(r.acierto), seleccion: r.seleccion.map(String) };
    }
  }
  return guardadas;
}

/**
 * Subconjunto de las respuestas almacenadas que corresponde a preguntas
 * visibles hoy: lo único que se muestra y contabiliza en el marcador mientras
 * haya preguntas bloqueadas. Las respuestas conservadas de preguntas
 * bloqueadas reaparecen aquí automáticamente cuando la narración las
 * desbloquea.
 */
export function respuestasVisibles(
  guardadas: Record<string, RespuestaGuardada>,
  idsVisibles: ReadonlySet<string>,
): Record<string, RespuestaGuardada> {
  const hoy: Record<string, RespuestaGuardada> = {};
  for (const [id, respuesta] of Object.entries(guardadas)) {
    if (idsVisibles.has(id)) hoy[id] = respuesta;
  }
  return hoy;
}
