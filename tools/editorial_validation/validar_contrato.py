#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Validador de contratos editoriales (encargo 6.3.7) - MODO CONTENIDOS.
Uso: python -I validar_contrato.py <raiz_repo>
Comprueba: (1) esquemas JSON validos, (2) ejemplos sinteticos POSITIVOS,
(3) reglas semanticas no expresables en JSON Schema, (4) casos NEGATIVOS
que deben fallar. Salida ASCII para evitar artefactos de consola Windows.
"""
import sys, os, json, copy, re
from jsonschema import Draft202012Validator

def cargar(ruta):
    with open(ruta, encoding="utf-8") as f:
        return json.load(f)

def main():
    repo = sys.argv[1]
    schemas_dir = os.path.join(repo, "schemas")
    ejemplos_dir = os.path.join(schemas_dir, "content", "examples")

    resultados = []
    esquemas = {}

    # --- 1. esquemas parseables y con $schema/$id ---
    for base, _dirs, fichs in os.walk(schemas_dir):
        for fich in sorted(fichs):
            if not fich.endswith(".schema.json"):
                continue
            ruta = os.path.join(base, fich)
            rel = os.path.relpath(ruta, schemas_dir).replace("\\", "/")
            try:
                esq = cargar(ruta)
                ok = esq.get("$schema", "").startswith("https://json-schema.org/draft/2020-12")
                resultados.append(("SCHEMA", rel, ok and "$id" in esq,
                                   "OK" if ok and "$id" in esq else "falta $schema/$id"))
                esquemas[rel] = esq
            except Exception as e:
                resultados.append(("SCHEMA", rel, False, str(e)[:80]))

    mapa = {
        "question_single_choice": "content/question.schema.json",
        "question_multi_choice": "content/question.schema.json",
        "question_true_false": "content/question.schema.json",
        "question_ordering": "content/question.schema.json",
        "question_matching": "content/question.schema.json",
        "question_hotspot": "content/question.schema.json",
        "episode": "content/episode.schema.json",
        "media_asset": "media/media_asset.schema.json",
        "discovery": "content/discovery.schema.json",
    }

    # --- 2. ejemplos positivos contra su esquema ---
    validados = {}
    for fich in sorted(os.listdir(ejemplos_dir)):
        if not fich.endswith(".example.json"):
            continue
        prefijo = fich.replace(".example.json", "")
        rel_esq = mapa.get(prefijo)
        doc = cargar(os.path.join(ejemplos_dir, fich))
        # Las claves de anotacion para humanos (prefijo "_") no forman parte del contrato.
        doc = {k: v for k, v in doc.items() if not k.startswith("_")}
        try:
            errs = sorted(Draft202012Validator(esquemas[rel_esq]).iter_errors(doc),
                          key=lambda e: list(e.path))
            resultados.append(("POSITIVO", fich, not errs,
                               "OK" if not errs else errs[0].message[:80]))
            if not errs:
                validados[prefijo] = doc
        except KeyError:
            resultados.append(("POSITIVO", fich, False, "sin esquema mapeado"))

    # --- 3. reglas semanticas sobre Questions validas ---
    def checks_q(q):
        fallos = []
        ids_opt = {o["id"] for o in q["options"]}
        if q["type"] in ("single_choice", "multi_choice", "true_false"):
            for cid in q.get("correct_option_ids", []):
                if cid not in ids_opt:
                    fallos.append("correct_id inexistente: %s" % cid)
        if q["type"] == "single_choice" and len(q.get("correct_option_ids", [])) != 1:
            fallos.append("single_choice exige exactamente 1 correcta")
        if q["type"] == "multi_choice" and len(q.get("correct_option_ids", [])) < 2:
            fallos.append("multi_choice exige >= 2 correctas")
        if q["type"] == "hotspot":
            for z in q["solution"]["zones"]:
                x, y, w, h = z["rect"]
                if round(x + w, 6) > 1 or round(y + h, 6) > 1:
                    fallos.append("zona %s fuera de limites" % z["id"])
            declaradas = {z["id"] for z in q["solution"]["zones"]}
            for cz in q["solution"].get("correct_zone_ids", []):
                if cz not in declaradas:
                    fallos.append("correct_zone inexistente: %s" % cz)
        if q["type"] == "ordering":
            orden = q["solution"]["order"]
            if sorted(orden) != sorted(ids_opt):
                fallos.append("ordering no cubre exactamente las opciones")
        if q["type"] == "matching":
            lefts = [p["left"] for p in q["solution"]["pairs"]]
            if not set(lefts) <= ids_opt or len(lefts) != len(set(lefts)):
                fallos.append("matching: lefts no mapean a opciones unicas")
        return fallos

    for prefijo, doc in validados.items():
        if prefijo.startswith("question"):
            f = checks_q(doc)
            resultados.append(("SEMANTICA", prefijo, not f, "; ".join(f) if f else "OK"))
        if prefijo == "media_asset":
            esq = esquemas["media/media_asset.schema.json"]
            states = set(esq["properties"]["review_state"]["enum"])
            if doc["review_state"] in ("revisada", "aprobada") and set("0") == set(doc["sha256"]):
                resultados.append(("SEMANTICA", prefijo, False, "hash placeholder en estado avanzado"))
            else:
                resultados.append(("SEMANTICA", prefijo, True, "OK"))
        if prefijo == "discovery" and doc["kind"] in ("cita_literal", "refran") and not doc["passage_ids"]:
            resultados.append(("SEMANTICA", prefijo, False, "cita/refran sin pasaje"))
        elif prefijo == "discovery":
            resultados.append(("SEMANTICA", prefijo, True, "OK"))

    # --- 4. casos negativos: DEBEN fallar ---
    base_q = copy.deepcopy(validados["question_single_choice"])
    base_m = copy.deepcopy(validados["media_asset"])
    base_h = copy.deepcopy(validados["question_hotspot"])
    esq_q = esquemas["content/question.schema.json"]
    esq_m = esquemas["media/media_asset.schema.json"]

    def falla(esq, doc):
        try:
            next(Draft202012Validator(esq).iter_errors(doc))
            return True
        except StopIteration:
            return False

    negativos = []
    d = copy.deepcopy(base_q); d["id"] = "DQ.Q.1"
    negativos.append(("id malformado", esq_q, d))
    d = copy.deepcopy(base_q); del d["rationale"]
    negativos.append(("falta rationale", esq_q, d))
    d = copy.deepcopy(base_q); d["correct_option_ids"] = ["DQ.Q.000001.Oz"]
    negativos.append(("correcta inexistente (semantic)", esq_q, d))
    d = copy.deepcopy(base_q); d["correct_option_ids"] = ["DQ.Q.000001.Oa", "DQ.Q.000001.Ob"]
    negativos.append(("single con 2 correctas", esq_q, d))
    d = copy.deepcopy(base_q); d["respuesta_libre"] = "texto del jugador"
    negativos.append(("campo de respuesta escrita", esq_q, d))
    d = copy.deepcopy(base_m); d["sha256"] = "xyz"
    negativos.append(("sha256 malformado", esq_m, d))
    d = copy.deepcopy(base_h)
    d["solution"]["zones"][0]["rect"] = [0.5, 0.5, 0.8, 0.8]
    negativos.append(("hotspot fuera de limites", esq_q, d))

    for nombre, esq, doc in negativos:
        f = falla(esq, doc) or bool(checks_q(doc)) if nombre != "sha256 malformado" else falla(esq, doc)
        resultados.append(("NEGATIVO", nombre, f, "fallo como debe" if f else "NO fallo (BUG)"))

    # --- informe ---
    fallos = [r for r in resultados if not r[2]]
    for tipo, nombre, ok, msg in resultados:
        print("%-9s %-42s %s  %s" % (tipo, nombre[:42], "PASS" if ok else "FAIL", msg))
    print("-" * 80)
    print("TOTAL=%d PASS=%d FAIL=%d" % (len(resultados),
          len(resultados) - len(fallos), len(fallos)))
    sys.exit(1 if fallos else 0)

if __name__ == "__main__":
    main()
