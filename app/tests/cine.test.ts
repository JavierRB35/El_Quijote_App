// Pruebas del sistema visual inmersivo (encargo P1): resolución del plano
// (elegibilidad E-1…E-4 fail-closed, persistencia R-V3, neutro legítimo) y
// validación de los metadatos de encuadre versionados (zonas seguras).
// node --test, sin DOM ni Tauri (lógica pura).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import {
  elegibleDeEscena,
  encuadreDe,
  resolverPlano,
  versionEncuadres,
  type MediaAsset,
} from '../src/cine/resolverPlano.ts';
import { planoDePosicion, type ItemLectura } from '../src/historia/logica.ts';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

function medio(id: string, funcion: string, spoiler = 'ninguno'): MediaAsset {
  return {
    id,
    function: funcion,
    media_class: 'RECREACION_IA',
    logical_uri: `assets://scenes/${id}.webp`,
    alt: `alt ${id}`,
    spoiler_level: spoiler,
  };
}

const PRE = medio('DQ.MA.900005', 'pre_pregunta');
const PRE2 = medio('DQ.MA.900030', 'pre_pregunta');
const POST = medio('DQ.MA.900006', 'post_desenlace', 'leve');
const REVELADOR = medio('DQ.MA.900099', 'pre_pregunta', 'revelador');
const MEDIOS = {
  [PRE.id]: PRE,
  [PRE2.id]: PRE2,
  [POST.id]: POST,
  [REVELADOR.id]: REVELADOR,
};

const escenaCon = (mediaIds: string[]) => ({
  id: 'S01',
  media_ids: mediaIds,
});

const beatCon = (ids: string[]) => ({
  visual_asset_ids: ids,
  scene_id: 'S01',
});

// ---------- resolverPlano: E-1 declaración del beat ----------

test('el activo declarado por el beat es el plano (E-1), aunque la escena tenga otros', () => {
  const r = resolverPlano({
    beat: beatCon([PRE2.id]),
    escena: escenaCon([PRE.id, POST.id]),
    medios: MEDIOS,
    declarados: new Set([PRE2.id]),
    planoVigente: null,
  });
  assert.equal(r.activo?.id, PRE2.id);
  assert.equal(r.causa, 'declarado_en_beat');
});

// ---------- resolverPlano: E-2 respaldo de escena con fail-closed ----------

test('pre_pregunta de la escena respalda al beat vacío (E-2 favorable)', () => {
  const r = resolverPlano({
    beat: beatCon([]),
    escena: escenaCon([PRE.id, POST.id]),
    medios: MEDIOS,
    declarados: new Set(),
    planoVigente: null,
  });
  assert.equal(r.activo?.id, PRE.id); // el post_desenlace nunca salta el filtro
  assert.equal(r.causa, 'de_escena');
});

test('post_desenlace NUNCA se muestra por herencia de escena (fail-closed E-4)', () => {
  const r = resolverPlano({
    beat: beatCon([]),
    escena: escenaCon([POST.id]),
    medios: MEDIOS,
    declarados: new Set(),
    planoVigente: null,
  });
  assert.equal(r.activo, null);
  assert.equal(r.causa, 'neutro_fail_closed');
});

test('post_desenlace declarado por el beat SÍ se muestra (E-1)', () => {
  const r = resolverPlano({
    beat: beatCon([POST.id]),
    escena: escenaCon([]),
    medios: MEDIOS,
    declarados: new Set([POST.id]),
    planoVigente: null,
  });
  assert.equal(r.activo?.id, POST.id);
});

test('spoiler_level revelador queda excluido de la cascada', () => {
  assert.equal(elegibleDeEscena(REVELADOR, new Set()), false);
  const r = resolverPlano({
    beat: beatCon([]),
    escena: escenaCon([REVELADOR.id]),
    medios: MEDIOS,
    declarados: new Set(),
    planoVigente: null,
  });
  assert.equal(r.activo, null);
});

test('elegibilidad desconocida (función ajena al Modo Historia) se admite con cautela solo como respaldo declarado', () => {
  // Sin señales inequívocas y sin declaración: fail-closed.
  const duda = medio('DQ.MA.900888', 'referencia');
  assert.equal(elegibleDeEscena(duda, new Set()), true); // respaldo de escena con cautela
  // Declarado: siempre elegible (la colocación editorial es el anclaje).
  assert.equal(elegibleDeEscena(duda, new Set(['DQ.MA.900888'])), true);
});

// ---------- resolverPlano: persistencia R-V3 y frontera R-V4 ----------

test('beat vacío persiste el plano vigente de la misma escena (R-V3)', () => {
  const r = resolverPlano({
    beat: beatCon([]),
    escena: escenaCon([PRE.id]),
    medios: MEDIOS,
    declarados: new Set(),
    planoVigente: PRE,
  });
  assert.equal(r.activo?.id, PRE.id);
  assert.equal(r.causa, 'persistencia');
});

test('el plano de otra escena nunca se arrastra (R-V4): neutro, no herencia', () => {
  const r = resolverPlano({
    beat: beatCon([]),
    escena: escenaCon([]), // nueva escena sin medios
    medios: MEDIOS,
    declarados: new Set(),
    planoVigente: PRE, // vigente de la escena ANTERIOR
  });
  assert.equal(r.activo, null);
  assert.equal(r.causa, 'neutro_editorial');
});

