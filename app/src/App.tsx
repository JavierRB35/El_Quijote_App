// Sistema vertical FASE 1 (DC-18): episodio de los molinos (I.8) jugable.
// Composición cinematográfica según docs/DIRECCION_ARTISTICA_PILOTO.md:
// escena 16:9 a sangre con deriva sutil (Ken Burns, desactivable), sujeto a la
// izquierda y panel de pregunta anclado a la derecha en pantallas anchas.
// Interacción 100 % seleccionada (DC-04) y operable por teclado (EF-ACC-01).
import { useCallback, useEffect, useMemo, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Catalogo, type MediaAsset, type Pregunta } from './contrato';
import './App.css';

type EstadoPregunta =
  | { fase: 'sin_responder' }
  | { fase: 'respondida'; acierto: boolean; seleccion: string[] };

type Progreso = Record<string, { acierto: boolean; seleccion: string[] }>;

const EPISODIO_INICIAL = 'DQ.P1.C08.E01'; // Los molinos de viento

/** Caché de imágenes cargadas por URI lógica, con cross-fade entre escenas. */
function useLienzo(catalogo: Catalogo | null) {
  const [imagenes, setImagenes] = useState<Record<string, string>>({});
  const [fallos, setFallos] = useState<Record<string, string>>({});

  const pedir = useCallback(
    (uri: string) => {
      if (!catalogo || uri in imagenes || uri in fallos) return;
      invoke<string>('leer_asset', { uri })
        .then((data) => setImagenes((m) => ({ ...m, [uri]: data })))
        .catch((e) => {
          console.error('asset', uri, e);
          setFallos((f) => ({ ...f, [uri]: String(e) }));
        });
    },
    [catalogo, imagenes, fallos],
  );

  return { imagenes, fallos, pedir };
}

function Lienzo({
  activa,
  imagenes,
  fallos,
  pedir,
  alt,
}: {
  activa: string | null;
  imagenes: Record<string, string>;
  fallos: Record<string, string>;
  pedir: (uri: string) => void;
  alt: string;
}) {
  useEffect(() => {
    if (activa) pedir(activa);
  }, [activa, pedir]);

  return (
    <div className="lienzo" aria-hidden={false}>
      {Object.entries(imagenes).map(([uri, src]) => (
        <img
          key={uri}
          src={src}
          alt={uri === activa ? alt : ''}
          className={uri === activa ? 'plano activo' : 'plano'}
        />
      ))}
      <div className="vineta" />
      {(activa === null || !(activa in imagenes)) && (
        <div className="lienzo-estado">
          {activa && activa in fallos
            ? `escena no disponible (${activa} → ${fallos[activa]})`
            : 'preparando la escena…'}
        </div>
      )}
    </div>
  );
}

/** Contador de diagnóstico (F9): FPS y memoria del WebView para la recogida
 *  de evidencia del criterio ADR-0001.4 (benchmark de escena en hardware real). */
function Diagnostico({ escena }: { escena: string | null }) {
  const [visible, setVisible] = useState(false);
  const [fps, setFps] = useState(0);
  const [mem, setMem] = useState('—');

  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === 'F9') setVisible((v) => !v);
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cuadros = 0;
    let t0 = performance.now();
    let raf = 0;
    let vivo = true;
    const tick = () => {
      cuadros++;
      const t = performance.now();
      if (t - t0 >= 1000) {
        setFps(Math.round((cuadros * 1000) / (t - t0)));
        cuadros = 0;
        t0 = t;
        const m = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory;
        setMem(m ? `${Math.round(m.usedJSHeapSize / 1048576)} MB JS` : '—');
      }
      if (vivo) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      vivo = false;
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div className="diagnostico" role="status">
      FPS {fps} · {mem} · {escena?.split('/').pop() ?? '—'}
    </div>
  );
}

