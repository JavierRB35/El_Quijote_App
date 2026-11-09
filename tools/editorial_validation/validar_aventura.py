#!/usr/bin/env python3
"""DC-34: valida los catálogos JSON de rondas narrativas de Aventura."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator

ROOT = Path(__file__).resolve().parents[2]
SCHEMA = ROOT / "schemas/content/adventure-round.schema.json"
CATALOGOS = ROOT / "content/aventura"


def validar_catalogo(datos: dict[str, Any], archivo: Path, raiz: Path = ROOT) -> list[str]:
    """Contrato, unicidad, pasajes e imágenes. Retorna los IDs sin pasaje fraccionado."""
    esquema = json.loads((raiz / "schemas/content/adventure-round.schema.json").read_text(encoding="utf-8"))
    errores = sorted(Draft202012Validator(esquema).iter_errors(datos), key=lambda e: tuple(map(str, e.path)))
    if errores:
        error = errores[0]
        raise ValueError(f"ESQUEMA {archivo}: {'.'.join(map(str, error.path))}: {error.message}")

    capitulo = re.fullmatch(r"DQ\.P([12])\.C(\d{2})", datos["capituloId"])
    assert capitulo is not None
    ruta_esperada = (raiz / f"content/aventura/parte_{capitulo.group(1)}/capitulo_{capitulo.group(2)}.json").resolve()
    if archivo.resolve() != ruta_esperada:
        raise ValueError(f"RUTA: {archivo} debe ser {ruta_esperada}")
    if not datos["episodioId"].startswith(datos["capituloId"] + ".E"):
        raise ValueError("EPISODIO: no corresponde al capítulo del paquete")
    if not (raiz / datos["fuente"]["ruta"]).is_file():
        raise ValueError("FUENTE: falta el corpus textual local DC-31")
    if datos["estado_editorial"] == "aprobado" and datos["revision_visual"] != "verificada":
        raise ValueError("REVISION_VISUAL: aprobación sin QA visual verificable")

    ids: set[str] = set()
    preimagenes: set[str] = set()
    pendientes: list[str] = []
    for ronda in datos["rondas"]:
        rid = ronda["id"]
        if rid in ids:
            raise ValueError(f"ID_DUPLICADO: {rid}")
        ids.add(rid)
        romano = "I" if capitulo.group(1) == "1" else "II"
        if not rid.startswith(f"AV2-{romano}{int(capitulo.group(2))}-"):
            raise ValueError(f"CAPITULO_RONDA: {rid} no corresponde al capítulo")
        opciones = [o["id"] for o in ronda["opciones"]]
        if len(set(opciones)) != len(opciones):
            raise ValueError(f"OPCIONES_DUPLICADAS: {rid}")
        if opciones.count(ronda["correcta"]) != 1:
            raise ValueError(f"RESPUESTA_CANONICA: {rid}")
        previa = ronda["imagenPrevia"]["uri"]
        if previa in preimagenes:
            raise ValueError(f"PREIMAGEN_REPETIDA: {rid}")
        preimagenes.add(previa)
        for campo in ("imagenPrevia", "imagenConsecuencia"):
            item = ronda[campo]
            uri = item["uri"]
            recurso = (raiz / "assets" / uri.removeprefix("assets://")).resolve()
            if not recurso.is_relative_to((raiz / "assets").resolve()) or not recurso.is_file():
                raise ValueError(f"IMAGEN_INEXISTENTE: {rid} → {uri}")
            if medio := item.get("medioId"):
                fichas = [raiz / "content/piloto/media_assets" / f"{medio}.json",
                          raiz / "content/media_assets" / f"{medio}.json"]
                if not any(p.is_file() for p in fichas):
                    raise ValueError(f"MEDIA_ID_INEXISTENTE: {rid} → {medio}")
        pasaje = ronda["pasajeId"]
        if pasaje is None:
            pendientes.append(rid)
        else:
            if not pasaje.startswith(datos["capituloId"] + ".P"):
                raise ValueError(f"PASAJE_CAPITULO_INCORRECTO: {rid} → {pasaje}")
            fichas = [raiz / "content/piloto/passages" / f"{pasaje}.json",
                      raiz / "content/passages" / f"{pasaje}.json"]
            if not any(p.is_file() for p in fichas):
                raise ValueError(f"PASAJE_INEXISTENTE: {rid} → {pasaje}")
    if sorted(pendientes) != sorted(datos["pendientes_editoriales"]):
        raise ValueError("PENDIENTES_NO_DECLARADOS: deben declararse los pasajes nulos")
    return pendientes


def ejecutar() -> int:
    archivos = sorted(CATALOGOS.glob("parte_*/capitulo_*.json"))
    if not archivos:
        raise ValueError("SIN_CATALOGO: no hay JSON de rondas")
    ids_globales: set[str] = set()
    total = 0
    for archivo in archivos:
        datos = json.loads(archivo.read_text(encoding="utf-8"))
        pendientes = validar_catalogo(datos, archivo)
        repetidos = ids_globales.intersection(r["id"] for r in datos["rondas"])
        if repetidos:
            raise ValueError(f"ID_GLOBAL_DUPLICADO: {sorted(repetidos)}")
        ids_globales.update(r["id"] for r in datos["rondas"])
        total += len(datos["rondas"])
        print(f"PASS {archivo.relative_to(ROOT)}: {len(datos['rondas'])} rondas; "
              f"estado={datos['estado_editorial']}; QA visual={datos['revision_visual']}; "
              f"anclas pendientes={len(pendientes)}")
    print(f"PASS DC-34: {len(archivos)} catálogos, {total} rondas")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(ejecutar())
    except (ValueError, OSError, json.JSONDecodeError) as error:
        print(f"FAIL DC-34: {error}", file=sys.stderr)
        sys.exit(1)
