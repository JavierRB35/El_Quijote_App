// Reproductor genérico del Modo Historia: orientado a datos, no conoce
// episodio concreto. La escena funciona sin imágenes ni audio (v1 con fondo
// neutro editorial): el texto íntegro es el elemento principal (DC-22/TS-001)
// y el autoavance respeta la lectura mínima (DC-21, P0-2). Controles siempre
// operables (pausa, continuar, repetir, retroceder, salto manual) — DC-21.
// El fondo neutro es una decisión de diseño (v1.2.0: media_ids: []), no un
// error de carga: se rotula como «presentación neutra», nunca como fallo.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Catalogo, type Beat, type Escena } from '../contrato';
import {
  cargarProgresoHistoria,
  guardarProgresoHistoria,
} from './persistencia';
import {
  etiquetaHablante,
  estructuraHistoria,
  inicioDeBeat,
  lecturaMinimaMs,
  progresoDesde,
  restaurarPosicion,
  type ItemLectura,
} from './logica';

const EPISODIO = 'DQ.P1.C08.E01';

interface Props {
  catalogo: Catalogo;
  onSalir: () => void;
}

/** Estructura de lectura del episodio a partir del catálogo (data-driven). */
function construirEstructura(catalogo: Catalogo): {
  titulo: string;
  items: ItemLectura[];
} {
  const episodio = catalogo.episodio(EPISODIO);
  const escenas: Escena[] = catalogo.escenasDeEpisodio(EPISODIO);
  const beatsPorEscena: Beat[][] = escenas.map((e) => catalogo.beatsDeEscena(e.id));
  return { titulo: episodio.title, items: estructuraHistoria(escenas, beatsPorEscena) };
}

