#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extracción e inventario de ilustraciones del EPUB del Quijote (ed. Tusell/Tasso).
MODO CONTENIDOS — El Quijote App. Uso: python -I extraer_inventario.py <raiz_epub> <salida>
La raiz_epub es el directorio donde se descomprimió el EPUB (contiene META-INF y OEBPS).
No ejecuta ningún contenido del libro; solo lo lee como datos.
"""
import sys, os, re, csv, json, hashlib, html
from collections import OrderedDict, defaultdict

def sha256_file(path, chunk=1 << 20):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while True:
            b = f.read(chunk)
            if not b:
                break
            h.update(b)
    return h.hexdigest()

def jpeg_dims(data):
    i = 2
    n = len(data)
    while i + 9 < n:
        if data[i] != 0xFF:
            i += 1
            continue
        m = data[i + 1]
        if m in (0xD8, 0x01) or 0xD0 <= m <= 0xD7:
            i += 2
            continue
        if i + 4 > n:
            break
        ln = (data[i + 2] << 8) | data[i + 3]
        if 0xC0 <= m <= 0xCF and m not in (0xC4, 0xC8, 0xCC):
            if i + 9 <= n:
                h = (data[i + 5] << 8) | data[i + 6]
                w = (data[i + 7] << 8) | data[i + 8]
                return w, h
            break
        i += 2 + ln
    return None, None

def png_dims(data):
    if len(data) >= 24 and data[:8] == b"\x89PNG\r\n\x1a\n":
        w = int.from_bytes(data[16:20], "big")
        h = int.from_bytes(data[20:24], "big")
        return w, h
    return None, None

def dims_of(path, fmt):
    try:
        with open(path, "rb") as f:
            head = f.read(1 << 20)
        if fmt == "JPEG":
            return jpeg_dims(head)
        if fmt == "PNG":
            return png_dims(head)
    except Exception:
        pass
    return None, None

def sniff_fmt(path):
    with open(path, "rb") as f:
        b = f.read(16)
    if b[:3] == b"\xff\xd8\xff":
        return "JPEG"
    if b[:8] == b"\x89PNG\r\n\x1a\n":
        return "PNG"
    if b[:3] == b"GIF":
        return "GIF"
    if b[:4] == b"RIFF" and b[8:12] == b"WEBP":
        return "WEBP"
    return "OTRO"

def parse_opf(root):
    opf_path = None
    with open(os.path.join(root, "META-INF", "container.xml"), encoding="utf-8") as f:
        m = re.search(r'full-path="([^"]+)"', f.read())
        opf_path = m.group(1)
    opf_full = os.path.join(root, opf_path.replace("/", os.sep))
    opf_dir = os.path.dirname(opf_full)
    raw = open(opf_full, encoding="utf-8").read()
    items = OrderedDict()
    for m in re.finditer(r'<item\s[^>]*?>', raw):
        tag = m.group(0)
        gid = re.search(r'id="([^"]+)"', tag)
        ghref = re.search(r'href="([^"]+)"', tag)
        gmt = re.search(r'media-type="([^"]+)"', tag)
        if gid and ghref:
            items[gid.group(1)] = {
                "href": ghref.group(1),
                "media_type": gmt.group(1) if gmt else "",
            }
    spine = []
    sm = re.search(r"<spine\b[^>]*>(.*?)</spine>", raw, re.S)
    if sm:
        for m in re.finditer(r'<itemref\s[^>]*idref="([^"]+)"', sm.group(1)):
            spine.append(m.group(1))
    cover_id = None
    cm = re.search(r'<meta\s+name="cover"\s+content="([^"]+)"', raw)
    if cm:
        cover_id = cm.group(1)
    return opf_dir, items, spine, cover_id

def parse_ncx(root):
    ncx = open(os.path.join(root, "OEBPS", "toc.ncx"), encoding="utf-8").read()
    entries = []
    for m in re.finditer(r"<text>(.*?)</text>.*?<content src=\"([^\"]+)\"", ncx, re.S):
        label = html.unescape(re.sub(r"\s+", " ", m.group(1))).strip()
        src = os.path.basename(m.group(2).split("#")[0])
        entries.append((label, src))
    return entries

IMG_TAG = re.compile(r"<(img|image)\b[^>]*>", re.I)

def extract_img_refs(xhtml_path):
    raw = open(xhtml_path, encoding="utf-8", errors="replace").read()
    refs = []
    for tag in IMG_TAG.findall("") or []:
        pass
    for m in IMG_TAG.finditer(raw):
        tag = m.group(0)
        src = re.search(r'(?:src|xlink:href|href)\s*=\s*"([^"]+)"', tag, re.I)
        alt = re.search(r'alt\s*=\s*"([^"]*)"', tag, re.I)
        title = re.search(r'xlink:title\s*=\s*"([^"]*)"', tag, re.I)
        if src:
            refs.append({
                "src": html.unescape(src.group(1)),
                "alt": html.unescape(alt.group(1)).strip() if alt else
                       (html.unescape(title.group(1)).strip() if title else ""),
            })
    return refs

def main():
    if len(sys.argv) != 3:
        print("Uso: python -I extraer_inventario.py <raiz_epub> <salida>"); sys.exit(1)
    root, out = sys.argv[1], sys.argv[2]
    opf_dir, items, spine, cover_id = parse_opf(root)
    ncx = parse_ncx(root)

    # --- títulos por archivo XHTML ---
    part_labels = {}
    chapter_labels = {}
    for label, src in ncx:
        if re.match(r"^\s*cap[ií]tulo", label, re.I):
            chapter_labels.setdefault(src, label)
        elif re.match(r"^\s*parte\b", label, re.I):
            part_labels.setdefault(src, label)
    FRONT = {"cubierta.xhtml", "cubierta2.xhtml", "sinopsis.xhtml", "sinopsis2.xhtml",
             "titulo.xhtml", "info.xhtml", "portadi_x.xhtml", "parte1.xhtml", "retrato.xhtml",
             "portadilla.xhtml", "portadilla2.xhtml", "dedicatoria.xhtml", "dedicatoria2.xhtml",
             "prologo.xhtml", "prologo2.xhtml", "elogios.xhtml"}
    BACK = {"notas.xhtml", "Index.xhtml", "Autor.xhtml", "TOC.xhtml"}

    # --- recorrer spine en orden de lectura ---
    img_refs = defaultdict(list)   # href normalizado -> [{spine_idx, file, alt, orden}]
    reading_order = 0
    file_meta = OrderedDict()
    parte_actual = None
    seccion_actual = None
    spine_parte2_idx = None
    for idx, idref in enumerate(spine):
        it = items.get(idref)
        if not it or not it["media_type"].endswith("xhtml+xml"):
            continue
        base = os.path.basename(it["href"])
        if base.lower() in ("parte2.xhtml", "portadilla2.xhtml"):
            spine_parte2_idx = idx
        full = os.path.normpath(os.path.join(opf_dir, it["href"]))
        if not os.path.isfile(full):
            continue
        refs = extract_img_refs(full)
        parte_novela = "II" if (spine_parte2_idx is not None and idx >= spine_parte2_idx) else "I"
        if base in BACK:
            clase_doc = "back_matter"
        elif base in FRONT:
            clase_doc = "front_matter"
        else:
            clase_doc = "capitulo"
        file_meta[base] = {
            "orden_spine": idx, "clase": clase_doc,
            "parte_novela": parte_novela,
            "seccion_1605": part_labels.get(base, seccion_actual),
            "capitulo_titulo": chapter_labels.get(base, ""),
        }
        if part_labels.get(base):
            seccion_actual = part_labels[base]
        for r in refs:
            reading_order += 1
            norm = os.path.basename(r["src"])
            img_refs[norm].append({
                "orden_lectura": reading_order, "doc": base, "alt": r["alt"],
                "doc_clase": clase_doc, "doc_parte": file_meta[base]["parte_novela"],
                "doc_seccion": file_meta[base]["seccion_1605"],
                "doc_capitulo": file_meta[base]["capitulo_titulo"],
            })

    # --- inventario de archivos de imagen ---
    img_dir = os.path.join(opf_dir, "Images")
    files = sorted(os.listdir(img_dir))
    records = []
    hash_groups = defaultdict(list)
    for i, fn in enumerate(files, 1):
        p = os.path.join(img_dir, fn)
        fmt = sniff_fmt(p)
        w, h = dims_of(p, fmt)
        size = os.path.getsize(p)
        digest = sha256_file(p)
        hash_groups[digest].append(fn)
        nm = re.match(r"^(\d+)\.(jpg|jpeg|png)$", fn, re.I)
        low = fn.lower()
        if nm:
            clase = "acuarela_tusell"
        elif low == "cover.jpg" or (cover_id and items.get(cover_id, {}).get("href", "").endswith(fn)):
            clase = "cubierta"
        elif low.startswith("orla"):
            clase = "ornamento_orla"
        elif re.match(r"^[A-Z]\.png$", fn):
            clase = "letra_capitular"
        elif "logo" in low:
            clase = "marca_editorial"
        elif "ex_libris" in low:
            clase = "ex_libris"
        elif "fuente" in low:
            clase = "marca_editorial"
        else:
            clase = "otra"
        records.append({
            "archivo": fn, "clase": clase, "formato": fmt, "ancho": w, "alto": h,
            "bytes": size, "sha256": digest,
            "referencias": img_refs.get(fn, []),
            "n_referencias": len(img_refs.get(fn, [])),
        })

    # numerar acuarelas por número de archivo; el resto por orden alfabético
    acuarelas = sorted([r for r in records if r["clase"] == "acuarela_tusell"],
                       key=lambda r: int(re.match(r"^(\d+)\.", r["archivo"]).group(1)))
    otras = sorted([r for r in records if r["clase"] != "acuarela_tusell"], key=lambda r: r["archivo"])
    n = 0
    for r in acuarelas:
        n += 1
        r["id"] = "DQ.IL.%04d" % n
    for j, r in enumerate(otras, 1):
        r["id"] = "DQ.DEC.%04d" % j

    # duplicados
    dup_map = {}
    for digest, group in hash_groups.items():
        if len(group) > 1:
            group_ids = [r["id"] for r in records if r["archivo"] in group]
            for r in records:
                if r["archivo"] in group:
                    others = [g for g in group if g != r["archivo"]]
                    dup_map[r["id"]] = others
    for r in records:
        r["duplicado_de"] = dup_map.get(r["id"], [])

    # --- copiar ficheros ---
    import shutil
    import stat
    def copiar(ruta_src, ruta_dst):
        if os.path.exists(ruta_dst):
            os.chmod(ruta_dst, stat.S_IWRITE)
            os.remove(ruta_dst)
        shutil.copyfile(ruta_src, ruta_dst)
        os.chmod(ruta_dst, stat.S_IWRITE)
    os.makedirs(os.path.join(out, "acuarelas"), exist_ok=True)
    os.makedirs(os.path.join(out, "decorativos"), exist_ok=True)
    for r in acuarelas:
        copiar(os.path.join(img_dir, r["archivo"]),
               os.path.join(out, "acuarelas", r["archivo"]))
    for r in otras:
        copiar(os.path.join(img_dir, r["archivo"]),
               os.path.join(out, "decorativos", r["archivo"]))

    # --- CSV plano ---
    csv_path = os.path.join(out, "manifest_ilustraciones.csv")
    with open(csv_path, "w", newline="", encoding="utf-8-sig") as f:
        wr = csv.writer(f, delimiter=";")
        wr.writerow(["id", "archivo", "clase", "formato", "ancho", "alto", "bytes",
                     "parte_novela", "seccion_1605", "doc_primer_referencia",
                     "capitulo_titulo", "orden_lectura", "alt_primera",
                     "n_referencias", "duplicado_de", "sha256"])
        for r in records:
            first = r["referencias"][0] if r["referencias"] else {}
            wr.writerow([
                r["id"], r["archivo"], r["clase"], r["formato"],
                r["ancho"] or "", r["alto"] or "", r["bytes"],
                first.get("doc_parte", ""), first.get("doc_seccion", ""),
                first.get("doc", ""), first.get("doc_capitulo", ""),
                first.get("orden_lectura", ""), first.get("alt", ""),
                r["n_referencias"], ";".join(r["duplicado_de"]), r["sha256"],
            ])

    # --- JSON completo ---
    json_path = os.path.join(out, "manifest_ilustraciones.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump({"fuente": {
                       "archivo_epub": "Don_Quijote_de_la_Mancha_Ilustrado_por_Salvador_Tusell_Miguel_de.epub",
                       "sha256_epub": "82647ac553c40eb0c216e9c76bbbbcb012ded1497711626b9c48a2f30bda7858",
                       "editorial_digital": "Epublibre (Titivillus), base r2.1, modificado 2024-02-11",
                       "edicion_impresa_referida": "Barcelona, Luis Tasso, 1905 (2 vols.)"},
                   "documentos": file_meta, "imagenes": records},
                  f, ensure_ascii=False, indent=1)

    # --- informe resumen ---
    dims = [(r["ancho"], r["alto"]) for r in acuarelas if r["ancho"]]
    areas = sorted(w * h for w, h in dims)
    med = areas[len(areas) // 2] if areas else 0
    sin_alt = sum(1 for r in acuarelas if not (r["referencias"] and r["referencias"][0]["alt"]))
    huerfanas = [r["archivo"] for r in records if r["n_referencias"] == 0]
    dups = {r["id"]: r["duplicado_de"] for r in records if r["duplicado_de"]}
    nums = sorted(int(re.match(r"^(\d+)\.", r["archivo"]).group(1)) for r in acuarelas)
    huecos = [x for x in range(1, (nums[-1] if nums else 0) + 1) if x not in set(nums)]
    cap_counts = defaultdict(int)
    for r in acuarelas:
        if r["referencias"]:
            doc = r["referencias"][0]["doc"]
            if file_meta.get(doc, {}).get("clase") == "capitulo":
                cap_counts[doc] += 1
    sin_imagen = [d for d, m in file_meta.items() if m["clase"] == "capitulo" and cap_counts[d] == 0]
    total_bytes = sum(r["bytes"] for r in records)
    inf = []
    inf.append("# Inventario de ilustraciones — EPUB Quijote (ed. Salvador Tusell)\n")
    inf.append("Generado por `extraer_inventario.py`. Fuente: EPUB con SHA-256 `82647ac5…bda7858`.\n")
    inf.append("## Resumen\n")
    inf.append("- Imágenes totales en el EPUB: %d (%s)" % (len(records),
              ", ".join("%d %s" % (c, fmt) for fmt, c in
                        sorted(defaultdict(int, {r['formato']: sum(1 for x in records if x['formato'] == r['formato']) for r in records}).items()))))
    inf.append("- Acuarelas numeradas (clase `acuarela_tusell`): **%d** (IDs DQ.IL.0001–%04d)" % (len(acuarelas), len(acuarelas)))
    inf.append("- Elementos decorativos/no narrativos: %d (IDs DQ.DEC.*)" % len(otras))
    inf.append("- Tamaño total de imágenes: %.1f MB" % (total_bytes / 1e6))
    if dims:
        inf.append("- Dimensiones de acuarelas: mín %dx%d, mediana ≈ %d px de área total (√%d ≈ %dx%d), máx %dx%d" % (
            min(w for w, _ in dims), min(h for _, h in dims),
            int(med ** 0.5), int(med), int(med ** 0.5), int(med ** 0.5),
            max(w for w, _ in dims), max(h for _, h in dims)))
    inf.append("- Acuarelas sin texto alternativo descriptivo: %d de %d" % (sin_alt, len(acuarelas)))
    inf.append("- Imágenes huérfanas (sin referencia en el texto): %s" % (huerfanas or "ninguna"))
    inf.append("- Duplicados por hash: %s" % (dups or "ninguno"))
    inf.append("- Huecos en la numeración 001–%d: %s" % (nums[-1] if nums else 0, huecos or "ninguno"))
    inf.append("- Capítulos sin ninguna acuarela asociada: %d de %d %s" % (
        len(sin_imagen), sum(1 for m in file_meta.values() if m["clase"] == "capitulo"),
        ("→ " + ", ".join(sorted(sin_imagen))) if sin_imagen else ""))
    inf.append("\n## Nota de estructura\n")
    inf.append("El EPUB divide la Parte I en cuatro secciones (Primera 1-8, Segunda 9-14, Tercera 15-17, Cuarta 18-52),")
    inf.append("reproduciendo la división de la edición príncipe de 1605; la Parte II va en archivos 2.1–2.74 (74 capítulos).\n")
    inf.append("## Ejemplos de texto alternativo (primeras 8 acuarelas con alt)\n")
    for r in acuarelas:
        if r["referencias"] and r["referencias"][0]["alt"]:
            inf.append("- `%s` (%s): %s" % (r["archivo"], r["referencias"][0]["doc"], r["referencias"][0]["alt"]))
        if sum(1 for line in inf) > 40:
            break
    with open(os.path.join(out, "INVENTARIO_ILUSTRACIONES.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(inf) + "\n")

    print("ACUARELAS=%d DECORATIVOS=%d TOTAL=%d" % (len(acuarelas), len(otras), len(records)))
    print("HUECO_MAX=%s HUERFANAS=%d DUPLICADOS=%d SIN_ALT=%d" % (
        nums[-1] if nums else 0, len(huerfanas), len(dups), sin_alt))
    print("CAPITULOS_SIN_IMAGEN=%d: %s" % (len(sin_imagen), ",".join(sorted(sin_imagen))))

if __name__ == "__main__":
    main()
