// Ajustes de presentación (encargo P1, decisión de producto 6 y requisito de
// movimiento reducido): tamaño de texto y preferencia de movimiento, con
// persistencia propia en localStorage (claves separadas del progreso de
// Aventura e Historia — nunca se toca progreso.json/progreso_historia.json).
// En Tauri el localStorage del WebView2 persiste por instalación; la
// migración a ajustes en SQLite queda como evolución posterior (perfil DP).
import { useCallback, useEffect, useRef, useState } from 'react';

/** Cuatro pasos, alineados con el vocabulario del perfil (text_size). */
export type TamanoTexto = 'pequeno' | 'medio' | 'grande' | 'muy_grande';
/** 'sistema' respeta prefers-reduced-motion; 'reducido' lo fuerza. */
export type Movimiento = 'sistema' | 'reducido';

export interface Ajustes {
  texto: TamanoTexto;
  movimiento: Movimiento;
}

export const AJUSTES_DEFECTO: Ajustes = { texto: 'medio', movimiento: 'sistema' };

const CLAVE = 'quijote.ajustes';
const ETIQUETAS: Record<TamanoTexto, string> = {
  pequeno: 'Pequeño',
  medio: 'Medio',
  grande: 'Grande',
  muy_grande: 'Muy grande',
};

function esAjustes(v: unknown): v is Ajustes {
  if (!v || typeof v !== 'object') return false;
  const a = v as Record<string, unknown>;
  return (
    typeof a.texto === 'string' && a.texto in ETIQUETAS &&
    (a.movimiento === 'sistema' || a.movimiento === 'reducido')
  );
}

/** Carga los ajustes guardados; un valor corrupto cae al defecto sin ruido. */
export function leerAjustes(): Ajustes {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return AJUSTES_DEFECTO;
    const parsed: unknown = JSON.parse(crudo);
    return esAjustes(parsed) ? parsed : AJUSTES_DEFECTO;
  } catch {
    return AJUSTES_DEFECTO;
  }
}

export function guardarAjustes(ajustes: Ajustes): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(ajustes));
  } catch {
    // sin almacenamiento: los ajustes viven solo en la sesión
  }
}

/** ¿Debe reducirse el movimiento con esta preferencia? */
export function movimientoReducido(pref: Movimiento): boolean {
  if (pref === 'reducido') return true;
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Aplica los ajustes al documento: los CSS leen data-ajuste-*. */
export function aplicarAjustes(ajustes: Ajustes): void {
  const raiz = document.documentElement;
  raiz.dataset.ajusteTexto = ajustes.texto;
  raiz.dataset.ajusteMovimiento = movimientoReducido(ajustes.movimiento) ? 'reducido' : 'sistema';
}

/** Estado de ajustes con persistencia inmediata y aplicación al documento. */
export function useAjustes(): {
  ajustes: Ajustes;
  fijarTexto: (t: TamanoTexto) => void;
  fijarMovimiento: (m: Movimiento) => void;
} {
  const [ajustes, setAjustes] = useState<Ajustes>(AJUSTES_DEFECTO);

  useEffect(() => {
    const leidos = leerAjustes();
    setAjustes(leidos);
    aplicarAjustes(leidos);
    // Si el sistema cambia la preferencia de movimiento en vivo, respetarla.
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const alCambiar = () => aplicarAjustes(leerAjustes());
    mq?.addEventListener?.('change', alCambiar);
    return () => mq?.removeEventListener?.('change', alCambiar);
  }, []);

  const fijar = useCallback((parcial: Partial<Ajustes>) => {
    setAjustes((prev) => {
      const nuevos = { ...prev, ...parcial };
      guardarAjustes(nuevos);
      aplicarAjustes(nuevos);
      return nuevos;
    });
  }, []);

  const fijarTexto = useCallback((t: TamanoTexto) => fijar({ texto: t }), [fijar]);
  const fijarMovimiento = useCallback((m: Movimiento) => fijar({ movimiento: m }), [fijar]);
  return { ajustes, fijarTexto, fijarMovimiento };
}

/**
 * Botón + popover de ajustes (compacto, para la cabecera del contenedor):
 * radios accesibles (flechas nativas del grupo), cierre con Esc y retorno del
 * foco al botón. Sin iconografía ornamental: rótulos de texto.
 */
export function AjustesBoton({
  ajustes,
  fijarTexto,
  fijarMovimiento,
}: {
  ajustes: Ajustes;
  fijarTexto: (t: TamanoTexto) => void;
  fijarMovimiento: (m: Movimiento) => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const refBoton = useRef<HTMLButtonElement>(null);
  const refDialogo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Precedencia de Esc: el popover consume la tecla y evita que el
        // modo (Historia/Aventura) la interprete como «salir al menú».
        e.stopPropagation();
        setAbierto(false);
        refBoton.current?.focus();
      }
    };
    const alClicFuera = (e: MouseEvent) => {
      if (
        refDialogo.current && !refDialogo.current.contains(e.target as Node) &&
        refBoton.current && !refBoton.current.contains(e.target as Node)
      ) {
        setAbierto(false);
      }
    };
    // Fase de captura: corre antes que los oyentes de burbuja del modo.
    window.addEventListener('keydown', alPulsar, true);
    window.addEventListener('mousedown', alClicFuera);
    return () => {
      window.removeEventListener('keydown', alPulsar, true);
      window.removeEventListener('mousedown', alClicFuera);
    };
  }, [abierto]);

  return (
    <span className="ajustes">
      <button
        ref={refBoton}
        className="control control-estado"
        aria-expanded={abierto}
        aria-haspopup="true"
        aria-label="Ajustes de texto y movimiento"
        onClick={() => setAbierto((v) => !v)}
      >
        Ajustes
      </button>
      {abierto && (
        <div
          ref={refDialogo}
          className="ajustes-panel"
          role="group"
          aria-label="Ajustes de presentación"
        >
          <fieldset className="ajustes-grupo">
            <legend>Tamaño del texto</legend>
            {(Object.keys(ETIQUETAS) as TamanoTexto[]).map((t) => (
              <label key={t} className="ajustes-opcion">
                <input
                  type="radio"
                  name="ajuste-texto"
                  value={t}
                  checked={ajustes.texto === t}
                  onChange={() => fijarTexto(t)}
                />
                <span>{ETIQUETAS[t]}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className="ajustes-grupo">
            <legend>Movimiento</legend>
            <label className="ajustes-opcion">
              <input
                type="radio"
                name="ajuste-movimiento"
                value="sistema"
                checked={ajustes.movimiento === 'sistema'}
                onChange={() => fijarMovimiento('sistema')}
              />
              <span>Según el sistema</span>
            </label>
            <label className="ajustes-opcion">
              <input
                type="radio"
                name="ajuste-movimiento"
                value="reducido"
                checked={ajustes.movimiento === 'reducido'}
                onChange={() => fijarMovimiento('reducido')}
              />
              <span>Reducir movimiento</span>
            </label>
          </fieldset>
        </div>
      )}
    </span>
  );
}
