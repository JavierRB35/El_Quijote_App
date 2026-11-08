// Pruebas de la lógica del Modo Historia (node --test, sin DOM ni Tauri).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { Beat, Escena } from '../src/contrato.ts';
import {
  estructuraHistoria,
  etiquetaHablante,
  inicioDeBeat,
  lecturaMinimaMs,
  palabrasDe,
  progresoDesde,
  restaurarPosicion,
} from '../src/historia/logica.ts';

const escena1: Escena = {
  id: 'E.S01', contract_version: '1.2.0', episode_id: 'E', phase: 'before',
  media_ids: [], accessibility: { reduced_motion_fallback: 'imagen_estatica', alt: 'a' },
};
const escena2: Escena = { ...escena1, id: 'E.S02' };

function beat(id: string, sceneId: string, order: number, ids: string[]): Beat {
  return {
    id, contract_version: '1.2.0', scene_id: sceneId, order, kind: 'DIALOGO',
    utterances: ids.map((u) => ({
      utterance_id: u,
      speaker: u.includes('N') ? { tipo: 'narrador' as const } : { tipo: 'personaje' as const, person_id: 'P', label: 'Alguien' },
      texto_visible: `texto ${u}`,
      text_kind: 'CITA_LITERAL',
    })),
    visual_asset_ids: [], manual_advance_allowed: true, replay_allowed: true,
    reduced_motion_fallback: true,
  };
}

const escenas = [escena1, escena2];
const estructura = estructuraHistoria(escenas, [
  [beat('B1', 'E.S01', 1, ['N1', 'U2']), beat('B2', 'E.S01', 2, ['U3'])],
  [beat('B3', 'E.S02', 1, ['U4'])],
]);

test('estructura: recorre escenas, beats e intervenciones en orden', () => {
  assert.equal(estructura.length, 4);
  assert.deepEqual(
    estructura.map((i) => [i.escena.id, i.beat.id, i.intervencion.utterance_id]),
    [['E.S01', 'B1', 'N1'], ['E.S01', 'B1', 'U2'], ['E.S01', 'B2', 'U3'], ['E.S02', 'B3', 'U4']],
  );
});

test('palabras y lectura mínima (TS-001): max(1500, 800 + 35·palabras)', () => {
  assert.equal(palabrasDe('hola mundo'), 2);
  assert.equal(palabrasDe('   '), 0);
  assert.equal(lecturaMinimaMs('una palabra'), 1500); // 800+35=835 → suelo 1500
  const texto = 'palabra '.repeat(40).trim(); // 40 palabras → 800+1400=2200
  assert.equal(lecturaMinimaMs(texto), 2200);
  // el suelo del beat solo puede ELEVAR, nunca rebajar
  assert.equal(lecturaMinimaMs('una palabra', 400), 1500);
  assert.equal(lecturaMinimaMs('una palabra', 9000), 9000);
});

test('progreso: guarda episodio, escena, beat, intervención y auto', () => {
  const p = progresoDesde(estructura, 2, 'E', false);
  assert.deepEqual(p, {
    version: 1, episodio_id: 'E', escena_id: 'E.S01', beat_id: 'B2',
    intervencion_id: 'U3', avance_automatico: false,
  });
});

test('restaurar: recupera la posición desde los datos', () => {
  const guardado = JSON.stringify(progresoDesde(estructura, 3, 'E', true));
  const r = restaurarPosicion(estructura, 'E', guardado);
  assert.deepEqual(r, { posicion: 3, auto: true });
});

test('restaurar: descarga guardados corruptos o ajenos sin fallar', () => {
  assert.equal(restaurarPosicion(estructura, 'E', '{roto'), null);
  assert.equal(restaurarPosicion(estructura, 'OTRO', JSON.stringify(progresoDesde(estructura, 0, 'E', true))), null);
  const fantasma = JSON.stringify({ ...progresoDesde(estructura, 0, 'E', true), intervencion_id: 'NOEXISTE' });
  assert.equal(restaurarPosicion(estructura, 'E', fantasma), null);
  // IDs incoherentes entre sí (intervención de otro beat) → descartado
  const incoherente = JSON.stringify({
    ...progresoDesde(estructura, 3, 'E', true), escena_id: 'E.S01', beat_id: 'B1',
  });
  assert.equal(restaurarPosicion(estructura, 'E', incoherente), null);
  assert.equal(restaurarPosicion([], 'E', '{"version":1}'), null);
});

test('inicio de beat para Repetir beat', () => {
  assert.equal(inicioDeBeat(estructura, 1), 0); // U2 → B1/U1
  assert.equal(inicioDeBeat(estructura, 2), 2); // U3 → B2/U3
  assert.equal(inicioDeBeat(estructura, 3), 3);
});

test('etiqueta de hablante', () => {
  assert.equal(etiquetaHablante(estructura[0].intervencion), 'Narrador');
  assert.equal(etiquetaHablante(estructura[1].intervencion), 'Alguien');
});
