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
from estructura_texto import cortes_mecanicos_residuales, _es_distico  # noqa: E402

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
    """Capítulo contractual de un ID que lo porta en su prefijo
    (pasajes DQ.P1.C08.P0001, escenas DQ.P1.C08.E01.S01)."""
    m = re.match(r"DQ\.P([12])\.C(\d{1,2})\.", pid + ".")
    return f"DQ.P{m.group(1)}.C{int(m.group(2)):02d}" if m else None


def capitulo_de_escena(scene_id):
    """Capítulo de un beat a través de su SCENE_ID (corrección PR #68): el
    patrón canónico de escena (DQ.P[12].C[NN].E[NN].S[NN]) porta el
    capítulo; nunca se deriva del ID del beat (DQ.BEAT.* no lo contiene)."""
    return capitulo_de(scene_id or "")


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
            "capitulo": capitulo_de_escena(b.get("scene_id", "")),
            "saltos_totales": saltos_totales,
            "cortes_que_presentacion_une": cortes_a_unir,
            "saltos_literarios": saltos_totales - cortes_a_unir,
        }

# ------------------------------- dísticos: constancia para revisión editorial
# Regla PR #68: los pares de 2 líneas cortas con corte estrecho se conservan
# como pareado SOLO con la señal del dístico (L2 puntada, L1 sin cierre de
# frase ni frase interior). Los que se unen por falta de señal quedan
# registrados aquí para revisión editorial (casos ambiguos).
def escanear_pareados(etiqueta, textos):
    conservados, unidos = [], []
    for clave, texto in textos:
        for parrafo in texto.replace("\r\n", "\n").split("\n\n"):
            lineas = [l.strip() for l in parrafo.split("\n") if l.strip()]
            if len(lineas) != 2 or len(lineas[0]) >= 60 or len(lineas[1]) >= 60:
                continue
            m = re.match(r"\S+", lineas[1])
            if not m or len(lineas[0]) + 1 + len(m.group(0)) >= 76:
                continue  # corte mecánico: unión sin ambigüedad
            destino = conservados if _es_distico(lineas[0], lineas[1]) else unidos
            destino.append({"registro": clave,
                            "par": f"{lineas[0][:40]} ⏎ {lineas[1][:40]}"})
    return etiqueta, conservados, unidos


pareados_conservados, pareados_unidos = [], []
_pareados = [
    escanear_pareados("passages.text_original",
                      [(pid, p.get("text_original", "")) for pid, p in pasajes.items()]),
    escanear_pareados("questions.evidence[].quote",
                      [(qid, e.get("quote", ""))
                       for qid, q in questions.items()
                       for e in q.get("evidence", []) if e.get("quote")]),
    escanear_pareados("beats.utterances[].texto_visible",
                      [(uid, i["detalle"] if False else "")
                       for uid, i in []] or
                      [(u["utterance_id"], u.get("texto_visible", ""))
                       for b in beats.values() for u in b.get("utterances", [])]),
]
for etiqueta, conservados, unidos in _pareados:
    for d in conservados:
        pareados_conservados.append({"campo": etiqueta, **d})
    for d in unidos:
        pareados_unidos.append({"campo": etiqueta, **d})

# ---------------------------------------------------------------- cobertura
capitulos_pasajes = sorted({capitulo_de(pid) for pid in pasajes} - {None})
# Los beats se atribuyen por scene_id (no por DQ.BEAT.*): corrección PR #68.
capitulos_beats = sorted({capitulo_de_escena(b.get("scene_id", "")) for b in beats.values()} - {None})
# Guardia de regresión: con beats en el paquete, su atribución por scene_id
# debe producir al menos un capítulo (el patrón canónico de escena lo porta).
if beats and not capitulos_beats:
    FALLOS.append("regresión: hay beats pero con_beats_historia quedó vacío "
                  "(el capítulo debe derivarse del scene_id, no de DQ.BEAT.*)")
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
    "disticos": {
        "regla": "2 líneas cortas + corte de edición + señal (L2 puntada, L1 sin cierre de frase ni frase interior)",
        "conservados_para_revision": pareados_conservados,
        "unidos_sin_señal_para_revision": pareados_unidos,
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
print(f"  pareados conservados (señal de dístico):        {len(pareados_conservados)}")
print(f"  pares 2 líneas unidos sin señal (revisar):      {len(pareados_unidos)}")
print(f"  informe JSON: {os.path.relpath(salida, REPO)}")

if FALLOS:
    print(f"\nRESIDUOS DE MAQUETACIÓN DETECTADOS ({len(FALLOS)}):")
    for f in FALLOS:
        print("  -", f)
    sys.exit(1)
print("\nOK: 0 saltos mecánicos residuales en todos los registros comprobados")
