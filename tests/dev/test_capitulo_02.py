#!/usr/bin/env python3
"""Regresión de Historia/Aventura I.2: imágenes aprobadas y antiespoiler."""
from pathlib import Path
import json
ROOT = Path(__file__).resolve().parents[2]
def load(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))
a = load("content/aventura/parte_1/capitulo_02.json")
h = load("content/historia/parte_1/capitulo_02.json")
m = {item["id"]: item for item in load("assets/scenes/manifest.json")["images"]}
assert a["episodioId"] == h["episodioId"] == "DQ.P1.C02.E01"
assert a["estado_editorial"] == h["estado_editorial"] == "piloto_integrado"
assert a["revision_visual"] == h["revision_visual"] == "pendiente"
assert len(a["rondas"]) == 5 and len(h["escenas"]) == 11
assert len({r["imagenPrevia"]["uri"] for r in a["rondas"]}) == 5
items = [i for s in h["escenas"] for i in s["intervenciones"]]
assert len(items) == len({i["id"] for i in items}) == len({i["imagen"] for i in items}) == 25
assert sum(i["imagen"].startswith("p1_c02_h") and "_i" in i["imagen"] for i in items) == 16
for item in items:
    media = m[item["imagen"]]
    assert media["review_state"] == "aprobada"
    assert media["part"] == 1 and media["chapter"] == 2
    assert (ROOT / media["relative_path"]).is_file()
    assert item["texto_visible"] and "DQ.SRC.0005" in item["localizador"]
for idx, media_id in [(0, "p1_c02_h02_i02_resolucion_armarse_story"),
                      (1, "p1_c02_h05_i02_cuerno_porquero_story"),
                      (3, "p1_c02_h08_i01_estribo_desmonta_story")]:
    r = a["rondas"][idx]
    assert r["imagenConsecuencia"]["uri"].endswith(media_id + ".webp")
    assert r["imagenConsecuencia"]["uri"] != r["imagenPrevia"]["uri"]
assert a["rondas"][2]["imagenPrevia"]["uri"].endswith("p1_c02_r03_mujeres_temor_pre.webp")
assert a["rondas"][4]["imagenConsecuencia"]["uri"].endswith("p1_c02_h10_cana_vino_story.webp")
print("PASS I.2: 25 escenas únicas, 16 imágenes nuevas aprobadas, 5 rondas sin spoilers")
