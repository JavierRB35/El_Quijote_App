// Adaptador del Museo hacia el CATÁLOGO CANÓNICO (issue #73 §7 + maqueta
// oficial docs/MUSEO_REFERENCIA_VISUAL_APROBADA.md + expediente
// docs/EXPEDIENTE_MUSEO.md):
//   DQ.MUS.* (fichas editoriales: título, contexto, técnica, capítulos)
//   → DQ.MA.* function='museo' (imagen, atribución, procedencia, licencia,
//     derivados con sha256) → assets://ilustraciones_tusell/acuarelas/NNN.jpg
//   + manifiesto EPUB (orden de lectura del libro y cobertura de las 376).
//
// Reglas que este adaptador hace cumplir:
//  - ORDEN DE LECTURA del EPUB (nunca el número de fichero): 027 precede a 026.
//  - PIEZAS SIN FICHA EDITORIAL se identifican como «pendiente de ficha»
//    (nunca se presentan como verificadas). Ficha de imagen = fuente,
//    atribución y licencia resueltas (regla rectora del expediente).
//  - Filtros PAREJOS parte+capítulo por referencia (la Parte II tiene su
//    propio «Capítulo VIII»).
//  - Derechos: uso interno en desarrollo; DQ.LIC.0001/0002 con
//    redistribution=condicionada — no es autorización de publicación.
// El paquete y el manifiesto viajan en chunks propios (import dinámico) para
// no engrosar el bundle de Historia/Aventura.
const ES_TAURI = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

/** Vista indexada del paquete (como la construye el backend en
 *  cargar_paquete): bajo Tauri vía invoke; en dev vía middleware
 *  /__dev/paquete (mismo paquete real, ADR-0002). */
export interface PaqueteVista {
  package_id: string;
  contract_version: string;
  catalog_version?: string;
  categorias: Record<string, Record<string, unknown>>;
}

async function cargarPaqueteVista(): Promise<PaqueteVista> {
  if (ES_TAURI) {
    const { invoke } = await import('@tauri-apps/api/core');
    return invoke<PaqueteVista>('cargar_paquete');
  }
  const respuesta = await fetch('/__dev/paquete');
  if (!respuesta.ok) throw new Error(`paquete no disponible en modo dev (${respuesta.status})`);
  return (await respuesta.json()) as PaqueteVista;
}

export interface Obra {
  id: string; // DQ.MA.* si hay ficha de imagen; DQ.IL.* si es pendiente
  citaId: string; // clave en citas_verificadas (DQ.IL.*)
  musId: string | null; // ficha editorial DQ.MUS.* si existe
  numAcuarela: number | null; // NNN de acuarelas/NNN.jpg
  uri: string;
  sha256: string | null;
  ancho: number | null;
  alto: number | null;
  titulo: string; // MUS.title (curado) o alt del catálogo
  esColeccionInicial: boolean;
  estado: 'fichada' | 'pendiente'; // ficha editorial resuelta o pendiente
  alt: string;
  atribucion: string | null;
  atribucionEstado: string | null;
  tecnica: string | null;
  procedencia: string | null;
  licenciaId: string | null;
  licenciaEstado: string | null;
  allowedUses: string[];
  contexto: string | null; // «Explicación» documentada (MUS.context)
  capitulos: string[]; // etiquetas «Capítulo <romano>»
  referencias: { parte: string | null; capitulo: string | null; ordenLectura: number }[];
  ordenLectura: number | null;
}

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
  ancho: number;
  alto: number;
  sha256: string;
  referencias: ReferenciaManifest[];
  id: string;
  duplicado_de: string[];
}

export type Manifiesto = {
  fuente: Record<string, string>;
  imagenes: ImagenManifest[];
};

const ETIQUETA_CAPITULO = /^(Cap[íi]tulo\s+[MDCLXVIB]+)/i;

export function etiquetaCapitulo(doc_capitulo: string): string | null {
  const m = ETIQUETA_CAPITULO.exec(doc_capitulo ?? '');
  return m ? normalizarCapitulo(m[1]) : null;
}

export function normalizarCapitulo(etiqueta: string): string {
  const m = /Cap[íi]tulo\s+([MDCLXVIB]+)/i.exec(etiqueta);
  return m ? `Capítulo ${m[1].toUpperCase()}` : etiqueta.trim();
}

