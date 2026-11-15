#!/usr/bin/env python3
"""Regresión editorial I.1: imágenes existentes, orden y exactitud del guion."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[2]
def load(path: str):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))

a = load("content/aventura/parte_1/capitulo_01.json")
h = load("content/historia/parte_1/capitulo_01.json")
m = load("assets/scenes/manifest.json")
scenes = {s["id"]: s for s in m["images"]}
corpus = (ROOT / "content/textos/gutenberg_2000/El_Quijote.txt").read_text(encoding="utf-8")
capitulo = corpus[corpus.index("En un lugar de la Mancha"):corpus.index("Fue luego a ver su rocín") + 3500]
assert a["episodioId"] == h["episodioId"] == "DQ.P1.C01.E01"
assert a["estado_editorial"] == h["estado_editorial"] == "piloto_integrado"
assert a["revision_visual"] == h["revision_visual"] == "pendiente"
assert len(a["rondas"]) == 5
assert len(h["escenas"]) == 11
intervenciones = [u for escena in h["escenas"] for u in escena["intervenciones"]]
assert len({u["imagen"] for u in intervenciones}) == 25, "DC-37: imagen distinta por intervención"
assert sum(u["imagen"].startswith("p1_c01_h" + u["id"][1:3].lower() + "_i" + u["id"][-2:] + "_") for u in intervenciones) == 16
assert sum(len(s["intervenciones"]) for s in h["escenas"]) == 25
assert len({r["imagenPrevia"]["uri"] for r in a["rondas"]}) == 5
for idx, media_id in [(0, "p1_c01_h02_i02_libros_adquiridos_story"), (3, "p1_c01_h08_i02_nombre_rocinante_story"), (4, "p1_c01_h11_i02_nombre_dulcinea_story")]:
    assert a["rondas"][idx]["imagenConsecuencia"]["uri"].endswith(media_id + ".webp")
    assert a["rondas"][idx]["imagenPrevia"]["uri"] != a["rondas"][idx]["imagenConsecuencia"]["uri"]
assert [s["id"] for s in h["escenas"]] == [f"H{i:02d}" for i in range(1, 12)]
for r in a["rondas"]:
    assert len(r["opciones"]) == 3
    assert [o["id"] for o in r["opciones"]].count(r["correcta"]) == 1
    assert len(r["contexto"]) > 25
for escena in h["escenas"]:
    for interv in escena["intervenciones"]:
        recurso = scenes[interv["imagen"]]
        assert recurso["review_state"] == "aprobada"
        assert (ROOT / recurso["relative_path"]).is_file()
        assert "DQ.SRC.0005" in interv["localizador"]
        assert interv["texto_visible"].strip()
        if interv["tipo_texto"] == "CITA_LITERAL":
            # Gutenberg 2000 contiene saltos mecánicos al final de línea.
            # Cotejar palabras y puntuación sin esos saltos (DC-31).
            normalizar = lambda texto: re.sub(r"\s+", " ", texto).strip()
            assert normalizar(interv["texto_visible"]) in normalizar(capitulo), (escena["id"], interv["id"])
assert [i["imagen"] for i in h["escenas"][6]["intervenciones"]] == [
    "p1_c01_h07_i01_primera_celada_carton_story", "p1_c01_h07_celada_rota_story",
    "p1_c01_r03_celada_reforzada_post"]
print("PASS I.1: 5 rondas, 5 preimágenes distintas, 11 escenas, 25 intervenciones, planos reales")
