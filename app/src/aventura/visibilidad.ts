// Visibilidad narrativa (encargo P1 §D): una pregunta solo se ofrece cuando la
// narración del Modo Historia ya ha presentado los pasajes en que se apoya.
// La relación es por identificadores (question.passage_ids ↔ beat.utterances
// .passage_ids), nunca por posición de fichero: cuando la narración incorpore
// nuevos beats, las preguntas bloqueadas se desbloquean solas, sin cambios en
// la UI ni simulación de contenido no implementado (p. ej., lances posteriores
// a I16).
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
 * Recuperación de partida (EF-AV-08/EF-PER) con compatibilidad de progreso:
 * solo se aceptan entradas legibles de preguntas visibles hoy. Las entradas de
 * preguntas bloqueadas, desconocidas o malformadas se ignoran sin dar por
 * buena la carga (§7.3); el resto del guardado se conserva.
 */
export function respuestasValidas(
  crudo: string | null,
  idsVisibles: ReadonlySet<string>,
): Record<string, RespuestaGuardada> {
  if (!crudo) return {};
  let guardado: unknown;
  try {
    guardado = JSON.parse(crudo);
  } catch {
    return {};
  }
  if (!guardado || typeof guardado !== 'object') return {};
  const valido: Record<string, RespuestaGuardada> = {};
  for (const [id, valor] of Object.entries(guardado as Record<string, unknown>)) {
    if (!idsVisibles.has(id)) continue;
    const r = valor as Partial<RespuestaGuardada> | null;
    if (r && typeof r === 'object' && Array.isArray(r.seleccion)) {
      valido[id] = { acierto: Boolean(r.acierto), seleccion: r.seleccion.map(String) };
    }
  }
  return valido;
}
