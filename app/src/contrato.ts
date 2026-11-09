// Tipos del contrato editorial-técnico v1.2.0 (subconjunto consumido por el
// sistema vertical). Espejo de /schemas — la fuente de verdad es el esquema,
// no este fichero (contrato §11: la UI nunca hardcodea contenido).

export interface MediaAsset {
  id: string;
  function: string;
  media_class: string;
  logical_uri: string;
  alt: string;
  author?: string;
  date?: string;
  spoiler_level: string;
}

export interface Episodio {
  id: string;
  title: string;
  chapters: string[];
  narrative_order: number;
  synopsis: string;
  actors: string[];
  places: string[];
  passages: string[];
  spoiler_flags: { reveals_future_events: boolean; notes?: string };
}

export interface Discovery {
  id: string;
  kind: string;
  content: string;
  speaker?: { person_id?: string; label?: string };
  passages?: string[];
  appearance: { episode_id: string; moment?: string; frequency_hint?: string };
  asset_ids?: string[];
  certainty: string;
}

export interface Passage {
  id: string;
  chapter_id: string;
  anchor: string;
  text_original?: string;
  text_indexable: string;
}

/** v1.x — ficha museística (schemas/content/museum-item.schema.json; el
 *  esquema es la fuente de verdad, este es el subconjunto que consume el
 *  Museo). authorship vacío solo si attribution_status = 'anonima'. */
export interface MuseumItem {
  id: string;
  contract_version: string;
  title: string;
  authorship?: string;
  attribution_status: 'confirmada' | 'atribuida' | 'anonima' | 'debatida';
  date?: string;
  provenance?: string;
  technique?: string;
  owner_entity?: string;
  context: string;
  relation_to_quixote: string;
  chapters: string[];
  media_ids: string[];
  source_id: string;
  license_id: string;
  certainty: string;
  review?: { state: string; reviewer_role?: string | null; date?: string | null };
  notes?: string;
}

/** v1.x — licencia de medios (schemas/media/license.schema.json). */
export interface License {
  id: string;
  title: string;
  holder?: string;
  url?: string;
  attribution_required?: boolean;
  redistribution?: string;
  evidence_documental?: string;
  notes?: string;
}

/** v1.x — fuente documental (schemas/media/source.schema.json). */
export interface Source {
  id: string;
  title?: string;
  url?: string;
  consulted_date?: string;
  [clave: string]: unknown;
}

export interface Paquete {
  package_id: string;
  contract_version: string;
  catalog_version?: string;
  categorias: Record<string, Record<string, unknown>>;
  counts: Record<string, number>;
}

/** v1.1.0 — intervención narrativa (Beat.utterances[]). */
export interface Hablante {
  tipo: 'narrador' | 'personaje';
  person_id?: string;
  label?: string;
}

export interface Intervencion {
  utterance_id: string;
  speaker: Hablante;
  texto_visible: string;
  text_kind: string;
  passage_ids?: string[];
  texto_oral?: string;
  incisos_narrador?: string[];
  audio_asset_id?: string | null;
  localizador?: string;
  nota_editorial?: string;
}

/** v1.1.0 — beat narrativo. v1.2.0: visual_asset_ids admite []. */
export interface Beat {
  id: string;
  contract_version: string;
  scene_id: string;
  unit_ids?: string[];
  order: number;
  kind: 'NARRACION' | 'DIALOGO' | 'ACCION' | 'SILENCIO';
  avance_automatico?: boolean | null;
  lectura_minima_ms?: number;
  utterances: Intervencion[];
  visual_asset_ids: string[];
  manual_advance_allowed: boolean;
  replay_allowed: boolean;
  reduced_motion_fallback: boolean;
  entry_condition?: string;
  exit_condition?: string;
  review?: { state: string; reviewer_role?: string | null; date?: string | null };
}

/** v1.2.0 — escena; media_ids admite [] (escena neutra, fondo editorial). */
export interface Escena {
  id: string;
  contract_version: string;
  episode_id: string;
  phase: string;
  media_ids: string[];
  layers?: { media_id: string; depth: string; parallax?: number }[];
  hotspots?: unknown[];
  subtitles_ref?: string;
  audio_ref?: string;
  entry_transition?: string;
  exit_transition?: string;
  accessibility: { reduced_motion_fallback: string; alt: string };
}

/** Accesores tipados sobre el paquete cargado por el backend. */
export class Catalogo {
  constructor(private readonly paquete: Paquete) {}

  info(): { package_id: string; contract_version: string; catalog_version?: string } {
    return {
      package_id: this.paquete.package_id,
      contract_version: this.paquete.contract_version,
      catalog_version: this.paquete.catalog_version,
    };
  }

  /** Añade escenas/beats del capítulo a la vista en memoria del catálogo.
   *  No modifica ni serializa el paquete canónico ni inventa MediaAsset físicos. */
  anexarCategorias(extra: Record<string, Record<string, unknown>>): Catalogo {
    const categorias = { ...this.paquete.categorias };
    for (const [nombre, registros] of Object.entries(extra)) {
      categorias[nombre] = { ...(categorias[nombre] ?? {}), ...registros };
    }
    const counts = Object.fromEntries(
      Object.entries(categorias).map(([nombre, registros]) => [nombre, Object.keys(registros).length]),
    );
    return new Catalogo({ ...this.paquete, categorias, counts });
  }

  private categoria<T>(nombre: string): Record<string, T> {
    return (this.paquete.categorias[nombre] ?? {}) as Record<string, T>;
  }

  episodios(): Episodio[] {
    return Object.values(this.categoria<Episodio>('episodes')).sort(
      (a, b) => a.narrative_order - b.narrative_order,
    );
  }

  episodio(id: string): Episodio {
    const ep = this.categoria<Episodio>('episodes')[id];
    if (!ep) throw new Error(`episodio inexistente: ${id}`);
    return ep;
  }


  medio(id: string): MediaAsset | undefined {
    return this.categoria<MediaAsset>('media_assets')[id];
  }

  medios(): Record<string, MediaAsset> {
    return this.categoria<MediaAsset>('media_assets');
  }

  /** Fichas museísticas del paquete (DQ.MUS.*), en orden canónico por id. */
  piezasMuseo(): MuseumItem[] {
    return Object.values(this.categoria<MuseumItem>('museum_items')).sort((a, b) =>
      a.id.localeCompare(b.id),
    );
  }

  /** Licencia de medios por id (DQ.LIC.*). */
  licencia(id: string): License | undefined {
    return this.categoria<License>('licenses')[id];
  }

  /** Fuente documental por id (DQ.SRC.*). */
  fuente(id: string): Source | undefined {
    return this.categoria<Source>('sources')[id];
  }

  descubrimientosDeEpisodio(episodeId: string): Discovery[] {
    return Object.values(this.categoria<Discovery>('discoveries')).filter(
      (d) => d.appearance.episode_id === episodeId,
    );
  }

  pasaje(id: string): Passage | undefined {
    return this.categoria<Passage>('passages')[id];
  }

  /** v1.2.0 — escenas de un episodio, en orden canónico por id (S01, S02…). */
  escenasDeEpisodio(episodeId: string): Escena[] {
    return Object.values(this.categoria<Escena>('scenes'))
      .filter((e) => e.episode_id === episodeId)
      .sort((a, b) => a.id.localeCompare(b.id));
  }

  /** v1.1.0 — beats de una escena, ordenados por su campo `order`. */
  beatsDeEscena(sceneId: string): Beat[] {
    return Object.values(this.categoria<Beat>('beats'))
      .filter((b) => b.scene_id === sceneId)
      .sort((a, b) => a.order - b.order);
  }
}
