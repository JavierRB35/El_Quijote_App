/** Geometría de presentación, sin modificar contratos ni aprobar imágenes. */
export interface Rectangulo { x: number; y: number; w: number; h: number }

export function regionesLibres(ancho: number, alto: number, critica?: Rectangulo): Rectangulo[] {
  const margen = 24;
  const disponible = { x: margen, y: 76, w: ancho - margen * 2, h: alto - 116 };
  if (!critica) return [disponible];
  const c = { x: critica.x * ancho, y: critica.y * alto, w: critica.w * ancho, h: critica.h * alto };
  return [
    { ...disponible, w: c.x - margen * 2 },
    { ...disponible, x: c.x + c.w + margen, w: ancho - c.x - c.w - margen * 2 },
    { ...disponible, h: c.y - disponible.y - margen },
    { ...disponible, y: c.y + c.h + margen, h: alto - c.y - c.h - margen - 40 },
  ].filter(r => r.w >= 280 && r.h >= 120).sort((a, b) => b.w * b.h - a.w * a.h);
}

/** Cover solo cuando el recorte conserva el rectángulo protegido completo. */
export function encuadreSeguro(ancho: number, alto: number, iw: number, ih: number, critica?: Rectangulo) {
  if (!iw || !ih || !critica) return { fit: 'contain' as const, region: critica };
  const escala = Math.max(ancho / iw, alto / ih);
  const w = iw * escala, h = ih * escala;
  const x = (ancho - w) / 2, y = (alto - h) / 2;
  const region = { x: (x + critica.x * w) / ancho, y: (y + critica.y * h) / alto,
    w: critica.w * w / ancho, h: critica.h * h / alto };
  if (region.x >= 0 && region.y >= 0 && region.x + region.w <= 1 && region.y + region.h <= 1) {
    return { fit: 'cover' as const, region };
  }
  const s = Math.min(ancho / iw, alto / ih);
  return { fit: 'contain' as const, region: {
    x: ((ancho - iw * s) / 2 + critica.x * iw * s) / ancho,
    y: ((alto - ih * s) / 2 + critica.y * ih * s) / alto,
    w: critica.w * iw * s / ancho, h: critica.h * ih * s / alto,
  } };
}
