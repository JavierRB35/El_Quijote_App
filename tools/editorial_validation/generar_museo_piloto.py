#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FASE 1 (editorial): expediente de museo — fichas de piezas VERIFICABLES.
Añade 7 piezas (acuarelas Tusell de capítulos del piloto) al paquete content/piloto/
y emite el draft documental docs/data/expediente_museo.json + docs/EXPEDIENTE_MUSEO.md.
Uso: python -I generar_museo_piloto.py <raiz_repo>
Regla: NO se inventan obras de museos ajenos; las piezas reales de terceros
quedan como pendientes de verificación individual (PEND-03).
"""
import sys, os, json

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
PKG = os.path.join(REPO, "content", "piloto")
CV = "1.0.0"
AUTORIA = "Salvador Tusell (sobre composición de Gustave Doré)"
PROCEDENCIA = "EPUB Epublibre/Titivillus 2024; ed. Barcelona, Luis Tasso, 1905 (BVPB registro 463832)"

PIEZAS = [
 ("DQ.MUS.0001", "El espurgo de la librería", "DQ.MA.000021", ["DQ.P1.C06"],
  "La quema de los libros de caballerías, salvamentos selectivos incluidos (I, 6).",
  "Ilustra literalmente el «escrutinio» que dicta el cura; el alt del EPUB lo titula «Espurgo de libros de caballerías».",
  "documentada"),
 ("DQ.MUS.0002", "Don Quijote arremete contra los frailes de San Benito", "DQ.MA.000027", ["DQ.P1.C08"],
  "Los «bultos negros» que don Quijote toma por encantadores con una princesa hurtada (I, 8).",
  "Corresponde a la composición de Doré para la segunda aventura del capítulo VIII.", "documentada"),
 ("DQ.MUS.0003", "Sancho ayuda a montar a don Quijote tras los molinos", "DQ.MA.000029", ["DQ.P1.C08"],
  "El desenlace físico de la embestida: Rocinante derribado y su amo remontado (I, 8).",
  "Verificada visualmente contra el alt del EPUB; contraste útil con la recreación DQ.MA.900006 (post).", "documentada"),
 ("DQ.MUS.0004", "El discurso de la Edad de Oro", "DQ.MA.000035", ["DQ.P1.C11"],
  "Don Quijote discursando con un puño de bellotas ante los cabreros (I, 11).",
  "El alt del EPUB («Discurso de Don Quijote sobre la Edad Dorada») coincide con el subtítulo interpolado de la edición.", "documentada"),
 ("DQ.MUS.0005", "Don Quijote carga contra los carneros (rebaños)", "DQ.MA.000057", ["DQ.P1.C18"],
  "La «batalla» de los dos «ejércitos» que son manadas de ovejas (I, 18).",
  "Composición derivada de la plancha de Doré para la aventura de los rebaños.", "documentada"),
 ("DQ.MUS.0006", "La visita del cura y el barbero", "DQ.MA.000170", ["DQ.P2.C01"],
  "Apertura de la segunda parte: la prudencia de los amigos y la charla literaria (II, 1).",
  "La acuarela 171 («Metáfora del loco sevillano») ilustra la historia del «loco de Sevilla» que don Quijote cuenta en este capítulo — presente en el texto con la fórmula «En la casa de los locos de Sevilla estaba un hombre... graduado en cánones, por Osuna» (corregido 2026-11-05; ver cotejo textual).", "documentada"),
 ("DQ.MUS.0007", "Don Quijote en el lecho con el crucifijo", "DQ.MA.000371", ["DQ.P2.C74"],
  "La enfermedad final y el anuncio de la muerte de Alonso Quijano (II, 74).",
  "Contraste recomendado con la recreación DQ.MA.900011 (post, «El regreso de Alonso Quijano»).", "documentada"),
]

def main():
    manifest = json.load(open(os.path.join(PKG, "package.json"), encoding="utf-8"))
    files = manifest["files"]
    files.setdefault("museum_items", [])
    for mid, titulo, media_id, caps, contexto, relacion, estado in PIEZAS:
        rel = "museum_items/%s.json" % mid
        if rel in files["museum_items"]:
            continue  # idempotente: no duplicar fichas ya registradas
        obj = {
            "id": mid, "contract_version": CV, "title": titulo,
            "authorship": AUTORIA, "attribution_status": "atribuida",
            "date": "1905",
            "provenance": PROCEDENCIA,
            "technique": "Acuarela sobre composición de Gustave Doré (reproducción editorial)",
            "owner_entity": "Edición Barcelona, Luis Tasso, 1905 (ejemplar digitalizado: BVPB registro 463832)",
            "context": contexto,
            "relation_to_quixote": relacion,
            "chapters": caps, "media_ids": [media_id],
            "source_id": "DQ.SRC.0002", "license_id": "DQ.LIC.0001",
            "certainty": "HECHO_HISTORICO_DOCUMENTADO",
            "review": {"state": estado, "reviewer_role": "editorial", "date": "2026-11-05"},
        }
        ruta = os.path.join(PKG, "museum_items", "%s.json" % mid)
        os.makedirs(os.path.dirname(ruta), exist_ok=True)
        with open(ruta, "w", encoding="utf-8") as f:
            json.dump(obj, f, ensure_ascii=False, indent=1)
        files["museum_items"].append(rel)
    manifest["counts"]["museum_items"] = len(files["museum_items"])
    with open(os.path.join(PKG, "package.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=1)

    # draft documental de piezas FUERA del paquete (pendientes de verificación)
    draft = {
        "aviso": "Piezas candidatas NO verificadas individualmente: NO se suben ni se muestran hasta resolver su licencia (PEND-03). Se listan como cartera de curaduría.",
        "cartera_pendiente": [
            {"pieza": "Retrato de Cervantes (acuarela 001 de la ed. Tasso)", "estado": "verificada como pieza de la edición; su vínculo con retratos históricos de Cervantes requiere estudio (atribución del modelo: DEBATIDO)"},
            {"pieza": "Edición de Luis Tasso, Barcelona, 1905, 2 vols. (pieza bibliográfica completa)", "estado": "documentada en BVPB registro 463832 (CC BY); ficha de museo pendiente de campaña"},
            {"pieza": "Composiciones de Gustave Doré originales (Gallica/BnF y otras)", "estado": "dominio público probable; verificar recurso por recurso (PEND-03) antes de añadir medios"},
            {"pieza": "Retratos históricos de Cervantes (Jauregui, del Mazo y otros)", "estado": "atribuciones debatidas; exige verificación institucional individual (PEND-03)"},
        ],
    }
    os.makedirs(os.path.join(REPO, "docs", "data"), exist_ok=True)
    with open(os.path.join(REPO, "docs", "data", "expediente_museo.json"), "w", encoding="utf-8") as f:
        json.dump(draft, f, ensure_ascii=False, indent=1)
    print("MUSEO OK: piezas en paquete=%d" % len(files["museum_items"]))

if __name__ == "__main__":
    main()
