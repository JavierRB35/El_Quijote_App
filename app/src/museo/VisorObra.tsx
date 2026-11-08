// Museo — VisorObra: LA PANTALLA ÚNICA de la referencia visual aprobada
// (docs/referencias/museo/MUSEO_REFERENCIA_VISUAL_OFICIAL.png, commit
// 54826cd). Estructura de la maqueta: obra protagonista a la izquierda
// (~69 % ancho, íntegra con object-fit: contain), ficha editorial oscura a
// la derecha (~28 %, FUERA del rectángulo de la obra) y carrusel horizontal
// de miniaturas DEBAJO de la imagen principal. Prohibido poner texto sobre
// la acuarela, recortarla o crear pantallas por obra: esta misma pantalla
// sirve a las 376 acuarelas del manifiesto (issue #73, EF-MUS-01..04).
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Catalogo } from '../contrato';
import Carousel from './Carousel';
import FichaImagen from './FichaImagen';
import { fuenteDe, pasajeDe, pastillaCapitulo, tituloDe, type Obra } from './obras';

const ZOOM_NIVELES = [1, 1.5, 2, 3];

interface Props {
  obras: Obra[]; // contexto activo (galería completa o filtrada), orden de lectura
  indice: number; // obra seleccionada dentro del contexto
  contexto: string; // overheader de la ficha (colección o filtro activo)
  catalogo: Catalogo | null;
  imagenes: Record<string, string>;
  fallos: Record<string, string>;
  pedir: (uri: string) => void;
  onSeleccionar: (indice: number) => void;
  onCerrar: () => void; // volver a la galería (Esc)
}

