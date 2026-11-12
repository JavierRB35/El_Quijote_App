// Nuevo Modo Aventura: anticipar el siguiente acto, nunca alterar el canon.
// Estado puro en motorNarrativo; sin cuestionarios de conocimientos.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Catalogo } from '../contrato';
import { leerAsset } from '../entorno';
import ContenedorCine from '../cine/ContenedorCine';
import ControlesCine from '../cine/ControlesCine';
import { encuadreDe } from '../cine/resolverPlano';
import { cargarProgresoDeEpisodio, guardarProgresoDeEpisodio } from '../historia/persistencia';
import { AjustesBoton, movimientoReducido, useAjustes } from '../cine/ajustes';
import {
  PUNTOS_MAXIMOS,
  VERSION_PARTIDA,
  continuar,
  nuevaPartida,
  ordenarOpciones,
  responder,
  restaurarPartida,
  revelar,
  type ImagenNarrativa,
  type Partida,
} from './motorNarrativo';
import type { FichaCapitulo } from '../capitulos/registro';
import './aventuraNarrativa.css';

interface Props {
  catalogo: Catalogo;
  onSalir: () => void;
  ficha: FichaCapitulo;
  rondas: readonly import('./motorNarrativo').RondaNarrativa[];
}

function imagenVigente(imagen: ImagenNarrativa, catalogo: Catalogo): string {
  // Un medio registrado manda sobre la URI editorial. Las ilustraciones de
  // Historia sin MediaAsset conservan su URI física actual sin inventar IDs.
  return (imagen.medioId && catalogo.medio(imagen.medioId)?.logical_uri) || imagen.uri;
}

function Puntuacion({ puntos }: { puntos: number }) {
  return (
    <div className="an-puntos" aria-label={`Puntos de aventura: ${puntos} de ${PUNTOS_MAXIMOS}`}>
      <span className="an-puntos-titulo">Puntos</span>
      {Array.from({ length: PUNTOS_MAXIMOS }, (_, i) => (
        <span key={i} aria-hidden="true" className={i < puntos ? 'an-escudo activo' : 'an-escudo'}>◆</span>
      ))}
      <strong>{puntos}/{PUNTOS_MAXIMOS}</strong>
    </div>
  );
}

