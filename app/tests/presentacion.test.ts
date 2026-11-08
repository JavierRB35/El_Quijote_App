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
import { textoParaPantalla } from '../src/historia/presentacion.ts';

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
  const dialogo = 'dijo a su escudero:\n\n— La ventura va guiando nuestras cosas\nmejor de lo que acertáramos a desear.\n\n— ¿Qué gigantes? —dijo Sancho Panza.';
  const presentado = textoParaPantalla(dialogo);
  assert.equal(presentado.includes('\n— La ventura va guiando'), true);
  assert.equal(presentado.includes('\n— ¿Qué gigantes?'), true);
  // dentro del parlamento, el corte mecánico se une
  assert.equal(presentado.includes('nuestras cosas\nmejor'), false);
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

test('idempotencia: presentar dos veces no cambia nada', () => {
  for (const { id, texto } of INTERVENCIONES) {
    const una = PRESENTADAS.get(id)!;
    assert.equal(textoParaPantalla(una), una, `${id}: no idempotente`);
  }
  const sintetico = 'bloque uno\ncontinuación del bloque uno\n\nbloque dos\n— Réplica breve.';
  const una = textoParaPantalla(sintetico);
  assert.equal(textoParaPantalla(una), una);
});
