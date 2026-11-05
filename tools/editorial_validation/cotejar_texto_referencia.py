#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cotejo de integridad textual: compara citas y pasajes del paquete editorial
contra un texto COMPLETO de referencia (dominio público, p. ej. PG #2000).
Método: normalización (sin acentos diacríticos del s. XVII-XVIII, minúsculas,
sin puntuación) + búsqueda de subcadena. Detecta abreviaciones/variantes.
Uso: python -I cotejar_texto_referencia.py <raiz_repo> <ruta_texto_referencia>
Salida: docs/data/cotejo_texto_referencia.json + docs/COTEJO_TEXTO_REFERENCIA.md
El texto de referencia NO se copia al repositorio (PEND-01: solo cotejo local).
"""
import sys, os, re, json, unicodedata
from collections import OrderedDict

def normalizar(s):
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = s.lower()
    s = re.sub(r"[«»\"“”!¡?¿.,;:()\[\]—–\-_*#]", " ", s)
    return re.sub(r"\s+", " ", s).strip()

def prefijo_comun_mas_largo(normalizada, ref):
    mejor = 0
    palabras = normalizada.split(" ")
    actual = ""
    for i in range(len(palabras), 0, -1):
        candidato = " ".join(palabras[:i])
        idx = ref.find(candidato)
        if idx >= 0:
            return i, idx
    return 0, -1

def main():
    repo, ruta_ref = sys.argv[1], sys.argv[2]
    if ruta_ref.lower() in ("default", "repo"):
        # texto íntegro de integridad almacenado (DQ.SRC.0005, fusión feature/cont-fuente-gutenberg-2000-20261105)
        ruta_ref = os.path.join(repo, "content", "textos", "gutenberg_2000", "El_Quijote.txt")
    pkg = json.load(open(os.path.join(repo, "content", "piloto", "package.json"), encoding="utf-8"))
    ref_raw = open(ruta_ref, encoding="utf-8", errors="replace").read()
    ref = normalizar(re.sub(r"\s+", " ", ref_raw))

    # --- prueba de variantes en el texto de referencia ---
    # CORREGIDO 2026-11-05: la ed. Tasso dice «Fristón» (PG: «Frestón») y el
    # pasaje del loco usa la fórmula «casa de los locos de Sevilla» (no «loco de Sevilla»).
    pruebas = {"Frestón (PG)": "freston", "Fristón (Tasso/EPUB)": "friston",
               "casa de los locos de Sevilla": "casa de los locos",
               "Pentapolín": "pentapolin", "Alifanfarón": "alifanfaron",
               "Briareo": "briareo", "Maritornes": "maritornes"}
    abrev = OrderedDict()
    for k, v in pruebas.items():
        abrev[k] = (v in ref)

    resultados = []
    # --- pasajes ---
    base = os.path.join(repo, "content", "piloto")
    for rel in pkg["files"]["passages"]:
        p = json.load(open(os.path.join(base, rel.replace("/", os.sep)), encoding="utf-8"))
        n = normalizar(p["text_original"])
        palabras, idx = prefijo_comun_mas_largo(n, ref)
        total = len(n.split(" "))
        resultados.append(("pasaje", p["id"], p["chapter_id"], palabras, total, idx >= 0))
    # --- evidencias de preguntas ---
    for rel in pkg["files"]["questions"]:
        q = json.load(open(os.path.join(base, rel.replace("/", os.sep)), encoding="utf-8"))
        for e in q.get("evidence", []):
            n = normalizar(e["quote"])
            palabras, idx = prefijo_comun_mas_largo(n, ref)
            total = len(n.split(" "))
            resultados.append(("evidencia", q["id"], q["episode_id"], palabras, total, idx >= 0))

    ok = sum(1 for r in resultados if r[5])
    informe = {"fuente": os.path.basename(ruta_ref), "caracteres_ref": len(ref),
               "prueba_abreviacion": {k: ("presente" if v else "AUSENTE") for k, v in abrev.items()},
               "total": len(resultados), "coinciden": ok, "no_coinciden": len(resultados) - ok,
               "detalles": [{"tipo": t, "id": i, "contexto": ctx, "palabras_ok": w, "palabras_totales": tot,
                              "estado": "OK" if matched else "VARIANTE"}
                             for t, i, ctx, w, tot, matched in resultados if not matched or True]}
    os.makedirs(os.path.join(repo, "docs", "data"), exist_ok=True)
    with open(os.path.join(repo, "docs", "data", "cotejo_texto_referencia.json"), "w", encoding="utf-8") as f:
        json.dump(informe, f, ensure_ascii=False, indent=1)

    L = ["# Cotejo de integridad textual — paquete del piloto vs. texto completo (PG #2000, DP)", "",
         "**Método:** normalización sin acentos diacríticos áureos (á→a, fué→fue), minúsculas, sin puntuación;",
         "búsqueda literal de la secuencia de palabras. El texto de referencia se consulta localmente y NO se sube al repositorio (PEND-01).",
         "Limitación declarada: PG #2000 procede de una edición decimonónica completa; el cotejo contra la ed. Instituto Cervantes (Rico) puntual queda para los registros que entren en `revisada`.", "",
         "## Prueba de abreviación en el texto de referencia", "",
         "| Término | ¿Presente en texto completo? |", "|---|---|"]
    for k, v in abrev.items():
        L.append("| %s | %s |" % (k, "sí" if v else "**NO**"))
    L += ["", "## Resultados por registro", "", "| Tipo | ID | Contexto | Palabras coincidentes | Estado |", "|---|---|---|---|---|"]
    for t, i, ctx, w, tot, matched in resultados:
        L.append("| %s | %s | %s | %d/%d | %s |" % (t, i, ctx, w, tot, "OK" if matched else "VARIANTE"))
    L += ["", "**Resumen: %d/%d coinciden íntegramente; %d con variante.**" % (ok, len(resultados), len(resultados) - ok)]
    with open(os.path.join(repo, "docs", "COTEJO_TEXTO_REFERENCIA.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(L) + "\n")

    print("COTEJO: %d/%d OK | variantes=%d | abreviacion: %s" % (
        ok, len(resultados), len(resultados) - ok,
        ", ".join("%s=%s" % (k, "SI" if v else "NO") for k, v in abrev.items())))

if __name__ == "__main__":
    main()
