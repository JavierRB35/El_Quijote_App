#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera el mapa de episodios y capítulos (entregable FASE 0.3, encargo §8)
a partir del manifiesto real del EPUB Tusell.
Uso: python -I generar_mapa_capitulos.py <raiz_repo>
Salidas: docs/data/mapa_capitulos.json + docs/MAPA_EPISODIOS_Y_CAPITULOS.md
"""
import sys, os, re, json

def num_capitulo(archivo):
    """Número de capítulo y parte a partir del nombre de archivo del EPUB."""
    if re.match(r"^100[1-8]\.xhtml$", archivo):
        return 1, int(archivo[2:4])
    if re.match(r"^[23]0[0-9][0-9]\.xhtml$", archivo):
        return 1, int(archivo[2:4])
    if archivo.startswith("1."):
        return 1, int(archivo[2:-6])
    if archivo.startswith("2."):
        return 2, int(archivo[2:-6])
    return None, None

SECCIONES_1605 = {"1001": "Primera (I.1-8)", "2009": "Segunda (I.9-14)",
                  "3015": "Tercera (I.15-17)", "1.18": "Cuarta (I.18-52)"}

def main():
    repo = sys.argv[1]
    man = json.load(open(os.path.join(repo, "assets", "ilustraciones_tusell",
                                      "manifests", "manifest_ilustraciones.json"), encoding="utf-8"))
    docs, imgs = man["documentos"], man["imagenes"]

    por_cap = {}
    for r in imgs:
        if r["clase"] != "acuarela_tusell" or not r["referencias"]:
            continue
        ref = r["referencias"][0]
        if ref["doc_clase"] != "capitulo":
            continue
        p, c = num_capitulo(ref["doc"])
        if p is None:
            continue
        key = "P%d.C%02d" % (p, c)
        e = por_cap.setdefault(key, {"n": 0, "primeras": []})
        e["n"] += 1
        if len(e["primeras"]) < 2:
            e["primeras"].append({"archivo": r["archivo"], "alt": ref["alt"]})

    caps = []
    for archivo, meta in docs.items():
        p, c = num_capitulo(archivo)
        if p is None or meta["clase"] != "capitulo":
            continue
        key = "P%d.C%02d" % (p, c)
        info = por_cap.get(key, {"n": 0, "primeras": []})
        titulo = meta["capitulo_titulo"] or "(sin título NCX)"
        caps.append({
            "id": key, "parte": p, "capitulo": c, "archivo_epub": archivo,
            "episodio_canonico": "DQ.P%d.C%02d.E01" % (p, c),
            "seccion_1605": meta["seccion_1605"], "titulo": titulo,
            "n_acuarelas": info["n"], "acuarelas_ejemplo": info["primeras"],
        })
    caps.sort(key=lambda x: (x["parte"], x["capitulo"]))

    datos = {
        "aviso": "DRAFT FASE 0 — mapa generado del EPUB Tusell (editorial, no del contrato). IDs provisionales.",
        "fuente": man["fuente"],
        "resumen": {},
        "capitulos": caps,
        "episodios_multicapitulo_propuestos": [
            {"id": "DQ.P1.C01.E01", "caps": [1, 2], "titulo": "Preparación y primera salida"},
            {"id": "DQ.P1.C03.E01", "caps": [3, 4, 5], "titulo": "Armarse caballero; Andrés; regreso"},
            {"id": "DQ.P1.C08.E01", "caps": [8, 9], "titulo": "Molinos y batalla con el vizcaíno"},
            {"id": "DQ.P1.C12.E01", "caps": [12, 13, 14], "titulo": "Marcela y Grisóstomo"},
            {"id": "DQ.P1.C15.E01", "caps": [15, 16, 17], "titulo": "Yangüeses y Maritornes en la venta"},
            {"id": "DQ.P1.C23.E01", "caps": [23, 24, 25, 26, 27, 28], "titulo": "Sierra Morena (penitencia y resolución)"},
            {"id": "DQ.P1.C29.E01", "caps": [29, 30, 31], "titulo": "Rescate de don Quijote; Dorotea"},
            {"id": "DQ.P1.C32.E01", "caps": [32, 33, 34, 35], "titulo": "La venta segunda; el Curioso impertinente (novela interpolada)"},
            {"id": "DQ.P1.C46.E01", "caps": [46, 47, 48, 49, 50, 51, 52], "titulo": "Encantamiento y vuelta en jaula"},
            {"id": "DQ.P2.C02.E01", "caps": [2, 3, 4], "titulo": "Dulcinea encantada"},
            {"id": "DQ.P2.C08.E01", "caps": [8, 9, 10], "titulo": "Partida del pueblo; Clara Perlerina"},
            {"id": "DQ.P2.C22.E01", "caps": [22, 23], "titulo": "Aventura del rebuzno"},
            {"id": "DQ.P2.C41.E01", "caps": [41, 42, 43], "titulo": "Clavileño; consejos de Sancho"},
            {"id": "DQ.P2.C47.E01", "caps": [47, 48, 49, 50, 51, 52, 53], "titulo": "Sancho gobernador de Barataria"},
            {"id": "DQ.P2.C69.E01", "caps": [69, 70, 71], "titulo": "Altisidora y la cueva de Montesinos fingida"},
        ],
    }

    import statistics
    ns = [c["n_acuarelas"] for c in caps]
    datos["resumen"] = {
        "capitulos": len(caps),
        "parte1": sum(1 for c in caps if c["parte"] == 1),
        "parte2": sum(1 for c in caps if c["parte"] == 2),
        "acuarelas_en_capitulos": sum(ns),
        "acuarelas_min": min(ns), "acuarelas_max": max(ns),
        "acuarelas_media": round(statistics.mean(ns), 2),
        "episodios_estimados_1a1": len(caps),
        "episodios_estimados_agrupados": len(caps) - sum(len(e["caps"]) - 1 for e in datos["episodios_multicapitulo_propuestos"]),
    }

    os.makedirs(os.path.join(repo, "docs", "data"), exist_ok=True)
    # los capítulos agrupados apuntan al episodio-grupo anclado en su primer capítulo
    grupo_por_cap = {}
    for e in datos["episodios_multicapitulo_propuestos"]:
        parte_e = int(e["id"][4])
        for c in e["caps"]:
            grupo_por_cap[(parte_e, c)] = e["id"]
    for c in caps:
        k = (c["parte"], c["capitulo"])
        if k in grupo_por_cap:
            c["episodio_canonico"] = grupo_por_cap[k]
    with open(os.path.join(repo, "docs", "data", "mapa_capitulos.json"), "w", encoding="utf-8") as f:
        json.dump(datos, f, ensure_ascii=False, indent=1)

    L = []
    a = L.append
    a("# Mapa de episodios y capítulos — Entregable FASE 0.3 (encargo §8)")
    a("")
    a("**Generado** por `tools/asset_processing/generar_mapa_capitulos.py` desde el manifiesto real del EPUB Tusell (commit de la extracción). Datos: SHA-256 `%s…`." % man["fuente"]["sha256_epub"][:16])
    a("")
    a("> **AVISO DRAFT:** mapa editorial de FASE 0, sin cifras inventadas. Los IDs (`DQ.Pn.Cmm`) son provisionales hasta el contrato editorial-técnico. La agrupación en episodios es PROPUESTA sujeta a la tipología que formalice el piloto (encargo §4.8).")
    a("")
    r = datos["resumen"]
    a("## Resumen")
    a("")
    a("- Capítulos: **%d** (Parte I: %d · Parte II: %d)" % (r["capitulos"], r["parte1"], r["parte2"]))
    a("- Acuarelas en capítulos: **%d** (min %d · media %.2f · máx %d)" % (r["acuarelas_en_capitulos"], r["acuarelas_min"], r["acuarelas_media"], r["acuarelas_max"]))
    a("- Episodios: %d si mapeo 1:1 con capítulos; **~%d** con la agrupación propuesta (borrador)" % (r["episodios_estimados_1a1"], r["episodios_estimados_agrupados"]))
    a("- Las 5 acuarelas restantes del EPUB pertenecen al front matter (retrato de Cervantes, prólogo).")
    a("")
    a("## Estimación de escenas y perspectivas (método, no cifra de venta)")
    a("")
    a("El encargo exige varias perspectivas por episodio (§2.1). Método propuesto para el piloto:")
    a("`escenas_por_episodio ≥ max(acuarelas_del_episodio, 3)`, completando con recreaciones fotorrealistas")
    a("las fases *before/question/reveal/after* que las acuarelas no cubran (encargo §4.7.5), siempre identificadas como RECREACION_ARTISTICA.")
    a("Las cifras se validarán midiendo el piloto de seis capítulos antes de extrapolar a los 126 (encargo §4.8: no extrapolar sin ponderar).")
    a("")
    a("## Episodios multicapítulo PROPUESTOS (borrador)")
    a("")
    a("| ID | Capítulos | Título provisional |")
    a("|---|---|---|")
    for e in datos["episodios_multicapitulo_propuestos"]:
        a("| %s | %s | %s |" % (e["id"], ", ".join("I.%d" % c if e["id"].startswith("DQ.P1") else "II.%d" % c for c in e["caps"]), e["titulo"]))
    a("")
    a("## Capítulos — Parte I")
    a("")
    a("| ID | Secc. 1605 | Título | Acuarelas | Ejemplo (archivo · alt) |")
    a("|---|---|---|---|---|")
    for c in caps:
        if c["parte"] != 1:
            continue
        ej = c["acuarelas_ejemplo"]
        ejtxt = ("%s · %s" % (ej[0]["archivo"], ej[0]["alt"][:60] + ("…" if len(ej[0]["alt"]) > 60 else ""))) if ej else "—"
        a("| %s | %s | %s | %d | %s |" % (c["id"], (c["seccion_1605"] or "").replace(" (", "<br>("), c["titulo"], c["n_acuarelas"], ejtxt))
    a("")
    a("## Capítulos — Parte II")
    a("")
    a("| ID | Título | Acuarelas | Ejemplo (archivo · alt) |")
    a("|---|---|---|---|")
    for c in caps:
        if c["parte"] != 2:
            continue
        ej = c["acuarelas_ejemplo"]
        ejtxt = ("%s · %s" % (ej[0]["archivo"], ej[0]["alt"][:60] + ("…" if len(ej[0]["alt"]) > 60 else ""))) if ej else "—"
        a("| %s | %s | %d | %s |" % (c["id"], c["titulo"], c["n_acuarelas"], ejtxt))
    a("")
    a("Datos completos y citables: `docs/data/mapa_capitulos.json`.")
    with open(os.path.join(repo, "docs", "MAPA_EPISODIOS_Y_CAPITULOS.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(L) + "\n")
    print("MAPA OK:", datos["resumen"])

if __name__ == "__main__":
    main()
