/**
 * Decisión de presentación DC-28. Los paneles ordinarios se dibujan completos
 * sobre una superficie sin scroll; si no conservan suficiente espacio para la
 * escena, se pasa a una vista dedicada SIN imagen (no es un overlay).
 *
 * Umbrales conservadores de presupuesto vertical, no límites tipográficos:
 * el DOM se mide de verdad en ContenedorCine y nunca se trunca contenido.
 */
export type EstadoComposicion = 'narracion' | 'pregunta';
export type DisposicionPregunta = 'inferior' | 'lateral';

export function requiereVistaDedicada(
  altoContenido: number,
  altoViewport: number,
  estado: EstadoComposicion,
  fueraDeViewport = false,
  disposicion: DisposicionPregunta = 'inferior',
): boolean {
  if (
    !Number.isFinite(altoContenido) ||
    !Number.isFinite(altoViewport) ||
    altoViewport <= 0 || altoContenido < 0
  ) return true;
  // Raíl lateral: usar altura no reduce la imagen (columnas independientes),
  // a diferencia de la banda inferior. No forzar una lectura separada por
  // superar el presupuesto propio de un panel que ocupa la parte baja.
  const presupuestoPregunta = disposicion === 'lateral' ? 0.88 : 0.62;
  const maximo = altoViewport * (estado === 'pregunta' ? presupuestoPregunta : 0.82);
  return fueraDeViewport || altoContenido > maximo;
}
