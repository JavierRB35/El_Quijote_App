// Museo — Carousel: tira horizontal de miniaturas de la maqueta oficial
// (banda inferior, 5 miniaturas visibles, obra activa con filete dorado,
// flechas en los extremos). Ventana virtualizada: solo se piden las
// miniaturas cercanas, nunca los 376 originales a la vez. La selección
// cambia la imagen principal SIN recrear la pantalla (issue #73 §4).
import { useEffect, useMemo } from 'react';
import { tituloDe, ventanaCarrousel, type Obra } from './obras';

interface Props {
  obras: Obra[];
  indice: number;
  imagenes: Record<string, string>;
  fallos: Record<string, string>;
  pedir: (uri: string) => void;
  onSeleccionar: (indice: number) => void;
}

export default function Carousel({
  obras,
  indice,
  imagenes,
  fallos,
  pedir,
  onSeleccionar,
}: Props) {
  const { indices } = useMemo(
    () => ventanaCarrousel(indice, obras.length, 5),
    [indice, obras.length],
  );

  // carga diferida: la ventana actual y una de margen a cada lado
  useEffect(() => {
    for (const i of indices) {
      obras[i] && pedir(obras[i].uri);
    }
    const antes = indices[0] - 1;
    const despues = indices[indices.length - 1] + 1;
    if (obras[antes]) pedir(obras[antes].uri);
    if (obras[despues]) pedir(obras[despues].uri);
  }, [indices, obras, pedir]);

  return (
    <nav className="museo-carrusel" aria-label="Selector de imágenes del Museo">
      <button
        className="museo-carrusel-flecha"
        onClick={() => onSeleccionar(Math.max(0, indice - 1))}
        disabled={indice === 0}
        aria-label="Miniatura anterior"
      >
        ‹
      </button>
      <div className="museo-carrusel-tira">
        {indices.map((i) => {
          const obra = obras[i];
          const activa = i === indice;
          const src = imagenes[obra.uri];
          return (
            <button
              key={obra.id}
              className={`museo-miniatura${activa ? ' activa' : ''}`}
              onClick={() => onSeleccionar(i)}
              aria-current={activa ? 'true' : undefined}
              aria-label={`${tituloDe(obra)} — miniatura ${i + 1} de ${obras.length}`}
              title={tituloDe(obra)}
            >
              {src ? (
                <img src={src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              ) : fallos[obra.uri] ? (
                <span className="museo-mini-vacia" role="img" aria-label="Miniatura no disponible">
                  ✕
                </span>
              ) : (
                <span className="museo-mini-vacia" aria-hidden="true">…</span>
              )}
              {activa && <span className="sr-only">Obra mostrada</span>}
            </button>
          );
        })}
      </div>
      <button
        className="museo-carrusel-flecha"
        onClick={() => onSeleccionar(Math.min(obras.length - 1, indice + 1))}
        disabled={indice === obras.length - 1}
        aria-label="Miniatura siguiente"
      >
        ›
      </button>
      <span className="sr-only" aria-live="polite">
        {indice + 1} de {obras.length}: {tituloDe(obras[indice])}
      </span>
    </nav>
  );
}
