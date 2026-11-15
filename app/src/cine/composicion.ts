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

/** DC-41: anclas discretas, preferencia fuerte por el extremo inferior derecho.
 *  Los márgenes preservan flechas laterales, controles inferiores y cabecera. */
export function posicionesPergamino(
  ancho: number, alto: number, anchoPanel: number, altoPanel: number,
): Rectangulo[] {
  const margenLateral = ancho < 800 ? 60 : 96;
  const margenInferior = alto < 700 ? 86 : 110;
  const minimoSuperior = 78;
  const margenIzquierdo = 20;
  const x = ancho - margenLateral - anchoPanel;
  const y = alto - margenInferior - altoPanel;
  if (x < margenIzquierdo || y < minimoSuperior) return [];
  const candidatos: Rectangulo[] = [
    { x, y, w: anchoPanel, h: altoPanel }, // opción habitual: esquina inferior derecha
    { x, y: y - 52, w: anchoPanel, h: altoPanel },
    { x, y: y - 104, w: anchoPanel, h: altoPanel },
    { x: x - 100, y, w: anchoPanel, h: altoPanel },
    { x: x - 180, y, w: anchoPanel, h: altoPanel },
    { x: margenIzquierdo, y, w: anchoPanel, h: altoPanel }, // excepción final justificada
  ];
  return candidatos.filter(r =>
    r.x >= margenIzquierdo && r.y >= minimoSuperior &&
    r.x + r.w <= ancho - 16 && r.y + r.h <= alto - 32
  );
}

export function solapamientoPergamino(rect: Rectangulo, foco: Rectangulo): number {
  const x = Math.max(0, Math.min(rect.x + rect.w, foco.x + foco.w) - Math.max(rect.x, foco.x));
  const y = Math.max(0, Math.min(rect.y + rect.h, foco.y + foco.h) - Math.max(rect.y, foco.y));
  return (x * y) / Math.max(1, rect.w * rect.h);
}

/** Reubicar solo si una zona focal suficientemente precisa lo justifica.
 *  Los rectángulos históricos excesivamente amplios son hipótesis de QA, no
 *  prueba para desplazar violentamente el pergamino de su ancla estable. */
export function elegirPergamino(
  posiciones: readonly Rectangulo[], ancho: number, alto: number, focoNormalizado?: Rectangulo,
): { rect: Rectangulo; focoLibre: boolean; movido: boolean } | null {
  if (!posiciones.length) return null;
  const primario = posiciones[0];
  if (!focoNormalizado) return { rect: primario, focoLibre: true, movido: false };
  const foco = {
    x: focoNormalizado.x * ancho, y: focoNormalizado.y * alto,
    w: focoNormalizado.w * ancho, h: focoNormalizado.h * alto,
  };
  const solapeInicial = solapamientoPergamino(primario, foco);
  if (solapeInicial <= .08) return { rect: primario, focoLibre: true, movido: false };
  if (focoNormalizado.w * focoNormalizado.h > .38) {
    return { rect: primario, focoLibre: false, movido: false };
  }
  let mejor = primario;
  let solapeMejor = solapeInicial;
  for (const candidato of posiciones.slice(1)) {
    const solape = solapamientoPergamino(candidato, foco);
    if (solape + .10 < solapeMejor) {
      mejor = candidato;
      solapeMejor = solape;
      if (solape <= .08) break;
    }
  }
  if (solapeInicial - solapeMejor < .16) {
    mejor = primario;
    solapeMejor = solapeInicial;
  }
  return { rect: mejor, focoLibre: solapeMejor <= .08, movido: mejor !== primario };
}
