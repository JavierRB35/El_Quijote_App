# BORRADOR 0.1 del modo CONTENIDOS — implementación paralela preservada

**Qué es:** la implementación de contrato que el modo CONTENIDOS redactó en paralelo el 2026-11-05 (13 esquemas JSON, ejemplos sintéticos y el validador `validar_contrato.py`, 37/37 PASS en su momento). Se conserva **íntegra y sin modificar** como referencia de la propuesta editorial.

**Qué NO es:** el contrato vigente. La implementación **canónica** está en:

- `/schemas/**` (esquemas v0.2.0, incluidos `_definitions.schema.json`, `player/profile` y `manifests/content-package`)
- `tools/editorial_validation/validate.py` (suite de contrato: 42/42 PASS)

Las divergencias entre ambas propuestas y sus resoluciones están registradas en `docs/CONTRATO_EDITORIAL_TECNICO.md` §0 (registro de reconciliación) y §12 (consolidación). Esta carpeta se retirará formalmente cuando la v0.2.0 reciba la doble firma (CONTENIDOS + DESARROLLO); sus ideas no recogidas aún (p. ej. `prompt` con límites de longitud, `solution` estructurada para ordering/matching) siguen en revisión conjunta.

**Nota:** `validar_contrato.py` referencia rutas de esquema que han cambiado de sitio; no debe ejecutarse tal cual. Su lógica y sus casos negativos ya están cubiertos o portados por `validate.py`.
