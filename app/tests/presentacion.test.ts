// Regresión P0 (saltos artificiales en Modo Historia): la transformación de
// presentación une los cortes mecánicos de maquetación y PRESERVA párrafos,
// parlamentos y versos, sin alterar una sola palabra o signo. Verificada
// contra las 16 intervenciones REALES de los molinos (DQ.BEAT.000001–000009)
// y contra casos sintéticos de cada estructura literaria.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { textoParaPantalla } from '../src/presentacion.ts';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIR_BEATS = join(RAIZ, 'content', 'piloto', 'beats');

function normalizado(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

function beatsReales(): { id: string; texto: string }[] {
  const salida: { id: string; texto: string }[] = [];
  for (const nombre of readdirSync(DIR_BEATS).sort()) {
    if (!nombre.endsWith('.json')) continue;
    const beat = JSON.parse(readFileSync(join(DIR_BEATS, nombre), 'utf-8'));
    for (const u of beat.utterances) {
      salida.push({ id: u.utterance_id, texto: u.texto_visible });
    }
  }
  return salida;
}

const INTERVENCIONES = beatsReales();
const PRESENTADAS = new Map(INTERVENCIONES.map((i) => [i.id, textoParaPantalla(i.texto)]));

test('identidad íntegra: palabras y signos intactos en las 16 intervenciones reales', () => {
  assert.equal(INTERVENCIONES.length, 16);
  for (const { id, texto } of INTERVENCIONES) {
    assert.equal(normalizado(PRESENTADAS.get(id)!), normalizado(texto),
      `${id}: la presentación alteró palabras o signos`);
  }
});

test('I14 se lee como prosa natural: sin los cortes artificiales denunciados', () => {
  const i14 = PRESENTADAS.get('DQ.INT.000014')!;
  assert.equal(i14.includes('cosas de la guerra,\nmás que otras'), false,
    'I14: salto artificial en «cosas de la guerra, / más que otras»');
  assert.equal(i14.includes('el aposento y los\nlibros'), false,
    'I14: salto artificial en «el aposento y los / libros»');
  assert.equal(i14.includes('la gloria de su\nvencimiento'), false,
    'I14: salto artificial en «la gloria de su / vencimiento»');
  assert.equal(i14.includes('cosas de la guerra, más que otras'), true);
  assert.equal(i14.includes('el aposento y los libros'), true);
  assert.equal(i14.includes('la gloria de su vencimiento'), true);
});

test('I01–I16: ninguna línea cortada por maquetación (ajuste automático del ancho)', () => {
  // Todo salto simple que quede en la presentación debe ser semántico
  // (verso o frontera de bloque); un corte mecánico se reconoce porque la
  // primera palabra de la línea siguiente NO cabía en el ancho de PG (~76).
  for (const { id } of INTERVENCIONES) {
    const t = PRESENTADAS.get(id)!;
    for (const bloque of t.split('\n\n')) {
      const lineas = bloque.split('\n').map((l) => l.trim());
      for (let i = 0; i < lineas.length - 1; i++) {
        const l1 = lineas[i];
        const p2 = /\S+/.exec(lineas[i + 1])?.[0] ?? '';
        const mecanico = l1.length + 1 + p2.length >= 76;
        assert.equal(mecanico, false,
          `${id}: queda un corte mecánico («…${l1.slice(-24)} ⏎ ${p2}…»)`);
      }
    }
  }
});

test('prosa envuelta se une en un párrafo continuo (ajuste por CSS, no por saltos)', () => {
  const prosa = 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho\n' +
    'tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua,\n' +
    'rocín flaco y galgo corredor.';
  const presentado = textoParaPantalla(prosa);
  assert.equal(presentado.includes('\n'), false);
  assert.equal(normalizado(presentado), normalizado(prosa));
});

test('los párrafos auténticos (\n\n) se conservan', () => {
  const dos = 'Primero dijo esto:\n\n— Y entonces respondió aquello, con más\npalabras de las necesarias.';
  const presentado = textoParaPantalla(dos);
  assert.equal(presentado.split('\n\n').length, 2);
  assert.equal(normalizado(presentado), normalizado(dos));
});

test('los cambios de interlocutor (—) conservan su salto', () => {
  // forma real del corpus: los parlamentos largos envuelven a ~76 col. y sus
  // cortes son mecánicos (los pares 2×cortas×estrechos del fichero son solo
  // encabezados y dísticos — población medida en PR #68)
  const dialogo = 'dijo a su escudero:\n\n— La ventura va guiando nuestras cosas mejor de lo que\nacertáramos a desear, porque ves allí, amigo Sancho Panza, donde se\ndescubren treinta.\n\n— ¿Qué gigantes? —dijo Sancho Panza.';
  const presentado = textoParaPantalla(dialogo);
  assert.equal(presentado.includes('\n— La ventura va guiando'), true);
  assert.equal(presentado.includes('\n— ¿Qué gigantes?'), true);
  // dentro del parlamento, los cortes mecánicos se unen
  assert.equal(presentado.includes('de lo que\nacertáramos'), false);
  assert.equal(presentado.includes('amigo Sancho Panza, donde se\ndescubren'), false);
});

test('versos y estrofas se preservan línea a línea', () => {
  const soneto = 'B. ¿Cómo estáis, Rocinante, tan delgado?\nR. Porque nunca se come, y se trabaja.\nB. Pues, ¿qué es de la cebada y de la paja?\nR. No me deja mi amo ni un bocado.\nB. Andá, señor, que estáis muy mal criado,\npues vuestra lengua de asno al amo ultraja.\nR. Asno se es de la cuna a la mortaja.\n¿Queréislo ver? Miraldo enamorado.';
  const presentado = textoParaPantalla(soneto);
  assert.equal(presentado.split('\n').length, 8,
    'el soneto debe conservar sus 8 líneas');
  assert.equal(presentado.includes('tan delgado?\nR. Porque'), true);
});

test('corte estrecho a mitad de frase en prosa se une (no es verso)', () => {
  const prosa = 'que también he oído decir que es el mejor de todos los libros que de este\ngénero se han compuesto; y así, como a único\nen su arte, se debe perdonar.';
  const presentado = textoParaPantalla(prosa);
  assert.equal(presentado.includes('\n'), false,
    'el corte estrecho de un párrafo de prosa debe unirse');
});

test('pareado auténtico (dístico) conserva su separación', () => {
  // señal verificable: L2 puntada, L1 sin cierre de frase ni frase interior
  const pareado = 'Y como del Catay recibió el cetro,\nquizá otro cantará con mejor plectro.';
  const presentado = textoParaPantalla(pareado);
  assert.equal(presentado, pareado, 'el dístico debe conservar su salto');
  // del fichero fuente: epitafio latino en cita
  const latino = 'Pallida mors aequo pulsat pede pauperum tabernas,\nRegumque turres.';
  assert.equal(textoParaPantalla(latino), latino);
  // romance con rima
  const romance = 'No rebuznaron en balde\nel uno y el otro alcalde.';
  assert.equal(textoParaPantalla(romance), romance);
});

test('pareado ambiguo se une y los encabezados de dos líneas no son poesía', () => {
  // L1 cierra una frase (punto final): no hay señal de verso
  const frases = 'Terminó la primera frase. Y aquí seguía\ncon más contenido de la segunda.';
  assert.equal(textoParaPantalla(frases).includes('\n'), false,
    'un par con frase cerrada en la primera línea es prosa');
  // frase cerrada DENTRO de la primera línea
  const interior = 'Terminó la primera frase. Y aquí seguía, sin más\nremedio, hacia la venta.';
  assert.equal(textoParaPantalla(interior).includes('\n'), false);
  // encabezado de capítulo partido por el compositor: L2 sin puntuación
  const encabezado = 'Que trata de la condición y ejercicio del famoso\nhidalgo don Quijote de la Mancha';
  assert.equal(textoParaPantalla(encabezado).includes('\n'), false,
    'el encabezado de dos líneas no es un pareado');
  // prosa corta con corte MECÁNICO (la palabra no cabía): se une
  const mecanico = 'un fragmento de prosa que continúa más allá del ancho disponible de la línea\nsiguiente corta.';
  assert.equal(textoParaPantalla(mecanico).includes('\n'), false);
});

test('idempotencia: presentar dos veces no cambia nada', () => {
  for (const { id, texto } of INTERVENCIONES) {
    const una = PRESENTADAS.get(id)!;
    assert.equal(textoParaPantalla(una), una, `${id}: no idempotente`);
  }
  const sintetico = 'bloque uno\ncontinuación del bloque uno\n\nbloque dos\n— Réplica breve.';
  const una = textoParaPantalla(sintetico);
  assert.equal(textoParaPantalla(una), una);
});

test('poema de arte menor (estrofa octosilábica) conserva cada verso', () => {
  const romance = 'En un lugar de la Mancha,\nde cuyo nombre no quiero acordarme,\nno ha mucho tiempo que vivía\nun hidalgo de los de lanza\nen astillero, adarga antigua.';
  const presentado = textoParaPantalla(romance);
  assert.equal(presentado.split('\n').length, 5,
    'la estrofa debe conservar sus 5 versos');
  assert.equal(presentado.includes('\n\n'), false,
    'la estrofa no debe partirse en párrafos');
});

test('un encabezado de capítulo incrustado se respeta como bloque propio', () => {
  const conEncabezado = 'Capítulo XXI. Que trata de la alta aventura y rica ganancia del yelmo de Mambrino\n\nEn esto, comenzó a llover un poco, y quisiera Sancho que se entraran en el molino de los batanes.';
  const presentado = textoParaPantalla(conEncabezado);
  assert.equal(presentado.split('\n\n').length, 2,
    'el encabezado debe quedar como bloque separado del narrativo');
  assert.equal(presentado.includes('Capítulo XXI. Que trata de la alta aventura y rica ganancia del yelmo de Mambrino\n\nEn esto'), true);
});

test('evidencia de pregunta (Aventura) con párrafos y parlamentos se presenta intacta', () => {
  const cita = 'como a único\nen su arte, se debe perdonar.\n\n— Así es verdad —dijo el cura—, y por esa razón se le otorga la vida por\nahora.';
  const presentado = textoParaPantalla(cita);
  assert.equal(presentado.split('\n\n').length, 2, 'el parlamento conserva su párrafo');
  assert.equal(presentado.includes('\n— Así es verdad'), true);
  assert.equal(presentado.includes('vida por\nahora.'), false,
    'el corte mecánico interno del parlamento se une');
  // el primer bloque cumple la señal del dístico (L2 puntada, L1 sin
  // cierre): la presentación lo conserva para revisión editorial
  assert.equal(presentado.includes('como a único\nen su arte'), true);
});
