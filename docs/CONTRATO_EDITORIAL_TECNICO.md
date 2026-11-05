# CONTRATO EDITORIAL-TÉCNICO — Borrador 0.1

**Estado:** BORRADOR desde el modo CONTENIDOS — **propiedad conjunta**: requiere revisión y aprobación del responsable técnico antes de considerar versión 0.1 válida (encargo §6.5.3).
**Modos responsables:** CONTENIDOS + DESARROLLO
**Última actualización:** 2026-11-05

## Alcance previsto (checklist del bootstrap) → estado al 2026-11-05

1. JSON Schema por cada entidad del §6.2 — **13 esquemas en `/schemas/`** (question, media_asset, episode, scene, passage, chapter, edition, discovery, person, place_route, museum_item, source, license); falta `Profile` (dominio `player/`, del equipo técnico).
2. Convención de IDs estables — **hecho** (§1). Esquema de ejemplo, NO inventario de contenido aprobado.
3. Reglas de evolución, compatibilidad y migraciones/alias — **hecho** (§7).
4. Ejemplos sintéticos **explícitamente no publicables** — **los 6 tipos de pregunta** (single, multi, true_false, ordering, matching, hotspot) + episode + media_asset + discovery, en `schemas/content/examples/`.
5. Pruebas de contrato con casos negativos (§6.3.7) — **automatizadas**: `tools/editorial_validation/validar_contrato.py` — 37/37 PASS (13 esquemas, 9 positivos, 8 semánticas, 7 negativos que fallan como deben). Ejecución: `python -I tools/editorial_validation/validar_contrato.py <raiz_repo>`.
6. Manifests de paquete e índice por episodios — **reglas definidas** (§7); formato binario/detalle pendiente con el equipo técnico.

## Regla de integración vinculante

Un elemento editorial nunca se publica si apunta a un ID inexistente o si su imagen/cita/licencia requerida está pendiente (§6.2).

---

## 1. Convención de identificadores (encargo §6.1)

| Entidad | Patrón | Ejemplo |
|---|---|---|
| Parte/capítulo | `DQ.P{n}.C{nn}` | `DQ.P1.C08` |
| Episodio | `DQ.P{n}.E{nn}` (orden canónico) | `DQ.P1.E04` |
| Escena | `+ .S{nn}` | `DQ.P1.E04.S01` |
| Pregunta | `DQ.Q.{000001}` | `DQ.Q.000001` |
| Opción | `DQ.Q.000001.O{a-z}` | `DQ.Q.000001.Oa` |
| Cita/Descubrimiento | `DQ.A.{000001}` | `DQ.A.000001` |
| Lugar/Ruta | `DQ.LOC.{000001}` / `DQ.RTE.{000001}` | `DQ.LOC.000001` |
| Personaje/entidad | `DQ.PER.{000001}` / `DQ.ENT.{000001}` | `DQ.PER.000001` |
| Pieza de museo | `DQ.MUS.{000001}` | `DQ.MUS.000001` |
| Media (imagen/audio/mapa) | `DQ.IL.{0001}` acuarela · `DQ.DEC.{0001}` decorativo · `DQ.MED.{000001}` general | `DQ.IL.0001` |
| Fuente / Licencia | `DQ.SRC.{0001}` / `DQ.LIC.{0001}` | `DQ.SRC.0001` |

Reglas: nunca reutilizar un ID retirado; cambios editoriales → alias/migración; las relaciones se referencian **solo por ID** (nunca por texto visible, posición, nombre de fichero ni número de fila).

## 2. Estados y enumeraciones

- `review_state`: `borrador → documentada → revisada → aprobada | descartada`.
- `certainty` (Anexo A): `TEXTO_EXPLICITO | HECHO_HISTORICO_DOCUMENTADO | INTERPRETACION_ACADEMICA | HIPOTESIS_PLAUSIBLE | DISCUTIDO | RECREACION_ARTISTICA`.
- `media_class`: `acuarela_historica | arte_historico | fotografia_actual | recreacion_ia | captura_ui`.
- `question_type`: `single_choice | multi_choice | true_false | ordering | matching | hotspot` — **todas de respuesta seleccionada** (DC-04); nunca campo de texto libre.
- `spoiler_policy`: `capitulo_actual | episodios_anteriores | siempre | nunca`.