function numeroRomano(etiqueta: string): number {
  const m = /Capítulo\s+([MDCLXVIB]+)/i.exec(etiqueta);
  if (!m) return 1e9;
  const vals: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let n = 0;
  for (let i = 0; i < m[1].length; i++) {
    const v = vals[m[1][i]];
    n += i + 1 < m[1].length && vals[m[1][i + 1]] > v ? -v : v;
  }
  return n;
}

function romanoDe(n: number): string {
  const tabla: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let resto = n;
  let salida = '';
  for (const [v, s] of tabla) {
    while (resto >= v) { salida += s; resto -= v; }
  }
  return salida;
}

// ------------------------------------------------- colección inicial (Dirección)
// Las cinco acuarelas del episodio de los molinos y el vizcaíno (encargo P1),
// con títulos editoriales que no afirman hechos más allá del alt.
export const COLECCION_INICIAL = {
  id: 'tusell-molinos-vizcaino',
  sobreEncabezado: 'Colección · Los molinos y el vizcaíno',
  titulo: 'Los molinos y el vizcaíno — acuarelas de Salvador Tusell',
  descripcion:
    'Cinco acuarelas de la edición ilustrada por Salvador Tusell (Barcelona, ' +
    'Luis Tasso, 1905) que acompañan el episodio de los molinos y el combate ' +
    'suspendido con el vizcaíno. El orden sigue la lectura de la edición, no la ' +
    'numeración de los ficheros.',
  titulos: {
    DQ_IL_026: 'Embestida contra el molino',
    DQ_IL_027: 'Encuentro con los frailes',
    DQ_IL_028: 'Reacción de Sancho',
    DQ_IL_029: 'Recuperación tras los molinos',
    DQ_IL_030: 'Combate con el vizcaíno',
  } as Record<string, string>,
} as const;

const NUMEROS_COLECCION_INICIAL = [26, 27, 28, 29, 30];

export interface GaleriasValidadas {
  obras: Obra[]; // catálogo completo, por orden de lectura
  avisos: string[];
  error: string | null;
}

export interface Paquete {
  categorias: Record<string, Record<string, unknown>>;
}

interface MediaAssetPkg {
  id: string;
  function: string;
  media_class: string;
  logical_uri: string;
  alt: string;
  author?: string;
  license_id?: string;
  license_status?: string;
  allowed_uses?: string[];
  provenance?: string;
  derivatives?: { variant?: string; format?: string; width?: number; height?: number; sha256?: string }[];
}

interface MuseumItemPkg {
  id: string;
  title: string;
  authorship?: string;
  attribution_status?: string;
  technique?: string;
  provenance?: string;
  context?: string;
  chapters?: string[];
  media_ids?: string[];
  license_id?: string;
}

