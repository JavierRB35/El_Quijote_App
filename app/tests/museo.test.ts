// Pruebas del Museo (issue #73 + maqueta oficial
// docs/MUSEO_REFERENCIA_VISUAL_APROBADA.md): validación del adaptador v2
// sobre el CATÁLOGO CANÓNICO (DQ.MA. function=museo + DQ.MUS.* + manifiesto
// EPUB), orden de lectura, colección inicial 026–030, filtros pareja
// parte+capítulo, citas verificadas contra el PG #2000 del disco, y derechos
// (DQ.LIC.0001/0002 condicionadas; DQ.MA.000028 sin registrar).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  COLECCION_INICIAL,
  etiquetaCapitulo,
  filtrar,
  opcionesFiltro,
  proyectar,
  tituloDe,
  type CitaObra,
  type Manifiesto,
  type Paquete,
} from '../src/museo/obras.ts';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const MANIFIESTO = join(RAIZ, 'assets', 'ilustraciones_tusell', 'manifests', 'manifest_ilustraciones.json');
const CITAS = join(RAIZ, 'assets', 'ilustraciones_tusell', 'manifests', 'citas_verificadas.json');
const PG = join(RAIZ, 'content', 'textos', 'gutenberg_2000', 'El_Quijote.txt');

const paquete = JSON.parse(
  readFileSync(join(RAIZ, 'content', 'piloto', 'package.json'), 'utf-8'),
) as Paquete;
// el adaptador consume la vista `categorias` del paquete (como hace el backend)
function categoriasDe(pkgManifest: Paquete): Paquete['categorias'] {
  const categorias: Record<string, Record<string, unknown>> = {};
  for (const [categoria, rutas] of Object.entries(pkgManifest.files)) {
    for (const rel of rutas) {
      const registro = JSON.parse(
        readFileSync(join(RAIZ, 'content', 'piloto', rel), 'utf-8'),
      );
      (categorias[categoria] ??= {})[(registro as { id: string }).id] = registro;
    }
  }
  return categorias;
}
const manifiesto = JSON.parse(readFileSync(MANIFIESTO, 'utf-8')) as Manifiesto;
const { obras } = proyectar({ categorias: categoriasDe(paquete) }, manifiesto);
const citas = JSON.parse(readFileSync(CITAS, 'utf-8')) as { obras: Record<string, CitaObra> };
const pg = readFileSync(PG, 'utf-8').replace(/\r\n/g, '\n');

const porId = new Map(obras.map((o) => [o.id, o]));
const colecion = obras.filter((o) => o.esColeccionInicial);

test('catálogo: 376 acuarelas (7 con ficha editorial MUS, 369 pendientes), IDs únicos', () => {
  assert.equal(obras.length, 376, `obras: ${obras.length}`);
  assert.equal(new Set(obras.map((o) => o.id)).size, 376, 'IDs duplicados');
  const fichadas = obras.filter((o) => o.estado === 'fichada');
  const pendientes = obras.filter((o) => o.estado === 'pendiente');
  // fichada = con ficha editorial DQ.MUS.* (título curado + contexto +
  // capítulos documentados); las demás se presentan como pendientes
  assert.equal(fichadas.length, 7, `fichadas: ${fichadas.length}`);
  assert.equal(pendientes.length, 369, `pendientes: ${pendientes.length}`);
  assert.ok(fichadas.every((o) => o.id.startsWith('DQ.MA.') && o.musId?.startsWith('DQ.MUS.')));
  // TODAS las obras —fichadas o no— tienen ficha de imagen resuelta:
  // atribución, procedencia, licencia y huella (regla rectora del expediente)
  assert.ok(obras.every((o) => o.atribucion && o.procedencia && o.licenciaId && o.sha256));
  assert.ok(obras.every((o) => o.uri.startsWith('assets://ilustraciones_tusell/acuarelas/')));
  assert.ok(obras.every((o) => o.licenciaId === 'DQ.LIC.0001'));
  assert.ok(obras.every((o) => o.alt.length > 0));
});

test('orden de lectura del EPUB: 027 precede a 026; la galería está ordenada', () => {
  const m27 = porId.get('DQ.MA.000027')!;
  const m26 = porId.get('DQ.MA.000026')!;
  assert.equal(m27.ordenLectura! < m26.ordenLectura!, true);
  for (let i = 1; i < obras.length; i++) {
    assert.ok(obras[i - 1].ordenLectura! <= obras[i].ordenLectura!, `desorden en ${i}`);
  }
});

