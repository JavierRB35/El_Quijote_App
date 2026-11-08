#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regresión P0 (PR #59): los saltos literarios NO se aplanan.

La primera normalización colapsaba TODO whitespace y destruía párrafos,
títulos, parlamentos y estrofas/versos (p. ej. el soneto del
Diálogo entre Babieca y Rocinante en DQ.P1.C01.P0002). Esta batería
comprueba, sobre CASOS SINTÉTICOS y sobre el PAQUETE REAL:

  1. Prosa envuelta a ~75 columnas se une en un solo párrafo.
  2. Los saltos \n\n de párrafo/título se conservan.
  3. Los parlamentos (línea que empieza por «—») se conservan aunque el
     corte sea estrecho.
  4. Los versos de un bloque de líneas cortas (soneto/epitafio) se
     conservan línea a línea.
  5. El cotejo normalizado sigue PASS (solo cambia el whitespace).
  6. Segunda pasada IDEMPOTENTE (restaurar lo ya restaurado no cambia nada).
  7. Paquete real: el soneto de C01, el epitafio de P2.C74.P0003, los
     parlamentos de C21 y los pasajes del Modo Historia conservan su
     estructura; ningún text_original perdió/ganó palabras frente al
     estado previo de la PR (solo-estructura).

Uso: python -I test_estructura_literaria.py <raiz_repo>
"""
import json
import os
import re
import subprocess
import sys

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
sys.path.insert(0, os.path.join(REPO, "tools", "editorial_validation"))
from estructura_texto import (  # noqa: E402
    PAR,
    VERSO,
    restaurar_estructura,
)

FALLOS: list[str] = []


def comprobar(cond, mensaje):
    if not cond:
        FALLOS.append(mensaje)


def normalizado(s):
    return re.sub(r"\s+", " ", s).strip()


# ---------------------------------------------------------------- sintéticos
# Prosa envuelta a 76 columnas: cada línea llena y cortada a mitad de frase.
prosa_envuelta = (
    "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho\n"
    "tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua,\n"
    "rocín flaco y galgo corredor."
)
esperado_prosa = normalizado(prosa_envuelta)

# Párrafos y títulos separados por línea en blanco; parlamento con «—».
con_parrafos = (
    "dijo a su escudero:\n"
    "\n"
    "— La ventura va guiando nuestras cosas mejor de lo que acertáramos a\n"
    "desear, porque ves allí, amigo Sancho Panza, donde se descubren treinta.\n"
    "\n"
    "— ¿Qué gigantes? —dijo Sancho Panza.\n"
    "\n"
    "CAPÍTULO VIII. DE LA ESPANTABLE AVENTURA\n"
    "\n"
    "En esto, descubrieron treinta o cuarenta molinos de viento que hay en\n"
    "aquel campo."
)

# Soneto sintético: líneas cortas (todas < 60), cortes estrechos (< 76).
soneto = (
    "B. ¿Cómo estáis, Rocinante, tan delgado?\n"
    "R. Porque nunca se come, y se trabaja.\n"
    "B. Pues, ¿qué es de la cebada y de la paja?\n"
    "R. No me deja mi amo ni un bocado.\n"
    "B. Andá, señor, que estáis muy mal criado,\n"
    "pues vuestra lengua de asno al amo ultraja.\n"
    "R. Asno se es de la cuna a la mortaja.\n"
    "¿Queréislo ver? Miraldo enamorado."
)

# Epitafio de cuatro versos (todas las líneas cortas, cortes estrechos).
epitafio = (
    "Yace aquí el Hidalgo fuerte\n"
    "que a tanto estremo llegó\n"
    "de valiente, que se advierte\n"
    "que la muerte no triunfó\n"
    "de su vida con su muerte."
)

FUENTE = "\n\n".join([con_parrafos, soneto, epitafio, prosa_envuelta])


def inicio_de(fragmento, texto):
    idx = texto.find(fragmento.split("\n")[0])
    return idx, idx + len(fragmento)


# 1+5. prosa envuelta → un párrafo; palabras idénticas
i0, i1 = inicio_de(prosa_envuelta, FUENTE)
restaurada = restaurar_estructura(normalizado(prosa_envuelta), FUENTE, i0, i1)
comprobar("\n" not in restaurada, "sintético: la prosa envuelta conserva saltos")
comprobar(normalizado(restaurada) == esperado_prosa,
          "sintético: la prosa envuelta cambió palabras")

# 2+3. párrafos y parlamentos se conservan
i0, i1 = inicio_de(con_parrafos, FUENTE)
restaurada = restaurar_estructura(normalizado(con_parrafos), FUENTE, i0, i1)
comprobar(restaurada.count(PAR) == 4,
          f"sintético: párrafos de con_parrafos = {restaurada.count(PAR)} (esperaba 4)")
comprobar("\n— La ventura va guiando" in restaurada,
          "sintético: el parlamento «— La ventura…» no se conservó")
comprobar("\n— ¿Qué gigantes?" in restaurada,
          "sintético: el parlamento «— ¿Qué gigantes?» no se conservó")
comprobar("CAPÍTULO VIII" in restaurada and "\n\nCAPÍTULO VIII" in restaurada,
          "sintético: el título de capítulo quedó pegado a otro bloque")
comprobar(normalizado(restaurada) == normalizado(con_parrafos),
          "sintético: con_parrafos cambió palabras")

# 4. soneto y epitafio: cada verso en su línea
i0, i1 = inicio_de(soneto, FUENTE)
restaurada = restaurar_estructura(normalizado(soneto), FUENTE, i0, i1)
comprobar(restaurada.count("\n") == 7,
          f"sintético: el soneto conserva {restaurada.count(chr(10))} saltos de verso (esperaba 7)")
comprobar("tan delgado?\nR. Porque" in restaurada,
          "sintético: los versos del soneto no quedan línea a línea")

i0, i1 = inicio_de(epitafio, FUENTE)
restaurada = restaurar_estructura(normalizado(epitafio), FUENTE, i0, i1)
comprobar(restaurada.count("\n") == 4,
          f"sintético: el epitafio conserva {restaurada.count(chr(10))} saltos (esperaba 4)")
comprobar(VERSO in restaurada and PAR not in restaurada,
          "sintético: el epitafio no debe dividirse en párrafos")

# 6. idempotencia sobre los tres bloques
for bloque in (con_parrafos, soneto, epitafio):
    i0, i1 = inicio_de(bloque, FUENTE)
    primera = restaurar_estructura(normalizado(bloque), FUENTE, i0, i1)
    segunda = restaurar_estructura(primera, FUENTE, i0, i1)
    comprobar(primera == segunda, "sintético: segunda pasada NO idempotente")

# 7. corte estrecho en prosa se une: la clasificación usa el PÁRRAFO COMPLETO
# del fichero; un párrafo de prosa (con líneas que llenan la columna) no se
# declara verso aunque contenga un corte estrecho aislado (h <= 75).
prosa_con_corte_estrecho = (
    "que también he oído decir que es el mejor de todos los libros que de este\n"
    "género se han compuesto; y así, como a único\n"
    "en su arte, se debe perdonar."
)
i0, i1 = 0, len(prosa_con_corte_estrecho)
restaurada = restaurar_estructura(normalizado(prosa_con_corte_estrecho),
                                  prosa_con_corte_estrecho, i0, i1)
comprobar("\n" not in restaurada,
          "sintético: el corte estrecho de un párrafo de prosa no debe conservarse")
comprobar(normalizado(restaurada) == normalizado(prosa_con_corte_estrecho),
          "sintético: prosa_con_corte_estrecho cambió palabras")

# ------------------------------------------------------- paquete real (51+5)
ruta_paquete = os.path.join(REPO, "content", "piloto")
fuente = open(os.path.join(REPO, "content", "textos", "gutenberg_2000",
                           "El_Quijote.txt"), encoding="utf-8").read().replace("\r\n", "\n")


def leer_json(relativa):
    with open(os.path.join(ruta_paquete, relativa), encoding="utf-8") as fh:
        return json.load(fh)


def texto_previo(relativa):
    """Estado del fichero en el commit previo de esta PR (texto plano).

    Requiere historia completa (checkout fetch-depth: 0 en CI). Si el commit
    no está disponible, devuelve None y el globo solo-estructura se omite
    con AVISO: el cotejo contra el fuente (paso propio de CI) sigue
    garantizando las palabras."""
    bruto = subprocess.run(
        ["git", "show", f"49b5dbe:content/piloto/{relativa.replace(os.sep, '/')}"],
        capture_output=True, text=True, cwd=REPO,
    ).stdout
    if not bruto.strip():
        print("AVISO: estado plano previo no disponible (checkout parcial); "
              "se omite el globo solo-estructura para " + relativa)
        return None
    return json.loads(bruto)


def cargar(texto, relativa):
    p = leer_json(relativa)
    pos = p["position"]
    plano_previo = normalizado(p["text_original"])
    restaurado = restaurar_estructura(plano_previo, texto, pos["start_char"], pos["end_char"])
    return p, plano_previo, restaurado


def cargar_actual(relativa):
    with open(os.path.join(ruta_paquete, relativa), encoding="utf-8") as fh:
        return json.load(fh)


# 7a. el soneto de C01.P0002 queda con sus versos y su título de bloque
p = cargar_actual(os.path.join("passages", "DQ.P1.C01.P0002.json"))
t = p["text_original"]
comprobar("DIÁLOGO ENTRE BABIECA Y ROCINANTE" in t, "C01.P0002: falta el título del diálogo")
comprobar("\nSoneto\n" in t or "\n\nSoneto\n" in t, "C01.P0002: falta el rótulo «Soneto» como bloque")
comprobar("tan delgado?\nR. Porque nunca se come" in t,
          "C01.P0002: los versos del soneto no quedan línea a línea")
comprobar("\n\nEn un lugar de la Mancha" in t,
          "C01.P0002: el arranque del capítulo I debe ser párrafo nuevo")

# 7b. epitafio de P2.C74.P0003, verso a verso
p = cargar_actual(os.path.join("passages", "DQ.P2.C74.P0003.json"))
t = p["text_original"]
comprobar(t.count("\n") == 4 and "\n\n" not in t,
          f"P2.C74.P0003: el epitafio conserva {t.count(chr(10))} saltos (esperaba 4, sin párrafos)")

# 7c. parlamentos de C21 (yelmo de Mambrino) conservados
p = cargar_actual(os.path.join("passages", "DQ.P1.C21.P0003.json"))
t = p["text_original"]
comprobar("\n— Pues ése es el yelmo de Mambrino" in t.replace("\n\n", "\n"),
          "C21.P0003: el parlamento «— Pues ése es el yelmo…» no se conservó")

# 7d. los pasajes del Modo Historia mantienen sus separadores de parlamento
p = cargar_actual(os.path.join("passages", "DQ.P1.C08.P0016.json"))
comprobar(p["text_original"].count("\n\n") == 2,
          "C08.P0016: deben conservarse los tres parlamentos (2 saltos de párrafo)")
p = cargar_actual(os.path.join("passages", "DQ.P1.C08.P0017.json"))
comprobar("\n" not in p["text_original"],
          "C08.P0017: prosa continua sin saltos literarios debe quedar en un párrafo")

# 7e. globo: todas las citas estructuradas son palabra a palabra iguales al
# estado plano previo de la PR (solo-estructura) y todos los sha256 son válidos.
# EXCEPCIONES autorizadas por la subsanación P1 (límites de capítulo, PR
# independiente): DQ.P1.C21.P0001 pierde la cola de I,20 y el encabezado
# (posición y contenido corregidos) y Q.313/Q.318 sustituyen la cita
# contaminada. La integridad de esas palabras la garantizan el test
# test_limites_capitulo.py y el cotejo contra el fuente.
PALABRAS_AUTORIZADAS_A_CAMBIAR = {
    # subsanación P1 (sangrado I,20→I,21, PR #62 fusionada): fragmento
    # recortado al inicio narrativo válido de I,21 y citas sustituidas
    os.path.join("passages", "DQ.P1.C21.P0001.json"),
    os.path.join("questions", "DQ.Q.000313.json"),
    os.path.join("questions", "DQ.Q.000318.json"),
    # integración #65 (fusionada): DQ.Q.000107 recibe imagen propia DC-24 y
    # su cita de evidencia se sustituye por la documentada en P0007
    os.path.join("questions", "DQ.Q.000107.json"),
}
n_estructura = 0
for dir_nombre in ("passages", "questions"):
    for nombre in sorted(os.listdir(os.path.join(ruta_paquete, dir_nombre))):
        if not nombre.endswith(".json"):
            continue
        relativa = os.path.join(dir_nombre, nombre)
        actual = leer_json(relativa)
        previo = texto_previo(relativa)
        if previo is None:
            continue
        if dir_nombre == "passages":
            t_actual = actual["text_original"]
            t_previo = normalizado(previo["text_original"])
            if relativa not in PALABRAS_AUTORIZADAS_A_CAMBIAR:
                comprobar(normalizado(t_actual) == t_previo,
                          f"{nombre}: las palabras cambiaron frente al estado plano de la PR")
            comprobar("sha256:" in actual["sha256"] and len(actual["sha256"]) == 71,
                      f"{nombre}: sha256 mal formado")
            if "\n" in t_actual:
                n_estructura += 1
        else:
            for e_prev, e_act in zip(previo.get("evidence", []), actual.get("evidence", [])):
                if "quote" not in e_prev:
                    continue
                if relativa in PALABRAS_AUTORIZADAS_A_CAMBIAR:
                    continue
                comprobar(normalizado(e_act.get("quote", "")) == normalizado(e_prev["quote"]),
                          f"{nombre}: las palabras de una cita cambiaron")

print(f"TEST ESTRUCTURA LITERARIA: pasajes reales con estructura = {n_estructura}")
if FALLOS:
    print(f"  {len(FALLOS)} fallo/s:")
    for f in FALLOS:
        print("  -", f)
    sys.exit(1)
print("OK: prosa envuelta unida; párrafos, títulos, parlamentos y versos "
      "conservados; solo-estructura; idempotente; paquete real verificado")
