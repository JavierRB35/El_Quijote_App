// Registro de capítulos autorizado para la fase actual. Las pantallas NO
// dependen de un capítulo concreto: solo consumen fichas y contenidos JSON.
import fichasJSON from '../../../content/capitulos/registro.json' with { type: 'json' };
import manifestJSON from '../../../assets/scenes/manifest.json' with { type: 'json' };
import { Catalogo, type Beat, type Escena, type MediaAsset } from '../contrato.ts';
import type { RondaNarrativa } from '../aventura/motorNarrativo.ts';

export interface FichaCapitulo {
  capituloId: string;
  episodioId: string;
  etiqueta: string;
  titulo: string;
  resumen: string;
  descripcionHistoria: string;
  descripcionAventura: string;
  cierreAventura: { titulo: string; texto: string };
  cierreHistoria: { titulo: string; texto: string };
}

interface CatalogoAventura {
  schema_version: string;
  capituloId: string;
  episodioId: string;
  estado_editorial: string;
  revision_visual: string;
  rondas: RondaNarrativa[];
}
interface IntervencionHistoria {
  id: string;
  hablante: string;
  tipo_texto: 'CITA_LITERAL' | 'ADAPTACION_FIEL' | 'NARRACION_ENLACE';
  texto_visible: string;
  localizador: string;
  imagen: string; // id del manifiesto, NO MediaAsset canónico ficticio
}
interface CatalogoHistoria {
  schema_version: string;
  capituloId: string;
  episodioId: string;
  estado_editorial: string;
  revision_visual: string;
  escenas: { id: string; titulo: string; intervenciones: IntervencionHistoria[] }[];
}

const aventuras = import.meta.glob('../../../content/aventura/parte_*/capitulo_*.json', {
  eager: true, import: 'default',
}) as Record<string, CatalogoAventura>;
const historias = import.meta.glob('../../../content/historia/parte_*/capitulo_*.json', {
  eager: true, import: 'default',
}) as Record<string, CatalogoHistoria>;

const activable = (estado: string) => estado === 'aprobado' || estado === 'piloto_integrado';

export const CAPITULOS: FichaCapitulo[] = fichasJSON.capitulos;
const indiceAventura = new Map(Object.values(aventuras).map((a) => [a.capituloId, a]));
const indiceHistoria = new Map(Object.values(historias).map((h) => [h.capituloId, h]));

export function rondasDeCapitulo(ficha: FichaCapitulo): RondaNarrativa[] {
  const datos = indiceAventura.get(ficha.capituloId);
  if (!datos || !activable(datos.estado_editorial) || datos.episodioId !== ficha.episodioId || datos.rondas.length === 0) {
    throw new Error('Capítulo de Aventura sin catálogo activable: ' + ficha.capituloId);
  }
  return datos.rondas;
}

/** Solo los medios VISUALES aprobados expresamente aparecen en la vista.
 *  Los IDs 'scene:...' son identificadores locales del resolvedor, NO fichas
 *  DQ.MA.* ni nuevos registros editoriales del paquete piloto. */
export function catalogoConHistoria(base: Catalogo): Catalogo {
  const escenaPorId = new Map(manifestJSON.images.map((a) => [a.id, a]));
  const medios: Record<string, MediaAsset> = {};
  const escenas: Record<string, Escena> = {};
  const beats: Record<string, Beat> = {};
  let contador = 0;
  for (const ficha of CAPITULOS) {
    const datos = indiceHistoria.get(ficha.capituloId);
    if (!datos) continue; // I.8 usa las escenas del paquete canónico de siempre
    if (!activable(datos.estado_editorial) || datos.episodioId !== ficha.episodioId) continue;
    for (const [escenaIndice, e] of datos.escenas.entries()) {
      const sceneId = `${ficha.episodioId}.S${String(escenaIndice + 1).padStart(2, '0')}`;
      const idsImagen: string[] = [];
      for (const intervencion of e.intervenciones) {
        const a = escenaPorId.get(intervencion.imagen);
        if (!a || a.review_state !== 'aprobada' ||
            a.part !== Number(ficha.capituloId.slice(4, 5)) ||
            a.chapter !== Number(ficha.capituloId.slice(7))) {
          throw new Error('La escena no está aprobada/catalogada en el manifiesto: ' + intervencion.imagen);
        }
        const identificador = 'scene:' + a.id;
        idsImagen.push(identificador);
        if (!medios[identificador]) {
          medios[identificador] = {
            id: identificador,
            function: a.phase === 'post' ? 'post_desenlace' : 'pre_pregunta',
            media_class: 'RECREACION_IA',
            logical_uri: 'assets://' + a.relative_path.replace(/^assets\//, ''),
            alt: a.alt_es || e.titulo,
            spoiler_level: a.phase === 'post' ? 'revelador' : 'ninguno',
          };
        }
        contador++;
        const numero = String(920000 + contador).padStart(6, '0');
        const id = 'DQ.BEAT.' + numero;
        const esPersonaje = intervencion.hablante !== 'Narrador';
        beats[id] = {
          id, contract_version: '1.2.0', scene_id: sceneId,
          order: e.intervenciones.indexOf(intervencion) + 1,
          kind: esPersonaje ? 'DIALOGO' : 'NARRACION',
          utterances: [{
            utterance_id: 'DQ.INT.' + numero,
            speaker: esPersonaje
              ? { tipo: 'personaje', person_id: 'DQ.PER.0001', label: intervencion.hablante }
              : { tipo: 'narrador' },
            texto_visible: intervencion.texto_visible,
            text_kind: intervencion.tipo_texto,
            localizador: intervencion.localizador,
            audio_asset_id: null,
          }],
          visual_asset_ids: [identificador],
          manual_advance_allowed: true,
          replay_allowed: true,
          reduced_motion_fallback: true,
        };
      }
      const escena: Escena = {
        id: sceneId, contract_version: '1.2.0', episode_id: ficha.episodioId,
        phase: 'before',
        // Solo el primer plano es fallback de escena: los planos 'post'
        // entran exclusivamente por su beat, nunca antes de la revelación.
        media_ids: idsImagen.length ? [idsImagen[0]] : [],
        accessibility: { reduced_motion_fallback: 'imagen_estatica', alt: e.titulo },
      };
      escenas[sceneId] = escena;
    }
  }
  return base.anexarCategorias({ scenes: escenas, beats, media_assets: medios });
}
