#!/usr/bin/env python3
"""QA documental I.3: catálogos canónicos, imágenes y barreras de activación."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[2]
def load(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))

a = load("content/aventura/parte_1/capitulo_03.json")
h = load("content/historia/parte_1/capitulo_03.json")
catalogo = {m["id"]: m for m in load("assets/scenes/manifest.json")["images"]}
registro = load("content/capitulos/registro.json")
corpus = (ROOT / "content/textos/gutenberg_2000/El_Quijote.txt").read_text(encoding="utf-8")
capitulo = "\n".join(corpus.splitlines()[1454:1664])
norm = lambda t: re.sub(r"\s+", " ", t).strip()

assert a["capituloId"] == h["capituloId"] == "DQ.P1.C03"
assert a["episodioId"] == h["episodioId"] == "DQ.P1.C03.E01"
assert a["estado_editorial"] == h["estado_editorial"] == "en_revision"
assert a["revision_visual"] == h["revision_visual"] == "pendiente"
assert len(a["rondas"]) == 4
assert [r["id"] for r in a["rondas"]] == [f"AV2-I3-{i:02d}" for i in range(1, 5)]
assert [r["correcta"] for r in a["rondas"]] == ["b"] * 4
assert len({r["imagenPrevia"]["uri"] for r in a["rondas"]}) == 4
assert len(a["pendientes_editoriales"]) == 4
assert [e["id"] for e in h["escenas"]] == [f"H{i:02d}" for i in range(1, 12)]
interv = [i for e in h["escenas"] for i in e["intervenciones"]]
assert len(interv) == 30 and len({i["id"] for i in interv}) == 30
assert sum(i["tipo_texto"] == "CITA_LITERAL" for i in interv) == 2
for r in a["rondas"]:
    assert len(r["opciones"]) == 3
    assert len({o["id"] for o in r["opciones"]}) == 3
    assert sum(o["id"] == r["correcta"] for o in r["opciones"]) == 1
    assert len(r["contexto"]) > 25 and len(r["consecuencia"]) > 20
    for campo in ("imagenPrevia", "imagenConsecuencia"):
        imagen = r[campo]
        ruta = ROOT / "assets" / imagen["uri"].removeprefix("assets://")
        assert ruta.is_file(), imagen["uri"]
        medio = next((m for m in catalogo.values() if ROOT / m["relative_path"] == ruta), None)
        assert medio is not None, imagen["uri"]
        assert (medio["part"], medio["chapter"]) == (1, 3)
        assert medio["phase"] == ("pre" if campo == "imagenPrevia" else "post")
for i in interv:
    assert i["texto_visible"] and len(i["texto_visible"]) >= 15, i["id"]
    assert i["tipo_texto"] in ("CITA_LITERAL", "ADAPTACION_FIEL")
    assert i["localizador"].startswith("DQ.SRC.0005 · Parte I, capítulo III"), i["id"]
    medio = catalogo[i["imagen"]]
    assert (medio["part"], medio["chapter"]) == (1, 3), i["id"]
    assert (ROOT / medio["relative_path"]).is_file(), i["id"]
    if i["tipo_texto"] == "CITA_LITERAL":
        assert norm(i["texto_visible"]) in norm(capitulo), i["id"]

# Los desenlaces se representan después de que Historia relate el hecho.
assert h["escenas"][5]["intervenciones"][-1]["imagen"] == "p1_c03_a04_golpe_primer_arriero_post"
assert h["escenas"][6]["intervenciones"][1]["imagen"] == "p1_c03_hb_pedrada_guarda_armas_story"
assert h["escenas"][7]["intervenciones"][1]["imagen"] == "p1_c03_a06_ventero_abrevia_ceremonia_post"
assert h["escenas"][10]["intervenciones"][-1]["imagen"] == "p1_c03_hd_salida_venta_armado_story"

# El manifiesto no convierte por inferencia en aprobadas las cuatro imágenes
# originales. Hasta resolverlo, impedir activación de este capítulo.
legacy = ("p1_c03_vela_armas_pre", "p1_c03_arriero_pozo_pre",
          "p1_c03_ventero_libro_cuentas_pre", "p1_c03_investidura_post")
usados = {i["imagen"] for i in interv}
usados.update(r[k]["uri"].split("/")[-1].removesuffix(".webp")
              for r in a["rondas"] for k in ("imagenPrevia", "imagenConsecuencia"))
assert all(id_ in usados for id_ in legacy)
assert all(catalogo[id_]["review_state"] in ("borrador", "aprobada") for id_ in legacy)
assert not any(c["capituloId"] == "DQ.P1.C03" for c in registro["capitulos"])
print("PASS I.3: 4 rondas y preimágenes exclusivas, 11 escenas/30 intervenciones, dos citas cotejadas, recursos físicos y barrera de activación")
