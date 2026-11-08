#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Restaura la ESTRUCTURA LITERARIA de los textos del paquete piloto frente a
los cortes mecánicos del txt de PG 2000. Modo CONTENIDOS.

El txt de PG trae la prosa cortada a ~75 columnas (artefacto de maquetación).
Esta herramienta, sobre los JSON ya generados:

  * `text_original` de los passages: une los cortes mecánicos y PRESERVA los
    saltos con valor literario — párrafos (\n\n), títulos, parlamentos
    (línea que empieza por «—») y estrofas/versos — transfiriéndolos del
    fichero fuente por alineación palabra a palabra (estructura_texto.py).
    Las palabras del texto NUNCA se alteran (solo-estructura); se recalculan
    `sha256` y `text_indexable` (este queda plano, para búsqueda).
  * `evidence[].quote` de los questions con `passage_id`: misma restauración
    tomando como referencia el pasaje ya estructurado. Las citas sin
    `passage_id` o no alineables se dejan tal cual y se listan.

`anchor` y `position` no se alteran: documentan el segmento de la FUENTE.
Nunca es objetivo declarar 0 \n en todos los textos: los saltos literarios
deben verse en la app (ver .evidencia con white-space: pre-line).
Idempotente: sobre datos ya restaurados no cambia nada.
Uso: python -I normalizar_saltos_linea.py <raiz_repo>
"""
import sys, os, re, json, hashlib

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from estructura_texto import restaurar_estructura, plano  # noqa: E402

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
PKG = os.path.join(REPO, "content", "piloto")
FUENTE = os.path.join(REPO, "content", "textos", "gutenberg_2000", "El_Quijote.txt")

fuente = open(FUENTE, encoding="utf-8").read().replace("\r\n", "\n")


def sha_txt(s):
    return "sha256:" + hashlib.sha256(s.encode("utf-8")).hexdigest()


def escribir(ruta, obj):
    with open(ruta, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)


pasajes_restaurados, pasajes_intactos = [], []
textos_estructurados: dict[str, str] = {}

dir_pass = os.path.join(PKG, "passages")
for nombre in sorted(os.listdir(dir_pass)):
    if not nombre.endswith(".json"):
        continue
    ruta = os.path.join(dir_pass, nombre)
    p = json.load(open(ruta, encoding="utf-8"))
    pos = p.get("position", {})
    if not pos:
        print("AVISO: pasaje sin position:", nombre)
        continue
    nuevo = restaurar_estructura(p.get("text_original", ""), fuente,
                                 pos["start_char"], pos["end_char"])
    if nuevo != p.get("text_original"):
        assert plano(nuevo) == plano(p["text_original"]), \
            "PALABRAS ALTERADAS en " + nombre
        p["text_original"] = nuevo
        p["sha256"] = sha_txt(nuevo)
        p["text_indexable"] = re.sub(
            r"\s+", " ",
            re.sub(r"[«»„“”!¡?¿.,;:()—–-]", "", nuevo.lower()),
        ).strip()
        escribir(ruta, p)
        pasajes_restaurados.append(nombre)
    else:
        pasajes_intactos.append(nombre)
    textos_estructurados[p["id"]] = nuevo

quotes_restauradas, quotes_sin_pasaje, quotes_flat = [], set(), set()
dir_q = os.path.join(PKG, "questions")
for nombre in sorted(os.listdir(dir_q)):
    if not nombre.endswith(".json"):
        continue
    ruta = os.path.join(dir_q, nombre)
    q = json.load(open(ruta, encoding="utf-8"))
    cambio = False
    for e in q.get("evidence", []):
        cita = e.get("quote")
        if not cita:
            continue
        pid = e.get("passage_id")
        if not pid:
            quotes_sin_pasaje.add(nombre)
            continue
        referencia = textos_estructurados.get(pid)
        if referencia is None:
            continue
        nueva = restaurar_estructura(cita, referencia, 0, len(referencia))
        if nueva != cita:
            assert plano(nueva) == plano(cita), \
                "PALABRAS ALTERADAS en evidencia de " + nombre
            e["quote"] = nueva
            cambio = True
            quotes_restauradas.append(nombre)
        elif "\n" not in nueva:
            quotes_flat.add(nombre)
    if cambio:
        escribir(ruta, q)

print("RESTAURACIÓN DE ESTRUCTURA OK")
print("  pasajes restaurados:", len(pasajes_restaurados))
print("  pasajes ya estructurados (intactos):", len(pasajes_intactos))
print("  questions con citas estructuradas:", len(set(quotes_restauradas)))
print("  questions con cita plana sin estructura en la fuente (prosa continua):",
      len(quotes_flat))
print("  questions con citas sin passage_id (no se tocan):", len(quotes_sin_pasaje))