## 3. Esquema JSON — `Question` (propuesta, JSON Schema 2020-12)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "schemas/content/question.schema.json",
  "title": "Question",
  "type": "object",
  "required": ["id", "schema_version", "episode_id", "chapter_ids", "passage_ids",
               "prompt", "type", "options", "correct_option_ids", "rationale",
               "evidence", "difficulty", "spoiler_policy", "review_state",
               "semantic_key"],
  "properties": {
    "id": {"type": "string", "pattern": "^DQ\\.Q\\.[0-9]{6}$"},
    "schema_version": {"type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$"},
    "episode_id": {"type": "string", "pattern": "^DQ\\.P[12]\\.E[0-9]{2}$"},
    "chapter_ids": {"type": "array", "minItems": 1,
                    "items": {"type": "string", "pattern": "^DQ\\.P[12]\\.C[0-9]{2}$"}},
    "passage_ids": {"type": "array", "minItems": 1, "items": {"type": "string"}},
    "prompt": {"type": "string", "minLength": 15, "maxLength": 400},
    "type": {"enum": ["single_choice", "multi_choice", "true_false",
                       "ordering", "matching", "hotspot"]},
    "options": {"type": "array", "minItems": 3, "maxItems": 8,
                "items": {"type": "object",
                          "required": ["id", "label"],
                          "properties": {"id": {"pattern": "^DQ\\.Q\\.[0-9]{6}\\.O[a-z]$"},
                                          "label": {"type": "string", "maxLength": 200}}}},
    "correct_option_ids": {"type": "array", "minItems": 1, "maxItems": 8,
                           "items": {"type": "string"}},
    "rationale": {"type": "string", "minLength": 20},
    "evidence": {"type": "array", "minItems": 1,
                 "items": {"type": "object",
                           "required": ["kind", "ref", "certainty"],
                           "properties": {"kind": {"enum": ["cita_literal", "parafraasis_localizada", "fuente_historica", "estudio_academico", "comentario_editorial"]},
                                            "ref": {"type": "string"},
                                            "certainty": {"$ref": "#/$defs/certainty"}}}},
    "difficulty": {"enum": ["facil", "media", "dificil"]},
    "spoiler_policy": {"enum": ["capitulo_actual", "episodios_anteriores", "siempre", "nunca"]},
    "scene_id": {"type": "string"},
    "media_ids": {"type": "array", "items": {"type": "string"}},
    "tags": {"type": "array", "items": {"type": "string"}},
    "review_state": {"enum": ["borrador", "documentada", "revisada", "aprobada", "descartada"]},
    "semantic_key": {"type": "string", "minLength": 8}
  },
  "$defs": {"certainty": {"enum": ["TEXTO_EXPLICITO", "HECHO_HISTORICO_DOCUMENTADO",
                                    "INTERPRETACION_ACADEMICA", "HIPOTESIS_PLAUSIBLE",
                                    "DISCUTIDO", "RECREACION_ARTISTICA"]}},
  "allOf": [{
    "if": {"properties": {"type": {"const": "single_choice"}}},
    "then": {"properties": {"correct_option_ids": {"maxItems": 1}}}
  }, {
    "if": {"properties": {"type": {"const": "multi_choice"}}},
    "then": {"required": ["multi_select_hint"],
              "properties": {"multi_select_hint": {"type": "boolean"}}}
  }],
  "unevaluatedProperties": false
}
```

**Regla semántica no expresable en el esquema** (validador dedicado): todo id de `correct_option_ids` debe existir en `options`; para `ordering`/`matching` el formato exacto se define con el equipo técnico (propuesta: `solution` estructurada aparte, no reutilizar `correct_option_ids`).

## 4. Esquema JSON — `MediaAsset` (propuesta, núcleo)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "schemas/media/media_asset.schema.json",
  "title": "MediaAsset",
  "type": "object",
  "required": ["id", "kind", "uri", "mime", "sha256", "bytes",
               "media_class", "source_id", "license_id", "review_state"],
  "properties": {
    "id": {"type": "string", "pattern": "^DQ\\.(IL|DEC|MED)\\.[0-9]{4,6}$"},
    "kind": {"enum": ["imagen", "audio", "mapa", "video"]},
    "uri": {"type": "string", "description": "URI local lógica, no ruta de fichero"},
    "mime": {"type": "string"},
    "width": {"type": "integer", "minimum": 1},
    "height": {"type": "integer", "minimum": 1},
    "bytes": {"type": "integer", "minimum": 1},
    "sha256": {"type": "string", "pattern": "^[a-f0-9]{64}$"},
    "alt": {"type": "string", "minLength": 3},
    "media_class": {"enum": ["acuarela_historica", "arte_historico",
                              "fotografia_actual", "recreacion_ia", "captura_ui"]},
    "source_id": {"type": "string", "pattern": "^DQ\\.SRC\\.[0-9]{4}$"},
    "license_id": {"type": "string", "pattern": "^DQ\\.LIC\\.[0-9]{4}$"},
    "author": {"type": "string"},
    "date": {"type": "string"},
    "allowed_uses": {"type": "array", "items": {"enum": ["uso_interno", "instalador", "web_publica"]}},
    "provenance": {"type": "string"},
    "spoiler_level": {"enum": ["ninguno", "leve", "revelador"]},
    "review_state": {"enum": ["borrador", "documentada", "revisada", "aprobada", "descartada"]}
  },
  "unevaluatedProperties": false
}
```

