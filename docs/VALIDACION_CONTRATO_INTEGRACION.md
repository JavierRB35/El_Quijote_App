# VALIDACIÓN DEL CONTRATO TÉCNICO ANTES DE INTEGRACIÓN DEFINITIVA

**Fecha:** 2026-11-06 · **Modo:** CONTENIDOS (responsable editorial) + validador canónico del contrato · **Solicitud del propietario:** validar el contrato técnico antes de integrarlo definitivamente, en GitHub.

**Veredicto: EL CONTRATO ES INTEGRABLE** tras corregir 2 defectos de esquema detectados por esta validación (detalle §3). Batería completa en verde (§2). Evidencia reproducible en GitHub Actions (§6).

## 1. Alcance validado

| Elemento | Resultado | Evidencia |
|---|---|---|
| Meta-validación JSON Schema (`check_schema` draft 2020-12) de los **16 esquemas** de `/schemas/**` | **16/16 OK** (tras corregir 2 defectos, §3) | comando + workflow |
| Suite de contrato canónica (`validate.py suite tests/contracts/fixtures`) | **42/42 PASS** — casos válidos, casos negativos que fallan como deben, paquetes válidos/inválidos | salida de la suite |
| Paquete editorial real `content/piloto/package.json` (74 preguntas, 54 pasajes, 36 medios, 19 personas, 7 museo, 3 ediciones) | **VÁLIDO (0 errores)** — esquema + semántica + referencias cruzadas + puertas de licencia + reglas de paquete v0.2.0 (semantic_key único, pre-imagen sin spoiler) | `validate.py package` |
| Paquete fixture `tests/contracts/fixtures/package_valid.json` | VÁLIDO | `validate.py package` |
| Cotejo textual integro (paquete vs. texto PG 2000 almacenado) | **130/130 OK**, 0 variantes sin explicar | `cotejar_texto_referencia.py . repo` |
| Coherencia de versiones | `SUPPORTED_CONTRACT_VERSIONS = {1.0.0}` = `contract_version` del paquete piloto = fixture | inspección |
| Unicidad de IDs de fuente tras la fusión Gutenberg | OK (`DQ.SRC.0004` = ed. IC/Rico; `DQ.SRC.0005` = PG 2000; sin duplicados en `content/sources/`) | grep |

## 2. Batería ejecutada (reproducible)

```bash
python -I tools/editorial_validation/validate.py suite tests/contracts/fixtures   # 42/42
python -I tools/editorial_validation/validate.py package content/piloto/package.json  # VÁLIDO
python -I tools/editorial_validation/validate.py package tests/contracts/fixtures/package_valid.json
python -I tools/editorial_validation/cotejar_texto_referencia.py . repo           # 130/130
# meta-validación de esquemas: Draft202012Validator.check_schema sobre los 16
```

## 3. Defectos detectados y corregidos por esta validación

**Hallazgo principal:** `chapter.schema.json` y `episode.schema.json` tenían claves espurias `"$comment_order"` / `"$comment_id"` **dentro de `properties`** (texto explicativo como valor string, inválido como esquema). Consecuencia real: `check_schema` fallaba y `properties.$comment_*` definía restricciones para propiedades inexistentes (ruido, sin efecto en instancias). **Las restricciones reales estaban intactas** (`order: integer 1–126`; `id: $ref → episodeId`).

- **Corrección:** claves eliminadas; el texto trasladado al `$comment` de la propiedad correcta (patrón ya usado en `text_ref`).
- **Clasificación:** corrección de defecto (PATCH de esquema) — **no cambia ningún comportamiento para instancias válidas**: la suite (42/42), el paquete real (VÁLIDO) y el cotejo (130/130) se re-verificaron verdes tras el cambio.
- **Registro:** pendiente de contrafirma técnica en `CONTRATO_EDITORIAL_TECNICO.md` §12 (propiedad conjunta).

## 4. Límites declarados (honestidad de la validación)

1. La validación contractual **no equivale a revisión literaria ni a prueba jugable**: certifica estructura, referencias, licencias y reglas de paquete (encargo §4.8; DC-07).
2. El manifiesto de escenas (`assets/scenes/manifest.json`) aún no está en formato contrato — migración prevista (§11 del contrato); sus 2 registros reales (paquete visual) no se validan como `MediaAsset` todavía.
3. No existe aún paquete del dominio jugador (`profile`) que validar.
4. El cotejo 130/130 compara contra PG 2000 (misma fuente de la batería por orden del propietario); el cotejo **crítico** contra la ed. Rico/IC sigue siendo requisito para elevar preguntas a `revisada`.

## 5. Veredicto de integración

- **Contrato técnico: integrable definitivamente** como base canónica v0.2.0/esquemas `1.0.0`, con los 2 defectos ya corregidos y esta batería como evidencia.
- **Puertas de publicación respetadas:** todo medio del paquete con `allowed_uses: uso_personal_app, almacenamiento_repo_git` y `license_status: verificada`; redistribución sigue condicionada (PEND-03/09).
- La integración definitiva requiere la contrafirma técnica del fix §3 y el merge en `main` del workflow §6.

## 6. Validación continua en GitHub

Workflow añadido: `.github/workflows/validar-contrato.yml` — en cada push/PR sobre `main`: instala `jsonschema`, ejecuta la suite 42/42, valida `content/piloto/package.json`, meta-valida los 16 esquemas y bloquea el merge si algo falla. Así la pregunta «¿el contrato valida?» tiene respuesta verificable en GitHub, no en una sesión local.
