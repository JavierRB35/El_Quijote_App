// DC-37: un único lienzo y pergamino para Historia y Aventura.
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { encuadreSeguro, elegirPergamino, posicionesPergamino, type Rectangulo } from './composicion';
import './lienzo.css';

export interface PlanoCine {
  uri: string | null;
  alt: string;
  autor?: string;
  mediaClass?: string;
  ladoTexto: 'derecha' | 'izquierda';
  /** Metadatos existentes; su presencia no equivale a aprobación DC-37. */
  regionCritica?: Rectangulo;
}
interface Props {
  plano: PlanoCine;
  estado: 'narracion' | 'pregunta';
  reducirMovimiento: boolean;
  cargar: (uri: string) => Promise<string>;
  cabecera: ReactNode;
  texto?: ReactNode;
  pregunta?: ReactNode;
  lateral?: ReactNode;
  controles?: ReactNode;
  /** Mantiene controles seleccionados durante contemplación; desactivado por defecto. */
  controlesEnContemplacion?: boolean;
  oculto: boolean;
  onContemplar: (oculto: boolean) => void;
  onComposicion?: (cabe: boolean) => void;
}

export default function ContenedorCine({ plano, estado, reducirMovimiento, cargar,
  cabecera, texto, pregunta, lateral, controles, controlesEnContemplacion = false,
  oculto, onContemplar, onComposicion }: Props) {
  const [carga, setCarga] = useState({ uri: '', src: '', error: false });
  const [dimensiones, setDimensiones] = useState({ w: 0, h: 0 });
  const [ajuste, setAjuste] = useState<{ estilo: CSSProperties; emergencia: boolean; cabe: boolean; fit: 'cover' | 'contain' }>({ estilo: {}, emergencia: true, cabe: true, fit: 'contain' });
  const raiz = useRef<HTMLElement>(null);
  const papel = useRef<HTMLElement>(null);
  const control = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    const uri = plano.uri;
    if (!uri) return;
    let vigente = true;
    let blob = '';
    cargar(uri).then(src => {
      blob = src;
      if (vigente) setCarga({ uri, src, error: false });
      else if (src.startsWith('blob:')) URL.revokeObjectURL(src);
    }).catch(() => { if (vigente) setCarga({ uri, src: '', error: true }); });
    return () => { vigente = false; if (blob.startsWith('blob:')) URL.revokeObjectURL(blob); };
  }, [plano.uri, cargar]);
  const src = carga.uri === plano.uri ? carga.src : '';
  const error = carga.uri === plano.uri && carga.error;

  useLayoutEffect(() => {
    const root = raiz.current, panel = papel.current;
    if (!root || !panel || oculto) return;
    let vigente = true;
    const medir = () => {
      if (!vigente) return;
      const { width: w, height: h } = root.getBoundingClientRect();
      if (w <= 0 || h <= 0) return;
      const encuadre = encuadreSeguro(w, h, dimensiones.w, dimensiones.h, plano.regionCritica);
      const anchoMaximo = Math.max(280, w - (w < 800 ? 84 : 116));
      const porcentajes = estado === 'pregunta'
        ? [.54, .64, .73, .84, 1]
        : [.41, .47, .53, .60, .69, 1];
      const disposiciones = estado === 'pregunta'
        ? ['filas', 'columnas', 'paralelo', 'paralelo-amplio']
        : ['filas'];
      let elegido: { rect: Rectangulo; libre: boolean; disposicion: string } | null = null;
      let contingencia: { rect: Rectangulo; libre: boolean; disposicion: string } | null = null;
      for (const porcentaje of porcentajes) {
        const anchoPanel = Math.min(anchoMaximo, Math.max(320, Math.round(w * porcentaje)));
        panel.style.width = anchoPanel + 'px';
        for (const disposicion of disposiciones) {
          panel.dataset.disposicion = disposicion;
          const altoPanel = panel.scrollHeight;
          const posiciones = posicionesPergamino(w, h, anchoPanel, altoPanel);
          const seleccion = elegirPergamino(posiciones, w, h, encuadre.region);
          if (!seleccion || panel.scrollWidth > anchoPanel + 1) continue;
          const propuesta = { rect: seleccion.rect, libre: seleccion.focoLibre, disposicion };
          if (!contingencia) contingencia = propuesta;
          if (seleccion.focoLibre) { elegido = propuesta; break; }
        }
        if (elegido) break;
      }
      const resultado = elegido ?? contingencia;
      if (resultado) {
        panel.dataset.disposicion = resultado.disposicion;
        panel.style.width = resultado.rect.w + 'px';
        const cabe = panel.scrollHeight <= resultado.rect.h && panel.scrollWidth <= resultado.rect.w + 1;
        const estilo = { left: resultado.rect.x, top: resultado.rect.y, width: resultado.rect.w };
        setAjuste(anterior => {
          if (anterior.estilo.left === estilo.left && anterior.estilo.top === estilo.top &&
              anterior.estilo.width === estilo.width && anterior.cabe === cabe &&
              anterior.emergencia === !resultado.libre && anterior.fit === encuadre.fit) return anterior;
          return { estilo, emergencia: !resultado.libre, cabe, fit: encuadre.fit };
        });
        onComposicion?.(cabe);
      } else {
        // Fallo TS-001: no truncar ni activar scroll; conservar la imagen visible,
        // señalar la composición para revisión y detener autoavance.
        const anchoPanel = anchoMaximo;
        panel.dataset.disposicion = 'filas';
        panel.style.width = anchoPanel + 'px';
        const estilo = { left: Math.max(20, w - (w < 800 ? 60 : 96) - anchoPanel),
          top: 78, width: anchoPanel };
        setAjuste(anterior => {
          if (anterior.estilo.left === estilo.left && anterior.estilo.top === estilo.top &&
              anterior.estilo.width === estilo.width && !anterior.cabe && anterior.emergencia) return anterior;
          return { estilo, emergencia: true, cabe: false, fit: encuadre.fit };
        });
        onComposicion?.(false);
      }
    };
    medir();
    const resize = new ResizeObserver(medir);
    resize.observe(root);
    const cambios = new MutationObserver(medir);
    cambios.observe(document.documentElement, { attributes: true, attributeFilter: ['data-ajuste-texto'] });
    document.fonts.ready.then(medir);
    return () => { vigente = false; resize.disconnect(); cambios.disconnect(); };
  }, [texto, pregunta, src, dimensiones, plano.regionCritica, oculto, onComposicion, estado]);

  return <main ref={raiz} className={`lienzo-vivo ${reducirMovimiento ? 'sin-movimiento' : ''}`}
    data-modo={estado} data-composicion={ajuste.emergencia ? 'pendiente' : 'candidata'}
    data-cabe={ajuste.cabe} data-contemplacion={oculto}>
    <div className="lv-imagen" aria-hidden="true">
      {src && <img key={plano.uri} src={src} alt="" style={{ objectFit: ajuste.fit }}
        onLoad={e => setDimensiones({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
        onError={() => setCarga({ uri: plano.uri ?? '', src: '', error: true })} />}
    </div>
    {src && <p className="sr-only">{plano.alt}</p>}
    <div className="lv-cabecera" hidden={oculto}>{cabecera}</div>
    <button ref={control} className="lv-contemplar" aria-controls={id} aria-expanded={!oculto}
      aria-label={oculto ? 'Mostrar texto' : 'Ocultar texto'} onClick={() => {
        onContemplar(!oculto); control.current?.focus();
      }}><span aria-hidden="true">{oculto ? '◉' : '◎'}</span><span>{oculto ? 'Mostrar texto' : 'Ocultar texto'}</span></button>
    <section id={id} ref={papel} hidden={oculto} className="pergamino lv-pergamino"
      style={ajuste.estilo} aria-label={estado === 'pregunta' ? 'Aventura narrativa' : 'Narración'}>
      {texto}{pregunta}
    </section>
    {!oculto && lateral}
    {(!oculto || controlesEnContemplacion) && controles}
    <footer className="lv-pie">
      <span>{plano.mediaClass === 'RECREACION_IA' ? 'Recreación artística · no es evidencia histórica' : plano.mediaClass}</span>
      {plano.autor && <span>{plano.autor}</span>}
      {(!src || ajuste.emergencia) && <span role="status">{error ? 'Imagen no disponible.' : !src ? 'Sin imagen asociada.' : 'Composición por revisar · imagen visible'}</span>}
    </footer>
    {!ajuste.cabe && !oculto && <p className="lv-limite" role="alert">Amplía la ventana o reduce el tamaño del texto en Ajustes. Esta composición aún no permite leer todo el contenido.</p>}
  </main>;
}
