// Puerta única de los módulos: pantallas fijas y contenidos por capítulo.
import { useEffect, useMemo, useState } from 'react';
import type { Catalogo } from './contrato';
import { cargarCatalogo } from './entorno';
import { CAPITULOS, catalogoConHistoria, rondasDeCapitulo } from './capitulos/registro';
import ReproductorHistoria from './historia/ReproductorHistoria';
import AventuraNarrativa from './aventura/AventuraNarrativa';
import Museo from './museo/Museo';
import './App.css';

type Modo = 'menu' | 'historia' | 'aventura' | 'museo';

export default function App() {
  const [catalogo, setCatalogo] = useState<Catalogo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modo, setModo] = useState<Modo>('menu');
  const [capituloId, setCapituloId] = useState(CAPITULOS[0]?.capituloId ?? '');
  const ficha = useMemo(
    () => CAPITULOS.find((c) => c.capituloId === capituloId) ?? CAPITULOS[0],
    [capituloId],
  );

  useEffect(() => {
    cargarCatalogo()
      .then((base) => setCatalogo(catalogoConHistoria(base)))
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <main className="cine solo-estado">Error cargando el catálogo: {error}</main>;
  if (!catalogo) return <main className="cine solo-estado">Abriendo el Quijote…</main>;
  if (!ficha) return <main className="cine solo-estado">No hay capítulos autorizados.</main>;

  if (modo === 'historia') {
    return <ReproductorHistoria key={ficha.episodioId} catalogo={catalogo} ficha={ficha} onSalir={() => setModo('menu')} />;
  }
  if (modo === 'aventura') {
    return <AventuraNarrativa key={ficha.episodioId} catalogo={catalogo} ficha={ficha} rondas={rondasDeCapitulo(ficha)} onSalir={() => setModo('menu')} />;
  }
  if (modo === 'museo') {
    return <Museo catalogo={catalogo} onSalir={() => setModo('menu')} onNavegar={(destino) => setModo(destino)} />;
  }

  return (
    <main className="cine menu">
      <div className="menu-fondo" aria-hidden="true" />
      <section className="menu-tarjeta">
        <p className="kicker">El ingenioso hidalgo don Quijote de la Mancha · 1605</p>
        <h1>El Quijote</h1>
        <label className="menu-capitulo-etiqueta" htmlFor="selector-capitulo">Elige un capítulo del piloto</label>
        <select
          id="selector-capitulo"
          className="menu-selector-capitulo"
          value={ficha.capituloId}
          onChange={(e) => setCapituloId(e.target.value)}
        >
          {CAPITULOS.map((cap) => (
            <option value={cap.capituloId} key={cap.capituloId}>
              {cap.etiqueta} · {cap.titulo}
            </option>
          ))}
        </select>
        <p className="menu-entradilla">{ficha.resumen}</p>
        <div className="menu-modos">
          <button className="tarjeta-modo" onClick={() => setModo('historia')}>
            <span className="tarjeta-modo-nombre">Modo Historia</span>
            <span className="tarjeta-modo-detalle">{ficha.descripcionHistoria}</span>
          </button>
          <button className="tarjeta-modo" onClick={() => setModo('aventura')}>
            <span className="tarjeta-modo-nombre">Modo Aventura</span>
            <span className="tarjeta-modo-detalle">{ficha.descripcionAventura}</span>
          </button>
        </div>
        <button className="tarjeta-modo museo-entrada" onClick={() => setModo('museo')}>
          <span className="tarjeta-modo-nombre">Museo · Galería artística</span>
          <span className="tarjeta-modo-detalle">Las 376 acuarelas históricas de la edición Tusell, abiertas desde el inicio sin requisitos de progreso.</span>
        </button>
        <p className="menu-nota">Piloto funcional: Historia y Aventura guardan su progreso por episodio. QA visual del capítulo I pendiente.</p>
      </section>
    </main>
  );
}
