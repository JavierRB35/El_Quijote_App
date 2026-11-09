#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regresión de límites de los 126 capítulos del corpus original.

Verifica la frontera I,20→I,21, el pasaje P0001 reparado, la integridad
textual y las excepciones de pasajes ya documentadas, sin depender del
cuestionario ni de scripts antiguos.
"""
import hashlib
import json
import os
import re
import sys

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
sys.path.insert(0, os.path.join(REPO, "tools", "editorial_validation"))
from limites_capitulo import (  # noqa: E402
    cabeceras,
    dentro,
    rangos,
    rango_de_capitulo,
)

FALLOS: list[str] = []


def comprobar(cond, mensaje):
    if not cond:
        FALLOS.append(mensaje)


def plano(s):
    return re.sub(r"\s+", " ", s).strip()


# ---------------------------------------------------------------- 1. módulo
FUENTE = os.path.join(REPO, "content", "textos", "gutenberg_2000", "El_Quijote.txt")
lf = open(FUENTE, encoding="utf-8").read().replace("\r\n", "\n")

caps = cabeceras(lf)
comprobar(len(caps) == 126, f"encabezados de capítulo: {len(caps)} (esperaba 126)")

mini = (
    "Capítulo primero. Que trata de una escena de prueba\n"
    "\n"
    "Texto del capítulo primero que ocupa varias líneas para superar el ancho\n"
    "de una sola línea del fichero de prueba y así cubrir la frontera.\n"
    "\n"
    "Capítulo II. Que trata de la segunda escena de prueba\n"
    "\n"
    "Texto del capítulo segundo.\n"
)
r1 = rangos(mini, estricto=False)[(1, 1)]
r2 = rangos(mini, estricto=False)[(1, 2)]
comprobar(dentro(r1, r1[0], r1[1] - 1), "sintético: un fragmento interno de C1 debe aceptarse")
comprobar(not dentro(r1, r1[0], r2[1]), "sintético: un fragmento que cruza la frontera debe rechazarse")
comprobar(not dentro(r1, r2[0], r2[1]), "sintético: un fragmento de C2 no puede validar como C1")
comprobar(not dentro(r2, r1[0], r1[1]), "sintético: un fragmento de C1 no puede validar como C2")

# ----------------------------------------------------- 3. P0001 corregido
ruta_p1 = os.path.join(REPO, "content", "piloto", "passages", "DQ.P1.C21.P0001.json")
p1 = json.load(open(ruta_p1, encoding="utf-8"))
INICIO_VALIDO, FIN_VALIDO = 333819, 334262
pos = p1["position"]
comprobar(pos["start_char"] == INICIO_VALIDO and pos["end_char"] == FIN_VALIDO,
          f"P0001: position {pos} != [{INICIO_VALIDO}, {FIN_VALIDO})")
comprobar(p1["text_original"].startswith("En esto, comenzó a llover un poco"),
          "P0001: no arranca en el primer fragmento narrativo de I,21")
comprobar("Capítulo" not in p1["text_original"],
          "P0001: contiene un encabezado de capítulo")
comprobar("después de a los padres" not in p1["text_original"],
          "P0001: contiene la cola del capítulo XX")
comprobar(f"sha256:{hashlib.sha256(p1['text_original'].encode('utf-8')).hexdigest()}" == p1["sha256"],
          "P0001: sha256 no corresponde a text_original")
idx_esperado = re.sub(r"\s+", " ", re.sub(r"[«»„“”!¡?¿.,;:()—–-]", "",
                                          p1["text_original"].lower())).strip()
comprobar(idx_esperado == p1["text_indexable"], "P0001: text_indexable incoherente")
comprobar(plano(lf[INICIO_VALIDO:FIN_VALIDO]) == plano(p1["text_original"]),
          "P0001: las palabras no son verbatim del fuente en su rango")
comprobar("\n\n" in p1["text_original"],
          "P0001: se perdió la estructura de párrafos restaurada en PR #59")
comprobar(f"offset {INICIO_VALIDO}-{FIN_VALIDO}" in p1["anchor"],
          "P0001: el anchor no recoge los offsets reales LF")
r21 = rango_de_capitulo(lf, "DQ.P1.C21")
comprobar(dentro(r21, pos["start_char"], pos["end_char"]),
          "P0001: el rango no queda dentro de los límites de I,21")

# --------------------------------- 5/6. firma global + excepciones congeladas
EXCEPCIONES_LEGADO = {
    # id del pasaje: motivo (corrección editorial NO autorizada en esta PR)
    "DQ.P1.C21.P0002": "empieza en la cola de I,20 y contiene el encabezado de I,21",
    "DQ.P1.C21.P0004": "texto del episodio del vizcaíno (región de I,9): posición y contenido ajenos a I,21",
    "DQ.P1.C01.P0002": "incluye sonetos y arranque situados antes del encabezado en la edición",
    "DQ.P1.C01.P0003": "ídem",
    "DQ.P1.C01.P0004": "ídem",
    "DQ.P1.C01.P0005": "ídem",
    "DQ.P1.C16.P0002": "rango iniciado antes del encabezado de I,16",
    "DQ.P1.C16.P0003": "rango iniciado antes del encabezado de I,16",
}
FIRMA_I20 = "después de a los padres, a los amos se ha de respetar"
ENCABEZADO_XXI = "Capítulo XXI. Que trata de la alta aventura"

ruta_pass = os.path.join(REPO, "content", "piloto", "passages")
limites_todos = rangos(lf)
for nombre in sorted(os.listdir(ruta_pass)):
    if not nombre.endswith(".json"):
        continue
    pid = nombre[:-5]
    p = json.load(open(os.path.join(ruta_pass, nombre), encoding="utf-8"))
    t = p["text_original"]
    m = re.fullmatch(r"DQ\.P([12])\.C(\d{1,2})", p["chapter_id"])
    rango = limites_todos[(int(m.group(1)), int(m.group(2)))]
    pos = p["position"]
    en_limites = dentro(rango, pos["start_char"], pos["end_char"])
    if pid in EXCEPCIONES_LEGADO:
        comprobar(not en_limites,
                  f"{pid}: excepción legado ahora DENTRO de límites; retirar del registro")
        continue
    comprobar(en_limites, f"{pid}: rango fuera de los límites de {p['chapter_id']}")
    comprobar(FIRMA_I20 not in t,
              f"{pid}: contiene la firma de sangrado del capítulo XX")
    if pid != "DQ.P1.C21.P0001":
        comprobar(ENCABEZADO_XXI not in t,
                  f"{pid}: contiene el encabezado del capítulo XXI")

if FALLOS:
    print(f"TEST LÍMITES DE CAPÍTULO: {len(FALLOS)} fallo/s")
    for f in FALLOS:
        print("  -", f)
    sys.exit(1)
print("OK: 126 encabezados; P0001 correcto; 8 excepciones de pasajes registradas; resto dentro de límites")
