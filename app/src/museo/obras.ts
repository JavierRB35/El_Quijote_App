// Adaptador del Museo hacia el manifiesto existente de las ilustraciones
// Tusell y el paquete editorial del piloto (issue #73 §7: «sin duplicar
// catálogos»; docs/MUSEO_REFERENCIA_VISUAL_APROBADA.md §4: una sola pantalla
// configurada desde el manifiesto y las fichas, no un componente por obra).
//
// Reglas editoriales que este adaptador hace cumplir:
//  - El orden de la galería es el ORDEN DE LECTURA del EPUB
//    (referencias[].orden_lectura), nunca el número de fichero.
//  - El capítulo se deriva del campo documental doc_capitulo (etiqueta
//    «Capítulo <romano>»); parte y capítulo viajan PAREJOS por referencia.
//  - Las 7 fichas DQ.MUS.0001–0007 del paquete piloto (VÁLIDAS según el
//    validador canónico) MANDAN sobre la proyección del manifiesto cuando la
//    obra coincide: aportan título editorial, explicación (context),
//    técnica y procedencia verificadas. No se crean MediaAssets ni se
//    editan DQ.IL.* ni sus hashes.
//  - «Texto original»: solo con ancla documentada. Los vínculos
//    obra→pasaje proceden de docs/data/propuesta_vinculos_culturales_visuales.csv
//    (columna pasaje_id_verificado, estado PILOTO_DOCUMENTADO_REVISION_VISUAL_PENDIENTE)
//    y el texto se muestra tal cual del pasaje cotejado del paquete
//    (content/piloto/passages, edición de referencia PG #2000). Prohibido
//    inventar comillas: sin vínculo, el bloque no se muestra.
//  - Título honesto: ficha DQ.MUS > colección inicial (issue #73) > alt del
//    manifiesto. Nunca se afirman hechos más allá del dato documental.
//  - Derechos: uso interno en desarrollo mientras
//    DQ.LIC.0001.redistribution = 'condicionada'; sin autorización de
//    publicación ni comercialización.
// El manifiesto (415 imágenes) se importa DINÁMICAMENTE: viaja en su propio
// chunk y solo se descarga al abrir el Museo.
import type { Catalogo, MuseumItem, Passage } from '../contrato';

type Manifiesto = {
  fuente: Record<string, string>;
  documentos: Record<string, unknown>;
  imagenes: ImagenManifest[];
};

export interface ReferenciaManifest {
  orden_lectura: number;
  doc: string;
  alt: string;
  doc_clase: string;
  doc_parte: string;
  doc_capitulo: string;
}

export interface ImagenManifest {
  archivo: string;
  clase: string;
  formato: string;
  ancho: number;
  alto: number;
  bytes: number;
  sha256: string;
  referencias: ReferenciaManifest[];
  n_referencias: number;
  id: string;
  duplicado_de: string[];
}

/** Referencia documental proyectada, apta para el filtrado verificable:
 *  parte y capítulo van PAREJOS por referencia (la Parte II tiene su propio
 *  «Capítulo VIII»: la etiqueta sola es ambigua entre partes). */
export interface ReferenciaObra {
  parte: string | null;
  capitulo: string | null;
  ordenLectura: number;
}

/** Ficha editorial del piloto asociada a la obra (si existe). */
export interface FichaMuseo {
  id: string; // DQ.MUS.*
  titulo: string;
  autor: string;
  fecha: string;
  tecnica: string;
  procedencia: string;
  explicacion: string; // campo context de la ficha
  relacion: string; // relación documentada con el Quijote
  certeza: string;
  mediaId: string; // DQ.MA.* de la ficha
  licenciaId: string; // DQ.LIC.* de la ficha
  fuenteId: string; // DQ.SRC.* de la ficha
  spoilerLevel: string | null; // del MediaAsset, si consta
}

