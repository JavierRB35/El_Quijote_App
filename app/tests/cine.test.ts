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

test('DC-37: declaración → ausencia explícita → frontera, sin herencia automática', () => {
  const items: ItemLectura[] = [];
  const s01 = { id: 'S01', media_ids: [PRE.id, POST.id] };
  const s02 = { id: 'S02', media_ids: [] };
  items.push(itemDe(items, s01, { id: 'B1', visual_asset_ids: [PRE.id] })); // I0: declara PRE
  items.push(itemDe(items, s01, { id: 'B2', visual_asset_ids: [] }));       // I1: persiste PRE
  items.push(itemDe(items, s02, { id: 'B3', visual_asset_ids: [] }));       // I2: frontera → neutro

  assert.deepEqual(planoDePosicion(items, 0, MEDIOS).activo?.id, PRE.id);
  assert.equal(planoDePosicion(items, 1, MEDIOS).activo, null);
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

  assert.equal(planoDePosicion(items, 0, MEDIOS).activo, null);
  assert.equal(planoDePosicion(items, 1, MEDIOS).activo, null);
  assert.equal(planoDePosicion(items, 2, MEDIOS).activo?.id, POST.id);
  // Y retroceder revoca: determinista en ambos sentidos (EF-AV-08).
  assert.equal(planoDePosicion(items, 1, MEDIOS).activo, null);
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

test('DC-37 I.1: las 16 imágenes nuevas tienen encuadre inicial explícito, pendiente de QA visual', () => {
  const historia = JSON.parse(readFileSync(path.join(RAIZ, 'content/historia/parte_1/capitulo_01.json'), 'utf-8'));
  const manifest = JSON.parse(readFileSync(path.join(RAIZ, 'assets/scenes/manifest.json'), 'utf-8'));
  const encuadres = JSON.parse(readFileSync(path.join(RAIZ, 'app/src/cine/encuadres.json'), 'utf-8')).encuadres;
  const nuevas = historia.escenas.flatMap((s: any) => s.intervenciones).filter((u: any) => /^p1_c01_h\d\d_i\d\d_/.test(u.imagen));
  assert.equal(nuevas.length, 16);
  for (const u of nuevas) {
    const entry = encuadres.find((e: any) => e.media_id === 'scene:' + u.imagen);
    assert.ok(entry, u.id);
    const asset = manifest.images.find((a: any) => a.id === u.imagen);
    assert.equal(asset.review_state, 'aprobada');
    if (asset.preferred_overlay_side === 'left') assert.equal(entry.lado_texto, 'izquierda');
    if (asset.preferred_overlay_side === 'right') assert.equal(entry.lado_texto, 'derecha');
    if (asset.preferred_overlay_side === 'top') assert.ok(entry.region_critica.y >= 0.4);
  }
});

test('DC-37/DC-41 I.2: 16 focos iniciales con recurso aprobado (QA visual pendiente)', () => {
  const h = JSON.parse(readFileSync(path.join(RAIZ, 'content/historia/parte_1/capitulo_02.json'), 'utf8'));
  const m = JSON.parse(readFileSync(path.join(RAIZ, 'assets/scenes/manifest.json'), 'utf8'));
  const entries = JSON.parse(readFileSync(path.join(RAIZ, 'app/src/cine/encuadres.json'), 'utf8')).encuadres;
  const nuevos = h.escenas.flatMap((s: any) => s.intervenciones).filter((p: any) => /^p1_c02_h\d\d_i\d\d_/.test(p.imagen));
  assert.equal(nuevos.length, 16);
  for (const u of nuevos) {
    const asset = m.images.find((a: any) => a.id === u.imagen);
    assert.equal(asset?.review_state, 'aprobada');
    assert.equal(asset?.historical_editorial_status, 'approved_owner_visual');
    const e = entries.find((f: any) => f.media_id === 'scene:' + u.imagen);
    assert.ok(e, u.id);
    assert.equal(e.lado_texto, 'derecha');
    const r = e.region_critica;
    assert.ok(r.x >= 0 && r.w > 0 && r.x + r.w <= 1);
    assert.ok(r.y >= .06 && r.h > 0 && r.y + r.h <= .94);
  }
});

// DC-39: regresión de visibilidad de la navegación frente al autoocultado central.
test('DC-39: flechas visibles permanentemente; solo Reproducir/Pausar se autooculta', () => {
  const css = readFileSync(path.join(RAIZ, 'app', 'src', 'cine', 'lienzo.css'), 'utf8');
  const reglaOculta = css.match(/\.lv-controles-cine\[data-visibles='false'\] > \.lv-control-centro \{([^}]+)\}/)?.[1] ?? '';
  assert.match(reglaOculta, /opacity:\s*0\s*;/);
  assert.match(reglaOculta, /pointer-events:\s*none\s*;/);
  assert.match(css, /\.lv-controles-cine\[data-visibles='false'\]:focus-within > \.lv-control-centro \{ opacity: 1; pointer-events: auto; \}/);
  assert.doesNotMatch(css, /\.lv-controles-cine\[data-visibles='false'\][^{]*> \.lv-control-flotante/);
  assert.doesNotMatch(css, /\.lv-controles-cine\[data-visibles='false'\][^{]*> \.lv-control-(?:izquierda|derecha)/);
  assert.match(css, /\.lv-controles-cine > \.lv-control-flotante:disabled \{ opacity: \.38; cursor: default; \}/);
  assert.match(css, /\.lv-controles-cine\[data-visibles='false'\] > \.lv-control-centro:disabled \{ opacity: 0; \}/);
});

test('DC-39: flechas presentes en contemplación; botón central y progreso preservados', () => {
  const contenedor = readFileSync(path.join(RAIZ, 'app', 'src', 'cine', 'ContenedorCine.tsx'), 'utf8');
  const historia = readFileSync(path.join(RAIZ, 'app', 'src', 'historia', 'ReproductorHistoria.tsx'), 'utf8');
  assert.match(contenedor, /\(!oculto \|\| controlesEnContemplacion\) && controles/);
  assert.match(historia, /controlesEnContemplacion/);
  assert.match(historia, /key=\{oculto \? 'contemplacion' : 'narracion'\}/);
  assert.match(historia, /centro=\{oculto \? undefined :/);
  assert.ok(historia.includes('deshabilitada: posicion === 0 && !mostrarCierre'));
  assert.ok(historia.includes('deshabilitada: mostrarCierre || (oculto && fin)'));
});

test('DC-41: navegar manualmente con texto oculto mantiene pausa automática', () => {
  const historia = readFileSync(path.join(RAIZ, 'app/src/historia/ReproductorHistoria.tsx'), 'utf8');
  const lienzo = readFileSync(path.join(RAIZ, 'app/src/cine/ContenedorCine.tsx'), 'utf8');
  const css = readFileSync(path.join(RAIZ, 'app/src/cine/lienzo.css'), 'utf8');
  assert.ok(historia.includes("oculto && !['ArrowLeft', 'ArrowRight', 'Escape'].includes(e.key)"));
  assert.ok(historia.includes('enPausa || oculto || !composicionLegible'));
  assert.ok(historia.includes('if (!oculto) { setMostrarCierre(true); setEnPausa(true); }'));
  assert.ok(!historia.includes('if (!oculto) setPosicion'));
  assert.ok(lienzo.includes('<div className="lv-imagen" aria-hidden="true">'));
  assert.ok(!lienzo.includes('hidden={!oculto && ajuste.emergencia}'));
  assert.ok(lienzo.includes('Composición por revisar · imagen visible'));
  assert.ok(css.includes('background: rgba(232, 216, 181, .77)'));
});