export default function AventuraNarrativa({ catalogo, onSalir, ficha, rondas }: Props) {
  const episodioId = ficha.episodioId;
  const [partida, setPartida] = useState<Partida>(() => nuevaPartida(0, episodioId));
  const [cargado, setCargado] = useState(false);
  const [errorGuardado, setErrorGuardado] = useState('');
  const [estadoGuardado, setEstadoGuardado] = useState<'pendiente' | 'guardado' | 'error'>('pendiente');
  const colaGuardado = useRef<Promise<void>>(Promise.resolve());
  const revisionGuardado = useRef(0);
  const { ajustes, fijarTexto, fijarMovimiento } = useAjustes();
  const sinMovimiento = movimientoReducido(ajustes.movimiento);
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    let vivo = true;
    cargarProgresoDeEpisodio('aventura', episodioId)
      .then((raw) => {
        if (!vivo) return;
        const restaurada = restaurarPartida(raw, rondas, episodioId);
        if (restaurada) setPartida(restaurada);
      })
      .catch((error: unknown) => { if (vivo) setErrorGuardado(String(error)); })
      .finally(() => { if (vivo) setCargado(true); });
    return () => { vivo = false; };
  }, [episodioId, rondas]);

  useEffect(() => {
    if (!cargado) return;
    const datos = JSON.stringify({
      version: VERSION_PARTIDA,
      episodio: episodioId,
      partida,
    });
    const revision = ++revisionGuardado.current;
    setEstadoGuardado('pendiente');
    colaGuardado.current = colaGuardado.current.catch(() => undefined)
      .then(() => guardarProgresoDeEpisodio('aventura', episodioId, datos))
      .then(() => {
        if (revision === revisionGuardado.current) {
          setErrorGuardado('');
          setEstadoGuardado('guardado');
        }
      })
      .catch((e: unknown) => {
        if (revision === revisionGuardado.current) {
          setEstadoGuardado('error');
          setErrorGuardado(`No se pudo guardar: ${String(e)}`);
        }
      });
  }, [partida, cargado, episodioId]);

  const ronda = rondas[Math.min(partida.indice, rondas.length - 1)];
  const enResultado = partida.fase === 'resultado';
  const enRevelacion = partida.fase === 'revelacion';
  const enCheckpoint = partida.fase === 'checkpoint';
  const completada = partida.fase === 'completada';
  const mostrarConsecuencia = enRevelacion || enCheckpoint || completada;
  const imagen = mostrarConsecuencia ? ronda.imagenConsecuencia : ronda.imagenPrevia;
  const uri = useMemo(() => imagenVigente(imagen, catalogo), [catalogo, imagen]);

  const opciones = useMemo(
    () => ordenarOpciones(ronda, partida.intento), [ronda, partida.intento],
  );
  const procesar = useCallback((id: string) => {
    if (!oculto) setPartida((p) => responder(p, rondas[p.indice], id));
  }, [rondas, oculto]);
  const descubrir = useCallback(() => { if (!oculto) setPartida(revelar); }, [oculto]);
  const avanzar = useCallback(() => { if (!oculto) setPartida((p) => continuar(p, rondas)); }, [rondas, oculto]);
  // Opciones de respuesta dentro del pergamino; avance/revelación fuera de él.
  const accionContextual = enResultado
    ? { etiqueta: 'Descubrir qué sucede', onClick: descubrir }
    : enRevelacion
      ? { etiqueta: partida.puntos === 0 ? 'Volver al checkpoint' : ronda.checkpoint ? 'Completar hazaña' : 'Siguiente decisión', onClick: avanzar }
      : enCheckpoint
        ? { etiqueta: partida.checkpoint.indice >= rondas.length ? 'Ver final del capítulo' : 'Continuar aventura', onClick: avanzar }
        : completada
          ? { etiqueta: 'Volver a recorrer el capítulo', onClick: () => setPartida(nuevaPartida(partida.intento + 1, episodioId)) }
          : null;

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Nunca sustituir acción de un botón enfocado ni cerrar los ajustes.
        if (e.defaultPrevented) return;
        onSalir();
      }
    };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [onSalir]);

  if (!cargado) return <main className="an-cargando">Recuperando aventura…</main>;

  return (
    <ContenedorCine estado="pregunta" reducirMovimiento={sinMovimiento} cargar={leerAsset}
      oculto={oculto} onContemplar={setOculto}
      plano={{ uri, alt: imagen.alt, mediaClass: 'RECREACION_IA',
        ladoTexto: encuadreDe(imagen.medioId ?? '').lado_texto,
        regionCritica: encuadreDe(imagen.medioId ?? '').region_critica }}
      cabecera={
      <header className="an-cabecera">
        <div>
          <span className="an-sello-marca">EL QUIJOTE · AVENTURA</span>
          <p>{ficha.etiqueta} · {ronda.tramo}</p>
        </div>
        <div className="an-cabecera-acciones">
          <Puntuacion puntos={partida.puntos} />
          <AjustesBoton ajustes={ajustes} fijarTexto={fijarTexto} fijarMovimiento={fijarMovimiento} />
          <button className="an-menubtn" onClick={onSalir}>Menú</button>
        </div>
      </header>}
      controles={accionContextual ? <ControlesCine derecha={accionContextual} /> : undefined}
      pregunta={<section className="an-panel" aria-live="polite" aria-label="Aventura narrativa">
        {partida.fase === 'pregunta' && (
          <>
            <p className="an-pretitle">Decisión {partida.indice + 1} de {rondas.length}</p>
            <p className="an-contexto">{ronda.contexto}</p>
            <h1 className="an-pregunta"><span>{ronda.personaje}</span>{ronda.pregunta}</h1>
            <div className="an-respuestas" role="group" aria-label="Elige la continuación">
              {opciones.map((o, i) => (
                <button key={o.id} onClick={() => procesar(o.id)} className="an-opcion">
                  <span aria-hidden="true">{i + 1}</span>{o.texto}
                </button>
              ))}
            </div>
            <p className="an-pie-panel">Observa, deduce y elige. La historia de Cervantes no cambia.</p>
          </>
        )}
        {enResultado && (
          <>
            <p className="an-pretitle">Tu decisión</p>
            <h1>{partida.aciertoActual ? '¡Has acertado!' : 'Esta vez no has acertado'}</h1>
            <p className="an-variacion">{partida.aciertoActual ? '+1 punto' : '−1 punto'}</p>
            <p className="an-contexto">
              {partida.puntos === 0
                ? 'Te has quedado sin puntos. Descubre primero qué sucedió.'
                : 'La escena siguiente mostrará lo que ocurrió realmente.'}
            </p>
          </>
        )}
        {enRevelacion && (
          <>
            <p className="an-pretitle">Lo que sucede en la novela</p>
            <h1 className="an-revelacion-titulo">{ronda.personaje}</h1>
            <p className="an-consecuencia">{ronda.consecuencia}</p>
            <p className="an-explicacion">{ronda.explicacion}</p>
            <p className="an-fuente">
              {ronda.pasajeId
                ? `Referencia: ${ronda.pasajeId} · edición del proyecto`
                : `Referencia: ${ficha.etiqueta} · DQ.SRC.0005`}
            </p>
          </>
        )}
        {enCheckpoint && (
          <div className="an-ceremonia" role="status">
            <div className="an-filigranas" aria-hidden="true">✥ ✦ ❧ ✦ ✥</div>
            <span className="an-lacre" aria-hidden="true">✠</span>
            <p className="an-pretitle">Checkpoint alcanzado</p>
            <h1>¡Hazaña superada!</h1>
            <p className="an-hito">{ronda.checkpoint?.titulo}</p>
            {ronda.checkpoint?.mayor && <p className="an-insignia">♜ Insignia de caballería</p>}
            <p>+1 punto · {estadoGuardado === 'guardado' ? 'partida guardada' : estadoGuardado === 'error' ? 'guardado fallido' : 'guardando partida…'} · {partida.puntos}/{PUNTOS_MAXIMOS} puntos</p>
          </div>
        )}
        {completada && (
          <>
            <p className="an-pretitle">{ficha.etiqueta} · recorrido completado</p>
            <h1>{ficha.cierreAventura.titulo}</h1>
            <p className="an-contexto">{ficha.cierreAventura.texto}</p>
            <p className="an-consecuencia">Aciertos: {partida.aciertos} · Errores: {partida.errores} · Puntos: {partida.puntos}/{PUNTOS_MAXIMOS}</p>
          </>
        )}
        {errorGuardado && <p className="an-error" role="alert">{errorGuardado}</p>}
      </section>}
    />
  );
}
