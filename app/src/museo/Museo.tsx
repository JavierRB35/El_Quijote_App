// Museo — Galería artística del Quijote (issue #73 + maqueta oficial
// docs/referencias/museo/MUSEO_REFERENCIA_VISUAL_OFICIAL.png, especificación
// docs/MUSEO_REFERENCIA_VISUAL_APROBADA.md).
//
// Composición EXACTA de la maqueta V1 (irrevocable salvo nueva autorización):
//  - Cabecera azul noche: logotipo dorado «El Quijote», navegación
//    Historia · Aventura · Museo · Atlas · Lector con Museo resaltado,
//    ajustes/ayuda a la derecha, filete dorado fino.
//  - Obra protagonista a la IZQUIERDA (~69 % del ancho), íntegra
//    (object-fit: contain), con flechas laterales y botón discreto de ampliar.
//  - Ficha editorial a la DERECHA (~28 %): sobreencabezado/colección, título,
//    pastilla «Parte I · Capítulo VIII», Explicación, Texto original (cita
//    verificada o pendiente), «Ver la obra completa», «Ficha de la imagen»,
//    fuente pequeña al pie. Fuera del rectángulo de la obra.
//  - Carrusel horizontal inferior de cinco miniaturas, obra activa con
//    filete dorado, navegación anterior/siguiente a los extremos.
// Derechos: uso interno en desarrollo; DQ.LIC.0001/0002 redistribution
// condicionada — el aviso permanece visible. No es autorización de publicación.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  COLECCION_INICIAL,
  cargarMuseo,
  filtrar,
  opcionesFiltro,
  tituloDe,
  type CitaObra,
  type Obra,
} from './obras';
import { leerAsset } from '../entorno';
import './museo.css';

/** Caché de imágenes resueltas por URI lógica (offline, sin servicios). */
function useImagenes() {
  const [imagenes, setImagenes] = useState<Record<string, string>>({});
  const pedidas = useRef(new Set<string>());
  const pedir = useCallback((uri: string) => {
    if (pedidas.current.has(uri)) return;
    pedidas.current.add(uri);
    leerAsset(uri)
      .then((data) => setImagenes((m) => ({ ...m, [uri]: data })))
      .catch(() => setImagenes((m) => ({ ...m, [uri]: '' }))); // fallo: reintento al volver a la vista
  }, []);
  return { imagenes, pedir };
}

type VistaObra = 'ficha' | 'completa' | null;

interface Props {
  onSalir: () => void;
  onNavegar?: (modo: 'historia' | 'aventura') => void;
}

