#!/usr/bin/env python3
"""Vista de conciliación QA (v2 — corrige los defectos detectados en la
reauditoría de PR #37 por Coordinación).

Reglas (dictamen de la reauditoría, verificado empíricamente):
  1. Normalización por fuente: cada matriz conserva TODAS sus columnas
     originales (prefijo `m_` para la 2.805, `v_` para la 759) — la
     identificación de cada relación (ID + ruta) nunca se pierde.
  2. Comparación por IGUALDAD EXACTA de dos campos:
       estado QA          → 2.805: `dictamen_r12`  | 759: `r12_estado_parcial`
       indicador inspección → 2.805: `inspeccion_visual_r12` | 759: `r12_inspeccion_visual`
     contra el registro maestro R12 (`estado` e `inspeccion_visual_efectiva`).
     Desactualizada si cualquiera de los dos difiere.
  3. Clasificación de filas sin recurso local (vista 759, columna `estado_id`):
       NO_ASSET_LOCAL          → DECISION_SIN_IMAGEN_LOCAL (43)
       FICHA_EXTERNA_SIN_BINARIO → REFERENCIA_EXTERNA (1, QBI)
     Nunca se etiquetan como «imágenes sin inspeccionar».
  4. Los CSV origen NO se modifican (precedente PR #35).

Recuentos por versión de la fuente QA (informativos, no aserciones — la
prueba verifica invariantes y recomputación independiente, ver
tests/dev/test_vista_qa_r12.py):
  v1 (registro previo a los 26 visados R12): 2.805: 168 desactualizadas /
  28 recursos · 759: 44 / 28 recursos · 43 decisiones sin imagen + 1
  referencia externa.
  v2 (registro con las 3 aperturas I,21 — DQ.MED.900025/900237/900167,
  PR #45): 2.805: 188 / 31 recursos · 759: 48 / 31 recursos · mismas
  43 decisiones + 1 referencia externa. El delta v1→v2 (+20/+4/+3)
  proviene íntegramente del indicador inspeccion_visual_efectiva NO→SI
  en esos 3 recursos; ningún estado QA cambió.
"""
from __future__ import annotations

import csv
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
REGISTRO = REPO / "docs/data/registro_revision_visual.csv"
SALIDA = REPO / "docs/data/vinculos_consolidados_estado_qa_r12.csv"

ADENDA = {
    "assets/ilustraciones_tusell/acuarelas/021.jpg": "ADENDA_R12: ALEGORÍA de expurgo — prohibido uso como documentación literal del escrutinio",
    "assets/ilustraciones_tusell/acuarelas/025.jpg": "ADENDA_R12: apoyo ilustrado NO literal (narración ilustrada); recreación literal diferible",
}


def _cargar(ruta: Path) -> tuple[list[str], list[dict]]:
    with ruta.open(encoding="utf-8-sig", newline="") as f:
        lector = csv.DictReader(f)
        return list(lector.fieldnames or []), list(lector)


def generar() -> dict:
    maestro: dict[str, dict] = {}
    with REGISTRO.open(encoding="utf-8-sig", newline="") as f:
        for fila in csv.DictReader(f):
            maestro[fila["ruta"]] = fila

    # Normalización por fuente: (origen, columnas_originales, filas, col_ruta,
    # col_id, col_estado_qa, col_inspeccion)
    fuentes = []
    cols, filas = _cargar(REPO / "docs/data/vinculos_visuales_consolidados.csv")
    fuentes.append(("MATRIZ_2805", cols, filas, "ruta_asset", "vinculo_propuesta_id", "dictamen_r12", "inspeccion_visual_r12", "m_"))
    cols, filas = _cargar(REPO / "docs/data/matriz_consolidada_aprovechamiento_visual.csv")
    fuentes.append(("VISTA_759", cols, filas, "asset_path", "registro_id", "r12_estado_parcial", "r12_inspeccion_visual", "v_"))

    filas_salida: list[dict] = []
    contador: Counter = Counter()
    recursos_desact: set[str] = set()

    for origen, cols, filas, col_ruta, col_id, col_estado, col_insp, prefijo in fuentes:
        for fila in filas:
            ruta = (fila.get(col_ruta) or "").strip()
            eid = fila.get("estado_id", "")
            salida: dict = {"origen_matriz": origen, "id_relacion": fila.get(col_id, ""),
                            "ruta_asset": ruta, "coincidencia_qa": "", "qa_r12_estado": "",
                            "qa_r12_fecha": "", "qa_r12_inspeccion_efectiva": "",
                            "tratamiento_adenda_r12": ADENDA.get(ruta, "")}
            # 3) Clasificación de filas sin recurso local (vista 759)
            if origen == "VISTA_759" and eid == "NO_ASSET_LOCAL":
                salida["coincidencia_qa"] = "DECISION_SIN_IMAGEN_LOCAL"
            elif origen == "VISTA_759" and eid == "FICHA_EXTERNA_SIN_BINARIO":
                salida["coincidencia_qa"] = "REFERENCIA_EXTERNA"
            elif not ruta:
                salida["coincidencia_qa"] = "SIN_RUTA_LOCAL"
            else:
                reg = maestro.get(ruta)
                if reg is None:
                    salida["coincidencia_qa"] = "RECURSO_SIN_INSPECCION_R12"
                else:
                    # 2) Igualdad exacta de estado QA e indicador de inspección
                    desact = (fila.get(col_estado, "") != reg.get("estado", "")) or (
                        fila.get(col_insp, "") != reg.get("inspeccion_visual_efectiva", ""))
                    salida["coincidencia_qa"] = "DESACTUALIZADA" if desact else "VIGENTE"
                    if desact:
                        recursos_desact.add(ruta)
                    salida["qa_r12_estado"] = reg.get("estado", "")
                    salida["qa_r12_fecha"] = reg.get("fecha_revision", "")
                    salida["qa_r12_inspeccion_efectiva"] = reg.get("inspeccion_visual_efectiva", "")
                contador[(origen, salida["coincidencia_qa"])] += 1
            # 1) Conservación total de la identificación original (prefijada)
            for col in cols:
                salida[prefijo + col] = fila.get(col, "")
            contador[(origen, "FILAS")] += 1
            filas_salida.append(salida)

    # Union ordenada de columnas: las dos fuentes tienen esquemas distintos
    # (37 columnas la 2.805; 44 la 759) — se conservan todas, prefijadas.
    fieldnames = list(dict.fromkeys(k for fila in filas_salida for k in fila))
    with SALIDA.open("w", encoding="utf-8-sig", newline="") as f:
        escritor = csv.DictWriter(f, fieldnames=fieldnames, restval="")
        escritor.writeheader()
        escritor.writerows(filas_salida)

    return {"filas": len(filas_salida), "contador": dict(contador),
            "recursos_desactualizados": sorted(recursos_desact)}


def main() -> None:
    import sys
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    r = generar()
    print(f"Vista generada: {SALIDA.relative_to(REPO)} ({r['filas']} filas)")
    for (origen, coinc), n in sorted(r["contador"].items()):
        print(f"  {origen:12} {coinc:28} {n}")
    print(f"Recursos con discrepancia: {len(r['recursos_desactualizados'])}")


if __name__ == "__main__":
    main()
