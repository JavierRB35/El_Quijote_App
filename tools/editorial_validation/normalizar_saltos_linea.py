#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Normaliza los saltos de línea duros heredados del txt de PG 2000 (líneas
cortadas ~75 columnas, artefacto del formato plano) en los textos ya
generados del paquete piloto. Modo CONTENIDOS.

Los \n no son del texto de Cervantes y no deben verse en la app: esta
herramienta colapsa todo whitespace interior a un espacio en
`text_original` de los passages (recalculando `sha256` y `text_indexable`)
y en las `evidence[].quote` de los questions. Los campos `anchor` y
`position` se conservan intactos: documentan el segmento de la FUENTE,
que no se altera. Reparación de 2026-11-08; los generadores ya
normalizan por sí mismos (ver plano() en migrar_bateria_a_gutenberg.py).
Idempotente: sobre datos ya normalizados no cambia nada.
Uso: python -I normalizar_saltos_linea.py <raiz_repo>
"""
import sys, os, re, json, hashlib

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
PKG = os.path.join(REPO, "content", "piloto")

def plano(s):
    return re.sub(r"\s+", " ", s).strip()

def sha_txt(s):
    return "sha256:" + hashlib.sha256(s.encode("utf-8")).hexdigest()

def escribir(ruta, obj):
    with open(ruta, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

pasajes_cambiados, evidencias_cambiadas = 0, 0

dir_pass = os.path.join(PKG, "passages")
for nombre in sorted(os.listdir(dir_pass)):
    if not nombre.endswith(".json"):
        continue
    ruta = os.path.join(dir_pass, nombre)
    p = json.load(open(ruta, encoding="utf-8"))
    nuevo = plano(p.get("text_original", ""))
    if nuevo != p.get("text_original"):
        p["text_original"] = nuevo
        p["sha256"] = sha_txt(nuevo)
        p["text_indexable"] = re.sub(r"\s+", " ", re.sub(r"[«»„“”!¡?¿.,;:()—–-]", "", nuevo.lower()))
        escribir(ruta, p)
        pasajes_cambiados += 1

dir_q = os.path.join(PKG, "questions")
for nombre in sorted(os.listdir(dir_q)):
    if not nombre.endswith(".json"):
        continue
    ruta = os.path.join(dir_q, nombre)
    q = json.load(open(ruta, encoding="utf-8"))
    cambio = False
    for e in q.get("evidence", []):
        if "quote" in e:
            limpio = plano(e["quote"])
            if limpio != e["quote"]:
                e["quote"] = limpio
                cambio = True
    if cambio:
        escribir(ruta, q)
        evidencias_cambiadas += 1

print("NORMALIZACION OK: pasajes=%d questions_con_evidencia=%d" % (pasajes_cambiados, evidencias_cambiadas))
