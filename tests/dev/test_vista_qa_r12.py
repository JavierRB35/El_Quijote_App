#!/usr/bin/env python3
"""Prueba de la vista de conciliación QA R12 — v2 (recuentos versionados).

Historial de recuentos (dictamen H5-R14 y fuente QA):
  v1 (2026-11-06, registro R12 previo a los 26 visados): 168 / 44 / 28
     recursos, 43 decisiones sin imagen + 1 referencia externa — recuentos
     del dictamen H5-R14 (PR #39).
  v2 (2026-11-06, registro R12 con los 26 visados aplicados, PR #45):
     188 / 48 / 31 recursos.

Lección del dictamen (observación no bloqueante → hoy operativa): los
recuentos fijos se VERSIONAN cuando cambia legítimamente la fuente QA.
Por eso esta prueba NO fija recuentos absolutos: verifica INVARIANTES
estructurales y comprueba el generador contra una RECOMPUTACIÓN
INDEPENDIENTE de la regla exacta, de modo que cualquier cambio legítimo
de la fuente pasa mientras generador y regla coincidan, y cualquier bug
del generador (como la heurística de la v1) falla.
"""
from __future__ import annotations

import csv
import subprocess
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = Path(__file__).resolve().parents[2]
GENERADOR = REPO / "tools/editorial_validation/generar_vista_qa_r12.py"
VISTA = REPO / "docs/data/vinculos_consolidados_estado_qa_r12.csv"
REGISTRO = REPO / "docs/data/registro_revision_visual.csv"

FUENTES = [
    ("MATRIZ_2805", REPO / "docs/data/vinculos_visuales_consolidados.csv",
     "ruta_asset", "vinculo_propuesta_id", "dictamen_r12", "inspeccion_visual_r12"),
    ("VISTA_759", REPO / "docs/data/matriz_consolidada_aprovechamiento_visual.csv",
     "asset_path", "registro_id", "r12_estado_parcial", "r12_inspeccion_visual"),
]

ADENDA = {
    "assets/ilustraciones_tusell/acuarelas/021.jpg": "ALEGORÍA",
    "assets/ilustraciones_tusell/acuarelas/025.jpg": "NO literal",
}


def esperado_para(fila: dict, col_ruta: str, col_estado: str, col_insp: str,
                  registro: dict[str, dict]) -> str:
    """Recomputación independiente de la coincidencia esperada (regla exacta)."""
    eid = fila.get("estado_id", "")
    ruta = (fila.get(col_ruta) or "").strip()
    if eid == "NO_ASSET_LOCAL":
        return "DECISION_SIN_IMAGEN_LOCAL"
    if eid == "FICHA_EXTERNA_SIN_BINARIO":
        return "REFERENCIA_EXTERNA"
    if not ruta:
        return "SIN_RUTA_LOCAL"
    reg = registro.get(ruta)
    if reg is None:
        return "RECURSO_SIN_INSPECCION_R12"
    if (fila.get(col_estado, "") != reg.get("estado", "")) or (
            fila.get(col_insp, "") != reg.get("inspeccion_visual_efectiva", "")):
        return "DESACTUALIZADA"
    return "VIGENTE"


