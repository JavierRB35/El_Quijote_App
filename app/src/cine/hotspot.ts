// Geometría del hotspot (P0, Issue #75): mapping entre coordenadas
// normalizadas de la IMAGEN (contrato: hotspot_area 0..1 sobre el activo) y
// coordenadas de PANTALLA sobre el fotograma presentado, resolviendo el
// object-fit real (cover recorta; contain añade bandas de letterbox). Función
// pura y «erasable» para node --test; sin conocimiento de React ni del DOM.
// La presentación del hotspot es 'contain' con fotograma estático (sin
// deriva): señalar exige una imagen quieta y íntegra.

export interface Recta {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Zona normalizada del contrato (hotspot_area). */
export interface Zona {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type AjustePlano = 'cover' | 'contain';

/**
 * Recta de la imagen DIBUJADA dentro de su caja (coordenadas de la caja,
 * p. ej. el viewport). Con 'contain' la recta queda dentro de la caja
 * (letterbox) y se alinea según `alinear` (object-position): 'centro' por
 * defecto, 'inicio' pega la imagen al lado izquierdo y 'fin' al derecho —
 * así el letterbox queda del lado del panel y la obra no queda bajo él.
 * Con 'cover' puede desbordar la caja (recorte centrado). Dimensiones no
 * positivas devuelven la caja entera (guardia: sin imagen medible aún).
 */
export function rectaContenido(
  naturalAncho: number,
  naturalAlto: number,
  cajaAncho: number,
  cajaAlto: number,
  ajuste: AjustePlano,
  alinear: 'centro' | 'inicio' | 'fin' = 'centro',
): Recta {
  if (
    naturalAncho <= 0 || naturalAlto <= 0 || cajaAncho <= 0 || cajaAlto <= 0 ||
    !Number.isFinite(naturalAncho + naturalAlto + cajaAncho + cajaAlto)
  ) {
    return { x: 0, y: 0, w: cajaAncho, h: cajaAlto };
  }
  const escala =
    ajuste === 'cover'
      ? Math.max(cajaAncho / naturalAncho, cajaAlto / naturalAlto)
      : Math.min(cajaAncho / naturalAncho, cajaAlto / naturalAlto);
  const w = naturalAncho * escala;
  const h = naturalAlto * escala;
  const x =
    ajuste === 'contain' && alinear === 'inicio'
      ? 0
      : ajuste === 'contain' && alinear === 'fin'
        ? cajaAncho - w
        : (cajaAncho - w) / 2;
  return { x, y: (cajaAlto - h) / 2, w, h };
}

/**
 * Punto de pantalla → coordenadas normalizadas de la imagen (0..1) según la
 * recta dibujada. Devuelve null si el punto cae fuera de la imagen (bandas de
 * letterbox): señalar «fuera del cuadro» no es una respuesta.
 */
export function coordenadasImagen(
  px: number,
  py: number,
  recta: Recta,
): { u: number; v: number } | null {
  if (recta.w <= 0 || recta.h <= 0) return null;
  if (px < recta.x || py < recta.y || px > recta.x + recta.w || py > recta.y + recta.h) {
    return null;
  }
  return { u: (px - recta.x) / recta.w, v: (py - recta.y) / recta.h };
}

/** ¿Está el punto normalizado dentro de la zona del contrato? Bordes inclusivos. */
export function puntoEnZona(u: number, v: number, zona: Zona): boolean {
  return (
    u >= zona.x && u <= zona.x + zona.w && v >= zona.y && v <= zona.y + zona.h
  );
}

/** Recta en pantalla de una zona normalizada (para la marca de respuesta). */
export function rectaZonaEnPantalla(zona: Zona, recta: Recta): Recta {
  return {
    x: recta.x + zona.x * recta.w,
    y: recta.y + zona.y * recta.h,
    w: zona.w * recta.w,
    h: zona.h * recta.h,
  };
}