test('colección inicial: las cinco obras del episodio con sus títulos de Dirección', () => {
  assert.equal(colecion.length, 5);
  assert.deepEqual(
    [...colecion.map((o) => o.numAcuarela)].sort((a, b) => a - b),
    [26, 27, 28, 29, 30],
  );
  // orden de lectura: 027 → 026 → 028 → 029 → 030
  assert.deepEqual(
    colecion.map((o) => o.numAcuarela),
    [27, 26, 28, 29, 30],
  );
  // títulos editoriales de Dirección (no factuales más allá del alt)
  assert.equal(tituloDe(colecion[0]), 'Encuentro con los frailes');
  assert.equal(tituloDe(colecion[1]), 'Embestida contra el molino');
  // presencia física de los cinco ficheros
  for (const obra of colecion) {
    assert.equal(
      existsSync(join(RAIZ, 'assets', 'ilustraciones_tusell', 'acuarelas', `${String(obra.numAcuarela).padStart(3, '0')}.jpg`)),
      true,
      `falta ${obra.numAcuarela}.jpg`,
    );
  }
  // 2 con ficha editorial MUS (027, 029) y 3 pendientes (026, 028, 30)
  assert.deepEqual(
    colecion.filter((o) => o.estado === 'fichada').map((o) => o.numAcuarela),
    [27, 29],
  );
  assert.deepEqual(
    colecion.filter((o) => o.estado === 'pendiente').map((o) => o.numAcuarela),
    [26, 28, 30],
  );
  // la ficha editorial de 027 aporta el contexto documentado (Explicación)
  assert.equal(
    porId.get('DQ.MA.000027')!.contexto,
    'Los «bultos negros» que don Quijote toma por encantadores con una princesa hurtada (I, 8).',
  );
  // atribución con grado documentada
  assert.match(porId.get('DQ.MA.000027')!.atribucion!, /Salvador Tusell/);
  assert.equal(porId.get('DQ.MA.000027')!.atribucionEstado, 'atribuida');
});

test('etiquetas de capítulo derivadas del campo documental', () => {
  assert.equal(etiquetaCapitulo('Capítulo VIII. Del buen suceso…'), 'Capítulo VIII');
  assert.equal(etiquetaCapitulo(''), null);
  assert.deepEqual(porId.get('DQ.MA.000026')!.capitulos, ['Capítulo VIII']);
});

test('filtros pareja parte+capítulo: sin colisión entre partes', () => {
  const { partes, capitulos } = opcionesFiltro(obras);
  assert.ok(partes.includes('I') && partes.includes('II'));
  const valores = capitulos.map((c) => c.valor);
  assert.ok(valores.includes('I::Capítulo VIII') && valores.includes('II::Capítulo VIII'));
  const cap8 = filtrar(obras, 'I', 'I::Capítulo VIII');
  assert.deepEqual(
    cap8.filter((o) => o.estado === 'fichada').map((o) => o.numAcuarela).sort((a, b) => a! - b!),
    [27, 29],
  );
  assert.deepEqual(
    cap8.filter((o) => o.estado === 'pendiente').map((o) => o.numAcuarela).sort((a, b) => a! - b!),
    [26, 28],
  );
  // sin colisión: Parte II + Cap VIII no devuelve obras de Parte I
  const cap8ii = filtrar(obras, 'II', 'II::Capítulo VIII');
  assert.equal(cap8ii.some((o) => cap8.includes(o)), false);
  assert.equal(filtrar(obras, null, null).length, 376);
});

test('citas verificadas: cada cita marcada verificada existe verbatim en el PG del disco', () => {
  const obrasColeccion = colecion.map((o) => o.citaId);
  // la colección usa el derivado; 026 y 028 verificadas, 027/029/030 pendientes
  assert.equal(citas.obras['DQ.IL.0026']?.verificada, true);
  assert.equal(citas.obras['DQ.IL.0028']?.verificada, true);
  assert.equal(citas.obras['DQ.IL.0027']?.verificada, false);
  assert.equal(citas.obras['DQ.IL.0029']?.verificada, false);
  // 030: su alt es descriptivo → el derivado la marca según correspondencia;
  // aceptamos verificada=true SOLO si la cita existe verbatim en el PG
  for (const [cid, c] of Object.entries(citas.obras)) {
    if (!c.verificada) continue;
    const [a, b] = c.offset ?? [];
    assert.ok(a !== undefined && b !== undefined, `${cid}: cita verificada sin offset`);
    assert.equal(pg.slice(a, b).replace(/\s+/g, ' ').trim(), c.cita?.replace(/\s+/g, ' ').trim(),
      `${cid}: la cita no coincide verbatim con el PG en su offset`);
  }
  // la colección referencia exactamente las citas de sus cinco obras
  assert.deepEqual(
    [...obrasColeccion].sort(),
    ['DQ.IL.0026', 'DQ.IL.0027', 'DQ.IL.0028', 'DQ.IL.0029', 'DQ.IL.0030'],
  );
});

test('derechos: licencias condicionadas y DQ.MA.000028 sin registrar', () => {
  assert.ok(obras.every((o) => o.licenciaId === 'DQ.LIC.0001'));
  const lic1 = JSON.parse(readFileSync(join(RAIZ, 'content', 'piloto', 'licenses', 'DQ.LIC.0001.json'), 'utf-8'));
  assert.equal(lic1.redistribution, 'condicionada');
  const registro = 'media_assets/DQ.MA.000028.json';
  assert.equal(paquete.files.media_assets.includes(registro), false,
    'DQ.MA.000028 no debe registrarse sin decisión editorial');
  assert.equal(existsSync(join(RAIZ, 'content', 'piloto', 'media_assets', 'DQ.MA.000028.json')), false);
  // la maqueta de referencia está en el repositorio con sus huellas
  assert.equal(existsSync(join(RAIZ, 'docs', 'referencias', 'museo', 'MUSEO_REFERENCIA_VISUAL_OFICIAL.png')), true);
});

test('COLECCION_INICIAL expone los títulos y la descripción de Dirección', () => {
  assert.equal(COLECCION_INICIAL.titulos.DQ_IL_026, 'Embestida contra el molino');
  assert.match(COLECCION_INICIAL.descripcion, /Salvador Tusell/);
  assert.match(COLECCION_INICIAL.descripcion, /orden sigue la lectura/);
});
