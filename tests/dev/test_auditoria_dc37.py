"""La matriz DC-37 no puede omitir IDs ni inventar rutas/asociaciones."""
import csv
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def read(path):
    return json.loads((ROOT / path).read_text(encoding='utf-8'))


def table(name):
    with (ROOT / 'docs/qa/dc37' / name).open(encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))


class Cobertura(unittest.TestCase):
    def test_cada_intervencion_una_vez_sin_textos_completos(self):
        expected = set()
        textos = []
        for path in (ROOT / 'content/historia/parte_1').glob('*.json'):
            d = read(path)
            for s in d['escenas']:
                for u in s['intervenciones']:
                    expected.add((d['capituloId'], u['id']))
                    textos.append(u['texto_visible'])
        for b in read('content/piloto/package.json')['files']['beats']:
            for u in read('content/piloto/' + b)['utterances']:
                expected.add(('DQ.P1.C08', u['utterance_id']))
                textos.append(u['texto_visible'])
        rows = table('historia_cobertura.csv')
        self.assertEqual(len(rows), len(expected))
        self.assertEqual({(r['capitulo'], r['intervencion']) for r in rows}, expected)
        values = {v for r in rows for v in r.values()}
        self.assertFalse(set(textos) & values)

    def test_rutas_y_candidatos_reales(self):
        ids = {r['id'] for r in read('assets/scenes/manifest.json')['images']}
        for r in table('historia_cobertura.csv'):
            self.assertTrue((ROOT / r['fuente']).is_file(), r['fuente'])
            if r['ruta']:
                self.assertTrue((ROOT / r['ruta']).is_file(), r['ruta'])
            candidate = r['imagen_candidata']
            self.assertTrue(candidate in ids or (ROOT / candidate).is_file(), candidate)
            if r['capitulo'] != 'DQ.P1.C08':
                self.assertEqual(r['beat'], '')

    def test_rondas_y_activacion_exactas(self):
        expected = set()
        for path in (ROOT / 'content/aventura/parte_1').glob('*.json'):
            d = read(path)
            for r in d['rondas']:
                for function in ('preimagen', 'consecuencia'):
                    expected.add((d['capituloId'], r['id'], function))
        rows = table('aventura_carencias.csv')
        self.assertEqual(len(rows),len(expected))
        self.assertEqual({(r['capitulo'],r['ronda'],r['funcion']) for r in rows},expected)
        active = {c['capituloId'] for c in read('content/capitulos/registro.json')['capitulos']}
        for r in rows + table('historia_cobertura.csv'):
            self.assertEqual(r['activo_en_menu']=='True', r['capitulo'] in active)

    def test_carencias_no_omiten_ninguna_intervencion_pendiente(self):
        expected = [r for r in table('historia_cobertura.csv') if r['resultado'] != 'APTA']
        self.assertEqual(table('historia_carencias.csv'),expected)


if __name__ == '__main__':
    unittest.main()