/** Proyección validada del catálogo completo (paquete + manifiesto). */
export function proyectar(paquete: Paquete, manifiesto: Manifiesto): GaleriasValidadas {
  const avisos: string[] = [];
  const museo = Object.values(paquete.categorias.media_assets ?? {}) as unknown as MediaAssetPkg[];
  const fichas = Object.values(paquete.categorias.museum_items ?? {}) as unknown as MuseumItemPkg[];

  // manifiesto: número de acuarela → registro (orden de lectura, refs, sha)
  const porNumero = new Map<number, ImagenManifest>();
  for (const imagen of manifiesto.imagenes ?? []) {
    const m = /^(\d+)\.jpg$/.exec(imagen.archivo ?? '');
    if (m && imagen.clase === 'acuarela_tusell') porNumero.set(Number(m[1]), imagen);
  }

  // ficha editorial por media id
  const fichaPorMedia = new Map<string, MuseumItemPkg>();
  for (const f of fichas) {
    for (const mid of f.media_ids ?? []) fichaPorMedia.set(mid, f);
  }

  const obras: Obra[] = [];
  const numerosConFicha = new Set<number>();
  for (const ma of museo) {
    if (ma.function !== 'museo') continue;
    const m = /acuarelas\/(\d+)\.jpg$/.exec(ma.logical_uri ?? '');
    const num = m ? Number(m[1]) : null;
    const manifest = num !== null ? porNumero.get(num) : undefined;
    if (num !== null) numerosConFicha.add(num);
    const ficha = fichaPorMedia.get(ma.id);
    const deriv = (ma.derivatives ?? [])[0];
    const refs = (manifest?.referencias ?? []).map((r) => ({
      parte: r.doc_parte || null,
      capitulo: etiquetaCapitulo(r.doc_capitulo),
      ordenLectura: r.orden_lectura,
    }));
    const capitulos = [
      ...new Set([
        ...(ficha?.chapters ?? []).map((c) => {
          const cm = /^DQ\.P([12])\.C(\d+)$/.exec(c);
          return cm ? `Capítulo ${romanoDe(Number(cm[2]))}` : c;
        }),
        ...refs.map((r) => r.capitulo).filter((c): c is string => !!c),
      ]),
    ];
    if (!ma.id || !ma.logical_uri || !ma.alt) {
      avisos.push(`media asset incompleto: ${JSON.stringify(ma).slice(0, 80)}`);
      continue;
    }
    obras.push({
      id: ma.id,
      citaId: manifest?.id ?? ma.id,
      musId: ficha?.id ?? null,
      numAcuarela: num,
      uri: ma.logical_uri,
      sha256: deriv?.sha256?.replace(/^sha256:/, '') ?? manifest?.sha256 ?? null,
      ancho: deriv?.width ?? manifest?.ancho ?? null,
      alto: deriv?.height ?? manifest?.alto ?? null,
      titulo: ficha?.title ?? ma.alt,
      esColeccionInicial: num !== null && NUMEROS_COLECCION_INICIAL.includes(num),
      estado: ficha ? 'fichada' : 'pendiente',
      alt: ma.alt || manifest?.referencias?.[0]?.alt || '',
      atribucion: ma.author ?? ficha?.authorship ?? null,
      atribucionEstado: ficha?.attribution_status ?? null,
      tecnica: ficha?.technique ?? null,
      procedencia: ma.provenance ?? ficha?.provenance ?? null,
      licenciaId: ma.license_id ?? ficha?.license_id ?? null,
      licenciaEstado: ma.license_status ?? null,
      allowedUses: ma.allowed_uses ?? [],
      contexto: ficha?.context ?? null,
      capitulos,
      referencias: refs,
      ordenLectura: manifest ? refs[0]?.ordenLectura ?? null : null,
    });
  }
  // Obras del inventario EPUB sin ficha de imagen: entran como PENDIENTES
  // (identificadas como tales, jamás como verificadas) para que el catálogo
  // completo —las 376— sea navegable, y sin crear MediaAssets nuevos.
  const atribucionEdicion = 'Edición ilustrada por Salvador Tusell (atribución de obra pendiente de verificación individual)';
  for (const [num, manifest] of porNumero) {
    if (numerosConFicha.has(num)) continue;
    const refs = (manifest.referencias ?? []).map((r) => ({
      parte: r.doc_parte || null,
      capitulo: etiquetaCapitulo(r.doc_capitulo),
      ordenLectura: r.orden_lectura,
    }));
    obras.push({
      id: manifest.id,
      citaId: manifest.id,
      musId: null,
      numAcuarela: num,
      uri: `assets://ilustraciones_tusell/acuarelas/${manifest.archivo}`,
      sha256: manifest.sha256,
      ancho: manifest.ancho,
      alto: manifest.alto,
      titulo: manifest.referencias?.[0]?.alt?.trim() || manifest.id,
      esColeccionInicial: NUMEROS_COLECCION_INICIAL.includes(num),
      estado: 'pendiente',
      alt: manifest.referencias?.[0]?.alt?.trim() || `Acuarela ${manifest.id}`,
      atribucion: atribucionEdicion,
      atribucionEstado: 'pendiente',
      tecnica: null,
      procedencia: 'Edición ilustrada: Barcelona, Luis Tasso, 1905 · digitalización: Epublibre (Titivillus) 2024',
      licenciaId: 'DQ.LIC.0001',
      licenciaEstado: 'verificada',
      allowedUses: ['uso_personal_app', 'almacenamiento_repo_git'],
      contexto: null,
      capitulos: [...new Set(refs.map((r) => r.capitulo).filter((c): c is string => !!c))],
      referencias: refs,
      ordenLectura: refs[0]?.ordenLectura ?? null,
    });
  }
  if (!obras.length) {
    return { obras: [], avisos, error: 'el catálogo no contiene piezas de museo válidas' };
  }
  obras.sort((a, b) => (a.ordenLectura ?? 1e9) - (b.ordenLectura ?? 1e9) || a.id.localeCompare(b.id));
  return { obras, avisos, error: null };
}

