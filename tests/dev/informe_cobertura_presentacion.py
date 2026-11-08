#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Informe automático de cobertura de presentación textual (encargo P1).

Garantiza de forma SISTÉMICA que los saltos mecánicos del fichero Gutenberg
no llegan a la pantalla, sin eliminar los saltos literarios auténticos.
Distingue, para cada familia de registros del catálogo, la capa que aplica
la normalización de presentación:

  * DATOS normalizados (`restaurar_estructura`, PR #59 y extracción
    estructurada): `text_original` de passages y `evidence[].quote` de
    questions. Aquí el detector `cortes_mecanicos_residuales` debe dar CERO
    para todo registro comprobado — cualquier residuo es un fallo (exit 1).
  * PRESENTACIÓN en runtime (`textoParaPantalla`, app/src/presentacion.ts):
    `texto_visible` de las intervenciones de Historia, verbatim del fuente
    por contrato (los JSON no se tocan). El informe cuenta los cortes que
    la transformación une; su corrección la acreditan las pruebas node
    (tests/presentacion.test.ts) que corre el job de frontend.

Cobertura: los capítulos «incorporados» son los que tienen pasajes o beats
en el paquete; el resto de los 126 capítulos queda registrado como
«no incorporado» (pendiente de importación, sin verificación posible).

