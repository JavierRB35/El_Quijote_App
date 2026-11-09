#!/usr/bin/env python3
"""Importación de la precarga editorial (modo CONTENIDOS) al contrato canónico v1.0.0.

Ejercicio de integración real del encargo §6.5.10: el equipo técnico consume un
paquete representativo de contenidos producido por el equipo editorial siguiendo
esquemas y manifiestos, sin reescritura manual.

Entrada:
  - docs/data/piloto_precarga.json      (registros editoriales, convención borrador 0.1)
  - docs/data/mapa_capitulos.json       (títulos reales de los 126 capítulos)

Salida:
  - tests/contracts/integration_precarga/  (paquete canónico + manifest)
  - ejecución del validador canónico sobre el paquete

Las decisiones de mapeo están documentadas en docs/INTEGRACION_PRECARGA.md.
El paquete resultante es material de PRUEBA (no publicable) y hereda el aviso
de la precarga: IDs provisionales y cotejo pendiente (PEND-01).
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = Path(__file__).resolve().parents[2]
PRECARGA = REPO / "docs/data/piloto_precarga.json"
MAPA = REPO / "docs/data/mapa_capitulos.json"
OUT = REPO / "tests/contracts/integration_precarga"
VALIDATOR = REPO / "tools/editorial_validation/validate.py"

HOY = "2026-11-05"
PLACEHOLDER_PASAJE = "[Pasaje del EPUB Tusell — texto íntegro pendiente de capa textual (PEND-01)]"
NULL_SHA = "sha256:" + "0" * 64


def m_per(pid: str) -> str:
    return f"DQ.PER.{int(pid.split('.')[-1]):04d}"


def m_loc(pid: str) -> str:
    return f"DQ.LOC.{int(pid.split('.')[-1]):04d}"


def m_dis(pid: str) -> str:
    return f"DQ.DIS.{int(pid.split('.')[-1]):06d}"


def m_media(pid: str) -> str:
    """DQ.IL.0026 / DQ.MED.900005 → DQ.MA.000026 / DQ.MA.900005."""
    return f"DQ.MA.{int(pid.split('.')[-1]):06d}"


def m_passage(pid: str) -> str:
    """DQ.P1.C08.PS001 → DQ.P1.C08.P0001."""
    return re.sub(r"PS(\d+)$", lambda m: f"P{int(m.group(1)):04d}", pid)


def m_episode(pid: str, anchor_chapter: str) -> str:
    """DQ.P1.E04 → DQ.P1.C08.E04 (anclado al primer capítulo, contrato §2)."""
    part, ep = pid.split(".")[1], pid.split(".")[-1]
    return f"DQ.{part}.{anchor_chapter.split('.')[-1]}.{ep}"


def write(path: Path, obj: dict) -> None:
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    precarga = json.loads(PRECARGA.read_text(encoding="utf-8"))
    mapa = json.loads(MAPA.read_text(encoding="utf-8"))
    titulos = {c["id"]: c for c in mapa["capitulos"]}
    cap_piloto = precarga["meta"]["capitulos_piloto"]

    OUT.mkdir(parents=True, exist_ok=True)
    files: dict[str, list[str]] = {
        "editions": [], "chapters": [], "passages": [], "episodes": [], "scenes": [],
        "discoveries": [], "persons": [], "places": [], "museum_items": [],
        "media_assets": [], "sources": [], "licenses": [],
    }

    # ---- soporte: edición, fuentes, licencia --------------------------------
    write(OUT / "edition_epub_tusell.json", {
        "id": "DQ.ED.0001", "contract_version": "1.0.0",
        "title": "Edición digital del EPUB ilustrado Tusell (impresa: Luis Tasso, Barcelona, 1905) — PROVISIONAL hasta designar edición de referencia (PEND-01)",
        "editor": "Digital: Epublibre/Titivillus (r2.1). Impresa: Luis Tasso (1905)",
        "year": 1905, "source_id": "DQ.SRC.0001",
        "digital_version": "EPUB base r2.1, modificado 2024-02-11",
        "rights_status": "pendiente", "orthographic_rules": "original_epoca",
        "checksum": "sha256:82647ac553c40eb0c216e9c76bbbbcb012ded1497711626b9c48a2f30bda7858",
        "provenance": "EPUB facilitado por el propietario; expediente de derechos en docs/DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md",
        "review": {"state": "borrador", "reviewer_role": None, "date": None},
    })
    files["editions"].append("edition_epub_tusell.json")

    write(OUT / "source_epub_tusell.json", {
        "id": "DQ.SRC.0001", "contract_version": "1.0.0",
        "title": "Edición digital EPUB «Don Quijote de la Mancha (Ilustrado por Salvador Tusell)» (Epublibre EPL 64375)",
        "author_editor": "Miguel de Cervantes; il. Salvador Tusell; digitalización Titivillus",
        "publication": "Base r2.1, modificada 2024-02-11", "kind": "edicion_textual",
        "consulted_date": HOY,
        "notes": "Ficha EPL 64375 inaccesible en la comprobación (PEND-09); alternativa oficial: DQ.SRC.0002 (BVPB, CC BY).",
    })
    write(OUT / "source_bvpb_tasso.json", {
        "id": "DQ.SRC.0002", "contract_version": "1.0.0",
        "title": "BVPB, registro 463832: El ingenioso hidalgo Don Quijote de la Mancha, Barcelona, Luis Tasso, 1905, 2 vols.",
        "author_editor": "Biblioteca Virtual del Patrimonio Bibliográfico",
        "kind": "registro_patrimonial",
        "url": "https://bvpb.mcu.es/cervantes/es/consulta/registro.do?id=463832",
        "consulted_date": HOY,
        "notes": "Digitalización oficial con licencia CC BY; confirma la edición impresa de referencia de las acuarelas.",
    })
    write(OUT / "source_produccion_propia.json", {
        "id": "DQ.SRC.0003", "contract_version": "1.0.0",
        "title": "Producción propia del proyecto (recreaciones cinematográficas y material derivado)",
        "author_editor": "Equipo del proyecto", "kind": "otro", "consulted_date": HOY,
    })
    files["sources"] += ["source_epub_tusell.json", "source_bvpb_tasso.json", "source_produccion_propia.json"]

    write(OUT / "license_uso_interno.json", {
        "id": "DQ.LIC.0001", "contract_version": "1.0.0",
        "title": "Uso interno del proyecto con autorización expresa del propietario (2026-11-05)",
        "holder": "Propietario del proyecto (JavierRB35)",
        "consulted_date": HOY, "attribution_required": True, "redistribution": "prohibida",
        "evidence_documental": "docs/DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md §3 (uso interno y repositorio privado autorizados; redistribución NO autorizada hasta PEND-09)",
    })
    files["licenses"].append("license_uso_interno.json")

    # ---- capítulos del piloto + los que atraviese algún episodio -------------
    caps_necesarios = list(cap_piloto)
    for ep in precarga["episodios"]:
        for ch in ep.get("chapter_ids", []):
            if ch not in caps_necesarios:
                caps_necesarios.append(ch)
    for ch in caps_necesarios:
        short = ch.replace("DQ.", "")  # P1.C08
        info = titulos.get(short)
        part, num = int(short[1]), int(short.split("C")[1])
        write(OUT / f"chapter_{short.replace('.', '_').lower()}.json", {
            "id": ch, "contract_version": "1.0.0", "edition_id": "DQ.ED.0001",
            "part": part, "number": num,
            "title": info["titulo"] if info else f"Capítulo {short} (título pendiente)",
            "order": num if part == 1 else 52 + num,
            "text_ref": f"content://editions/DQ.ED.0001/{part}/{num:02d}",
        })
        files["chapters"].append(f"chapter_{short.replace('.', '_').lower()}.json")

    # ---- pasajes referenciados ---------------------------------------------
    raw = json.dumps(precarga, ensure_ascii=False)
    ps_ids = sorted(set(re.findall(r"DQ\.P[12]\.C\d{2}\.PS\d{3}", raw)))
    for ps in ps_ids:
        canon = m_passage(ps)
        write(OUT / f"passage_{canon.replace('.', '_').lower()}.json", {
            "id": canon, "contract_version": "1.0.0",
            "chapter_id": canon.rsplit(".P", 1)[0],
            "anchor": f"PS{canon.rsplit('P', 1)[1]} (localizador provisional de la precarga)",
            "text_original": "",
            "text_indexable": PLACEHOLDER_PASAJE,
            "position": {"start_char": 0, "end_char": 0},
            "sha256": NULL_SHA,
        })
        files["passages"].append(f"passage_{canon.replace('.', '_').lower()}.json")

    # ---- episodios -----------------------------------------------------------
    ep_canon_ids: list[str] = []
    for ep in precarga["episodios"]:
        anchor = ep["chapter_ids"][0]
        canon_id = m_episode(ep["id"], anchor)
        ep_canon_ids.append(canon_id)
        write(OUT / f"episode_{canon_id.replace('.', '_').lower()}.json", {
            "id": canon_id, "contract_version": "1.0.0",
            "title": ep["title"], "chapters": ep["chapter_ids"],
            "narrative_order": ep["narrative_order"], "synopsis": ep["synopsis"],
            "actors": [m_per(a) for a in ep.get("actor_ids", [])],
            "places": [m_loc(l) for l in ep.get("place_ids", [])],
            "passages": [m_passage(p) for p in ep.get("passage_ids", [])],
            "spoiler_flags": {"reveals_future_events": False,
                              "notes": "Pendiente de valoración editorial (borrador 0.1 sin este campo)"},
        })
        files["episodes"].append(f"episode_{canon_id.replace('.', '_').lower()}.json")
    ep_default = ep_canon_ids[0] if ep_canon_ids else None

    # ---- personajes ----------------------------------------------------------
    for p in precarga["personas"]:
        canon_id = m_per(p["id"])
        caps = set(p.get("appearance_chapter_ids", []))
        appearances = [e for e, src in zip(ep_canon_ids, precarga["episodios"])
                       if caps & set(src["chapter_ids"])]
        rec = {
            "id": canon_id, "contract_version": "1.0.0",
            "class": p.get("person_class", "ficticio"),
            "canonical_name": p["name"],
            "variants": p.get("variants", []),
            "relations": [{"person_id": m_per(r["target_id"]), "kind": r["kind"]}
                          for r in p.get("relations", [])],
            "appearances": appearances,
            "certainty": p.get("certainty", "DISCUTIDO"),
            "review": {"state": p.get("review_state", "borrador"), "reviewer_role": None, "date": None},
            "notes": "; ".join(filter(None, [
                p.get("description", ""),
                f"Apariencia por capítulos (precarga): {', '.join(sorted(caps))}" if caps else "",
            ])),
        }
        if p.get("historical_ref"):
            rec["historical_ref"] = {"source_id": "DQ.SRC.0002", "note": p["historical_ref"]}
        write(OUT / f"person_{canon_id.replace('.', '_').lower()}.json", rec)
        files["persons"].append(f"person_{canon_id.replace('.', '_').lower()}.json")

    # ---- lugares -------------------------------------------------------------
    for l in precarga["lugares"]:
        canon_id = m_loc(l["id"])
        status = l.get("status", "probable")
        precision_label = l.get("precision", "")
        write(OUT / f"place_{canon_id.replace('.', '_').lower()}.json", {
            "id": canon_id, "contract_version": "1.0.0", "kind": "lugar",
            "literary_name": l["literary_name"],
            "modern_name": l.get("modern_name", ""),
            "variants": l.get("variants", []),
            "geometry": None,
            "status": status,
            "presented_as": "hecho" if status == "explicito" else "hipotesis",
            "certainty": l.get("certainty", "HIPOTESIS_PLAUSIBLE"),
            "chapters": l.get("chapter_ids", []),
            "sources": [s for s in (m_media_maybe_src(x) for x in l.get("source_ids", [])) if s],
            "attribution_note": "; ".join(filter(None, [
                l.get("attribution", ""),
                f"Geometría pendiente de geolocalización (precarga declara precisión: {precision_label})" if precision_label else "Geometría pendiente de geolocalización",
                l.get("description", ""),
            ])),
            "review": {"state": l.get("review_state", "borrador"), "reviewer_role": None, "date": None},
        })
        files["places"].append(f"place_{canon_id.replace('.', '_').lower()}.json")

    # ---- descubrimientos -----------------------------------------------------
    mapa_condicion = {"tras_capitulo": "desenlace", "tras_respuesta": "tras_respuesta",
                      "antes_pregunta": "antes_pregunta", "desenlace": "desenlace",
                      "exploracion": "exploracion"}
    mapa_kind = {"humor": "humor_escena", "curiosidad": "curiosidad_recepcion",
                 "recepcion": "curiosidad_recepcion"}

    def m_biblio(entry: str) -> tuple[str | None, str | None]:
        """Normaliza referencias bibliográficas libres de la precarga a DQ.SRC.*.
        Devuelve (id_canonico_o_None, nota_a_conservar)."""
        if re.fullmatch(r"DQ\.SRC\.\d{4}", entry or ""):
            return entry, None
        texto = entry or ""
        if "BVPB" in texto or "Tasso" in texto:
            return "DQ.SRC.0002", f"Bibliografía original de la precarga: «{texto}»"
        if "publibre" in texto or "EPUB" in texto or "Titivillus" in texto:
            return "DQ.SRC.0001", f"Bibliografía original de la precarga: «{texto}»"
        return None, f"Referencia bibliográfica sin fuente canónica asignada: «{texto}»"

    for d in precarga["descubrimientos"]:
        canon_id = m_dis(d["id"])
        cond = d.get("condition_display", "")
        kind_original = d.get("kind", "")
        biblio_ids: list[str] = []
        biblio_notas: list[str] = []
        for entry in d.get("bibliography", []):
            src_id, nota = m_biblio(entry if isinstance(entry, str) else str(entry))
            if src_id and src_id not in biblio_ids:
                biblio_ids.append(src_id)
            if nota:
                biblio_notas.append(nota)
        rec = {
            "id": canon_id, "contract_version": "1.0.0",
            "kind": mapa_kind.get(kind_original, kind_original), "content": d["content"],
            "passages": [m_passage(x) for x in d.get("passage_ids", [])],
            "bibliography": biblio_ids,
            "appearance": {"episode_id": ep_default,
                           "moment": mapa_condicion.get(cond, "exploracion")},
            "asset_ids": [m_media(x) for x in d.get("media_ids", [])],
            "certainty": d.get("certainty", "DISCUTIDO"),
            "review": {"state": d.get("review_state", "borrador"), "reviewer_role": None, "date": None},
            "notes": "; ".join(filter(None, [
                f"Kind original de la precarga: {kind_original}" if kind_original in mapa_kind else "",
                f"Condición original de la precarga: {cond or 'sin declarar'}",
                *biblio_notas,
            ])),
        }
        spk = d.get("speaker")
        if isinstance(spk, str) and spk:
            rec["speaker"] = {"label": spk}
        elif isinstance(spk, dict):
            rec["speaker"] = {k: v for k, v in spk.items() if k in ("person_id", "label")}
        write(OUT / f"discovery_{canon_id.replace('.', '_').lower()}.json", rec)
        files["discoveries"].append(f"discovery_{canon_id.replace('.', '_').lower()}.json")

    # ---- medios referenciados ------------------------------------------------
    il_ids = sorted(set(re.findall(r"DQ\.IL\.\d{1,4}", raw)), key=lambda x: int(x.split(".")[-1]))
    for il in il_ids:
        n = int(il.split(".")[-1])
        fpath = REPO / f"assets/ilustraciones_tusell/acuarelas/{n:03d}.jpg"
        canon_id = m_media(il)
        write(OUT / f"media_{canon_id.replace('.', '_').lower()}.json", {
            "id": canon_id, "contract_version": "1.0.0", "function": "lector",
            "media_class": "ACUARELA_HISTORICA",
            "logical_uri": f"assets://ilustraciones_tusell/acuarelas/{n:03d}.jpg",
            "alt": f"Acuarela de Salvador Tusell sobre composición de Gustave Doré (Barcelona: Luis Tasso, 1905). Digitalización: Epublibre/Titivillus. Lámina n.º {n:03d}.",
            "source_id": "DQ.SRC.0001", "license_id": "DQ.LIC.0001",
            "author": "Salvador Tusell (sobre composiciones de Gustave Doré)", "date": "1905",
            "allowed_uses": ["uso_personal_app", "almacenamiento_repo_git"],
            "license_status": "verificada",
            "provenance": "Extraída del EPUB (SHA-256 82647ac5…) sin retoque; expediente: docs/DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md. Atribución obligatoria en pantalla.",
            "review": {"state": "documentada", "reviewer_role": "editorial", "date": HOY},
            "spoiler_level": "ninguno",
        })
        if not fpath.exists():
            print(f"  AVISO: el fichero referenciado no existe en el repo: {fpath}")
        files["media_assets"].append(f"media_{canon_id.replace('.', '_').lower()}.json")

    for med in sorted(set(re.findall(r"DQ\.MED\.\d{6}", raw))):
        canon_id = m_media(med)
        write(OUT / f"media_{canon_id.replace('.', '_').lower()}.json", {
            "id": canon_id, "contract_version": "1.0.0", "function": "referencia",
            "media_class": "RECREACION_IA",
            "logical_uri": f"assets://scenes/_art_direction/pendiente_mapeo/{canon_id.replace('.', '_').lower()}.webp",
            "alt": "Recreación de referencia del paquete de escenas cinematográficas; URI definitiva pendiente de mapeo con assets/scenes/manifest.json (contrato §11).",
            "source_id": "DQ.SRC.0003", "license_id": "DQ.LIC.0001",
            "author": "Producción propia del proyecto",
            "allowed_uses": ["uso_personal_app", "almacenamiento_repo_git"],
            "license_status": "verificada",
            "provenance": "Mapeo pendiente con el manifiesto de escenas (ae927a1): DQ.MED.9000NN → registro correspondiente.",
            "review": {"state": "borrador", "reviewer_role": None, "date": None},
            "spoiler_level": "ninguno",
        })
        files["media_assets"].append(f"media_{canon_id.replace('.', '_').lower()}.json")

    # ---- manifest ------------------------------------------------------------
    manifest = {
        "package_id": "precarga-piloto-canonica",
        "contract_version": "1.0.0",
        "catalog_version": "0.0.1",
        "created": HOY,
        "files": files,
        "counts": {k: len(v) for k, v in files.items() if v},
    }
    manifest_path = OUT / "package_precarga_canonica.json"
    write(manifest_path, manifest)

    print(f"Paquete canónico generado en {OUT.relative_to(REPO)}")
    print(f"Registros: {sum(len(v) for v in files.values())} | Categorías con contenido: "
          f"{sum(1 for v in files.values() if v)}")
    print("--- Validación canónica del paquete importado ---")
    r = subprocess.run([sys.executable, "-I", str(VALIDATOR), "package", str(manifest_path)],
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    out = (r.stdout or "") + (r.stderr or "")
    print(out if out.strip() else "(sin salida)")
    return r.returncode


def m_media_maybe_src(ref: str) -> str | None:
    """Los source_ids de la precarga ya usan DQ.SRC.*; se devuelven tal cual."""
    return ref if ref.startswith("DQ.SRC.") else None


if __name__ == "__main__":
    sys.exit(main())
