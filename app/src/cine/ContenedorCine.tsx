// Contenedor cinematográfico reutilizable (encargo P1, «Implementación»):
// capa de escena a sangre + ranuras para los estados de la interfaz
// (narración y pregunta) y el panel lateral. Historia y Aventura lo
// componen; ninguno conoce su interior. Reglas que fija:
//  - La imagen (o el fondo neutro editorial) ocupa siempre la mayor superficie;
//    los paneles respetan el lado seguro del encuadre y la región crítica.
//  - DC-28/TS-001: los overlays muestran el texto completo sin scroll.
//    Si el contenido supera el área útil se usa una vista de lectura
//    independiente (sin imagen), con desplazamiento accesible solo allí.
//  - Transiciones discretas: fundido suave de plano; con movimiento reducido,
//    corte sin deriva (reduced_motion_fallback del contrato).
//  - El neutro es una decisión editorial: sin spinners ni avisos; solo un
//    fallo real de carga muestra la nota discreta única (cerrable, no bloquea).
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { rectaContenido, type Recta } from './hotspot';
import { requiereVistaDedicada } from './composicion';

export interface PlanoCine {
  /** URI lógica del activo visible; null = fondo neutro editorial. */
  uri: string | null;
  alt: string;
  autor?: string;
  /** Rótulo de evidencia (media_class): recreación — no evidencia histórica. */
  mediaClass?: string;
  /** Lado reservado al texto según el encuadre del activo. */
  ladoTexto: 'derecha' | 'izquierda';
  /** Presentación del fotograma: 'cover' (defecto, a sangre) o 'contain'
   *  (fotograma íntegro con letterbox y SIN deriva — p. ej. el señalamiento
   *  de hotspot exige la imagen quieta y completa). Regla genérica por tipo
   *  de interacción; nunca CSS por imagen. */
  ajuste?: 'cover' | 'contain';
}

interface Props {
  plano: PlanoCine;
  /** Estado de la interfaz: narración (texto lateral/banda) o pregunta
   *  (panel inferior de alto contraste). */
  estado: 'narracion' | 'pregunta';
  /** Identidad del contenido activo, para revaluar el layout en cada cambio. */
  contenidoClave?: string | number;
  reducirMovimiento: boolean;
  /** Cargador de URI lógica → URL usable (inyectado: Tauri o dev). */
  cargar: (uri: string) => Promise<string>;
  cabecera: ReactNode;
  /** Banda de narración (estado «narración»). */
  texto?: ReactNode;
  /** Panel inferior de pregunta (estado «pregunta»). */
  pregunta?: ReactNode;
  /** Acciones flotantes del contenedor (Descubrir más, etc.). */
  lateral?: ReactNode;
  /** Capa interactiva sobre la imagen DIBUJADA (p. ej. el señalamiento de
   *  hotspot). Recibe la recta medida de la imagen contenida (null mientras
   *  no haya imagen medible). La capa no es enfocable: la alternativa
   *  accesible vive en el panel de la pregunta (teclado y lector de pantalla). */
  zona?: (recta: Recta | null) => ReactNode;
}

/** Nota discreta de fallo real de carga (una por URI, cerrable, no bloquea). */
function NotaFallo({ mensaje, onCerrar }: { mensaje: string; onCerrar: () => void }) {
  return (
    <div className="nota-fallo" role="status" aria-live="polite">
      <span>No se ha podido mostrar una imagen de esta escena. La historia continúa con normalidad.</span>
      <button className="nota-cerrar" onClick={onCerrar} aria-label="Cerrar aviso (escape)">
        ✕
      </button>
      <span className="sr-only">{mensaje}</span>
    </div>
  );
}

