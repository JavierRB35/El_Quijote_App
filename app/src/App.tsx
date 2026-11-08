// EL QUIJOTE — sistema vertical FASE 1. App es la puerta de entrada: carga el
// catálogo y ofrece la elección entre Modo Historia (narración continua del
// episodio, nuevo en P0) y Modo Aventura (sistema de preguntas existente).
// La implementación de cada modo vive en su módulo: src/historia y
// src/aventura (encargo P0 §8: separar componentes, no engordar App).
import { useEffect, useState } from 'react';
import type { Catalogo } from './contrato';
import { cargarCatalogo } from './entorno';
import ReproductorHistoria from './historia/ReproductorHistoria';
import ModoAventura from './aventura/ModoAventura';
import Museo from './museo/Museo';
import './App.css';

type Modo = 'menu' | 'historia' | 'aventura' | 'museo';

export default function App() {
  const [catalogo, setCatalogo] = useState<Catalogo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modo, setModo] = useState<Modo>('menu');

  useEffect(() => {
    cargarCatalogo()
      .then(setCatalogo)
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <main className="cine solo-estado">Error cargando el catálogo: {error}</main>;
  if (!catalogo) return <main className="cine solo-estado">Abriendo el Quijote…</main>;

  if (modo === 'historia') {
    return <ReproductorHistoria catalogo={catalogo} onSalir={() => setModo('menu')} />;
  }
  if (modo === 'aventura') {
    return <ModoAventura catalogo={catalogo} onSalir={() => setModo('menu')} />;
  }
  if (modo === 'museo') {
    // El Museo no depende del catálogo editorial: accesible sin progreso.
    return (
      <Museo
        onSalir={() => setModo('menu')}
        onNavegar={(m) => setModo(m)}
      />
    );
  }

  return (
    <main className="cine menu">
      <div className="menu-fondo" aria-hidden="true" />
      <section className="menu-tarjeta">
        <p className="kicker">El ingenioso hidalgo don Quijote de la Mancha · 1605</p>
        <h1>El Quijote</h1>
        <p className="menu-entradilla">
          Elige cómo recorrer el episodio de los molinos de viento (Primera parte,
          capítulo VIII).
        </p>
        <div className="menu-modos">
          <button className="tarjeta-modo" onClick={() => setModo('historia')}>
            <span className="tarjeta-modo-nombre">Modo Historia</span>
            <span className="tarjeta-modo-detalle">
              Narración continua de la aventura: los gigantes que son molinos, la
              caída y el camino al Puerto Lápice. Con texto íntegro en pantalla,
              pausa, repetición y autoavance cinematográfico. Sin imagen ni audio
              obligatorios.
            </span>
          </button>
          <button className="tarjeta-modo" onClick={() => setModo('aventura')}>
            <span className="tarjeta-modo-nombre">Modo Aventura</span>
            <span className="tarjeta-modo-detalle">
              Preguntas sobre el episodio: hechos, causas y sentido del equívoco.
              Tu progreso de respuestas se conserva tal como lo dejaste.
            </span>
          </button>
        </div>
        <button className="tarjeta-modo museo-entrada" onClick={() => setModo('museo')}>
          <span className="tarjeta-modo-nombre">Museo · Galería artística</span>
          <span className="tarjeta-modo-detalle">
            Las acuarelas históricas de la edición Tusell: primera colección con
            las cinco obras del episodio de los molinos y el vizcaíno. Abierto a
            todos, sin requisitos de progreso.
          </span>
        </button>
        <p className="menu-nota">Historia guarda aparte la lectura; Aventura guarda aparte tus respuestas.</p>
      </section>
    </main>
  );
}