/** Obra lista para el runtime (proyección del manifiesto + ficha si la hay). */
export interface Obra {
  id: string; // DQ.IL.*
  archivo: string;
  uri: string; // URI lógica del contrato: assets://ilustraciones_tusell/acuarelas/<archivo>
  ancho: number;
  alto: number;
  sha256: string;
  alt: string; // texto alternativo derivado del manifiesto
  parte: string | null; // de la referencia principal (orden de lectura)
  capitulos: string[]; // etiquetas «Capítulo <romano>» para mostrar
  referencias: ReferenciaObra[]; // filtrado verificable parte+capítulo
  ordenLectura: number;
  esColeccionInicial: boolean;
  ficha: FichaMuseo | null; // ficha DQ.MUS del piloto cuando coincide
  pasajeId: string | null; // ancla literaria documentada (o null)
}

const ETIQUETA_CAPITULO =
  /^(Cap[íi]tulo\s+(?:[MDCLXVIB]+|Primero|Segundo|Tercero|Cuarto|Quinto|Sexto|S[eé]ptimo|Octavo|Noveno|D[eé]cimo|Und[eé]cimo|Duod[eé]cimo))/i;

// El manifiesto mezcla dos codificaciones del EPUB fuente: etiquetas limpias
// («Capítulo VIII») y lotes con mojibake cp1252 («CapÝtulo», «CAP═TULO»).
// Esta tabla restaura las vocales/tildes afectadas ANTES de extraer la
// etiqueta; es normalización de codificación, no corrección editorial.
const MOJIBAKE: Array<[RegExp, string]> = [
  [/═/g, 'Í'],
  [/Ý/g, 'í'],
  [/¾/g, 'é'],
  [/ß/g, 'á'],
  [/±/g, 'ñ'],
  [/Ú/g, 'ú'],
  [/Û/g, 'ú'],
  [/À/g, 'à'],
  [/È/g, 'è'],
  [/Ì/g, 'ì'],
  [/Ò/g, 'ò'],
  [/Ù/g, 'ù'],
  [/Ô/g, 'ó'],
  [/Ê/g, 'ê'],
  [/Ã/g, 'ã'],
];

/** Restaura los caracteres mojibake cp1252 habituales del manifiesto. */
export function desmojibakear(texto: string): string {
  let salida = texto;
  for (const [patron, reemplazo] of MOJIBAKE) salida = salida.replace(patron, reemplazo);
  return salida;
}

/** Etiqueta verificable de capítulo a partir del campo documental. */
export function etiquetaCapitulo(doc_capitulo: string): string | null {
  const m = ETIQUETA_CAPITULO.exec(desmojibakear(doc_capitulo ?? ''));
  if (m) return normalizarCapitulo(m[1]);
  return null;
}

/** «Capítulo VIII.» / «Capítulo VIII» → «Capítulo VIII» (forma canónica). */
export function normalizarCapitulo(etiqueta: string): string {
  const m = /Cap[íi]tulo\s+([MDCLXVIB]+|Primero|Segundo|Tercero|Cuarto|Quinto|Sexto|S[eé]ptimo|Octavo|Noveno|D[eé]cimo|Und[eé]cimo|Duod[eé]cimo)/i.exec(
    desmojibakear(etiqueta),
  );
  if (!m) return desmojibakear(etiqueta).trim();
  return `Capítulo ${m[1].toUpperCase()}`;
}

/** Primera referencia con orden de lectura (la del EPUB manda). */
function referenciaPrincipal(imagen: ImagenManifest): ReferenciaManifest | null {
  return [...(imagen.referencias ?? [])].sort(
    (a, b) => a.orden_lectura - b.orden_lectura,
  )[0] ?? null;
}

export interface GaleriasValidadas {
  acuarelas: Obra[]; // TODAS las acuarelas del manifiesto, por orden de lectura
  avisos: string[]; // registros descartados o inconsistentes (para revisión)
  error: string | null; // fallo estructural del manifiesto (fail-closed)
}

