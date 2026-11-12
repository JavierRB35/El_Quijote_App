// Reproductor genérico: contenidos y guardados conservan sus contratos.
// DC-37: lienzo compartido, asociación actual sin herencia implícita,
// contemplación pausada y respaldo de lectura identificado como pendiente.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Catalogo, type Beat, type Escena } from '../contrato';
import { leerAsset } from '../entorno';
import ContenedorCine, { type PlanoCine } from '../cine/ContenedorCine';
import ControlesCine from '../cine/ControlesCine';
import { encuadreDe } from '../cine/resolverPlano';
import { AjustesBoton, movimientoReducido, useAjustes } from '../cine/ajustes';
import PanelDescubrir from '../cine/PanelDescubrir';
import { textoParaPantalla } from '../presentacion';
import { cargarProgresoDeEpisodio, guardarProgresoDeEpisodio } from './persistencia';
import type { FichaCapitulo } from '../capitulos/registro';
import {
  etiquetaHablante,
  estructuraHistoria,
  inicioDeBeat,
  lecturaMinimaMs,
  planoDePosicion,
  progresoDesde,
  restaurarPosicion,
  type ItemLectura,
} from './logica';

interface Props {
  catalogo: Catalogo;
  onSalir: () => void;
  ficha: FichaCapitulo;
}

/** Estructura de lectura del episodio a partir del catálogo (data-driven). */
function construirEstructura(catalogo: Catalogo, ficha: FichaCapitulo): {
  titulo: string;
  items: ItemLectura[];
} {
  const episodioId = ficha.episodioId;
  // Los capítulos declarativos no requieren una ficha duplicada en el paquete I.8.
  const titulo = catalogo.episodios().find(e => e.id === episodioId)?.title ?? ficha.titulo;
  const escenas: Escena[] = catalogo.escenasDeEpisodio(episodioId);
  const beatsPorEscena: Beat[][] = escenas.map((e) => catalogo.beatsDeEscena(e.id));
  return { titulo, items: estructuraHistoria(escenas, beatsPorEscena) };
}

