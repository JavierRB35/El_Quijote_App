// DC-37: un único lienzo y pergamino para Historia y Aventura.
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { encuadreSeguro, regionesLibres, type Rectangulo } from './composicion';
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
  oculto: boolean;
  onContemplar: (oculto: boolean) => void;
  onComposicion?: (cabe: boolean) => void;
}

export default function ContenedorCine({ plano, estado, reducirMovimiento, cargar,
  cabecera, texto, pregunta, lateral, oculto, onContemplar, onComposicion }: Props) {
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
      const encuadre = encuadreSeguro(w, h, dimensiones.w, dimensiones.h, plano.regionCritica);
      // Las regiones son hipótesis del inventario existente; no aprobaciones.
      const candidatas = plano.regionCritica && src ? regionesLibres(w, h, encuadre.region) : [];
      let elegido: Rectangulo | undefined;
      panel.dataset.disposicion = 'filas';
      for (const r of candidatas) {
        panel.style.width = `${r.w}px`;
        if (panel.scrollHeight <= r.h && panel.scrollWidth <= r.w + 1) { elegido = r; break; }
      }
      const emergencia = !elegido;
      const r = elegido ?? regionesLibres(w, h)[0];
      panel.style.width = `${r.w}px`;
      if (emergencia && estado === 'pregunta') {
        let menor = panel.scrollHeight;
        let disposicion = 'filas';
        for (const candidata of ['columnas', 'paralelo', 'paralelo-amplio']) {
          panel.dataset.disposicion = candidata;
          if (panel.scrollHeight < menor) { menor = panel.scrollHeight; disposicion = candidata; }
        }
        panel.dataset.disposicion = disposicion;
      }
      const cabe = panel.scrollHeight <= r.h && panel.scrollWidth <= r.w + 1;
      setAjuste({ estilo: { left: r.x, top: r.y, width: r.w }, emergencia, cabe, fit: encuadre.fit });
      onComposicion?.(cabe);
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
    <div className="lv-imagen" aria-hidden="true" hidden={!oculto && ajuste.emergencia}>
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
    <footer className="lv-pie">
      <span>{plano.mediaClass === 'RECREACION_IA' ? 'Recreación artística · no es evidencia histórica' : plano.mediaClass}</span>
      {plano.autor && <span>{plano.autor}</span>}
      {(!src || ajuste.emergencia) && <span role="status">{error ? 'Imagen no disponible.' : !src ? 'Sin imagen asociada.' : 'Composición pendiente · imagen al ocultar texto'}</span>}
    </footer>
    {!ajuste.cabe && !oculto && <p className="lv-limite" role="alert">Amplía la ventana o reduce el tamaño del texto en Ajustes. Esta composición aún no permite leer todo el contenido.</p>}
  </main>;
}
