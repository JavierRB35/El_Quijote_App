#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FASE C de la batería: bancos de preguntas de I.1, I.16, I.21 y II.10, con
extracción DIRECTA del texto íntegro PG 2000 (DQ.ED.0003/DQ.SRC.0005) por
orden del propietario (2026-11-06). Modo CONTENIDOS.
Uso: python -I generar_paquete_piloto_c.py <raiz_repo>
Cada pasaje se construye localizando en PG un ANCLA verificada y extrayendo
una ventana verbatim; si el ancla no se halla, el generador FALLA (no inventa).
"""
import sys, os, re, json, hashlib

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
PKG = os.path.join(REPO, "content", "piloto")
PG = os.path.join(REPO, "content", "textos", "gutenberg_2000", "El_Quijote.txt")
MAPA = os.path.join(REPO, "docs", "data", "mapa_capitulos.json")
CV = "1.0.0"

raw = open(PG, encoding="utf-8", errors="replace").read().replace("\r\n", "\n")
raw1 = re.sub(r"\s+", " ", raw)

def extraer_pg(anchor, antes=15, desp=35):
    """Ventana verbatim de PG: N palabras antes y después del ancla."""
    m = re.search(re.escape(anchor), raw1, re.I)
    if not m:
        raise SystemExit("ANCLA NO HALLADA EN PG: " + anchor[:60])
    inicio, fin = m.start(), m.end()
    antes_txt = raw1[max(0, inicio - 120 * antes):inicio].rsplit(" ", antes)[0] if antes else ""
    resto = raw1[fin:fin + 14 * desp]
    desp_txt = resto[:len(resto.rsplit(" ", desp)[0])] if desp else ""
    return re.sub(r"\s+", " ", antes_txt + " " + raw1[inicio:fin] + " " + desp_txt).strip()

def sha_txt(s):
    return "sha256:" + hashlib.sha256(s.encode("utf-8")).hexdigest()

def recortar(s):
    return re.sub(r"^[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ«(—]+|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ»).!\?]+$", "", s).strip()

manifest = json.load(open(os.path.join(PKG, "package.json"), encoding="utf-8"))
files = manifest["files"]
files.setdefault("museum_items", [])

# ----------------------------------------------- capítulos (títulos del mapa NCX)
mapa = json.load(open(MAPA, encoding="utf-8"))
titulos = {(c["parte"], c["capitulo"]): c for c in mapa["capitulos"]}
NUEVOS_CH = [("DQ.P1.C01", 1, 1, 1), ("DQ.P1.C16", 1, 16, 16),
             ("DQ.P1.C21", 1, 21, 21), ("DQ.P2.C10", 2, 10, 62)]
existentes = {c for c in files["chapters"]}
for cid, parte, num, orden in NUEVOS_CH:
    if "chapters/%s.json" % cid in existentes:
        continue
    t = titulos[(parte, num)]["titulo"]
    files["chapters"].append("chapters/%s.json" % cid)
    with open(os.path.join(PKG, "chapters", "%s.json" % cid), "w", encoding="utf-8") as f:
        json.dump({"id": cid, "contract_version": CV, "edition_id": "DQ.ED.0001",
                    "part": parte, "number": num, "title": t, "order": orden,
                    "text_ref": "content://editions/DQ.ED.0001/%s/C%02d" % (parte, num),
                    "synopsis": "Capítulo del EPUB Tusell; título según el índice NCX de la edición."}, f, ensure_ascii=False, indent=1)

# ----------------------------------------------- pasajes (verbatim PG)
def pasaje(pid, cid, anchor, antes=15, desp=35, nota=""):
    texto = recortar(extraer_pg(anchor, antes, desp))
    i = raw1.find(anchor)
    ini = raw1[:i].count(" ")
    fin = ini + len(texto)
    rel = "passages/%s.json" % pid
    if rel in files["passages"]:
        return texto
    files["passages"].append(rel)
    with open(os.path.join(PKG, "passages", "%s.json" % pid), "w", encoding="utf-8") as f:
        json.dump({"id": pid, "contract_version": CV, "chapter_id": cid,
                    "anchor": "PG 2000 (DQ.SRC.0005) offset aprox. %d; ed. lector: EPUB Tusell (DQ.ED.0001)%s" % (ini, " — " + nota if nota else ""),
                    "text_original": texto,
                    "text_indexable": re.sub(r"\s+", " ", re.sub(r"[«»„“”!¡?¿.,;:()—–-]", "", texto.lower())),
                    "position": {"start_char": ini, "end_char": fin},
                    "sha256": sha_txt(texto)}, f, ensure_ascii=False, indent=1)
    return texto

PS = {}
PS["DQ.P1.C01.P0001"] = pasaje("DQ.P1.C01.P0001", "DQ.P1.C01",
    "En un lugar de la Mancha, de cuyo nombre no quiero acordarme", 0, 60, "incipit")
PS["DQ.P1.C01.P0002"] = pasaje("DQ.P1.C01.P0002", "DQ.P1.C01",
    "tenía el sobrenombre de Quijada, o Quesada", 15, 45, "los tres apellidos")
PS["DQ.P1.C01.P0003"] = pasaje("DQ.P1.C01.P0003", "DQ.P1.C01",
    "La razón de la sinrazón que a mi razón se hace", 30, 40, "Feliciano de Silva")
PS["DQ.P1.C01.P0004"] = pasaje("DQ.P1.C01.P0004", "DQ.P1.C01",
    "una ama que pasaba de los cuarenta", 12, 45, "edades domésticas")
PS["DQ.P1.C01.P0005"] = pasaje("DQ.P1.C01.P0005", "DQ.P1.C01",
    "halló a quien dar nombre de su dama", 5, 60, "Dulcinea")
PS["DQ.P1.C16.P0001"] = pasaje("DQ.P1.C16.P0001", "DQ.P1.C16",
    "El ventero, que vio a don Quijote atravesado en el asno", 0, 45, "apertura de I,16")
PS["DQ.P1.C16.P0002"] = pasaje("DQ.P1.C16.P0002", "DQ.P1.C16",
    "En esta maldita cama se acostó don Quijote", 25, 45, "la cama y sus hilos")
PS["DQ.P1.C16.P0003"] = pasaje("DQ.P1.C16.P0003", "DQ.P1.C16",
    "alumbrándoles Maritornes, que así se llamaba la asturiana", 20, 40, "Maritornes")
PS["DQ.P1.C21.P0001"] = pasaje("DQ.P1.C21.P0001", "DQ.P1.C21",
    "comenzó a llover un poco, y quisiera Sancho que se entraran en el molino de los batanes", 2, 40, "apertura")
PS["DQ.P1.C21.P0002"] = pasaje("DQ.P1.C21.P0002", "DQ.P1.C21",
    "que trae puesto en la cabeza un yelmo de oro", 30, 45, "percepción del yelmo")
PS["DQ.P1.C21.P0003"] = pasaje("DQ.P1.C21.P0003", "DQ.P1.C21",
    "traía una bacía de azófar", 25, 45, "la bacía real")
PS["DQ.P1.C21.P0004"] = pasaje("DQ.P1.C21.P0004", "DQ.P1.C21",
    "sobre el yelmo de Mambrino, que tan caro le costó a Sacripante", 30, 30, "la leyenda de Mambrino")
PS["DQ.P2.C10.P0001"] = pasaje("DQ.P2.C10.P0001", "DQ.P2.C10",
    "venían tres labradoras sobre tres pollinos, o pollinas", 25, 40, "la duda del narrador")
PS["DQ.P2.C10.P0002"] = pasaje("DQ.P2.C10.P0002", "DQ.P2.C10",
    "como no vio sino a las tres labradoras, turbóse todo", 25, 40, "reacción de don Quijote")
PS["DQ.P2.C10.P0003"] = pasaje("DQ.P2.C10.P0003", "DQ.P2.C10",
    "burra de mi suegro", 30, 40, "réplica de la aldeana")

# ----------------------------------------------- personas nuevas
def persona(pid, nombre, clase, variants, aps, rels=None):
    rel = "persons/%s.json" % pid
    if rel in files["persons"]:
        return
    files["persons"].append(rel)
    with open(os.path.join(PKG, "persons", "%s.json" % pid), "w", encoding="utf-8") as f:
        json.dump({"id": pid, "contract_version": CV, "class": clase,
                    "canonical_name": nombre, "variants": variants,
                    "relations": rels or [], "appearances": aps,
                    "certainty": "TEXTO_EXPLICITO",
                    "review": {"state": "borrador", "reviewer_role": None, "date": "2026-11-06"}},
                   f, ensure_ascii=False, indent=1)

persona("DQ.PER.0015", "Maritornes", "ficticio", ["la asturiana"],
         ["DQ.P1.C16.E01"])
persona("DQ.PER.0016", "El barbero de Mambrino", "ficticio", ["un barbero"],
         ["DQ.P1.C21.E01"])
persona("DQ.PER.0017", "Las tres labradoras del Toboso", "ficticio",
         ["tres aldeanas", "las tres labradoras"], ["DQ.P2.C10.E01"])
persona("DQ.PER.0018", "El ventero", "ficticio", ["Juan Palomeque el zurdo (nombre en I,16)"],
         ["DQ.P1.C16.E01"])
persona("DQ.PER.0019", "Dulcinea del Toboso (Aldonza Lorenzo)", "ficticio",
         ["Aldonza Lorenzo"], ["DQ.P1.C01.E01", "DQ.P2.C10.E01"])

# ----------------------------------------------- medios: acuarelas y escenas
ilus = json.load(open(os.path.join(REPO, "assets", "ilustraciones_tusell", "manifests", "manifest_ilustraciones.json"), encoding="utf-8"))
ilus_by_name = {r["archivo"]: r for r in ilus["imagenes"] if r["clase"] == "acuarela_tusell"}
escn = json.load(open(os.path.join(REPO, "assets", "scenes", "manifest.json"), encoding="utf-8"))
escn_by_id = {i["candidate_media_id"]: i for i in escn["images"]}

SPOILER = {4: "ninguno", 5: "ninguno", 6: "ninguno",
            48: "leve", 49: "leve", 50: "leve",
            65: "leve", 66: "leve",
            190: "leve", 191: "leve", 192: "revelador"}

def media_acuarela(num):
    mid = "DQ.MA.%06d" % num
    rel = "media_assets/%s.json" % mid
    if rel in files["media_assets"]:
        return
    r = ilus_by_name["%03d.jpg" % num]
    files["media_assets"].append(rel)
    with open(os.path.join(PKG, "media_assets", "%s.json" % mid), "w", encoding="utf-8") as f:
        json.dump({"id": mid, "contract_version": CV, "function": "museo",
                    "media_class": "ACUARELA_HISTORICA",
                    "logical_uri": "assets://ilustraciones_tusell/acuarelas/%03d.jpg" % num,
                    "derivatives": [{"variant": "original", "format": "jpg",
                                      "width": r["ancho"], "height": r["alto"],
                                      "size_bytes": r["bytes"], "sha256": "sha256:" + r["sha256"]}],
                    "alt": (r["referencias"][0]["alt"] if r["referencias"] else "Acuarela Tusell"),
                    "source_id": "DQ.SRC.0001", "license_id": "DQ.LIC.0001",
                    "author": "Salvador Tusell (sobre composición de Gustave Doré)", "date": "1905",
                    "allowed_uses": ["uso_personal_app", "almacenamiento_repo_git"],
                    "license_status": "verificada",
                    "provenance": "EPUB Epublibre/Titivillus 2024; ed. Barcelona, Luis Tasso, 1905 (BVPB registro 463832).",
                    "review": {"state": "documentada", "reviewer_role": "editorial", "date": "2026-11-06"},
                    "spoiler_level": SPOILER.get(num, "leve")}, f, ensure_ascii=False, indent=1)

def media_escena(cid_escena):
    mid = "DQ.MA.%s" % cid_escena.split(".")[-1]
    rel = "media_assets/%s.json" % mid
    if rel in files["media_assets"]:
        return
    r = escn_by_id[cid_escena]
    ruta = os.path.join(REPO, r["relative_path"].replace("/", os.sep))
    files["media_assets"].append(rel)
    with open(os.path.join(PKG, "media_assets", "%s.json" % mid), "w", encoding="utf-8") as f:
        json.dump({"id": mid, "contract_version": CV,
                    "function": "pre_pregunta" if r["phase"] == "pre" else "post_desenlace",
                    "media_class": "RECREACION_IA",
                    "logical_uri": "assets://" + r["relative_path"].replace("assets/", ""),
                    "derivatives": [{"variant": "original", "format": "webp",
                                      "width": r["width_px"], "height": r["height_px"],
                                      "size_bytes": os.path.getsize(ruta),
                                      "sha256": "sha256:" + r["sha256"]}],
                    "alt": r.get("alt_es", r.get("title_es", "Recreación del proyecto")),
                    "source_id": "DQ.SRC.0003", "license_id": "DQ.LIC.0002",
                    "author": "Equipo de arte El_Quijote_App (recreación IA)", "date": "2026-11-05",
                    "allowed_uses": ["uso_personal_app", "almacenamiento_repo_git"],
                    "license_status": "verificada",
                    "provenance": "Recreación IA del proyecto; rotulada RECREACION_ARTISTICA.",
                    "review": {"state": "borrador", "reviewer_role": None, "date": None},
                    "spoiler_level": "ninguno" if r["phase"] == "pre" else "leve"}, f, ensure_ascii=False, indent=1)

for n in (4, 5, 6, 48, 49, 50, 65, 66, 190, 191, 192):
    media_acuarela(n)
for c in ("DQ.MED.900002", "DQ.MED.900019", "DQ.MED.900025"):
    media_escena(c)

# ----------------------------------------------- episodios nuevos
def episodio(eid, titulo, caps, orden, synopsis, actores, pasajes, spoiler=False):
    rel = "episodes/%s.json" % eid
    if rel in files["episodes"]:
        return
    files["episodes"].append(rel)
    with open(os.path.join(PKG, "episodes", "%s.json" % eid), "w", encoding="utf-8") as f:
        json.dump({"id": eid, "contract_version": CV, "title": titulo, "chapters": caps,
                    "narrative_order": orden, "synopsis": synopsis, "actors": actores,
                    "places": ["DQ.LOC.0001"], "passages": pasajes,
                    "spoiler_flags": {"reveals_future_events": spoiler}}, f, ensure_ascii=False, indent=1)

episodio("DQ.P1.C01.E01", "El hidalgo, los libros y los nombres",
          ["DQ.P1.C01"], 1,
          "La condición del hidalgo, la lectura que le enloquece y los bautizos famosos: Rocinante, su propio nombre y Dulcinea del Toboso.",
          ["DQ.PER.0001", "DQ.PER.0003", "DQ.PER.0007", "DQ.PER.0008", "DQ.PER.0019"],
          ["DQ.P1.C01.P0001", "DQ.P1.C01.P0002", "DQ.P1.C01.P0003", "DQ.P1.C01.P0005"])
episodio("DQ.P1.C16.E01", "La venta como castillo; Maritornes",
          ["DQ.P1.C16"], 16,
          "Don Quijote interpreta la venta como castillo; la noche de la cama maldita y Maritornes completan la comedia doméstica.",
          ["DQ.PER.0001", "DQ.PER.0002", "DQ.PER.0015", "DQ.PER.0018"],
          ["DQ.P1.C16.P0001", "DQ.P1.C16.P0002", "DQ.P1.C16.P0003"])
episodio("DQ.P1.C21.E01", "El yelmo de Mambrino",
          ["DQ.P1.C21"], 21,
          "Bajo la llovizna, un barbero con su bacía de azófar se convierte en caballero con yelmo de oro; don Quijote la reclama como trofeo.",
          ["DQ.PER.0001", "DQ.PER.0002", "DQ.PER.0016"],
          ["DQ.P1.C21.P0001", "DQ.P1.C21.P0002", "DQ.P1.C21.P0003", "DQ.P1.C21.P0004"])
episodio("DQ.P2.C10.E01", "El encanto de Dulcinea",
          ["DQ.P2.C10"], 62,
          "Tres labradoras en sus pollinos: Sancho proclama a Dulcinea; la réplica campesina y la perplexidad de don Quijote componen el mayor engaño de la obra.",
          ["DQ.PER.0001", "DQ.PER.0002", "DQ.PER.0017", "DQ.PER.0019"],
          ["DQ.P2.C10.P0001", "DQ.P2.C10.P0002", "DQ.P2.C10.P0003"])

# ----------------------------------------------- preguntas
def Q(qid, episode, caps, passages, prompt, inter, rationale, evid, cognitive, diff, tags, semkey, pre=None):
    vr = {"pre_image_must_not_reveal": True}
    if pre: vr["pre_image_media_id"] = pre
    rel = "questions/%s.json" % qid
    if rel in files["questions"]:
        return
    files["questions"].append(rel)
    with open(os.path.join(PKG, "questions", "%s.json" % qid), "w", encoding="utf-8") as f:
        json.dump({"id": qid, "contract_version": CV, "episode_id": episode,
                    "chapter_ids": caps, "passage_ids": passages, "prompt": prompt,
                    "interaction": inter, "rationale": rationale,
                    "evidence": [{"kind": "cita_literal", "passage_id": p, "quote": q} for p, q in evid],
                    "certainty": "TEXTO_EXPLICITO", "cognitive_type": cognitive, "difficulty": diff,
                    "spoiler_policy": {"safe_after_episodes": [episode]},
                    "visual_requirements": vr, "language": "es", "tags": tags,
                    "review": {"state": "borrador", "reviewer_role": None, "date": None},
                    "semantic_key": semkey}, f, ensure_ascii=False, indent=1)

def O(q, n, label, expl=None):
    o = {"id": "%s.O%02d" % (q, n), "label": label}
    if expl: o["explanation"] = expl
    return o

P1 = "DQ.P1.C01"; E1 = "DQ.P1.C01.E01"; PRE1 = "DQ.MA.900002"
P16 = "DQ.P1.C16"; E16 = "DQ.P1.C16.E01"
P21 = "DQ.P1.C21"; E21 = "DQ.P1.C21.E01"; PRE21 = "DQ.MA.900025"
P210 = "DQ.P2.C10"; E210 = "DQ.P2.C10.E01"; PRE210 = "DQ.MA.900019"

# --- I.1 (6)
Q("DQ.Q.000301", E1, [P1], [P1+".P0001".replace("P0001", "P0001")] if False else ["DQ.P1.C01.P0001"],
  "¿Cómo se presenta el lugar natal del hidalgo en el arranque de la obra?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000301", 1, "«En un lugar de la Mancha, de cuyo nombre no quiero acordarme»"),
               O("DQ.Q.000301", 2, "«En la ilustre villa de Argamasilla, honrada por todos»"),
               O("DQ.Q.000301", 3, "«A las puertas de Toledo, junto a la vega»")],
   "correct_option_ids": ["DQ.Q.000301.O01"], "shuffle_options": True},
  "El incipit canónico deja el pueblo sin nombre por voluntad narrativa (I, 1).",
  [("DQ.P1.C01.P0001", PS["DQ.P1.C01.P0001"])],
  "hecho", 1, ["banco", "inicio"], "inicio lugar mancha no quiero acordarme", pre=PRE1)

Q("DQ.Q.000302", E1, [P1], ["DQ.P1.C01.P0002"],
  "¿Qué sobrenombres del hidalgo baraja el narrador en I, 1?",
  {"type": "multi_choice", "multi_declared": True,
   "options": [O("DQ.Q.000302", 1, "Quijada"),
               O("DQ.Q.000302", 2, "Quesada"),
               O("DQ.Q.000302", 3, "Quejana"),
               O("DQ.Q.000302", 4, "Quijote de la Mancha, de nacimiento")],
   "correct_option_ids": ["DQ.Q.000302.O01", "DQ.Q.000302.O02", "DQ.Q.000302.O03"],
   "shuffle_options": True},
  "«Que en esto hay alguna diferencia en los autores»; Quijote será el nombre que se dará después, no el de nacimiento.",
  [("DQ.P1.C01.P0002", PS["DQ.P1.C01.P0002"])],
  "hecho", 2, ["banco", "inicio"], "inicio sobrenombres quijada quesada quejana", pre=PRE1)

Q("DQ.Q.000303", E1, [P1], ["DQ.P1.C01.P0003"],
  "¿Qué versos de Feliciano de Silva enloquecían al hidalgo al leerlos?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000303", 1, "«La razón de la sinrazón que a mi razón se hace, de tal manera mi razón enflaquece, que con razón me quejo de la vuestra fermosura»"),
               O("DQ.Q.000303", 2, "«Los altos cielos que de vuestra divinidad divinamente con las estrellas os fortifican»"),
               O("DQ.Q.000303", 3, "«El corazón del hidalgo herido de amor cabalga por el valle»")],
   "correct_option_ids": ["DQ.Q.000303.O01"], "shuffle_options": True},
  "La parodia del estilo silvesco (razón/sinrazón) es la sátira literaria de apertura (I, 1); «los altos cielos...» es la segunda cita que leía, y la tercera no existe.",
  [("DQ.P1.C01.P0003", PS["DQ.P1.C01.P0003"])],
  "humor", 2, ["banco", "inicio"], "inicio sinrazón feliciano silva", pre=PRE1)

Q("DQ.Q.000304", E1, [P1], ["DQ.P1.C01.P0004"],
  "¿Qué edades atribuye el narrador al ama y a la sobrina?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000304", 1, "El ama pasaba de los cuarenta; la sobrina no llegaba a los veinte"),
               O("DQ.Q.000304", 2, "El ama pasaba de los treinta; la sobrina llegaba a los veinte"),
               O("DQ.Q.000304", 3, "Ambas rondaban los cincuenta")],
   "correct_option_ids": ["DQ.Q.000304.O01"], "shuffle_options": True},
  "Los perfiles domésticos se dan con precisión cómica en el retrato inicial (I, 1).",
  [("DQ.P1.C01.P0004", PS["DQ.P1.C01.P0004"])],
  "hecho", 1, ["banco", "inicio"], "inicio ama cuarenta sobrina veinte", pre=PRE1)

Q("DQ.Q.000305", E1, [P1], ["DQ.P1.C01.P0005"],
  "¿Verdadero o falso: la labradora de quien se enamoró el hidalgo sabía que él la amaba?",
  {"type": "true_false",
   "options": [O("DQ.Q.000305", 1, "Verdadero"), O("DQ.Q.000305", 2, "Falso")],
   "correct_option_ids": ["DQ.Q.000305.O02"], "shuffle_options": False},
  "«Aunque, según se entiende, ella jamás lo supo»: el amor fue secreto (I, 1).",
  [("DQ.P1.C01.P0005", PS["DQ.P1.C01.P0005"])],
  "hecho", 1, ["banco", "inicio"], "inicio dulcinea labradora jamás lo supo", pre=PRE1)

Q("DQ.Q.000306", E1, [P1], ["DQ.P1.C01.P0005"],
  "¿Por qué, según don Quijote, resultaba adecuada la talla de la labradora para ser su dama?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000306", 1, "Porque su fama y hermosura merecían una corona de reina; y el nombre, Dulcinea del Toboso, por ser del Toboso"),
               O("DQ.Q.000306", 2, "Porque era nobleza de sangre y de apellido real"),
               O("DQ.Q.000306", 3, "Porque llevaba el mismo nombre que la princesa de Micomicona")],
   "correct_option_ids": ["DQ.Q.000306.O01"], "shuffle_options": True},
  "La construcción deliberada del nombre-poema culmina el bautizo imaginativo (I, 1).",
  [("DQ.P1.C01.P0005", PS["DQ.P1.C01.P0005"])],
  "actitud_reaccion", 2, ["banco", "inicio"], "inicio dulcinea nombre talla reina toboso", pre=PRE1)

# --- I.16 (6)
Q("DQ.Q.000307", E16, [P16], ["DQ.P1.C16.P0001"],
  "¿Qué explica Sancho al ventero sobre el estado de su amo a la llegada a la venta?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000307", 1, "Que había caído de una peña abajo y venía algo brumado"),
               O("DQ.Q.000307", 2, "Que estaba encantado por un mago enemigo"),
               O("DQ.Q.000307", 3, "Que había vencido a gigantes y venía molido de gloria")],
   "correct_option_ids": ["DQ.Q.000307.O01"], "shuffle_options": True},
  "La excusa práctica de Sancho abre el capítulo de la venta (I, 16).",
  [("DQ.P1.C16.P0001", PS["DQ.P1.C16.P0001"])],
  "hecho", 1, ["banco", "venta"], "venta sancho caída peña brumado ventero")

Q("DQ.Q.000308", E16, [P16], ["DQ.P1.C16.P0002"],
  "¿Cómo describe el narrador la cama en la que acuestan a don Quijote?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000308", 1, "«Maldita cama», cuyo bastidor de hilos, si se contaran, «no se perdiera uno solo de la cuenta»"),
               O("DQ.Q.000308", 2, "Cama regia de damasco con dosel de terciopelo"),
               O("DQ.Q.000308", 3, "Un lecho de mano real, prestado por un noble vecino")],
   "correct_option_ids": ["DQ.Q.000308.O01"], "shuffle_options": True},
  "El contraste entre castillo imaginado y cama ruin sostiene el humor del capítulo.",
  [("DQ.P1.C16.P0002", PS["DQ.P1.C16.P0002"])],
  "humor", 2, ["banco", "venta"], "venta cama maldita hilos cuenta", )

Q("DQ.Q.000309", E16, [P16], ["DQ.P1.C16.P0003"],
  "¿Quién es Maritornes y cómo se presenta en el texto?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000309", 1, "La asturiana de la venta, «que así se llamaba», que alumbra mientras emplastan a don Quijote"),
               O("DQ.Q.000309", 2, "La hija del ventero, doncella discreta enamorada del hidalgo"),
               O("DQ.Q.000309", 3, "Una princesa encantada que sirve en la venta")],
   "correct_option_ids": ["DQ.Q.000309.O01"], "shuffle_options": True},
  "La presentación literaria de Maritornes (I, 16).",
  [("DQ.P1.C16.P0003", PS["DQ.P1.C16.P0003"])],
  "hecho", 1, ["banco", "venta"], "venta maritornes asturiana alumbra")

Q("DQ.Q.000310", E16, [P16], ["DQ.P1.C16.P0002", "DQ.P1.C16.P0003"],
  "¿Quiénes emplastan «de arriba abajo» a don Quijote aquella noche? (varias)",
  {"type": "multi_choice", "multi_declared": True,
   "options": [O("DQ.Q.000310", 1, "La ventera"),
               O("DQ.Q.000310", 2, "La hija del ventero"),
               O("DQ.Q.000310", 3, "Maritornes, alumbrando"),
               O("DQ.Q.000310", 4, "El bachiller Sansón Carrasco, como médico")],
   "correct_option_ids": ["DQ.Q.000310.O01", "DQ.Q.000310.O02", "DQ.Q.000310.O03"],
   "shuffle_options": True},
  "Las tres mujeres de la venta aplican los emplastos; Sansón Carrasco aún no ha aparecido.",
  [("DQ.P1.C16.P0003", PS["DQ.P1.C16.P0003"])],
  "secuencia", 2, ["banco", "venta"], "venta emplastes ventera hija maritornes")

Q("DQ.Q.000311", E16, [P16], ["DQ.P1.C16.P0002"],
  "¿Verdadero o falso: el texto dice que la cama «parecían golpes de rey»?",
  {"type": "true_false",
   "options": [O("DQ.Q.000311", 1, "Verdadero"),
               O("DQ.Q.000311", 2, "Falso")],
   "correct_option_ids": ["DQ.Q.000311.O02"], "shuffle_options": False},
  "La ventera dice que «aquello más parecían golpes de silla» — la opción con «rey» altera la cita (I, 16).",
  [("DQ.P1.C16.P0002", PS["DQ.P1.C16.P0002"])],
  "cita", 2, ["banco", "venta"], "venta golpes silla cita exacta")

Q("DQ.Q.000312", E16, [P16], ["DQ.P1.C16.P0001"],
  "¿Cómo interpreta don Quijote el recibimiento en la venta al ser atendido?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000312", 1, "Como servido por «principales señoras y damas de aquel castillo»"),
               O("DQ.Q.000312", 2, "Como una burla de los villanos que lo odian"),
               O("DQ.Q.000312", 3, "Como la obra clara de los encantadores favorables")],
   "correct_option_ids": ["DQ.Q.000312.O01"], "shuffle_options": True},
  "«Nunca fuera caballero de damas tan bien servido...»: la lectura caballeresca de la atención doméstica.",
  [("DQ.P1.C16.P0002", PS["DQ.P1.C16.P0002"])],
  "actitud_reaccion", 2, ["banco", "venta"], "venta damas castillo interpretación")

# --- I.21 (6)
Q("DQ.Q.000313", E21, [P21], ["DQ.P1.C21.P0001"],
  "¿Qué quería Sancho al comenzar a llover al inicio del capítulo?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000313", 1, "Entrar en el molino de los batanes, aunque a su amo le aborrecía"),
               O("DQ.Q.000313", 2, "Volver de inmediato a su aldea"),
               O("DQ.Q.000313", 3, "Vendarle el brazo roto al amo")],
   "correct_option_ids": ["DQ.Q.000313.O01"], "shuffle_options": True},
  "El «pesada burla» de los batanes (I, 20) aún pesaba sobre don Quijote.",
  [("DQ.P1.C21.P0001", PS["DQ.P1.C21.P0001"])],
  "hecho", 1, ["banco", "mambrino"], "mambrino lluvia batanes entrada", pre=PRE21)

Q("DQ.Q.000314", E21, [P21], ["DQ.P1.C21.P0002", "DQ.P1.C21.P0003"],
  "¿Qué ve cada uno en el que se acerca bajo la lluvia? (varias)",
  {"type": "multi_choice", "multi_declared": True,
   "options": [O("DQ.Q.000314", 1, "Don Quijote: un caballero sobre un caballo rucio rodado con un yelmo de oro"),
               O("DQ.Q.000314", 2, "Sancho: un hombre sobre un asno pardo con una cosa que relumbra"),
               O("DQ.Q.000314", 3, "El barbero: dos amigos del gremio con sus bacías"),
               O("DQ.Q.000314", 4, "Un encantador montado en nubes humeantes")],
   "correct_option_ids": ["DQ.Q.000314.O01", "DQ.Q.000314.O02"], "shuffle_options": True},
  "Las dos percepciones textuales contrapuestas; el barbero ve simplemente la lluvia y su bacía.",
  [("DQ.P1.C21.P0002", PS["DQ.P1.C21.P0002"]),
   ("DQ.P1.C21.P0003", PS["DQ.P1.C21.P0003"])],
  "dialogo", 2, ["banco", "mambrino"], "mambrino percepciones yelmo oro bacía relumbra", pre=PRE21)

Q("DQ.Q.000315", E21, [P21], ["DQ.P1.C21.P0003"],
  "¿Por qué llevaba el barbero la bacía sobre la cabeza?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000315", 1, "Porque comenzaba a llover y no quería mancharse el sombrero, que debía ser nuevo"),
               O("DQ.Q.000315", 2, "Porque era su modo de ser armado caballero"),
               O("DQ.Q.000315", 3, "Porque se la habían robado el yelmo y la usaba de adarga")],
   "correct_option_ids": ["DQ.Q.000315.O01"], "shuffle_options": True},
  "La explicación prosaica y perfecta del equívoco (I, 21).",
  [("DQ.P1.C21.P0003", PS["DQ.P1.C21.P0003"])],
  "causa_consecuencia", 1, ["banco", "mambrino"], "mambrino bacía azófar lluvia sombrero", pre=PRE21)

Q("DQ.Q.000316", E21, [P21], ["DQ.P1.C21.P0004"],
  "¿Qué precedente caballeresco cita don Quijote para justificar tomar la bacía?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000316", 1, "El yelmo de Mambrino, «que tan caro le costó a Sacripante»"),
               O("DQ.Q.000316", 2, "La espada de Amadís, ganada aEndriago"),
               O("DQ.Q.000316", 3, "La lanza de Reinaldos de Montalbán")],
   "correct_option_ids": ["DQ.Q.000316.O01"], "shuffle_options": True},
  "«Esto mesmo pasó, al pie de la letra»: el precedente literario legitima su locura (I, 21).",
  [("DQ.P1.C21.P0004", PS["DQ.P1.C21.P0004"])],
  "interpretacion", 2, ["banco", "mambrino"], "mambrino precedente sacripante palmerín", pre=PRE21)

Q("DQ.Q.000317", E21, [P21], ["DQ.P1.C21.P0002", "DQ.P1.C21.P0004"],
  "¿Verdadero o falso: Sancho reconoce desde el principio que aquello es un yelmo de oro?",
  {"type": "true_false",
   "options": [O("DQ.Q.000317", 1, "Verdadero"), O("DQ.Q.000317", 2, "Falso")],
   "correct_option_ids": ["DQ.Q.000317.O02"], "shuffle_options": False},
  "Sancho ve «una cosa que relumbra» sobre un hombre de asno pardo; la gloria dorada es de su amo.",
  [("DQ.P1.C21.P0002", PS["DQ.P1.C21.P0002"])],
  "dialogo", 1, ["banco", "mambrino"], "mambrino sancho reconoce falso relumbra", pre=PRE21)

Q("DQ.Q.000318", E21, [P21], ["DQ.P1.C21.P0001", "DQ.P1.C21.P0002", "DQ.P1.C21.P0004"],
  "Ordena los lances de la aventura del yelmo.",
  {"type": "ordering",
   "options": [O("DQ.Q.000318", 1, "Llueve; Sancho propone refugiarse en los batanes y don Quijote lo rechaza"),
               O("DQ.Q.000318", 2, "Don Quijote señala al jinete con «yelmo de oro» bajo la lluvia"),
               O("DQ.Q.000318", 3, "Don Quijote ordena «Apártate» y embiste al barbero"),
               O("DQ.Q.000318", 4, "El barbero deja la bacía y huye; don Quijote la recoge como trofeo")],
   "correct_order": ["DQ.Q.000318.O01", "DQ.Q.000318.O02", "DQ.Q.000318.O03", "DQ.Q.000318.O04"],
   "shuffle_options": False},
  "Secuencia canónica de I, 21: lluvia, avistamiento, carga, conquista de la bacía-yelmo.",
  [("DQ.P1.C21.P0001", PS["DQ.P1.C21.P0001"])],
  "secuencia", 2, ["banco", "mambrino"], "mambrino orden lluvia avistamiento carga bacía", pre=PRE21)

# --- II.10 (6)
Q("DQ.Q.000319", E210, [P210], ["DQ.P2.C10.P0001"],
  "¿Qué duda confiesa el narrador sobre las monturas de las tres labradoras?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000319", 1, "Si eran «pollinos, o pollinas»; más se puede creer que borricas, aunque el autor no lo declara"),
               O("DQ.Q.000319", 2, "Si eran caballos de la guarnición ducal"),
               O("DQ.Q.000319", 3, "Si eran burros robados al primo de Sancho")],
   "correct_option_ids": ["DQ.Q.000319.O01"], "shuffle_options": True},
  "El discursear erudito sobre «borricas» es una de las mayores ironías del narrador (II, 10).",
  [("DQ.P2.C10.P0001", PS["DQ.P2.C10.P0001"])],
  "humor", 2, ["banco", "dulcinea"], "dulcinea pollinos pollinas borricas narrador", pre=PRE210)

Q("DQ.Q.000320", E210, [P210], ["DQ.P2.C10.P0002"],
  "¿Qué siente don Quijote al ver «a las tres labradoras» en el camino del Toboso?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000320", 1, "«Turbóse todo», sin creer lo que Sancho le señala"),
               O("DQ.Q.000320", 2, "Alegría plena: reconoce a Dulcinea al instante"),
               O("DQ.Q.000320", 3, "Indiferencia: solo piensa en la partida a Zaragoza")],
   "correct_option_ids": ["DQ.Q.000320.O01"], "shuffle_options": True},
  "La perturbación del caballero ante la realidad campesina (II, 10).",
  [("DQ.P2.C10.P0002", PS["DQ.P2.C10.P0002"])],
  "actitud_reaccion", 1, ["banco", "dulcinea"], "dulcinea turbóse reacción", pre=PRE210)

Q("DQ.Q.000321", E210, [P210], ["DQ.P2.C10.P0003"],
  "¿Cómo replica una de las labradoras al verse elegida como Dulcinea?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000321", 1, "«¡Jo, que te estrego, burra de mi suegro!... como si aquí no supiésemos echar pullas como ellos»"),
               O("DQ.Q.000321", 2, "«Sea vuestra merced bien venido, gran señor, a nuestro humilde lugar»"),
               O("DQ.Q.000321", 3, "«Milagro es, señor, que no os ha maltratado la locura»")],
   "correct_option_ids": ["DQ.Q.000321.O01"], "shuffle_options": True},
  "La réplica campesina devuelta la pulla al «señorito»: tensión social y humor (II, 10).",
  [("DQ.P2.C10.P0003", PS["DQ.P2.C10.P0003"])],
  "humor", 2, ["banco", "dulcinea"], "dulcinea pulla burra suegro señoritos")

Q("DQ.Q.000322", E210, [P210], ["DQ.P2.C10.P0001", "DQ.P2.C10.P0003"],
  "¿Qué debe hacer Sancho, según la interpretación que él impone a su amo? (varias)",
  {"type": "multi_choice", "multi_declared": True,
   "options": [O("DQ.Q.000322", 1, "Mantener que Dulcinea está encantada por encantadores enemigos"),
               O("DQ.Q.000322", 2, "Llevar a su amo a la cuesta del despeñadero en un día claro"),
               O("DQ.Q.000322", 3, "Confesar la verdad de que la labradora era la hija de un vecino"),
               O("DQ.Q.000322", 4, "Hacer que don Quijote se golpee la cabeza con una piedra")],
   "correct_option_ids": ["DQ.Q.000322.O01", "DQ.Q.000322.O02"], "shuffle_options": True},
  "La estrategia sanpachesca del encanto y el despeñamiento (II, 10): la confesión está fuera de su plan.",
  [("DQ.P2.C10.P0001", PS["DQ.P2.C10.P0001"])],
  "interpretacion", 2, ["banco", "dulcinea"], "dulcinea encanto despeñadero estrategia")

Q("DQ.Q.000323", E210, [P210], ["DQ.P2.C10.P0002"],
  "¿Verdadero o falso: el texto llama «labradoras» a las tres mujeres desde la primera mención?",
  {"type": "true_false",
   "options": [O("DQ.Q.000323", 1, "Verdadero"),
               O("DQ.Q.000323", 2, "Falso")],
   "correct_option_ids": ["DQ.Q.000323.O01"], "shuffle_options": False},
  "«Descubrieron cerca a las tres aldeanas... como no vio sino a las tres labradoras»: ambos términos se usan; la narración nunca los disfraza de princesas.",
  [("DQ.P2.C10.P0002", PS["DQ.P2.C10.P0002"])],
  "hecho", 1, ["banco", "dulcinea"], "dulcinea aldeanas labradoras términos")

Q("DQ.Q.000324", E210, [P210], ["DQ.P2.C10.P0001", "DQ.P2.C10.P0002", "DQ.P2.C10.P0003"],
  "Ordena los pasos del «encanto» de Dulcinea.",
  {"type": "ordering",
   "options": [O("DQ.Q.000324", 1, "Sancho avista las tres aldeanas desde lejos y prepara a su amo"),
               O("DQ.Q.000324", 2, "Don Quijote corre a arrodillarse ante «la más alta princesa»"),
               O("DQ.Q.000324", 3, "La aldeana responde con la pulla de la «burra de mi suegro»"),
               O("DQ.Q.000324", 4, "Don Quijote interpreta la huida como obra de encantadores")],
   "correct_order": ["DQ.Q.000324.O01", "DQ.Q.000324.O02", "DQ.Q.000324.O03", "DQ.Q.000324.O04"],
   "shuffle_options": False},
  "Secuencia canónica del «encanto» (II, 10): avistamiento, arrodillamiento, réplica, interpretación.",
  [("DQ.P2.C10.P0002", PS["DQ.P2.C10.P0002"])],
  "secuencia", 2, ["banco", "dulcinea"], "dulcinea orden encanto arrodilla pulla encantadores", pre=PRE210)

manifest["counts"] = {"questions": len(files["questions"]), "episodes": len(files["episodes"]),
                       "media_assets": len(files["media_assets"]), "discoveries": len(files["discoveries"]),
                       "passages": len(files["passages"]), "museum_items": len(files["museum_items"])}
with open(os.path.join(PKG, "package.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)
print("FASE C OK: preguntas=%d pasajes=%d medios=%d episodios=%d personas=%d" % (
    len(files["questions"]), len(files["passages"]), len(files["media_assets"]),
    len(files["episodes"]), len(files["persons"])))
