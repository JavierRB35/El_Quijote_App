#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PEND-01: añade al paquete content/piloto/ la edición de referencia (DQ.ED.0002),
su fuente (DQ.SRC.0004) y su licencia de consulta (DQ.LIC.0004).
Uso: python -I generar_edicion_referencia.py <raiz_repo>
"""
import sys, os, json

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
PKG = os.path.join(REPO, "content", "piloto")
CV = "1.0.0"

manifest = json.load(open(os.path.join(PKG, "package.json"), encoding="utf-8"))
files = manifest["files"]

def w(rel, obj):
    with open(os.path.join(PKG, rel.replace("/", os.sep)), "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
    return rel

files["sources"].append(w("sources/DQ.SRC.0004.json", {
    "id": "DQ.SRC.0004", "contract_version": CV,
    "title": "Instituto Cervantes (dir. Francisco Rico): Don Quijote de la Mancha, 2004; revisión 2015",
    "author_editor": "Instituto Cervantes / Francisco Rico (dir.)",
    "kind": "edicion_textual", "consulted_date": "2026-11-05",
    "url": "https://cervantes.org/es/sobre-nosotros/publicaciones/don-quijote-mancha-2015",
    "notes": "Edición de referencia para COTEJO: consulta en línea y cita puntual con atribución; no se almacena ni redistribuye (PEND-01, DC-11)."}))

files["licenses"].append(w("licenses/DQ.LIC.0004.json", {
    "id": "DQ.LIC.0004", "contract_version": CV,
    "title": "Ed. Instituto Cervantes (Rico) — consulta y cita no comercial con atribución",
    "holder": "Instituto Cervantes (texto de Cervantes: dominio público)",
    "url": "https://www.cervantesvirtual.com", "consulted_date": "2026-11-05",
    "attribution_required": True, "redistribution": "prohibida",
    "evidence_documental": "Condiciones BVMC: consulta pública y difusión no comercial citando fuente; explotación lucrativa requiere autorización. Ed. verificada el 2026-11-05.",
    "notes": "Sin almacenamiento del texto de referencia en el proyecto; solo cotejo puntual."}))

files["editions"].append(w("editions/DQ.ED.0002.json", {
    "id": "DQ.ED.0002", "contract_version": CV,
    "title": "Don Quijote de la Mancha — edición de referencia (cotejo)",
    "editor": "Instituto Cervantes, dirección de Francisco Rico (2004; rev. 2015)",
    "year": 2015,
    "source_id": "DQ.SRC.0004",
    "digital_version": "Consulta en línea (BVMC / portal Quijotes BNE); sin copia local",
    "rights_status": "restringida",
    "orthographic_rules": "modernizada",
    "provenance": "Edición académica del IV Centenario; estándar de cotejo citado por BNE.",
    "notes": "Capa de cotejo de la resolución PEND-01 (docs/RESOLUCION_PEND01_EDICION_REFERENCIA.md). No se almacena.",
    "review": {"state": "documentada", "reviewer_role": "editorial", "date": "2026-11-05"}}))

manifest["counts"]["editions"] = len(files["editions"])
with open(os.path.join(PKG, "package.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)
print("EDICION REFERENCIA OK: editions=%d sources=%d licenses=%d" % (
    len(files["editions"]), len(files["sources"]), len(files["licenses"])))