export default function Museo({ onSalir, onNavegar }: Props) {
  const [cargado, setCargado] = useState<{ obras: Obra[]; citas: Record<string, CitaObra>; avisos: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { imagenes, pedir } = useImagenes();
  const [ambito, setAmbito] = useState<'coleccion' | 'catalogo'>('coleccion');
  const [parte, setParte] = useState<string | null>(null);
  const [capitulo, setCapitulo] = useState<string | null>(null);
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [seleccion, setSeleccion] = useState(0); // índice en la lista visible
  const [vistaObra, setVistaObra] = useState<VistaObra>(null);
  const [zoom, setZoom] = useState(1);
  const [ayudaAbierta, setAyudaAbierta] = useState(false);
  const [fichaDetallada, setFichaDetallada] = useState(false);
  const refVisor = useRef<HTMLElement>(null);

  useEffect(() => {
    cargarMuseo()
      .then(setCargado)
      .catch((e) => setError(String(e)));
  }, []);

  const obras = cargado?.obras ?? [];
  const citas = cargado?.citas ?? {};
  const avisos = cargado?.avisos ?? [];

  const { partes, capitulos } = useMemo(() => opcionesFiltro(obras), [obras]);
  const lista = useMemo(() => {
    const ambitoLista = ambito === 'coleccion' ? obras.filter((o) => o.esColeccionInicial) : obras;
    return filtrar(ambitoLista, parte, capitulo);
  }, [obras, ambito, parte, capitulo]);

  const obra = lista[Math.min(seleccion, Math.max(0, lista.length - 1))] ?? null;

  const irA = useCallback((indice: number) => {
    setSeleccion(Math.max(0, Math.min(indice, lista.length - 1)));
    setZoom(1);
  }, [lista.length]);

  const mover = useCallback((delta: number) => {
    setSeleccion((s) => Math.max(0, Math.min(s + delta, lista.length - 1)));
    setZoom(1);
  }, [lista.length]);

  // ventana del carrusel: cinco miniaturas visibles centradas en la activa
  const ventana = useMemo(
    () => lista.slice(
      Math.max(0, Math.min(seleccion - 2, Math.max(0, lista.length - 5))),
      Math.max(0, Math.min(seleccion - 2, Math.max(0, lista.length - 5))) + 5,
    ),
    [lista, seleccion],
  );

  // ---- carga diferida de las imágenes visibles
  const urisNecesarias = useMemo(() => {
    if (vistaObra === 'completa' && obra) return [obra.uri];
    return ventana.map((o) => o.uri);
  }, [vistaObra, obra, ventana]);
  useEffect(() => {
    urisNecesarias.forEach(pedir);
  }, [urisNecesarias, pedir]);

  // ---- teclado
  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
      if (vistaObra === 'completa') {
        if (e.key === 'Escape') { setVistaObra('ficha'); e.preventDefault(); }
        if (e.key === 'ArrowRight') { mover(1); e.preventDefault(); }
        if (e.key === 'ArrowLeft') { mover(-1); e.preventDefault(); }
        if (e.key === '+') { setZoom((z) => Math.min(4, Math.round((z + 0.5) * 2) / 2)); e.preventDefault(); }
        if (e.key === '-') { setZoom((z) => Math.max(1, Math.round((z - 0.5) * 2) / 2)); e.preventDefault(); }
        if (e.key === '0') { setZoom(1); e.preventDefault(); }
        return;
      }
      if (obra === null) return;
      switch (e.key) {
        case 'ArrowRight': mover(1); e.preventDefault(); break;
        case 'ArrowLeft': mover(-1); e.preventDefault(); break;
        case 'Escape': setFiltrosAbiertos(false); setAyudaAbierta(false); setFichaDetallada(false); break;
        default: return;
      }
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [obra, vistaObra, mover]);

  useEffect(() => {
    if (obra !== null && vistaObra !== null) refVisor.current?.focus();
  }, [obra, vistaObra]);

  if (error) {
    return (
      <main className="museo">
        <Cabecera onSalir={onSalir} onNavegar={onNavegar} ayudaAbierta={false} onAyuda={() => {}} />
        <p className="museo-error">El catálogo del Museo no está disponible: {error}</p>
      </main>
    );
  }
  if (!cargado) {
    return (
      <main className="museo">
        <Cabecera onSalir={onSalir} onNavegar={onNavegar} ayudaAbierta={false} onAyuda={() => {}} />
        <p className="museo-cargando museo-cargando-central">Abriendo el Museo…</p>
      </main>
    );
  }

  const cita: CitaObra | undefined = obra ? citas[obra.citaId] : undefined;
  const enColeccion = obra?.esColeccionInicial ?? false;

  return (
    <main className="museo">
      <Cabecera
        onSalir={onSalir}
        onNavegar={onNavegar}
        ayudaAbierta={ayudaAbierta}
        onAyuda={() => setAyudaAbierta((v) => !v)}
      />

      {/* obra protagonista (izquierda ~69 %) + ficha editorial (derecha ~28 %) */}
      <div className="museo-escena">
        {obra === null && (
          <p className="museo-error">Ninguna obra coincide con los filtros aplicados.</p>
        )}
        {obra && (
          <section
            className="museo-obra"
            ref={refVisor}
            tabIndex={-1}
            role="region"
            aria-label={`Obra: ${tituloDe(obra)}`}
          >
            {imagenes[obra.uri] ? (
              <img src={imagenes[obra.uri]} alt={obra.alt} />
            ) : (
              <p className="museo-cargando">Abriendo la obra…</p>
            )}

            <button className="museo-flecha museo-flecha-izq" onClick={() => mover(-1)} disabled={seleccion === 0} aria-label="Obra anterior">
              ‹
            </button>
            <button className="museo-flecha museo-flecha-der" onClick={() => mover(1)} disabled={seleccion >= lista.length - 1} aria-label="Obra siguiente">
              ›
            </button>
            <button
              className="museo-ampliar"
              onClick={() => { setVistaObra('completa'); setZoom(1); }}
              aria-label="Ver la obra completa a pantalla completa"
              title="Ver la obra completa"
            >
              ⤢
            </button>
          </section>
        )}

        {obra && (
          <aside className="museo-ficha" aria-label="Ficha editorial de la obra">
            <p className="museo-sobreencabezado">
              {enColeccion ? COLECCION_INICIAL.sobreEncabezado : 'Catálogo · Ilustraciones del Quijote (ed. Tusell)'}
            </p>
            <h1 className="museo-titulo">{tituloDe(obra)}</h1>
            <p className="museo-pastilla">
              {obra.referencias[0]
                ? `Parte ${obra.referencias[0].parte} · ${obra.referencias[0].capitulo ?? 'Capítulo no documentado'}`
                : 'Capítulo no documentado'}
            </p>
            {obra.estado === 'pendiente' && (
              <p className="museo-pendiente">Pendiente de ficha editorial</p>
            )}

            <div className="museo-bloque">
              <h2 className="museo-bloque-titulo"><span className="museo-icono">📖</span> Explicación</h2>
              <p className="museo-explicacion">
                {obra.contexto ?? `Descripción de la edición: «${obra.alt}»`}
              </p>
            </div>

            <div className="museo-separador" />

            <div className="museo-bloque">
              <h2 className="museo-bloque-titulo"><span className="museo-icono museo-comillas">❝</span> Texto original</h2>
              {cita?.verificada ? (
                <>
                  <blockquote className="museo-cita">«{cita.cita}»</blockquote>
                  <p className="museo-cita-fuente">
                    Cotejada con PG #2000 (offset {cita.offset?.[0]}–{cita.offset?.[1]}, LF)
                    {cita.variante_manifiesto ? ` · ${cita.variante_manifiesto}` : ''}.
                  </p>
                </>
              ) : (
                <p className="museo-cita-pendiente">
                  Texto original pendiente de verificación editorial (sin mapeo
                  obra→pasaje documentado en el catálogo).
                </p>
              )}
            </div>

            <div className="museo-acciones">
              <button className="museo-accion" onClick={() => { setVistaObra('completa'); setZoom(1); }}>
                🔍 Ver la obra completa
              </button>
              <button className="museo-accion" onClick={() => setFichaDetallada((v) => !v)} aria-expanded={fichaDetallada}>
                ⓘ Ficha de la imagen
              </button>
            </div>

            {fichaDetallada && obra && (
              <dl className="museo-ficha-detallada">
                <dt>Identificador</dt><dd>{obra.id}{obra.musId ? ` · ficha editorial ${obra.musId}` : ''}</dd>
                <dt>Atribución</dt><dd>{obra.atribucion ?? 'Procedencia pendiente de verificar'}{obra.atribucionEstado ? ` (${obra.atribucionEstado})` : ''}</dd>
                <dt>Técnica</dt><dd>{obra.tecnica ?? 'Pendiente de verificar'}</dd>
                <dt>Procedencia</dt><dd>{obra.procedencia ?? 'Procedencia pendiente de verificar'}</dd>
                <dt>Archivo</dt><dd>{obra.numAcuarela !== null ? `${String(obra.numAcuarela).padStart(3, '0')}.jpg` : '—'}{obra.ancho && obra.alto ? ` · ${obra.ancho} × ${obra.alto} px` : ''}</dd>
                <dt>Licencia</dt><dd>{obra.licenciaId ?? '—'} · estado {obra.licenciaEstado ?? 'pendiente'} · redistribución condicionada</dd>
                <dt>Usos permitidos</dt><dd>{obra.allowedUses.length ? obra.allowedUses.join(', ') : 'pendiente'}</dd>
                <dt>Referencias documentales</dt>
                <dd>
                  {obra.referencias.length
                    ? obra.referencias.map((r, i) => (
                        <span key={i}>
                          {r.parte ? `Parte ${r.parte}` : '—'} · {r.capitulo ?? 'sin capítulo'} · orden {r.ordenLectura}
                          {i < obra.referencias.length - 1 ? '; ' : ''}
                        </span>
                      ))
                    : 'Pendiente'}
                </dd>
                <dt>Huella</dt><dd className="museo-mono">{obra.sha256 ?? 'pendiente'}</dd>
              </dl>
            )}

            <div className="museo-separador" />
            <p className="museo-fuente">
              Fuente: {obra.atribucion ?? 'Procedencia pendiente de verificar'} ·
              {' '}ed. Barcelona, Luis Tasso, 1905 · digitalización BVPB reg. 463832 /
              Epublibre (Titivillus) 2024 · {obra.id}
            </p>
          </aside>
        )}
      </div>

      {/* carrusel horizontal inferior de cinco miniaturas */}
      <nav className="museo-carrusel" aria-label="Carrusel de obras">
        <button className="museo-carrusel-flecha" onClick={() => mover(-1)} disabled={seleccion === 0} aria-label="Obra anterior del carrusel">‹</button>
        <ul className="museo-carrusel-pistas">
          {ventana.map((o) => {
            const indice = lista.findIndex((x) => x.id === o.id);
            const activa = obra !== null && o.id === obra.id;
            return (
              <li key={o.id}>
                <button
                  className={`museo-miniatura ${activa ? 'activa' : ''}`}
                  onClick={() => irA(indice)}
                  aria-label={`${tituloDe(o)}${activa ? ' (obra activa)' : ''}`}
                  aria-current={activa ? 'true' : undefined}
                >
                  {imagenes[o.uri] ? (
                    <img src={imagenes[o.uri]} alt={o.alt} loading="lazy" decoding="async" />
                  ) : (
                    <span className="museo-mini-carga" aria-hidden="true" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <button className="museo-carrusel-flecha" onClick={() => mover(1)} disabled={seleccion >= lista.length - 1} aria-label="Obra siguiente del carrusel">›</button>
        <div className="museo-ambito">
          <button
            className={`museo-ambito-opcion ${ambito === 'coleccion' ? 'activa' : ''}`}
            onClick={() => { setAmbito('coleccion'); setSeleccion(0); }}
          >
            Colección ({obras.filter((o) => o.esColeccionInicial).length})
          </button>
          <button
            className={`museo-ambito-opcion ${ambito === 'catalogo' ? 'activa' : ''}`}
            onClick={() => { setAmbito('catalogo'); setSeleccion(0); }}
          >
            Catálogo completo ({obras.length})
          </button>
          <button className="museo-ambito-opcion" onClick={() => setFiltrosAbiertos((v) => !v)} aria-expanded={filtrosAbiertos}>
            Filtrar
          </button>
        </div>
        {filtrosAbiertos && (
          <div className="museo-popover-filtros">
            <label>
              Parte
              <select value={parte ?? ''} onChange={(e) => { setParte(e.target.value || null); setSeleccion(0); }}>
                <option value="">Todas</option>
                {partes.map((p) => <option key={p} value={p}>Parte {p}</option>)}
              </select>
            </label>
            <label>
              Capítulo
              <select value={capitulo ?? ''} onChange={(e) => { setCapitulo(e.target.value || null); setSeleccion(0); }}>
                <option value="">Todos</option>
                {capitulos.map((c) => <option key={c.valor} value={c.valor}>{c.etiqueta}</option>)}
              </select>
            </label>
            <output aria-live="polite">{lista.length} obra{lista.length === 1 ? '' : 's'}</output>
          </div>
        )}
      </nav>

      <footer className="museo-derechos">
        Uso interno en desarrollo · Acuarelas de la edición Tusell: DQ.LIC.0001 y DQ.LIC.0002 con
        redistribución condicionada · No constituye autorización de publicación ni comercialización
        {avisos.length > 0 && <> · {avisos.length} registro(s) del catálogo requieren revisión</>}
      </footer>

      {/* vista de obra completa: sin texto encima, retorno sin perder posición */}
      {obra && vistaObra === 'completa' && (
        <div className="museo-completa" role="dialog" aria-modal="true" aria-label={`Obra completa: ${tituloDe(obra)}`}>
          <div className="museo-completa-marco" data-zoom={zoom}>
            {imagenes[obra.uri] && (
              <img src={imagenes[obra.uri]} alt={obra.alt} style={{ transform: `scale(${zoom})` }} />
            )}
          </div>
          <div className="museo-completa-controles">
            <button className="museo-boton" onClick={() => mover(-1)} aria-label="Obra anterior">◂</button>
            <span>{`${seleccion + 1} / ${lista.length}`}</span>
            <button className="museo-boton" onClick={() => setZoom((z) => Math.min(4, Math.round((z + 0.5) * 2) / 2))} aria-label="Ampliar">+</button>
            <span className="museo-zoom">zoom ×{zoom}</span>
            <button className="museo-boton" onClick={() => setZoom((z) => Math.max(1, Math.round((z - 0.5) * 2) / 2))} aria-label="Reducir">−</button>
            <button className="museo-boton" onClick={() => setZoom(1)} aria-label="Restablecer zoom">1:1</button>
            <button className="museo-boton museo-primario" onClick={() => setVistaObra('ficha')} aria-label="Volver a la ficha (Escape)">Volver a la ficha</button>
          </div>
        </div>
      )}
    </main>
  );
}

/** Cabecera exacta de la maqueta: logotipo dorado, navegación de módulos con
 *  Museo resaltado, ajustes y ayuda. */
function Cabecera({
  onSalir,
  onNavegar,
  ayudaAbierta,
  onAyuda,
}: {
  onSalir: () => void;
  onNavegar?: (modo: 'historia' | 'aventura') => void;
  ayudaAbierta: boolean;
  onAyuda: () => void;
}) {
  return (
    <header className="museo-topbar">
      <div className="museo-logo">
        <svg className="museo-logo-molino" viewBox="0 0 24 24" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 13 L12 3 M12 13 L20.5 8 M12 13 L3.5 8" />
            <circle cx="12" cy="13" r="1.6" fill="currentColor" stroke="none" />
          </g>
        </svg>
        <span>El Quijote</span>
      </div>
      <nav className="museo-nav" aria-label="Módulos">
        <button className="museo-nav-item" onClick={() => onNavegar?.('historia')} disabled={!onNavegar}>
          <span className="museo-nav-icono" aria-hidden="true">🏠</span> Historia
        </button>
        <button className="museo-nav-item" onClick={() => onNavegar?.('aventura')} disabled={!onNavegar}>
          <span className="museo-nav-icono" aria-hidden="true">🎮</span> Aventura
        </button>
        <button className="museo-nav-item activa" aria-current="page">
          <span className="museo-nav-icono" aria-hidden="true">🏛</span> Museo
        </button>
        <button className="museo-nav-item" disabled title="Pendiente de implementación">
          <span className="museo-nav-icono" aria-hidden="true">🧭</span> Atlas
        </button>
        <button className="museo-nav-item" disabled title="Pendiente de implementación">
          <span className="museo-nav-icono" aria-hidden="true">📖</span> Lector
        </button>
      </nav>
      <div className="museo-topbar-extra">
        <button className="museo-icono-boton" disabled title="Ajustes pendientes en el Museo">⚙</button>
        <button className="museo-icono-boton" onClick={onAyuda} aria-expanded={ayudaAbierta} aria-label="Ayuda y derechos">?</button>
        <button className="museo-icono-boton" onClick={onSalir} aria-label="Cerrar el Museo y volver al menú">✕</button>
      </div>
      {ayudaAbierta && (
        <div className="museo-ayuda" role="note">
          <p><strong>El Quijote · Museo</strong> — módulo cultural con las acuarelas de la
          edición ilustrada por Salvador Tusell (Barcelona, Luis Tasso, 1905).</p>
          <p>Uso interno en desarrollo: las acuarelas tienen <strong>redistribución
          condicionada</strong> (DQ.LIC.0001); esto no constituye autorización de
          publicación ni comercialización. Teclado: ←/→ cambia de obra, Esc vuelve.</p>
          <button className="museo-boton" onClick={onAyuda}>Cerrar</button>
        </div>
      )}
    </header>
  );
}
