#!/usr/bin/env python3
"""Capítulo I.4 — fidelidad, visuales aprobados, antiespoilers y catálogo jugable."""
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[2]
def load(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))

a = load("content/aventura/parte_1/capitulo_04.json")
h = load("content/historia/parte_1/capitulo_04.json")
medios = {m["id"]: m for m in load("assets/scenes/manifest.json")["images"]}
fichas = load("content/capitulos/registro.json")["capitulos"]
corpus = (ROOT / "content/textos/gutenberg_2000/El_Quijote.txt").read_text(encoding="utf-8").splitlines()
cap = re.sub(r"\s+", " ", " ".join(corpus[1668:1912]))

assert a["capituloId"] == h["capituloId"] == "DQ.P1.C04"
assert a["episodioId"] == h["episodioId"] == "DQ.P1.C04.E01"
assert a["estado_editorial"] == h["estado_editorial"] == "piloto_integrado"
assert a["revision_visual"] == h["revision_visual"] == "pendiente"
assert len([f for f in fichas if f["capituloId"] == "DQ.P1.C04"]) == 1
assert len(a["rondas"]) == 5
assert [x["id"] for x in a["rondas"]] == [f"AV2-I4-{i:02d}" for i in range(1,6)]
assert [x["correcta"] for x in a["rondas"]] == ["b","c","a","b","c"]
assert [bool(x.get("checkpoint")) for x in a["rondas"]] == [False,False,True,False,True]
assert a["pendientes_editoriales"] == [x["id"] for x in a["rondas"]]
assert len({x["imagenPrevia"]["uri"] for x in a["rondas"]}) == 5
assert [s["id"] for s in h["escenas"]] == [f"H{i:02d}" for i in range(1,15)]
interv = [v for s in h["escenas"] for v in s["intervenciones"]]
assert len(interv) == len({v["id"] for v in interv}) == 33
assert sum(v["tipo_texto"] == "CITA_LITERAL" for v in interv) == 1
usados = set()
for ronda in a["rondas"]:
    assert len(ronda["opciones"]) == len({o["id"] for o in ronda["opciones"]}) == 3
    assert sum(o["id"] == ronda["correcta"] for o in ronda["opciones"]) == 1
    assert ronda["pasajeId"] is None
    for campo, fase in [("imagenPrevia","pre"),("imagenConsecuencia","post")]:
        uri = ronda[campo]["uri"]
        id_ = Path(uri).stem
        media = medios[id_]
        assert media["phase"] == fase
        assert media["review_state"] == "aprobada"
        assert media["relative_path"] == "assets/" + uri.removeprefix("assets://")
        usados.add(id_)
for v in interv:
    assert v["texto_visible"] and len(v["texto_visible"]) >= 15
    assert v["localizador"].startswith("DQ.SRC.0005 · Parte I, capítulo IV, líneas ")
    media = medios[v["imagen"]]
    assert media["review_state"] == "aprobada"
    assert (media["part"], media["chapter"]) == (1,4)
    usados.add(media["id"])
    if v["tipo_texto"] == "CITA_LITERAL":
        assert re.sub(r"\s+", " ", v["texto_visible"]) in cap

assert len(usados) == 22
for id_ in usados:
    medio = medios[id_]
    ruta = ROOT / medio["relative_path"]
    assert ruta.is_file(), ruta
    assert hashlib.sha256(ruta.read_bytes()).hexdigest() == medio["sha256"], id_
assert "p1_c04_a01_explicacion_amo_pre" == Path(a["rondas"][0]["imagenPrevia"]["uri"]).stem
assert h["escenas"][6]["intervenciones"][1]["imagen"] == "p1_c04_a04_represalia_indirecta_post"
assert h["escenas"][10]["intervenciones"][-1]["imagen"] == "p1_c04_h11_acometida_story"
assert h["escenas"][11]["intervenciones"][0]["imagen"] == "p1_c04_a10_caida_rocinante_post"
assert h["escenas"][12]["intervenciones"][0]["imagen"] == "p1_c04_h13_pedazos_lanza_story"
assert h["escenas"][13]["intervenciones"][-1]["imagen"] == "p1_c04_h14_solo_camino_story"
assert not any("p1_c04_andres_encina_pre" in v["imagen"] or "p1_c04_mercaderes_pre" in v["imagen"] for v in interv)
print("PASS I.4: cinco rondas, 14 escenas, 33 intervenciones, 22 WebP con SHA-256, cita literal y orden canónico")
