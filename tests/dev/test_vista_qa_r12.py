#!/usr/bin/env python3
"""Prueba automática de la vista de conciliación QA R12 (dictamen de la
reauditoría de PR #37). Regenera la vista y verifica:

  1. Recuentos del dictamen: 168 desactualizadas en la matriz 2.805 (28
     recursos), 44 en la vista 759, 43 decisiones sin imagen local + 1
     referencia externa QBI.
  2. Conservación de identificación: 2.805/2.805 IDs R05C-* y 759/759 IDs
     CAV-* preservados.
  3. Casos concretos: 021 DESACTUALIZADA con tratamiento ALEGORÍA; 025 con
     tratamiento APOYO NO LITERAL; Q.112 (DQ.MA.000026) presente.

Regenerable y determinista; cualquier regresión del generador la detecta.
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


def main() -> int:
    subprocess.run([sys.executable, "-I", str(GENERADOR)], check=True,
                   capture_output=True, text=True, encoding="utf-8", errors="replace")
    with VISTA.open(encoding="utf-8-sig", newline="") as f:
        filas = list(csv.DictReader(f))

    def contar(**filtros) -> int:
        return sum(1 for f in filas if all(f.get(k, "") == v for k, v in filtros.items()))

    fallos: list[str] = []
    ok = lambda cond, msg: fallos.append(msg) if not cond else None

    ok(contar(origen_matriz="MATRIZ_2805") == 2805, "matriz 2805: total filas")
    ok(contar(origen_matriz="VISTA_759") == 759, "vista 759: total filas")
    ok(contar(origen_matriz="MATRIZ_2805", coincidencia_qa="DESACTUALIZADA") == 168,
       "dictamen: 168 desactualizadas en matriz 2.805")
    ok(contar(origen_matriz="VISTA_759", coincidencia_qa="DESACTUALIZADA") == 44,
       "dictamen: 44 desactualizadas en vista 759")
    ok(contar(origen_matriz="VISTA_759", coincidencia_qa="DECISION_SIN_IMAGEN_LOCAL") == 43,
       "dictamen: 43 decisiones sin imagen local (NO_ASSET_LOCAL)")
    ok(contar(origen_matriz="VISTA_759", coincidencia_qa="REFERENCIA_EXTERNA") == 1,
       "dictamen: 1 referencia externa (QBI, FICHA_EXTERNA_SIN_BINARIO)")

    ids_matriz = [f["id_relacion"] for f in filas if f["origen_matriz"] == "MATRIZ_2805"]
    ids_vista = [f["id_relacion"] for f in filas if f["origen_matriz"] == "VISTA_759"]
    ok(sum(1 for i in ids_matriz if i.startswith("R05C-")) == 2805, "identificación R05C-* preservada")
    ok(sum(1 for i in ids_vista if i.startswith("CAV-")) == 759, "identificación CAV-* preservada")

    filas_021 = [f for f in filas if f["ruta_asset"].endswith("acuarelas/021.jpg")
                 and f["origen_matriz"] == "MATRIZ_2805"]
    ok(len(filas_021) == 7 and all(f["coincidencia_qa"] == "DESACTUALIZADA" for f in filas_021),
       "021: 7 vínculos de matriz DESACTUALIZADOS")
    ok(all("ALEGORÍA" in f["tratamiento_adenda_r12"] for f in filas_021), "021: tratamiento ALEGORÍA")
    filas_025 = [f for f in filas if f["ruta_asset"].endswith("acuarelas/025.jpg")
                 and f["origen_matriz"] == "MATRIZ_2805"]
    ok(len(filas_025) == 4 and all("NO literal" in f["tratamiento_adenda_r12"] for f in filas_025),
       "025: tratamiento APOYO NO LITERAL")
    cav_021 = [f["id_relacion"] for f in filas if f["ruta_asset"].endswith("acuarelas/021.jpg")
               and f["origen_matriz"] == "VISTA_759"]
    ok(set(cav_021) == {"CAV-0082", "CAV-0103"}, "021 en vista 759: CAV-0082 y CAV-0103 identificadas")
    q112 = [f for f in filas if f["id_relacion"] == "R05C-000050" or "DQ.Q.000112" in f.get("m_id_destinatario", "")]
    ok(len(q112) >= 1, "Q.112 presente en la vista")

    if fallos:
        print("FALLOS:")
        for f in fallos:
            print("  -", f)
        print(f"VEREDICTO: VISTA QA FALLIDA ({len(fallos)})")
        return 1
    print(f"VEREDICTO: VISTA QA VERIFICADA — recuentos del dictamen reproducidos "
          f"(168/44/43+1, identificación 100 %), {len(filas)} filas")
    return 0


if __name__ == "__main__":
    sys.exit(main())