/** Proyección validada de TODAS las acuarelas (376 en el manifiesto actual). */
export function proyectar(manifiesto: Manifiesto): GaleriasValidadas {
  const avisos: string[] = [];
  const imagenes = manifiesto.imagenes ?? [];
  const vistas = new Set<string>();
  const acuarelas: Obra[] = [];
  for (const imagen of imagenes) {
    if (imagen.clase !== 'acuarela_tusell') continue;
    if (!imagen.id || !imagen.archivo || !imagen.sha256) {
      avisos.push(`registro sin id/archivo/sha256: ${JSON.stringify(imagen).slice(0, 80)}`);
      continue;
    }
    if (vistas.has(imagen.id)) {
      avisos.push(`id duplicado en el manifiesto: ${imagen.id}`);
      continue;
    }
    vistas.add(imagen.id);
    const ref = referenciaPrincipal(imagen);
    if (!ref) {
      avisos.push(`${imagen.id}: sin referencias documentales`);
      continue;
    }
    const capitulos = [
      ...new Set(
        (imagen.referencias ?? [])
          .map((r) => etiquetaCapitulo(r.doc_capitulo))
          .filter((c): c is string => c !== null),
      ),
    ];
    const referencias = (imagen.referencias ?? [])
      .map((r) => ({
        parte: r.doc_parte || null,
        capitulo: etiquetaCapitulo(r.doc_capitulo),
        ordenLectura: r.orden_lectura,
      }))
      .sort((a, b) => a.ordenLectura - b.ordenLectura);
    acuarelas.push({
      id: imagen.id,
      archivo: imagen.archivo,
      uri: `assets://ilustraciones_tusell/acuarelas/${imagen.archivo}`,
      ancho: imagen.ancho,
      alto: imagen.alto,
      sha256: imagen.sha256,
      alt: ref.alt?.trim() || `Acuarela de Salvador Tusell (${imagen.id})`,
      parte: ref.doc_parte || null,
      capitulos,
      referencias,
      ordenLectura: ref.orden_lectura,
      esColeccionInicial: false,
      ficha: null,
      pasajeId: null,
    });
  }
  if (!acuarelas.length) {
    return { acuarelas: [], avisos, error: 'el manifiesto no contiene acuarelas válidas' };
  }
  acuarelas.sort((a, b) => a.ordenLectura - b.ordenLectura || a.id.localeCompare(b.id));
  return { acuarelas, avisos, error: null };
}

// ------------------------------------------------- primera colección curada
// Títulos editoriales de Dirección (encargo P1 Museo, issue #73); no afirman
// hechos más allá del texto alternativo del manifiesto. El orden de la
// colección es el del manifiesto (orden de lectura), no el numérico.
export const COLECCION_INICIAL = {
  id: 'tusell-molinos-vizcaino',
  titulo: 'Los molinos y el vizcaíno — acuarelas de Salvador Tusell',
  descripcion:
    'Primera colección del Museo: cinco acuarelas de la edición ilustrada por ' +
    'Salvador Tusell (Barcelona, Luis Tasso, 1905) que acompañan el episodio de ' +
    'los molinos y el combate suspendido con el vizcaíno. El orden sigue la ' +
    'lectura de la edición, no la numeración de los ficheros.',
  titulos: {
    'DQ.IL.0026': 'Embestida contra el molino',
    'DQ.IL.0027': 'Encuentro con los frailes',
    'DQ.IL.0028': 'Reacción de Sancho',
    'DQ.IL.0029': 'Recuperación tras los molinos',
    'DQ.IL.0030': 'Combate con el vizcaíno',
  } as Record<string, string>,
} as const;

export const IDS_COLECCION_INICIAL = Object.keys(COLECCION_INICIAL.titulos);

/** Marca las obras de la colección inicial (compartida por app y pruebas). */
export function marcarColeccionInicial(acuarelas: Obra[]): Obra[] {
  return acuarelas.map((o) => ({
    ...o,
    esColeccionInicial: IDS_COLECCION_INICIAL.includes(o.id),
  }));
}

// ------------------------------------------- anclas literarias documentadas
// Vínculos obra→pasaje con pasaje_id_verificado en
// docs/data/propuesta_vinculos_culturales_visuales.csv (R16), estado
// PILOTO_DOCUMENTADO_REVISION_VISUAL_PENDIENTE. Solo se listan obras con
// ficha DQ.MUS del piloto: la ficha manda y el pasaje aporta la cita
// cotejada (content/piloto/passages, edición de referencia PG #2000).
// Quitar una entrada (decisión de Dirección) elimina el bloque «Texto
// original» de esa obra: nada se inventa en su lugar.
export const VINCULOS_PASAJE: Record<string, string> = {
  'DQ.IL.0027': 'DQ.P1.C08.P0007',
  'DQ.IL.0029': 'DQ.P1.C08.P0006',
  'DQ.IL.0035': 'DQ.P1.C11.P0001',
  'DQ.IL.0170': 'DQ.P2.C01.P0001',
  'DQ.IL.0371': 'DQ.P2.C74.P0001',
};