export default function ReproductorHistoria({ catalogo, onSalir }: Props) {
  const { titulo, items } = useMemo(() => construirEstructura(catalogo), [catalogo]);

  // La posición se decide tras intentar recuperar el guardado (sin destello).
  const [posicion, setPosicion] = useState<number | null>(null);
  const [autoAvance, setAutoAvance] = useState(true); // cinematográfico (DC-21)
  const [enPausa, setEnPausa] = useState(false);
  const [ciclo, setCiclo] = useState(0); // re-arma la lectura (Repetir)
  const [avisoGuardado, setAvisoGuardado] = useState('');

  const siguienteExiste = posicion !== null && posicion + 1 < items.length;

  // ---- recuperación de la lectura (persistencia independiente de Aventura)
  useEffect(() => {
    if (!items.length) return;
    cargarProgresoHistoria()
      .then((crudo) => {
        if (crudo) {
          const restaurada = restaurarPosicion(items, EPISODIO, crudo);
          if (restaurada) {
            setPosicion(restaurada.posicion);
            if (restaurada.auto !== null) setAutoAvance(restaurada.auto);
            setAvisoGuardado('lectura recuperada');
            return;
          }
        }
        setPosicion(0); // inicio en I01
      })
      .catch(() => setPosicion(0));
  }, [items]);

  const avanzar = useCallback(() => {
    setPosicion((p) => (p !== null && p + 1 < items.length ? p + 1 : p));
  }, [items.length]);

  const retroceder = useCallback(() => {
    setPosicion((p) => (p !== null && p > 0 ? p - 1 : p));
  }, []);

  const repetirBeat = useCallback(() => {
    setPosicion((p) => (p !== null ? inicioDeBeat(items, p) : p));
    setCiclo((c) => c + 1);
  }, [items]);

  const repetirIntervencion = useCallback(() => setCiclo((c) => c + 1), []);

  const alternarAuto = useCallback(() => setAutoAvance((a) => !a), []);

  // ---- autoguardado de la posición y la preferencia (progreso_historia)
  useEffect(() => {
    if (posicion === null) return;
    const datos = JSON.stringify(progresoDesde(items, posicion, EPISODIO, autoAvance));
    guardarProgresoHistoria(datos)
      .then(() => setAvisoGuardado(`guardado ${new Date().toLocaleTimeString()}`))
      .catch((e) => setAvisoGuardado(`fallo de guardado: ${e}`));
  }, [posicion, autoAvance, items]);

  // ---- temporizador de autoavance con lectura mínima y pausa que congela
  // el tiempo restante (COMPONENTES_NARRATIVOS_UX §2.3; sin audio, el suelo
  // de lectura garantizado aplica siempre).
  const venceRef = useRef<number | null>(null);
  const restanteRef = useRef<number | null>(null);
  const claveRef = useRef('');

  useEffect(() => {
    if (posicion === null) return;
    const clave = `${posicion}|${ciclo}`;
    if (claveRef.current !== clave) {
      restanteRef.current = null; // nuevo paso o repetición: lectura completa
      claveRef.current = clave;
    }
    if (!autoAvance || enPausa || !siguienteExiste) return;
    const item = items[posicion];
    const ms = restanteRef.current ?? lecturaMinimaMs(item.intervencion.texto_visible, item.beat.lectura_minima_ms);
    const vence = performance.now() + ms;
    venceRef.current = vence;
    const id = setTimeout(avanzar, ms);
    return () => {
      clearTimeout(id);
      restanteRef.current = Math.max(0, vence - performance.now());
    };
  }, [posicion, ciclo, autoAvance, enPausa, siguienteExiste, items, avanzar]);

  // ---- teclado: salto manual ←/→, pausa Espacio/P, repetir R, beat B,
  // auto A, salir Esc (los controles existen también como botones).
  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
      const destino = e.target as HTMLElement | null;
      const esBoton = destino?.tagName === 'BUTTON';
      switch (e.key) {
        case 'ArrowRight':
        case 'Enter':
          if (!esBoton) { avanzar(); e.preventDefault(); }
          break;
        case 'ArrowLeft':
          if (!esBoton) { retroceder(); e.preventDefault(); }
          break;
        case ' ':
        case 'p':
        case 'P':
          if (!(esBoton && e.key === ' ')) { setEnPausa((v) => !v); e.preventDefault(); }
          break;
        case 'r':
        case 'R':
          repetirIntervencion();
          break;
        case 'b':
        case 'B':
          repetirBeat();
          break;
        case 'a':
        case 'A':
          alternarAuto();
          break;
        case 'Escape':
          onSalir();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [avanzar, retroceder, repetirIntervencion, repetirBeat, alternarAuto, onSalir]);

  if (posicion === null) {
    return (
      <main className="historia">
        <p className="historia-estado">Abriendo el libro…</p>
      </main>
    );
  }

  const item = items[posicion];
  const escena = item.escena;
  const beat = item.beat;
  const intervencion = item.intervencion;
  const intervencionesTotales = items.length;
  const esInicioBeat = inicioDeBeat(items, posicion) === posicion;
  const fin = !siguienteExiste;

  return (
    <main className="historia">
      <div className="historia-fondo" aria-hidden="true">
        <div className="historia-filete" />
      </div>

      <header className="cabecera">
        <p className="kicker">Parte I · Capítulo VIII · Modo Historia · Escena {item.escenaIdx + 1}</p>
        <h1>{titulo}</h1>
        <div className="cabecera-linea">
          <span className="progreso-texto">
            Intervención {posicion + 1} de {intervencionesTotales}
          </span>
          <div className="progreso-barra" role="presentation">
            <div
              className="progreso-relleno"
              style={{ width: `${((posicion + 1) / intervencionesTotales) * 100}%` }}
            />
          </div>
          <span className="rotulo rotulo-neutro">presentación neutra · sin imagen</span>
          {avisoGuardado && <span className="guardado">{avisoGuardado}</span>}
        </div>
      </header>

      <section className="lectura" aria-live="polite">
        <p className={`hablante hablante-${intervencion.speaker.tipo}`}>
          {etiquetaHablante(intervencion)}
        </p>
        <p className="beat-info">
          {beat.kind} · beat {beat.order} · paso {item.intervencionIdx + 1} de {beat.utterances.length}
          {esInicioBeat ? ' · inicio del beat' : ''}
        </p>
        <p className="texto">{intervencion.texto_visible}</p>
        {escena.accessibility?.alt && (
          <p className="escena-alt">{escena.accessibility.alt}</p>
        )}
      </section>

      {fin && (
        <section className="cierre" aria-live="polite">
          <p className="cierre-titulo">Camino del Puerto Lápice</p>
          <p className="cierre-texto">
            La aventura de los molinos queda contada. El episodio continúa en el
            Modo Aventura con sus preguntas.
          </p>
          <button
            className="primario"
            onClick={() => { setPosicion(0); setCiclo((c) => c + 1); }}
          >
            Volver a recorrer el episodio
          </button>
        </section>
      )}

      <footer className="controles" role="toolbar" aria-label="Controles del reproductor">
        <button className="control" onClick={retroceder} disabled={posicion === 0} aria-label="Atrás (flecha izquierda)">
          ◂ Atrás
        </button>
        <button className="control" onClick={repetirIntervencion} aria-label="Repetir intervención (R)">
          Repetir
        </button>
        <button className="control" onClick={repetirBeat} aria-label="Repetir beat desde su inicio (B)">
          Repetir beat
        </button>
        <button
          className="control"
          onClick={() => setEnPausa((v) => !v)}
          aria-pressed={enPausa}
          aria-label={enPausa ? 'Continuar (espacio)' : 'Pausa (espacio)'}
        >
          {enPausa ? '▸ Continuar' : '⏸ Pausa'}
        </button>
        <button
          className="control control-primario"
          onClick={avanzar}
          disabled={fin}
          aria-label="Siguiente intervención (enter)"
        >
          Siguiente ▸
        </button>
        <button
          className="control control-estado"
          onClick={alternarAuto}
          aria-pressed={autoAvance}
          aria-label="Autoavance cinematográfico (A)"
          title="Autoavance con lectura mínima garantizada"
        >
          Auto: {autoAvance ? 'sí' : 'no'}
        </button>
        <button className="control control-estado" onClick={onSalir} aria-label="Volver al menú (escape)">
          Menú
        </button>
      </footer>
    </main>
  );
}
