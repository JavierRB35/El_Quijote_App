import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encuadreSeguro, regionesLibres, posicionesPergamino, elegirPergamino } from '../src/cine/composicion.ts';

test('el pergamino no invade el rectángulo protegido en los cinco formatos', () => {
  for (const [w, h] of [[1920,1080],[1366,768],[1280,800],[2560,1440],[3840,2160]]) {
    const critical = { x: .1, y: .1, w: .6, h: .8 };
    for (const r of regionesLibres(w,h,critical)) {
      assert.ok(r.x >= 0 && r.y >= 0 && r.x+r.w <= w && r.y+r.h <= h);
      assert.ok(r.x+r.w <= critical.x*w || r.x >= (critical.x+critical.w)*w ||
        r.y+r.h <= critical.y*h || r.y >= (critical.y+critical.h)*h);
    }
  }
});
test('cover se rechaza cuando corta una región esencial; sin metadatos conserva todo', () => {
  assert.equal(encuadreSeguro(1280,800,1920,1080,{x:0,y:0,w:1,h:1}).fit,'contain');
  assert.equal(encuadreSeguro(1920,1080,1920,1080,{x:.1,y:.1,w:.5,h:.8}).fit,'cover');
  assert.equal(encuadreSeguro(1920,1080,800,1200).fit,'contain');
});
test('una imagen ocupada de borde a borde no inventa espacio para texto', () => {
  assert.deepEqual(regionesLibres(1366,768,{x:0,y:0,w:1,h:1}),[]);
});

test('DC-41: ancla inferior derecha estable para cada intervención', () => {
  const candidatos = posicionesPergamino(1672, 941, 700, 160);
  assert.deepEqual(candidatos[0], { x: 876, y: 671, w: 700, h: 160 });
  const posicion = elegirPergamino(candidatos, 1672, 941);
  assert.equal(posicion?.rect.x, 876);
  assert.equal(posicion?.rect.y, 671);
  assert.equal(posicion?.movido, false);
});
test('DC-41: ignorar desplazamientos por máscaras grandes pendientes de precisión', () => {
  const candidatos = posicionesPergamino(1672, 941, 700, 160);
  const libre = elegirPergamino(candidatos, 1672, 941, { x: .24, y: .12, w: .26, h: .28 });
  assert.equal(libre?.movido, false);
  const incierto = elegirPergamino(candidatos, 1672, 941, { x: .05, y: .05, w: .9, h: .85 });
  assert.equal(incierto?.movido, false);
  assert.equal(incierto?.focoLibre, false);
});
test('DC-41: reubicación discreta solo por foco fiable que estorba abajo a la derecha', () => {
  const candidatos = posicionesPergamino(1672, 941, 700, 160);
  const posicion = elegirPergamino(candidatos, 1672, 941, { x: .52, y: .69, w: .29, h: .19 });
  assert.equal(posicion?.movido, true);
  assert.ok(posicion!.rect.y >= 78);
});
test('DC-41: ningún candidato invade bordes de ventana ni controles', () => {
  for (const [w,h] of [[640,480],[1280,720],[1366,768],[1672,941],[1920,1080]]) {
    for (const r of posicionesPergamino(w,h,Math.min(700,w-84),160)) {
      assert.ok(r.x >= 20 && r.y >= 78 && r.x+r.w <= w-16 && r.y+r.h <= h-32);
    }
  }
});