export default function ContenedorCine({
  plano,
  estado,
  contenidoClave,
  reducirMovimiento,
  cargar,
  cabecera,
  texto,
  pregunta,
  lateral,
  zona,
}: Props) {
  // Caché de imágenes por URI con cross-fade entre planos (el plano saliente
  // persiste hasta que el entrante tiene píxeles: nunca se vacía el fotograma).
  const [cargadas, setCargadas] = useState<Record<string, string>>({});
  const [fallos, setFallos] = useState<Record<string, string>>({});
  const [notaCerrada, setNotaCerrada] = useState<string | null>(null);
  const pedidas = useRef<Set<string>>(new Set());
  const refPlano = useRef<HTMLImageElement | null>(null);
  // Conservador por defecto: solo un 'cover' editorial explícito permite recorte.
  const contain = plano.ajuste !== 'cover';
  const panelRef = useRef<HTMLElement | null>(null);
  const bandaRef = useRef<HTMLDivElement | null>(null);
  const [vistaDedicada, setVistaDedicada] = useState(false);

  // Cada pregunta/intervención comienza en composición cinematográfica.
  useEffect(() => { setVistaDedicada(false); }, [contenidoClave, estado]);

  // Ajuste por contenido real, no por ID de pregunta ni por nombre de imagen.
  // No se sustituye el scroll oculto por recorte: lo excepcional abre una
  // vista separada y accesible, sin imagen subyacente (DC-28 §1).
  useEffect(() => {
    if (vistaDedicada) return;
    const panel = estado === 'pregunta' ? panelRef.current : bandaRef.current;
    if (!panel) return;
    const medir = () => {
      const caja = panel.getBoundingClientRect();
      const fuera = caja.top < 72 || caja.bottom > window.innerHeight - 8;
      if (requiereVistaDedicada(panel.scrollHeight, window.innerHeight, estado, fuera)) {
        setVistaDedicada(true);
      }
    };
    const raf = requestAnimationFrame(medir);
    const observador = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(medir);
    observador?.observe(panel);
    if (panel.firstElementChild) observador?.observe(panel.firstElementChild);
    return () => {
      cancelAnimationFrame(raf);
      observador?.disconnect();
    };
  }, [estado, contenidoClave, pregunta, texto, vistaDedicada]);

  // Al cambiar el viewport o la preferencia tipográfica se vuelve a probar
  // el panel normal, sin dejar a la persona atrapada en la vista separada.
  useEffect(() => {
    const revaluar = () => setVistaDedicada(false);
    window.addEventListener('resize', revaluar);
    const cambiosTexto = new MutationObserver(revaluar);
    cambiosTexto.observe(document.documentElement, {
      attributes: true, attributeFilter: ['data-ajuste-texto'],
    });
    return () => {
      window.removeEventListener('resize', revaluar);
      cambiosTexto.disconnect();
    };
  }, []);

  // Recta de la imagen dibujada (solo con capa de zona): se mide al cargar el
  // plano y en cada redimensionado del viewport. Con 'contain' y sin deriva
  // la recta es estable, lo que mantiene honesto el hit-testing del hotspot.
  const [recta, setRecta] = useState<Recta | null>(null);
  useEffect(() => {
    if (!zona || !contain) {
      setRecta(null);
      return;
    }
    // El letterbox se alinea al lado opuesto del panel (lado_texto del
    // encuadre): la obra queda entera fuera de la columna.
    const alinear = plano.ladoTexto === 'izquierda' ? 'fin' : 'inicio';
    const medir = () => {
      const img = refPlano.current;
      if (!img || !img.complete || !img.naturalWidth) {
        setRecta(null);
        return;
      }
      const caja = img.getBoundingClientRect();
      const nueva = rectaContenido(
        img.naturalWidth,
        img.naturalHeight,
        caja.width,
        caja.height,
        'contain',
        alinear,
      );
      setRecta((previa) =>
        previa &&
        previa.x === nueva.x && previa.y === nueva.y &&
        previa.w === nueva.w && previa.h === nueva.h
          ? previa
          : nueva,
      );
    };
    const img = refPlano.current;
    // La decodificación puede terminar después del render: escuchar la carga
    // real además de medir al montar y en cada redimensionado.
    img?.addEventListener('load', medir);
    const observadorPlano = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(medir);
    if (img) observadorPlano?.observe(img);
    medir();
    window.addEventListener('resize', medir);
    return () => {
      img?.removeEventListener('load', medir);
      observadorPlano?.disconnect();
      window.removeEventListener('resize', medir);
    };
  }, [zona, contain, plano.uri, plano.ladoTexto, cargadas]);

  useEffect(() => {
    const uri = plano.uri;
    if (!uri || pedidas.current.has(uri)) return;
    pedidas.current.add(uri);
    cargar(uri)
      .then((src) => setCargadas((m) => ({ ...m, [uri]: src })))
      .catch((e) => {
        console.error('asset', uri, e);
        setFallos((f) => ({ ...f, [uri]: String(e) }));
      });
  }, [plano.uri, cargar]);

  // Cada URI fallida tiene derecho a una única nota; cambiar de plano la retira.
  const uriFallo =
    plano.uri && plano.uri in fallos && notaCerrada !== plano.uri ? plano.uri : null;

  const cerrarNota = useCallback(() => setNotaCerrada(plano.uri), [plano.uri]);
  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && uriFallo) {
        // Precedencia de Esc: la nota se cierra primero y el modo no la
        // interpreta como salida al menú.
        e.stopPropagation();
        cerrarNota();
      }
    };
    window.addEventListener('keydown', alPulsar, true);
    return () => window.removeEventListener('keydown', alPulsar, true);
  }, [uriFallo, cerrarNota]);

  const hayImagen = plano.uri !== null && plano.uri in cargadas;

  return (
    <main className={`cine cine-${estado} lado-${plano.ladoTexto} ${hayImagen ? '' : 'sin-plano'} ${vistaDedicada ? 'vista-dedicada' : ''}`}>
      <div className="lienzo" aria-hidden="true">
        {Object.entries(cargadas).map(([uri, src]) => (
          <img
            key={uri}
            ref={uri === plano.uri ? refPlano : undefined}
            src={src}
            alt=""
            className={`plano ${uri === plano.uri ? 'activo' : ''} ${
              reducirMovimiento || contain ? 'sin-deriva' : ''
            } ${contain ? 'ajuste-contain' : ''}`}
          />
        ))}
        <div className="neutro" style={{ opacity: hayImagen ? 0 : 1 }} aria-hidden="true">
          <div className="neutro-filete" />
        </div>
        <div className="vineta" />
        {zona && recta && (
          <div
            className="zona-plano"
            style={{ left: recta.x, top: recta.y, width: recta.w, height: recta.h }}
            aria-hidden="true"
          >
            {zona(recta)}
          </div>
        )}
      </div>

      {/* Descripción accesible del plano (alt) fuera de la capa decorativa. */}
      {hayImagen && plano.alt && <p className="sr-only">{plano.alt}</p>}

      {cabecera}
      {vistaDedicada && (
        <p className="estado-vista-dedicada" role="status">
          Vista de lectura independiente: contenido extenso, sin ocultar respuestas ni recortar la imagen.
        </p>
      )}

      <div ref={bandaRef} className={`banda-texto lado-${plano.ladoTexto} ${estado === 'narracion' ? 'visible' : ''}`}>
        {texto}
      </div>

      {pregunta && (
        <section ref={panelRef} className={`panel-pregunta lado-${plano.ladoTexto}`} aria-label="Pregunta">
          {pregunta}
        </section>
      )}

      {lateral}

      {plano.mediaClass && (
        <footer className="pie">
          <span className="rotulo">
            {plano.mediaClass === 'RECREACION_IA'
              ? 'recreación — no evidencia histórica'
              : plano.mediaClass}
          </span>
          {plano.autor && <span className="pie-autor">{plano.autor}</span>}
        </footer>
      )}

      {uriFallo && <NotaFallo mensaje={fallos[uriFallo]} onCerrar={cerrarNota} />}
    </main>
  );
}
