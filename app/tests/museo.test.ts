// Pruebas del Museo (issue #73, fase MVP): validación del adaptador del
// manifiesto, orden de lectura (027 precede a 026), filtros documentales,
// integridad de la colección, y control de derechos (DQ.LIC.0001 /
// DQ.MA.000028). Los metadatos NO se inventan: se comprueban contra el
// manifiesto y el paquete reales del repositorio.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  COLECCION_INICIAL,
  IDS_COLECCION_INICIAL,
  etiquetaCapitulo,
  filtrar,
  marcarColeccionInicial,
  opcionesFiltro,
  proyectar,
  tituloDe,
  type Manifiesto,
} from '../src/museo/obras.ts';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const MANIFIESTO = join(RAIZ, 'assets', 'ilustraciones_tusell', 'manifests', 'manifest_ilustraciones.json');

// El test lee el manifiesto DEL DISCO y usa la misma proyección que la app:
// valida los metadatos reales sin importar JSON por módulos nativos.
const manifiesto = JSON.parse(readFileSync(MANIFIESTO, 'utf-8')) as Manifiesto;
const acuarelas = marcarColeccionInicial(proyectar(manifiesto).acuarelas);

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
  assert.equal(porId.get('DQ.IL.0027')!.ordenLectura < porId.get('DQ.IL.0026')!.ordenLectura, true,
    'el orden de lectura del EPUB coloca 027 antes que 026');
  // la galería completa está ordenada por orden de lectura
  for (let i = 1; i < acuarelas.length; i++) {
    assert.ok(acuarelas[i - 1].ordenLectura <= acuarelas[i].ordenLectura,
      `la galería no está ordenada en la posición ${i}`);
  }
});

test('colección inicial: las cinco obras con títulos editoriales de Dirección', () => {
  const coleccion = acuarelas.filter((o) => o.esColeccionInicial);
  assert.equal(coleccion.length, 5);
  // mismas obras que la colección declarada (comparación por conjunto: el
  // ORDEN de la galería es el de lectura, no el numérico de los ficheros)
  assert.deepEqual(
    [...coleccion.map((o) => o.id)].sort(),
    [...IDS_COLECCION_INICIAL].sort(),
  );
  // en orden de lectura: 027 (45) → 026 (47) → 028 → 029 → 030
  assert.deepEqual(
    coleccion.map((o) => o.archivo),
    ['027.jpg', '026.jpg', '028.jpg', '029.jpg', '030.jpg'],
  );
  for (const obra of coleccion) {
    assert.equal(tituloDe(obra) === obra.id, false, `${obra.id} debe tener título editorial`);
    // el fichero físico está en el repositorio (presencia real)
    assert.equal(existsSync(join(RAIZ, 'assets', 'ilustraciones_tusell', 'acuarelas', obra.archivo)), true,
      `falta el fichero ${obra.archivo}`);
  }
  assert.equal(tituloDe(coleccion[0]), 'Encuentro con los frailes');
  assert.equal(COLECCION_INICIAL.titulos['DQ.IL.0026'], 'Embestida contra el molino');
});

test('etiquetas de capítulo derivadas del campo documental doc_capitulo', () => {
  assert.equal(etiquetaCapitulo('Capítulo VIII. Del buen suceso que el valeroso…'), 'Capítulo VIII');
  assert.equal(etiquetaCapitulo('Capítulo lxxiv. De cómo don Quijote cayó malo…'), 'Capítulo LXXIV');
  assert.equal(etiquetaCapitulo(''), null);
  assert.equal(etiquetaCapitulo('cubierta2'), null);
  const porId = new Map(acuarelas.map((o) => [o.id, o]));
  assert.deepEqual(porId.get('DQ.IL.0026')!.capitulos, ['Capítulo VIII']);
  assert.deepEqual(porId.get('DQ.IL.0030')!.capitulos, ['Capítulo IX']);
});

test('filtros por parte y capítulo: pareja por referencia, sin colisión entre partes', () => {
  const { partes, capitulos } = opcionesFiltro(acuarelas);
  assert.ok(partes.includes('I') && partes.includes('II'), `partes: ${partes}`);
  // el mismo número de capítulo existe en ambas partes: el filtro ofrece
  // opciones PAREJAS con su parte (sin asignaciones difusas)
  const valores = capitulos.map((c) => c.valor);
  assert.ok(valores.includes('I::Capítulo VIII'));
  assert.ok(valores.includes('II::Capítulo VIII'));
  assert.ok(capitulos.some((c) => c.etiqueta === 'Capítulo VIII · Parte I'));
  assert.ok(capitulos.some((c) => c.etiqueta === 'Capítulo VIII · Parte II'));
  // Parte I + Capítulo VIII = exactamente las cuatro del episodio de los molinos
  const cap8 = filtrar(acuarelas, 'I', 'I::Capítulo VIII');
  assert.deepEqual(
    cap8.map((o) => o.id).sort(),
    ['DQ.IL.0026', 'DQ.IL.0027', 'DQ.IL.0028', 'DQ.IL.0029'],
  );
  // Parte II + Capítulo VIII = tres obras distintas (no contamina Parte I)
  const cap8ii = filtrar(acuarelas, 'II', 'II::Capítulo VIII');
  assert.equal(cap8ii.length, 3);
  assert.equal(cap8ii.some((o) => cap8.includes(o)), false);
  // DQ.IL.0030 (combate con el vizcaíno) está en el Capítulo IX de la Parte I
  const cap9 = filtrar(acuarelas, 'I', 'I::Capítulo IX');
  assert.equal(cap9.some((o) => o.id === 'DQ.IL.0030'), true);
  // sin filtros: todo
  assert.equal(filtrar(acuarelas, null, null).length, acuarelas.length);
});

test('derechos: DQ.LIC.0001 condicionada y DQ.MA.000028 sin registrar', () => {
  // la licencia de las acuarelas sigue siendo de redistribución condicionada:
  // el Museo se declara uso interno y no autoriza publicación
  const licencia = JSON.parse(
    readFileSync(join(RAIZ, 'content', 'piloto', 'licenses', 'DQ.LIC.0001.json'), 'utf-8'),
  );
  assert.equal(licencia.redistribution, 'condicionada');
  // DQ.MA.000028 NO existe hoy: el Museo no crea MediaAssets ni vínculos
  // inventados; cita las obras por su id canónico DQ.IL.* del manifiesto
  const paquete = JSON.parse(
    readFileSync(join(RAIZ, 'content', 'piloto', 'package.json'), 'utf-8'),
  );
  const registro = 'media_assets/DQ.MA.000028.json';
  assert.equal(paquete.files.media_assets.includes(registro), false,
    'DQ.MA.000028 no debe registrarse sin decisión editorial');
  assert.equal(existsSync(join(RAIZ, 'content', 'piloto', 'media_assets', 'DQ.MA.000028.json')), false);
  // ninguna obra del Museo se presenta con id DQ.MA.*
  assert.ok(acuarelas.every((o) => !o.id.startsWith('DQ.MA.')));
});
