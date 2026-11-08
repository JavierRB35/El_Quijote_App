// Motor puro de Aventura v2. Separado de React y del catálogo histórico de preguntas.
// Reglas A–J aprobadas por el propietario: dificultad uniforme y moderada.
export const PUNTOS_INICIALES = 3;
export const PUNTOS_MAXIMOS = 5;
export const VERSION_PARTIDA = 2;
export const EPISODIO_AVENTURA = 'DQ.P1.C08.E01';

export type Fase = 'pregunta' | 'resultado' | 'revelacion' | 'checkpoint' | 'completada';

export interface OpcionNarrativa { id: string; texto: string }
export interface ImagenNarrativa {
  uri: string;
  alt: string;
  medioId?: string;
}
export interface RondaNarrativa {
  id: string;
  tramo: string;
  contexto: string;
  personaje: string;
  pregunta: string;
  opciones: OpcionNarrativa[];
  correcta: string;
  consecuencia: string;
  explicacion: string;
  pasajeId: string;
  imagenPrevia: ImagenNarrativa;
  imagenConsecuencia: ImagenNarrativa;
  checkpoint?: { id: string; titulo: string; mayor?: boolean };
}

export interface Partida {
  version: 2;
  episodio: string;
  indice: number;
  puntos: number;
  fase: Fase;
  intento: number;
  checkpoint: { indice: number; puntos: number };
  seleccion: string | null;
  aciertoActual: boolean | null;
  aciertos: number;
  errores: number;
  vistas: string[];
}

export function nuevaPartida(intento = 0): Partida {
  return {
    version: VERSION_PARTIDA,
    episodio: EPISODIO_AVENTURA,
    indice: 0,
    puntos: PUNTOS_INICIALES,
    fase: 'pregunta',
    intento,
    checkpoint: { indice: 0, puntos: PUNTOS_INICIALES },
    seleccion: null,
    aciertoActual: null,
    aciertos: 0,
    errores: 0,
    vistas: [],
  };
}

export function ordenarOpciones(ronda: RondaNarrativa, intento: number): OpcionNarrativa[] {
  // En cada repetición hay una rotación efectiva sin alterar el ID correcto.
  const giro = ((intento % ronda.opciones.length) + ronda.opciones.length) % ronda.opciones.length;
  return [...ronda.opciones.slice(giro), ...ronda.opciones.slice(0, giro)];
}

export function responder(partida: Partida, ronda: RondaNarrativa, opcionId: string): Partida {
  if (partida.fase !== 'pregunta' || !ronda.opciones.some((o) => o.id === opcionId)) return partida;
  const acierto = ronda.correcta === opcionId;
  return {
    ...partida,
    fase: 'resultado',
    seleccion: opcionId,
    aciertoActual: acierto,
    puntos: Math.max(0, Math.min(PUNTOS_MAXIMOS, partida.puntos + (acierto ? 1 : -1))),
    aciertos: partida.aciertos + Number(acierto),
    errores: partida.errores + Number(!acierto),
  };
}

export function revelar(partida: Partida): Partida {
  return partida.fase === 'resultado' ? { ...partida, fase: 'revelacion' } : partida;
}

export function continuar(partida: Partida, rondas: readonly RondaNarrativa[]): Partida {
  if (partida.fase === 'checkpoint') {
    return {
      ...partida,
      indice: partida.checkpoint.indice >= rondas.length ? partida.indice : partida.checkpoint.indice,
      fase: partida.checkpoint.indice >= rondas.length ? 'completada' : 'pregunta',
      seleccion: null,
      aciertoActual: null,
    };
  }
  if (partida.fase !== 'revelacion') return partida;
  const ronda = rondas[partida.indice];
  if (!ronda) return partida;
  const vistas = Array.from(new Set([...partida.vistas, ronda.id]));
  if (partida.puntos === 0) {
    // G1: consecuencia vista; restaurar último checkpoint y reordenar alternativas.
    return {
      ...partida,
      indice: partida.checkpoint.indice,
      puntos: Math.max(PUNTOS_INICIALES, partida.checkpoint.puntos),
      intento: partida.intento + 1,
      fase: 'pregunta',
      seleccion: null,
      aciertoActual: null,
      vistas,
    };
  }
  if (ronda.checkpoint) {
    // B2/E2: +1 por cada cruce real, incluido un nuevo recorrido del episodio.
    // El punto se añade ANTES de guardar la instantánea.
    const puntos = Math.min(PUNTOS_MAXIMOS, partida.puntos + 1);
    return {
      ...partida,
      fase: 'checkpoint',
      puntos,
      checkpoint: { indice: partida.indice + 1, puntos },
      vistas,
    };
  }
  return {
    ...partida,
    indice: partida.indice + 1,
    fase: partida.indice + 1 >= rondas.length ? 'completada' : 'pregunta',
    seleccion: null,
    aciertoActual: null,
    vistas,
  };
}

export function restaurarPartida(raw: string | null, rondas: readonly RondaNarrativa[]): Partida | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const p = parsed as { partida?: unknown; version?: unknown; episodio?: unknown };
    if (p.version !== VERSION_PARTIDA || p.episodio !== EPISODIO_AVENTURA) return null;
    const e = p.partida as Partida | null;
    if (!e || typeof e !== 'object' ||
        e.version !== VERSION_PARTIDA || e.episodio !== EPISODIO_AVENTURA ||
        !Number.isInteger(e.indice) || e.indice < 0 || e.indice >= rondas.length ||
        !Number.isInteger(e.puntos) || e.puntos < 0 || e.puntos > PUNTOS_MAXIMOS ||
        !['pregunta', 'resultado', 'revelacion', 'checkpoint', 'completada'].includes(e.fase) ||
        !Number.isInteger(e.intento) || e.intento < 0 ||
        !e.checkpoint || !Number.isInteger(e.checkpoint.indice) ||
        e.checkpoint.indice < 0 || e.checkpoint.indice > rondas.length ||
        e.checkpoint.indice > e.indice + 1 ||
        !Number.isInteger(e.checkpoint.puntos) ||
        e.checkpoint.puntos < PUNTOS_INICIALES || e.checkpoint.puntos > PUNTOS_MAXIMOS ||
        !Number.isInteger(e.aciertos) || e.aciertos < 0 ||
        !Number.isInteger(e.errores) || e.errores < 0 ||
        !Array.isArray(e.vistas) || !e.vistas.every((id) => typeof id === 'string' && rondas.some((x) => x.id === id))
    ) return null;
    if (e.fase === 'checkpoint' && !rondas[e.indice]?.checkpoint) return null;
    if ((e.fase === 'resultado' || e.fase === 'revelacion') &&
        (!rondas[e.indice]?.opciones.some((o) => o.id === e.seleccion) ||
         typeof e.aciertoActual !== 'boolean')) return null;
    if (e.fase === 'pregunta' && e.puntos === 0) return null;
    return e;
  } catch {
    return null;
  }
}
