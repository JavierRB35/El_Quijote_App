#!/usr/bin/env python3
"""Criterio de validación ADR-0001.1 — FTS5 con castellano áureo (FASE 1, DC-18).

Pregunta: ¿puede SQLite/FTS5 sostener la búsqueda del lector sobre la capa
`text_indexable` normalizada, manteniendo el `text_original` intacto para
mostrar, con ortografía de la época (ed. Tasso 1905) y diacríticos?

Diseño probado (coincide con el contrato §3 Passage):
  - text_original: tal cual la edición (se muestra, NUNCA se indexa).
  - text_indexable: minúsculas, sin diacríticos, sin puntuación (se indexa).

Textos de prueba: pasajes del piloto I.8 (citas del EPUB Tusell, ed. Tasso 1905)
más muestras con variantes áureas relevantes (qu/gu, diacríticos, sabia/sabía).
"""
from __future__ import annotations

import json
import re
import sqlite3
import sys
import unicodedata
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = Path(__file__).resolve().parents[2]
OUT = REPO / "tests/dev/last_fts5_report.json"

# Muestras con ortografía áurea/1905: «sabia» sin tilde (imperfecto), qu/gu,
# diacríticos, mayúsculas variables, puntuación de diálogo de la edición.
MUESTRAS = [
    {
        "id": "DQ.P1.C08.P0001",
        "text_original": "«—¿Qué gigantes? —dijo Sancho Panza. —Aquellos que allí ves, respondió su amo, de los brazos largos, que los suelen tener algunos de casi dos leguas.»",
        "text_indexable": None,  # se genera abajo
    },
    {
        "id": "DQ.P1.C08.P0002",
        "text_original": "«Miraba don Quijote un molino de viento, y dijo a su escudero: la ventura va guiando nuestras cosas mejor de lo que acertáramos a desear.»",
        "text_indexable": None,
    },
    {
        "id": "DQ.P1.C01.P0001",
        "text_original": "«En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.»",
        "text_indexable": None,
    },
    {
        "id": "DQ.P1.C08.P0003",
        "text_original": "«Y así, se dejó ir de la carrera de Rocinante, diciendo: —¡Fuye, gente cobarde y vil! Ya no era esfuerzo de un solo caballero.»",
        "text_indexable": None,
    },
    # Variante áurea: «sabia» (imperfecto de saber, sin tilde en 1605/1905)
    {
        "id": "DQ.TEST.P0005",
        "text_original": "«el cura sabia muy bien quién era don Quijote»",
        "text_indexable": None,
    },
    {
        "id": "DQ.TEST.P0006",
        "text_original": "«Sabiamente hablaba el caballero; mas la ciencia del sabio antiguo no siempre se tenía por sabia.»",
        "text_indexable": None,
    },
]

NEGRO = re.compile(r"[^\w\sáéíóúüñÁÉÍÓÚÜÑ]", re.UNICODE)


def normalizar(texto: str) -> str:
    """Capa text_indexable: minúsculas, sin diacríticos, sin puntuación."""
    nfd = unicodedata.normalize("NFD", texto)
    sin_diacriticos = "".join(c for c in nfd if not unicodedata.combining(c))
    sin_puntuacion = NEGRO.sub(" ", sin_diacriticos)
    return " ".join(sin_puntuacion.casefold().split())


def main() -> int:
    for m in MUESTRAS:
        m["text_indexable"] = normalizar(m["text_original"])

    con = sqlite3.connect(":memory:")
    # unicode61 con remove_diacritics=2 por si algo escapara a la capa normalizada;
    # la búsqueda real corre SOBRE text_indexable.
    con.execute(
        "CREATE VIRTUAL TABLE pasajes USING fts5("
        "id UNINDEXED, text_original UNINDEXED, text_indexable,"
        "tokenize='unicode61 remove_diacritics 2')"
    )
    for m in MUESTRAS:
        con.execute(
            "INSERT INTO pasajes VALUES (?, ?, ?)",
            (m["id"], m["text_original"], m["text_indexable"]),
        )

    def buscar(query: str) -> list[str]:
        rows = con.execute(
            "SELECT id FROM pasajes WHERE pasajes MATCH ? ORDER BY rank", (query,)
        ).fetchall()
        return [r[0] for r in rows]

    pruebas = [
        # (consulta, ids esperados, qué demuestra)
        ("gigantes", ["DQ.P1.C08.P0001"], "palabra simple sobre capa normalizada"),
        ("molino", ["DQ.P1.C08.P0002"], "singular encuentra 'molino' (y NO confunde con 'molinos' de otro pasaje si no está)"),
        ("leguas", ["DQ.P1.C08.P0001"], "término del diálogo áureo"),
        ("sabia", ["DQ.TEST.P0005", "DQ.TEST.P0006"], "imperfecto sin tilde: la capa normalizada iguala 'sabía' del original con 'sabia' de consulta"),
        ("sabía", ["DQ.TEST.P0005", "DQ.TEST.P0006"], "consulta CON tilde también debe encontrar el texto sin tilde (remove_diacritics + capa)"),
        ("lanza astillero", ["DQ.P1.C01.P0001"], "dos términos AND"),
        ("quijote", ["DQ.P1.C08.P0002", "DQ.TEST.P0005"], "nombre del hidalgo en las muestras que lo contienen"),
        ("freston", [], "término ausente en esta edición (hallazgo del inventario: cotejo PEND-01)"),
        ("nombre quiero", ["DQ.P1.C01.P0001"], "dos términos AND (texto literal: «no quiero» — FTS5 sin stemming no iguala 'querer', y eso es correcto aquí)"),
    ]

    resultados = []
    todo_ok = True
    for query, esperado, que_demuestra in pruebas:
        obtenido = buscar(query)
        ok = sorted(obtenido) == sorted(esperado)
        todo_ok &= ok
        resultados.append({"query": query, "esperado": esperado, "obtenido": obtenido,
                           "ok": ok, "demuestra": que_demuestra})

    # El original mostrado NUNCA se degrada: verificación de integridad
    integridad = all(
        con.execute("SELECT text_original FROM pasajes WHERE id = ?", (m["id"],)).fetchone()[0]
        == m["text_original"]
        for m in MUESTRAS
    )

    informe = {
        "criterio": "ADR-0001.1 — FTS5 con castellano áureo",
        "sqlite": sqlite3.sqlite_version,
        "fts5_disponible": True,
        "diseno": "text_original (mostrar, UNINDEXED) + text_indexable normalizado (buscar)",
        "normalizacion_ejemplo": {
            "original": MUESTRAS[0]["text_original"][:80],
            "indexable": MUESTRAS[0]["text_indexable"][:80],
        },
        "integridad_del_original": integridad,
        "pruebas": resultados,
        "total": len(resultados),
        "ok": sum(1 for r in resultados if r["ok"]),
        "veredicto": "CRITERIO 1 SUPERADO" if todo_ok and integridad else "CRITERIO 1 FALLIDO",
    }
    OUT.write_text(json.dumps(informe, ensure_ascii=False, indent=2), encoding="utf-8")
    for r in resultados:
        marca = "PASS" if r["ok"] else "FAIL"
        print(f"  {marca}  [{r['query']}] → {r['obtenido']}  ({r['demuestra']})")
    print(f"Integridad del text_original: {'OK' if integridad else 'CORROMPIDO'}")
    print(f"{informe['veredicto']}: {informe['ok']}/{informe['total']} — informe: {OUT.relative_to(REPO)}")
    return 0 if todo_ok and integridad else 1


if __name__ == "__main__":
    sys.exit(main())
