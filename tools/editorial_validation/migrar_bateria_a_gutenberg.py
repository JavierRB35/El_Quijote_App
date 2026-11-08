#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Migra la batería de preguntas del piloto al TEXTO ÍNTEGRO PG 2000
(DQ.SRC.0005) por orden del propietario (2026-11-05). Modo CONTENIDOS.
Alineación tolerante por palabras (Damerau-Levenshtein 1, o 2 en palabras
largas) para absorber las VARIANTES entre ediciones (primer/primero,
Pentapolín/Pentapolen, distraída/destraida, agora/ahora...) y extraer el
fragmento VERBATIM de PG con offsets reales en el fichero almacenado.
Los saltos de línea del txt de PG se distinguen por estructura literaria
(`estructura_texto.py`): los cortes mecánicos de maquetación (~75 col.) se
unen; párrafos (\n\n), parlamentos (línea que empieza por «—») y versos
(bloques de líneas cortas) se PRESERVAN. Las palabras extraídas nunca se
alteran (2026-11-08, corrección de Dirección sobre la primera versión).
RESTRICCIÓN DE LÍMITES DE CAPÍTULO (`limites_capitulo.py`, incidencia P1
sangrado I,20→I,21): ningún pasaje ni cita puede cruzar la frontera de su
capítulo; los hallazgos fuzzy que la crucen se bloquean y se registran.
Crea la Edition DQ.ED.0003 y rehace passages + evidencias.
El lector sigue mostrando el EPUB Tusell (DQ.ED.0001); la correspondencia
queda en el campo anchor de cada pasaje.
Uso: python -I migrar_bateria_a_gutenberg.py <raiz_repo>
"""
import sys, os, re, json, hashlib, unicodedata

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from estructura_texto import estructurar_segmento  # noqa: E402
from limites_capitulo import dentro, rango_de_capitulo  # noqa: E402

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
PKG = os.path.join(REPO, "content", "piloto")
PG = os.path.join(REPO, "content", "textos", "gutenberg_2000", "El_Quijote.txt")
CV = "1.0.0"

def deacento(w):
    w = unicodedata.normalize("NFD", w)
    return "".join(c for c in w if unicodedata.category(c) != "Mn").lower()

def neta(w):
    w = re.sub(r"[«»\"“”!¡?¿.,;:()\[\]—–\-_*#()]", "", w)
    return deacento(w)

def dam1(a, b):
    """True si distancia Damerau-Levenshtein <= umbral según longitud."""
    if a == b:
        return True
    thr = 2 if min(len(a), len(b)) >= 8 else 1
    if abs(len(a) - len(b)) > thr:
        return False
    prev2 = None
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cost = 0 if ca == cb else 1
            v = min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
            if i > 1 and j > 1 and ca == b[j - 2] and a[i - 2] == cb:
                v = min(v, prev2[j - 2] + 1)
            cur.append(v)
        prev2, prev = prev, cur
    return prev[-1] <= thr

raw = open(PG, encoding="utf-8", errors="replace").read().replace("\r\n", "\n")
toks = [(m.start(), m.end(), neta(m.group(0))) for m in re.finditer(r"\S+", raw)]
toks = [t for t in toks if t[2]]          # sin tokens de puntuación suelta
S = [t[2] for t in toks]

def localizar_fuzzy(quote):
    q = [neta(w) for w in quote.split()]
    q = [w for w in q if w]
    n = len(q)
    # 1) secuencia exacta
    for i in range(len(S) - n + 1):
        if S[i:i + n] == q:
            return i, i + n, []
    # 2) ancla: ventana exacta MÁS LARGA en cualquier posición de la cita (>=6 palabras)
    ancla, i0, s0 = 0, -1, -1
    for k in range(min(n, 40), 5, -1):
        for s in range(0, n - k + 1):
            for i in range(len(S) - k):
                if S[i:i + k] == q[s:s + k]:
                    ancla, i0, s0 = k, i, s
                    break
            if ancla:
                break
        if ancla:
            break
    if not ancla:
        return None
    variantes = []
    # 3) extensión hacia ADELANTE con tolerancia
    i, k = i0 + ancla, s0 + ancla
    while k < n and i < len(S):
        if S[i] == q[k]:
            i += 1; k += 1; continue
        if dam1(S[i], q[k]):
            variantes.append((q[k], S[i])); i += 1; k += 1; continue
        if i + 1 < len(S) and S[i + 1] == q[k]:
            variantes.append(("+ " + S[i], "")); i += 1; continue
        if k + 1 < n and q[k + 1] == S[i]:
            variantes.append(("- " + q[k], "")); k += 1; continue
        break
    # 4) extensión hacia ATRÁS con tolerancia
    j, m = i0, s0
    while m > 0 and j > 0:
        if S[j - 1] == q[m - 1]:
            j -= 1; m -= 1; continue
        if dam1(S[j - 1], q[m - 1]):
            variantes.append((q[m - 1], S[j - 1])); j -= 1; m -= 1; continue
        if j - 2 >= 0 and S[j - 2] == q[m - 1]:
            variantes.append(("+ " + S[j - 1], "")); j -= 1; continue
        if m - 2 >= 0 and q[m - 2] == S[j - 1]:
            variantes.append(("- " + q[m - 1], "")); m -= 1; continue
        break
    cobertura = k - m
    if cobertura >= max(8, int(n * 0.75)):
        return j, i, variantes
    return None

def recortar_estructurado(inicio, fin):
    """Fragmento verbatim [inicio, fin) del fichero con estructura literaria:
    los cortes mecánicos de maquetación (~75 col.) se unen; párrafos (\n\n),
    parlamentos (línea que empieza por «—») y versos (bloques de líneas
    cortas) se conservan (estructura_texto.restaurar_estructura). Las
    palabras son EXACTAMENTE las del fichero fuente; solo se recortan los
    bordes no textuales del fragmento localizado."""
    return re.sub(
        r"^[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ«(—]+|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ»).!\?]+$",
        "",
        estructurar_segmento(raw, inicio, fin),
    ).strip()

manifest = json.load(open(os.path.join(PKG, "package.json"), encoding="utf-8"))
files = manifest["files"]

# Edition DQ.ED.0003 (PG 2000)
if "editions/DQ.ED.0003.json" not in files["editions"]:
    files["editions"].append("editions/DQ.ED.0003.json")
with open(os.path.join(PKG, "editions", "DQ.ED.0003.json"), "w", encoding="utf-8") as f:
    json.dump({
        "id": "DQ.ED.0003", "contract_version": CV,
        "title": "Don Quijote de la Mancha — texto íntegro Project Gutenberg eBook #2000",
        "editor": "Project Gutenberg (voluntariado anónimo y Joaquin Cuenca Abela, créditos de digitalización)",
        "year": 2026, "source_id": "DQ.SRC.0005",
        "digital_version": "content/textos/gutenberg_2000/El_Quijote.txt (copia íntegra almacenada)",
        "rights_status": "verificada", "orthographic_rules": "modernizada",
        "checksum": "sha256:afa1a638df7a27c343ee2d786036f5b52a0669fb75c09ac3ae594ff04fb6e239",
        "provenance": "Copia sin alteraciones con cabecera PG License (feature/cont-fuente-gutenberg-2000-20261105).",
        "notes": "Base textual de la BATERÍA DE PREGUNTAS por orden del propietario (2026-11-05). El lector sigue mostrando DQ.ED.0001 (EPUB Tusell).",
        "review": {"state": "documentada", "reviewer_role": "editorial", "date": "2026-11-06"},
    }, f, ensure_ascii=False, indent=1)

def migrar_pasaje(rel):
    p = json.load(open(os.path.join(PKG, rel.replace("/", os.sep)), encoding="utf-8"))
    loc = localizar_fuzzy(p["text_original"])
    if not loc:
        return None
    i0, i1, variantes = loc
    # RESTRICCIÓN DE LÍMITES DE CAPÍTULO (incidencia P1: sangrado I,20→I,21):
    # un pasaje NUNCA puede capturar contenido del capítulo anterior o
    # siguiente. Si el hallazgo fuzzy cruza la frontera, se aborta el pasaje
    # (queda registrado en no_encontrados) en lugar de contaminar el dato.
    limite = rango_de_capitulo(raw, p["chapter_id"])
    if not dentro(limite, toks[i0][0], toks[i1 - 1][1]):
        print("BLOQUEADO por límites de capítulo (%s): hallazgo [%d-%d] fuera de %s"
              % (p["id"], toks[i0][0], toks[i1 - 1][1], limite))
        return None
    nuevo = recortar_estructurado(toks[i0][0], toks[i1 - 1][1])
    p["text_original"] = nuevo
    p.pop("edition_id", None)   # el esquema canónico no lo admite; lo porta el anchor
    p["anchor"] = "PG 2000 (DQ.SRC.0005) offset %d-%d; ed. lector: EPUB Tusell (DQ.ED.0001) — %s" % (
        toks[i0][0], toks[i1 - 1][1], p["anchor"])
    p["position"] = {"start_char": toks[i0][0], "end_char": toks[i1 - 1][1]}
    p["sha256"] = "sha256:" + hashlib.sha256(nuevo.encode("utf-8")).hexdigest()
    p["text_indexable"] = re.sub(r"\s+", " ", re.sub(r"[«»„“”!¡?¿.,;:()—–-]", "", nuevo.lower()))
    with open(os.path.join(PKG, rel.replace("/", os.sep)), "w", encoding="utf-8") as f:
        json.dump(p, f, ensure_ascii=False, indent=1)
    return variantes

migrados, no_encontrados, var_log = 0, [], []
for rel in list(files["passages"]):
    v = migrar_pasaje(rel)
    if v is None:
        no_encontrados.append(rel.split("/")[-1].replace(".json", ""))
    else:
        migrados += 1
        if v:
            var_log.append("%s: %s" % (rel.split("/")[-1], v[:4]))

evid_migradas = 0
for rel in files["questions"]:
    ruta = os.path.join(PKG, rel.replace("/", os.sep))
    q = json.load(open(ruta, encoding="utf-8"))
    cambio = False
    for e in q.get("evidence", []):
        loc = localizar_fuzzy(e["quote"])
        if loc:
            i0, i1, _ = loc
            # Misma restricción para citas: la cita pertenece al capítulo de
            # la pregunta y no puede sangrar hacia el anterior o siguiente.
            limite = rango_de_capitulo(raw, q["chapter_ids"][0])
            if not dentro(limite, toks[i0][0], toks[i1 - 1][1]):
                print("BLOQUEADO por límites de capítulo (cita de %s): hallazgo [%d-%d] fuera de %s"
                      % (q["id"], toks[i0][0], toks[i1 - 1][1], limite))
                continue
            e["quote"] = recortar_estructurado(toks[i0][0], toks[i1 - 1][1])
            cambio = True
            evid_migradas += 1
    if cambio:
        with open(ruta, "w", encoding="utf-8") as f:
            json.dump(q, f, ensure_ascii=False, indent=1)

manifest["counts"]["editions"] = len(files["editions"])
with open(os.path.join(PKG, "package.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)
print("MIGRACION OK: pasajes=%d evidencias=%d fallos=%s" % (migrados, evid_migradas, no_encontrados or "-"))
for v in var_log:
    print("  VARIANTE:", v)
