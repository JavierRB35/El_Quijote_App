// Nuevo Modo Aventura: anticipar el siguiente acto, nunca alterar el canon.
// Estado puro en motorNarrativo; el antiguo catálogo de preguntas sigue intacto.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Catalogo } from '../contrato';
import { leerAsset } from '../entorno';
import { cargarProgreso, guardarProgreso } from '../historia/persistencia';
import { AjustesBoton, movimientoReducido, useAjustes } from '../cine/ajustes';
import {
  EPISODIO_AVENTURA,
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
import { RONDAS_AVENTURA } from './guionNarrativo';
import './aventuraNarrativa.css';

interface Props {
  catalogo: Catalogo;
  onSalir: () => void;
}

function imagenVigente(imagen: ImagenNarrativa, catalogo: Catalogo): string {
  // Un medio registrado manda sobre la URI editorial. Las ilustraciones de
  // Historia sin MediaAsset conservan su URI física actual sin inventar IDs.
  return (imagen.medioId && catalogo.medio(imagen.medioId)?.logical_uri) || imagen.uri;
}

function useImagen(uri: string) {
  const [carga, setCarga] = useState<{ uri: string; src: string | null; error: boolean }>({
    uri: '', src: null, error: false,
  });
  useEffect(() => {
    let vigente = true;
    let blob: string | null = null;
    leerAsset(uri).then((src) => {
      blob = src;
      if (vigente) setCarga({ uri, src, error: false });
      else if (src.startsWith('blob:')) URL.revokeObjectURL(src);
    }).catch(() => {
      if (vigente) setCarga({ uri, src: null, error: true });
    });
    return () => {
      vigente = false;
      if (blob?.startsWith('blob:')) URL.revokeObjectURL(blob);
    };
  }, [uri]);
  return carga.uri === uri ? carga : { uri, src: null, error: false };
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

export default function AventuraNarrativa({ catalogo, onSalir }: Props) {
  const [partida, setPartida] = useState<Partida>(() => nuevaPartida());
  const [cargado, setCargado] = useState(false);
  const [errorGuardado, setErrorGuardado] = useState('');
  const [estadoGuardado, setEstadoGuardado] = useState<'pendiente' | 'guardado' | 'error'>('pendiente');
  const progresoAnterior = useRef<string | null>(null);
  const colaGuardado = useRef<Promise<void>>(Promise.resolve());
  const revisionGuardado = useRef(0);
  const { ajustes, fijarTexto, fijarMovimiento } = useAjustes();
  const sinMovimiento = movimientoReducido(ajustes.movimiento);
  const [omitirContexto, setOmitirContexto] = useState(false);

  useEffect(() => {
    let vivo = true;
    cargarProgreso()
      .then((raw) => {
        if (!vivo) return;
        const restaurada = restaurarPartida(raw, RONDAS_AVENTURA);
        if (restaurada) {
          setPartida(restaurada);
          // Conservar también el archivo v1 encapsulado en futuras sesiones.
          const documento = JSON.parse(raw ?? '{}') as { progreso_preguntas_v1?: unknown };
          if (typeof documento.progreso_preguntas_v1 === 'string') {
            progresoAnterior.current = documento.progreso_preguntas_v1;
          }
        } else if (raw) {
          progresoAnterior.current = raw; // conserva el guardado v1
        }
      })
      .catch((error: unknown) => { if (vivo) setErrorGuardado(String(error)); })
      .finally(() => { if (vivo) setCargado(true); });
    return () => { vivo = false; };
  }, []);

  // El progreso antiguo queda archivado dentro del nuevo guardado; los puntos
  // no se infieren de preguntas de conocimiento sin equivalencia narrativa.
  useEffect(() => {
    if (!cargado) return;
    const datos = JSON.stringify({
      version: VERSION_PARTIDA,
      episodio: EPISODIO_AVENTURA,
      partida,
      ...(progresoAnterior.current ? { progreso_preguntas_v1: progresoAnterior.current } : {}),
    });
    const revision = ++revisionGuardado.current;
    setEstadoGuardado('pendiente');
    colaGuardado.current = colaGuardado.current.catch(() => undefined)
      .then(() => guardarProgreso(datos))
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
  }, [partida, cargado]);

  const ronda = RONDAS_AVENTURA[Math.min(partida.indice, RONDAS_AVENTURA.length - 1)];
  const enResultado = partida.fase === 'resultado';
  const enRevelacion = partida.fase === 'revelacion';
  const enCheckpoint = partida.fase === 'checkpoint';
  const completada = partida.fase === 'completada';
  const mostrarConsecuencia = enRevelacion || enCheckpoint || completada;
  const imagen = mostrarConsecuencia ? ronda.imagenConsecuencia : ronda.imagenPrevia;
  const uri = useMemo(() => imagenVigente(imagen, catalogo), [catalogo, imagen]);
  const carga = useImagen(uri);
  const opciones = useMemo(
    () => ordenarOpciones(ronda, partida.intento), [ronda, partida.intento],
  );
  const contextoConocido = partida.intento > 0 && partida.vistas.includes(ronda.id);
  const mostrarContexto = !(contextoConocido && omitirContexto);

  useEffect(() => { setOmitirContexto(partida.intento > 0); }, [partida.indice, partida.intento]);

  const procesar = useCallback((id: string) => {
    setPartida((p) => responder(p, RONDAS_AVENTURA[p.indice], id));
  }, []);
  const descubrir = useCallback(() => setPartida(revelar), []);
  const avanzar = useCallback(() => setPartida((p) => continuar(p, RONDAS_AVENTURA)), []);

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
    <main className={`aventura-n2 ${sinMovimiento ? 'sin-movimiento' : ''}`}>
      <div className="an-fondo" aria-hidden="true">
        {carga.src && <img src={carga.src} alt="" />}
      </div>
      <div className="an-obra">
        {carga.src
          ? <img src={carga.src} alt={imagen.alt} />
          : <div className="an-vacia" role="status">
              {carga.error ? 'La imagen no está disponible; la aventura continúa.' : 'Abriendo la escena…'}
            </div>}
      </div>
      <header className="an-cabecera">
        <div>
          <span className="an-sello-marca">EL QUIJOTE · AVENTURA</span>
          <p>Parte I · Capítulo VIII · {ronda.tramo}</p>
        </div>
        <div className="an-cabecera-acciones">
          <Puntuacion puntos={partida.puntos} />
          <AjustesBoton ajustes={ajustes} fijarTexto={fijarTexto} fijarMovimiento={fijarMovimiento} />
          <button className="an-menubtn" onClick={onSalir}>Menú</button>
        </div>
      </header>
      <section className="an-panel" aria-live="polite" aria-label="Aventura narrativa">
        {partida.fase === 'pregunta' && (
          <>
            <p className="an-pretitle">Decisión {partida.indice + 1} de {RONDAS_AVENTURA.length}</p>
            {mostrarContexto && <p className="an-contexto">{ronda.contexto}</p>}
            {contextoConocido && (
              <button className="an-texto-omitido" onClick={() => setOmitirContexto((v) => !v)}>
                {mostrarContexto ? 'Omitir contexto ya leído' : 'Recordar el contexto'}
              </button>
            )}
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
            <button className="an-primario" onClick={descubrir}>Descubrir qué sucede</button>
          </>
        )}
        {enRevelacion && (
          <>
            <p className="an-pretitle">Lo que sucede en la novela</p>
            <h1 className="an-revelacion-titulo">{ronda.personaje}</h1>
            <p className="an-consecuencia">{ronda.consecuencia}</p>
            <p className="an-explicacion">{ronda.explicacion}</p>
            <p className="an-fuente">Referencia: {ronda.pasajeId} · edición del proyecto</p>
            <button className="an-primario" onClick={avanzar}>
              {partida.puntos === 0 ? 'Volver al checkpoint' : ronda.checkpoint ? 'Completar hazaña' : 'Siguiente decisión'}
            </button>
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
            <button className="an-primario" onClick={avanzar}>
              {partida.checkpoint.indice >= RONDAS_AVENTURA.length ? 'Ver final del capítulo' : 'Continuar aventura'}
            </button>
          </div>
        )}
        {completada && (
          <>
            <p className="an-pretitle">Capítulo VIII · recorrido completado</p>
            <h1>El camino continúa</h1>
            <p className="an-contexto">El duelo con el vizcaíno queda suspendido. Descubrirás su desenlace en el capítulo siguiente.</p>
            <p className="an-consecuencia">Aciertos: {partida.aciertos} · Errores: {partida.errores} · Puntos: {partida.puntos}/{PUNTOS_MAXIMOS}</p>
            <button className="an-primario" onClick={() => setPartida(nuevaPartida(partida.intento + 1))}>
              Volver a recorrer el capítulo
            </button>
            <button className="an-menubtn" onClick={onSalir}>Volver al menú</button>
          </>
        )}
        {errorGuardado && <p className="an-error" role="alert">{errorGuardado}</p>}
      </section>
      <footer className="an-credito">Recreación artística del proyecto · no es evidencia histórica</footer>
    </main>
  );
}
