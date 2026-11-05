#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FASE 1 (editorial): segmentación pasaje a pasaje de los 6 capítulos del piloto.
Verifica que cada ancla existe en el texto real del EPUB y ordena los segmentos
por posición. Salida: docs/data/piloto_segmentacion.json + docs/PILOTO_SEGMENTACION.md
Uso: python -I generar_segmentacion_piloto.py <raiz_repo>
"""
import sys, os, re, html, json

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
TXT = os.path.abspath(os.path.join(REPO, "..", "..", "data", "epub_extract", "OEBPS", "Text"))

SEG = {
 "DQ.P1.C08": [
  ("Avistamiento y propuesta de batalla", "esto descubrieron treinta ó cuarenta molinos",
   ["DQ.PER.0001", "DQ.PER.0002"], ["DQ.LOC.0002", "DQ.LOC.0004"],
   "30-40 molinos vistos como gigantes; motivación del botín y del servicio divino."),
  ("Diálogo de percepciones", "Mire vuestra merced, respondió Sancho",
   ["DQ.PER.0001", "DQ.PER.0002"], [],
   "Sancho: aspas del viento; don Quijote: gigantes y advertencia de miedo."),
  ("Embestida y caída", "Levantóse en esto un poco de viento",
   ["DQ.PER.0001", "DQ.PER.0002", "DQ.PER.0003"], ["DQ.LOC.0004"],
   "Briareo; lanzada en el aspa; lanza en pedazos; arrastre de caballo y caballero; socorro de Sancho."),
  ("Frailes como encantadores", "Estando en estas razones, asomaron por el camino dos frailes",
   ["DQ.PER.0001", "DQ.PER.0002"], [],
   "Bultos negros como encantadores con princesa; Sancho: «Peor será esto»; ataque y presentación ante la «princesa»."),
  ("Desafío del vizcaíno", "asiéndole de la lanza, le dijo en mala lengua castellana",
   ["DQ.PER.0001"], ["DQ.LOC.0003"],
   "Insulto del escudero; el combate se suspende y concluye en I, 9."),
 ],
 "DQ.P1.C06": [
  ("Inicio del escrutinio", "todavía dormía. Pidió á la sobrina las llaves",
   ["DQ.PER.0005", "DQ.PER.0006", "DQ.PER.0007", "DQ.PER.0008"], [],
   "El dueño duerme; se piden las llaves del aposento de los libros «autores del daño»."),
  ("Amadís juzgado y perdonado", "el primero que maese Nicolás le dió en las manos",
   ["DQ.PER.0005", "DQ.PER.0006"], [],
   "Amadís de Gaula: «único en su arte» → vida por ahora; Esplandián al corral."),
  ("Tirante hallado y elogiado", "se le cayó uno á los pies del barbero",
   ["DQ.PER.0005", "DQ.PER.0006"], [],
   "«Tesoro de contento y una mina de pasatiempos»; don Kirieleisón de Montalbán."),
  ("La Galatea salvada (ironía)", "Muchos años ha que es grande amigo mío",
   ["DQ.PER.0005", "DQ.PER.0006", "DQ.PER.0012"], [],
   "Cervantes aparece citado: «más versado en desdichas que en versos»; «propone algo y no concluye nada»."),
  ("Palmerines: Oliva fuera, Ingalaterra dentro", "abriendo otro libro vió que era Palmerín",
   ["DQ.PER.0005"], [],
   "Oliva: «rajas y se queme»; Ingalaterra: «se guarde como á cosa única»."),
  ("Linaje de Amadís de Grecia; secunda la condena", "Pues vayan todos al corral",
   ["DQ.PER.0005", "DQ.PER.0006", "DQ.PER.0007", "DQ.PER.0008"], [],
   "Hipérbole de la Pintiquinestra; barbero, sobrina y ama secundan; quema en el corral."),
 ],
 "DQ.P1.C11": [
  ("Acogida de los cabreros", "recogido de los cabreros con buen ánimo",
   ["DQ.PER.0001", "DQ.PER.0002"], ["DQ.LOC.0001"],
   "Sancho acomoda Rocinante y el rucio; olor de tasajos al fuego."),
  ("Cena con los cabreros", "tendieron sobre las zaleas gran cantidad de bellotas",
   ["DQ.PER.0001", "DQ.PER.0002"], [],
   "Bellotas avellanadas, queso «de argamasa», cuerno como arcaduz; se vacía un zaque."),
  ("Inicio del discurso de la Edad de Oro", "tomó un puño de bellotas en la mano",
   ["DQ.PER.0001"], [],
   "«¡Dichosa edad...!»; el oro de ahora frente a aquella felicidad."),
  ("Imágenes de la edad dorada", "alzar la mano, y alcanzarle de las robustas encinas",
   ["DQ.PER.0001"], [],
   "Encinas liberales, fuentes y ríos claros; repúblicas en peñas y árboles."),
  ("Justicia, favor e interés; ley del encaje", "La justicia se estaba en sus propios términos",
   ["DQ.PER.0001"], [],
   "Sin fraude ni malicia; la ley del encaje aún sin sentar: «no había qué juzgar»."),
 ],
 "DQ.P1.C18": [
  ("Apertura: Sancho desmayado y consuelo", "Sancho á su amo, marchito y desmayado",
   ["DQ.PER.0001", "DQ.PER.0002"], [],
   "La venta «encantada»; recuento del mal pasar de la noche anterior."),
  ("Polvareda y catálogo de improviso", "vió don Quijote que por el camino que iban venía hacia ellos una grande y espesa",
   ["DQ.PER.0001", "DQ.PER.0002", "DQ.PER.0013", "DQ.PER.0014"], ["DQ.LOC.0001", "DQ.LOC.0005"],
   "Alifanfarón y Pentapolín; causa de la guerra; Espartafilardo del Bosque y su esparraguera."),
  ("La carga contra las ovejas", "se entró por medio del escuadrón de ovejas",
   ["DQ.PER.0001"], [],
   "Invocación a Dulcinea y embestida entre las manadas."),
  ("Pedradas y huida de los pastores", "Tal fué el golpe primero y tal el segundo",
   ["DQ.PER.0001"], [],
   "Alcuza hecha pedazos; dientes y muelas; pastores creyéndole muerto con más de siete reses."),
  ("Recuento de muelas y bálsamo", "Llegóse Sancho tan cerca",
   ["DQ.PER.0001", "DQ.PER.0002"], [],
   "Revisión de la boca; vómito del bálsamo «más recio que una escopeta» en las barbas de Sancho."),
 ],
 "DQ.P2.C01": [
  ("Marco: un mes de prudencia", "Cide Hamete Benengeli, en la segunda parte desta historia",
   ["DQ.PER.0005", "DQ.PER.0006", "DQ.PER.0010"], ["DQ.LOC.0001"],
   "Sin verle «por no renovarle»; visitas a la sobrina y al ama con recado de vigilarle."),
  ("Conversación literaria: Angélica", "fué una doncella distraída, andariega y algo antojadiza",
   ["DQ.PER.0005", "DQ.PER.0006", "DQ.PER.0001"], [],
   "Juicio sobre Angélica; Ariosto «gran cantor de su belleza»; no hay versos infamatorios."),
  ("Interrupción doméstica", "daban grandes voces en el patio",
   ["DQ.PER.0007", "DQ.PER.0008"], [],
   "Ama y sobrina dan voces; «acudieron todos al ruido»."),
 ],
 "DQ.P2.C74": [
  ("Apertura elegíaca y enfermedad", "las cosas humanas no sean eternas",
   ["DQ.PER.0001"], ["DQ.LOC.0001"],
   "Declinación de las vidas; calentura de seis días en la cama; visitas de amigos."),
  ("Anuncio de la muerte", "siento que me voy muriendo á toda priesa",
   ["DQ.PER.0001", "DQ.PER.0002", "DQ.PER.0005"], [],
   "Petición de confesor y escribano; admiración por la facilidad de pasar «de loco á cuerdo»."),
  ("Confesión, juicio y testamento", "Verdaderamente se muere, y verdaderamente está cuerdo",
   ["DQ.PER.0005", "DQ.PER.0009"], [],
   "El cura sale y dicta el veredicto; entra el escribano con Sancho."),
  ("Muerte entre lágrimas", "Acabóse la confesión",
   ["DQ.PER.0001", "DQ.PER.0002", "DQ.PER.0007", "DQ.PER.0008"], [],
   "«Apacible condición y agradable trato» en ambas identidades; último de don Quijote tras los sacramentos."),
  ("Epitafio y advertencia final", "Yace aquí el hidalgo fuerte",
   ["DQ.PER.0009"], [],
   "Epitafio de Sansón Carrasco; que nadie le lleve «á Castilla la Vieja» para hacer «tercera parte»."),
 ],
}

def main():
    caps = {}
    for cid in SEG:
        parte = int(cid[4])
        num = int(cid.split("C")[1][:2])
        fich = None
        for f in os.listdir(TXT):
            if f.endswith(".xhtml"):
                base = f[:-6]
                if parte == 1 and (base == ("100%d" % num if num < 10 else ("20%02d" % num if 9 < num < 15 else ("30%02d" % num if 14 < num < 18 else "1.%d" % num)))):
                    fich = f
                if parte == 2 and base == "2.%d" % num:
                    fich = f
        if not fich:
            raise SystemExit("no hay fichero para %s" % cid)
        raw = open(os.path.join(TXT, fich), encoding="utf-8", errors="replace").read()
        caps[cid] = {"fich": fich, "txt": html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", raw))).strip()}

    resultado = {}
    lineas = ["# Segmentación pasaje a pasaje — Piloto editorial (FASE 1, modo CONTENIDOS)", "",
              "**Método:** cada segmento tiene un ANCLA verificada en el texto real del EPUB (búsqueda literal);",
              "los segmentos se ordenan por su posición real en el capítulo. IDs provisionales hasta el contrato de episodios.",
              "Corresponde a la decisión DC-18 (GO FASE 1: producción editorial del piloto).", ""]
    errores = []
    for cid, segs in SEG.items():
        info = caps[cid]
        partes = []
        for i, (titulo, ancla, pers, lugares, hechos) in enumerate(segs, 1):
            pos = info["txt"].find(ancla)
            if pos < 0:
                errores.append("%s: ancla no hallada: %s" % (cid, ancla[:60]))
                continue
            partes.append((pos, i, titulo, ancla, pers, lugares, hechos))
        partes.sort()
        lista = []
        lineas.append("## %s (%s)" % (cid, info["fich"]))
        lineas.append("")
        lineas.append("| Seg. | Título | Personajes | Lugares | Hechos |")
        lineas.append("|---|---|---|---|---|")
        for n, (pos, i, titulo, ancla, pers, lugares, hechos) in enumerate(partes, 1):
            sid = "%s.SG%02d" % (cid, n)
            lista.append({"id": sid, "titulo": titulo, "ancla": ancla,
                           "posicion_char": pos, "personajes": pers, "lugares": lugares,
                           "hechos": hechos})
            lineas.append("| %s | %s | %s | %s | %s |" % (
                sid, titulo, ", ".join(p[-4:] for p in pers),
                ", ".join(l[-4:] for l in lugares) or "—", hechos))
        lineas.append("")
        resultado[cid] = {"archivo_epub": info["fich"], "episodio": cid + ".E01", "segmentos": lista}

    if errores:
        print("ERRORES DE ANCLA:"); [print(" -", e) for e in errores]
        sys.exit(1)

    os.makedirs(os.path.join(REPO, "docs", "data"), exist_ok=True)
    with open(os.path.join(REPO, "docs", "data", "piloto_segmentacion.json"), "w", encoding="utf-8") as f:
        json.dump({"aviso": "Draft FASE 1 — segmentación con anclas verificadas sobre el texto del EPUB Tusell; IDs provisionales.",
                    "capitulos": resultado}, f, ensure_ascii=False, indent=1)
    with open(os.path.join(REPO, "docs", "PILOTO_SEGMENTACION.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lineas) + "\n")
    print("SEGMENTACION OK:", {k: len(v["segmentos"]) for k, v in resultado.items()})

if __name__ == "__main__":
    main()
