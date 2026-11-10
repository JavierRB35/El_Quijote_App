#!/usr/bin/env python3
"""DC-35: verifica bytes, SHA-256, dimensiones y catálogo de escenas aprobadas.

Este control binario no sustituye fidelidad literaria, derechos ni QA visual
DC-28/TS-001. Evita dar por presentes imágenes únicamente por su nombre.
"""
from __future__ import annotations

import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def dimensiones_webp(datos: bytes) -> tuple[int, int]:
    """Lee VP8, VP8L o VP8X usando únicamente la biblioteca estándar."""
    if len(datos) < 30 or datos[:4] != b"RIFF" or datos[8:12] != b"WEBP":
        raise ValueError("contenedor RIFF/WEBP inválido")
    if int.from_bytes(datos[4:8], "little") + 8 != len(datos):
        raise ValueError("longitud RIFF incoherente")
    cursor = 12
    while cursor + 8 <= len(datos):
        tipo = datos[cursor:cursor + 4]
        longitud = int.from_bytes(datos[cursor + 4:cursor + 8], "little")
        inicio = cursor + 8
        fin = inicio + longitud
        if fin > len(datos):
            raise ValueError("chunk WebP truncado")
        payload = datos[inicio:fin]
        if tipo == b"VP8X":
            if len(payload) < 10:
                raise ValueError("cabecera VP8X incompleta")
            return (1 + int.from_bytes(payload[4:7], "little"),
                    1 + int.from_bytes(payload[7:10], "little"))
        if tipo == b"VP8 ":
            if len(payload) < 10 or payload[3:6] != b"\x9d\x01\x2a":
                raise ValueError("cabecera VP8 inválida")
            return (int.from_bytes(payload[6:8], "little") & 0x3FFF,
                    int.from_bytes(payload[8:10], "little") & 0x3FFF)
        if tipo == b"VP8L":
            if len(payload) < 5 or payload[0] != 0x2F:
                raise ValueError("cabecera VP8L inválida")
            empaquetado = int.from_bytes(payload[1:5], "little")
            return (1 + (empaquetado & 0x3FFF),
                    1 + ((empaquetado >> 14) & 0x3FFF))
        cursor = fin + (longitud & 1)
    raise ValueError("sin chunk VP8, VP8L o VP8X")


# Excepción dimensional expresa del propietario (2026-11-10), limitada a este
# archivo H07 original: 1670x941. No se altera el binario aprobado ni se amplía
# la tolerancia a otras imágenes. SHA-256 y dimensiones del manifiesto siguen
# comprobándose obligatoriamente.
EXCEPCIONES_DIMENSIONES_I2 = {
    ("p1_c02_h07_ventero_acogida_story", "assets/scenes/part_1/chapter_02/p1_c02_h07_ventero_acogida_story.webp"): (1670, 941),
}


def ejecutar(raiz: Path = ROOT) -> tuple[list[str], int, list[str]]:
    catalogo = json.loads((raiz / "assets/scenes/manifest.json").read_text(encoding="utf-8"))
    imagenes = catalogo["images"]
    aprobados = [m for m in imagenes if m.get("review_state") == "aprobada"]
    errores: list[str] = []
    avisos: list[str] = []
    ids: set[str] = set()
    rutas: set[str] = set()
    raiz_media = (raiz / "assets/scenes").resolve()
    for imagen in imagenes:
        identificador, ruta = imagen["id"], imagen["relative_path"]
        if identificador in ids:
            errores.append(f"{identificador}: identificador duplicado")
        if ruta in rutas:
            errores.append(f"{identificador}: ruta duplicada: {ruta}")
        ids.add(identificador)
        rutas.add(ruta)
    for imagen in aprobados:
        identificador = imagen["id"]
        ruta = imagen["relative_path"]
        fichero = (raiz / ruta).resolve()
        if not fichero.is_relative_to(raiz_media):
            errores.append(f"{identificador}: ruta ajena a assets/scenes")
            continue
        if not fichero.is_file():
            errores.append(f"{identificador}: falta el archivo WebP: {ruta}")
            continue
        datos = fichero.read_bytes()
        if imagen.get("mime_type") != "image/webp":
            errores.append(f"{identificador}: MIME declarado distinto de image/webp")
        esperado = imagen.get("sha256", "")
        if not isinstance(esperado, str) or not re.fullmatch(r"[0-9a-f]{64}", esperado):
            errores.append(f"{identificador}: SHA-256 no válido")
        elif hashlib.sha256(datos).hexdigest() != esperado:
            errores.append(f"{identificador}: SHA-256 no coincide con los bytes")
        if imagen.get("historical_editorial_status") != "approved_owner_visual":
            errores.append(f"{identificador}: falta constancia de aprobación del propietario")
        try:
            dimensiones = dimensiones_webp(datos)
        except ValueError as exc:
            errores.append(f"{identificador}: {exc}")
            continue
        declaradas = (imagen.get("width_px"), imagen.get("height_px"))
        if dimensiones != declaradas:
            errores.append(f"{identificador}: dimensiones reales {dimensiones}, catálogo {declaradas}")
        if ((imagen.get("part"), imagen.get("chapter")) == (1, 2)
                and dimensiones != (1672, 941)
                and EXCEPCIONES_DIMENSIONES_I2.get((identificador, ruta)) != dimensiones):
            avisos.append(
                f"{identificador}: {dimensiones[0]}x{dimensiones[1]} frente a 1672x941 "
                "(pendiente de evaluar la desviación del encargo artístico)"
            )
    return errores, len(aprobados), avisos


if __name__ == "__main__":
    fallos, total, avisos = ejecutar()
    for aviso in avisos:
        print("WARN DC-35:", aviso)
    for fallo in fallos:
        print("FAIL DC-35:", fallo, file=sys.stderr)
    print(f'{"FAIL" if fallos else "PASS"} DC-35: {total} WebP aprobados verificados')
    sys.exit(bool(fallos))
