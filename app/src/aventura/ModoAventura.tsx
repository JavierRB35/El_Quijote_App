// Modo Aventura (FASE 1, DC-18): episodio de los molinos (I, 8) jugable con
// el sistema de preguntas existente. Integración de dos líneas de trabajo:
//  - arquitectura del contenedor cinematográfico (PR #66: src/cine, estados
//    narración/pregunta, ajustes, panel inferior ampliable);
//  - subsanación editorial de I,8 (PR #65: imagen propia por pregunta DC-24
//    sin herencia, visibilidad narrativa por pasajes, conservación de
//    progreso P0 y presentación de ordenación no resuelta).
// Interacción 100 % seleccionada (DC-04) y operable por teclado (EF-ACC-01).
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cargarProgreso, guardarProgreso } from '../historia/persistencia';
import { leerAsset } from '../entorno';
import { Catalogo, type MediaAsset, type Pregunta } from '../contrato';
import ContenedorCine, { type PlanoCine } from '../cine/ContenedorCine';
import { encuadreDe } from '../cine/resolverPlano';
import { coordenadasImagen, puntoEnZona, rectaZonaEnPantalla, type Recta } from '../cine/hotspot';
import { AjustesBoton, movimientoReducido, useAjustes } from '../cine/ajustes';
import PanelDescubrir from '../cine/PanelDescubrir';
import { textoParaPantalla } from '../presentacion';
import { ordenPresentacion } from './presentacion';
import { pasajesNarrados, respuestasGuardadas, respuestasVisibles, separarVisibles } from './visibilidad';

type EstadoPregunta =
  | { fase: 'sin_responder' }
  | { fase: 'respondida'; acierto: boolean; seleccion: string[] };

type Progreso = Record<string, { acierto: boolean; seleccion: string[] }>;

const EPISODIO_INICIAL = 'DQ.P1.C08.E01'; // Los molinos de viento

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
    // Presentación garantizada no resuelta (corrección P1): el orden visible
    // nunca coincide con correct_order ni depende del azar (presentacion.ts).
    // La operabilidad por teclado se conserva: cada opción sigue siendo un
    // <button> focusable (EF-ACC-01).
    const opcionesVisibles = ordenPresentacion(pregunta)
      .map((id) => inter.options.find((o) => o.id === id))
      .filter((o) => o !== undefined);
    const restantes = opcionesVisibles.filter((o) => !ordenHecho.includes(o.id));
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
        <p className="pista">
          Señale la zona sobre la imagen; esta lista es la alternativa accesible
          (teclado y lector de pantalla):
        </p>
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

interface Props {
  catalogo: Catalogo;
  onSalir: () => void;
}

