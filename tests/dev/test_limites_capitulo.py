#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regresión P1 (sangrado I,20 → I,21 y cierre editorial de I,21).

Comprueba, sobre el paquete real y con casos sintéticos:

  1. `limites_capitulo` valida la secuencia de 126 encabezados y rechaza
     fragmentos que cruzan la frontera de capítulo (caso sintético).
  2. `migrar_bateria_a_gutenberg.py` incorpora la guardia (pasajes y citas).
  3. I,21 completo y coherente:
       - P0001 arranca en «En esto, comenzó a llover un poco» y CIERRA EN
         LÍMITE SINTÁCTICO («…el día de antes.»), sin cola de I,20 ni
         encabezado, con posición/sha/indexable/anchor verificados.
       - P0002 (avistamiento y juramento) y P0003 (diálogo de percepciones)
         sin sangrado ni encabezados; P0004 (valoración de la bacía) ya no
         apunta a I,9; P0005/P0006 verbatim del fuente en sus rangos.
       - Q.313–Q.318: cada cita está CONTENIDA en el pasaje que dice citar,
         sin firma de I,20 ni encabezados; Q.318 mantiene `ordering` con
         clave estable, O04 «Sancho recoge la bacía» y presentación
         desordenada (`shuffle_options: true`); Q.316 sin Sacripante de I,10.
  4. Encabezados incrustados en texto narrativo aunque el rango numérico sea
     formalmente válido: PROHIBIDOS en todo el paquete salvo los 5 casos de
     la familia paratexto/sonetos registrados (C01.P0002–P0004, C16.P0002/
     P0003).
  5. Rangos fuera de los límites de capítulo: prohibidos salvo los 6 casos
     paratexto registrados por separado (C01.P0002–P0005, C16.P0002/P0003) —
     convención editorial pendiente de Dirección, NO se recortan solos.
  6. Contención global de citas: toda `evidence[].quote` con `passage_id`
     está contenida en su pasaje, salvo 15 casos LEGADOS documentados
     (variantes de la migración fuzzy en C06/C11/C18/P2.C01/P2.C74), que
     quedan congelados para la siguiente integración de preguntas.

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
lineas_encabezado = []
for off, _parte, _num in caps:
    fin_linea = lf.find("\n", off)
    lineas_encabezado.append(lf[off:fin_linea if fin_linea != -1 else fin_linea])

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

# ------------------------------------------------------------ 2. guardia en migrar
with open(os.path.join(REPO, "tools", "editorial_validation",
                       "migrar_bateria_a_gutenberg.py"), encoding="utf-8") as fh:
    migrar_src = fh.read()
comprobar("limites_capitulo" in migrar_src and "rango_de_capitulo" in migrar_src
          and "dentro(limite" in migrar_src,
          "migrar_bateria_a_gutenberg.py no incorpora la guardia de límites")

# ------------------------------------------- 3. I,21 completo y coherente
ruta_pass = os.path.join(REPO, "content", "piloto", "passages")
limites_todos = rangos(lf)

def leer_pass(pid):
    return json.load(open(os.path.join(ruta_pass, pid + ".json"), encoding="utf-8"))

# --- P0001: arranque válido y cierre sintáctico
p1 = leer_pass("DQ.P1.C21.P0001")
INICIO_VALIDO = 333819
pos = p1["position"]
comprobar(pos["start_char"] == INICIO_VALIDO, f"P0001: start {pos['start_char']} != {INICIO_VALIDO}")
comprobar(p1["text_original"].startswith("En esto, comenzó a llover un poco"),
          "P0001: no arranca en el primer fragmento narrativo de I,21")
comprobar(p1["text_original"].endswith("dieron en otro como el que habían llevado el día de antes."),
          "P0001: no cierra en límite sintáctico («…el día de antes.»)")
comprobar("después de a los padres" not in p1["text_original"], "P0001: cola de I,20")
comprobar("Capítulo" not in p1["text_original"], "P0001: encabezado incrustado")
r21 = rango_de_capitulo(lf, "DQ.P1.C21")
comprobar(dentro(r21, pos["start_char"], pos["end_char"]), "P0001: fuera de los límites de I,21")

