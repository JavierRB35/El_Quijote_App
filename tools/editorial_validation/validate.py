#!/usr/bin/env python3
"""Validador del contrato editorial-técnico — El_Quijote_App (FASE 0, encargo §6.3).

Uso:
    python validate.py file <ruta.json> [--gate app|repo]
    python validate.py package <manifest.json>
    python validate.py suite <directorio_fixtures> [--json salida.json]

Códigos de error:
    SCHEMA_ERROR                 violación del JSON Schema de la entidad
    SEMANTIC_ERROR               violación de reglas semánticas intra-registro
    REFERENCE_ERROR              referencia a ID inexistente dentro del paquete
    LICENSE_NOT_VERIFIED         activo con licencia no verificada (no publicable)
    ALLOWED_USE_MISSING          activo sin el uso permitido exigido por la puerta
    CONTRACT_VERSION_UNSUPPORTED versión de contrato no soportada por el validador
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator, FormatChecker

REPO_ROOT = Path(__file__).resolve().parents[2]
SCHEMA_ROOT = REPO_ROOT / "schemas"

SUPPORTED_CONTRACT_VERSIONS = {"1.0.0", "1.1.0"}
APP_GATE_USES = {"uso_personal_app"}
REPO_GATE_USES = {"uso_personal_app", "almacenamiento_repo_git"}

FORMATOS_AUDIO = {"mp3", "ogg"}

SCHEMA_BY_CATEGORY = {
    "edition": "content/edition.schema.json",
    "chapter": "content/chapter.schema.json",
    "passage": "content/passage.schema.json",
    "episode": "content/episode.schema.json",
    "scene": "content/scene.schema.json",
    "question": "content/question.schema.json",
    "discovery": "content/discovery.schema.json",
    "person": "content/person.schema.json",
    "place": "content/place.schema.json",
    "museum_item": "content/museum-item.schema.json",
    "beat": "content/beat.schema.json",
    "media_asset": "media/media-asset.schema.json",
    "source": "media/source.schema.json",
    "license": "media/license.schema.json",
    "profile": "player/profile.schema.json",
    "content_package": "manifests/content-package.schema.json",
}

PACKAGE_CATEGORIES = set(SCHEMA_BY_CATEGORY) - {"profile", "content_package"}

# Claves del manifest (plural) -> categoría de esquema (singular)
FILES_KEY_TO_CATEGORY = {
    "editions": "edition", "chapters": "chapter", "passages": "passage", "episodes": "episode",
    "scenes": "scene", "questions": "question", "discoveries": "discovery", "persons": "person",
    "places": "place", "museum_items": "museum_item", "media_assets": "media_asset",
    "sources": "source", "licenses": "license", "beats": "beat",
}
# Categoría -> clave del índice de referencias usado por crossref_errors()
CATEGORY_TO_INDEX = {
    "edition": "editions", "chapter": "chapters", "passage": "passages", "episode": "episodes",
    "scene": "scenes", "question": "questions", "discovery": "discoveries", "person": "persons",
    "place": "places", "museum_item": "museum_items", "media_asset": "media",
    "source": "sources", "license": "licenses", "beat": "beats",
}


def load_json(path: Path) -> Any:
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)


def _resolve_node(node: Any, base_dir: Path, depth: int = 0) -> Any:
    """Resuelve $ref locales del tipo '<fichero>#/puntero/json' relativos al esquema actual."""
    if depth > 16:
        raise RuntimeError("Profundidad de $ref excesiva (¿ciclo?)")
    if isinstance(node, dict):
        ref = node.get("$ref")
        if isinstance(ref, str) and not ref.startswith("#"):
            fname, _, pointer = ref.partition("#")
            target_path = base_dir / fname
            target = load_json(target_path)
            for part in pointer.strip("/").split("/"):
                if part:
                    target = target[part.replace("~1", "/").replace("~0", "~")]
            # Los $ref anidados dentro del fichero destino se resuelven respecto a SU propio directorio.
            resolved = _resolve_node(target, target_path.parent, depth + 1)
            siblings = {k: _resolve_node(v, base_dir, depth + 1) for k, v in node.items() if k != "$ref"}
            if siblings:
                # Semántica draft 2020-12: el $ref y sus claves hermanas se aplican TODAS.
                return {**resolved, **siblings}
            return resolved
        return {k: _resolve_node(v, base_dir, depth + 1) for k, v in node.items()}
    if isinstance(node, list):
        return [_resolve_node(item, base_dir, depth + 1) for item in node]
    return node


_SCHEMA_CACHE: dict[tuple[str, int], Draft202012Validator] = {}


def validator_for(category: str) -> Draft202012Validator:
    rel = SCHEMA_BY_CATEGORY[category]
    path = SCHEMA_ROOT / rel
    stamp = path.stat().st_mtime_ns
    key = (category, stamp)
    if key not in _SCHEMA_CACHE:
        schema = _resolve_node(load_json(path), path.parent)
        _SCHEMA_CACHE[key] = Draft202012Validator(schema, format_checker=FormatChecker())
    return _SCHEMA_CACHE[key]


def schema_errors(instance: Any, category: str) -> list[str]:
    v = validator_for(category)
    return [e.message for e in v.iter_errors(instance)]


# ---------------------------------------------------------------- semántica

def question_semantic_errors(q: dict) -> list[str]:
    errs: list[str] = []
    inter = q["interaction"]
    qid = q["id"]
    opts = inter["options"]
    ids = [o["id"] for o in opts]
    prefix = qid + ".O"
    if len(set(ids)) != len(ids):
        errs.append("IDs de opción duplicados")
    for oid in ids:
        if not oid.startswith(prefix):
            errs.append(f"Opción '{oid}' no respeta el prefijo '{prefix}NN'")
    correct = inter.get("correct_option_ids", [])
    for cid in correct:
        if cid not in ids:
            errs.append(f"correct_option_ids referencia una opción inexistente: '{cid}'")
    t = inter["type"]
    if t in ("single_choice", "true_false") and len(correct) != 1:
        errs.append(f"{t} exige exactamente una respuesta correcta")
    if t == "multi_choice" and len(correct) < 2:
        errs.append("multi_choice exige al menos dos respuestas correctas")
    if t == "ordering":
        order = inter.get("correct_order", [])
        if set(order) != set(ids) or len(order) != len(ids):
            errs.append("correct_order debe contener TODAS las opciones, una sola vez cada una")
    if t == "matching":
        lefts = [p["left"] for p in inter.get("pairs", [])]
        rights = [p["right"] for p in inter.get("pairs", [])]
        for oid in lefts + rights:
            if oid not in ids:
                errs.append(f"pairs referencia una opción inexistente: '{oid}'")
        if len(set(lefts)) != len(lefts) or len(set(rights)) != len(rights):
            errs.append("pairs reutiliza un elemento del mismo lado")
        if set(lefts) & set(rights):
            errs.append("un mismo ID aparece como izquierda y derecha en pairs")
    if t == "hotspot":
        area = inter.get("hotspot_area")
        if area and (area["x"] + area["w"] > 1 or area["y"] + area["h"] > 1):
            errs.append(
                f"hotspot_area fuera de imagen: x+w={area['x'] + area['w']:.2f}, y+h={area['y'] + area['h']:.2f}"
            )
    has_interpretation = any(ev["kind"] == "interpretacion_editorial" for ev in q["evidence"])
    textual = q["certainty"] in ("TEXTO_EXPLICITO", "HECHO_HISTORICO_DOCUMENTADO")
    if has_interpretation and textual:
        errs.append("evidence 'interpretacion_editorial' incompatible con certainty textual: "
                    "no se fabrica verdad única sobre interpretaciones")
    return errs


def media_gate_errors(m: dict, gate: str) -> list[str]:
    errs: list[str] = []
    required = REPO_GATE_USES if gate == "repo" else APP_GATE_USES
    if m.get("license_status") != "verificada":
        errs.append("LICENSE_NOT_VERIFIED: 'desconocida/pendiente' no equivale a autorizada; "
                    "publicación exige licencia verificada")
    uses = set(m.get("allowed_uses", []))
    missing = required - uses
    if missing:
        errs.append(f"ALLOWED_USE_MISSING: la puerta '{gate}' exige {sorted(required)}; falta {sorted(missing)}")
    return errs


def crossref_errors(entity: dict, category: str, index: dict[str, set[str]]) -> list[str]:
    errs: list[str] = []

    def chk(value: Any, target: str, where: str) -> None:
        if value is None:
            return
        values = value if isinstance(value, list) else [value]
        for v in values:
            if v not in index[target]:
                errs.append(f"REFERENCE_ERROR en {where}: '{v}' no existe en '{target}'")

    if category == "chapter":
        chk(entity.get("edition_id"), "editions", f"chapter {entity['id']}.edition_id")
    elif category == "passage":
        chk(entity.get("chapter_id"), "chapters", f"passage {entity['id']}.chapter_id")
    elif category == "episode":
        chk(entity.get("chapters"), "chapters", f"episode {entity['id']}.chapters")
        chk(entity.get("actors"), "persons", f"episode {entity['id']}.actors")
        chk(entity.get("places"), "places", f"episode {entity['id']}.places")
        chk(entity.get("passages"), "passages", f"episode {entity['id']}.passages")
    elif category == "scene":
        chk(entity.get("episode_id"), "episodes", f"scene {entity['id']}.episode_id")
        chk(entity.get("media_ids"), "media", f"scene {entity['id']}.media_ids")
        for layer in entity.get("layers", []):
            chk(layer.get("media_id"), "media", f"scene {entity['id']}.layers")
        for hs in entity.get("hotspots", []):
            chk(hs.get("media_id"), "media", f"scene {entity['id']}.hotspots")
    elif category == "question":
        chk(entity.get("episode_id"), "episodes", f"question {entity['id']}.episode_id")
        chk(entity.get("chapter_ids"), "chapters", f"question {entity['id']}.chapter_ids")
        chk(entity.get("passage_ids"), "passages", f"question {entity['id']}.passage_ids")
        chk(entity.get("scene_id"), "scenes", f"question {entity['id']}.scene_id")
        vr = entity.get("visual_requirements", {})
        chk(vr.get("pre_image_media_id"), "media", f"question {entity['id']}.visual_requirements")
        chk(vr.get("hotspot_media_id"), "media", f"question {entity['id']}.visual_requirements")
        for ev in entity.get("evidence", []):
            chk(ev.get("passage_id"), "passages", f"question {entity['id']}.evidence")
            chk(ev.get("source_id"), "sources", f"question {entity['id']}.evidence")
    elif category == "discovery":
        chk(entity.get("appearance", {}).get("episode_id"), "episodes", f"discovery {entity['id']}.appearance")
        chk(entity.get("passages"), "passages", f"discovery {entity['id']}.passages")
        chk(entity.get("bibliography"), "sources", f"discovery {entity['id']}.bibliography")
        chk(entity.get("asset_ids"), "media", f"discovery {entity['id']}.asset_ids")
        chk(entity.get("speaker", {}).get("person_id"), "persons", f"discovery {entity['id']}.speaker")
    elif category == "person":
        for rel in entity.get("relations", []):
            chk(rel.get("person_id"), "persons", f"person {entity['id']}.relations")
        chk(entity.get("historical_ref", {}).get("source_id"), "sources", f"person {entity['id']}.historical_ref")
        chk(entity.get("appearances"), "episodes", f"person {entity['id']}.appearances")
    elif category == "place":
        chk(entity.get("chapters"), "chapters", f"place {entity['id']}.chapters")
        chk(entity.get("sources"), "sources", f"place {entity['id']}.sources")
        for link in entity.get("heritage_links", []):
            chk(link.get("media_id"), "media", f"place {entity['id']}.heritage_links")
    elif category == "museum_item":
        chk(entity.get("chapters"), "chapters", f"museum_item {entity['id']}.chapters")
        chk(entity.get("media_ids"), "media", f"museum_item {entity['id']}.media_ids")
        chk(entity.get("source_id"), "sources", f"museum_item {entity['id']}.source_id")
        chk(entity.get("license_id"), "licenses", f"museum_item {entity['id']}.license_id")
    elif category == "media_asset":
        chk(entity.get("source_id"), "sources", f"media_asset {entity['id']}.source_id")
        chk(entity.get("license_id"), "licenses", f"media_asset {entity['id']}.license_id")
    elif category == "beat":
        chk(entity.get("scene_id"), "scenes", f"beat {entity['id']}.scene_id")
        chk(entity.get("visual_asset_ids"), "media", f"beat {entity['id']}.visual_asset_ids")
        for utt in entity.get("utterances", []):
            uid = utt.get("utterance_id", "?")
            chk(utt.get("speaker", {}).get("person_id"), "persons", f"intervencion {uid}.speaker")
            chk(utt.get("passage_ids"), "passages", f"intervencion {uid}.passage_ids")
            audio = utt.get("audio_asset_id")
            chk(audio, "media", f"intervencion {uid}.audio_asset_id")
            if audio and isinstance(audio, str) and audio in index["media"]:
                pass  # el formato de audio se comprueba en la fase de paquete (beat_semantic_errors)
    return errs


def validate_entity(instance: dict, category: str, gate: str = "repo",
                    index: dict[str, set[str]] | None = None) -> list[dict]:
    """Devuelve lista de {'code', 'message'}; vacía = registro válido."""
    errors: list[dict] = []
    for msg in schema_errors(instance, category):
        errors.append({"code": "SCHEMA_ERROR", "message": msg})
    if errors:
        return errors
    if category == "question":
        errors += [{"code": "SEMANTIC_ERROR", "message": m} for m in question_semantic_errors(instance)]
    if category == "media_asset":
        errors += [{"code": c, "message": m} for c, m in
                   (e.split(": ", 1) for e in media_gate_errors(instance, gate))]
    if index is not None and not errors:
        errors += [{"code": "REFERENCE_ERROR", "message": m} for m in crossref_errors(instance, category, index)]
    return errors


def validate_package(manifest_path: Path, gate: str = "repo") -> list[dict]:
    errors: list[dict] = []
    manifest = load_json(manifest_path)
    errors += [{"code": "SCHEMA_ERROR", "message": m} for m in schema_errors(manifest, "content_package")]
    if errors:
        return errors
    if manifest["contract_version"] not in SUPPORTED_CONTRACT_VERSIONS:
        return [{"code": "CONTRACT_VERSION_UNSUPPORTED",
                 "message": f"contract_version '{manifest['contract_version']}' no soportada; "
                            f"soportadas: {sorted(SUPPORTED_CONTRACT_VERSIONS)}. "
                            f"Ningún equipo debe asumir una actualización silenciosa del contrato (encargo §6.5.8)."}]
    base = manifest_path.parent
    loaded: dict[str, list[tuple[str, str, dict]]] = {}
    for files_key, rels in manifest["files"].items():
        category = FILES_KEY_TO_CATEGORY[files_key]
        for rel in rels:
            path = base / rel
            if not path.exists():
                errors.append({"code": "REFERENCE_ERROR", "message": f"fichero del paquete no encontrado: '{rel}'"})
                continue
            loaded.setdefault(category, []).append((rel, files_key, load_json(path)))
    index: dict[str, set[str]] = {target: set() for target in set(CATEGORY_TO_INDEX.values())}
    objects: dict[str, dict[str, dict]] = {}
    for category, items in loaded.items():
        for _rel, _files_key, inst in items:
            index[CATEGORY_TO_INDEX[category]].add(inst["id"])
            objects.setdefault(category, {})[inst["id"]] = inst
    for category, items in loaded.items():
        for rel, _files_key, inst in items:
            for err in validate_entity(inst, category, gate=gate, index=index):
                errors.append({**err, "message": f"[{rel}] {err['message']}"})
    # Reglas de paquete enteras (v0.2.0): duplicados semánticos e imagen previa reveladora.
    questions = objects.get("question", {})
    seen_keys: dict[str, str] = {}
    for qid in sorted(questions):
        key = questions[qid].get("semantic_key")
        if key:
            if key in seen_keys:
                errors.append({"code": "SEMANTIC_ERROR",
                               "message": f"semantic_key duplicado '{key}' en {seen_keys[key]} y {qid}"})
            seen_keys[key] = qid
    media = objects.get("media_asset", {})
    for qid in sorted(questions):
        pre = questions[qid].get("visual_requirements", {}).get("pre_image_media_id")
        asset = media.get(pre or "")
        if asset and asset.get("spoiler_level") != "ninguno":
            errors.append({"code": "SEMANTIC_ERROR",
                           "message": f"imagen previa de {qid} ({pre}) tiene spoiler_level "
                                      f"'{asset.get('spoiler_level')}': revelaría la respuesta (§4.3.4)"})

    # Reglas de beats/intervenciones (v1.1.0, R11): orden único por escena,
    # utterance_id único global, audio existente y con formato de voz.
    beats = objects.get("beat", {})
    orden_visto: dict[str, str] = {}
    for bid in sorted(beats):
        b = beats[bid]
        clave_orden = f"{b.get('scene_id')}#{b.get('order')}"
        if clave_orden in orden_visto:
            errors.append({"code": "SEMANTIC_ERROR",
                           "message": f"order {b.get('order')} duplicado en la escena {b.get('scene_id')}: "
                                      f"{orden_visto[clave_orden]} y {bid}"})
        orden_visto[clave_orden] = bid
        for utt in b.get("utterances", []):
            uid = utt.get("utterance_id", "?")
            audio = utt.get("audio_asset_id")
            if audio and isinstance(audio, str):
                asset = media.get(audio)
                if asset:
                    formatos = {d.get("format") for d in asset.get("derivatives", []) if isinstance(d, dict)}
                    uri = str(asset.get("logical_uri", ""))
                    es_audio = bool(formatos & FORMATOS_AUDIO) or uri.rsplit(".", 1)[-1].lower() in FORMATOS_AUDIO
                    if not es_audio:
                        errors.append({"code": "SEMANTIC_ERROR",
                                       "message": f"audio de la intervención {uid} ({audio}) no tiene "
                                                  f"formato de voz ({sorted(formatos) or uri})"})
    utt_visto: dict[str, str] = {}
    for bid, b in sorted(beats.items()):
        for utt in b.get("utterances", []):
            uid = utt.get("utterance_id")
            if uid:
                if uid in utt_visto:
                    errors.append({"code": "SEMANTIC_ERROR",
                                   "message": f"utterance_id '{uid}' duplicado: {utt_visto[uid]} y {bid}"})
                utt_visto[uid] = bid
            # P1-5 (dictamen H5): proyección visible→oral sin divergencias.
            # Regla verificable: ningún inciso del narrador puede aparecer en
            # texto_oral (los incisos pertenecen al narrador; la voz solo lee
            # palabras del hablante).
            oral = utt.get("texto_oral")
            if oral:
                for inciso in utt.get("incisos_narrador", []) or []:
                    if inciso and inciso in oral:
                        errors.append({"code": "SEMANTIC_ERROR",
                                       "message": f"intervención {uid}: el inciso del narrador "
                                                  f"'{inciso}' aparece en texto_oral; la voz no debe "
                                                  f"leer incisos del narrador (FICHA_ESCENA §3)"})
    return errors


# ---------------------------------------------------------------- suite

FILENAME_CATEGORY_RULES = [
    ("question", "question"), ("media_", "media_asset"), ("discovery", "discovery"),
    ("person", "person"), ("place_", "place"), ("route_", "place"), ("museum_item", "museum_item"),
    ("beat", "beat"),
    ("edition", "edition"), ("chapter", "chapter"), ("passage", "passage"),
    ("episode", "episode"), ("scene", "scene"), ("license", "license"),
    ("source", "source"), ("profile", "profile"),
]

EXPECTED_INVALID = {
    "invalid_question_no_correct.json": "SCHEMA_ERROR",
    "invalid_question_single_option.json": "SCHEMA_ERROR",
    "invalid_question_multi_not_declared.json": "SCHEMA_ERROR",
    "invalid_question_option_ids_mismatch.json": "SEMANTIC_ERROR",
    "invalid_question_bad_chapter.json": "SCHEMA_ERROR",
    "invalid_question_certainty_mismatch.json": "SEMANTIC_ERROR",
    "invalid_discovery_cita_without_passage.json": "SCHEMA_ERROR",
    "invalid_media_unknown_license.json": "LICENSE_NOT_VERIFIED",
    "invalid_media_repo_only.json": "ALLOWED_USE_MISSING",
    "invalid_question_hotspot_out_of_bounds.json": "SEMANTIC_ERROR",
    "invalid_place_no_certainty.json": "SCHEMA_ERROR",
    "invalid_route_not_hypothesis.json": "SCHEMA_ERROR",
    "invalid_beat_sin_texto.json": "SCHEMA_ERROR",
    "invalid_beat_cita_sin_pasaje.json": "SCHEMA_ERROR",
    "invalid_beat_texto_blanco.json": "SCHEMA_ERROR",
}

EXPECTED_INVALID_PACKAGES = {
    "package_invalid_missing_media.json": "REFERENCE_ERROR",
    "package_invalid_stale_contract.json": "CONTRACT_VERSION_UNSUPPORTED",
    "package_invalid_duplicate_semantic.json": "SEMANTIC_ERROR",
    "package_invalid_revealing_preimage.json": "SEMANTIC_ERROR",
    "package_invalid_beats_orden_duplicado.json": "SEMANTIC_ERROR",
    "package_invalid_beats_audio_fantasma.json": "REFERENCE_ERROR",
}


def infer_category(filename: str) -> str:
    stem = filename
    if stem.startswith("invalid_"):
        stem = stem[len("invalid_"):]
    for needle, category in FILENAME_CATEGORY_RULES:
        if stem.startswith(needle):
            return category
    raise ValueError(f"No se puede inferir la categoría de '{filename}'")


def run_suite(fixtures_dir: Path, gate: str = "repo") -> dict:
    results: list[dict] = []
    ok = True

    valid_dir = fixtures_dir / "valid"
    for path in sorted(valid_dir.glob("*.json")):
        category = infer_category(path.name)
        errs = validate_entity(load_json(path), category, gate=gate)
        passed = not errs
        ok &= passed
        results.append({"file": f"valid/{path.name}", "expect": "válido", "result": "PASS" if passed else "FAIL",
                        "codes": [e["code"] for e in errs]})

    invalid_dir = fixtures_dir / "invalid"
    for path in sorted(invalid_dir.glob("*.json")):
        category = infer_category(path.name)
        errs = validate_entity(load_json(path), category, gate=gate)
        codes = [e["code"] for e in errs]
        expected = EXPECTED_INVALID.get(path.name)
        passed = expected is not None and expected in codes
        ok &= passed
        results.append({"file": f"invalid/{path.name}", "expect": f"FALLA con {expected}",
                        "result": "PASS" if passed else "FAIL", "codes": codes})

    for path in sorted(fixtures_dir.glob("package_*.json")):
        errs = validate_package(path, gate=gate)
        codes = [e["code"] for e in errs]
        if path.name == "package_valid.json":
            passed = not errs
            expect = "válido"
        else:
            expected = EXPECTED_INVALID_PACKAGES.get(path.name)
            passed = expected is not None and expected in codes
            expect = f"FALLA con {expected}"
        ok &= passed
        results.append({"file": path.name, "expect": expect, "result": "PASS" if passed else "FAIL",
                        "codes": codes})

    return {"gate": gate, "all_ok": ok, "total": len(results),
            "passed": sum(1 for r in results if r["result"] == "PASS"), "results": results}


def main() -> int:
    parser = argparse.ArgumentParser(description="Validador del contrato editorial-técnico v1.0.0")
    sub = parser.add_subparsers(dest="cmd", required=True)
    p_file = sub.add_parser("file", help="valida un registro suelto")
    p_file.add_argument("path")
    p_file.add_argument("--gate", choices=["app", "repo"], default="repo")
    p_pkg = sub.add_parser("package", help="valida un manifest de paquete con referencias cruzadas")
    p_pkg.add_argument("path")
    p_pkg.add_argument("--gate", choices=["app", "repo"], default="repo")
    p_suite = sub.add_parser("suite", help="ejecuta la batería completa de fixtures")
    p_suite.add_argument("fixtures_dir")
    p_suite.add_argument("--gate", choices=["app", "repo"], default="repo")
    p_suite.add_argument("--json", dest="json_out", help="escribe informe JSON en la ruta dada")
    args = parser.parse_args()

    if args.cmd == "file":
        path = Path(args.path)
        category = infer_category(path.name)
        errs = validate_entity(load_json(path), category, gate=args.gate)
        for e in errs:
            print(f"  [{e['code']}] {e['message']}")
        print(f"{path.name}: {'VÁLIDO' if not errs else f'INVÁLIDO ({len(errs)} error/es)'} [puerta {args.gate}]")
        return 0 if not errs else 1

    if args.cmd == "package":
        errs = validate_package(Path(args.path), gate=args.gate)
        for e in errs:
            print(f"  [{e['code']}] {e['message']}")
        print(f"{Path(args.path).name}: {'VÁLIDO' if not errs else f'INVÁLIDO ({len(errs)} error/es)'}")
        return 0 if not errs else 1

    report = run_suite(Path(args.fixtures_dir), gate=args.gate)
    for r in report["results"]:
        print(f"  {r['result']:4}  {r['file']:55} esperado: {r['expect']}"
              + (f"  → {r['codes']}" if r["result"] == "FAIL" else ""))
    print(f"\nSuite ({report['gate']}): {report['passed']}/{report['total']} PASS — "
          f"{'CONTRATO VERIFICADO' if report['all_ok'] else 'CONTRATO ROTO'}")
    if args.json_out:
        Path(args.json_out).write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Informe JSON: {args.json_out}")
    return 0 if report["all_ok"] else 1


if __name__ == "__main__":
    sys.exit(main())
