// Pruebas del Museo (issue #73 + maqueta visual oficial): adaptador del
// manifiesto, orden de lectura (027 precede a 026), filtros documentales,
// fusión de las 7 fichas DQ.MUS del piloto, anclas de pasaje, ventana del
// carrusel y control de derechos (DQ.LIC.0001). Los metadatos NO se
// inventan: se compruean contra el manifiesto y el paquete reales.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  COLECCION_INICIAL,
  IDS_COLECCION_INICIAL,
  VINCULOS_PASAJE,
  enriquecerConFichas,
  etiquetaCapitulo,
  filtrar,
  fuenteDe,
  marcarColeccionInicial,
  opcionesFiltro,
  pastillaCapitulo,
  proyectar,
  tituloDe,
  ventanaCarrousel,
  type Manifiesto,
} from '../src/museo/obras.ts';
import type { MuseumItem } from '../src/contrato.ts';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const MANIFIESTO = join(
  RAIZ,
  'assets',
  'ilustraciones_tusell',
  'manifests',
  'manifest_ilustraciones.json',
);
const PILOTO = join(RAIZ, 'content', 'piloto');

// El test lee el manifiesto y el paquete DEL DISCO y usa la misma proyección
// que la app: valida los metadatos reales sin importar JSON por módulos.
const manifiesto = JSON.parse(readFileSync(MANIFIESTO, 'utf-8')) as Manifiesto;
const proyeccion = proyectar(manifiesto);
const acuarelas = marcarColeccionInicial(proyeccion.acuarelas);

// fichas DQ.MUS del piloto + medios, como los sirve cargarCatalogo()
const fichas: MuseumItem[] = JSON.parse(
  readFileSync(join(PILOTO, 'museum_items', 'DQ.MUS.0003.json'), 'utf-8'),
) && [1, 2, 3, 4, 5, 6, 7].map((n) =>
  JSON.parse(readFileSync(join(PILOTO, 'museum_items', `DQ.MUS.000${n}.json`), 'utf-8')) as MuseumItem,
);
const medios: Record<string, { logical_uri: string; spoiler_level?: string }> = {};
for (const ficha of fichas) {
  for (const mid of ficha.media_ids) {
    medios[mid] = JSON.parse(readFileSync(join(PILOTO, 'media_assets', `${mid}.json`), 'utf-8'));
  }
}
const enriquecidas = enriquecerConFichas(acuarelas, fichas, medios).obras;

test('el manifiesto aporta las 376 acuarelas Tusell con IDs únicos', () => {
  assert.equal(existsSync(MANIFIESTO), true, 'el manifiesto debe existir en el repositorio');
  assert.equal(acuarelas.length, 376, `acuarelas: ${acuarelas.length}`);
  const ids = new Set(acuarelas.map((o) => o.id));
  assert.equal(ids.size, acuarelas.length, 'IDs DQ.IL.* duplicados');
  assert.ok(acuarelas.every((o) => o.id.startsWith('DQ.IL.')));
  assert.ok(acuarelas.every((o) => o.sha256.length === 64));
  assert.ok(acuarelas.every((o) => o.alt.length > 0), 'toda obra necesita alt del manifiesto');
});

test('orden de lectura: 027 precede a 026 (no rige la numeración del fichero)', () => {
  const porId = new Map(acuarelas.map((o) => [o.id, o]));
  assert.equal(
    porId.get('DQ.IL.0027')!.ordenLectura < porId.get('DQ.IL.0026')!.ordenLectura,
    true,
    'el orden de lectura del EPUB coloca 027 antes que 026',
  );
  for (let i = 1; i < acuarelas.length; i++) {
    assert.ok(
      acuarelas[i - 1].ordenLectura <= acuarelas[i].ordenLectura,
      `la galería no está ordenada en la posición ${i}`,
    );
  }
});

test('URI lógica canónica y fichero físico de cada acuarela (376/376)', () => {
  for (const obra of acuarelas) {
    assert.equal(obra.uri, `assets://ilustraciones_tusell/acuarelas/${obra.archivo}`);
    assert.equal(
      existsSync(join(RAIZ, 'assets', 'ilustraciones_tusell', 'acuarelas', obra.archivo)),
      true,
      `falta el fichero ${obra.archivo}`,
    );
  }
});