export default function ReproductorHistoria({ catalogo, onSalir, ficha }: Props) {
  const episodioId = ficha.episodioId;
  const { titulo, items } = useMemo(() => construirEstructura(catalogo, ficha), [catalogo, ficha]);
  const medios = useMemo(() => catalogo.medios(), [catalogo]);
  const descubrimientos = useMemo(
    () => catalogo.descubrimientosDeEpisodio(episodioId),
    [catalogo, episodioId],
  );

  // Ajustes de presentación (texto/movimiento) con persistencia propia.
  const { ajustes, fijarTexto, fijarMovimiento } = useAjustes();
  const reducirMovimiento = movimientoReducido(ajustes.movimiento);

  // La posición se decide tras intentar recuperar el guardado (sin destello).
  const [posicion, setPosicion] = useState<number | null>(null);
  const [autoAvance, setAutoAvance] = useState(true); // cinematográfico (DC-21)
  const [enPausa, setEnPausa] = useState(false);
  const [ciclo, setCiclo] = useState(0); // re-arma la lectura (Repetir)
  const [avisoGuardado, setAvisoGuardado] = useState('');
  const [oculto, setOculto] = useState(false);
  const [composicionLegible, setComposicionLegible] = useState(true);
  const contemplar = useCallback((valor: boolean) => {
    setOculto(valor);
    if (valor) setEnPausa(true); // Mostrar nunca reanuda por sorpresa.
  }, []);
  const [descubrirAbierto, setDescubrirAbierto] = useState(false);
  const [mostrarCierre, setMostrarCierre] = useState(false);

  const siguienteExiste = posicion !== null && posicion + 1 < items.length;

  // ---- recuperación de la lectura (persistencia independiente de Aventura)
  useEffect(() => {
    if (!items.length) return;
    cargarProgresoDeEpisodio('historia', episodioId)
      .then((crudo) => {
        if (crudo) {
          const restaurada = restaurarPosicion(items, episodioId, crudo);
          if (restaurada) {
            setPosicion(restaurada.posicion);
            if (restaurada.auto !== null) setAutoAvance(restaurada.auto);
            setAvisoGuardado('lectura recuperada');
            return;
          }
        }
        setPosicion(0); // inicio en I01
      })
      .catch(() => setPosicion(0));
  }, [items, episodioId]);

  const avanzar = useCallback(() => {
    if (!oculto && posicion === items.length - 1) { setMostrarCierre(true); setEnPausa(true); return; }
    if (!oculto) setPosicion((p) => (p !== null && p + 1 < items.length ? p + 1 : p));
  }, [items.length, oculto, posicion]);

  const retroceder = useCallback(() => {
    if (mostrarCierre && !oculto) { setMostrarCierre(false); return; }
    if (!oculto) setPosicion((p) => (p !== null && p > 0 ? p - 1 : p));
  }, [oculto, mostrarCierre]);

  const repetirBeat = useCallback(() => {
    if (oculto) return;
    setMostrarCierre(false);
    setPosicion((p) => (p !== null ? inicioDeBeat(items, p) : p));
    setCiclo((c) => c + 1);
  }, [items, oculto]);

  const repetirIntervencion = useCallback(() => { if (!oculto) { setMostrarCierre(false); setCiclo((c) => c + 1); } }, [oculto]);

  const alternarAuto = useCallback(() => setAutoAvance((a) => !a), []);

  const cerrarDescubrir = useCallback(() => setDescubrirAbierto(false), []);

  // ---- autoguardado de la posición y la preferencia (progreso_historia)
  useEffect(() => {
    if (posicion === null) return;
    const datos = JSON.stringify(progresoDesde(items, posicion, episodioId, autoAvance));
    guardarProgresoDeEpisodio('historia', episodioId, datos)
      .then(() => setAvisoGuardado(`guardado ${new Date().toLocaleTimeString()}`))
      .catch((e) => setAvisoGuardado(`fallo de guardado: ${e}`));
  }, [posicion, autoAvance, items, episodioId]);

  // ---- temporizador de autoavance con lectura mínima y pausa que congela
  // el tiempo restante (COMPONENTES_NARRATIVOS_UX §2.3; sin audio, el suelo
  // de lectura garantizado aplica siempre).
  const venceRef = useRef<number | null>(null);
  const restanteRef = useRef<number | null>(null);
  const claveRef = useRef('');

  useEffect(() => {
    if (posicion === null) return;
    const clave = `${posicion}|${ciclo}`;
    if (claveRef.current !== clave) {
      restanteRef.current = null; // nuevo paso o repetición: lectura completa
      claveRef.current = clave;
    }
    if (!autoAvance || enPausa || oculto || !composicionLegible || descubrirAbierto || !siguienteExiste) return;
    const item = items[posicion];
    const ms = restanteRef.current ?? lecturaMinimaMs(item.intervencion.texto_visible, item.beat.lectura_minima_ms);
    const vence = performance.now() + ms;
    venceRef.current = vence;
    const id = setTimeout(avanzar, ms);
    return () => {
      clearTimeout(id);
      restanteRef.current = Math.max(0, vence - performance.now());
    };
  }, [posicion, ciclo, autoAvance, enPausa, siguienteExiste, items, avanzar, oculto, composicionLegible, descubrirAbierto]);

  // ---- teclado: salto manual ←/→, pausa Espacio/P, repetir R, beat B,
  // auto A, salir Esc (los controles existen también como botones). Si el
  // panel de descubrimientos está abierto, Esc lo cierra primero y no sale.
  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
      if (e.defaultPrevented || (oculto && e.key !== 'Escape')) return;
      const destino = e.target as HTMLElement | null;
      if (destino?.closest('input, select, textarea, dialog, [role="dialog"]')) return;
      const esBoton = destino?.tagName === 'BUTTON';
      switch (e.key) {
        case 'ArrowRight':
        case 'Enter':
          if (!esBoton) { avanzar(); e.preventDefault(); }
          break;
        case 'ArrowLeft':
          if (!esBoton) { retroceder(); e.preventDefault(); }
          break;
        case ' ':
        case 'p':
        case 'P':
          if (!(esBoton && e.key === ' ')) { setEnPausa((v) => !v); e.preventDefault(); }
          break;
        case 'r':
        case 'R':
          repetirIntervencion();
          break;
        case 'b':
        case 'B':
          repetirBeat();
          break;
        case 'a':
        case 'A':
          alternarAuto();
          break;
        case 'Escape':
          if (descubrirAbierto) {
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
  }, [avanzar, retroceder, repetirIntervencion, repetirBeat, alternarAuto, onSalir, descubrirAbierto, oculto]);

  // ---- plano visible: resolución determinista por posición (R-V4/R-V10)
  const resolucion = useMemo(
    () => (posicion === null ? null : planoDePosicion(items, posicion, medios)),
    [items, posicion, medios],
  );
  const activo = resolucion?.activo ?? null;
  const plano: PlanoCine = {
    uri: activo?.logical_uri ?? null,
    alt: activo?.alt ?? '',
    autor: activo?.author,
    mediaClass: activo?.media_class,
    ladoTexto: encuadreDe(activo?.id ?? '').lado_texto,
    regionCritica: encuadreDe(activo?.id ?? '').region_critica,
  };

  if (posicion === null) {
    return (
      <main className="historia">
        <p className="historia-estado">Abriendo el libro…</p>
      </main>
    );
  }

  const item = items[posicion];
  const beat = item.beat;
  const intervencion = item.intervencion;
  const intervencionesTotales = items.length;
  const esInicioBeat = inicioDeBeat(items, posicion) === posicion;
  const fin = !siguienteExiste;

  const cabecera = (
    <header className="cabecera">
      <p className="kicker">{ficha.etiqueta} · Modo Historia · Escena {item.escenaIdx + 1}</p>
      <h1>{titulo}</h1>
      <div className="cabecera-linea">
        <span className="progreso-texto">
          Intervención {posicion + 1} de {intervencionesTotales}
        </span>
        <div className="progreso-barra" role="presentation">
          <div
            className="progreso-relleno"
            style={{ width: `${((posicion + 1) / intervencionesTotales) * 100}%` }}
          />
        </div>
        {!activo && <span className="rotulo rotulo-neutro">imagen pendiente</span>}
        {avisoGuardado && <span className="guardado">{avisoGuardado}</span>}
        <span className="cabecera-acciones">
          <AjustesBoton ajustes={ajustes} fijarTexto={fijarTexto} fijarMovimiento={fijarMovimiento}
            accionesAdicionales={<div role="group" aria-label="Opciones de narración">
              <button type="button" onClick={repetirIntervencion}>Repetir intervención (R)</button>
              <button type="button" onClick={repetirBeat}>Repetir beat (B)</button>
              <button type="button" onClick={alternarAuto} aria-pressed={autoAvance}>
                Autoavance: {autoAvance ? 'sí' : 'no'} (A)
              </button>
            </div>} />
          <PanelDescubrir
            abierto={descubrirAbierto}
            alternar={() => setDescubrirAbierto((v) => !v)}
            onCerrar={cerrarDescubrir}
            descubrimientos={descubrimientos}
            nombreEpisodio={titulo}
          />
          <button className="control control-estado" onClick={onSalir} aria-label="Volver al menú (escape)">
            Menú
          </button>
        </span>
      </div>
    </header>
  );

  return (
    <ContenedorCine
      plano={plano}
      oculto={oculto}
      onContemplar={contemplar}
      onComposicion={setComposicionLegible}
      estado="narracion"
      reducirMovimiento={reducirMovimiento}
      cargar={leerAsset}
      cabecera={cabecera}
      controlesEnContemplacion
      controles={<ControlesCine
        key={oculto ? 'contemplacion' : 'narracion'}
        izquierda={{ etiqueta: 'Atrás (flecha izquierda)', onClick: retroceder,
          deshabilitada: oculto || (posicion === 0 && !mostrarCierre) }}
        centro={oculto ? undefined : { etiqueta: enPausa ? 'Continuar (espacio)' : 'Pausa (espacio)',
          onClick: () => setEnPausa(v => !v), pulsada: enPausa }}
        derecha={{ etiqueta: fin ? 'Ver cierre del episodio' : 'Siguiente intervención (enter)',
          onClick: avanzar, deshabilitada: oculto || mostrarCierre }}
      />}
      texto={
        <>
          {!mostrarCierre && <section
            className="lectura"
            aria-live="polite"
          >
            <p className={`hablante hablante-${intervencion.speaker.tipo}`}>
              {etiquetaHablante(intervencion)}
            </p>
            <p className="beat-info sr-only">
              {beat.kind} · beat {beat.order} · paso {item.intervencionIdx + 1} de {beat.utterances.length}
              {esInicioBeat ? ' · inicio del beat' : ''}
            </p>
            <p className="texto">{textoParaPantalla(intervencion.texto_visible)}</p>
            {/* El alt de la escena describe el fallback neutro: solo aplica
                cuando no hay plano elegible visible. */}
            {!activo && item.escena.accessibility?.alt && (
              <p className="escena-alt sr-only">{item.escena.accessibility.alt}</p>
            )}
          </section>}

          {fin && mostrarCierre && (
            <section className="cierre" aria-live="polite">
              <p className="cierre-titulo">{ficha.cierreHistoria.titulo}</p>
              <p className="cierre-texto">{ficha.cierreHistoria.texto}</p>
              <button
                className="primario"
                onClick={() => { setMostrarCierre(false); setPosicion(0); setCiclo((c) => c + 1); }}
              >
                Volver a recorrer el episodio
              </button>
            </section>
          )}
        </>
      }
    />
  );
}