export default function ModoAventura({ catalogo, onSalir }: Props) {
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<string[]>([]);
  const [estado, setEstado] = useState<EstadoPregunta>({ fase: 'sin_responder' });
  const [progreso, setProgreso] = useState<Progreso>({});
  const [avisoGuardado, setAvisoGuardado] = useState<string>('');
  const [panelAmplio, setPanelAmplio] = useState(false);
  const [descubrirAbierto, setDescubrirAbierto] = useState(false);
  // Contemplar la imagen íntegra (P0, Issue #75): oculta el panel y la capa
  // de señalamiento sin tocar el progreso; vuelve con el botón flotante o Esc.
  const [contemplando, setContemplando] = useState(false);

  // Ajustes de presentación (texto/movimiento) con persistencia propia.
  const { ajustes, fijarTexto, fijarMovimiento } = useAjustes();
  const reducirMovimiento = movimientoReducido(ajustes.movimiento);

  const preguntas: Pregunta[] = useMemo(
    () => catalogo.preguntasDeEpisodio(EPISODIO_INICIAL),
    [catalogo],
  );

  // Visibilidad narrativa (encargo P1 §D): la cobertura de pasajes de los
  // beats indica qué lances están IMPLEMENTADOS en la narración del episodio
  // (estado del catálogo), no qué ha leído personalmente el jugador; el Modo
  // Aventura permanece como modalidad independiente y aquí no hay bloqueo por
  // progreso individual. Lo aún no narrado se lista como pendiente. La
  // relación es por identificadores de pasaje, no por posición de fichero: al
  // ampliar la narración, las bloqueadas se desbloquean solas.
  const { visibles, bloqueadas } = useMemo(() => {
    const beats = catalogo
      .escenasDeEpisodio(EPISODIO_INICIAL)
      .flatMap((escena) => catalogo.beatsDeEscena(escena.id));
    return separarVisibles(preguntas, pasajesNarrados(beats));
  }, [catalogo, preguntas]);

  // Recuperación de partida (EF-AV-08/EF-PER) sin pérdida de progreso: se
  // conservan en almacenamiento TODAS las respuestas válidas guardadas,
  // incluidas las de preguntas hoy bloqueadas por cobertura narrativa; solo
  // se muestran y contabilizan las de preguntas accesibles. Un progreso
  // corrupto, de otro catálogo o malformado se ignora sin dar por buena la
  // carga (§7.3). Al desbloquearse una pregunta, su respuesta anterior vuelve
  // a contabilizarse automáticamente.
  const idsConocidos = useMemo(() => new Set(preguntas.map((q) => q.id)), [preguntas]);
  const idsVisibles = useMemo(() => new Set(visibles.map((q) => q.id)), [visibles]);

  useEffect(() => {
    if (!catalogo || visibles.length === 0) return;
    cargarProgreso()
      .then((crudo) => {
        const guardadas = respuestasGuardadas(crudo, idsConocidos);
        if (!Object.keys(guardadas).length) return;
        setProgreso(guardadas);
        const primeraLibre = visibles.findIndex((q) => !(q.id in guardadas));
        setIndice(primeraLibre === -1 ? visibles.length - 1 : primeraLibre);
        const hoy = Object.keys(respuestasVisibles(guardadas, idsVisibles)).length;
        setAvisoGuardado(`partida recuperada · ${hoy} respuestas`);
      })
      .catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogo]);

  const pregunta = visibles[indice];

  useEffect(() => {
    setSeleccion([]);
    setEstado({ fase: 'sin_responder' });
    setContemplando(false);
  }, [indice]);

  // Autoguardado (EF-AV-08): cada respuesta persiste de forma atómica.
  useEffect(() => {
    if (estado.fase !== 'respondida' || !pregunta) return;
    const nuevo: Progreso = {
      ...progreso,
      [pregunta.id]: { acierto: estado.acierto, seleccion: estado.seleccion },
    };
    setProgreso(nuevo);
    guardarProgreso(JSON.stringify(nuevo))
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

  const verificar = useCallback(function verificar() {
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
  }, [pregunta, seleccion]);

  function reiniciar() {
    setProgreso({});
    setIndice(0);
    guardarProgreso('{}').catch((e) =>
      setAvisoGuardado(`fallo al limpiar el guardado: ${e}`),
    );
  }

  // ---- teclado: Comprobar/Seguir con Enter fuera de botones; Esc vuelve al
  // menú (si el cajón de descubrimientos está abierto, lo cierra primero).
  const respondidaGlobal = estado.fase === 'respondida';
  const puedeComprobar = pregunta && seleccion.length > 0;
  const puedeSeguir = respondidaGlobal && pregunta && indice + 1 < visibles.length;
  const seguir = useCallback(
    () => setIndice((i) => i + 1),
    [],
  );
  const cerrarDescubrir = useCallback(() => setDescubrirAbierto(false), []);
  const descubrirRef = useRef(descubrirAbierto);
  descubrirRef.current = descubrirAbierto;
  const contemplandoRef = useRef(contemplando);
  contemplandoRef.current = contemplando;
  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
      const destino = e.target as HTMLElement | null;
      const esBoton = destino?.tagName === 'BUTTON' || destino?.tagName === 'INPUT';
      switch (e.key) {
        case 'Enter':
          if (!esBoton && descubrirRef.current) return;
          if (!esBoton && puedeComprobar) { verificar(); e.preventDefault(); }
          else if (!esBoton && puedeSeguir) { seguir(); e.preventDefault(); }
          break;
        case 'Escape':
          // Precedencia: contemplar → descubrimientos → salir al menú.
          if (contemplandoRef.current) {
            setContemplando(false);
            e.preventDefault();
          } else if (descubrirRef.current) {
            setDescubrirAbierto(false);
            e.preventDefault();
          } else {
            onSalir();
          }
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [puedeComprobar, puedeSeguir, verificar, seguir, onSalir]);

  // Descubrimientos del episodio (panel lateral, plegado por defecto).
  const descubrimientos = useMemo(
    () => catalogo.descubrimientosDeEpisodio(EPISODIO_INICIAL),
    [catalogo],
  );

  // ---- escena activa: la imagen propia de la pregunta (DC-24), sin herencia
  // de la pregunta anterior. Un hotspot muestra su propia imagen de ejercicio;
  // el resto, su pre-imagen exclusiva. El desenlace al cerrar el episodio.
  const medioPost = useMemo(
    () =>
      Object.values(catalogo.medios?.() ?? {}).find(
        (m) => m.function === 'post_desenlace' && m.logical_uri.includes('chapter_08'),
      ),
    [catalogo],
  );
  const medioEscena = useMemo(() => {
    const vr = pregunta?.visual_requirements;
    const propio =
      pregunta?.interaction.type === 'hotspot'
        ? (vr?.hotspot_media_id ?? vr?.pre_image_media_id)
        : vr?.pre_image_media_id;
    return propio ? catalogo.medio(propio) : undefined;
  }, [catalogo, pregunta]);

  const finDeEpisodio =
    estado.fase === 'respondida' && indice + 1 === visibles.length && visibles.length > 0;
  const escenaActiva: MediaAsset | undefined = finDeEpisodio ? medioPost : medioEscena;

  // Marcador y avance solo con preguntas accesibles hoy; las respuestas
  // conservadas de preguntas bloqueadas no contabilizan (corrección P0).
  const respuestasHoy = useMemo(
    () => respuestasVisibles(progreso, idsVisibles),
    [progreso, idsVisibles],
  );
  const aciertos = Object.values(respuestasHoy).filter((p) => p.acierto).length;
  const respondidasHoy = Object.keys(respuestasHoy).length;

  if (!pregunta)
    return <main className="cine solo-estado">No hay preguntas disponibles del episodio {EPISODIO_INICIAL}.</main>;

  const episodio = catalogo.episodio(EPISODIO_INICIAL);
  const respondida = estado.fase === 'respondida';
  const requiereBoton = ['multi_choice', 'ordering', 'matching'].includes(
    pregunta.interaction.type,
  );

  // Hotspot visual (P0, Issue #75): la zona normalizada del contrato se
  // señala sobre la imagen íntegra (presentación 'contain', fotograma
  // estático); la lista textual queda como alternativa accesible explícita.
  // El hit-test usa la recta de imagen dibujada que mide ContenedorCine:
  // dentro de hotspot_area = opción correcta; sobre la imagen pero fuera =
  // señalamiento erróneo (primer distractor); sobre las bandas = sin efecto.
  // Tras responder, la marca de la zona correcta solo se dibuja mientras la
  // imagen visible siga siendo la del propio hotspot (si el episodio pasa al
  // desenlace, la marca no se proyecta sobre otra imagen).
  const interaccion = pregunta.interaction;
  const esImagenHotspot =
    interaccion.type === 'hotspot' &&
    Boolean(interaccion.hotspot_area) &&
    escenaActiva?.id === pregunta.visual_requirements?.hotspot_media_id;
  const esHotspot = esImagenHotspot && !respondida && !contemplando;
  const marcaHotspot = respondida && esImagenHotspot && !contemplando;
  const zonaHotspot = marcaHotspot
    ? (recta: Recta | null) => {
        if (!recta) return null;
        const marca = rectaZonaEnPantalla(interaccion.hotspot_area!, recta);
        return <div className="zona-marca" style={{ left: marca.x, top: marca.y, width: marca.w, height: marca.h }} />;
      }
    : esHotspot
      ? () => (
          <div
            className="capa-senal"
            onClick={(e) => {
              const caja = e.currentTarget.getBoundingClientRect();
              const uv = coordenadasImagen(e.clientX, e.clientY, {
                x: caja.left,
                y: caja.top,
                w: caja.width,
                h: caja.height,
              });
              if (!uv) return; // bandas de letterbox: fuera del cuadro
              const correctas = interaccion.correct_option_ids ?? [];
              if (puntoEnZona(uv.u, uv.v, interaccion.hotspot_area!) && correctas[0]) {
                alternar(correctas[0]);
                return;
              }
              const distractor = interaccion.options.find((o) => !correctas.includes(o.id));
              if (distractor) alternar(distractor.id);
            }}
          />
        )
      : undefined;

  const plano: PlanoCine = escenaActiva
    ? {
        uri: escenaActiva.logical_uri,
        alt: escenaActiva.alt,
        autor: escenaActiva.author,
        mediaClass: escenaActiva.media_class,
        ladoTexto: encuadreDe(escenaActiva.id).lado_texto,
        ajuste: esImagenHotspot ? 'contain' : 'cover',
      }
    : {
        uri: null,
        alt: 'Fondo neutro editorial, sin imagen disponible para esta pregunta.',
        ladoTexto: 'derecha',
      };

  const cabecera = (
    <header className="cabecera">
      <p className="kicker">Parte I · Capítulo VIII · El Quijote · Modo Aventura</p>
      <h1>{episodio.title}</h1>
      <div className="cabecera-linea">
        <span className="progreso-texto">
          {indice + 1} / {visibles.length}
        </span>
        <div className="progreso-barra" role="presentation">
          <div
            className="progreso-relleno"
            style={{ width: `${(respondidasHoy / visibles.length) * 100}%` }}
          />
        </div>
        {avisoGuardado && <span className="guardado">{avisoGuardado}</span>}
        <span className="cabecera-acciones">
          <AjustesBoton ajustes={ajustes} fijarTexto={fijarTexto} fijarMovimiento={fijarMovimiento} />
          <PanelDescubrir
            abierto={descubrirAbierto}
            alternar={() => setDescubrirAbierto((v) => !v)}
            onCerrar={cerrarDescubrir}
            descubrimientos={descubrimientos}
            nombreEpisodio={episodio.title}
          />
          <button className="control control-estado" onClick={onSalir} aria-label="Volver al menú (escape)">
            Menú
          </button>
        </span>
      </div>
    </header>
  );

  const cuerpoPregunta = (
    <>
      <p className="enunciado">{pregunta.prompt}</p>
      {renderizadorRespuesta({ pregunta, seleccion, respondida, onToggle: alternar })}
      {!respondida && requiereBoton && (
        <button className="primario" onClick={verificar} disabled={seleccion.length === 0}>
          Comprobar
        </button>
      )}
      {!respondida && (
        // Contemplar la imagen íntegra (P0): oculta el panel sin tocar el
        // progreso; vuelve con el botón flotante o Esc.
        <button
          className="control control-estado contemplar-panel"
          onClick={() => setContemplando(true)}
        >
          Contemplar la imagen
        </button>
      )}
      {!respondida && (
        <button
          className="control control-estado ampliar-panel"
          aria-expanded={panelAmplio}
          onClick={() => setPanelAmplio((v) => !v)}
        >
          {panelAmplio ? 'Reducir panel' : 'Ampliar panel'}
        </button>
      )}
    </>
  );

  const cuerpoNarracion = respondida && (
    <section className="lectura feedback-lectura" aria-live="polite">
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
              ? `«${textoParaPantalla(ev.quote)}»`
              : `Evidencia: ${ev.kind}`}
          </p>
        ))}
        {puedeSeguir && (
          <button className="primario" onClick={seguir}>
            Seguir adelante
          </button>
        )}
        {finDeEpisodio && (
          <div className="resumen">
            <p className="resumen-titulo">Fin del paso por los molinos</p>
            <p>
              {aciertos} de {visibles.length} aciertos. Los descubrimientos quedan anotados en
              su cuaderno de investigador.
            </p>
            {bloqueadas.length > 0 && (
              <p>
                Otras {bloqueadas.length} preguntas de este capítulo llegarán cuando la
                narración del Modo Historia alcance sus lances.
              </p>
            )}
            <button className="secundario" onClick={reiniciar}>
              Volver a pasar el episodio
            </button>
          </div>
        )}
      </div>
    </section>
  );

  return (
    <ContenedorCine
      plano={plano}
      estado={respondida ? 'narracion' : 'pregunta'}
      reducirMovimiento={reducirMovimiento}
      cargar={leerAsset}
      cabecera={cabecera}
      texto={cuerpoNarracion}
      lateral={
        <>
          <Diagnostico escena={plano.uri} />
          {contemplando && (
            <button
              className="control control-estado volver-pregunta"
              onClick={() => setContemplando(false)}
            >
              Volver a la pregunta (escape)
            </button>
          )}
        </>
      }
      zona={zonaHotspot}
      pregunta={
        respondida || contemplando ? undefined : (
          <div className={`panel-pregunta-cuerpo ${panelAmplio ? 'amplio' : ''}`}>
            {cuerpoPregunta}
          </div>
        )
      }
    />
  );
}
