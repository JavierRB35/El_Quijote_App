// Museo — primera Galería artística del Quijote (issue #73, fase MVP).
// Módulo cultural independiente de Historia/Aventura: accesible desde el
// menú sin exigir progreso previo, 100 % offline (activos locales vía
// entorno.leerAsset), con la acuarela siempre completa (object-fit: contain,
// nunca recortada), zoom controlado, navegación y ficha documentada sin
// inventar atribuciones. Derechos: uso interno en desarrollo mientras
// DQ.LIC.0001.redistribution = 'condicionada' — aviso visible y permanente.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  COLECCION_INICIAL,
  cargarGaleria,
  filtrar,
  opcionesFiltro,
  tituloDe,
  type Obra,
} from './obras';
import { leerAsset } from '../entorno';
import './museo.css';

const ZOOM_NIVELES = [1, 1.5, 2, 3];
const OBRAS_POR_PAGINA = 24;

/** Caché de imágenes resueltas por URI lógica (offline, sin servicios). */
function useImagenes() {
  const [imagenes, setImagenes] = useState<Record<string, string>>({});
  const [fallos, setFallos] = useState<Record<string, string>>({});
  const pedidas = useRef(new Set<string>());
  const pedir = useCallback((uri: string) => {
    if (pedidas.current.has(uri)) return;
    pedidas.current.add(uri);
    leerAsset(uri)
      .then((data) => setImagenes((m) => ({ ...m, [uri]: data })))
      .catch((e) => setFallos((f) => ({ ...f, [uri]: String(e) })));
  }, []);
  return { imagenes, fallos, pedir };
}

