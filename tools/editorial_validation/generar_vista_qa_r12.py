#!/usr/bin/env python3
"""Genera la vista de conciliación QA (dictamen H5/reauditoría y coordinación
PR #35/#36): cruza las matrices de vínculos (congeladas como instantánea) con
el registro maestro R12 (`docs/data/registro_revision_visual.csv`, 678 recursos,
cruzando por `ruta_asset` ↔ `ruta`).

Salida: docs/data/vinculos_consolidados_estado_qa_r12.csv
  - Filas de vinculos_visuales_consolidados.csv (2.805) y
    matriz_consolidada_aprovechamiento_visual.csv (759), etiquetadas por origen.
  - Columnas nuevas: qa_r12_estado, qa_r12_fecha, qa_r12_inspeccion,
    qa_r12_coincidencia (VIGENTE | DESACTUALIZADA | SIN_INSPECCION_R12).
  - Las adendas de tratamiento (021 = alegoría; 025 = apoyo ilustrado no
    literal) se anotan en `tratamiento_adenda_r12`.

Los CSV origen NO se modifican (precedente PR #35): esta vista es derivada.
"""
from __future__ import annotations

import csv
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
REGISTRO = REPO / "docs/data/registro_revision_visual.csv"
ORIGENES = [
    (REPO / "docs/data/vinculos_visuales_consolidados.csv", "MATRIZ_2805", "ruta_asset"),
    (REPO / "docs/data/matriz_consolidada_aprovechamiento_visual.csv", "VISTA_759", "asset_path"),
]
SALIDA = REPO / "docs/data/vinculos_consolidados_estado_qa_r12.csv"

# Tratamientos obligatorios de la adenda R12 (docs/ADENDA_R12_TRATAMIENTO_ACUARELAS_021_025.md)
ADENDA = {
    "assets/ilustraciones_tusell/acuarelas/021.jpg": "ADENDA_R12: ALEGORÍA de expurgo — prohibido uso como documentación literal del escrutinio",
    "assets/ilustraciones_tusell/acuarelas/025.jpg": "ADENDA_R12: apoyo ilustrado NO literal (narración ilustrada); recreación literal diferible",
}

COLUMNAS_IDENTIDAD = [
    "vinculo_propuesta_id", "accion", "ruta_asset", "destino", "tipo_destinatario",
    "id_destinatario", "capitulo_contexto", "fase_normalizada", "clase_de_imagen",
]


def main() -> None:
    maestro: dict[str, dict] = {}
    with REGISTRO.open(encoding="utf-8-sig", newline="") as f:
        for fila in csv.DictReader(f):
            maestro[fila["ruta"]] = fila

    filas_salida: list[dict] = []
    contador: Counter = Counter()
    divergencias: dict[str, list] = {}

    for origen_path, origen_id, col_ruta in ORIGENES:
        with origen_path.open(encoding="utf-8-sig", newline="") as f:
            lector = csv.DictReader(f)
            columnas = lector.fieldnames or []
            for fila in lector:
                ruta = fila.get(col_ruta, "")
                reg = maestro.get(ruta)
                if reg is None:
                    coincidencia, estado, fecha, insp = "SIN_INSPECCION_R12", "", "", ""
                else:
                    estado = reg.get("estado", "")
                    fecha = reg.get("fecha_revision", "")
                    insp = reg.get("inspeccion_visual_efectiva", "")
                    # ¿Coincide el estado QA anotado en la matriz con el vigente R12?
                    anotados = {fila.get("inspeccion_visual_r12", ""), fila.get("dictamen_r12", ""),
                                fila.get("recomendacion_r12", "")}
                    coincide = (
                        ("PENDIENTE" in estado and any("PENDIENTE" in a or a == "" for a in anotados if a))
                        or any(a and a in estado for a in anotados if a)
                        or estado in anotados
                    )
                    coincidencia = "VIGENTE" if coincide else "DESACTUALIZADA"
                    if coincidencia == "DESACTUALIZADA":
                        divergencias.setdefault(ruta, []).append((fila.get("vinculo_propuesta_id", ""), estado))
                contador[(origen_id, coincidencia)] += 1
                salida = {k: fila.get(k, "") for k in COLUMNAS_IDENTIDAD if k in columnas}
                salida.update({
                    "origen_matriz": origen_id,
                    "qa_r12_estado": estado,
                    "qa_r12_fecha": fecha,
                    "qa_r12_inspeccion": insp,
                    "qa_r12_coincidencia": coincidencia,
                    "tratamiento_adenda_r12": ADENDA.get(ruta, ""),
                })
                filas_salida.append(salida)

    with SALIDA.open("w", encoding="utf-8-sig", newline="") as f:
        escritor = csv.DictWriter(f, fieldnames=list(filas_salida[0].keys()))
        escritor.writeheader()
        escritor.writerows(filas_salida)

    print(f"Vista generada: {SALIDA.relative_to(REPO)} ({len(filas_salida)} filas)")
    for (origen, coinc), n in sorted(contador.items()):
        print(f"  {origen:12} {coinc:22} {n}")
    recursos_div = sorted(divergencias)
    print(f"Recursos con estado desactualizado: {len(recursos_div)}")
    for r in recursos_div[:30]:
        print(f"  - {r}: {[e for _, e in divergencias[r][:1]]}")


if __name__ == "__main__":
    main()
