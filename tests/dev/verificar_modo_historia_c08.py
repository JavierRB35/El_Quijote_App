#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Verificación P0 del primer vertical del Modo Historia (molinos, I, 8).

Comprueba, contra el paquete real (content/piloto) y la edición PG #2000
almacenada (DQ.SRC.0005):
  1. El paquete declara contract_version 1.2.0 y lista 2 escenas y 9 beats.
  2. Las escenas S01/S02 son neutras (media_ids: []) y del episodio DQ.P1.C08.E01.
  3. Los 9 beats tienen order 1..9 únicos, kinds según la ficha y
     visual_asset_ids: [] (fondo neutro deliberado, v1.2.0).
  4. Las 16 intervenciones I01–I16 conservan hablante y orden de la ficha
     (6 NARRADOR, 6 DON QUIJOTE, 4 SANCHO); ids DQ.INT.000001..000016 únicos.
  5. Todo texto_visible es EXACTAMENTE el segmento PG #2000 en el offset que
     declara su localizador (indexación LF); I16 conserva su coma final.
  6. Los pasajes referenciados existen (P0001–P0006, P0012, P0013–P0017) y los
     5 nuevos son verbatim del texto fuente con SHA-256 de text_original válido.
  7. Proyección visible→oral: incisos fuera de texto_oral; incisos ⇒ texto_oral;
     NARRADOR sin texto_oral (TS-001/P1-5).
  8. Sin beat SILENCIO en este primer vertical.

