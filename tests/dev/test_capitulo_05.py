#!/usr/bin/env python3
"""I.5 — catálogo, orden cervantino, integridad WebP, TS-001 y no spoilers."""
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[2]
def leer(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))

a = leer("content/aventura/parte_1/capitulo_05.json")
h = leer("content/historia/parte_1/capitulo_05.json")
medio = {x["id"]: x for x in leer("assets/scenes/manifest.json")["images"]}
registro = leer("content/capitulos/registro.json")["capitulos"]
lineas = (ROOT / "content/textos/gutenberg_2000/El_Quijote.txt").read_text(encoding="utf-8").splitlines()
cap = re.sub(r"\s+", " ", " ".join(lineas[1916:2078]))
assert (a["capituloId"], h["capituloId"]) == ("DQ.P1.C05", "DQ.P1.C05")
assert a["episodioId"] == h["episodioId"] == "DQ.P1.C05.E01"
assert a["estado_editorial"] == h["estado_editorial"] == "piloto_integrado"
assert a["revision_visual"] == h["revision_visual"] == "pendiente"
assert len([x for x in registro if x["capituloId"] == "DQ.P1.C05"]) == 1
assert len(a["rondas"]) == 5
assert [x["id"] for x in a["rondas"]] == [f"AV2-I5-{i:02d}" for i in range(1, 6)]
assert [x["correcta"] for x in a["rondas"]] == ["b","a","c","a","b"]
assert [bool(x.get("checkpoint")) for x in a["rondas"]] == [False, False, True, False, True]
assert a["pendientes_editoriales"] == [x["id"] for x in a["rondas"]]
assert len({x["imagenPrevia"]["uri"] for x in a["rondas"]}) == 5
assert [s["id"] for s in h["escenas"]] == [f"H{i:02d}" for i in range(1, 12)]
interv = [v for escena in h["escenas"] for v in escena["intervenciones"]]
assert len(interv) == len({v["id"] for v in interv}) == 30
assert all(v["id"] == f"{s['id']}-I{i:02d}" for s in h["escenas"] for i, v in enumerate(s["intervenciones"], 1))
assert sum(v["tipo_texto"] == "CITA_LITERAL" for v in interv) == 1
assert re.sub(r"\s+", " ", next(v["texto_visible"] for v in interv if v["tipo_texto"] == "CITA_LITERAL")) in cap
assert all(len(v["texto_visible"]) >= 15 and v["localizador"].startswith("DQ.SRC.0005 · Parte I, capítulo V, líneas ") for v in interv)

usados = set()
for ronda in a["rondas"]:
    assert len(ronda["opciones"]) == len({o["id"] for o in ronda["opciones"]}) == 3
    assert sum(o["id"] == ronda["correcta"] for o in ronda["opciones"]) == 1
    assert ronda["pasajeId"] is None
    for campo in ("imagenPrevia", "imagenConsecuencia"):
        uri = ronda[campo]["uri"]
        nombre = Path(uri).stem
        m = medio[nombre]
        assert m["review_state"] == "aprobada"
        assert m["relative_path"] == "assets/" + uri.removeprefix("assets://")
        usados.add(nombre)
assert Path(a["rondas"][0]["imagenPrevia"]["uri"]).stem == Path("p1_c04_h14_solo_camino_story").stem
assert Path(a["rondas"][1]["imagenPrevia"]["uri"]).stem == "p1_c05_r02_a03_pre_owner_approved"
assert Path(a["rondas"][3]["imagenConsecuencia"]["uri"]).stem == "p1_c05_r04_a08_post_owner_approved"
for v in interv:
    m = medio[v["imagen"]]
    assert m["review_state"] == "aprobada"
    assert (m["part"], m["chapter"]) == (1,5)
    usados.add(m["id"])

# No reutilizar variantes expresamente rechazadas para sus beats.
assert not any("no_aprobada" in x for x in usados)
assert set(v["imagen"] for v in interv).issubset(usados)
for nombre in usados:
    m = medio[nombre]
    ruta = ROOT / m["relative_path"]
    assert ruta.is_file(), ruta
    assert hashlib.sha256(ruta.read_bytes()).hexdigest() == m["sha256"], nombre

assert "capítulo VI" in h["cierre"]["texto"]
assert not any("quema" in v["texto_visible"].lower() and "se quemaron" in v["texto_visible"].lower() for v in interv)
print(f"PASS I.5: {len(a['rondas'])} rondas, {len(h['escenas'])} escenas, {len(interv)} intervenciones, {len(usados)} medios aprobados con SHA-256")
