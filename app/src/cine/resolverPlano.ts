// Resolución del plano visible (encargo P1, decisiones de producto 2 y 8):
// función pura, orientada a datos — decide qué imagen se muestra y cuándo el
// fondo neutro es el resultado correcto. Implementa las reglas de elegibilidad
// vigentes (ENTREGA_R11_H5_ADR0005 §3.2.1, E-1…E-4, fail-closed) sin
// hardcodear contenido editorial: el código nunca nombra activos concretos,
// solo señales del contrato (function, spoiler_level, visual_asset_ids).
// Sintaxis «erasable» para poder probarla con node --test (type stripping).
import type { Beat, Escena, MediaAsset } from '../contrato.ts';

/** Resultado de la resolución: qué mostrar en la capa cinematográfica. */
export interface PlanoResuelto {
  /** Activo elegible y cargable, o null si corresponde fondo neutro. */
  activo: MediaAsset | null;
  /** Causa del resultado — la UI solo la usa para el log; el neutro por
   *  elegibilidad o persistencia vacía NO produce señal de error alguna
   *  (R08-N0: las señales se asocian a sucesos de fallo, no a resultados). */
  causa:
    | 'declarado_en_beat'   // E-1: el beat declara el activo
    | 'de_escena'           // E-2: activo de la escena, elegible y sin spoiler
    | 'persistencia'        // R-V3: [] mantiene el plano vigente
    | 'neutro_editorial'    // diseño/editorial: no hay activo elegible (sin fallo)
    | 'neutro_fail_closed'; // E-4: elegibilidad dudosa → neutro seguro
}

/**
 * ¿Es elegible un activo de la ESCENA (no declarado por el beat) en este
 * momento? Regla E-2 fail-closed: solo señales inequívocas permiten mostrarlo;
 * ante la duda, exclusión (nunca riesgo de spoiler).
 *
 * - `post_desenlace`: representa el desenlace; jamás se muestra por herencia
 *   de escena, solo si un beat lo declara expresamente (E-1).
 * - `spoiler_level: revelador`: excluido siempre en la cascada.
 * - Cualquier otra función/nivel no acredita elegibilidad por sí misma: se
 *   admite con cautela (ninguno/leve con función pre_pregunta/referencia),
 *   que es el uso vigente de las pre-imágenes del piloto.
 */
export function elegibleDeEscena(medio: MediaAsset, declarados: ReadonlySet<string>): boolean {
  if (declarados.has(medio.id)) return true; // declarado: E-1 manda
  if (medio.function === 'post_desenlace') return false;
  if (medio.spoiler_level === 'revelador') return false;
  return true;
}

export interface EntradaResolucion {
  /** Beat actual (sus visual_asset_ids son declaración editorial, E-1). */
  beat: Pick<Beat, 'visual_asset_ids' | 'scene_id'>;
  /** Escena vigente (media_ids como respaldo, filtrados por elegibilidad). */
  escena: Pick<Escena, 'id' | 'media_ids'>;
  /** Catálogo de medios indexado por id. */
  medios: Readonly<Record<string, MediaAsset>>;
  /** Ids declarados en este beat o en beats anteriores de la MISMA escena
   *  (E-1: la colocación en j habilita desde j en adelante). */
  declarados: ReadonlySet<string>;
  /** Plano vigente mostrado en el beat anterior (persistencia R-V3). */
  planoVigente: MediaAsset | null;
}

/**
 * Resuelve el plano del beat actual. Orden de la cascada (R-V3 antes que el
 * respaldo de escena: un beat con `[]` declara «no toques el plano»; el
 * respaldo de escena es el failover cuando no hay nada que persistir):
 *   1. primer activo declarado por el beat (E-1);
 *   2. plano vigente (persistencia R-V3; el llamador nunca cruza la frontera
 *      de escena — R-V4 — y aquí se guarda además por membresía/declaración);
 *   3. activos de la escena elegibles (E-2, fail-closed);
 *   4. fondo neutro editorial — resultado legítimo, nunca un error.
 * El fallo de CARGA físico no se resuelve aquí: el llamador reintenta la
 * reserva siguiente y, si todo falla, presenta neutro con la única nota
 * discreta prevista (UX-ER-1); esta función es pura y no conoce la red.
 */
export function resolverPlano(entrada: EntradaResolucion): PlanoResuelto {
  const { beat, escena, medios, declarados, planoVigente } = entrada;

  // 1. Declaración del beat (E-1): el primer id existente en el catálogo.
  for (const id of beat.visual_asset_ids) {
    const medio = medios[id];
    if (medio) return { activo: medio, causa: 'declarado_en_beat' };
  }

  // 2. Persistencia intra-escena (R-V3): el vigente sigue siendo el plano —
  //    no se recarga ni se repinta. Guardia anti-frontera (R-V4): solo si el
  //    vigente pertenece a esta escena (declarado en ella o en media_ids).
  if (planoVigente && (declarados.has(planoVigente.id) || escena.media_ids.includes(planoVigente.id))) {
    return { activo: planoVigente, causa: 'persistencia' };
  }

  // 3. Respaldo de la escena con filtro de elegibilidad (E-2/E-4).
  for (const id of escena.media_ids) {
    const medio = medios[id];
    if (medio && elegibleDeEscena(medio, declarados)) {
      return { activo: medio, causa: 'de_escena' };
    }
  }

  // 4. Neutro: consecuencia legítima (diseño editorial o fail-closed).
  const habiaCandidatos = escena.media_ids.length > 0 || beat.visual_asset_ids.length > 0;
  return {
    activo: null,
    causa: habiaCandidatos ? 'neutro_fail_closed' : 'neutro_editorial',
  };
}

/**
 * Encuadre y zonas seguras de un activo (encargo P1, decisión de producto 7):
 * el lado reservado para el texto y la región crítica que los paneles no
 * deben cubrir. Los valores derivan del manifiesto de escenas
 * (assets/scenes/manifest.json → preferred_overlay_side) y de la dirección
 * artística (sujeto en tercio izquierdo, franja derecha de TS-001); son
 * hipótesis de layout pendientes de validación de legibilidad (DOSSIER_H4 §3.5).
 */
export interface Encuadre {
  media_id: string;
  /** Lado que queda libre para paneles de texto: 'derecha' | 'izquierda'. */
  lado_texto: 'derecha' | 'izquierda';
  /** Región crítica (porcentaje del fotograma 1672×941) que ningún panel
   *  cubre: x, y (esquina sup-izq) y w, h (tamaño), en tanto por uno. */
  region_critica: { x: number; y: number; w: number; h: number };
}

export interface Encuadres {
  version: number;
  actualizado: string;
  fuente: string;
  encuadres: Encuadre[];
}

/**
 * Cuadro de encuadres versionado en código (fuente: encuadres.json, misma
 * carpeta; el test cine.test.ts valida su cobertura y su coherencia con el
 * manifiesto). Si un activo no tiene entrada, se aplica el encuadre por
 * defecto de la dirección artística: texto a la derecha, sujeto a la izquierda.
 */
import encuadresJson from './encuadres.json' with { type: 'json' };
const TABLA = encuadresJson as Encuadres;

export function encuadreDe(mediaId: string): Encuadre {
  const hallado = TABLA.encuadres.find((e) => e.media_id === mediaId);
  if (hallado) return hallado;
  return {
    media_id: mediaId,
    lado_texto: 'derecha',
    region_critica: { x: 0, y: 0, w: 0.6, h: 1 },
  };
}

export function versionEncuadres(): number {
  return TABLA.version;
}
