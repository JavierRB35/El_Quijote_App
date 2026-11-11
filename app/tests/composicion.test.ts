import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encuadreSeguro, regionesLibres } from '../src/cine/composicion.ts';

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
