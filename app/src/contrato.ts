// Tipos del contrato editorial-técnico v1.0.0 (subconjunto consumido por el
// sistema vertical). Espejo de /schemas — la fuente de verdad es el esquema,
// no este fichero (contrato §11: la UI nunca hardcodea contenido).

export type TipoPregunta =
  | 'single_choice'
  | 'multi_choice'
  | 'true_false'
  | 'ordering'
  | 'matching'
  | 'hotspot';

export interface Opcion {
  id: string;
  label: string;
  explanation?: string;
}

export interface Interaccion {
  type: TipoPregunta;
  options: Opcion[];
  correct_option_ids?: string[];
  correct_order?: string[];
  pairs?: { left: string; right: string }[];
  hotspot_area?: { x: number; y: number; w: number; h: number };
  multi_declared?: boolean;
  shuffle_options?: boolean;
}

export interface EvidenceItem {
  kind: string;
  passage_id?: string;
  quote?: string;
  source_id?: string;
  locator?: string;
  note?: string;
}

export interface RequisitosVisuales {
  pre_image_media_id?: string;
  hotspot_media_id?: string;
  pre_image_must_not_reveal: boolean;
}

export interface Pregunta {
  id: string;
  contract_version: string;
  episode_id: string;
  chapter_ids: string[];
  passage_ids?: string[];
  scene_id?: string;
  prompt: string;
  interaction: Interaccion;
  rationale: string;
  rationale_extended?: string;
  evidence: EvidenceItem[];
  cognitive_type: string;
  difficulty: number;
  language: string;
  tags: string[];
  visual_requirements?: RequisitosVisuales;
}

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

export interface Paquete {
  package_id: string;
  contract_version: string;
  catalog_version?: string;
  categorias: Record<string, Record<string, unknown>>;
  counts: Record<string, number>;
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

  preguntasDeEpisodio(episodeId: string): Pregunta[] {
    return Object.values(this.categoria<Pregunta>('questions'))
      .filter((q) => q.episode_id === episodeId)
      .sort((a, b) => a.id.localeCompare(b.id));
  }

  medio(id: string): MediaAsset | undefined {
    return this.categoria<MediaAsset>('media_assets')[id];
  }

  descubrimientosDeEpisodio(episodeId: string): Discovery[] {
    return Object.values(this.categoria<Discovery>('discoveries')).filter(
      (d) => d.appearance.episode_id === episodeId,
    );
  }

  pasaje(id: string): Passage | undefined {
    return this.categoria<Passage>('passages')[id];
  }
}