# --- P0002/P0003/P0004/P0005/P0006: contenido limpio y en límites
ESPERADO_INICIO = {
    "DQ.P1.C21.P0002": "De allí a poco, descubrió don Quijote un hombre a caballo",
    "DQ.P1.C21.P0003": "— Mire vuestra merced bien lo que dice",
    "DQ.P1.C21.P0004": "— Por Dios, que la bacía es buena",
    "DQ.P1.C21.P0005": "Es, pues, el caso que el yelmo",
    "DQ.P1.C21.P0006": "Y cuando él vio que el pobre caballero llegaba cerca",
}
for pid, inicio in ESPERADO_INICIO.items():
    p = leer_pass(pid)
    comprobar(p["text_original"].startswith(inicio),
              f"{pid}: no arranca donde debe ({p['text_original'][:40]!r})")
    comprobar("Capítulo" not in p["text_original"], f"{pid}: encabezado incrustado")
    pos = p["position"]
    comprobar(dentro(r21, pos["start_char"], pos["end_char"]), f"{pid}: fuera de I,21")
    comprobar(f"sha256:{hashlib.sha256(p['text_original'].encode('utf-8')).hexdigest()}" == p["sha256"],
              f"{pid}: sha256 incoherente")
    comprobar(plano(lf[pos["start_char"]:pos["end_char"]]) == plano(p["text_original"]),
              f"{pid}: palabras no verbatim del fuente en su rango")
    idx_esperado = re.sub(r"\s+", " ", re.sub(r"[«»„“”!¡?¿.,;:()—–-]", "",
                                              p["text_original"].lower())).strip()
    comprobar(idx_esperado == p["text_indexable"], f"{pid}: text_indexable incoherente")

# P0005/P0006: las propuestas R15 eran verbatim del fuente
p5, p6 = leer_pass("DQ.P1.C21.P0005"), leer_pass("DQ.P1.C21.P0006")
comprobar(p5["text_original"].endswith("desde media legua relumbraba."),
          "P0005: no cierra en «…relumbraba.»")
comprobar(p6["text_original"].endswith("tomándola en las manos, dijo:"),
          "P0006: no cierra en «…tomándola en las manos, dijo:»")

# --- episodio: los 6 pasajes declarados
ep = json.load(open(os.path.join(REPO, "content", "piloto", "episodes",
                                 "DQ.P1.C21.E01.json"), encoding="utf-8"))
for n in range(1, 7):
    pid = f"DQ.P1.C21.P{n:04d}"
    comprobar(pid in ep["passages"], f"episodio C21 sin {pid}")

# --- Q.313–Q.318
FIRMA_I20 = "después de a los padres, a los amos se ha de respetar"
ruta_q = os.path.join(REPO, "content", "piloto", "questions")
for n in range(313, 319):
    qid = f"DQ.Q.{n:06d}"
    q = json.load(open(os.path.join(ruta_q, qid + ".json"), encoding="utf-8"))
    for e in q.get("evidence", []):
        cita = e.get("quote", "")
        pid = e.get("passage_id", "")
        comprobar(FIRMA_I20 not in cita, f"{qid}: cita con firma de I,20")
        comprobar(not any(h in cita for h in lineas_encabezado),
                  f"{qid}: cita con encabezado de capítulo")
        if pid:
            destino = leer_pass(pid)["text_original"]
            comprobar(plano(cita) in plano(destino),
                      f"{qid}: cita no contenida en {pid}")

q318 = json.load(open(os.path.join(ruta_q, "DQ.Q.000318.json"), encoding="utf-8"))
comprobar(q318["interaction"]["type"] == "ordering", "Q.318: type != ordering")
opciones = {o["id"]: o["label"] for o in q318["interaction"]["options"]}
comprobar("Sancho recoge la bacía" in opciones.get("DQ.Q.000318.O04", ""),
          "Q.318: O04 debe ser «Sancho recoge la bacía…»")
comprobar("don Quijote la recoge" not in opciones.get("DQ.Q.000318.O04", ""),
          "Q.318: O04 sigue atribuyendo a don Quijote la recogida")
# Presentación inicial desordenada SIN violar el contrato (question.schema
# obliga shuffle_options=false en ordering): el orden del ARRAY de opciones
# es editorial y no debe revelar la clave.
presentacion = [o["id"] for o in q318["interaction"]["options"]]
orden = q318["interaction"]["correct_order"]
comprobar(presentacion != orden,
          "Q.318: el orden de presentación reproduce la clave correcta")
comprobar(q318["interaction"].get("shuffle_options") is False,
          "Q.318: shuffle_options debe ser false en ordering (contrato v1.0.0)")
comprobar(sorted(orden) == sorted(opciones), "Q.318: correct_order no cubre todas las opciones")
comprobar(len(q318["evidence"]) == 5, f"Q.318: {len(q318['evidence'])} evidencias (esperaba 5: una por lance y la recogida)")
pids_ev = {e["passage_id"] for e in q318["evidence"]}
comprobar(pids_ev <= set(q318["passage_ids"]), "Q.318: evidencia cita pasajes fuera de passage_ids")