test('colección inicial: las cinco obras con títulos editoriales de Dirección', () => {
  const coleccion = acuarelas.filter((o) => o.esColeccionInicial);
  assert.equal(coleccion.length, 5);
  assert.deepEqual(
    [...coleccion.map((o) => o.id)].sort(),
    [...IDS_COLECCION_INICIAL].sort(),
  );
  // en orden de lectura: 027 → 026 → 028 → 029 → 030
  assert.deepEqual(coleccion.map((o) => o.archivo), [
    '027.jpg',
    '026.jpg',
    '028.jpg',
    '029.jpg',
    '030.jpg',
  ]);
  for (const obra of coleccion) {
    assert.equal(tituloDe(obra) === obra.id, false, `${obra.id} debe tener título editorial`);
  }
});

test('fusión de fichas: las 7 DQ.MUS del piloto mandan sobre el manifiesto', () => {
  const conFicha = enriquecidas.filter((o) => o.ficha);
  assert.equal(conFicha.length, 7, `obras con ficha: ${conFicha.length}`);
  // DQ.MUS.0003 → 029.jpg: título y explicación de la ficha, no del alt
  const obra29 = enriquecidas.find((o) => o.archivo === '029.jpg')!;
  assert.equal(obra29.ficha!.id, 'DQ.MUS.0003');
  assert.equal(obra29.ficha!.titulo, 'Sancho ayuda a montar a don Quijote tras los molinos');
  assert.ok(obra29.ficha!.explicacion.length > 20, 'la ficha aporta Explicación (context)');
  assert.equal(obra29.ficha!.licenciaId, 'DQ.LIC.0001');
  assert.equal(obra29.ficha!.spoilerLevel, 'revelador');
  // título final = el de la ficha
  assert.equal(tituloDe(obra29), 'Sancho ayuda a montar a don Quijote tras los molinos');
  // la ficha DQ.MUS.0002 gana sobre el título de colección de 027
  const obra27 = enriquecidas.find((o) => o.archivo === '027.jpg')!;
  assert.equal(obra27.ficha!.id, 'DQ.MUS.0002');
  assert.equal(tituloDe(obra27), obra27.ficha!.titulo);
});

test('pastilla de capítulo: parte y capítulo parejos por referencia', () => {
  const obra29 = enriquecidas.find((o) => o.archivo === '029.jpg')!;
  assert.equal(pastillaCapitulo(obra29), 'Parte I · Capítulo VIII');
  // 170.jpg: «CapÝtulo Primero» (mojibake) en Parte II → normalizado
  const obra170 = enriquecidas.find((o) => o.archivo === '170.jpg')!;
  assert.equal(pastillaCapitulo(obra170), 'Parte II · Capítulo PRIMERO');
});

test('anclas de pasaje: solo vínculos documentados, cita real del paquete', () => {
  // las 5 anclas corresponden a obras con ficha DQ.MUS
  for (const [ilId, pasajeId] of Object.entries(VINCULOS_PASAJE)) {
    const obra = enriquecidas.find((o) => o.id === ilId);
    assert.ok(obra, `${ilId} existe en la galería`);
    assert.ok(obra!.ficha, `${ilId} debe tener ficha DQ.MUS (la ficha manda)`);
    assert.equal(obra!.pasajeId, pasajeId);
    const pasaje = JSON.parse(
      readFileSync(join(PILOTO, 'passages', `${pasajeId}.json`), 'utf-8'),
    );
    assert.ok(
      (pasaje.text_original ?? '').trim().length > 0,
      `${pasajeId} debe tener texto cotejado`,
    );
  }
  // las obras sin ancla no muestran cita: pasajeId null
  const sinAncla = enriquecidas.filter((o) => !o.pasajeId);
  assert.equal(sinAncla.length, 376 - Object.keys(VINCULOS_PASAJE).length);
  // DQ.MUS.0001 (021.jpg) no tiene vínculo documentado → sin cita
  const obra21 = enriquecidas.find((o) => o.archivo === '021.jpg')!;
  assert.equal(obra21.ficha!.id, 'DQ.MUS.0001');
  assert.equal(obra21.pasajeId, null);
});

