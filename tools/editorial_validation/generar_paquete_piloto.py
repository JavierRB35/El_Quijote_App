#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera el PAQUETE EDITORIAL DEL PILOTO en formato canónico v0.2.0 (encargo §6, contrato v0.2.0).
Modo CONTENIDOS. Uso: python -I generar_paquete_piloto.py <raiz_repo>
Entradas: docs/data/piloto_precarga.json (borrador 0.1 -> migración), manifiestos reales
de acuarelas y escenas. Salida: content/piloto/** + package.json. No edita otros paquetes.
"""
import sys, os, json, re, html, hashlib

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
TXT = os.path.join(REPO, "..", "..", "data", "epub_extract", "OEBPS", "Text")
TXT = os.path.abspath(TXT)
OUT = os.path.join(REPO, "content", "piloto")
CV = "1.0.0"

def w(rel, obj):
    p = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
    return rel.replace("\\", "/")

def sha_txt(s):
    return "sha256:" + hashlib.sha256(s.encode("utf-8")).hexdigest()

def plain(fich):
    raw = open(os.path.join(TXT, fich), encoding="utf-8", errors="replace").read()
    return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", raw))).strip()

# ------------------------------------------------------------------ citas reales (EPUB Tusell, verbatim)
CITAS = {
 "C08.P0001": ("1008.xhtml", "En esto descubrieron treinta ó cuarenta molinos de viento que hay en aquel campo",
               "capitular «E» en PNG (A.png); fragmento localizado sobre texto plano del EPUB"),
 "C08.P0002": ("1008.xhtml", "porque ves allí, amigo Sancho Panza, donde se descubren treinta ó pocos más desaforados gigantes, con quien pienso hacer batalla y quitarles á todos las vidas, con cuyos despojos comenzaremos á enriquecer; que ésta es buena guerra, y es gran servicio de Dios quitar tan mala simiente de sobre la faz de la tierra", None),
 "C08.P0003": ("1008.xhtml", "Mire vuestra merced, respondió Sancho, que aquellos que allí se parecen no son gigantes, sino molinos de viento, y lo que en ellos parecen brazos son las aspas, que, volteadas del viento, hacen andar la piedra del molino", None),
 "C08.P0004": ("1008.xhtml", "Levantóse en esto un poco de viento, y las grandes aspas comenzaron á moverse, lo cual visto por don Quijote, dijo: «Pues aunque mováis más brazos que los del gigante Briareo, me lo habéis de pagar»", None),
 "C08.P0005": ("1008.xhtml", "con la lanza en el ristre, arremetió á todo el galope de Rocinante, y embistió con el primer molino que estaba delante; y dándole una lanzada en el aspa, la volvió el viento con tanta furia, que hizo la lanza pedazos, llevándose tras sí al caballo y al caballero, que fué rodando muy mal trecho por el campo", None),
 "C08.P0006": ("1008.xhtml", "Acudió Sancho Panza á socorrerle á todo el correr de su asno", None),
 "C08.P0007": ("1008.xhtml", "Estando en estas razones, asomaron por el camino dos frailes de la orden de San Benito, caballeros sobre dos dromedarios; que no eran más pequeñas dos mulas en que venían", None),
 "C08.P0008": ("1008.xhtml", "aquellos bultos negros que allí parecen, deben de ser, y son sin duda, algunos encantadores, que llevan hurtada alguna princesa en aquel coche", None),
 "C08.P0009": ("1008.xhtml", "Peor será esto que los molinos de viento, dijo Sancho", None),
 "C08.P0010": ("1008.xhtml", "la soberbia de vuestros robadores yace por el suelo, derribada por este mi fuerte brazo; y porque no penéis por saber el nombre de vuestro libertador, sabed que yo me llamo don Quijote de la Mancha, caballero andante y aventurero, y cautivo de la sin par y hermosa doña Dulcinea del Toboso", None),
 "C08.P0011": ("1008.xhtml", "el cual, viendo que no quería dejar pasar el coche adelante, sino que decía que luego había de dar la vuelta al Toboso, se fué para don Quijote, y asiéndole de la lanza, le dijo en mala lengua castellana y peor vizcaína", None),
 "C08.P0012": ("1008.xhtml", "Non fuyades, cobardes y viles criaturas, que un solo caballero es el que os acomete", None),
 "C06.P0001": ("1006.xhtml", "Muchos años ha que es grande amigo mío ese Cervantes, y sé que es más versado en desdichas que en versos", None),
 "C06.P0002": ("1006.xhtml", "según he oído decir, este libro fué el primero de caballerías que se imprimió en España", None),
 "C11.P0001": ("2011.xhtml", "¡Dichosa edad y siglos dichosos aquellos á quien los antiguos pusieron nombre de dorados!", None),
 "C11.P0002": ("2011.xhtml", "entonces los que en ella vivían ignoraban estas dos palabras de ¡tuyo y mío!", None),
 "C18.P0001": ("1.18.xhtml", "el grande emperador Alifanfarón, señor de la grande isla Trapobana; este otro que á mis espaldas marcha es el de su enemigo, el rey de los garamantas, Pentapolín del Arremangado Brazo, porque siempre entra en las batallas con el brazo derecho desnudo", None),
 "C18.P0002": ("1.18.xhtml", "llégate á mí y mira cuántas muelas y dientes me faltan, que me parece que no me ha quedado ninguno en la boca", None),
 "P2.C01.P0001": ("2.1.xhtml", "el cura y el barbero se estuvieron casi un mes sin verle, por no renovarle y traerle á la memoria las cosas pasadas", None),
 "P2.C74.P0001": ("2.74.xhtml", "Verdaderamente se muere, y verdaderamente está cuerdo Alonso Quijano el Bueno; bien podemos entrar para que haga su testamento", None),
 "P2.C74.P0002": ("2.74.xhtml", "Dadme albricias, buenos señores, de que ya yo no soy don Quijote de la Mancha, sino Alonso Quijano", None),
 "P2.C74.P0003": ("2.74.xhtml", "Yace aquí el hidalgo fuerte, que á tanto extremo llegó de valiente, que se advierte que la muerte no triunfó de su vida con su muerte", None),
}

# ------------------------------------------------------------------ cargar datos reales
prec = json.load(open(os.path.join(REPO, "docs", "data", "piloto_precarga.json"), encoding="utf-8"))
ilus = json.load(open(os.path.join(REPO, "assets", "ilustraciones_tusell", "manifests", "manifest_ilustraciones.json"), encoding="utf-8"))
escn = json.load(open(os.path.join(REPO, "assets", "scenes", "manifest.json"), encoding="utf-8"))
ilus_by_name = {r["archivo"]: r for r in ilus["imagenes"] if r["clase"] == "acuarela_tusell"}
escn_by_id = {i["candidate_media_id"]: i for i in escn["images"]}

texto = {}
def find_pos(fich, frag):
    if fich not in texto:
        texto[fich] = plain(fich)
    i = texto[fich].find(frag)
    return i, i + len(frag)

episodes_pkg = {
    "DQ.P1.C08.E01": {"title": "Los molinos de viento y la batalla con el vizcaíno",
        "chapters": ["DQ.P1.C08", "DQ.P1.C09"], "order": 8,
        "synopsis": "Gigantes que son molinos, frailes tomados por encantadores y el desafío del escudero vizcaíno: tres percepciones desviadas encadenadas; el combate queda suspendido y concluye en I, 9.",
        "actors": ["DQ.PER.0001", "DQ.PER.0002", "DQ.PER.0003", "DQ.PER.0004"],
        "places": ["DQ.LOC.0002", "DQ.LOC.0003", "DQ.LOC.0004"],
        "passages": ["DQ.P1.C08.P0001", "DQ.P1.C08.P0003", "DQ.P1.C08.P0005", "DQ.P1.C08.P0007", "DQ.P1.C08.P0011"],
        "spoiler": False},
    "DQ.P1.C06.E01": {"title": "El escrutinio de la librería", "chapters": ["DQ.P1.C06"], "order": 6,
        "synopsis": "Cura y barbero revisan la biblioteca: quema mayoritaria con salvamentos selectivos (Amadís, Tirante) y la aparición meta-referencial de La Galatea.",
        "actors": ["DQ.PER.0005", "DQ.PER.0006", "DQ.PER.0007", "DQ.PER.0008", "DQ.PER.0012"],
        "places": ["DQ.LOC.0001"], "passages": ["DQ.P1.C06.P0001", "DQ.P1.C06.P0002"], "spoiler": False},
    "DQ.P1.C11.E01": {"title": "Los cabreros y el discurso de la Edad de Oro", "chapters": ["DQ.P1.C11"], "order": 11,
        "synopsis": "Cena con los cabreros; don Quijote pronuncia el discurso de la Edad de Oro sobre un puño de bellotas.",
        "actors": ["DQ.PER.0001", "DQ.PER.0002"], "places": ["DQ.LOC.0001"],
        "passages": ["DQ.P1.C11.P0001", "DQ.P1.C11.P0002"], "spoiler": False},
    "DQ.P1.C18.E01": {"title": "La batalla de los rebaños", "chapters": ["DQ.P1.C18"], "order": 18,
        "synopsis": "Polvareda y catálogo militar de improviso (Alifanfarón, Pentapolín); carga contra las ovejas; pedradas, muelas perdidas y bálsamo vomitado.",
        "actors": ["DQ.PER.0001", "DQ.PER.0002", "DQ.PER.0013", "DQ.PER.0014"],
        "places": ["DQ.LOC.0001", "DQ.LOC.0005"], "passages": ["DQ.P1.C18.P0001", "DQ.P1.C18.P0002"], "spoiler": False},
    "DQ.P2.C01.E01": {"title": "La visita del cura y el barbero", "chapters": ["DQ.P2.C01"], "order": 53,
        "synopsis": "Un mes sin verle 'por no renovarle las cosas pasadas'; conversación meta-literaria sobre la segunda parte impresa; marco de Cide Hamete.",
        "actors": ["DQ.PER.0005", "DQ.PER.0006", "DQ.PER.0001", "DQ.PER.0010"],
        "places": ["DQ.LOC.0001"], "passages": ["DQ.P2.C01.P0001"], "spoiler": False},
    "DQ.P2.C74.E01": {"title": "La muerte de Alonso Quijano", "chapters": ["DQ.P2.C74"], "order": 126,
        "synopsis": "Confesión, renuncia al nombre de don Quijote, testamento y muerte; epitafio de Sansón Carrasco.",
        "actors": ["DQ.PER.0001", "DQ.PER.0002", "DQ.PER.0005", "DQ.PER.0006", "DQ.PER.0007", "DQ.PER.0008", "DQ.PER.0009"],
        "places": ["DQ.LOC.0001"], "passages": ["DQ.P2.C74.P0001", "DQ.P2.C74.P0002", "DQ.P2.C74.P0003"], "spoiler": True},
}
files = {"editions": [], "chapters": [], "passages": [], "episodes": [], "questions": [],
         "discoveries": [], "persons": [], "places": [], "media_assets": [], "sources": [], "licenses": []}

# edicion / fuentes / licencias
files["editions"].append(w("editions/DQ.ED.0001.json", {
    "id": "DQ.ED.0001", "contract_version": CV,
    "title": "Don Quijote de la Mancha (Ilustrado por Salvador Tusell)",
    "editor": "Epublibre / Titivillus (base: Barcelona, Luis Tasso, 1905)",
    "year": 2024,
    "source_id": "DQ.SRC.0001",
    "digital_version": "EPUB Epublibre/Titivillus, base r2.1, revisión 1.0 (2024-02-11)",
    "rights_status": "verificada",
    "orthographic_rules": "modernizada",
    "checksum": "sha256:82647ac553c40eb0c216e9c76bbbbcb012ded1497711626b9c48a2f30bda7858",
    "provenance": "Ortografía modernizada de la edición Tasso 1905 (diacríticos áureos conservados parcialmente).",
    "notes": "Texto de trabajo del proyecto; la edición de referencia definitiva está pendiente (PEND-01).",
    "review": {"state": "documentada", "reviewer_role": "editorial", "date": "2026-11-05"}}))
files["sources"] += [
    w("sources/DQ.SRC.0001.json", {"id": "DQ.SRC.0001", "contract_version": CV,
        "title": "EPUB Don Quijote de la Mancha (Ilustrado por Salvador Tusell)", "author_editor": "Epublibre / Titivillus",
        "kind": "edicion_textual", "consulted_date": "2026-11-05",
        "notes": "SHA-256 82647ac5...bda7858; digitalización comunitaria de la ed. Tasso 1905."}),
    w("sources/DQ.SRC.0002.json", {"id": "DQ.SRC.0002", "contract_version": CV,
        "title": "BVPB, registro 463832 (ed. Luis Tasso, Barcelona, 1905, 2 vols.)", "author_editor": "Biblioteca Virtual del Patrimonio Bibliográfico",
        "kind": "registro_patrimonial", "consulted_date": "2026-11-05", "url": "https://bvpb.mcu.es/cervantes/es/consulta/registro.do?id=463832",
        "notes": "Edición digitalizada oficial; licencia CC BY de la digitalización."}),
    w("sources/DQ.SRC.0003.json", {"id": "DQ.SRC.0003", "contract_version": CV,
        "title": "Producción original del proyecto (recreaciones)", "author_editor": "Equipo de arte El_Quijote_App",
        "kind": "otro", "consulted_date": "2026-11-05", "notes": "Origen de las recreaciones propias: sin fuente externa."}),
]
files["licenses"] += [
    w("licenses/DQ.LIC.0001.json", {"id": "DQ.LIC.0001", "contract_version": CV,
        "title": "Dominio público presunto — acuarelas de la ed. Luis Tasso, 1905", "holder": "Dominio público (autor: Salvador Tusell, fl. 1895)",
        "url": "https://bvpb.mcu.es/cervantes/es/consulta/registro.do?id=463832", "consulted_date": "2026-11-05",
        "attribution_required": True, "redistribution": "condicionada",
        "evidence_documental": "Publicada en 1905 (< 1930: DP en EE. UU.); en España sujeto a fecha de muerte de Tusell, sin establecer (residual PEND-09). Uso interno autorizado por el propietario (2026-11-05).",
        "notes": "Redistribución pública prohibida hasta cerrar PEND-09."}),
    w("licenses/DQ.LIC.0002.json", {"id": "DQ.LIC.0002", "contract_version": CV,
        "title": "Derechos propios del proyecto — recreaciones", "holder": "El_Quijote_App (propietario)",
        "url": "", "consulted_date": "2026-11-05", "attribution_required": True, "redistribution": "condicionada",
        "evidence_documental": "Recreaciones IA producidas por el proyecto; rotulación RECREACION_ARTISTICA obligatoria.",
        "notes": "Nunca presentar como fotografía histórica ni retrato real."}),
    w("licenses/DQ.LIC.0003.json", {"id": "DQ.LIC.0003", "contract_version": CV,
        "title": "Texto del EPUB Tusell — uso interno", "holder": "Digitalización Epublibre/Titivillus (obra de Cervantes, DP)",
        "url": "", "consulted_date": "2026-11-05", "attribution_required": True, "redistribution": "prohibida",
        "evidence_documental": "Texto subyacente en dominio público; la edición de referencia definitiva se decide en PEND-01.",
        "notes": "Redistribución del fichero EPUB: prohibida (encargo §6.5.11)."}),
]

# ------------------------------------------------------------------ capítulos y pasajes (posiciones reales)
CH = {
 "DQ.P1.C06": ("1006.xhtml", 6, "Del donoso y grande escrutinio que el cura y el barbero hicieron en la librería de nuestro ingenioso hidalgo"),
 "DQ.P1.C08": ("1008.xhtml", 8, "Del buen suceso que el valeroso don Quijote tuvo en la espantable y jamás imaginada aventura de los molinos de viento, con otros sucesos dignos de felice recordación"),
 "DQ.P1.C09": ("2009.xhtml", 9, "Donde se concluye y da fin á la estupenda batalla que el gallardo vizcaíno y el valiente manchego tuvieron"),
 "DQ.P1.C11": ("2011.xhtml", 11, "De lo que le sucedió á don Quijote con unos cabreros"),
 "DQ.P1.C18": ("1.18.xhtml", 18, "Donde se cuentan las razones que pasó Sancho Panza con su señor don Quijote, con otras aventuras dignas de ser contadas"),
 "DQ.P2.C01": ("2.1.xhtml", 1, "De lo que el cura y el barbero pasaron con don Quijote cerca de su enfermedad"),
 "DQ.P2.C74": ("2.74.xhtml", 74, "De cómo don Quijote cayó malo, y del testamento que hizo, y su muerte"),
}
orden_global = {"DQ.P1.C06": 6, "DQ.P1.C08": 8, "DQ.P1.C09": 9, "DQ.P1.C11": 11,
                "DQ.P1.C18": 18, "DQ.P2.C01": 53, "DQ.P2.C74": 126}
for cid, (fich, num, titulo) in CH.items():
    parte = int(cid[4])
    files["chapters"].append(w("chapters/%s.json" % cid, {
        "id": cid, "contract_version": CV, "edition_id": "DQ.ED.0001", "part": parte,
        "number": num, "title": titulo, "order": orden_global[cid],
        "text_ref": "content://editions/DQ.ED.0001/%s/C%02d" % (parte, num),
        "synopsis": "Capítulo del EPUB Tusell; título según el índice NCX de la edición."}))
for pid, (fich, cita, nota) in CITAS.items():
    segs = pid.split(".")
    if segs[0] == "P2":
        parte, cc, pnum = 2, segs[1][1:], segs[2]      # P2.C01.P0001 -> parte 2, cap 01, P0001
    else:
        parte, cc, pnum = 1, segs[0][1:], segs[1]      # C08.P0001   -> parte 1, cap 08, P0001
    cid = "DQ.P%d.C%s" % (parte, cc)
    passage_id = "DQ.P%d.C%s.%s" % (parte, cc, pnum)
    frag = cita
    start, end = find_pos(fich, frag[:70])
    text_orig = cita
    if pid == "C08.P0001":
        frag = "esto descubrieron treinta"
        idx, _ = find_pos(fich, frag)
        start = max(0, idx - 2)
        end = start + len("En esto descubrieron treinta ó cuarenta molinos de viento que hay en aquel campo")
        text_orig = cita  # la capitular «E» es la primera letra de «En»: no duplicar
    files["passages"].append(w("passages/%s.json" % passage_id, {
        "id": passage_id, "contract_version": CV, "chapter_id": cid,
        "anchor": "EPUB %s; %s" % (fich, nota or "extracto verbatim"),
        "text_original": text_orig,
        "text_indexable": re.sub(r"\s+", " ", re.sub(r"[«»„“”!¡?¿.,;:()—–-]", "", text_orig.lower())),
        "position": {"start_char": start, "end_char": end},
        "sha256": sha_txt(text_orig)}))

# ------------------------------------------------------------------ episodios
for eid, e in episodes_pkg.items():
    files["episodes"].append(w("episodes/%s.json" % eid, {
        "id": eid, "contract_version": CV, "title": e["title"], "chapters": e["chapters"],
        "narrative_order": e["order"], "synopsis": e["synopsis"], "actors": e["actors"],
        "places": e["places"], "passages": e["passages"],
        "spoiler_flags": {"reveals_future_events": e["spoiler"]}}))

# ------------------------------------------------------------------ personas (migración de precarga)
cap_a_ep = {"DQ.P1.C06": "DQ.P1.C06.E01", "DQ.P1.C08": "DQ.P1.C08.E01", "DQ.P1.C09": "DQ.P1.C08.E01",
            "DQ.P1.C11": "DQ.P1.C11.E01", "DQ.P1.C18": "DQ.P1.C18.E01", "DQ.P2.C01": "DQ.P2.C01.E01",
            "DQ.P2.C74": "DQ.P2.C74.E01"}
kinds = {"amo_escudero": "escudero_de", "rival": "rival_de", "autor_ficticio": "narrador_ficticio_de"}
for i, p in enumerate(prec["personas"], 1):
    pid = "DQ.PER.%04d" % i
    rels = [{"person_id": "DQ.PER.%04d" % int(r["target_id"][-4:]), "kind": kinds.get(r["kind"], r["kind"])}
            for r in p.get("relations", [])]
    aps = sorted({cap_a_ep[c] for c in p.get("appearance_chapter_ids", []) if c in cap_a_ep})
    files["persons"].append(w("persons/%s.json" % pid, {
        "id": pid, "contract_version": CV, "class": p["person_class"],
        "canonical_name": p["name"], "variants": p.get("variants", []),
        "relations": rels, "appearances": aps, "certainty": p["certainty"],
        "review": {"state": p["review_state"], "reviewer_role": None, "date": "2026-11-05"}}))

# ------------------------------------------------------------------ lugares (migración)
# geometry con precision_m grande = incertidumbre honesta (encargo §4.5)
GEO = {
    "DQ.LOC.0001": ([-3.5, 39.2], 60000, "Centro aproximado de la comarca manchega; el pueblo del hidalgo queda sin nombre en el texto."),
    "DQ.LOC.0002": ([-2.95, 38.70], 15000, "Comarca histórica del Campo de Montiel."),
    "DQ.LOC.0003": ([-3.30, 39.68], 5000, "El Toboso actual (Toledo); identificación moderna admitida."),
    "DQ.LOC.0004": ([-3.61, 39.46], 20000, "Asociación patrimonial con los molinos de Consuegra; el texto no da topónimo."),
    "DQ.LOC.0005": ([80.7, 7.9], 500000, "Taprobana clásica (Ceilán) usada en clave paródica; no localizable como lugar de la novela."),
}
for i, l in enumerate(prec["lugares"], 1):
    lid = "DQ.LOC.%04d" % i
    coords, prec_m, geo_note = GEO[lid]
    status = "explicito" if l["status"] == "explicito" else "probable"
    files["places"].append(w("places/%s.json" % lid, {
        "id": lid, "contract_version": CV, "kind": "lugar",
        "literary_name": l["literary_name"], "modern_name": l["modern_name"],
        "variants": l.get("variants", []),
        "geometry": {"type": "Point", "coordinates": coords, "crs": "EPSG:4326",
                      "precision_m": prec_m},
        "status": status,
        "presented_as": "hecho" if status == "explicito" else "hipotesis",
        "certainty": l["certainty"], "chapters": l.get("chapter_ids", []),
        "sources": ["DQ.SRC.0001"],
        "attribution_note": (l.get("description", "") + " " + geo_note).strip(),
        "review": {"state": l["review_state"], "reviewer_role": None, "date": "2026-11-05"}}))

# ------------------------------------------------------------------ medios reales (acuarelas + recreaciones)
def media_acuarela(num):
    r = ilus_by_name["%03d.jpg" % num]
    mid = "DQ.MA.%06d" % num
    spoiler = "revelador" if num in (26, 29, 57) else ("leve" if num in (20, 21, 27, 58, 170, 371, 372) else "ninguno")
    files["media_assets"].append(w("media_assets/%s.json" % mid, {
        "id": mid, "contract_version": CV, "function": "museo", "media_class": "ACUARELA_HISTORICA",
        "logical_uri": "assets://ilustraciones_tusell/acuarelas/%03d.jpg" % num,
        "derivatives": [{"variant": "original", "format": "jpg", "width": r["ancho"], "height": r["alto"],
                          "size_bytes": r["bytes"], "sha256": "sha256:" + r["sha256"]}],
        "alt": (r["referencias"][0]["alt"] if r["referencias"] else "Acuarela Tusell"),
        "source_id": "DQ.SRC.0001", "license_id": "DQ.LIC.0001",
        "author": "Salvador Tusell (sobre composición de Gustave Doré)", "date": "1905",
        "allowed_uses": ["uso_personal_app", "almacenamiento_repo_git"],
        "license_status": "verificada",
        "provenance": "EPUB Epublibre/Titivillus 2024; ed. Barcelona, Luis Tasso, 1905 (BVPB registro 463832).",
        "review": {"state": "documentada", "reviewer_role": "editorial", "date": "2026-11-05"},
        "spoiler_level": spoiler}))

def media_escena(cid_escena):
    r = escn_by_id[cid_escena]
    mid = "DQ.MA.%s" % cid_escena.split(".")[-1]
    ruta = os.path.join(REPO, r["relative_path"].replace("/", os.sep))
    files["media_assets"].append(w("media_assets/%s.json" % mid, {
        "id": mid, "contract_version": CV,
        "function": "pre_pregunta" if r["phase"] == "pre" else "post_desenlace",
        "media_class": "RECREACION_IA",
        "logical_uri": "assets://" + r["relative_path"].replace("assets/", ""),
        "derivatives": [{"variant": "original", "format": "webp", "width": r["width_px"],
                          "height": r["height_px"], "size_bytes": os.path.getsize(ruta),
                          "sha256": "sha256:" + r["sha256"]}],
        "alt": r.get("alt_es", r.get("title_es", "Recreación del proyecto")),
        "source_id": "DQ.SRC.0003", "license_id": "DQ.LIC.0002",
        "author": "Equipo de arte El_Quijote_App (recreación IA)", "date": "2026-11-05",
        "allowed_uses": ["uso_personal_app", "almacenamiento_repo_git"],
        "license_status": "verificada",
        "provenance": "Recreación IA del proyecto; rotulada RECREACION_ARTISTICA (nunca evidencia histórica).",
        "review": {"state": "borrador", "reviewer_role": None, "date": None},
        "spoiler_level": "ninguno" if r["phase"] == "pre" else "leve"}))

for n in (1, 20, 21, 26, 27, 29, 34, 35, 36, 56, 57, 58, 170, 371, 372, 373):
    media_acuarela(n)
for cid_e in ("DQ.MED.900005", "DQ.MED.900006", "DQ.MED.900007", "DQ.MED.900008", "DQ.MED.900011"):
    media_escena(cid_e)

# ------------------------------------------------------------------ descubrimientos (migración)
def ep_de_pasajes(ps):
    caps = [p for p in ps if p]
    if caps:
        p = caps[0]
        parte = 2 if p.startswith("DQ.P2") else 1
        return "DQ.P%d.C%s.E01" % (parte, p[7:9])
    return "DQ.P1.C08.E01"

map_speaker = {"Sancho Panza": "DQ.PER.0002", "don Quijote": "DQ.PER.0001",
               "el cura": "DQ.PER.0005", "narrador": "DQ.PER.0010",
               "Sanson": "DQ.PER.0009"}
map_media = lambda m: "DQ.MA.%06d" % int(re.sub(r"\D", "", m)) if m else None
map_pass = lambda ps: ["DQ.%s.C%s.P%04d" % (p[3:5], p[7:9], int(p[-3:])) for p in ps if p]
map_kind = {"humor": "humor_escena", "curiosidad": "curiosidad_recepcion", "recepcion": "curiosidad_recepcion"}
for i, d in enumerate(prec["descubrimientos"], 1):
    did = "DQ.DIS.%06d" % i
    spk = None
    if d.get("speaker"):
        clave = d["speaker"].split(" y ")[0].split(" a ")[0].split(" (")[0].strip()
        pid_sp = None
        for k, v in map_speaker.items():
            if k.lower() in clave.lower():
                pid_sp = v
                break
        spk = {"person_id": pid_sp or "DQ.PER.0010", "label": d["speaker"]}
    elif d["kind"] in ("curiosidad", "recepcion"):
        spk = {"person_id": "DQ.PER.0010", "label": "Cuaderno del investigador (ficha editorial del proyecto)"}
    assets = [m for m in (map_media(x) for x in d.get("media_ids", [])) if m]
    files["discoveries"].append(w("discoveries/%s.json" % did, {
        "id": did, "contract_version": CV, "kind": map_kind.get(d["kind"], d["kind"]),
        "content": d["content"], "speaker": spk, "context": d.get("context", ""),
        "passages": map_pass(d.get("passage_ids", [])),
        "appearance": {"episode_id": ep_de_pasajes(d.get("passage_ids", [])),
                        "moment": "desenlace" if d.get("condition_display") == "tras_episodio" else "tras_respuesta",
                        "frequency_hint": "ocasional"},
        "asset_ids": assets, "certainty": d["certainty"],
        "review": {"state": d["review_state"], "reviewer_role": None, "date": "2026-11-05"}}))

# ------------------------------------------------------------------ preguntas I.8 (nuevas, formato canónico)
def Q(qid, episode, caps, passages, prompt, inter, rationale, evid, cognitive, diff, pre_media, tags, semkey, hotspot_media=None):
    vr = {"pre_image_must_not_reveal": True}
    if pre_media: vr["pre_image_media_id"] = pre_media
    if hotspot_media: vr["hotspot_media_id"] = hotspot_media
    files["questions"].append(w("questions/%s.json" % qid, {
        "id": qid, "contract_version": CV, "episode_id": episode,
        "chapter_ids": caps, "passage_ids": passages, "prompt": prompt,
        "interaction": inter, "rationale": rationale, "evidence": evid,
        "certainty": "TEXTO_EXPLICITO", "cognitive_type": cognitive, "difficulty": diff,
        "spoiler_policy": {"safe_after_episodes": ["DQ.P1.C08.E01"]},
        "visual_requirements": vr, "language": "es", "tags": tags,
        "review": {"state": "borrador", "reviewer_role": None, "date": None},
        "semantic_key": semkey}))

EP8 = "DQ.P1.C08.E01"; CAP8 = ["DQ.P1.C08"]
PRE = "DQ.MA.900005"; PRE_11000 = "DQ.MA.900006"
def ev(pid, quote): return [{"kind": "cita_literal", "passage_id": "DQ.P1.C08." + pid, "quote": quote}]
def O(q, n, label, expl=None):
    o = {"id": "%s.O%02d" % (q, n), "label": label}
    if expl: o["explanation"] = expl
    return o

Q("DQ.Q.000101", EP8, CAP8, ["DQ.P1.C08.P0003"],
  "¿Qué son, según Sancho, los «brazos» de los supuestos gigantes que avistan?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000101", 1, "Las aspas, que volteadas del viento hacen andar la piedra del molino"),
               O("DQ.Q.000101", 2, "Brazos de gigantes enterrados siglos atrás"),
               O("DQ.Q.000101", 3, "Mangos de antiguas máquinas de trapo")],
   "correct_option_ids": ["DQ.Q.000101.O01"], "shuffle_options": True},
  "Sancho corrige la percepción de su amo con una explicación técnica del molino (I, 8).",
  ev("P0003", "lo que en ellos parecen brazos son las aspas, que, volteadas del viento, hacen andar la piedra del molino"),
  "hecho", 1, PRE, ["piloto", "molinos"], "molinos sancho aspas viento piedra molino")

Q("DQ.Q.000102", EP8, CAP8, ["DQ.P1.C08.P0001"],
  "¿Cuántos molinos de viento descubre el narrador en aquel campo?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000102", 1, "Treinta ó cuarenta"),
               O("DQ.Q.000102", 2, "Treinta ó pocos más"),
               O("DQ.Q.000102", 3, "Veinte y cinco")],
   "correct_option_ids": ["DQ.Q.000102.O01"], "shuffle_options": True},
  "El narrador dice «treinta ó cuarenta molinos»; la cifra «treinta ó pocos más» es la de gigantes según don Quijote: dos cómputos distintos.",
  ev("P0001", "En esto descubrieron treinta ó cuarenta molinos de viento que hay en aquel campo"),
  "hecho", 2, PRE, ["piloto", "molinos"], "molinos cifra treinta cuarenta narrador")

Q("DQ.Q.000103", EP8, CAP8, ["DQ.P1.C08.P0002"],
  "¿Cómo justifica don Quijote el botín que sacará de la batalla contra los «gigantes»?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000103", 1, "Porque es «gran servicio de Dios quitar tan mala simiente» y enriquecer con sus despojos"),
               O("DQ.Q.000103", 2, "Porque necesita dinero para pagar un escudero"),
               O("DQ.Q.000103", 3, "Porque se lo prometió así a Dulcinea")],
   "correct_option_ids": ["DQ.Q.000103.O01"], "shuffle_options": True},
  "La motivación declarada combina el botín y el servicio religioso, en clave paródica (I, 8).",
  ev("P0002", "quitarles á todos las vidas, con cuyos despojos comenzaremos á enriquecer; que ésta es buena guerra, y es gran servicio de Dios quitar tan mala simiente"),
  "actitud_reaccion", 2, PRE, ["piloto", "molinos"], "molinos motivacion botin servicio dios")

Q("DQ.Q.000104", EP8, CAP8, ["DQ.P1.C08.P0004"],
  "¿Verdadero o falso: don Quijote invoca al gigante Briareo al ver moverse las aspas?",
  {"type": "true_false",
   "options": [O("DQ.Q.000104", 1, "Verdadero"), O("DQ.Q.000104", 2, "Falso")],
   "correct_option_ids": ["DQ.Q.000104.O01"], "shuffle_options": False},
  "«Pues aunque mováis más brazos que los del gigante Briareo, me lo habéis de pagar»: alusión clásica en plena embestida.",
  ev("P0004", "aunque mováis más brazos que los del gigante Briareo, me lo habéis de pagar"),
  "cita", 1, PRE, ["piloto", "molinos"], "molinos briareo cita clasica aspas")

Q("DQ.Q.000105", EP8, CAP8, ["DQ.P1.C08.P0005"],
  "¿Por qué cae don Quijote en su embestida contra el molino?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000105", 1, "El viento vuelve el aspa tras su lanzada y arrastra caballo y caballero, rompiendo la lanza"),
               O("DQ.Q.000105", 2, "Rocinante se asusta y se desboca hacia el campo"),
               O("DQ.Q.000105", 3, "Sancho lo desvía gritando en el último instante")],
   "correct_option_ids": ["DQ.Q.000105.O01"], "shuffle_options": True},
  "Causa mecánica y narrada: la lanzada en el aspa, el viento, la lanza hecha pedazos (I, 8).",
  ev("P0005", "dándole una lanzada en el aspa, la volvió el viento con tanta furia, que hizo la lanza pedazos, llevándose tras sí al caballo y al caballero"),
  "causa_consecuencia", 1, PRE, ["piloto", "molinos"], "molinos causa caida aspa viento lanza")

Q("DQ.Q.000106", EP8, CAP8, ["DQ.P1.C08.P0005", "DQ.P1.C08.P0006"],
  "¿Cuáles de estos sucesos ocurren en este capítulo? (puede haber varias correctas)",
  {"type": "multi_choice", "multi_declared": True,
   "options": [O("DQ.Q.000106", 1, "La lanza queda hecha pedazos tras la lanzada en el aspa"),
               O("DQ.Q.000106", 2, "Sancho acude a socorrerle «á todo el correr de su asno»"),
               O("DQ.Q.000106", 3, "Don Quijote queda tendido sin poder moverse y culpa a los encantadores"),
               O("DQ.Q.000106", 4, "Sancho pierde también él el conocimiento junto al rucio")],
   "correct_option_ids": ["DQ.Q.000106.O01", "DQ.Q.000106.O02"], "shuffle_options": True},
  "Los dos primeros sucesos constan en I, 8; la mención de encantadores sobre los molinos y la caída de Sancho no pertenecen a este episodio.",
  ev("P0006", "Acudió Sancho Panza á socorrerle á todo el correr de su asno"),
  "secuencia", 2, PRE, ["piloto", "molinos"], "molinos sucesos lanza pedazos sancho acude")

Q("DQ.Q.000107", EP8, CAP8, ["DQ.P1.C08.P0007", "DQ.P1.C08.P0008", "DQ.P1.C08.P0009"],
  "¿A qué identifica equivocadamente don Quijote en la segunda parte del capítulo? (varias)",
  {"type": "multi_choice", "multi_declared": True,
   "options": [O("DQ.Q.000107", 1, "Los molinos de viento, como desaforados gigantes"),
               O("DQ.Q.000107", 2, "Los frailes de San Benito, como encantadores con una princesa hurtada"),
               O("DQ.Q.000107", 3, "Las dos mulas del séquito, como dromedarios"),
               O("DQ.Q.000107", 4, "El coche, como carroza fúnebre")],
   "correct_option_ids": ["DQ.Q.000107.O01", "DQ.Q.000107.O02"], "shuffle_options": True},
  "La broma de los «dromedarios» es del narrador («no eran más pequeñas dos mulas en que venían»), no identificación de don Quijote; la carroza fúnebre no aparece.",
  ev("P0007", "dos frailes de la orden de San Benito, caballeros sobre dos dromedarios; que no eran más pequeñas dos mulas en que venían"),
  "humor", 3, PRE, ["piloto", "molinos"], "molinos identificaciones frailes encantadores princesa dromedarios")

Q("DQ.Q.000108", EP8, CAP8, ["DQ.P1.C08.P0005", "DQ.P1.C08.P0007", "DQ.P1.C08.P0011"],
  "Ordena cronológicamente los lances de este capítulo.",
  {"type": "ordering",
   "options": [O("DQ.Q.000108", 1, "La embestida y caída en el molino"),
               O("DQ.Q.000108", 2, "El socorro de Sancho al correr de su asno"),
               O("DQ.Q.000108", 3, "El avistamiento de los frailes de San Benito"),
               O("DQ.Q.000108", 4, "El desafío del escudero vizcaíno")],
   "correct_order": ["DQ.Q.000108.O01", "DQ.Q.000108.O02", "DQ.Q.000108.O03", "DQ.Q.000108.O04"],
   "shuffle_options": False},
  "Secuencia canónica: caída, socorro, frailes «estando en estas razones», vizcaíno.",
  ev("P0007", "Estando en estas razones, asomaron por el camino dos frailes de la orden de San Benito"),
  "secuencia", 2, PRE, ["piloto", "molinos"], "molinos orden caida socorro frailes vizcaino")

Q("DQ.Q.000109", EP8, CAP8, ["DQ.P1.C08.P0003", "DQ.P1.C08.P0008", "DQ.P1.C08.P0010"],
  "Relaciona lo que don Quijote percibe con lo que realmente es.",
  {"type": "matching",
   "options": [O("DQ.Q.000109", 1, "Desaforados gigantes"),
               O("DQ.Q.000109", 2, "Encantadores que llevan hurtada una princesa"),
               O("DQ.Q.000109", 3, "Molinos de viento"),
               O("DQ.Q.000109", 4, "Dos frailes de San Benito"),
               O("DQ.Q.000109", 5, "Una señora vizcaína que va a Sevilla"),
               O("DQ.Q.000109", 6, "La princesa hurtada")],
   "pairs": [{"left": "DQ.Q.000109.O01", "right": "DQ.Q.000109.O03"},
              {"left": "DQ.Q.000109.O02", "right": "DQ.Q.000109.O04"},
              {"left": "DQ.Q.000109.O06", "right": "DQ.Q.000109.O05"}],
   "shuffle_options": False},
  "Tres percepciones desviadas y una broma del narrador (los «dromedarios») fuera del emparejamiento.",
  ev("P0008", "algunos encantadores, que llevan hurtada alguna princesa en aquel coche"),
  "humor", 2, PRE, ["piloto", "molinos"], "molinos emparejamiento percepcion realidad")

Q("DQ.Q.000110", EP8, CAP8, ["DQ.P1.C08.P0011"],
  "¿Cómo reacciona el escudero vizcaíno ante la intención de don Quijote de no dejar pasar el coche?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000110", 1, "Le coge de la lanza y le insulta «en mala lengua castellana y peor vizcaína»"),
               O("DQ.Q.000110", 2, "Pide auxilio a los frailes y huye con el coche"),
               O("DQ.Q.000110", 3, "Se apearía cortésmente y le pide disculpas en nombre de su señora")],
   "correct_option_ids": ["DQ.Q.000110.O01"], "shuffle_options": True},
  "La agresión verbal del vizcaíno abre el combate que concluye en el capítulo siguiente.",
  ev("P0011", "asiéndole de la lanza, le dijo en mala lengua castellana y peor vizcaína"),
  "dialogo", 2, PRE, ["piloto", "molinos"], "vizcaino reaccion lanza insulto")

Q("DQ.Q.000111", EP8, CAP8, ["DQ.P1.C08.P0010"],
  "¿Cómo se presenta don Quijote ante la supuesta princesa liberada?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000111", 1, "«Don Quijote de la Mancha, caballero andante y aventurero, y cautivo de la sin par y hermosa doña Dulcinea del Toboso»"),
               O("DQ.Q.000111", 2, "«El Caballero de los Leones, siervo de la princesa Micomicona»"),
               O("DQ.Q.000111", 3, "«Alonso Quijano el Bueno, hidalgo de esta Mancha»")],
   "correct_option_ids": ["DQ.Q.000111.O01"], "shuffle_options": True},
  "Autonominación canónica en I, 8; los otros dos nombres pertenecen a momentos distintos de la obra.",
  ev("P0010", "sabed que yo me llamo don Quijote de la Mancha, caballero andante y aventurero, y cautivo de la sin par y hermosa doña Dulcinea del Toboso"),
  "cita", 2, PRE, ["piloto", "molinos"], "molinos presentacion nombre dulcinea cautivo")

Q("DQ.Q.000112", EP8, CAP8, ["DQ.P1.C08.P0010"],
  "Sobre la acuarela de la embestida, señale la zona donde el aspa arrastra a caballo y caballero.",
  {"type": "hotspot",
   "options": [O("DQ.Q.000112", 1, "El aspa que arrastra a Rocinante y a su amo"),
               O("DQ.Q.000112", 2, "Los molinos del fondo"),
               O("DQ.Q.000112", 3, "Sancho y el rucio observando")],
   "correct_option_ids": ["DQ.Q.000112.O01"],
   "hotspot_area": {"x": 0.30, "y": 0.22, "w": 0.45, "h": 0.50},
   "shuffle_options": False},
  "Composición verificada visualmente: caballo y caballero arrastrados ocupan el centro; Sancho y el rucio, la derecha.",
  ev("P0005", "llevándose tras sí al caballo y al caballero, que fué rodando muy mal trecho por el campo"),
  "lugar", 1, None, ["piloto", "molinos"], "molinos hotspot aspa arrastra composicion",
  hotspot_media="DQ.MA.000026")

# ------------------------------------------------------------------ manifiesto del paquete
manifest = {
    "package_id": "piloto-editorial-i8",
    "contract_version": CV,
    "catalog_version": "0.1.0",
    "created": "2026-11-05",
    "files": files,
    "counts": {"questions": len(files["questions"]), "episodes": len(files["episodes"]),
                "media_assets": len(files["media_assets"]), "discoveries": len(files["discoveries"])},
}
files.setdefault("scenes", [])
w("package.json", manifest)
print("PAQUETE OK:", {k: len(v) for k, v in files.items()}, "| media sintetizados incluidos")