q316 = json.load(open(os.path.join(ruta_q, "DQ.Q.000316.json"), encoding="utf-8"))
comprobar("Sacripante" not in json.dumps(q316["interaction"], ensure_ascii=False)
          and "Sacripante" not in q316["prompt"],
          "Q.316: la variante B no debe atribuir Sacripante a I,21")

# ---------------------------- 4/5/6. globos con registro de excepciones
# (a) paratexto/sonetos: 6 casos registrados por separado — convención de
#     rangos pendiente de Dirección; NO se recortan automáticamente.
PARATEXTO_REGISTRADO = {
    "DQ.P1.C01.P0002", "DQ.P1.C01.P0003", "DQ.P1.C01.P0004", "DQ.P1.C01.P0005",
    "DQ.P1.C16.P0002", "DQ.P1.C16.P0003",
}
# (b) citas no contenidas por variantes de la migración fuzzy (legado):
CITAS_LEGADO_NO_CONTENIDAS = {
    ("DQ.Q.000204", "DQ.P1.C06.P0005"), ("DQ.Q.000206", "DQ.P1.C06.P0006"),
    ("DQ.Q.000208", "DQ.P1.C06.P0002"), ("DQ.Q.000210", "DQ.P1.C11.P0001"),
    ("DQ.Q.000216", "DQ.P1.C11.P0001"), ("DQ.Q.000217", "DQ.P1.C18.P0002"),
    ("DQ.Q.000220", "DQ.P1.C18.P0001"), ("DQ.Q.000221", "DQ.P1.C18.P0002"),
    ("DQ.Q.000225", "DQ.P1.C18.P0004"), ("DQ.Q.000227", "DQ.P2.C01.P0001"),
    ("DQ.Q.000229", "DQ.P2.C01.P0002"), ("DQ.Q.000231", "DQ.P2.C01.P0002"),
    ("DQ.Q.000235", "DQ.P2.C74.P0005"), ("DQ.Q.000236", "DQ.P2.C74.P0003"),
    ("DQ.Q.000238", "DQ.P2.C74.P0006"),
}

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
    if pid in PARATEXTO_REGISTRADO:
        comprobar(pid not in ("DQ.P1.C01.P0002", "DQ.P1.C01.P0003", "DQ.P1.C01.P0004",
                              "DQ.P1.C16.P0002", "DQ.P1.C16.P0003")
                  or any(h in t for h in lineas_encabezado) or not en_limites,
                  f"{pid}: excepción paratexto ya cumple las reglas; retirar del registro")
        continue
    comprobar(en_limites, f"{pid}: rango fuera de los límites de {p['chapter_id']}")
    incrustado = next((h for h in lineas_encabezado if h in t), None)
    if incrustado is not None:
        comprobar(False,
                  f"{pid}: encabezado incrustado en el texto narrativo ({incrustado[:40]!r})")
    comprobar(FIRMA_I20 not in t, f"{pid}: firma de sangrado del capítulo XX")

for nombre in sorted(os.listdir(ruta_q)):
    if not nombre.endswith(".json"):
        continue
    q = json.load(open(os.path.join(ruta_q, nombre), encoding="utf-8"))
    for e in q.get("evidence", []):
        cita = e.get("quote", "")
        pid = e.get("passage_id")
        if not pid:
            continue
        if "después de a los padres" in cita:
            comprobar(pid in PARATEXTO_REGISTRADO,
                      f"{q['id']}: firma de I,20 en cita sobre pasaje no registrado")
            continue
        destino = leer_pass(pid)["text_original"] if os.path.exists(
            os.path.join(ruta_pass, pid + ".json")) else ""
        if destino and plano(cita) not in plano(destino):
            comprobar((q["id"], pid) in CITAS_LEGADO_NO_CONTENIDAS,
                      f"{q['id']}: cita no contenida en {pid} (no registrada como legado)")

if FALLOS:
    print(f"TEST LÍMITES DE CAPÍTULO: {len(FALLOS)} fallo/s")
    for f in FALLOS:
        print("  -", f)
    sys.exit(1)
print("OK: 126 encabezados; guardia en migración; I,21 cerrado (P0001–P0006 "
      "limpios y en límites; Q.313–Q.318 con citas contenidas y O04=Sancho); "
      "encabezados incrustados prohibidos salvo paratexto registrado; "
      "contención global salvo 15 citas legadas congeladas")
