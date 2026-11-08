// Lógica pura del Modo Historia (sin DOM ni Tauri): estructura de lectura,
// política de lectura mínima (TS-001 / COMPONENTES_NARRATIVOS_UX §2.3) y
// serialización del progreso. El reproductor solo orquesta esta lógica.
// Nota: sintaxis «erasable» y rutas con extensión para poder ejecutarla
// también directamente con node --test (type stripping nativo).
import type { Beat, Escena, Intervencion, MediaAsset } from '../contrato.ts';
import { resolverPlano, type PlanoResuelto } from '../cine/resolverPlano.ts';

/** Un paso de lectura: una intervención con su contexto (escena, beat). */
export interface ItemLectura {
  posicion: number;
  escena: Escena;
  escenaIdx: number;
  beat: Beat;
  beatIdx: number;
  intervencion: Intervencion;
  intervencionIdx: number;
}

/**
 * Secuencia lineal de lectura del episodio: escenas en orden canónico,
 * beats por su campo `order`, intervenciones en el orden del beat.
 * Genérica: no sabe nada de los molinos.
 */
export function estructuraHistoria(escenas: Escena[], beatsPorEscena: Beat[][]): ItemLectura[] {
  const items: ItemLectura[] = [];
  escenas.forEach((escena, escenaIdx) => {
    (beatsPorEscena[escenaIdx] ?? []).forEach((beat, beatIdx) => {
      beat.utterances.forEach((intervencion, intervencionIdx) => {
        items.push({
          posicion: items.length,
          escena,
          escenaIdx,
          beat,
          beatIdx,
          intervencion,
          intervencionIdx,
        });
      });
    });
  });
  return items;
}

export function palabrasDe(texto: string): number {
  const recortado = texto.trim();
  return recortado ? recortado.split(/\s+/).length : 0;
}

/** Política de lectura mínima (DC-21/TS-001): max(1500 ms, 800 + 35 ms/palabra),
 *  elevable por beat con lectura_minima_ms (solo puede alzar el suelo). El
 *  texto completo permanece en pantalla durante todo ese tiempo y más — nunca
 *  se usa la duración de locuciones como temporizador. */
export function lecturaMinimaMs(texto: string, sueloBeat?: number): number {
  const suelo = 1500;
  const porPalabras = 800 + 35 * palabrasDe(texto);
  const base = Math.max(suelo, porPalabras);
  return Math.max(base, sueloBeat ?? 0);
}

/** Progreso independiente del Modo Historia (el de Aventura queda intacto). */
export interface ProgresoHistoria {
  version: 1;
  episodio_id: string;
  escena_id: string;
  beat_id: string;
  intervencion_id: string;
  avance_automatico: boolean | null;
}

export function progresoDesde(
  items: ItemLectura[],
  posicion: number,
  episodioId: string,
  auto: boolean | null,
): ProgresoHistoria {
  const item = items[posicion];
  return {
    version: 1,
    episodio_id: episodioId,
    escena_id: item.escena.id,
    beat_id: item.beat.id,
    intervencion_id: item.intervencion.utterance_id,
    avance_automatico: auto,
  };
}

export interface LecturaRestaurada {
  posicion: number;
  auto: boolean | null;
}

/**
 * Reconstruye la posición de reproducción desde los datos guardados (sin
 * depender de imágenes ni audio): resuelve escena→beat→intervención por ID
 * contra la estructura cargada. Un guardado corrupto, de otro episodio o de
 * IDs que ya no existen se descarta sin dar por buena la carga.
 */
export function restaurarPosicion(
  items: ItemLectura[],
  episodioId: string,
  crudo: string,
): LecturaRestaurada | null {
  let guardado: unknown;
  try {
    guardado = JSON.parse(crudo);
  } catch {
    return null;
  }
  const p = guardado as Partial<ProgresoHistoria> | null;
  if (!p || typeof p !== 'object') return null;
  if (p.episodio_id !== episodioId) return null;
  if (!items.length) return null;
  const idx = items.findIndex((i) => i.intervencion.utterance_id === p.intervencion_id);
  if (idx === -1) return null;
  const item = items[idx];
  const coherente =
    item.escena.id === p.escena_id &&
    item.beat.id === p.beat_id &&
    typeof p.version === 'number';
  if (!coherente) return null;
  const auto = typeof p.avance_automatico === 'boolean' ? p.avance_automatico : null;
  return { posicion: idx, auto };
}

/** Índice plano del primer paso del beat actual (Repetir beat). */
export function inicioDeBeat(items: ItemLectura[], posicion: number): number {
  const item = items[posicion];
  if (!item) return 0;
  return items.findIndex((i) => i.beat.id === item.beat.id);
}

/**
 * Plano visible en una posición de la lectura (encargo P1): recomputación
 * determinista desde el inicio de la ESCENA del beat actual (la frontera de
 * escena reinicializa la perspectiva — R-V4; una partida restaurada recomputa
 * idéntico — R-V10). Acumula las declaraciones de beat (E-1) y delega cada
 * paso en resolverPlano (E-2 fail-closed, persistencia R-V3, neutro R-V6).
 */
export function planoDePosicion(
  items: ItemLectura[],
  posicion: number,
  medios: Readonly<Record<string, MediaAsset>>,
): PlanoResuelto {
  const item = items[posicion];
  if (!item) return { activo: null, causa: 'neutro_editorial' };
  const escenaId = item.escena.id;
  let vigente: MediaAsset | null = null;
  const declarados = new Set<string>();
  let resultado: PlanoResuelto = { activo: null, causa: 'neutro_editorial' };
  for (let i = 0; i <= posicion; i++) {
    const paso = items[i];
    if (paso.escena.id !== escenaId) continue; // escenas anteriores: no heredan
    for (const id of paso.beat.visual_asset_ids) declarados.add(id);
    resultado = resolverPlano({
      beat: paso.beat,
      escena: paso.escena,
      medios,
      declarados,
      planoVigente: vigente,
    });
    vigente = resultado.activo;
  }
  return resultado;
}

/** Etiqueta visible del hablante: rótulo del personaje o «Narrador». */
export function etiquetaHablante(intervencion: Intervencion): string {
  const speaker = intervencion.speaker;
  if (speaker.tipo === 'narrador') return 'Narrador';
  return speaker.label ?? speaker.person_id ?? 'Personaje';
}