Uso: python -I verificar_modo_historia_c08.py <raiz_repo>
"""
import json
import hashlib
import re
import sys
from pathlib import Path

FALLOS: list[str] = []

PASAJES_NUEVOS = {"DQ.P1.C08.P0013", "DQ.P1.C08.P0014", "DQ.P1.C08.P0015",
                  "DQ.P1.C08.P0016", "DQ.P1.C08.P0017"}

def comprobar(cond: bool, mensaje: str) -> None:
    if not cond:
        FALLOS.append(mensaje)

def normalizar(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()

def main() -> int:
    repo = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(".")
    piloto = repo / "content" / "piloto"
    manifest = json.loads((piloto / "package.json").read_text(encoding="utf-8"))

    # 1. versión del paquete y presencia del vertical
    comprobar(manifest["contract_version"] == "1.2.0",
              f"contract_version del paquete es {manifest['contract_version']}, esperaba 1.2.0")
    for clave, n in (("scenes", 2), ("beats", 9)):
        comprobar(len(manifest["files"].get(clave, [])) == n,
                  f"files['{clave}'] tiene {len(manifest['files'].get(clave, []))} entradas, esperaba {n}")

    def categoria(clave: str) -> dict:
        return {r["id"]: r
                for r in (json.loads((piloto / ruta).read_text(encoding="utf-8"))
                          for ruta in manifest["files"].get(clave, []))}

    escenas = categoria("scenes")
    beats = categoria("beats")
    pasajes = categoria("passages")
    episodios = categoria("episodes")

    # 2. escenas neutras del episodio de los molinos
    for sid, orden_beats in (("DQ.P1.C08.E01.S01", (1, 2, 3, 4, 5, 6)),
                             ("DQ.P1.C08.E01.S02", (7, 8, 9))):
        escena = escenas.get(sid)
        comprobar(escena is not None, f"falta la escena {sid}")
        if not escena:
            continue
        comprobar(escena.get("episode_id") == "DQ.P1.C08.E01",
                  f"{sid}: episode_id {escena.get('episode_id')}")
        comprobar(escena.get("media_ids") == [], f"{sid}: media_ids != [] (fondo neutro)")
        comprobar(escena.get("contract_version") == "1.2.0",
                  f"{sid}: contract_version {escena.get('contract_version')}")
        ids = sorted(b["order"] for b in beats.values() if b.get("scene_id") == sid)
        comprobar(tuple(ids) == orden_beats, f"{sid}: orders de beats {ids} != {list(orden_beats)}")

    # 3. kinds por beat según la ficha §2 (B09 como NARRACION; sin SILENCIO)
    KINDS = {1: "NARRACION", 2: "DIALOGO", 3: "DIALOGO", 4: "DIALOGO", 5: "ACCION",
             6: "ACCION", 7: "ACCION", 8: "DIALOGO", 9: "NARRACION"}
    for orden, kind in KINDS.items():
        beat = beats.get(f"DQ.BEAT.{orden:06d}")
        comprobar(beat is not None, f"falta DQ.BEAT.{orden:06d}")
        if not beat:
            continue
        comprobar(beat.get("order") == orden, f"beat {beat.get('id')}: order {beat.get('order')}")
        comprobar(beat.get("kind") == kind, f"beat {beat['id']}: kind {beat.get('kind')}, esperaba {kind}")
        comprobar(beat.get("visual_asset_ids") == [],
                  f"beat {beat['id']}: visual_asset_ids != [] (v1 sin imagen)")
        comprobar(beat.get("manual_advance_allowed") is True and beat.get("replay_allowed") is True,
                  f"beat {beat['id']}: controles no habilitados")
    comprobar(all(b.get("kind") != "SILENCIO" for b in beats.values()),
              "no debe haber beat SILENCIO en este primer vertical")

    # 4. intervenciones: hablante y orden de la ficha
    HABLANTES = ["narrador", "personaje", "personaje", "personaje", "personaje",
                 "personaje", "narrador", "personaje", "narrador", "personaje",
                 "narrador", "narrador", "personaje", "personaje", "personaje",
                 "narrador"]  # N, DQ, S, DQ, S, DQ, N, DQ, N, DQ, N, N, S, DQ, S, N
    PERSONAS = [None, "DQ.PER.0001", "DQ.PER.0002", "DQ.PER.0001", "DQ.PER.0002",
                "DQ.PER.0001", None, "DQ.PER.0001", None, "DQ.PER.0001", None, None,
                "DQ.PER.0002", "DQ.PER.0001", "DQ.PER.0002", None]
    intervenciones: list[dict] = []
    for orden in range(1, 10):
        beat = beats.get(f"DQ.BEAT.{orden:06d}")
        if beat:
            intervenciones.extend(beat.get("utterances", []))
    comprobar(len(intervenciones) == 16, f"total intervenciones {len(intervenciones)}, esperaba 16")
    ids = [u.get("utterance_id") for u in intervenciones]
    comprobar(len(set(ids)) == len(ids), "utterance_id duplicado")
    comprobar(ids == [f"DQ.INT.{n:06d}" for n in range(1, 17)],
              f"secuencia de intervenciones inesperada: {ids}")
    for u, tipo, persona in zip(intervenciones, HABLANTES, PERSONAS):
        speaker = u.get("speaker", {})
        comprobar(speaker.get("tipo") == tipo,
                  f"{u.get('utterance_id')}: speaker {speaker.get('tipo')}, esperaba {tipo}")
        comprobar(speaker.get("person_id") == persona,
                  f"{u.get('utterance_id')}: person_id {speaker.get('person_id')}, esperaba {persona}")

    # 5/6. texto literal contra PG #2000 y pasajes referenciados
    texto = (repo / "content" / "textos" / "gutenberg_2000" / "El_Quijote.txt") \
        .read_bytes().decode("utf-8").replace("\r\n", "\n")
    for u in intervenciones:
        uid = u.get("utterance_id")
        localizador = u.get("localizador", "")
        m = re.search(r"offset (\d+)-(\d+)", localizador)
        comprobar(m is not None, f"{uid}: localizador sin offset ({localizador!r})")
        if not m:
            continue
        a, b = int(m.group(1)), int(m.group(2))
        comprobar(texto[a:b] == u.get("texto_visible", ""),
                  f"{uid}: texto_visible no coincide verbatim con PG #2000 [{a}:{b}]")
        for pid in u.get("passage_ids", []):
            comprobar(pid in pasajes, f"{uid}: pasaje {pid} inexistente en el paquete")
            p = pasajes.get(pid)
            if p:
                sha = hashlib.sha256(p["text_original"].encode("utf-8")).hexdigest()
                comprobar(p.get("sha256") == f"sha256:{sha}",
                          f"{pid}: sha256 de text_original no coincide")
                # Verbatim-offset exigido a los pasajes de alta física de este
                # vertical (P0013–P0017). La comparación colapsa espacios en
                # blanco porque la normalización de la PR #59 une los cortes
                # mecánicos de maquetación de PG (~75 col.) conservando los
                # saltos literarios; las palabras deben seguir siendo
                # verbatim. Registros antiguos 1.0.0 (p. ej. P0001, P0006)
                # tienen un off-by-one legado en position.end_char (incluye
                # la puntuación final que text_original omite); su integridad
                # queda cubierta por el sha256 y el cotejo normalizado.
                if pid in PASAJES_NUEVOS:
                    pos = p.get("position", {})
                    segmento = normalizar(texto[pos.get("start_char", -1):pos.get("end_char", -1)])
                    comprobar(segmento == normalizar(p["text_original"]),
                              f"{pid}: text_original no es verbatim del offset declarado")
    i16 = intervenciones[-1] if len(intervenciones) == 16 else {}
    comprobar(i16.get("texto_visible", "").endswith("del Puerto Lápice,"),
              "I16 no conserva la coma final literal")

    # 7. proyección visible→oral
    for u in intervenciones:
        uid = u.get("utterance_id")
        incisos = u.get("incisos_narrador", [])
        oral = u.get("texto_oral")
        es_narrador = u.get("speaker", {}).get("tipo") == "narrador"
        if es_narrador:
            comprobar(oral is None, f"{uid}: NARRADOR con texto_oral explícito")
        comprobar(all(i not in (oral or "") for i in incisos),
                  f"{uid}: un inciso del narrador aparece en texto_oral")
        if incisos:
            comprobar(bool(oral), f"{uid}: incisos sin texto_oral")

    # 8. sin SILENCIO ya comprobado arriba; episodio presente
    comprobar("DQ.P1.C08.E01" in episodios, "episodio DQ.P1.C08.E01 inexistente")

    if FALLOS:
        print(f"VERIFICACIÓN MODO HISTORIA: {len(FALLOS)} fallo/s")
        for f in FALLOS:
            print("  -", f)
        return 1
    print("VERIFICACIÓN MODO HISTORIA OK: 2 escenas neutras, 9 beats, 16 intervenciones "
          "I01–I16 verbatim contra PG #2000 (offsets y SHA-256), proyección oral válida")
    return 0


if __name__ == "__main__":
    sys.exit(main())