/** Fusión de las fichas DQ.MUS del paquete piloto con la proyección del
 *  manifiesto: la ficha manda (título, explicación, técnica, procedencia).
 *  Requiere las categorías museum_items/media_assets del catálogo; si el
 *  catálogo no está disponible, la galería funciona solo con el manifiesto. */
export function enriquecerConFichas(
  acuarelas: Obra[],
  fichas: MuseumItem[],
  medios: Record<string, { logical_uri: string; spoiler_level?: string }>,
): { obras: Obra[]; vinculadas: number } {
  const porUri = new Map<string, { ficha: MuseumItem; mediaId: string; spoiler: string | null }>();
  for (const ficha of fichas) {
    for (const mediaId of ficha.media_ids ?? []) {
      const ma = medios[mediaId];
      if (ma?.logical_uri) {
        porUri.set(ma.logical_uri, {
          ficha,
          mediaId,
          spoiler: ma.spoiler_level ?? null,
        });
      }
    }
  }
  let vinculadas = 0;
  const obras = acuarelas.map((obra) => {
    const hallazgo = porUri.get(obra.uri);
    if (!hallazgo) return obra;
    vinculadas += 1;
    const f = hallazgo.ficha;
    return {
      ...obra,
      ficha: {
        id: f.id,
        titulo: f.title,
        autor: f.authorship ?? '',
        fecha: f.date ?? '1905',
        tecnica: f.technique ?? '',
        procedencia: f.provenance ?? '',
        explicacion: f.context ?? '',
        relacion: f.relation_to_quixote ?? '',
        certeza: f.certainty ?? '',
        mediaId: hallazgo.mediaId,
        licenciaId: f.license_id,
        fuenteId: f.source_id,
        spoilerLevel: hallazgo.spoiler,
      },
      pasajeId: VINCULOS_PASAJE[obra.id] ?? null,
    };
  });
  return { obras, vinculadas };
}

/** Galería final: colección inicial marcada y fichas del piloto fundidas
 *  dentro del catálogo completo. Asíncrona: descarga el manifiesto (chunk
 *  propio) solo al entrar al Museo; las fichas A llegan por el catálogo del
 *  piloto cuando esté disponible (opcional).
 *  Nota: sin atributo `type: 'json'` — en desarrollo Vite transforma el JSON
 *  a módulo JS y el atributo haría que el navegador lo rechace. */
let cache: GaleriasValidadas | null = null;
export async function cargarGaleria(catalogo?: Catalogo | null): Promise<GaleriasValidadas> {
  if (cache) return cache;
  const modulo = await import(
    '../../../assets/ilustraciones_tusell/manifests/manifest_ilustraciones.json',
  );
  const manifiesto = ((modulo as { default?: Manifiesto }).default ??
    (modulo as unknown as Manifiesto)) as Manifiesto;
  const base = proyectar(manifiesto);
  let obras = marcarColeccionInicial(base.acuarelas);
  if (catalogo) {
    const fusion = enriquecerConFichas(obras, catalogo.piezasMuseo(), catalogo.medios());
    obras = fusion.obras;
  }
  cache = { ...base, acuarelas: obras };
  return cache;
}

/** Título editorial de una obra: ficha DQ.MUS > colección inicial (issue
 *  #73) > alt honesto del manifiesto. Nunca el id crudo como título. */
export function tituloDe(obra: Obra): string {
  if (obra.ficha) return obra.ficha.titulo;
  const coleccion = (COLECCION_INICIAL.titulos as Record<string, string>)[obra.id];
  if (coleccion) return coleccion;
  return obra.alt;
}

/** Cita cotejada de la obra (solo si hay ancla documentada). */
export function pasajeDe(obra: Obra, catalogo?: Catalogo | null): Passage | null {
  if (!obra.pasajeId || !catalogo) return null;
  return catalogo.pasaje(obra.pasajeId) ?? null;
}

/** Línea de fuente de la imagen (patrón de la referencia visual aprobada
 *  §2: autor · edición y fecha · institución · ID; sin datos falsos). */