test('escena sin medios ni beat declarado: neutro editorial legítimo (sin fallo)', () => {
  const r = resolverPlano({
    beat: beatCon([]),
    escena: escenaCon([]),
    medios: MEDIOS,
    declarados: new Set(),
    planoVigente: null,
  });
  assert.equal(r.activo, null);
  assert.equal(r.causa, 'neutro_editorial');
});

// ---------- planoDePosicion: recomputación determinista (R-V10) ----------

function itemDe(
  items: ItemLectura[],
  escena: { id: string; media_ids: string[] },
  beat: { id: string; visual_asset_ids: string[] },
): ItemLectura {
  const previo = items.length;
  const escenaParcial = { ...escena, id: escena.id };
  const beatParcial = {
    scene_id: escena.id,
    order: previo,
    kind: 'NARRACION' as const,
    utterances: [],
    manual_advance_allowed: true,
    replay_allowed: true,
    reduced_motion_fallback: true,
    ...beat,
  };
  return {
    posicion: previo,
    escena: escenaParcial as unknown as ItemLectura['escena'],
    escenaIdx: 0,
    beat: beatParcial as unknown as ItemLectura['beat'],
    beatIdx: 0,
    intervencion: {
      utterance_id: `I${previo}`,
      speaker: { tipo: 'narrador' },
      texto_visible: 'texto',
      text_kind: 'CITA_LITERAL',
    },
    intervencionIdx: 0,
  };
}

test('secuencia completa: declaración → persistencia → frontera → neutro (sin herencia ajena)', () => {
  const items: ItemLectura[] = [];
  const s01 = { id: 'S01', media_ids: [PRE.id, POST.id] };
  const s02 = { id: 'S02', media_ids: [] };
  items.push(itemDe(items, s01, { id: 'B1', visual_asset_ids: [PRE.id] })); // I0: declara PRE
  items.push(itemDe(items, s01, { id: 'B2', visual_asset_ids: [] }));       // I1: persiste PRE
  items.push(itemDe(items, s02, { id: 'B3', visual_asset_ids: [] }));       // I2: frontera → neutro

  assert.deepEqual(planoDePosicion(items, 0, MEDIOS).activo?.id, PRE.id);
  assert.equal(planoDePosicion(items, 1, MEDIOS).causa, 'persistencia');
  const r2 = planoDePosicion(items, 2, MEDIOS);
  assert.equal(r2.activo, null);
  assert.equal(r2.causa, 'neutro_editorial');
});

test('la activación post-desenlace llega solo cuando un beat la declara (umbral por datos)', () => {
  const items: ItemLectura[] = [];
  const s01 = { id: 'S01', media_ids: [PRE.id, POST.id] };
  items.push(itemDe(items, s01, { id: 'B1', visual_asset_ids: [] }));       // I0: PRE por escena
  items.push(itemDe(items, s01, { id: 'B2', visual_asset_ids: [] }));       // I1: persiste
  items.push(itemDe(items, s01, { id: 'B3', visual_asset_ids: [POST.id] })); // I2: el guion declara el post

  assert.equal(planoDePosicion(items, 0, MEDIOS).activo?.id, PRE.id);
  assert.equal(planoDePosicion(items, 1, MEDIOS).activo?.id, PRE.id);
  assert.equal(planoDePosicion(items, 2, MEDIOS).activo?.id, POST.id);
  // Y retroceder revoca: determinista en ambos sentidos (EF-AV-08).
  assert.equal(planoDePosicion(items, 1, MEDIOS).activo?.id, PRE.id);
});

// ---------- encuadres.json: versionado, cobertura y coherencia ----------

test('encuadres versionados y coherentes con el manifiesto de escenas', () => {
  assert.equal(versionEncuadres(), 2);
  const doc = JSON.parse(
    readFileSync(path.join(RAIZ, 'app/src/cine/encuadres.json'), 'utf-8'),
  ) as { version: number; encuadres: { media_id: string; lado_texto: string; region_critica: Record<string, number> }[] };

  for (const e of doc.encuadres) {
    assert.ok(['derecha', 'izquierda'].includes(e.lado_texto), `lado inválido en ${e.media_id}`);
    const r = e.region_critica;
    for (const v of [r.x, r.y, r.w, r.h]) {
      assert.ok(v >= 0 && v <= 1, `región fuera de rango en ${e.media_id}`);
    }
  }

  // Coherencia con preferred_overlay_side del manifiesto donde exista pareja.
  const manifiesto = JSON.parse(
    readFileSync(path.join(RAIZ, 'assets/scenes/manifest.json'), 'utf-8'),
  ) as { images: { candidate_media_id?: string; preferred_overlay_side?: string }[] };
  const ladoManifiesto = new Map(
    manifiesto.images
      .filter((i) => i.candidate_media_id)
      .map((i) => [i.candidate_media_id!.replace('DQ.MED.', 'DQ.MA.'), i.preferred_overlay_side ?? 'right']),
  );
  for (const e of doc.encuadres) {
    const esperado = ladoManifiesto.get(e.media_id);
    if (esperado) {
      assert.equal(
        e.lado_texto,
        esperado === 'left' ? 'izquierda' : 'derecha',
        `lado divergente del manifiesto en ${e.media_id}`,
      );
    }
  }
});
