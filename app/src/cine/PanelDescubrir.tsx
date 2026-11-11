// Consulta documental independiente del pergamino narrativo. El diálogo
// conserva todo el contenido, gestiona foco/Esc y pausa el relato anfitrión.
import { useEffect, useRef } from 'react';
import FondoContextual from './FondoContextual';
import type { Discovery } from '../contrato';

interface Props {
  abierto: boolean;
  alternar: () => void;
  onCerrar: () => void;
  descubrimientos: Discovery[];
  nombreEpisodio: string;
}

function etiqueta(d: Discovery): string {
  if (d.speaker?.label) return d.speaker.label;
  const map: Record<string, string> = {
    cita_literal: 'Cita literal',
    humor_escena: 'Humor de la escena',
    curiosidad_recepcion: 'Curiosidad de recepción',
    dato: 'Dato',
  };
  return map[d.kind] ?? 'Descubrimiento';
}

export default function PanelDescubrir({
  abierto,
  alternar,
  onCerrar,
  descubrimientos,
  nombreEpisodio,
}: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const refCierre = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (abierto) {
      dialogo.current?.showModal();
      refCierre.current?.focus();
    } else if (dialogo.current?.open) {
      dialogo.current.close();
      boton.current?.focus();
    }
  }, [abierto]);

  return (
    <>
      <button
        ref={boton}
        className="control control-estado descubrir-boton"
        aria-expanded={abierto}
        aria-controls="panel-descubrir"
        onClick={alternar}
      >
        {abierto ? 'Cerrar descubrimientos' : 'Descubrir más'}
      </button>
      <dialog ref={dialogo} id="panel-descubrir" className="descubrir-vista"
        aria-label={`Descubrimientos de ${nombreEpisodio}`}
        onCancel={e => { e.preventDefault(); e.stopPropagation(); onCerrar(); }}>
        <FondoContextual />
        <div className="descubrir-cabecera">
          <h2 className="descubrir-titulo">Descubrir más</h2>
          <button
            ref={refCierre}
            className="control control-estado"
            onClick={onCerrar}
            aria-label="Cerrar descubrimientos (escape)"
          >
            Cerrar ✕
          </button>
        </div>
        {descubrimientos.length === 0 ? (
          <p className="descubrir-vacio">
            Todavía no hay descubrimientos anotados para este episodio.
          </p>
        ) : (
          <ul className="descubrir-lista">
            {descubrimientos.map((d) => (
              <li key={d.id} className="descubrir-item">
                <p className="descubrir-etiqueta">{etiqueta(d)}</p>
                <p className="descubrir-texto">{d.content}</p>
              </li>
            ))}
          </ul>
        )}
      </dialog>
    </>
  );
}