test('fuente de la imagen: patrón de la referencia visual sin datos falsos', () => {
  const obra29 = enriquecidas.find((o) => o.archivo === '029.jpg')!;
  const f29 = fuenteDe(obra29);
  assert.ok(f29.includes('Salvador Tusell'));
  assert.ok(f29.includes('Luis Tasso, 1905'));
  assert.ok(f29.includes('DQ.IL.0029'));
  // obra sin ficha: declara «Procedencia pendiente de verificar»
  const obra1 = enriquecidas.find((o) => o.archivo === '004.jpg')!;
  assert.ok(fuenteDe(obra1).includes('Procedencia pendiente de verificar'));
});

test('filtros documentales verificables (parte+capítulo parejos)', () => {
  const { partes, capitulos } = opcionesFiltro(acuarelas);
  assert.ok(partes.includes('I') && partes.includes('II'));
  const valores = capitulos.map((c) => c.valor);
  assert.ok(valores.includes('I::Capítulo VIII'));
  assert.ok(valores.includes('II::Capítulo VIII'));
  // Parte I + Capítulo VIII = las cuatro del episodio de los molinos
  const cap8 = filtrar(acuarelas, 'I', 'I::Capítulo VIII');
  assert.deepEqual(
    cap8.map((o) => o.id).sort(),
    ['DQ.IL.0026', 'DQ.IL.0027', 'DQ.IL.0028', 'DQ.IL.0029'],
  );
  const cap8ii = filtrar(acuarelas, 'II', 'II::Capítulo VIII');
  assert.equal(cap8ii.length, 3);
  assert.equal(cap8ii.some((o) => cap8.includes(o)), false);
  const cap9 = filtrar(acuarelas, 'I', 'I::Capítulo IX');
  assert.equal(cap9.some((o) => o.id === 'DQ.IL.0030'), true);
  assert.equal(filtrar(acuarelas, null, null).length, acuarelas.length);
});

test('carrusel: ventana de 5 con el activo siempre visible', () => {
  // inicio: primeros 5
  assert.deepEqual(ventanaCarrousel(0, 376).indices, [0, 1, 2, 3, 4]);
  // centro: el activo dentro de la ventana
  const centro = ventanaCarrousel(10, 376);
  assert.ok(centro.indices.includes(10));
  assert.equal(centro.indices.length, 5);
  // salto adelante: la ventana se desplaza lo justo
  const salto = ventanaCarrousel(50, 376);
  assert.ok(salto.indices.includes(50));
  // final: últimos 5
  assert.deepEqual(ventanaCarrousel(375, 376).indices, [371, 372, 373, 374, 375]);
  // colecciones cortas: ventana del tamaño de la colección
  const corta = ventanaCarrousel(2, 3);
  assert.deepEqual(corta.indices, [0, 1, 2]);
  // colección de una sola imagen
  assert.deepEqual(ventanaCarrousel(0, 1).indices, [0]);
});

test('derechos: DQ.LIC.0001 condicionada y aviso de uso interno', () => {
  const licencia = JSON.parse(
    readFileSync(join(PILOTO, 'licenses', 'DQ.LIC.0001.json'), 'utf-8'),
  );
  assert.equal(licencia.redistribution, 'condicionada');
  assert.equal(licencia.attribution_required, true);
  const paquete = JSON.parse(readFileSync(join(PILOTO, 'package.json'), 'utf-8'));
  assert.equal(paquete.files.museum_items.length, 7);
  // ninguna obra del Museo se presenta con id DQ.MA.*
  assert.ok(acuarelas.every((o) => !o.id.startsWith('DQ.MA.')));
});

test('etiqueta de capítulo: normalización verificable (romanos, ordinales y mojibake)', () => {
  assert.equal(etiquetaCapitulo('Capítulo VIII'), 'Capítulo VIII');
  assert.equal(etiquetaCapitulo('Capítulo Primero. Que trata…'), 'Capítulo PRIMERO');
  // lotes con mojibake cp1252 del EPUB fuente
  assert.equal(etiquetaCapitulo('CapÝtulo Primero. De lo que el cura…'), 'Capítulo PRIMERO');
  assert.equal(etiquetaCapitulo('CAP═TULO IV. Donde Sancho Panza…'), 'Capítulo IV');
  assert.equal(etiquetaCapitulo('Portadilla'), null);
});

test('sin avisos estructurales del manifiesto', () => {
  assert.equal(proyeccion.error, null);
  assert.equal(proyeccion.avisos.length, 0, `avisos: ${proyeccion.avisos.join('; ')}`);
});
