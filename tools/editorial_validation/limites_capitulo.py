#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Límites de capítulo sobre el texto fuente PG #2000 (DQ.SRC.0005).

Prevención de la incidencia P1 (sangrado de I,20 a I,21): la extracción fuzzy
permitía que un pasaje o una cita de un capítulo capturase contenido del
capítulo anterior o siguiente (cola del capítulo + encabezado del propio).

Este módulo localiza los 126 encabezados de capítulo del Quijote (52 de la
primera parte + 74 de la segunda) y expone el rango [inicio, fin) de cada
capítulo. El encabezado del capítulo 1 de cada parte es «Capítulo primero.»
(ordinal), no romano; los demás son «Capítulo <romano>.».

La secuencia se VALIDA de forma estricta: si el fichero no produce exactamente
la secuencia esperada, se lanza ValueError (fail-safe): es preferible abortar
una migración a capturar contenido ajeno. Los offsets son sobre el texto con
saltos LF (la misma convención del paquete y del cotejo).

Uso típico en la extracción:
    rango = rango_de_capitulo(texto_lf, "DQ.P1.C21")
    if not dentro(rango, i0, i1): ...  # bloquear/abortar
"""
from __future__ import annotations

import re

ROMANOS = ("I", "V", "X", "L", "C", "D", "M")
_PATRON = re.compile(r"Capítulo\s+([Pp]rimero|[IVXLC]+)\.")

_TOTAL_P1 = 52
_TOTAL_P2 = 74


def _romano_a_num(r: str) -> int:
    if r.lower() == "primero":
        return 1
    valores = {c: v for v, c in zip((1, 5, 10, 50, 100, 500, 1000), ROMANOS)}
    n = 0
    for i, ch in enumerate(r):
        v = valores[ch]
        if i + 1 < len(r) and valores[r[i + 1]] > v:
            n -= v
        else:
            n += v
    return n


def _secuencia_esperada() -> list[tuple[int, int]]:
    return [(1, n) for n in range(1, _TOTAL_P1 + 1)] + \
           [(2, n) for n in range(1, _TOTAL_P2 + 1)]


def cabeceras(texto_lf: str, estricto: bool = True) -> list[tuple[int, int, int]]:
    """Encabezados de capítulo del Quijote → [(offset, parte, número)].

    Valida que la secuencia sea EXACTAMENTE la esperada (P1: 1–52; P2: 1–74,
    en orden); en caso contrario lanza ValueError (fail-safe). La validación
    estricta se usa en el fichero real y en cualquier extracción; el modo
    estricto=False existe SOLO para fuentes sintéticas de prueba.
    """
    encontrados: list[tuple[int, int, int]] = []
    ultimo: tuple[int, int] | None = None
    for m in _PATRON.finditer(texto_lf):
        num = _romano_a_num(m.group(1))
        # parte 1 mientras no hayamos superado LII tras un ciclo completo:
        # la secuencia esperada es monótona por bloques; inferimos la parte
        # por posición relativa al último encabezado reconocido.
        if ultimo is None:
            parte = 1
        else:
            prev_p, prev_n = ultimo
            if prev_p == 1 and num == 1 and prev_n == _TOTAL_P1:
                parte = 2  # arranque de la segunda parte
            elif prev_p == 2 and num == 1 and prev_n == _TOTAL_P2:
                parte = 1  # reinicio anómalo: la validación final lo rechaza
            else:
                parte = prev_p
        encontrados.append((m.start(), parte, num))
        ultimo = (parte, num)

    esperada = _secuencia_esperada()
    actual = [(p, n) for _o, p, n in encontrados]
    if estricto and actual != esperada:
        raise ValueError(
            "Secuencia de encabezados de capítulo inesperada en el texto "
            f"fuente: {len(actual)} encabezados; se esperaban "
            f"{len(esperada)} en orden (P1 1–{_TOTAL_P1}, P2 1–{_TOTAL_P2}). "
            "Extracción abortada por seguridad (limites_capitulo).")
    return encontrados


def rangos(texto_lf: str, estricto: bool = True) -> dict[tuple[int, int], tuple[int, int]]:
    """Rango [inicio, fin) de cada capítulo sobre el texto LF.

    El rango COMIENZA en el encabezado del propio capítulo y termina donde
    empieza el siguiente (el último llega al final del fichero).
    """
    caps = cabeceras(texto_lf, estricto=estricto)
    salida: dict[tuple[int, int], tuple[int, int]] = {}
    for i, (offset, parte, num) in enumerate(caps):
        fin = caps[i + 1][0] if i + 1 < len(caps) else len(texto_lf)
        salida[(parte, num)] = (offset, fin)
    return salida


def rango_de_capitulo(texto_lf: str, chapter_id: str, estricto: bool = True) -> tuple[int, int]:
    """Rango del capítulo de un id contractual (p. ej. 'DQ.P1.C21')."""
    m = re.fullmatch(r"DQ\.P([12])\.C(\d{1,2})", chapter_id)
    if not m:
        raise ValueError(f"chapter_id no reconocido: {chapter_id}")
    clave = (int(m.group(1)), int(m.group(2)))
    return rangos(texto_lf, estricto=estricto)[clave]


def dentro(rango: tuple[int, int], inicio: int, fin: int) -> bool:
    """True si [inicio, fin) queda íntegramente dentro del rango del capítulo.

    Es la restricción que debe imponer cualquier extracción fuzzy: un pasaje
    o una cita nunca puede cruzar los límites del capítulo al que pertenece.
    """
    return rango[0] <= inicio and fin <= rango[1]


def encabezado_en(texto_lf: str, inicio: int, fin: int) -> str | None:
    """Texto del encabezado de capítulo comprendido en [inicio, fin), si lo hay."""
    for offset, parte, num in cabeceras(texto_lf):
        if inicio <= offset < fin:
            fin_linea = texto_lf.find("\n", offset)
            return texto_lf[offset:fin_linea if fin_linea != -1 else fin]
    return None
