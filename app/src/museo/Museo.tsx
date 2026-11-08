// Museo — módulo cultural completo (issue #73 + maqueta visual oficial V1).
// Cabecera de la app según la maqueta (logo dorado «El Quijote», navegación
// Historia · Aventura · Museo · Atlas · Lector con Museo activo, filete
// dorado) y TRES vistas: portada y galería son AUXILIARES de selección;
// toda obra se mira en la MISMA PANTALLA ÚNICA (VisorObra). 100 % offline
// (activos locales vía entorno.leerAsset), abierto desde el inicio sin
// progreso, manifiesto en chunk propio. Derechos: uso interno mientras
// DQ.LIC.0001.redistribution = 'condicionada' — aviso permanente al pie.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Catalogo } from '../contrato';
import { leerAsset } from '../entorno';
import VisorObra from './VisorObra';
import {
  COLECCION_INICIAL,
  cargarGaleria,
  filtrar,
  opcionesFiltro,
  tituloDe,
  type Obra,
} from './obras';
import './museo.css';

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

interface Props {
  catalogo: Catalogo | null;
  onSalir: () => void;
  onNavegar?: (modo: 'historia' | 'aventura') => void;
}

export default function Museo({ catalogo, onSalir, onNavegar }: Props) {
  // el manifiesto (chunk propio) se descarga solo al abrir el Museo
  const [galeria, setGaleria] = useState<{ acuarelas: Obra[]; avisos: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    cargarGaleria(catalogo)
      .then((g) => setGaleria({ acuarelas: g.acuarelas, avisos: g.avisos }))
      .catch((e) => setError(String(e)));
  }, [catalogo]);
  const acuarelas = galeria?.acuarelas ?? [];
  const avisos = galeria?.avisos ?? [];
  const { imagenes, fallos, pedir } = useImagenes();

  const [vista, setVista] = useState<'portada' | 'galeria' | 'visor'>('portada');
  const [parte, setParte] = useState<string | null>(null);
  const [capitulo, setCapitulo] = useState<string | null>(null);
  const [pagina, setPagina] = useState(0);
  // índice estable en la lista filtrada: sobrevive a cambios de filtro
  const [seleccion, setSeleccion] = useState<number | null>(null);

  const { partes, capitulos } = useMemo(() => opcionesFiltro(acuarelas), [acuarelas]);
  const filtradas = useMemo(() => filtrar(acuarelas, parte, capitulo), [acuarelas, parte, capitulo]);

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
    setVista('visor');
  }, []);

  // al volver de la ficha: conservar filtros y página (posición no perdida)
  const cerrarVisor = useCallback(() => setVista('galeria'), []);

  // carga diferida de miniaturas de la vista activa (nunca las 376 de golpe)
  const urisNecesarias = useMemo(() => {
    if (vista === 'visor' || obraActual) return [];
    if (vista === 'portada') return destacadas.map((o) => o.uri);
    return paginaLista.map((o) => o.uri);
  }, [vista, obraActual, destacadas, paginaLista]);
  useEffect(() => {
    urisNecesarias.forEach(pedir);
  }, [urisNecesarias, pedir]);

  // overheader de la ficha: colección activa o filtro documentado
  const contexto = useMemo(() => {
    if (capitulo) {
      const [p, c] = capitulo.split('::');
      return `ILUSTRACIONES DEL QUIJOTE · PARTE ${p} · ${c.toUpperCase()}`;
    }
    if (parte) return `ILUSTRACIONES DEL QUIJOTE · PARTE ${parte}`;
    return 'ILUSTRACIONES DEL QUIJOTE';
  }, [parte, capitulo]);

  if (error) {
    return (
      <main className="museo">
        <CabeceraMuseo onNavegar={onNavegar} />
        <p className="museo-error museo-error-central" role="alert">
          El manifiesto de ilustraciones no está disponible: {error}
        </p>
      </main>
    );
  }

  if (!galeria) {
    return (
      <main className="museo">
        <CabeceraMuseo onNavegar={onNavegar} />
        <p className="museo-cargando museo-cargando-central">Abriendo el Museo…</p>
      </main>
    );
  }

  return (
    <main className="museo">
      <CabeceraMuseo onNavegar={onNavegar} />

      {vista === 'visor' && obraActual ? (
        <VisorObra
          obras={filtradas}
          indice={seleccion!}
          contexto={contexto}
          catalogo={catalogo}
          imagenes={imagenes}
          fallos={fallos}
          pedir={pedir}
          onSeleccionar={setSeleccion}
          onCerrar={cerrarVisor}
        />
      ) : vista === 'portada' ? (
        <section className="museo-portada" aria-label="Obras destacadas">
          <div className="museo-portada-texto">
            <p className="museo-overheader">MUSEO · GALERÍA ARTÍSTICA</p>
            <h1 className="museo-titulo">{COLECCION_INICIAL.titulo}</h1>
            <p className="museo-entradilla">{COLECCION_INICIAL.descripcion}</p>
          </div>
          <div className="museo-destacadas">
            {destacadas.map((obra) => {
              const indice = acuarelas.findIndex((o) => o.id === obra.id);
              return (
                <button
                  key={obra.id}
                  className="museo-destacada"
                  onClick={() => {
                    setParte(null);
                    setCapitulo(null);
                    abrir(indice);
                  }}
                >
                  {imagenes[obra.uri] ? (
                    <img src={imagenes[obra.uri]} alt={obra.alt} loading="lazy" decoding="async" />
                  ) : (
                    <span className="museo-mini-vacia" aria-hidden="true">…</span>
                  )}
                  <span className="museo-destacada-titulo">{tituloDe(obra)}</span>
                  <span className="museo-destacada-id">{obra.id}</span>
                </button>
              );
            })}
          </div>
          <div className="museo-portada-acciones">
            <button
              className="museo-boton-ficha museo-boton-primario"
              onClick={() => {
                setVista('galeria');
                setSeleccion(null);
              }}
            >
              Ver las ilustraciones del Quijote ({acuarelas.length} acuarelas)
            </button>
            <button className="museo-boton-ficha" onClick={onSalir}>
              ← Volver al menú
            </button>
          </div>
        </section>
      ) : (
        <section className="museo-galeria" aria-label="Galería de ilustraciones">
          <div className="museo-filtros">
            <label>
              Parte
              <select
                value={parte ?? ''}
                onChange={(e) => {
                  setParte(e.target.value || null);
                  setCapitulo(null);
                  setPagina(0);
                }}
              >
                <option value="">Todas</option>
                {partes.map((p) => (
                  <option key={p} value={p}>
                    Parte {p}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Capítulo
              <select
                value={capitulo ?? ''}
                onChange={(e) => {
                  setCapitulo(e.target.value || null);
                  setPagina(0);
                }}
              >
                <option value="">Todos</option>
                {capitulos.map((c) => (
                  <option key={c.valor} value={c.valor}>
                    {c.etiqueta}
                  </option>
                ))}
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
                  className={`museo-mini${obra.esColeccionInicial ? ' en-coleccion' : ''}`}
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
              <button
                className="museo-boton-ficha"
                onClick={() => setPagina((p) => Math.max(0, p - 1))}
                disabled={pagina === 0}
              >
                ‹ Anterior
              </button>
              <span>
                página {pagina + 1} de {totalPaginas}
              </span>
              <button
                className="museo-boton-ficha"
                onClick={() => setPagina((p) => Math.min(totalPaginas - 1, p + 1))}
                disabled={pagina >= totalPaginas - 1}
              >
                Siguiente ›
              </button>
            </nav>
          )}
        </section>
      )}

      <footer className="museo-derechos">
        Uso interno en desarrollo · Acuarelas de la edición Tusell (Luis Tasso, 1905):
        redistribución condicionada (DQ.LIC.0001) · No constituye autorización de
        publicación ni comercialización
        {avisos.length > 0 && <> · {avisos.length} registro(s) del manifiesto requieren revisión</>}
      </footer>
    </main>
  );
}

