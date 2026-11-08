#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Estructura literaria de los textos de PG #2000 (fuente única del cotejo).

Distingue, dentro del txt de PG (líneas duras ~75-76 columnas), los saltos
con VALOR LITERARIO —que se PRESERVAN— de los cortes blandos de maquetación
—que se unen en un espacio:

  * PÁRRAFO (\n\n)  — separación por línea en blanco: párrafos, títulos,
                      estrofas nuevas y cambios de bloque.
  * PARLAMENTO      — la línea siguiente comienza con raya de diálogo «—».
  * VERSO (\n)      — saltos internos de un bloque enteramente formado por
                      líneas cortas (soneto, canción, epitafio, estrofa).

Un corte blando se reconoce por la geometría del envoltorio mecánico: es
blando solo cuando la primera palabra de la línea siguiente NO cabía en el
ancho de columna. Medición empírica sobre el fichero fuente: los cortes
mecánicos tienen holgura >= 76 columnas; los de edición, <= 75, sin zona
gris. Todo párrafo de prosa envuelta contiene alguna línea que supera el
ancho; un bloque de verso, no.

La API trabaja SIEMPRE sobre el fichero fuente completo: un pasaje puede
recortar un párrafo por cualquier punto y la clasificación se hace sobre
párrafos completos. Las PALABRAS del texto dado se conservan EXACTAS
(solo-estructura): nunca se altera contenido ni puntuación, solo se
restituyen los saltos. Idempotente por construcción.
"""
from __future__ import annotations

import re
from difflib import SequenceMatcher

# Ancho del envoltorio mecánico de PG #2000: la palabra siguiente cabía
# (corte de edición) solo si len(l1)+1+len(p2) < ANCHO_LINEA.
ANCHO_LINEA = 76
# Línea «corta» (podría ser verso). La prosa envuelta de PG siempre tiene
# alguna línea por encima de este umbral en cada párrafo de 2+ líneas.
UMBRAL_VERSO = 60

PAR = "\n\n"   # párrafo / título / cambio de bloque
VERSO = "\n"   # salto de verso dentro de una estrofa

_PALABRA = re.compile(r"\S+")


def palabras(texto: str) -> list[str]:
    return _PALABRA.findall(texto)


def plano(texto: str) -> str:
    """Texto en una sola línea (para cotejo e indexación, no para mostrar)."""
    return re.sub(r"\s+", " ", texto).strip()


_FRASE_TERMINA = re.compile(r"[.!?…»\"]\s*$")
_MAYUSCULA_INICIA = re.compile(r"^[A-ZÁÉÍÓÚÜÑ¿¡«(\u2014]")


def _es_frontera_de_bloque(linea_1: str, linea_2: str) -> bool:
    """True si el corte es frontera de frase/bloque: la línea anterior acaba
    con puntuación de cierre de frase y la siguiente arranca por mayúscula.
    Los cortes estrechos a mitad de frase (composición tipográfica) no son
    estructura literaria: se unen."""
    return bool(_FRASE_TERMINA.search(linea_1) and _MAYUSCULA_INICIA.match(linea_2))


_PUNTUACION_VERSO = re.compile(r"[,.;:!?…»\"]\s*$")   # la línea acaba puntuada
_CIERRE_FRASE = re.compile(r"[.!?…]\s*$")             # la línea cierra una frase
_FRASE_INTERIOR = re.compile(r"[.!?…]\s+[A-ZÁÉÍÓÚÜÑ¿¡]")  # frase cerrada dentro de la línea


def _es_distico(linea_1: str, linea_2: str) -> bool:
    """Señal estructural de PAREADO/DÍSTICO auténtico (corrección PR #68).

    Población medida en el fichero fuente: los dísticos reales (12 casos:
    Horacio, romances de Gaiferos, epitafios) presentan la segunda línea con
    puntuación final de verso y la primera SIN cierre de frase — ni al final
    ni dentro de la línea (un punto seguido de mayúscula delata prosa con
    frases múltiples); los encabezados de capítulo partidos por el
    compositor (84 casos) dejan la segunda línea SIN puntuación. Ambas
    líneas cortas y corte de edición (la palabra siguiente cabía). Sin esa
    señal, el par se une y queda registrado para revisión editorial."""
    p2 = _PALABRA.match(linea_2)
    if not p2:
        return False
    cabe = linea_2.startswith("—") or len(linea_1) + 1 + len(p2.group(0)) < ANCHO_LINEA
    return (
        len(linea_1) < UMBRAL_VERSO
        and len(linea_2) < UMBRAL_VERSO
        and cabe
        and _PUNTUACION_VERSO.search(linea_2) is not None
        and _CIERRE_FRASE.search(linea_1) is None
        and _FRASE_INTERIOR.search(linea_1) is None
        and _FRASE_INTERIOR.search(linea_2) is None
    )


def clasificar_parrafo(parrafo: str) -> dict[int, str]:
    """Saltos semánticos de un párrafo completo → {índice de línea: separador}.

    El índice i = separador tras líneas[i] (filtradas de vacías). Los cortes
    mecánicos no aparecen: se unen. Si el párrafo es prosa con cortes de
    edición aislados (ni verso ni parlamento), esos cortes se unen también:
    el valor literario lo da el bloque, no el corte suelto.
    """
    lineas = [l.strip() for l in parrafo.split("\n") if l.strip()]
    if len(lineas) < 2:
        return {}
    cortes: dict[int, str] = {}
    no_mecanicos = 0
    for i in range(len(lineas) - 1):
        l1, l2 = lineas[i], lineas[i + 1]
        p2 = _PALABRA.match(l2).group(0)
        cabe = len(l1) + 1 + len(p2) < ANCHO_LINEA
        if l2.startswith("—"):
            cortes[i] = PAR          # parlamento nuevo
            no_mecanicos += 1
        elif cabe and _es_frontera_de_bloque(l1, l2):
            # corte estrecho que además es frontera de frase/bloque: en el
            # txt de PG hay límites de párrafo del original comprimidos a
            # un solo \n (p. ej. «…de la cuenta.\nEn esto…»).
            cortes[i] = PAR
            no_mecanicos += 1
        elif cabe:
            cortes[i] = VERSO        # candidata a verso
            no_mecanicos += 1
    # Bloque de verso: TODAS las líneas cortas y NINGÚN corte mecánico que
    # atraviese la estrofa. Con dos líneas (pareado) se exige además la
    # señal estructural del dístico (puntuación del verso), para no
    # conservar pares de prosa partida. En caso contrario el párrafo es
    # prosa y solo se conservan los parlamentos y las fronteras de bloque.
    if (
        len(lineas) >= 2
        and all(len(l) < UMBRAL_VERSO for l in lineas)
        and no_mecanicos == len(lineas) - 1
        and (len(lineas) >= 3 or _es_distico(lineas[0], lineas[1]))
    ):
        return {i: VERSO for i in range(len(lineas) - 1)}
    return {i: sep for i, sep in cortes.items() if sep == PAR}


def restaurar_estructura(texto_dado: str, fuente_lf: str, inicio: int, fin: int) -> str:
    """Devuelve `texto_dado` con la estructura literaria del fragmento fuente
    [inicio, fin) del texto `fuente_lf` (fichero completo o texto que contenga
    el fragmento).

    Las PALABRAS del resultado son exactamente las de `texto_dado`; solo se
    restituyen los saltos semánticos del fuente, transferidos por alineación
    palabra a palabra. Las zonas no alineables (variantes de edición) quedan
    en línea con espacios: nunca se inventa estructura.
    """
    pa, pb = _parrafos_de(fuente_lf, inicio, fin)
    expandido = fuente_lf[pa:pb]

    # ---- separadores semánticos del fuente, por índice de palabra expandida
    exp: list[str] = []
    sep_despues: dict[int, str] = {}
    bloques = expandido.split("\n\n")
    for k, parrafo in enumerate(bloques):
        lineas = [l for l in parrafo.split("\n") if l.strip()]
        cortes = clasificar_parrafo(parrafo)
        dentro = 0
        for j, linea in enumerate(lineas):
            dentro += len(_PALABRA.findall(linea))
            if j in cortes:
                sep_despues[len(exp) + dentro - 1] = cortes[j]
        exp.extend(_PALABRA.findall(parrafo))
        if k < len(bloques) - 1 and exp:
            sep_despues[len(exp) - 1] = PAR

    dado_palabras = palabras(plano(texto_dado))
    if not dado_palabras or not exp:
        return texto_dado

    # ---- alineación palabra a palabra (bloques iguales)
    matcher = SequenceMatcher(None, dado_palabras, exp, autojunk=False)
    mapa: dict[int, int] = {}
    for tag, ai, bi, aj, bj in matcher.get_opcodes():
        if tag == "equal":
            for k in range(bi - ai):
                mapa[ai + k] = aj + k

    # ---- reconstrucción: palabras exactas + saltos transferidos
    partes: list[str] = []
    n = len(dado_palabras)
    for i, w in enumerate(dado_palabras):
        partes.append(w)
        if i + 1 >= n:
            break
        ei = mapa.get(i)
        ei_siguiente = mapa.get(i + 1)
        if ei is not None and ei_siguiente == ei + 1:
            partes.append(sep_despues.get(ei, " "))
        else:
            partes.append(" ")  # hueco de variantes: sin estructura garantizada
    return "".join(partes)


def estructurar_segmento(fuente_lf: str, inicio: int, fin: int) -> str:
    """Texto estructurado (palabras verbatim) del rango [inicio, fin)."""
    return restaurar_estructura(plano(fuente_lf[inicio:fin]), fuente_lf, inicio, fin)


def _es_bloque_verso(lineas: list[str]) -> bool:
    """True si las líneas forman un bloque de verso legítimo (todas cortas y
    con todas sus adyacencias de edición: parlamento o corte estrecho; los
    pareados exigen además la señal del dístico)."""
    if len(lineas) < 2 or any(len(l) >= UMBRAL_VERSO for l in lineas):
        return False
    for i in range(len(lineas) - 1):
        l1, l2 = lineas[i], lineas[i + 1]
        p2 = _PALABRA.match(l2)
        if not p2:
            return False
        cabe = l2.startswith("—") or len(l1) + 1 + len(p2.group(0)) < ANCHO_LINEA
        if not cabe:
            return False
    if len(lineas) == 2 and not _es_distico(lineas[0], lineas[1]):
        return False
    return True


def cortes_mecanicos_residuales(texto: str) -> list[str]:
    """Saltos \\n simples que NO pertenecen a un bloque de verso legítimo.

    Detector de residuos para el control de presentación (encargo P1):
    tras la restauración de estructura o la presentación en runtime, todo
    salto simple debe ser verso; los que no lo son son cortes mecánicos de
    maquetación que deben unirse. Devuelve fragmentos descriptivos
    («…final de línea ⏎ inicio de la siguiente…») para el informe.
    """
    residuos: list[str] = []
    for parrafo in texto.replace("\r\n", "\n").split("\n\n"):
        lineas = [l.strip() for l in parrafo.split("\n") if l.strip()]
        if len(lineas) < 2 or _es_bloque_verso(lineas):
            continue
        for i in range(len(lineas) - 1):
            residuos.append(f"…{lineas[i][-32:]} ⏎ {lineas[i + 1][:32]}…")
    return residuos


def _parrafos_de(texto_lf: str, inicio: int, fin: int) -> tuple[int, int]:
    """Expande [inicio, fin) hasta los límites de párrafo del fichero."""
    p0 = texto_lf.rfind("\n\n", 0, max(inicio, 0))
    pa = 0 if p0 == -1 else p0 + 2
    p1 = texto_lf.find("\n\n", fin)
    pb = len(texto_lf) if p1 == -1 else p1
    return pa, pb
