// Adaptador del Museo hacia el manifiesto existente de las ilustraciones
// Tusell (issue #73 §7: «sin duplicar catálogos»: el manifiesto es la base;
// este módulo solo lo PROYECTA para el runtime, con validación y unicidad,
// sin editar DQ.IL.* ni alterar hashes).
//
// Reglas editoriales del issue #73 que este adaptador hace cumplir:
//  - El orden de la galería es el ORDEN DE LECTURA del EPUB
//    (referencias[].orden_lectura), nunca el número de fichero.
//  - El capítulo se deriva del campo documental doc_capitulo (etiqueta
//    «Capítulo <romano>»); sin asignaciones difusas.
//  - No se crean MediaAssets ni vínculos con DQ.MA.* (DQ.MA.000028 no
//    existe hoy); las obras se citan por su id canónico DQ.IL.*.
//  - Derechos: uso interno en desarrollo mientras
//    DQ.LIC.0001.redistribution = 'condicionada'; no es autorización de
//    publicación ni comercialización.
// El manifiesto (415 imágenes + 147 documentos) se importa DINÁMICAMENTE:
// viaja en su propio chunk y solo se descarga al abrir el Museo, sin
// engrosar el bundle de Historia/Aventura (arquitectura lista para las 376).
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

/** Obra lista para el runtime (proyección del registro del manifiesto). */
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
}

const ETIQUETA_CAPITULO = /^(Cap[íi]tulo\s+[MDCLXVIB]+)/i;

/** Etiqueta verificable de capítulo a partir del campo documental. */
export function etiquetaCapitulo(doc_capitulo: string): string | null {
  const m = ETIQUETA_CAPITULO.exec(doc_capitulo ?? '');
  if (m) return normalizarCapitulo(m[1]);
  return null;
}

/** «Capítulo VIII.» / «Capítulo VIII» → «Capítulo VIII» (forma canónica). */
export function normalizarCapitulo(etiqueta: string): string {
  const m = /Cap[íi]tulo\s+([MDCLXVIB]+)/i.exec(etiqueta);
  if (!m) return etiqueta.trim();
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
    });
  }
  if (!acuarelas.length) {
    return { acuarelas: [], avisos, error: 'el manifiesto no contiene acuarelas válidas' };
  }
  acuarelas.sort((a, b) => a.ordenLectura - b.ordenLectura || a.id.localeCompare(b.id));
  return { acuarelas, avisos, error: null };
}

// ------------------------------------------------- primera colección curada
// Títulos editoriales de Dirección (encargo P1 Museo); no afirman hechos más
// allá del texto alternativo del manifiesto. El orden de la colección es el
// del manifiesto (orden de lectura), no el numérico del fichero.
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

/** Galería final: colección inicial marcada dentro del catálogo completo.
 *  Asíncrona: descarga el manifiesto (chunk propio) solo al entrar al Museo.
 *  Nota: sin atributo `type: 'json'` — en desarrollo Vite transforma el JSON
 *  a módulo JS y el atributo haría que el navegador lo rechace. */
let cache: GaleriasValidadas | null = null;
export async function cargarGaleria(): Promise<GaleriasValidadas> {
  if (cache) return cache;
  const modulo = await import(
    '../../../assets/ilustraciones_tusell/manifests/manifest_ilustraciones.json',
  );
  const manifiesto = ((modulo as { default?: Manifiesto }).default ??
    (modulo as unknown as Manifiesto)) as Manifiesto;
  const base = proyectar(manifiesto);
  cache = { ...base, acuarelas: marcarColeccionInicial(base.acuarelas) };
  return cache;
}

/** Título editorial de una obra (colección inicial) o etiqueta neutra. */
export function tituloDe(obra: Obra): string {
  return (COLECCION_INICIAL.titulos as Record<string, string>)[obra.id] ?? obra.id;
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
