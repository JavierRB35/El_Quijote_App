/**
 * Decisión de presentación DC-28. Los paneles ordinarios se dibujan completos
 * sobre una superficie sin scroll; si no conservan suficiente espacio para la
 * escena, se pasa a una vista dedicada SIN imagen (no es un overlay).
 *
 * Umbrales conservadores de presupuesto vertical, no límites tipográficos:
 * el DOM se mide de verdad en ContenedorCine y nunca se trunca contenido.
 */
export type EstadoComposicion = 'narracion' | 'pregunta';

export function requiereVistaDedicada(
  altoContenido: number,
  altoViewport: number,
  estado: EstadoComposicion,
  fueraDeViewport = false,
): boolean {
  if (
    !Number.isFinite(altoContenido) ||
    !Number.isFinite(altoViewport) ||
    altoViewport <= 0 || altoContenido < 0
  ) return true;
  // En pregunta: reservar al menos 38% del viewport a la imagen completa;
  // en narración: reservar espacio a cabecera y acciones.
  const maximo = altoViewport * (estado === 'pregunta' ? 0.62 : 0.82);
  return fueraDeViewport || altoContenido > maximo;
}