function renderizadorRespuesta({
  pregunta,
  seleccion,
  respondida,
  onToggle,
}: {
  pregunta: Pregunta;
  seleccion: string[];
  respondida: boolean;
  onToggle: (id: string) => void;
}) {
  const inter = pregunta.interaction;

  if (inter.type === 'ordering') {
    const ordenHecho = seleccion;
    const restantes = inter.options.filter((o) => !ordenHecho.includes(o.id));
    return (
      <div>
        <ol className="orden-lista">
          {ordenHecho.map((id, i) => (
            <li key={id}>
              <span className="orden-num">{i + 1}</span>
              {inter.options.find((o) => o.id === id)?.label}
            </li>
          ))}
          {ordenHecho.length === 0 && (
            <li className="pista">Señale los hitos en el orden en que los vive el relato.</li>
          )}
        </ol>
        {!respondida && (
          <>
            <div className="opciones">
              {restantes.map((o) => (
                <button key={o.id} className="opcion" onClick={() => onToggle(o.id)}>
                  {o.label}
                </button>
              ))}
            </div>
            <button className="secundario" onClick={() => onToggle('__reset__')}>
              Comenzar de nuevo el orden
            </button>
          </>
        )}
      </div>
    );
  }

  if (inter.type === 'matching') {
    const esIzq = (id: string) => inter.pairs?.some((p) => p.left === id) ?? false;
    const izquierda = inter.options.filter((o) => esIzq(o.id));
    const derecha = inter.options.filter((o) => !esIzq(o.id));
    return (
      <div className="matching">
        <div>
          <h4>Elementos</h4>
          {izquierda.map((o) => (
            <button
              key={o.id}
              className={`opcion ${seleccion.includes(o.id) ? 'elegida' : ''}`}
              disabled={respondida}
              onClick={() => onToggle(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
        <div>
          <h4>Correspondencias</h4>
          {derecha.map((o) => (
            <button
              key={o.id}
              className={`opcion ${seleccion.includes(o.id) ? 'elegida' : ''}`}
              disabled={respondida}
              onClick={() => onToggle(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
        <p className="pista">
          Elija un elemento y después su correspondencia ({Math.floor(seleccion.length / 2)} de{' '}
          {inter.pairs?.length}).
        </p>
      </div>
    );
  }

  if (inter.type === 'hotspot') {
    return (
      <div className="opciones">
        <p className="pista">Localice en la escena:</p>
        {inter.options.map((o) => (
          <button
            key={o.id}
            className={`opcion ${seleccion.includes(o.id) ? 'elegida' : ''}`}
            disabled={respondida}
            onClick={() => onToggle(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    );
  }

  const multiple = inter.type === 'multi_choice';
  return (
    <div className="opciones">
      {multiple && <p className="pista">Pueden ser varias: deje marcadas todas las que correspondan.</p>}
      {inter.options.map((o) => (
        <button
          key={o.id}
          className={`opcion ${seleccion.includes(o.id) ? 'elegida' : ''}`}
          disabled={respondida}
          onClick={() => onToggle(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [catalogo, setCatalogo] = useState<Catalogo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<string[]>([]);
  const [estado, setEstado] = useState<EstadoPregunta>({ fase: 'sin_responder' });
  const [progreso, setProgreso] = useState<Progreso>({});
  const [avisoGuardado, setAvisoGuardado] = useState<string>('');

  useEffect(() => {
    invoke<Record<string, unknown>>('cargar_paquete')
      .then((p) => setCatalogo(new Catalogo(p as never)))
      .catch((e) => setError(String(e)));
  }, []);

  // Recuperación de partida (EF-AV-08/EF-PER): se restaura lo guardado y se
  // retoma en la primera pregunta sin responder. Un progreso corrupto o de
  // otro catálogo se ignora sin dar por buena la carga (§7.3).
  useEffect(() => {
    if (!catalogo || preguntas.length === 0) return;
    invoke<string | null>('cargar_progreso')
      .then((crudo) => {
        if (!crudo) return;
        let guardado: Progreso;
        try {
          guardado = JSON.parse(crudo) as Progreso;
        } catch {
          return; // progreso ilegible: comenzar de cero
        }
        const ids = new Set(preguntas.map((q) => q.id));
        const valido = Object.fromEntries(
          Object.entries(guardado).filter(([id, v]) => ids.has(id) && v && Array.isArray(v.seleccion)),
        );
        if (!Object.keys(valido).length) return;
        setProgreso(valido);
        const primeraLibre = preguntas.findIndex((q) => !(q.id in valido));
        setIndice(primeraLibre === -1 ? preguntas.length - 1 : primeraLibre);
        setAvisoGuardado(`partida recuperada · ${Object.keys(valido).length} respuestas`);
      })
      .catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogo]);

  const preguntas: Pregunta[] = useMemo(
    () => (catalogo ? catalogo.preguntasDeEpisodio(EPISODIO_INICIAL) : []),
    [catalogo],
  );
  const pregunta = preguntas[indice];

  useEffect(() => {
    setSeleccion([]);
    setEstado({ fase: 'sin_responder' });
  }, [indice]);

  // Autoguardado (EF-AV-08): cada respuesta persiste de forma atómica.
  useEffect(() => {
    if (estado.fase !== 'respondida' || !pregunta) return;
    const nuevo: Progreso = {
      ...progreso,
      [pregunta.id]: { acierto: estado.acierto, seleccion: estado.seleccion },
    };
    setProgreso(nuevo);
    invoke('guardar_progreso', { datos: JSON.stringify(nuevo) })
      .then(() => setAvisoGuardado(`guardado ${new Date().toLocaleTimeString()}`))
      .catch((e) => setAvisoGuardado(`fallo de guardado: ${e}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado]);

  const alternar = useCallback(
    (id: string) => {
      if (estado.fase === 'respondida' || !pregunta) return;
      const tipo = pregunta.interaction.type;
      if (id === '__reset__') {
        setSeleccion([]);
        return;
      }
      if (tipo === 'single_choice' || tipo === 'true_false' || tipo === 'hotspot') {
        const acierto = pregunta.interaction.correct_option_ids?.includes(id) ?? false;
        setSeleccion([id]);
        setEstado({ fase: 'respondida', acierto, seleccion: [id] });
        return;
      }
      if (tipo === 'ordering') {
        setSeleccion((s) => (s.includes(id) ? s : [...s, id]));
        return;
      }
      if (tipo === 'matching') {
        setSeleccion((s) => {
          const esIzquierda = (x: string) =>
            pregunta.interaction.pairs?.some((p) => p.left === x) ?? false;
          if (esIzquierda(id)) {
            const otros = s.filter((x) => !esIzquierda(x));
            return otros.includes(id) ? otros.filter((x) => x !== id) : [...otros, id];
          }
          const izquierdos = s.filter(esIzquierda);
          if (!izquierdos.length) return s;
          return [...s, id];
        });
        return;
      }
      setSeleccion((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    },
    [estado, pregunta],
  );

  function verificar() {
    if (!pregunta) return;
    const inter = pregunta.interaction;
    let acierto = false;
    if (inter.type === 'ordering') {
      acierto =
        inter.correct_order?.length === seleccion.length &&
        (inter.correct_order ?? []).every((id, i) => seleccion[i] === id);
    } else if (inter.type === 'matching') {
      const paresHechos = new Map<string, string>();
      const restantes = [...seleccion];
      for (const p of inter.pairs ?? []) {
        if (restantes.includes(p.left) && restantes.includes(p.right)) {
          paresHechos.set(p.left, p.right);
          restantes.splice(restantes.indexOf(p.left), 1);
          restantes.splice(restantes.indexOf(p.right), 1);
        }
      }
      acierto =
        (inter.pairs?.length ?? 0) > 0 &&
        (inter.pairs ?? []).every((p) => paresHechos.get(p.left) === p.right);
    } else {
      const correctas = inter.correct_option_ids ?? [];
      acierto =
        seleccion.length === correctas.length && correctas.every((id) => seleccion.includes(id));
    }
    setEstado({ fase: 'respondida', acierto: Boolean(acierto), seleccion });
  }

  function reiniciar() {
    setProgreso({});
    setIndice(0);
    invoke('guardar_progreso', { datos: '{}' }).catch((e) =>
      setAvisoGuardado(`fallo al limpiar el guardado: ${e}`),
    );
  }

  // ---- escena activa: la pre-imagen vigente; el desenlace al cerrar episodio
  const medioPost = useMemo(
    () =>
      catalogo
        ? Object.values(catalogo.medios?.() ?? {}).find(
            (m) => m.function === 'post_desenlace' && m.logical_uri.includes('chapter_08'),
          )
        : undefined,
    [catalogo],
  );
  const medioEscena = useMemo(() => {
    if (!catalogo) return undefined;
    // Última pre-imagen no nula desde la pregunta actual hacia atrás (persistente).
    for (let i = indice; i >= 0; i--) {
      const pre = preguntas[i]?.visual_requirements?.pre_image_media_id;
      if (pre) return catalogo.medio(pre);
    }
    return undefined;
  }, [catalogo, preguntas, indice]);

  const finDeEpisodio =
    estado.fase === 'respondida' && indice + 1 === preguntas.length && preguntas.length > 0;
  const escenaActiva: MediaAsset | undefined = finDeEpisodio ? medioPost : medioEscena;

  const { imagenes, fallos, pedir } = useLienzo(catalogo);

  if (error) return <main className="cine solo-estado">Error cargando el catálogo: {error}</main>;
  if (!catalogo) return <main className="cine solo-estado">Abriendo el Quijote…</main>;
  if (!pregunta)
    return <main className="cine solo-estado">No hay preguntas del episodio {EPISODIO_INICIAL}.</main>;

  const episodio = catalogo.episodio(EPISODIO_INICIAL);
  const respondida = estado.fase === 'respondida';
  const aciertos = Object.values(progreso).filter((p) => p.acierto).length;
  const requiereBoton = ['multi_choice', 'ordering', 'matching'].includes(
    pregunta.interaction.type,
  );

  return (
    <main className="cine">
      <Lienzo
        activa={escenaActiva?.logical_uri ?? null}
        imagenes={imagenes}
        fallos={fallos}
        pedir={pedir}
        alt={escenaActiva?.alt ?? ''}
      />

      <header className="cabecera">
        <p className="kicker">Parte I · Capítulo VIII · El Quijote</p>
        <h1>{episodio.title}</h1>
        <div className="cabecera-linea">
          <span className="progreso-texto">
            {indice + 1} / {preguntas.length}
          </span>
          <div className="progreso-barra" role="presentation">
            <div
              className="progreso-relleno"
              style={{ width: `${(Object.keys(progreso).length / preguntas.length) * 100}%` }}
            />
          </div>
          {avisoGuardado && <span className="guardado">{avisoGuardado}</span>}
        </div>
      </header>

      <section className="panel" aria-live="polite">
        <p className="enunciado">{pregunta.prompt}</p>
        {renderizadorRespuesta({ pregunta, seleccion, respondida, onToggle: alternar })}

        {!respondida && requiereBoton && (
          <button className="primario" onClick={verificar} disabled={seleccion.length === 0}>
            Comprobar
          </button>
        )}

        {respondida && (
          <div className={`feedback ${estado.acierto ? 'bien' : 'mal'}`}>
            <p className="veredicto">
              {estado.acierto ? 'Así es.' : 'No es exactamente eso.'} {pregunta.rationale}
            </p>
            {pregunta.rationale_extended && (
              <p className="ampliacion">{pregunta.rationale_extended}</p>
            )}
            {pregunta.evidence.map((ev) => (
              <p className="evidencia" key={ev.kind + (ev.passage_id ?? '')}>
                {ev.kind === 'cita_literal' && ev.quote
                  ? `«${ev.quote}»`
                  : `Evidencia: ${ev.kind}`}
              </p>
            ))}
            {indice + 1 < preguntas.length && (
              <button className="primario" onClick={() => setIndice(indice + 1)}>
                Seguir adelante
              </button>
            )}
            {finDeEpisodio && (
              <div className="resumen">
                <p className="resumen-titulo">Fin del paso por los molinos</p>
                <p>
                  {aciertos} de {preguntas.length} aciertos. Los descubrimientos quedan anotados en
                  su cuaderno de investigador.
                </p>
                <button className="secundario" onClick={reiniciar}>
                  Volver a pasar el episodio
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      <footer className="pie">
        <span className={`rotulo rotulo-${escenaActiva?.media_class ?? 'SIN'}`}>
          {escenaActiva?.media_class === 'RECREACION_IA'
            ? 'recreación — no evidencia histórica'
            : (escenaActiva?.media_class ?? '')}
        </span>
        {escenaActiva?.author ? <span className="pie-autor">{escenaActiva.author}</span> : null}
      </footer>

      <Diagnostico escena={escenaActiva?.logical_uri ?? null} />
    </main>
  );
}