/** Título editorial de una obra (títulos de Dirección para la colección
 *  inicial, ficha MUS si existe, o etiqueta neutra del catálogo). */
export function tituloDe(obra: Obra): string {
  if (obra.numAcuarela !== null) {
    const clave = `DQ_IL_${String(obra.numAcuarela).padStart(3, '0')}`;
    const curado = (COLECCION_INICIAL.titulos as Record<string, string>)[clave];
    if (curado) return curado;
  }
  return obra.titulo;
}

// ------------------------------------------------- citas verificadas (derivado)
/** Cita original cotejada con PG #2000 (manifest derivado versionado,
 *  generado off-line y validado contra el texto del disco — maqueta §2c). */
export interface CitaObra {
  verificada: boolean;
  cita?: string;
  offset?: [number, number];
  variante_manifiesto?: string | null;
  motivo?: string;
}

let citasCache: Record<string, CitaObra> | null = null;
export async function cargarCitas(): Promise<Record<string, CitaObra>> {
  if (citasCache) return citasCache;
  const mod = await import(
    '../../../assets/ilustraciones_tusell/manifests/citas_verificadas.json'
  );
  const derivado = (mod as unknown as { default?: { obras?: Record<string, CitaObra> }; obras?: Record<string, CitaObra> });
  citasCache = derivado.default?.obras ?? derivado.obras ?? {};
  return citasCache;
}

// ------------------------------------------------- carga combinada (app)
export interface MuseoCargado {
  obras: Obra[];
  citas: Record<string, CitaObra>;
  avisos: string[];
}

let museoCache: MuseoCargado | null = null;
/** Carga del Museo: vista indexada del paquete (backend o middleware dev) +
 *  manifiesto EPUB (chunk propio) + citas verificadas (derivado). */
export async function cargarMuseo(): Promise<MuseoCargado> {
  if (museoCache) return museoCache;
  const [paquete, manifiestoMod, citas] = await Promise.all([
    cargarPaqueteVista(),
    import('../../../assets/ilustraciones_tusell/manifests/manifest_ilustraciones.json'),
    cargarCitas(),
  ]);
  const manifiesto = (manifiestoMod as unknown as { default?: Manifiesto }).default ??
    (manifiestoMod as unknown as Manifiesto);
  const base = proyectar(paquete, manifiesto);
  museoCache = { obras: base.obras, citas, avisos: base.avisos };
  return museoCache;
}

// ------------------------------------------------- filtros
export function opcionesFiltro(obras: Obra[]): {
  partes: string[];
  capitulos: { valor: string; etiqueta: string }[];
} {
  const partes = [...new Set(obras.flatMap((o) => o.referencias.map((r) => r.parte)).filter((p): p is string => !!p))].sort();
  const pares = new Map<string, { parte: string; capitulo: string }>();
  for (const o of obras) {
    for (const r of o.referencias) {
      if (r.parte && r.capitulo) pares.set(`${r.parte}::${r.capitulo}`, { parte: r.parte, capitulo: r.capitulo });
    }
  }
  const capitulos = [...pares.values()]
    .sort((a, b) => a.parte.localeCompare(b.parte) || numeroRomano(a.capitulo) - numeroRomano(b.capitulo))
    .map(({ parte, capitulo }) => ({
      valor: `${parte}::${capitulo}`,
      etiqueta: `${capitulo} · Parte ${parte}`,
    }));
  return { partes, capitulos };
}

export function filtrar(obras: Obra[], parte: string | null, capituloValor: string | null): Obra[] {
  const [parteFiltro, capituloFiltro] = capituloValor
    ? (capituloValor.split('::') as [string, string])
    : [null, null];
  return obras.filter((o) => {
    if (parte && !o.referencias.some((r) => r.parte === parte)) return false;
    if (capituloFiltro && !o.referencias.some((r) => r.parte === parteFiltro && r.capitulo === capituloFiltro)) {
      return false;
    }
    return true;
  });
}