/** Cabecera de la maqueta: azul noche, logotipo dorado, navegación central
 *  con Museo activo, ajustes/ayuda a la derecha y filete dorado inferior. */
function CabeceraMuseo({ onNavegar }: { onNavegar?: (modo: 'historia' | 'aventura') => void }) {
  return (
    <header className="museo-cabecera">
      <div className="museo-marca">
        <svg className="museo-logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 2 L13.6 8.4 L20 7 L15.4 11.4 L20 16 L13.6 14.4 L12 21 L10.4 14.4 L4 16 L8.6 11.4 L4 7 L10.4 8.4 Z" />
        </svg>
        <span className="museo-marca-nombre">El Quijote</span>
      </div>
      <nav className="museo-nav" aria-label="Secciones de la aplicación">
        <button
          className="museo-nav-item"
          onClick={() => onNavegar?.('historia')}
          disabled={!onNavegar}
        >
          <span aria-hidden="true">📖</span> Historia
        </button>
        <button
          className="museo-nav-item"
          onClick={() => onNavegar?.('aventura')}
          disabled={!onNavegar}
        >
          <span aria-hidden="true">⚔️</span> Aventura
        </button>
        <button className="museo-nav-item activo" aria-current="page">
          <span aria-hidden="true">🏛️</span> Museo
        </button>
        <button className="museo-nav-item" disabled title="Próximamente">
          <span aria-hidden="true">🗺️</span> Atlas
        </button>
        <button className="museo-nav-item" disabled title="Próximamente">
          <span aria-hidden="true">📜</span> Lector
        </button>
      </nav>
      <div className="museo-cabecera-extra">
        <button className="museo-icono" disabled title="Ajustes (próximamente)" aria-label="Ajustes">
          ⚙
        </button>
        <button className="museo-icono" disabled title="Ayuda (próximamente)" aria-label="Ayuda">
          ?
        </button>
      </div>
    </header>
  );
}