Salida: docs/data/cobertura_presentacion.json + resumen en consola.
Uso: python -I informe_cobertura_presentacion.py <raiz_repo>
"""
import json
import os
import re
import sys

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
sys.path.insert(0, os.path.join(REPO, "tools", "editorial_validation"))
from estructura_texto import cortes_mecanicos_residuales  # noqa: E402

PKG = os.path.join(REPO, "content", "piloto")

FALLOS: list[str] = []


def cargar(categoria):
    manifest = json.load(open(os.path.join(PKG, "package.json"), encoding="utf-8"))
    registros = {}
    for rel in manifest["files"].get(categoria, []):
        registros[rel.split("/")[-1][:-5]] = json.load(
            open(os.path.join(PKG, rel.replace("/", os.sep)), encoding="utf-8"))
    return registros


def capitulo_de(pid):
    m = re.match(r"DQ\.P([12])\.C(\d{1,2})\.", pid + ".")
    return f"DQ.P{m.group(1)}.C{int(m.group(2)):02d}" if m else None


pasajes = cargar("passages")
questions = cargar("questions")
beats = cargar("beats")

# ---------------------------------------------------------------- pasajes
residuos_pasajes = {}
for pid, p in sorted(pasajes.items()):
    residuos = cortes_mecanicos_residuales(p.get("text_original", ""))
    if residuos:
        residuos_pasajes[pid] = residuos
        FALLOS.append(f"pasaje {pid}: {len(residuos)} salto/s mecánico/s residual/es")

# ---------------------------------------------------------------- citas
residuos_citas = {}
total_citas = 0
for qid, q in sorted(questions.items()):
    for e in q.get("evidence", []):
        cita = e.get("quote")
        if not cita:
            continue
        total_citas += 1
        residuos = cortes_mecanicos_residuales(cita)
        if residuos:
            residuos_citas.setdefault(qid, []).extend(residuos)
            FALLOS.append(f"cita de {qid} → {e.get('passage_id')}: "
                          f"{len(residuos)} salto/s mecánico/s residual/es")

# --------------------------------------------- intervenciones de Historia
# texto_visible es verbatim (con cortes de maquetación por diseño); la
# presentación runtime los une. Contamos cuántos cortes uniría la capa de
# presentación (saltos simples fuera de bloques de verso).
intervenciones = {}
for bid, b in sorted(beats.items()):
    for u in b.get("utterances", []):
        texto = u.get("texto_visible", "")
        cortes_a_unir = len(cortes_mecanicos_residuales(texto))
        saltos_totales = texto.count("\n") - 2 * texto.count("\n\n")
        intervenciones[u["utterance_id"]] = {
            "beat": bid,
            "capitulo": capitulo_de(b.get("scene_id", "") or bid),
            "saltos_totales": saltos_totales,
            "cortes_que_presentacion_une": cortes_a_unir,
            "saltos_literarios": saltos_totales - cortes_a_unir,
        }
        # invariante literario: la presentación NO debe eliminar saltos que
        # el detector considera literarios (versos). Si un texto tiene solo
        # versos, la presentación debe conservarlos — lo acredita el test node.

# ---------------------------------------------------------------- cobertura
capitulos_pasajes = sorted({capitulo_de(pid) for pid in pasajes} - {None})
capitulos_beats = sorted({capitulo_de(bid) for bid in beats} - {None})
incorporados = sorted(set(capitulos_pasajes) | set(capitulos_beats))
TODOS = [f"DQ.P1.C{n:02d}" for n in range(1, 53)] + \
        [f"DQ.P2.C{n:02d}" for n in range(1, 75)]
no_incorporados = [c for c in TODOS if c not in incorporados]

informe = {
    "generado": "informe_cobertura_presentacion.py (encargo P1)",
    "regla_corte_mecanico": "holgura len(l1)+1+len(p2) >= 76; verso = bloque de líneas <60 sin corte mecánico",
    "campos": {
        "passages.text_original": {
            "capa": "datos (restaurar_estructura, PR #59)",
            "registros": len(pasajes),
            "comprobados": len(pasajes) - len(residuos_pasajes),
            "con_residuos": residuos_pasajes,
        },
        "questions.evidence[].quote": {
            "capa": "datos (restaurar_estructura, PR #59)",
            "citas": total_citas,
            "questions_con_residuos": residuos_citas,
        },
        "beats.utterances[].texto_visible": {
            "capa": "presentación runtime (textoParaPantalla, app/src/presentacion.ts; JSON verbatim intacto)",
            "intervenciones": len(intervenciones),
            "verificacion_runtime": "app/tests/presentacion.test.ts (job frontend)",
            "detalle": intervenciones,
        },
        "lector": {
            "capa": "pendiente de implementación; aplicará textoParaPantalla al pasar a existir UI",
        },
    },
    "cobertura": {
        "capitulos_total": len(TODOS),
        "capitulos_incorporados": incorporados,
        "capitulos_no_incorporados": no_incorporados,
        "con_pasajes": capitulos_pasajes,
        "con_beats_historia": capitulos_beats,
    },
}

os.makedirs(os.path.join(REPO, "docs", "data"), exist_ok=True)
salida = os.path.join(REPO, "docs", "data", "cobertura_presentacion.json")
with open(salida, "w", encoding="utf-8") as fh:
    json.dump(informe, fh, ensure_ascii=False, indent=1)

print("INFORME DE COBERTURA DE PRESENTACIÓN")
print(f"  pasajes comprobados (0 residuos): {len(pasajes) - len(residuos_pasajes)}/{len(pasajes)}")
print(f"  citas comprobadas (0 residuos):   {total_citas - sum(len(v) for v in residuos_citas.values())}/{total_citas}")
n_interv = len(intervenciones)
con_cortes = sum(1 for v in intervenciones.values() if v["cortes_que_presentacion_une"] > 0)
print(f"  intervenciones de Historia:       {n_interv} (presentación runtime; "
      f"{con_cortes} con cortes que la transformación une)")
print(f"  capítulos incorporados:           {len(incorporados)}/{len(TODOS)} → {', '.join(incorporados)}")
print(f"  capítulos no incorporados:        {len(no_incorporados)} (pendientes de importación)")
print(f"  informe JSON: {os.path.relpath(salida, REPO)}")

if FALLOS:
    print(f"\nRESIDUOS DE MAQUETACIÓN DETECTADOS ({len(FALLOS)}):")
    for f in FALLOS:
        print("  -", f)
    sys.exit(1)
print("\nOK: 0 saltos mecánicos residuales en todos los registros comprobados")