export default function Museo({ onSalir }: { onSalir: () => void }) {
  // el manifiesto (chunk propio) se descarga solo al abrir el Museo
  const [galeria, setGaleria] = useState<{ acuarelas: Obra[]; avisos: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    cargarGaleria()
      .then((g) => setGaleria({ acuarelas: g.acuarelas, avisos: g.avisos }))
      .catch((e) => setError(String(e)));
  }, []);
  const acuarelas = galeria?.acuarelas ?? [];
  const avisos = galeria?.avisos ?? [];
  const { imagenes, fallos, pedir } = useImagenes();
  const [vista, setVista] = useState<'portada' | 'galeria'>('portada');
  const [parte, setParte] = useState<string | null>(null);
  const [capitulo, setCapitulo] = useState<string | null>(null);
  const [pagina, setPagina] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null); // índice en la lista filtrada
  const [zoom, setZoom] = useState(1);
  const refVisor = useRef<HTMLElement>(null);

  const { partes, capitulos } = useMemo(() => opcionesFiltro(acuarelas), [acuarelas]);
  const filtradas = useMemo(() => filtrar(acuarelas, parte, capitulo), [acuarelas, parte, capitulo]);

  // la selección guarda un índice estable en la lista filtrada y se resuelve
  // contra la lista actual para sobrevivir a cambios de filtro
  const obraActual = seleccion !== null ? filtradas[seleccion] ?? null : null;

  const destacadas = useMemo(
    () => acuarelas.filter((o) => o.esColeccionInicial).slice(0, 5),
    [acuarelas],
  );
  const paginaLista = useMemo(
    () => filtradas.slice(pagina * OBRAS_POR_PAGINA, (pagina + 1) * OBRAS_POR_PAGINA),
    [filtradas, pagina],
  );
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / OBRAS_POR_PAGINA));

  const abrir = useCallback((indice: number) => {
    setSeleccion(indice);
    setZoom(1);
  }, []);

  const cerrarObra = useCallback(() => {
    setSeleccion(null);
    setZoom(1);
  }, []);

  const mover = useCallback(
    (delta: number) => {
      setSeleccion((s) => {
        if (s === null) return s;
        const n = s + delta;
        return n >= 0 && n < filtradas.length ? n : s;
      });
      setZoom(1);
    },
    [filtradas.length],
  );

  // ---- carga diferida: solo las URIs de la vista activa
  const urisNecesarias = useMemo(() => {
    if (obraActual) return [obraActual.uri];
    if (vista === 'portada') return destacadas.map((o) => o.uri);
    return paginaLista.map((o) => o.uri);
  }, [obraActual, vista, destacadas, paginaLista]);
  useEffect(() => {
    urisNecesarias.forEach(pedir);
  }, [urisNecesarias, pedir]);

  // ---- teclado del visor: ←/→ navega, +/− zoom, 0 restablece, Esc cierra
  useEffect(() => {
    if (obraActual === null) return;
    const alPulsar = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight': mover(1); break;
        case 'ArrowLeft': mover(-1); break;
        case '+': case '=':
          setZoom((z) => ZOOM_NIVELES[Math.min(ZOOM_NIVELES.indexOf(z) + 1, ZOOM_NIVELES.length - 1)]);
          break;
        case '-':
          setZoom((z) => ZOOM_NIVELES[Math.max(ZOOM_NIVELES.indexOf(z) - 1, 0)]);
          break;
        case '0': setZoom(1); break;
        case 'Escape': cerrarObra(); break;
        default: return;
      }
      e.preventDefault();
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [obraActual, mover, cerrarObra]);

  // foco visible al abrir el visor
  useEffect(() => {
    if (obraActual !== null) refVisor.current?.focus();
  }, [obraActual]);

  if (error) {
    return (
      <main className="museo">
        <header className="museo-cabecera">
          <button className="museo-boton" onClick={onSalir}>← Menú</button>
          <h1>Museo</h1>
        </header>
        <p className="museo-error">El manifiesto de ilustraciones no está disponible: {error}</p>
      </main>
    );
  }

  if (!galeria) {
    return (
      <main className="museo">
        <header className="museo-cabecera">
          <button className="museo-boton" onClick={onSalir}>← Menú</button>
          <h1>Museo</h1>
        </header>
        <p className="museo-cargando museo-cargando-central">Abriendo el Museo…</p>
      </main>
    );
  }

  return (
    <main className="museo">
      <header className="museo-cabecera">
        <button className="museo-boton" onClick={obraActual ? cerrarObra : onSalir}>
          {obraActual ? '← Galería' : '← Menú'}
        </button>
        <div>
          <p className="museo-kicker">Museo del Quijote</p>
          <h1>
            {obraActual
              ? tituloDe(obraActual)
              : vista === 'portada'
                ? 'Galería artística'
                : 'Ilustraciones del Quijote'}
          </h1>
        </div>
      </header>

      {obraActual ? (
        <section
          className="museo-visor"
          ref={refVisor}
          tabIndex={-1}
          role="region"
          aria-label={`Visor de obra: ${tituloDe(obraActual)}`}
        >
          <div className="museo-marco" data-zoom={zoom}>
            {imagenes[obraActual.uri] ? (
              <img
                src={imagenes[obraActual.uri]}
                alt={obraActual.alt}
                style={{ transform: `scale(${zoom})` }}
              />
            ) : fallos[obraActual.uri] ? (
              <p className="museo-error">La obra no está disponible: {obraActual.id}</p>
            ) : (
              <p className="museo-cargando">Abriendo la obra…</p>
            )}
          </div>

          <div className="museo-controles" role="toolbar" aria-label="Controles del visor">
            <button className="museo-boton" onClick={() => mover(-1)} disabled={seleccion === 0} aria-label="Obra anterior (flecha izquierda)">◂ Anterior</button>
            <button className="museo-boton" onClick={() => mover(1)} disabled={seleccion === filtradas.length - 1} aria-label="Obra siguiente (flecha derecha)">Siguiente ▸</button>
            <span className="museo-posicion">{seleccion !== null ? `${seleccion + 1} / ${filtradas.length}` : ''}</span>
            <button className="museo-boton" onClick={() => setZoom(ZOOM_NIVELES[Math.max(ZOOM_NIVELES.indexOf(zoom) - 1, 0)])} disabled={zoom === ZOOM_NIVELES[0]} aria-label="Reducir zoom (tecla menos)">−</button>
            <span className="museo-zoom" aria-live="polite">zoom ×{zoom}</span>
            <button className="museo-boton" onClick={() => setZoom(ZOOM_NIVELES[Math.min(ZOOM_NIVELES.indexOf(zoom) + 1, ZOOM_NIVELES.length - 1)])} disabled={zoom === ZOOM_NIVELES[ZOOM_NIVELES.length - 1]} aria-label="Ampliar zoom (tecla más)">+</button>
            <button className="museo-boton" onClick={() => setZoom(1)} aria-label="Restablecer zoom (tecla cero)">Restablecer</button>
          </div>

          <aside className="museo-ficha" aria-label="Ficha de la obra">
            <dl>
              <dt>Identificador</dt>
              <dd>{obraActual.id}</dd>
              <dt>Obra</dt>
              <dd>Acuarela de Salvador Tusell (atribución según la edición referida en el manifiesto)</dd>
              <dt>Edición de procedencia</dt>
              <dd>Barcelona, Luis Tasso, 1905 · reproducción digital: Epublibre (Titivillus), base r2.1</dd>
              <dt>Archivo</dt>
              <dd>{obraActual.archivo} · {obraActual.ancho} × {obraActual.alto} px</dd>
              <dt>Parte / capítulo</dt>
              <dd>
                {obraActual.parte ? `Parte ${obraActual.parte}` : '—'}
                {obraActual.capitulos.length ? ` · ${obraActual.capitulos.join(' · ')}` : ''}
              </dd>
              <dt>Descripción de la edición (alt)</dt>
              <dd className="museo-alt">«{obraActual.alt}»</dd>
              <dt>Enlace al texto</dt>
              <dd>
                Mapeo obra→pasaje no documentado en el catálogo: sin enlace de texto
                (se añadirá solo cuando exista mapeo fiable).
              </dd>
            </dl>
            <p className="museo-nota">
              Huella de integridad: sha256 {obraActual.sha256.slice(0, 16)}…
            </p>
          </aside>
        </section>
      ) : vista === 'portada' ? (
        <section className="museo-portada" aria-label="Obras destacadas">
          <p className="museo-entradilla">{COLECCION_INICIAL.descripcion}</p>
          <div className="museo-destacadas">
            {destacadas.map((obra) => {
              const indice = filtradas.findIndex((o) => o.id === obra.id);
              return (
                <button
                  key={obra.id}
                  className="museo-destacada"
                  onClick={() => indice >= 0 && abrir(indice)}
                >
                  {imagenes[obra.uri] ? (
                    <img src={imagenes[obra.uri]} alt={obra.alt} loading="lazy" decoding="async" />
                  ) : (
                    <span className="museo-mini-vacia" aria-hidden="true" />
                  )}
                  <span className="museo-destacada-titulo">{tituloDe(obra)}</span>
                  <span className="museo-destacada-id">{obra.id}</span>
                </button>
              );
            })}
          </div>
          <button className="museo-boton museo-primario" onClick={() => setVista('galeria')}>
            Ver las Ilustraciones del Quijote ({acuarelas.length} acuarelas)
          </button>
        </section>
      ) : (
        <section className="museo-galeria" aria-label="Galería de ilustraciones">
          <div className="museo-filtros">
            <label>
              Parte
              <select
                value={parte ?? ''}
                onChange={(e) => { setParte(e.target.value || null); setPagina(0); }}
              >
                <option value="">Todas</option>
                {partes.map((p) => <option key={p} value={p}>Parte {p}</option>)}
              </select>
            </label>
            <label>
              Capítulo
              <select
                value={capitulo ?? ''}
                onChange={(e) => { setCapitulo(e.target.value || null); setPagina(0); }}
              >
                <option value="">Todos</option>
                {capitulos.map((c) => <option key={c.valor} value={c.valor}>{c.etiqueta}</option>)}
              </select>
            </label>
            <output className="museo-contador" aria-live="polite">
              {filtradas.length} obra{filtradas.length === 1 ? '' : 's'}
            </output>
          </div>

          <div className="museo-rejilla">
            {paginaLista.map((obra) => {
              const indice = filtradas.findIndex((o) => o.id === obra.id);
              return (
                <button
                  key={obra.id}
                  className={`museo-mini ${obra.esColeccionInicial ? 'en-coleccion' : ''}`}
                  onClick={() => abrir(indice)}
                  aria-label={`${tituloDe(obra)} — abrir en el visor`}
                >
                  {imagenes[obra.uri] ? (
                    <img src={imagenes[obra.uri]} alt={obra.alt} loading="lazy" decoding="async" />
                  ) : (
                    <span className="museo-mini-vacia" aria-hidden="true">…</span>
                  )}
                  <span className="museo-mini-pie">{tituloDe(obra)}</span>
                </button>
              );
            })}
          </div>

          {totalPaginas > 1 && (
            <nav className="museo-paginacion" aria-label="Páginas de la galería">
              <button className="museo-boton" onClick={() => setPagina((p) => Math.max(0, p - 1))} disabled={pagina === 0}>◂</button>
              <span>página {pagina + 1} de {totalPaginas}</span>
              <button className="museo-boton" onClick={() => setPagina((p) => Math.min(totalPaginas - 1, p + 1))} disabled={pagina >= totalPaginas - 1}>▸</button>
            </nav>
          )}
        </section>
      )}

      <footer className="museo-derechos">
        Uso interno en desarrollo · Acuarelas de la edición Tusell: redistribución condicionada (DQ.LIC.0001) ·
        No constituye autorización de publicación ni comercialización
        {avisos.length > 0 && <> · {avisos.length} registro(s) del manifiesto requieren revisión</>}
      </footer>
    </main>
  );
}