export function fuenteDe(obra: Obra): string {
  const base =
    'Salvador Tusell (sobre composición de Gustave Doré) · Barcelona, Luis Tasso, 1905 · BVPB registro 463832';
  if (obra.ficha) {
    return `${base} · ${obra.id} (ficha ${obra.ficha.id})`;
  }
  return `${base} · Digitalización: Epublibre/Titivillus · ${obra.id} · Procedencia pendiente de verificar`;
}

/** Etiqueta de Parte y capítulo para la pastilla de la ficha («Parte I ·
 *  Capítulo VIII»); parejos por la misma referencia documental. */
export function pastillaCapitulo(obra: Obra): string {
  const ref = obra.referencias.find(
    (r) => (!obra.parte || r.parte === obra.parte) && r.capitulo,
  );
  const partes = [
    obra.parte ? `Parte ${obra.parte}` : ref?.parte ? `Parte ${ref.parte}` : null,
    ref?.capitulo ?? null,
  ].filter(Boolean);
  return partes.join(' · ') || 'Sin capítulo conocido';
}

/** Filtros disponibles a partir de los datos (sin asignaciones difusas):
 *  los capítulos se ofrecen PAREJOS con su parte, porque el mismo número de
 *  capítulo existe en ambas partes del manifiesto. */
export function opcionesFiltro(acuarelas: Obra[]): {
  partes: string[];
  capitulos: { valor: string; etiqueta: string }[];
} {
  const partes = [...new Set(acuarelas.map((o) => o.parte).filter((p): p is string => !!p))].sort();
  const pares = new Map<string, { parte: string; capitulo: string }>();
  for (const o of acuarelas) {
    for (const r of o.referencias) {
      if (!r.parte || !r.capitulo) continue;
      pares.set(`${r.parte}::${r.capitulo}`, { parte: r.parte, capitulo: r.capitulo });
    }
  }
  const numero = (e: string) => {
    const m = /Capítulo\s+([MDCLXVIB]+)/i.exec(e);
    if (!m) return 1e9;
    const vals: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let n = 0;
    for (let i = 0; i < m[1].length; i++) {
      const v = vals[m[1][i]];
      n += i + 1 < m[1].length && vals[m[1][i + 1]] > v ? -v : v;
    }
    return n;
  };
  const capitulos = [...pares.values()]
    .sort((a, b) => a.parte.localeCompare(b.parte) || numero(a.capitulo) - numero(b.capitulo))
    .map(({ parte, capitulo }) => ({
      valor: `${parte}::${capitulo}`,
      etiqueta: `${capitulo} · Parte ${parte}`,
    }));
  return { partes, capitulos };
}

/** Filtrado verificable: la parte filtra sobre las referencias de la obra y
 *  el capítulo (que viaja PAREJO con su parte) exige la coincidencia
 *  SIMULTÁNEA de parte y capítulo en la misma referencia. */
export function filtrar(
  acuarelas: Obra[],
  parte: string | null,
  capituloValor: string | null,
): Obra[] {
  const [parteFiltro, capituloFiltro] = capituloValor
    ? (capituloValor.split('::') as [string, string])
    : [null, null];
  return acuarelas.filter((o) => {
    if (parte && !o.referencias.some((r) => r.parte === parte)) return false;
    if (capituloFiltro && !o.referencias.some((r) => r.parte === parteFiltro && r.capitulo === capituloFiltro)) {
      return false;
    }
    return true;
  });
}

/** Ventana del carrusel (maqueta: 5 miniaturas visibles). Devuelve los
 *  índices [inicio, fin) de tamaño fijo, con el activo siempre dentro; se
 *  desplaza solo cuando el activo sale de la ventana. Pure function para
 *  probarla sin render. */
export function ventanaCarrousel(
  indice: number,
  total: number,
  tamano = 5,
): { inicio: number; indices: number[] } {
  if (total <= 0) return { inicio: 0, indices: [] };
  const n = Math.min(tamano, total);
  let inicio = Math.min(Math.max(indice - (n - 1), 0), Math.max(total - n, 0));
  if (indice >= 0 && indice < inicio) inicio = indice;
  if (indice >= inicio + n) inicio = indice - n + 1;
  const indices = Array.from({ length: n }, (_, i) => inicio + i);
  return { inicio, indices };
}
