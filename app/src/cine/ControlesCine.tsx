// DC-37: transporte cinematográfico sobre el lienzo, no dentro del texto.
// Posición fija entre intervenciones; ratón: desaparición a los 2 s.
// El foco de teclado mantiene visibles los controles (accesibilidad).
import { useCallback, useEffect, useRef, useState } from 'react';

export interface AccionCine {
  etiqueta: string;
  onClick: () => void;
  deshabilitada?: boolean;
  pulsada?: boolean;
}

interface Props {
  izquierda?: AccionCine;
  centro?: AccionCine;
  derecha?: AccionCine;
}

const INACTIVIDAD_MS = 2000;

export default function ControlesCine({ izquierda, centro, derecha }: Props) {
  const [visibles, setVisibles] = useState(true);
  const raiz = useRef<HTMLDivElement>(null);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focoPorTeclado = useRef(false);

  const mostrar = useCallback(() => {
    setVisibles(true);
    if (temporizador.current !== null) clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => {
      // Un usuario que está tabulando no pierde el control que tiene enfocado.
      if (!focoPorTeclado.current || !raiz.current?.contains(document.activeElement)) {
        setVisibles(false);
      }
      temporizador.current = null;
    }, INACTIVIDAD_MS);
  }, []);

  useEffect(() => {
    mostrar();
    const mover = (evento: PointerEvent) => {
      if (evento.pointerType === 'mouse') {
        focoPorTeclado.current = false;
        mostrar();
      }
    };
    const navegarConTeclado = (evento: KeyboardEvent) => {
      if (evento.key === 'Tab') {
        focoPorTeclado.current = true;
        mostrar();
      }
    };
    window.addEventListener('pointermove', mover);
    window.addEventListener('keydown', navegarConTeclado, true);
    return () => {
      window.removeEventListener('pointermove', mover);
      window.removeEventListener('keydown', navegarConTeclado, true);
      if (temporizador.current !== null) clearTimeout(temporizador.current);
    };
  }, [mostrar]);

  const boton = (lugar: 'izquierda' | 'centro' | 'derecha', accion?: AccionCine) => {
    if (!accion) return null;
    return <button
      key={lugar}
      type="button"
      className={`lv-control-flotante lv-control-${lugar}`}
      aria-label={accion.etiqueta}
      title={accion.etiqueta}
      aria-pressed={accion.pulsada}
      disabled={accion.deshabilitada}
      onClick={evento => {
        // El ratón no deja un :focus-within persistente tras dos segundos.
        if (evento.detail > 0) {
          focoPorTeclado.current = false;
          evento.currentTarget.blur();
        }
        mostrar();
        accion.onClick();
      }}
    ><span aria-hidden="true">{lugar === 'izquierda' ? '<' : lugar === 'derecha' ? '>' : accion.pulsada ? '▶' : '⏸'}</span></button>;
  };

  return <div
    ref={raiz}
    className="lv-controles-cine"
    role="toolbar"
    aria-label="Controles cinematográficos"
    data-visibles={visibles}
    onFocusCapture={() => { focoPorTeclado.current = true; mostrar(); }}
    onBlurCapture={() => { if (temporizador.current === null) mostrar(); }}
  >
    {boton('izquierda', izquierda)}
    {boton('centro', centro)}
    {boton('derecha', derecha)}
  </div>;
}
