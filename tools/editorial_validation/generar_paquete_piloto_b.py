#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FASE B del paquete piloto: bancos de preguntas de I.6, I.11, I.18, II.1 y II.74
(en formato canónico v0.2.0). Modo CONTENIDOS.
Uso: python -I generar_paquete_piloto_b.py <raiz_repo>
Añade pasajes y preguntas al paquete existente content/piloto/ y actualiza el manifiesto.
Muestra de pipeline de FASE 0: NO es el piloto completo de FASE 1.
"""
import sys, os, re, html, json, hashlib

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
TXT = os.path.abspath(os.path.join(REPO, "..", "..", "data", "epub_extract", "OEBPS", "Text"))
PKG = os.path.join(REPO, "content", "piloto")
CV = "1.0.0"

def sha_txt(s):
    return "sha256:" + hashlib.sha256(s.encode("utf-8")).hexdigest()

def plain(fich):
    raw = open(os.path.join(TXT, fich), encoding="utf-8", errors="replace").read()
    return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", raw))).strip()

FICH = {"DQ.P1.C06": "1006.xhtml", "DQ.P1.C11": "2011.xhtml", "DQ.P1.C18": "1.18.xhtml",
        "DQ.P2.C01": "2.1.xhtml", "DQ.P2.C74": "2.74.xhtml"}
_textos = {}
def pos(cid, frag):
    if cid not in _textos:
        _textos[cid] = plain(FICH[cid])
    i = _textos[cid].find(frag[:60])
    return i, i + len(frag) if i >= 0 else (0, 0)

# ------------------------------------------------------------- pasajes nuevos (verbatim)
NUEVOS_PASAJES = [
 ("DQ.P1.C06.P0003", "DQ.P1.C06", "como á único en su arte, se debe perdonar. —Así es verdad, dijo el cura, y por esa razón se le otorga la vida por ahora"),
 ("DQ.P1.C06.P0004", "DQ.P1.C06", "Pues, en verdad, dijo el cura, que no le ha de valer al hijo la bondad del padre: tomad, señora ama, abrid esa ventana, y echalde al corral"),
 ("DQ.P1.C06.P0005", "DQ.P1.C06", "Esa Oliva se haga luego rajas y se queme, que aun no queden della las cenizas; y esa Palma de Ingalaterra se guarde y se conserve como á cosa única"),
 ("DQ.P1.C06.P0006", "DQ.P1.C06", "que á trueco de quemar á la reina Pintiquinestra, y al pastor Darinel y á sus églogas, y á las endiabladas y revueltas razones de su autor, quemara con ellos al padre que me engendró, si anduviera en figura de caballero andante"),
 ("DQ.P1.C06.P0007", "DQ.P1.C06", "propone algo y no concluye nada"),
 ("DQ.P1.C11.P0003", "DQ.P1.C11", "tendieron sobre las zaleas gran cantidad de bellotas avellanadas, y juntamente pusieron un medio queso, más duro que si fuera hecho de argamasa"),
 ("DQ.P1.C11.P0004", "DQ.P1.C11", "alzar la mano, y alcanzarle de las robustas encinas, que liberalmente les estaban convidando con su dulce y sazonado fruto"),
 ("DQ.P1.C11.P0005", "DQ.P1.C11", "La justicia se estaba en sus propios términos, sin que la osasen turbar ni ofender los del favor y los del interés, que tanto ahora la menoscaban, turban y persiguen"),
 ("DQ.P1.C11.P0006", "DQ.P1.C11", "La ley del encaje aun no se había sentado en el entendimiento del juez, porque entonces no había qué juzgar"),
 ("DQ.P1.C18.P0003", "DQ.P1.C18", "el poderoso duque de Nerbia, Espartafilardo del Bosque, que trae por empresa en el escudo una esparraguera, con una letra en castellano que dice así: Rastrea mi suerte"),
 ("DQ.P1.C18.P0004", "DQ.P1.C18", "Llegáronse á él los pastores y creyeron que le habían muerto y, así, con mucha priesa recogieron su ganado y cargaron de las reses muertas, que pasaban de siete, y sin averiguar otra cosa se fueron"),
 ("DQ.P1.C18.P0005", "DQ.P1.C18", "arrojó de sí, más recio que una escopeta, cuanto dentro tenía y dió con todo ello en las barbas del compasivo escudero"),
 ("DQ.P2.C01.P0002", "DQ.P2.C01", "fué una doncella distraída, andariega y algo antojadiza, y tan lleno dejó el mundo de sus impertinencias como de la fama de su hermosura: despreció mil señores, mil valientes y mil discretos, y contentóse con un pajecillo barbilucio"),
 ("DQ.P2.C01.P0003", "DQ.P2.C01", "oyeron que la ama y la sobrina, que ya habían dejado la conversación, daban grandes voces en el patio, y acudieron todos al ruido"),
 ("DQ.P2.C74.P0004", "DQ.P2.C74", "se le arraigó una calentura, que le tuvo seis días en la cama"),
 ("DQ.P2.C74.P0005", "DQ.P2.C74", "déjense burlas aparte, y tráiganme un confesor que me confiese y un escribano que haga mi testamento; que en tales trances como éste no se ha de burlar el hombre con el alma"),
 ("DQ.P2.C74.P0006", "DQ.P2.C74", "no le quiera llevar, contra todos los fueros de la muerte, á Castilla la Vieja, haciéndole salir de la fuesa donde real y verdaderamente yace, tendido de largo á largo, imposibilitado de hacer tercera parte y salida nueva"),
]
manifest = json.load(open(os.path.join(PKG, "package.json"), encoding="utf-8"))
for pid, cid, cita in NUEVOS_PASAJES:
    start, end = pos(cid, cita)
    text = cita
    files = manifest["files"]
    files["passages"].append("passages/%s.json" % pid)
    with open(os.path.join(PKG, "passages", "%s.json" % pid), "w", encoding="utf-8") as f:
        json.dump({"id": pid, "contract_version": CV, "chapter_id": cid,
                    "anchor": "EPUB %s; extracto verbatim" % FICH[cid],
                    "text_original": text,
                    "text_indexable": re.sub(r"\s+", " ", re.sub(r"[«»„“”!¡?¿.,;:()—–-]", "", text.lower())),
                    "position": {"start_char": start, "end_char": end},
                    "sha256": sha_txt(text)}, f, ensure_ascii=False, indent=1)

# medio nuevo: recreación pre de I.6 (segunda batería)
escn = json.load(open(os.path.join(REPO, "assets", "scenes", "manifest.json"), encoding="utf-8"))
r = next(i for i in escn["images"] if i["candidate_media_id"] == "DQ.MED.900013")
ruta = os.path.join(REPO, r["relative_path"].replace("/", os.sep))
mid = "DQ.MA.900013"
with open(os.path.join(PKG, "media_assets", "%s.json" % mid), "w", encoding="utf-8") as f:
    json.dump({"id": mid, "contract_version": CV, "function": "pre_pregunta", "media_class": "RECREACION_IA",
                "logical_uri": "assets://" + r["relative_path"].replace("assets/", ""),
                "derivatives": [{"variant": "original", "format": "webp", "width": r["width_px"],
                                  "height": r["height_px"], "size_bytes": os.path.getsize(ruta),
                                  "sha256": "sha256:" + r["sha256"]}],
                "alt": r.get("alt_es", "Recreación del proyecto"),
                "source_id": "DQ.SRC.0003", "license_id": "DQ.LIC.0002",
                "author": "Equipo de arte El_Quijote_App (recreación IA)", "date": "2026-11-05",
                "allowed_uses": ["uso_personal_app", "almacenamiento_repo_git"],
                "license_status": "verificada",
                "provenance": "Recreación IA del proyecto; rotulada RECREACION_ARTISTICA.",
                "review": {"state": "borrador", "reviewer_role": None, "date": None},
                "spoiler_level": "ninguno"}, f, ensure_ascii=False, indent=1)
files["media_assets"].append("media_assets/%s.json" % mid)

# ------------------------------------------------------------- bancos de preguntas
def Q(qid, episode, caps, passages, prompt, inter, rationale, evid, cognitive, diff, tags, semkey, pre=None, hotspot=None):
    vr = {"pre_image_must_not_reveal": True}
    if pre: vr["pre_image_media_id"] = pre
    if hotspot: vr["hotspot_media_id"] = hotspot
    obj = {"id": qid, "contract_version": CV, "episode_id": episode, "chapter_ids": caps,
            "passage_ids": passages, "prompt": prompt, "interaction": inter,
            "rationale": rationale, "evidence": [{"kind": "cita_literal", "passage_id": p, "quote": q}
                                                  for p, q in evid],
            "certainty": "TEXTO_EXPLICITO", "cognitive_type": cognitive, "difficulty": diff,
            "spoiler_policy": {"safe_after_episodes": [episode]},
            "visual_requirements": vr, "language": "es", "tags": tags,
            "review": {"state": "borrador", "reviewer_role": None, "date": None},
            "semantic_key": semkey}
    with open(os.path.join(PKG, "questions", "%s.json" % qid), "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
    files["questions"].append("questions/%s.json" % qid)

def O(q, n, label, expl=None):
    o = {"id": "%s.O%02d" % (q, n), "label": label}
    if expl: o["explanation"] = expl
    return o

P6 = "DQ.P1.C06"; E6 = "DQ.P1.C06.E01"; PRE6 = "DQ.MA.900013"
P11 = "DQ.P1.C11"; E11 = "DQ.P1.C11.E01"; PRE11 = "DQ.MA.900007"
P18 = "DQ.P1.C18"; E18 = "DQ.P1.C18.E01"; PRE18 = "DQ.MA.900008"
P2A = "DQ.P2.C01"; E2A = "DQ.P2.C01.E01"
P2F = "DQ.P2.C74"; E2F = "DQ.P2.C74.E01"

# ---- I.6
Q("DQ.Q.000201", E6, [P6], [P6+".P0002" if False else "DQ.P1.C06.P0002"],
  "¿Quiénes realizan el escrutinio de la librería mientras el dueño duerme?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000201", 1, "El cura y el barbero, con el ama y la sobrina como ejecutoras"),
               O("DQ.Q.000201", 2, "El ama y la sobrina a solas, sin clérigo presente"),
               O("DQ.Q.000201", 3, "El bachiller Sansón Carrasco y el cura")],
   "correct_option_ids": ["DQ.Q.000201.O01"], "shuffle_options": True},
  "El escrutinio lo dirigen el cura y el barbero; el dueño duerme durante la operación (I, 6).",
  [("DQ.P1.C06.P0002", "según he oído decir, este libro fué el primero de caballerías que se imprimió en España")],
  "hecho", 1, ["piloto", "escrutinio"], "escrutinio curabarbero duerme libreria", pre=PRE6)

Q("DQ.Q.000202", E6, [P6], ["DQ.P1.C06.P0003"],
  "¿Qué libro salva el cura «por esa razón» y cuál es esa razón?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000202", 1, "Amadís de Gaula, porque «como á único en su arte, se debe perdonar»"),
               O("DQ.Q.000202", 2, "Tirante el Blanco, porque es el más antiguo de todos"),
               O("DQ.Q.000202", 3, "Palmerín de Ingalaterra, por su prosa clara")],
   "correct_option_ids": ["DQ.Q.000202.O01"], "shuffle_options": True},
  "El barbero pide perdón para Amadís como único en su arte y el cura le otorga «la vida por ahora» (I, 6).",
  [("DQ.P1.C06.P0003", "como á único en su arte, se debe perdonar. —Así es verdad, dijo el cura, y por esa razón se le otorga la vida por ahora")],
  "actitud_reaccion", 2, ["piloto", "escrutinio"], "escrutinio amadis perdonado unico arte", pre=PRE6)

Q("DQ.Q.000203", E6, [P6], ["DQ.P1.C06.P0004"],
  "¿Qué veredicto recibe Las Sergas de Esplandián, hijo de Amadís?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000203", 1, "Al corral: «no le ha de valer al hijo la bondad del padre»"),
               O("DQ.Q.000203", 2, "Se guarda por ser continuación de un libro perdonado"),
               O("DQ.Q.000203", 3, "Se reparte entre el cura y el barbero como curiosidad")],
   "correct_option_ids": ["DQ.Q.000203.O01"], "shuffle_options": True},
  "El cura niega que la bondad del padre ampare al hijo y manda echarlo al corral (I, 6).",
  [("DQ.P1.C06.P0004", "no le ha de valer al hijo la bondad del padre: tomad, señora ama, abrid esa ventana, y echalde al corral")],
  "causa_consecuencia", 2, ["piloto", "escrutinio"], "escrutinio esplandian hijo padre corral", pre=PRE6)

Q("DQ.Q.000204", E6, [P6], ["DQ.P1.C06.P0005", "DQ.P1.C06.P0003"],
  "Relaciona cada libro del escrutinio con el veredicto que le da el cura.",
  {"type": "matching",
   "options": [O("DQ.Q.000204", 1, "Tirante el Blanco"),
               O("DQ.Q.000204", 2, "Amadís de Gaula"),
               O("DQ.Q.000204", 3, "Palmerín de Oliva"),
               O("DQ.Q.000204", 4, "Palmerín de Ingalaterra"),
               O("DQ.Q.000204", 5, "«tesoro de contento y una mina de pasatiempos»"),
               O("DQ.Q.000204", 6, "«vida por ahora», único en su arte"),
               O("DQ.Q.000204", 7, "«se haga luego rajas y se queme»"),
               O("DQ.Q.000204", 8, "«se guarde como á cosa única»")],
   "pairs": [{"left": "DQ.Q.000204.O01", "right": "DQ.Q.000204.O05"},
              {"left": "DQ.Q.000204.O02", "right": "DQ.Q.000204.O06"},
              {"left": "DQ.Q.000204.O03", "right": "DQ.Q.000204.O07"},
              {"left": "DQ.Q.000204.O04", "right": "DQ.Q.000204.O08"}],
   "shuffle_options": False},
  "Cuatro veredictos textuales del escrutinio: dos salvamentos con elogio, una condena y una condena pareada.",
  [("DQ.P1.C06.P0005", "Esa Oliva se haga luego rajas y se queme... y esa Palma de Ingalaterra se guarde y se conserve como á cosa única")],
  "hecho", 2, ["piloto", "escrutinio"], "escrutinio emparejamiento veredictos palmerines", pre=PRE6)

Q("DQ.Q.000205", E6, [P6], ["DQ.P1.C06.P0007"],
  "¿Verdadero o falso: el cura salva La Galatea elogiando su desenlace?",
  {"type": "true_false",
   "options": [O("DQ.Q.000205", 1, "Verdadero"), O("DQ.Q.000205", 2, "Falso")],
   "correct_option_ids": ["DQ.Q.000205.O02"], "shuffle_options": False},
  "El veredicto es doblemente irónico: «propone algo y no concluye nada», y el salvamento viene de la amistad con el autor.",
  [("DQ.P1.C06.P0007", "propone algo y no concluye nada")],
  "humor", 2, ["piloto", "escrutinio"], "escrutinio galatea salva conclusion ironia", pre=PRE6)

Q("DQ.Q.000206", E6, [P6], ["DQ.P1.C06.P0006"],
  "¿Quiénes secundan llevar los libros al corral? (varias)",
  {"type": "multi_choice", "multi_declared": True,
   "options": [O("DQ.Q.000206", 1, "El barbero: «Dese parecer soy yo»"),
               O("DQ.Q.000206", 2, "La sobrina: «Y aun yo»"),
               O("DQ.Q.000206", 3, "El ama: «vengan, y al corral con ellos»"),
               O("DQ.Q.000206", 4, "Don Quijote, desde su lecho")],
   "correct_option_ids": ["DQ.Q.000206.O01", "DQ.Q.000206.O02", "DQ.Q.000206.O03"],
   "shuffle_options": True},
  "Los tres secundan la condena; don Quijote duerme durante todo el escrutinio.",
  [("DQ.P1.C06.P0006", "—Dese parecer soy yo, dijo el barbero. —Y aun yo, añadió la sobrina. —Pues así es, dijo el ama, vengan, y al corral con ellos")],
  "dialogo", 2, ["piloto", "escrutinio"], "escrutinio secundan barbero sobrina ama corral", pre=PRE6)

Q("DQ.Q.000207", E6, [P6], ["DQ.P1.C06.P0006"],
  "¿Cuál es la hipérbole del cura al condenar al linaje de Amadís de Grecia?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000207", 1, "Quemaría con ellos «al padre que me engendró, si anduviera en figura de caballero andante»"),
               O("DQ.Q.000207", 2, "Los echaría al mar con molinos de rueda al cuello"),
               O("DQ.Q.000207", 3, "Los enterraría bajo la hoguera misma")],
   "correct_option_ids": ["DQ.Q.000207.O01"], "shuffle_options": True},
  "La exageración humorística encadena la reina Pintiquinestra y el pastor Darinel con su propio progenitor.",
  [("DQ.P1.C06.P0006", "quemara con ellos al padre que me engendró, si anduviera en figura de caballero andante")],
  "humor", 2, ["piloto", "escrutinio"], "escrutinio hiperbole padre engendro pintiquinestra", pre=PRE6)

Q("DQ.Q.000208", E6, [P6], ["DQ.P1.C06.P0002"],
  "¿Qué exclama el cura al hallar Tirante el Blanco?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000208", 1, "«¡Válame Dios!... he hallado en él un tesoro de contento y una mina de pasatiempos»"),
               O("DQ.Q.000208", 2, "«¡Válame Dios!... aquí está el padre de los disparates»"),
               O("DQ.Q.000208", 3, "«¡Válame Dios!... libro es de perro cristiano»")],
   "correct_option_ids": ["DQ.Q.000208.O01"], "shuffle_options": True},
  "El elogio entusiasta de Tirante contrasta con la condena del resto del género.",
  [("DQ.P1.C06.P0002", "hago cuenta que he hallado en él un tesoro de contento y una mina de pasatiempos")],
  "cita", 1, ["piloto", "escrutinio"], "escrutinio tirante tesoro contento", pre=PRE6)

# ---- I.11
Q("DQ.Q.000209", E11, [P11], ["DQ.P1.C11.P0003"],
  "¿Qué componen la cena que los cabreros ofrecen a don Quijote y a Sancho?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000209", 1, "Tasajos de cabra hirviendo en caldero, bellotas avellanadas y un medio queso durísimo"),
               O("DQ.Q.000209", 2, "Truchas del Guadiana con pan y vino de la venta"),
               O("DQ.Q.000209", 3, "Gallina cocida con alcachofas del huerto")],
   "correct_option_ids": ["DQ.Q.000209.O01"], "shuffle_options": True},
  "La cena es humilde y descrita con ironía: el queso «más duro que si fuera hecho de argamasa».",
  [("DQ.P1.C11.P0003", "gran cantidad de bellotas avellanadas, y juntamente pusieron un medio queso, más duro que si fuera hecho de argamasa")],
  "hecho", 1, ["piloto", "edad-oro"], "cabreros cena bellotas queso argamasa", pre=PRE11)

Q("DQ.Q.000210", E11, [P11], ["DQ.P1.C11.P0001"],
  "¿Qué gesto precede inmediatamente al discurso de don Quijote?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000210", 1, "Toma un puño de bellotas en la mano y las mira atentamente"),
               O("DQ.Q.000210", 2, "Se arrodilla sobre una peña al modo de Beltenebros"),
               O("DQ.Q.000210", 3, "Descarga un golpe de lanza contra el caldero")],
   "correct_option_ids": ["DQ.Q.000210.O01"], "shuffle_options": True},
  "El objeto cotidiano (bellotas) dispara el discurso áureo.",
  [("DQ.P1.C11.P0001", "tomó un puño de bellotas en la mano, y mirándolas atentamente, soltó la voz")],
  "secuencia", 1, ["piloto", "edad-oro"], "edad-oro puño bellotas gesto discurso", pre=PRE11)

Q("DQ.Q.000211", E11, [P11], ["DQ.P1.C11.P0001"],
  "¿Con qué palabras arranca el discurso de la Edad de Oro?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000211", 1, "«¡Dichosa edad y siglos dichosos aquellos á quien los antiguos pusieron nombre de dorados!»"),
               O("DQ.Q.000211", 2, "«Bienhay aquellos que nacieron bajo el signo de la Justicia»"),
               O("DQ.Q.000211", 3, "«Felice aquel siglo que llamaron de oro los poetas griegos»")],
   "correct_option_ids": ["DQ.Q.000211.O01"], "shuffle_options": True},
  "Arranque literal del discurso (I, 11).",
  [("DQ.P1.C11.P0001", "¡Dichosa edad y siglos dichosos aquellos á quien los antiguos pusieron nombre de dorados!")],
  "cita", 1, ["piloto", "edad-oro"], "edad-oro arranque cita dichosa", pre=PRE11)

Q("DQ.Q.000212", E11, [P11], ["DQ.P1.C11.P0002"],
  "¿Qué «dos palabras» ignoraban, según don Quijote, los hombres de aquella edad?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000212", 1, "«Tuyo» y «mío»"),
               O("DQ.Q.000212", 2, "«Guerra» y «paz»"),
               O("DQ.Q.000212", 3, "«Rey» y «ley»")],
   "correct_option_ids": ["DQ.Q.000212.O01"], "shuffle_options": True},
  "La propiedad privada como origen retórico de los males en el discurso.",
  [("DQ.P1.C11.P0002", "ignoraban estas dos palabras de ¡tuyo y mío!")],
  "cita", 1, ["piloto", "edad-oro"], "edad-oro tuyo mio palabras", pre=PRE11)

Q("DQ.Q.000213", E11, [P11], ["DQ.P1.C11.P0004", "DQ.P1.C11.P0005"],
  "¿Qué imágenes ofrece el discurso sobre aquella edad? (varias)",
  {"type": "multi_choice", "multi_declared": True,
   "options": [O("DQ.Q.000213", 1, "Las robustas encinas convidando con su dulce y sazonado fruto"),
               O("DQ.Q.000213", 2, "Claras fuentes y corrientes ríos con aguas sabrosas y transparentes"),
               O("DQ.Q.000213", 3, "La justicia «en sus propios términos», sin favor ni interés"),
               O("DQ.Q.000213", 4, "Monedas de oro creciendo en las ramas de los robles")],
   "correct_option_ids": ["DQ.Q.000213.O01", "DQ.Q.000213.O02", "DQ.Q.000213.O03"],
   "shuffle_options": True},
  "Tres imágenes textuales del discurso; el oro crecido en robles no aparece: la ironía es que NO se estimaba el oro.",
  [("DQ.P1.C11.P0004", "las robustas encinas, que liberalmente les estaban convidando con su dulce y sazonado fruto"),
   ("DQ.P1.C11.P0005", "La justicia se estaba en sus propios términos, sin que la osasen turbar ni ofender los del favor y los del interés")],
  "interpretacion", 2, ["piloto", "edad-oro"], "edad-oro imagines encinas fuentes justicia", pre=PRE11)

Q("DQ.Q.000214", E11, [P11], ["DQ.P1.C11.P0006"],
  "¿Verdadero o falso: «la ley del encaje» ya estaba sentada en el entendimiento del juez en aquella edad?",
  {"type": "true_false",
   "options": [O("DQ.Q.000214", 1, "Verdadero"), O("DQ.Q.000214", 2, "Falso")],
   "correct_option_ids": ["DQ.Q.000214.O02"], "shuffle_options": False},
  "El texto dice lo contrario: «aun no se había sentado... porque entonces no había qué juzgar».",
  [("DQ.P1.C11.P0006", "La ley del encaje aun no se había sentado en el entendimiento del juez, porque entonces no había qué juzgar")],
  "cita", 2, ["piloto", "edad-oro"], "edad-oro ley encaje juez falso", pre=PRE11)

Q("DQ.Q.000215", E11, [P11], ["DQ.P1.C11.P0005"],
  "Según el discurso, ¿qué personajes «menoscaban, turban y persiguen» ahora la justicia?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000215", 1, "«Los del favor y los del interés»"),
               O("DQ.Q.000215", 2, "«Los encantadores y los gigantes»"),
               O("DQ.Q.000215", 3, "«Los moros de la costa»")],
   "correct_option_ids": ["DQ.Q.000215.O01"], "shuffle_options": True},
  "La crítica social del discurso apunta al favor y al interés, no a enemigos caballerescos.",
  [("DQ.P1.C11.P0005", "sin que la osasen turbar ni ofender los del favor y los del interés, que tanto ahora la menoscaban, turban y persiguen")],
  "interpretacion", 2, ["piloto", "edad-oro"], "edad-oro justicia favor interés críticas")

Q("DQ.Q.000216", E11, [P11], ["DQ.P1.C11.P0001"],
  "¿A quiénes dirige don Quijote el discurso de la Edad de Oro?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000216", 1, "A los cabreros que les han acogido y cenan con ellos"),
               O("DQ.Q.000216", 2, "A los pastores de la Sierra Morena que escucharon a Grisóstomo"),
               O("DQ.Q.000216", 3, "Al cura y al barbero en la venta")],
   "correct_option_ids": ["DQ.Q.000216.O01"], "shuffle_options": True},
  "El discurso se pronuncia ante los cabreros de la noche (I, 11); los pastores de Grisóstomo son otro episodio.",
  [("DQ.P1.C11.P0001", "tomó un puño de bellotas en la mano, y mirándolas atentamente, soltó la voz á semejantes razones")],
  "dialogo", 1, ["piloto", "edad-oro"], "edad-oro auditores cabreros discurso")

# ---- I.18
Q("DQ.Q.000217", E18, [P18], ["DQ.P1.C18.P0001" if False else "DQ.P1.C18.P0002"],
  "¿Qué causa la «grande y espesa polvareda» que ve don Quijote?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000217", 1, "Dos grandes manadas de ovejas y carneros que venían por el camino"),
               O("DQ.Q.000217", 2, "Dos ejércitos que avanzaban en orden de batalla"),
               O("DQ.Q.000217", 3, "Una tormenta de arena de la Mancha")],
   "correct_option_ids": ["DQ.Q.000217.O01"], "shuffle_options": True},
  "El narrador revela la causa real antes que Sancho la compruebe (I, 18).",
  [("DQ.P1.C18.P0002", "la polvareda que había visto la levantaban dos grandes manadas de ovejas y carneros") if False else
   ("DQ.P1.C18.P0002", "dos grandes manadas de ovejas y carneros que por aquel mismo camino de dos diferentes partes venían")],
  "causa_consecuencia", 1, ["piloto", "rebaños"], "rebaños causa polvareda ovejas", pre=PRE18)

Q("DQ.Q.000218", E18, [P18], ["DQ.P1.C18.P0001"],
  "¿Qué título da don Quijote a Alifanfarón?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000218", 1, "«Grande emperador... señor de la grande isla Trapobana»"),
               O("DQ.Q.000218", 2, "«Rey de los garamantas, del Arremangado Brazo»"),
               O("DQ.Q.000218", 3, "«Gran soldán de Babilonia»")],
   "correct_option_ids": ["DQ.Q.000218.O01"], "shuffle_options": True},
  "El segundo título corresponde a Pentapolín, su enemigo imaginado.",
  [("DQ.P1.C18.P0001", "el grande emperador Alifanfarón, señor de la grande isla Trapobana")],
  "hecho", 2, ["piloto", "rebaños"], "rebaños alifanfaron trapobana titulo", pre=PRE18)

Q("DQ.Q.000219", E18, [P18], ["DQ.P1.C18.P0001"],
  "¿Por qué lleva Pentapolín el mote «del Arremangado Brazo»?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000219", 1, "Porque «siempre entra en las batallas con el brazo derecho desnudo»"),
               O("DQ.Q.000219", 2, "Porque perdió un brazo en su primera guerra"),
               O("DQ.Q.000219", 3, "Porque levanta el brazo al jurar sus leyes")],
   "correct_option_ids": ["DQ.Q.000219.O01"], "shuffle_options": True},
  "La explicación es literal en el catálogo militar (I, 18).",
  [("DQ.P1.C18.P0001", "Pentapolín del Arremangado Brazo, porque siempre entra en las batallas con el brazo derecho desnudo")],
  "hecho", 2, ["piloto", "rebaños"], "rebaños pentapolin arremangado brazo desnudo", pre=PRE18)

Q("DQ.Q.000220", E18, [P18], ["DQ.P1.C18.P0001"],
  "¿Cuál es, según don Quijote, la causa de la guerra entre los dos «reyes»?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000220", 1, "Alifanfarón, pagano, ama a la hija cristiana de Pentapolín, y el padre no se la entrega si no cambia de ley"),
               O("DQ.Q.000220", 2, "Disputan la posesión de la ínsula Barataria"),
               O("DQ.Q.000220", 3, "Pentapolín robó el yelmo de Mambrino a Alifanfarón")],
   "correct_option_ids": ["DQ.Q.000220.O01"], "shuffle_options": True},
  "El motivo narrado mezcla amor, religión y condición pagana: pura invención del catálogo.",
  [("DQ.P1.C18.P0001", "este Alifanfarón es un furibundo pagano y está enamorado de la hija de Pentapolín, que es una muy fermosa y además agraciada señora, y es cristiana")],
  "hecho", 2, ["piloto", "rebaños"], "rebaños causa guerra hija cristiana pagano", pre=PRE18)

Q("DQ.Q.000221", E18, [P18], ["DQ.P1.C18.P0002"],
  "¿Verdadero o falso: Sancho asegura oír atambores, silbos y estruendo de guerra?",
  {"type": "true_false",
   "options": [O("DQ.Q.000221", 1, "Verdadero"), O("DQ.Q.000221", 2, "Falso")],
   "correct_option_ids": ["DQ.Q.000221.O02"], "shuffle_options": False},
  "Sancho oye lo contrario: «muchos balidos de ovejas y carneros»; quien interpreta el estruendo es su amo.",
  [("DQ.P1.C18.P0002", "No oigo otra cosa, respondió Sancho, sino muchos balidos de ovejas y carneros")],
  "dialogo", 1, ["piloto", "rebaños"], "rebaños sancho balidos no atambores", pre=PRE18)

Q("DQ.Q.000222", E18, [P18], ["DQ.P1.C18.P0004"],
  "¿Qué consecuencias tiene la carga contra las ovejas? (varias)",
  {"type": "multi_choice", "multi_declared": True,
   "options": [O("DQ.Q.000222", 1, "Su alcuza se hace pedazos y pierde tres ó cuatro dientes y muelas"),
               O("DQ.Q.000222", 2, "Los pastores, creyéndole muerto, recogen el ganado y se van con más de siete reses muertas"),
               O("DQ.Q.000222", 3, "Queda malferido de dos dedos de la mano"),
               O("DQ.Q.000222", 4, "Rocinante queda muerto en el campo de batalla")],
   "correct_option_ids": ["DQ.Q.000222.O01", "DQ.Q.000222.O02", "DQ.Q.000222.O03"],
   "shuffle_options": True},
  "Tres consecuencias textuales; Rocinante sobrevive a esta aventura.",
  [("DQ.P1.C18.P0004", "creyeron que le habían muerto y, así, con mucha priesa recogieron su ganado y cargaron de las reses muertas, que pasaban de siete")],
  "secuencia", 2, ["piloto", "rebaños"], "rebaños consecuencias dientes alcuza siete reses", pre=PRE18)

Q("DQ.Q.000223", E18, [P18], ["DQ.P1.C18.P0005"],
  "Al examinarle Sancho la boca, ¿qué ocurre de pronto?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000223", 1, "Don Quijote vomita el bálsamo «más recio que una escopeta» sobre las barbas de Sancho"),
               O("DQ.Q.000223", 2, "Sancho encuentra la muela perdida entre los dientes"),
               O("DQ.Q.000223", 3, "Don Quijote recupera el habla y pronuncia un juramento")],
   "correct_option_ids": ["DQ.Q.000223.O01"], "shuffle_options": True},
  "El bálsamo de Fierabrás «ya había obrado en el estómago»: comicidad física en el desenlace (I, 18).",
  [("DQ.P1.C18.P0005", "arrojó de sí, más recio que una escopeta, cuanto dentro tenía y dió con todo ello en las barbas del compasivo escudero")],
  "humor", 2, ["piloto", "rebaños"], "rebaños vomito bálsamo escopeta barbas", pre=PRE18)

Q("DQ.Q.000224", E18, [P18], ["DQ.P1.C18.P0003"],
  "¿Qué empresa y mote trae el «duque de Nerbia, Espartafilardo del Bosque», en su escudo?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000224", 1, "Una esparraguera con la letra «Rastrea mi suerte»"),
               O("DQ.Q.000224", 2, "Un gato asnal con la letra «Miaudo mi destino»"),
               O("DQ.Q.000224", 3, "Una luna blanca con la letra «Amanezco y venzo»")],
   "correct_option_ids": ["DQ.Q.000224.O01"], "shuffle_options": True},
  "Muestra del catálogo onomástico de improviso: nombres y empresas absurdos con motes caballerescos.",
  [("DQ.P1.C18.P0003", "Espartafilardo del Bosque, que trae por empresa en el escudo una esparraguera, con una letra en castellano que dice así: Rastrea mi suerte")],
  "humor", 2, ["piloto", "rebaños"], "rebaños espartafilardo esparraguera rastrea suerte", pre=PRE18)

Q("DQ.Q.000225", E18, [P18], ["DQ.P1.C18.P0001", "DQ.P1.C18.P0004", "DQ.P1.C18.P0005"],
  "Ordena los lances de la aventura de los rebaños.",
  {"type": "ordering",
   "options": [O("DQ.Q.000225", 1, "Aparece la polvareda y comienza el catálogo de caballeros"),
               O("DQ.Q.000225", 2, "Don Quijote se entra «por medio del escuadrón de ovejas»"),
               O("DQ.Q.000225", 3, "Las pedradas lo derriban y los pastores huyen con el ganado"),
               O("DQ.Q.000225", 4, "Recuento de muelas y vómito del bálsamo sobre Sancho")],
   "correct_order": ["DQ.Q.000225.O01", "DQ.Q.000225.O02", "DQ.Q.000225.O03", "DQ.Q.000225.O04"],
   "shuffle_options": False},
  "Secuencia canónica del capítulo: avistamiento, catálogo, carga con pedradas, desenlace físico.",
  [("DQ.P1.C18.P0004", "Tal fué el golpe primero y tal el segundo, que le fué forzoso al pobre caballero dar consigo del caballo abajo")],
  "secuencia", 2, ["piloto", "rebaños"], "rebaños orden polvareda carga pedradas bálsamo", pre=PRE18)

# ---- II.1
Q("DQ.Q.000226", E2A, [P2A], ["DQ.P2.C01.P0001"],
  "¿Cuánto tiempo pasaron el cura y el barbero sin ver a don Quijote, y con qué intención?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000226", 1, "Casi un mes, «por no renovarle y traerle á la memoria las cosas pasadas»"),
               O("DQ.Q.000226", 2, "Medio año, para que se le olvidaran los libros"),
               O("DQ.Q.000226", 3, "Tres días, para vigilarle de cerca")],
   "correct_option_ids": ["DQ.Q.000226.O01"], "shuffle_options": True},
  "La prudencia amable de los amigos abre la segunda parte (II, 1).",
  [("DQ.P2.C01.P0001", "el cura y el barbero se estuvieron casi un mes sin verle, por no renovarle y traerle á la memoria las cosas pasadas")],
  "actitud_reaccion", 2, ["piloto", "visita"], "visita mes sin verle prudencia")

Q("DQ.Q.000227", E2A, [P2A], ["DQ.P2.C01.P0001"],
  "¿Qué voz narrativa abre formalmente la segunda parte?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000227", 1, "«Cuenta Cide Hamete Benengeli, en la segunda parte desta historia, y tercera salida de don Quijote»"),
               O("DQ.Q.000227", 2, "El propio Cervantes, en primera persona"),
               O("DQ.Q.000227", 3, "Sancho Panza, dictando a un escribano")],
   "correct_option_ids": ["DQ.Q.000227.O01"], "shuffle_options": True},
  "El marco del historiador arábigo ficticio se mantiene en la apertura (II, 1).",
  [("DQ.P2.C01.P0001", "Cuenta Cide Hamete Benengeli, en la segunda parte desta historia, y tercera salida de don Quijote")],
  "historia", 1, ["piloto", "visita"], "visita cide hamete marco narrativo")

Q("DQ.Q.000228", E2A, [P2A], ["DQ.P2.C01.P0002"],
  "¿Qué juicio formula el conversador sobre Angélica la Bella?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000228", 1, "«Doncella distraída, andariega y algo antojadiza» que «contentóse con un pajecillo barbilucio»"),
               O("DQ.Q.000228", 2, "Reina prudentísima que murió por su esposo en alta torre"),
               O("DQ.Q.000228", 3, "Fiera amazona que conquistó media Asia")],
   "correct_option_ids": ["DQ.Q.000228.O01"], "shuffle_options": True},
  "El retrato irónico de Angélica en la conversación de II, 1.",
  [("DQ.P2.C01.P0002", "fué una doncella distraída, andariega y algo antojadiza, y tan lleno dejó el mundo de sus impertinencias como de la fama de su hermosura")],
  "arte", 2, ["piloto", "visita"], "visita angélica juicio pajecillo")

Q("DQ.Q.000229", E2A, [P2A], ["DQ.P2.C01.P0002"],
  "¿A quién llama el texto «el gran cantor de su belleza» al hablar de Angélica?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000229", 1, "Al famoso Ariosto"),
               O("DQ.Q.000229", 2, "A Torcuato Tasso"),
               O("DQ.Q.000229", 3, "A Boiardo")],
   "correct_option_ids": ["DQ.Q.000229.O01"], "shuffle_options": True},
  "Referencia literaria real dentro de la conversación (II, 1).",
  [("DQ.P2.C01.P0002", "El gran cantor de su belleza, el famoso Ariosto")],
  "historia", 2, ["piloto", "visita"], "visita ariosto cantor angélica")

Q("DQ.Q.000230", E2A, [P2A], ["DQ.P2.C01.P0003"],
  "¿Verdadero o falso: la conversación se interrumpe porque el ama y la sobrina dan grandes voces en el patio?",
  {"type": "true_false",
   "options": [O("DQ.Q.000230", 1, "Verdadero"), O("DQ.Q.000230", 2, "Falso")],
   "correct_option_ids": ["DQ.Q.000230.O01"], "shuffle_options": False},
  "«...daban grandes voces en el patio, y acudieron todos al ruido»: interrupción doméstica de la charla literaria.",
  [("DQ.P2.C01.P0003", "oyeron que la ama y la sobrina, que ya habían dejado la conversación, daban grandes voces en el patio, y acudieron todos al ruido")],
  "secuencia", 1, ["piloto", "visita"], "visita interrupción voces patio ama sobrina")

Q("DQ.Q.000231", E2A, [P2A], ["DQ.P2.C01.P0002"],
  "¿Quién exclama «¡Milagro!» durante la conversación y a propósito de qué?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000231", 1, "El cura, ante que no haya versos infamatorios contra Angélica"),
               O("DQ.Q.000231", 2, "Sancho, ante la llegada del tazón de caldo"),
               O("DQ.Q.000231", 3, "La sobrina, al ver que tiran un libro")],
   "correct_option_ids": ["DQ.Q.000231.O01"], "shuffle_options": True},
  "La sorpresa del cura subraya la sátira sobre la fama literaria de la heroína.",
  [("DQ.P2.C01.P0002", "no ha llegado á mi noticia ningún verso infamatorio contra la señora Angélica, que trujo revuelto el mundo. —¡Milagro! Dijo el cura")],
  "dialogo", 2, ["piloto", "visita"], "visita milagro cura angélica versos")

# ---- II.74
Q("DQ.Q.000232", E2F, [P2F], ["DQ.P2.C74.P0004", "DQ.P2.C74.P0005"],
  "¿Qué anuncia don Quijote tras seis días de cama?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000232", 1, "«Siento que me voy muriendo á toda priesa» y pide confesor y escribano"),
               O("DQ.Q.000232", 2, "Que quiere armar caballero a un vecino nuevo"),
               O("DQ.Q.000232", 3, "Que parte al anochecer a su tercera salida")],
   "correct_option_ids": ["DQ.Q.000232.O01"], "shuffle_options": True},
  "La lucidez del anuncio sorprende a los presentes; «no se ha de burlar el hombre con el alma».",
  [("DQ.P2.C74.P0005", "déjense burlas aparte, y tráiganme un confesor que me confiese y un escribano que haga mi testamento")],
  "hecho", 1, ["piloto", "final"], "final seis días confesor escribano")

Q("DQ.Q.000233", E2F, [P2F], ["DQ.P2.C74.P0002"],
  "¿Cómo se presenta don Quijote al recibir a sus amigos?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000233", 1, "«...ya yo no soy don Quijote de la Mancha, sino Alonso Quijano»"),
               O("DQ.Q.000233", 2, "«El Caballero de la Blanca Luna, vencedor en Barcelona»"),
               O("DQ.Q.000233", 3, "«Alonso Quijano el Bueno, caballero andante jubilado»")],
   "correct_option_ids": ["DQ.Q.000233.O01"], "shuffle_options": True},
  "La renuncia del nombre («Dadme albricias...») es el gesto central del capítulo final.",
  [("DQ.P2.C74.P0002", "Dadme albricias, buenos señores, de que ya yo no soy don Quijote de la Mancha, sino Alonso Quijano")],
  "cita", 1, ["piloto", "final"], "final renuncia nombre alonso quijano")

Q("DQ.Q.000234", E2F, [P2F], ["DQ.P2.C74.P0001"],
  "¿Qué veredicto pronuncia el cura al salir de la confesión?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000234", 1, "«Verdaderamente se muere, y verdaderamente está cuerdo Alonso Quijano el Bueno»"),
               O("DQ.Q.000234", 2, "«Está loco y morirá loco: llamad al médico»"),
               O("DQ.Q.000234", 3, "«Sana del cuerpo, aunque no del alma»")],
   "correct_option_ids": ["DQ.Q.000234.O01"], "shuffle_options": True},
  "El doble «verdaderamente» autentica lucidez y gravedad a un tiempo.",
  [("DQ.P2.C74.P0001", "Verdaderamente se muere, y verdaderamente está cuerdo Alonso Quijano el Bueno; bien podemos entrar para que haga su testamento")],
  "cita", 1, ["piloto", "final"], "final cura veredicto cuerdo muere")

Q("DQ.Q.000235", E2F, [P2F], ["DQ.P2.C74.P0005"],
  "¿A quiénes manda llamar don Quijote para confesarse y testar?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000235", 1, "Al cura, al bachiller Sansón Carrasco y a maese Nicolás el barbero"),
               O("DQ.Q.000235", 2, "Al cura y a los duques de su ínsula"),
               O("DQ.Q.000235", 3, "Solo al escribano del pueblo")],
   "correct_option_ids": ["DQ.Q.000235.O01"], "shuffle_options": True},
  "Llama «á mis buenos amigos» por su nombre (II, 74).",
  [("DQ.P2.C74.P0005", "Llámame, amiga, á mis buenos amigos al cura, al bachiller Sansón Carrasco y á maese Nicolás el barbero")],
  "hecho", 2, ["piloto", "final"], "final llama cura carrasco nicolas")

Q("DQ.Q.000236", E2F, [P2F], ["DQ.P2.C74.P0003"],
  "¿Quién compuso el epitafio «Yace aquí el hidalgo fuerte...»?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000236", 1, "El bachiller Sansón Carrasco"),
               O("DQ.Q.000236", 2, "Cide Hamete Benengeli"),
               O("DQ.Q.000236", 3, "El escribano del pueblo")],
   "correct_option_ids": ["DQ.Q.000236.O01"], "shuffle_options": True},
  "«Los nuevos epitafios de su sepultura, aunque Sansón Carrasco le puso éste».",
  [("DQ.P2.C74.P0003", "los nuevos epitafios de su sepultura, aunque Sansón Carrasco le puso éste")],
  "hecho", 2, ["piloto", "final"], "final epitafio carrasco compuso")

Q("DQ.Q.000237", E2F, [P2F], ["DQ.P2.C74.P0003"],
  "¿Qué dice el epitafio sobre la muerte?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000237", 1, "«Que la muerte no triunfó de su vida con su muerte»"),
               O("DQ.Q.000237", 2, "«Que la muerte le llevó con honor de mil batallas»"),
               O("DQ.Q.000237", 3, "«Que la muerte le hará renacer en tercera parte»")],
   "correct_option_ids": ["DQ.Q.000237.O01"], "shuffle_options": True},
  "La paradoja final del epitafio condensa el sentido del personaje.",
  [("DQ.P2.C74.P0003", "Yace aquí el hidalgo fuerte, que á tanto extremo llegó de valiente, que se advierte que la muerte no triunfó de su vida con su muerte")],
  "cita", 2, ["piloto", "final"], "final epitafio muerte no triunfó vida")

Q("DQ.Q.000238", E2F, [P2F], ["DQ.P2.C74.P0006"],
  "¿Contra qué advertencia termina la obra?",
  {"type": "single_choice",
   "options": [O("DQ.Q.000238", 1, "Contra quien quiera sacarlo de la fuesa «á Castilla la Vieja» para hacerle «tercera parte y salida nueva»"),
               O("DQ.Q.000238", 2, "Contra los que quemen libros de caballerías sin leerlos"),
               O("DQ.Q.000238", 3, "Contra los escuderos que sueñan con ínsulas")],
   "correct_option_ids": ["DQ.Q.000238.O01"], "shuffle_options": True},
  "«...bastan las dos que él hizo tan á gusto y beneplácito de las gentes»: réplica final a los fabricantes de segundas partes.",
  [("DQ.P2.C74.P0006", "no le quiera llevar, contra todos los fueros de la muerte, á Castilla la Vieja... imposibilitado de hacer tercera parte y salida nueva")],
  "interpretacion", 2, ["piloto", "final"], "final advertencia castilla vieja tercera parte")

# ------------------------------------------------------------- actualizar manifiesto
manifest["files"] = files
manifest["counts"] = {"questions": len(files["questions"]), "episodes": len(files["episodes"]),
                       "media_assets": len(files["media_assets"]), "discoveries": len(files["discoveries"]),
                       "passages": len(files["passages"])}
with open(os.path.join(PKG, "package.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)
print("FASE B OK: preguntas=%d pasajes=%d medios=%d" % (len(files["questions"]), len(files["passages"]), len(files["media_assets"])))