## 5. Ejemplo sintético — **NO PUBLICABLE** (una respuesta)

```json
{
  "id": "DQ.Q.000001",
  "schema_version": "0.1.0",
  "episode_id": "DQ.P1.E04",
  "chapter_ids": ["DQ.P1.C08"],
  "passage_ids": ["DQ.P1.C08.PS03"],
  "prompt": "¿Qué advierte Sancho a don Quijote antes de la embestida?",
  "type": "single_choice",
  "options": [
    {"id": "DQ.Q.000001.Oa", "label": "Que no son gigantes sino molinos de viento"},
    {"id": "DQ.Q.000001.Ob", "label": "Que Rocinante no puede correr más"},
    {"id": "DQ.Q.000001.Oc", "label": "Que está cerca la venta donde han de armarlo caballero"}
  ],
  "correct_option_ids": ["DQ.Q.000001.Oa"],
  "rationale": "Sancho identifica correctamente los molinos; don Quijote los reinterpreta como gigantes (I, 8).",
  "evidence": [{"kind": "cita_literal", "ref": "DQ.P1.C08.PS03", "certainty": "TEXTO_EXPLICITO"}],
  "difficulty": "facil",
  "spoiler_policy": "episodios_anteriores",
  "review_state": "borrador",
  "semantic_key": "molinos sancho advierte no son gigantes"
}
```

La cita del ejemplo es ilustrativa del método: **debe cotejarse contra la edición de referencia (PEND-01) antes de cualquier aprobación**; así lo marca `review_state: borrador`.

## 6. Casos negativos que deben fallar en validación (encargo §6.3.7)

1. Pregunta sin ninguna opción correcta o con `correct_option_ids` inexistente en `options`.
2. Duplicado de `semantic_key` dentro del mismo episodio.
3. Escena sin imagen de fase `before`; pregunta con `media` revelador para su `spoiler_policy`.
4. Cita sin `passage_ids` resoluble; pasaje con hash distinto al del texto de la edición.
5. Imagen con `license_id` inexistente o licencia sin `allowed_uses: uso_interno`.
6. Capítulo inexistente en `chapter_ids`; `episode_id` fuera del rango del mapa.
7. Hotspot con punto fuera de los límites normalizados de la imagen (0–1).
8. Paquete cuyo `schema_version` no sea compatible con el consumidor (semver: cambio mayor = migración).

## 7. Reglas de evolución y compatibilidad

- Semver separado para: `schema_version` (contrato), `catalog_version` (contenidos), `asset_pack_version` (medios), `app_version`.
- Cambios de esquema: propuesta como ADR → aprobación de **ambos** responsables → migración documentada + consumidor de prueba actualizado en el mismo ciclo.
- Añadir campos opcionales = minor; renombrar/restringir = major con migración; borrar = solo tras un ciclo de deprecación.
- Manifiesto de paquete editorial: IDs añadidos/modificados/retirados + versión de esquema + hash de ficheros + resultado de validadores (encargo §6.5.6).

## 8. Puntos abiertos para el equipo técnico (respuesta esperada en revisión)

1. Formato de `ordering`/`matching`/`hotspot` (nota en §3).
2. URI local lógica de `MediaAsset`: mapeo a recursos empaquetados (¿tabla de resoluciones físicas por perfil de dispositivo?).
3. Índice FTS5: campos indexados y tratamiento del castellano áureo (variantes diacríticas de la ed. 1905: «á», «á…», ortografía de la época).
4. Dónde vive el catálogo validado (SQLite generado en build vs. JSON validado en runtime).
5. Mecanismo de parche cultural versionado sin tocar datos de perfil (§5.3.A del encargo).
