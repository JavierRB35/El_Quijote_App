#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regresión P1 (sangrado I,20 → I,21) y restricción de límites de capítulo.

La extracción fuzzy permitió que DQ.P1.C21.P0001 capturase la cola del
capítulo XX («la tierra; porque, después de a los padres…») y el encabezado
del propio XXI; Q.313 y Q.318 reprodujeron la cita contaminada. Esta batería
comprueba:

  1. El módulo limites_capitulo valida la secuencia de 126 encabezados
     (52 de P1 + 74 de P2, con «Capítulo primero.»/«Capítulo Primero.») y
     bloquea fragmentos que crucen la frontera de capítulo (caso sintético).
  2. migrar_bateria_a_gutenberg.py tiene incorporada la guardia (pasajes y
     citas).
  3. P0001 corregido: arranca EXACTAMENTE en «En esto, comenzó a llover un
     poco…» (offset 333819 LF), sin cola de I,20 ni encabezado; posición,
     sha256, text_indexable y anchor verificados contra el fuente; estructura
     literaria conservada.
  4. Q.313/Q.318: la cita empieza en el arranque válido, no contiene firma
     de I,20 ni encabezado, y está íntegra dentro del pasaje citado.
  5. Firma global de la incidencia: NINGÚN pasaje o cita ajeno a las
     EXCEPCIONES DOCUMENTADAS contiene la cola de I,20 ni el encabezado de
     XXI. Las excepciones son casos LEGADOS registrados para una corrección
     editorial posterior (NO autorizada en la PR de esta subsanación):
       - DQ.P1.C21.P0002 (empieza en la cola de I,20; contiene encabezado).
         Sus citas reproducen el sangrado: DQ.Q.000314 y DQ.Q.000317 (sus
         evidencias citan P0002 y quedan congeladas junto a él hasta que la
         corrección de P0002 esté autorizada).
       - DQ.P1.C21.P0004 (texto del episodio del vizcaíno, región de I,9:
         posición y contenido ajenos al capítulo XXI).
       - DQ.P1.C01.P0002/P0003/P0004/P0005 y DQ.P1.C16.P0002/P0003 (rangos
         que incluyen material previo al encabezado de su capítulo: sonetos
         situados antes del título en la edición de 1833/PG).
  6. El resto de pasajes del paquete queda DENTRO de los límites de su
     capítulo (cualquier violación nueva hace fallar la prueba).

Uso: python -I test_limites_capitulo.py <raiz_repo>
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

# ------------------------------------------------------------ 2. guardia en migrar
with open(os.path.join(REPO, "tools", "editorial_validation",
                       "migrar_bateria_a_gutenberg.py"), encoding="utf-8") as fh:
    migrar_src = fh.read()
comprobar("limites_capitulo" in migrar_src and "rango_de_capitulo" in migrar_src
          and "dentro(limite" in migrar_src,
          "migrar_bateria_a_gutenberg.py no incorpora la guardia de límites")

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

# ----------------------------------------------------- 4. Q.313 y Q.318
for qid in ("DQ.Q.000313", "DQ.Q.000318"):
    q = json.load(open(os.path.join(REPO, "content", "piloto", "questions",
                                    qid + ".json"), encoding="utf-8"))
    citas = [e for e in q["evidence"] if e.get("passage_id") == "DQ.P1.C21.P0001"]
    comprobar(bool(citas), f"{qid}: sin cita de P0001")
    for e in citas:
        cita = e["quote"]
        comprobar(cita.startswith("En esto, comenzó a llover un poco"),
                  f"{qid}: la cita no arranca en el fragmento válido")
        comprobar("después de a los padres" not in cita,
                  f"{qid}: la cita contiene la cola del capítulo XX")
        comprobar("Capítulo" not in cita,
                  f"{qid}: la cita contiene el encabezado del capítulo")
        comprobar(plano(cita) in plano(p1["text_original"]),
                  f"{qid}: la cita no está contenida en el pasaje citado")

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

# citas: la firma de la incidencia no puede reaparecer en ninguna evidencia
# salvo en las preguntas que citan pasajes de la lista de excepciones legado
# (Q.314/Q.317 citan P0002; su corrección va con la de P0002, no autorizada aquí)
ruta_q = os.path.join(REPO, "content", "piloto", "questions")
for nombre in sorted(os.listdir(ruta_q)):
    if not nombre.endswith(".json"):
        continue
    q = json.load(open(os.path.join(ruta_q, nombre), encoding="utf-8"))
    for e in q.get("evidence", []):
        cita = e.get("quote", "")
        if "después de a los padres" in cita:
            comprobar(e.get("passage_id") in EXCEPCIONES_LEGADO,
                      f"{q['id']}: cita con la firma de sangrado del capítulo XX "
                      f"sobre un pasaje NO registrado como excepción")

if FALLOS:
    print(f"TEST LÍMITES DE CAPÍTULO: {len(FALLOS)} fallo/s")
    for f in FALLOS:
        print("  -", f)
    sys.exit(1)
print("OK: 126 encabezados validados; guardia en migración; P0001 y Q.313/Q.318 "
      "corregidos y contenidos en su pasaje; firma de sangrado erradicada salvo "
      "las 8 excepciones legadas registradas; resto del paquete dentro de límites")