export default function VisorObra({
  obras,
  indice,
  contexto,
  catalogo,
  imagenes,
  fallos,
  pedir,
  onSeleccionar,
  onCerrar,
}: Props) {
  const obra = obras[indice] ?? null;
  const [vistaCompleta, setVistaCompleta] = useState(false);
  const [fichaAbierta, setFichaAbierta] = useState(false);
  const [zoom, setZoom] = useState(1);
  const refAmpliar = useRef<HTMLButtonElement>(null);
  const refFichaBoton = useRef<HTMLButtonElement>(null);
  const refVisor = useRef<HTMLElement>(null);

  const mover = useCallback(
    (delta: number) => {
      const n = indice + delta;
      if (n >= 0 && n < obras.length) onSeleccionar(n);
    },
    [indice, obras.length, onSeleccionar],
  );

  // cambio de obra: precarga la elegida y sus vecinas; zoom a 1
  useEffect(() => {
    if (!obra) return;
    setZoom(1);
    pedir(obra.uri);
    const anterior = obras[indice - 1];
    const siguiente = obras[indice + 1];
    if (anterior) pedir(anterior.uri);
    if (siguiente) pedir(siguiente.uri);
    if (refVisor.current) refVisor.current.focus?.();
  }, [obra?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // teclado: ←/→ obra · +/−/0 zoom en vista completa · Esc cierra por capas
  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
      if (fichaAbierta) {
        if (e.key === 'Escape') setFichaAbierta(false);
        return;
      }
      if (vistaCompleta) {
        switch (e.key) {
          case 'Escape':
            setVistaCompleta(false);
            refAmpliar.current?.focus();
            break;
          case '+': case '=':
            setZoom((z) => ZOOM_NIVELES[Math.min(ZOOM_NIVELES.indexOf(z) + 1, ZOOM_NIVELES.length - 1)]);
            break;
          case '-':
            setZoom((z) => ZOOM_NIVELES[Math.max(ZOOM_NIVELES.indexOf(z) - 1, 0)]);
            break;
          case '0':
            setZoom(1);
            break;
        }
        e.preventDefault();
        return;
      }
      switch (e.key) {
        case 'ArrowRight': mover(1); break;
        case 'ArrowLeft': mover(-1); break;
        case 'Escape': onCerrar(); break;
        default: return;
      }
      e.preventDefault();
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [fichaAbierta, vistaCompleta, mover, onCerrar]);

  const pasaje = useMemo(() => (obra ? pasajeDe(obra, catalogo) : null), [obra, catalogo]);

  if (!obra) return null;

  const src = imagenes[obra.uri];
  const fallo = fallos[obra.uri];
  const cita = pasaje?.text_original?.trim() || null;

  return (
    <section
      className="museo-unico"
      ref={refVisor}
      tabIndex={-1}
      role="region"
      aria-label={`Visor de obra: ${tituloDe(obra)} (${indice + 1} de ${obras.length})`}
    >
      <div className="museo-cuerpo">
        {/* --- zona de la obra: protagonista, íntegra, sin texto encima --- */}
        <figure className="museo-obra" aria-label={obra.alt}>
          {src ? (
            <img className="museo-obra-img" src={src} alt={obra.alt} decoding="async" />
          ) : fallo ? (
            <p className="museo-estado museo-error" role="alert">
              La obra no está disponible: {obra.id}
            </p>
          ) : (
            <p className="museo-estado museo-cargando">Abriendo la obra…</p>
          )}
          <button
            className="museo-flecha museo-flecha-izq"
            onClick={() => mover(-1)}
            disabled={indice === 0}
            aria-label="Obra anterior (flecha izquierda)"
          >
            ‹
          </button>
          <button
            className="museo-flecha museo-flecha-der"
            onClick={() => mover(1)}
            disabled={indice === obras.length - 1}
            aria-label="Obra siguiente (flecha derecha)"
          >
            ›
          </button>
          <button
            className="museo-ampliar"
            ref={refAmpliar}
            onClick={() => setVistaCompleta(true)}
            aria-label="Ver la obra completa (ampliar)"
            title="Ver la obra completa"
          >
            ⤢
          </button>
        </figure>

        {/* --- ficha editorial: fuera del rectángulo de la obra --- */}
        <aside className="museo-ficha" aria-label="Ficha editorial de la obra">
          <p className="museo-overheader">{contexto}</p>
          <h2 className="museo-titulo">{tituloDe(obra)}</h2>
          <p className="museo-pastilla">{pastillaCapitulo(obra)}</p>

          {obra.ficha?.explicacion && (
            <section className="museo-bloque" aria-label="Explicación">
              <h3>
                <span aria-hidden="true">📖</span> Explicación
              </h3>
              <p>{obra.ficha.explicacion}</p>
            </section>
          )}

          {cita && (
            <>
              {obra.ficha?.explicacion && <hr className="museo-separador" />}
              <section className="museo-bloque" aria-label="Texto original de Cervantes">
                <h3>
                  <span aria-hidden="true">❝</span> Texto original
                </h3>
                <blockquote className="museo-cita">{cita}</blockquote>
                <p className="museo-cita-ancla">
                  Cervantes, <em>Don Quijote</em>, {pastillaCapitulo(obra)} · {pasaje?.id}
                </p>
              </section>
            </>
          )}

          {(obra.ficha?.explicacion || cita) && <hr className="museo-separador" />}

          <div className="museo-acciones" role="group" aria-label="Acciones de la obra">
            <button className="museo-boton-ficha" onClick={() => setVistaCompleta(true)}>
              <span aria-hidden="true">🔍</span> Ver la obra completa
            </button>
            <button
              className="museo-boton-ficha"
              ref={refFichaBoton}
              onClick={() => setFichaAbierta(true)}
            >
              <span aria-hidden="true">ⓘ</span> Ficha de la imagen
            </button>
          </div>

          <hr className="museo-separador" />
          <p className="museo-fuente">
            <span className="museo-fuente-rotulo">Fuente:</span> {fuenteDe(obra)}
          </p>
          {obra.ficha?.spoilerLevel === 'revelador' && (
            <p className="museo-aviso">⚠ Esta lámina muestra el desenlace del episodio.</p>
          )}
        </aside>
      </div>

      {/* --- carrusel horizontal DEBAJO de la imagen principal --- */}
      <Carousel
        obras={obras}
        indice={indice}
        imagenes={imagenes}
        fallos={fallos}
        pedir={pedir}
        onSeleccionar={onSeleccionar}
      />

      {/* --- vista completa: obra sola, sin texto encima, zoom controlado --- */}
      {vistaCompleta && (
        <div
          className="museo-completa"
          role="dialog"
          aria-modal="true"
          aria-label={`Obra completa: ${tituloDe(obra)}`}
        >
          <div className="museo-completa-plano" data-zoom={zoom}>
            {src && <img src={src} alt={obra.alt} style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }} />}
          </div>
          <div className="museo-completa-controles" role="toolbar" aria-label="Zoom de la obra">
            <button
              onClick={() => setZoom(ZOOM_NIVELES[Math.max(ZOOM_NIVELES.indexOf(zoom) - 1, 0)])}
              disabled={zoom === ZOOM_NIVELES[0]}
              aria-label="Reducir zoom (tecla menos)"
            >
              −
            </button>
            <span aria-live="polite">zoom ×{zoom}</span>
            <button
              onClick={() => setZoom(ZOOM_NIVELES[Math.min(ZOOM_NIVELES.indexOf(zoom) + 1, ZOOM_NIVELES.length - 1)])}
              disabled={zoom === ZOOM_NIVELES[ZOOM_NIVELES.length - 1]}
              aria-label="Ampliar zoom (tecla más)"
            >
              +
            </button>
            <button onClick={() => setZoom(1)} aria-label="Restablecer zoom (tecla cero)">
              1:1
            </button>
            <button
              onClick={() => {
                setVistaCompleta(false);
                refAmpliar.current?.focus();
              }}
              aria-label="Cerrar vista completa (Escape)"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* --- ficha de la imagen: créditos y derechos completos --- */}
      {fichaAbierta && (
        <FichaImagen
          obra={obra}
          catalogo={catalogo}
          onCerrar={() => {
            setFichaAbierta(false);
            refFichaBoton.current?.focus();
          }}
        />
      )}
    </section>
  );
}
