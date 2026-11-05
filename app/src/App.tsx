// Sistema vertical FASE 1 (DC-18): episodio de los molinos (I.8) jugable,
// con datos del paquete canónico del piloto y cero contenido incrustado.
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

function useImagen(logicalUri: string | undefined, catalogo: Catalogo | null): string | null {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let viva = true;
    setSrc(null);
    if (!catalogo || !logicalUri) return;
    invoke<string>('leer_asset', { uri: logicalUri })
      .then((data) => viva && setSrc(data))
      .catch((e) => console.error('asset', logicalUri, e));
    return () => {
      viva = false;
    };
  }, [logicalUri, catalogo]);
  return src;
}

function Escena({ medio, catalogo }: { medio?: MediaAsset; catalogo: Catalogo | null }) {
  const src = useImagen(medio?.logical_uri, catalogo);
  if (!medio) return null;
  return (
    <figure className="escena">
      {src ? (
        <img src={src} alt={medio.alt} />
      ) : (
        <div className="escena-cargando">cargando escena…</div>
      )}
      <figcaption>
        <span className={`rotulo rotulo-${medio.media_class}`}>{medio.media_class}</span>{' '}
        {medio.author ? `${medio.author} · ` : ''}
        {medio.date ?? ''}
      </figcaption>
    </figure>
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
              {i + 1}. {inter.options.find((o) => o.id === id)?.label}
            </li>
          ))}
          {ordenHecho.length === 0 && <li className="pista">Pulse los hitos en el orden del relato.</li>}
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
              Deshacer todo
            </button>
          </>
        )}
      </div>
    );
  }

  if (inter.type === 'matching') {
    const izquierda = inter.options.filter((o) => inter.pairs?.some((p) => p.left === o.id));
    const derecha = inter.options.filter((o) => inter.pairs?.some((p) => p.right === o.id));
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
          <h4>Asociaciones</h4>
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
          Pulsando un elemento y después su par se crea la asociación ({Math.floor(seleccion.length / 2)} de{' '}
          {inter.pairs?.length} hechas). Un solo clic en un elemento de la derecha lo empareja con el último
          elemento pulsado de la izquierda.
        </p>
      </div>
    );
  }

  if (inter.type === 'hotspot') {
    // FASE 1: selección por lista numerada (camino accesible, §3 y EF-PRE-06);
    // la superposición visual de zonas sobre la escena llega con el renderizador de escenas por capas.
    return (
      <div className="opciones">
        {inter.options.map((o, i) => (
          <button
            key={o.id}
            className={`opcion ${seleccion.includes(o.id) ? 'elegida' : ''}`}
            disabled={respondida}
            onClick={() => onToggle(o.id)}
          >
            Zona {i + 1}: {o.label}
          </button>
        ))}
      </div>
    );
  }

  // single_choice / multi_choice / true_false
  const multiple = inter.type === 'multi_choice';
  return (
    <div className="opciones">
      {multiple && (
        <p className="pista">Puede haber varias correctas: marque todas las que correspondan.</p>
      )}
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
  const [avisoGuardado, setAvisoGuardado] = useState<string>('autoguardado a la espera');

  useEffect(() => {
    invoke<Record<string, unknown>>('cargar_paquete')
      .then((p) => setCatalogo(new Catalogo(p as never)))
      .catch((e) => setError(String(e)));
  }, []);

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
      .catch((e) => setAvisoGuardado(`FALLO de guardado: ${e}`));
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
        // Elección única y hotspot: un clic responde directamente (sin puntería precisa).
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
            // Nuevo elemento izquierdo: sustituye al anterior y limpia su par.
            const otros = s.filter((x) => !esIzquierda(x));
            return otros.includes(id) ? otros.filter((x) => x !== id) : [...otros, id];
          }
          const izquierdos = s.filter(esIzquierda);
          const ultimo = izquierdos[izquierdos.length - 1];
          if (!ultimo) return s;
          const conPar = [...s, id];
          return conPar;
        });
        return;
      }
      // multi_choice
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

  const medioEscena = useMemo(() => {
    if (!catalogo || !pregunta) return undefined;
    const pre = pregunta.visual_requirements?.pre_image_media_id;
    return pre ? catalogo.medio(pre) : undefined;
  }, [catalogo, pregunta]);

  if (error) return <main className="app error">Error cargando el catálogo: {error}</main>;
  if (!catalogo) return <main className="app">Cargando catálogo canónico (content/piloto)…</main>;
  if (!pregunta)
    return <main className="app error">No hay preguntas del episodio {EPISODIO_INICIAL}.</main>;

  const episodio = catalogo.episodio(EPISODIO_INICIAL);
  const descubrimientos = catalogo.descubrimientosDeEpisodio(EPISODIO_INICIAL);
  const respondida = estado.fase === 'respondida';
  const aciertos = Object.values(progreso).filter((p) => p.acierto).length;
  const requiereBoton = ['multi_choice', 'ordering', 'matching'].includes(
    pregunta.interaction.type,
  );

  return (
    <main className="app">
      <header>
        <h1>El Quijote — {episodio.title}</h1>
        <p className="meta">
          Paquete <code>{catalogo.info().package_id}</code> · contrato v
          {catalogo.info().contract_version} · pregunta {indice + 1}/{preguntas.length} · aciertos{' '}
          {aciertos} · {avisoGuardado}
        </p>
      </header>

      <Escena medio={medioEscena} catalogo={catalogo} />

      <section className="pregunta" aria-live="polite">
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
              {estado.acierto ? 'Correcto.' : 'No es exactamente eso.'} {pregunta.rationale}
            </p>
            {pregunta.rationale_extended && (
              <p className="ampliacion">{pregunta.rationale_extended}</p>
            )}
            {pregunta.evidence.map((ev) => (
              <p className="evidencia" key={ev.kind + (ev.passage_id ?? '')}>
                {ev.kind === 'cita_literal' && ev.quote
                  ? `Cita: «${ev.quote}»`
                  : `Evidencia: ${ev.kind}`}
              </p>
            ))}
            {indice + 1 < preguntas.length && (
              <button className="primario" onClick={() => setIndice(indice + 1)}>
                Continuar
              </button>
            )}
            {indice + 1 === preguntas.length && (
              <div className="resumen">
                <p>
                  Fin del episodio vertical: {aciertos}/{preguntas.length} aciertos.
                </p>
                <p>
                  Descubrimientos para el cuaderno: {descubrimientos.length} · personajes:{' '}
                  {episodio.actors.length} · lugares: {episodio.places.length}
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
