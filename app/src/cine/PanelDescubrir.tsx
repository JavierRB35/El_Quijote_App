// Panel lateral «Descubrir más» (encargo P1, decisión de producto 4):
// cajón plegado por defecto con los descubrimientos del episodio. Todo su
// contenido es recuperable (TS-001 aplicado al material editorial: nunca se
// recorta), operable por teclado (Esc cierra, foco gestionado) y anunciado
// por lectores de pantalla (aria-expanded, aria-hidden, role="complementary").
import { useEffect, useRef } from 'react';
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
  const refCierre = useRef<HTMLButtonElement>(null);

  // Al abrir, el foco entra al panel; Esc lo cierra y devuelve el foco.
  useEffect(() => {
    if (abierto) refCierre.current?.focus();
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // El cajón consume Esc (captura) antes que el modo lo interprete
        // como «salir al menú».
        e.stopPropagation();
        onCerrar();
      }
    };
    window.addEventListener('keydown', alPulsar, true);
    return () => window.removeEventListener('keydown', alPulsar, true);
  }, [abierto, onCerrar]);

  return (
    <>
      <button
        className="control control-estado descubrir-boton"
        aria-expanded={abierto}
        aria-controls="panel-descubrir"
        onClick={alternar}
      >
        {abierto ? 'Cerrar descubrimientos' : 'Descubrir más'}
      </button>
      <aside
        id="panel-descubrir"
        className={`descubrir ${abierto ? 'abierto' : ''}`}
        aria-hidden={!abierto}
        aria-label={`Descubrimientos de ${nombreEpisodio}`}
        {...(!abierto ? { inert: '' as never } : {})}
      >
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
      </aside>
    </>
  );
}