def main() -> int:
    fallos: list[str] = []
    ok = lambda cond, msg: fallos.append(msg) if not cond else None

    # 1) Regenerar la vista con el generador canónico.
    subprocess.run([sys.executable, "-I", str(GENERADOR)], check=True,
                   capture_output=True, text=True, encoding="utf-8", errors="replace")
    with VISTA.open(encoding="utf-8-sig", newline="") as f:
        vista = list(csv.DictReader(f))

    # 2) Registro maestro independiente.
    registro: dict[str, dict] = {}
    with REGISTRO.open(encoding="utf-8-sig", newline="") as f:
        for r in csv.DictReader(f):
            registro[r["ruta"]] = r

    # 3) Invariante 1 — conservación de identificación (100 %).
    for origen, col_id, prefijo in (("MATRIZ_2805", "m_vinculo_propuesta_id", "m_"),
                                    ("VISTA_759", "v_registro_id", "v_")):
        filas = [f for f in vista if f["origen_matriz"] == origen]
        ok(len(filas) > 0, f"{origen}: tiene filas")
        identificados = sum(1 for f in filas if f["id_relacion"] != "")
        ok(identificados == len(filas),
           f"{origen}: identificación preservada ({identificados}/{len(filas)})")
        rutas = sum(1 for f in filas if any(k.startswith(prefijo) and f[k] for k in f))
        ok(rutas == len(filas), f"{origen}: columnas de origen preservadas ({rutas}/{len(filas)})")

    # 4) Invariante 2 — recomputación independiente coincide con el generador
    #    (etiqueta a etiqueta, las 3.564 filas). La vista preserva las columnas
    #    de origen prefijadas (m_*/v_*): la recomputación lee de ahí.
    for origen, _, _, _, col_estado, col_insp in FUENTES:
        pref = "m_" if origen == "MATRIZ_2805" else "v_"
        col_ruta_pref = "m_ruta_asset" if origen == "MATRIZ_2805" else "v_asset_path"
        filas = [f for f in vista if f["origen_matriz"] == origen]
        for f in filas:
            espejo = {col_ruta_pref: f.get(col_ruta_pref, ""),
                      col_estado: f.get(pref + col_estado, ""),
                      col_insp: f.get(pref + col_insp, "")}
            if origen == "VISTA_759":
                espejo["estado_id"] = f.get("v_estado_id", "")
            esperado = esperado_para(espejo, col_ruta_pref, col_estado, col_insp, registro)
            if origen == "VISTA_759" and espejo.get("estado_id") in ("NO_ASSET_LOCAL", "FICHA_EXTERNA_SIN_BINARIO"):
                esperado = ("DECISION_SIN_IMAGEN_LOCAL" if espejo["estado_id"] == "NO_ASSET_LOCAL"
                            else "REFERENCIA_EXTERNA")
            ok(f["coincidencia_qa"] == esperado,
               f"{origen} {f['id_relacion']}: generador dice "
               f"'{f['coincidencia_qa']}' y la recomputación '{esperado}'")

    # 5) Invariante 3 — reglas de clasificación de la vista 759.
    v759 = [f for f in vista if f["origen_matriz"] == "VISTA_759"]
    ok(all(f["coincidencia_qa"] == "DECISION_SIN_IMAGEN_LOCAL"
           for f in v759 if f.get("v_estado_id") == "NO_ASSET_LOCAL"),
       "vista 759: NO_ASSET_LOCAL ⇒ DECISION_SIN_IMAGEN_LOCAL (nunca 'sin inspeccionar')")
    ok(all(f["coincidencia_qa"] == "REFERENCIA_EXTERNA"
           for f in v759 if f.get("v_estado_id") == "FICHA_EXTERNA_SIN_BINARIO"),
       "vista 759: FICHA_EXTERNA_SIN_BINARIO ⇒ REFERENCIA_EXTERNA")

    # 6) Invariante 4 — tratamientos de la adenda R12 sobre 021/025.
    for sufijo, clave in (("021.jpg", "ALEGORÍA"), ("025.jpg", "NO literal")):
        filas = [f for f in vista if f["ruta_asset"].endswith("acuarelas/" + sufijo)]
        ok(len(filas) > 0, f"acuarela {sufijo}: filas presentes")
        ok(all(clave in f["tratamiento_adenda_r12"] for f in filas),
           f"acuarela {sufijo}: tratamiento de la adenda presente")

    # 7) Invariante 5 — coherencia de estados: sin fila VIGENTE y DESACTUALIZADA a la vez.
    ok(all(not (f["coincidencia_qa"] == "VIGENTE" and f["qa_r12_estado"] == "")
           for f in vista), "toda fila VIGENTE tiene estado del registro")

    # Resumen informativo (los recuentos son de la fuente vigente, no aserciones).
    resumen = {}
    for f in vista:
        resumen[f["origen_matriz"] + " · " + f["coincidencia_qa"]] = \
            resumen.get(f["origen_matriz"] + " · " + f["coincidencia_qa"], 0) + 1
    for k in sorted(resumen):
        print(f"  {k}: {resumen[k]}")

    if fallos:
        print("FALLOS:")
        for f in fallos:
            print("  -", f)
        print(f"VEREDICTO: VISTA QA FALLIDA ({len(fallos)})")
        return 1
    print(f"VEREDICTO: VISTA QA VERIFICADA — invariantes y recomputación independiente "
          f"coinciden en {len(vista)} filas (recuentos históricos v1: 168/44/28 · "
          f"v2: 188/48/31, documentados en el docstring)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
