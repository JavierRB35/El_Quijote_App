// Puerta única de los módulos: pantallas fijas y contenidos por capítulo.
import { useEffect, useMemo, useState } from 'react';
import type { Catalogo } from './contrato';
import { cargarCatalogo } from './entorno';
import { CAPITULOS, catalogoConHistoria, rondasDeCapitulo } from './capitulos/registro';
import ReproductorHistoria from './historia/ReproductorHistoria';
import AventuraNarrativa from './aventura/AventuraNarrativa';
import Museo from './museo/Museo';
import FondoContextual from './cine/FondoContextual';
import { AjustesBoton, useAjustes } from './cine/ajustes';
import './App.css';

type Modo = 'menu' | 'historia' | 'aventura' | 'museo';

export default function App() {
  const { ajustes, fijarTexto, fijarMovimiento } = useAjustes();
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

  if (error) return <main className="cine solo-estado"><FondoContextual /><section className="pergamino estado-lectura" role="alert"><p>No se ha podido abrir el Quijote.</p><details><summary>Detalles del error</summary>{error}</details><button onClick={() => window.location.reload()}>Reintentar</button></section></main>;
  if (!catalogo) return <main className="cine solo-estado"><FondoContextual /><p className="pergamino estado-lectura" role="status">Abriendo el Quijote…</p></main>;
  if (!ficha) return <main className="cine solo-estado"><FondoContextual /><p className="pergamino estado-lectura">No hay capítulos autorizados.</p></main>;

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
      <FondoContextual />
      <section className="menu-tarjeta">
        <p className="kicker">El ingenioso hidalgo don Quijote de la Mancha · 1605</p>
        <h1>El Quijote</h1>
        <AjustesBoton ajustes={ajustes} fijarTexto={fijarTexto} fijarMovimiento={fijarMovimiento} />
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
        <p className="menu-nota">Tu progreso se conserva en cada capítulo.</p>
      </section>
    </main>
  );
}
