"""Casos negativos del contrato DC-34: ninguna ronda inválida pasa la validación."""
import copy
import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools/editorial_validation"))
from validar_aventura import validar_catalogo

ARCHIVO = ROOT / "content/aventura/parte_1/capitulo_08.json"


class TestCatalogoAventura(unittest.TestCase):
    def setUp(self):
        self.paquete = json.loads(ARCHIVO.read_text(encoding="utf-8"))

    def fallo(self, patron, mutar):
        datos = copy.deepcopy(self.paquete)
        mutar(datos)
        with self.assertRaisesRegex(ValueError, patron):
            validar_catalogo(datos, ARCHIVO)

    def test_paquete_real(self):
        self.assertEqual(validar_catalogo(self.paquete, ARCHIVO),
                         ["AV2-I8-05", "AV2-I8-06", "AV2-I8-09"])

    def test_id_duplicado(self):
        self.fallo("ID_DUPLICADO", lambda d: d["rondas"][1].update(id=d["rondas"][0]["id"]))

    def test_correcta_no_declarada(self):
        self.fallo("RESPUESTA_CANONICA", lambda d: d["rondas"][0].update(correcta="z"))

    def test_opciones_duplicadas(self):
        self.fallo("OPCIONES_DUPLICADAS",
                   lambda d: d["rondas"][0]["opciones"][1].update(id="a"))

    def test_preimagen_repetida(self):
        self.fallo("PREIMAGEN_REPETIDA",
                   lambda d: d["rondas"][1]["imagenPrevia"].update(uri=d["rondas"][0]["imagenPrevia"]["uri"]))

    def test_imagen_inexistente(self):
        self.fallo("IMAGEN_INEXISTENTE",
                   lambda d: d["rondas"][0]["imagenPrevia"].update(
                       uri="assets://scenes/part_1/chapter_08/no_existe.webp"))

    def test_pendiente_oculto(self):
        self.fallo("PENDIENTES_NO_DECLARADOS", lambda d: d["pendientes_editoriales"].clear())

    def test_aprobacion_visual_falsa(self):
        self.fallo("REVISION_VISUAL", lambda d: d.update(estado_editorial="aprobado"))

    def test_examen_cultural_prohibido(self):
        self.fallo("ESQUEMA", lambda d: d["rondas"][0].update(tipo="verdadero_falso"))


if __name__ == "__main__":
    unittest.main()
