# Catálogo de Aventura — DC-34

**Fuente de verdad:** GitHub `JavierRB35/El_Quijote_App`, rama `main`. Antes de editar, consultar `AGENTS.md`, `docs/VISION_Y_DECISIONES.md`, `docs/REGLAS_MODO_AVENTURA_V2_2026-11-08.md` y DC-30 a DC-34.

Cada capítulo posee un **JSON revisable** en `content/aventura/parte_1/capitulo_XX.json` o `parte_2/capitulo_XX.json`. Los enunciados, las alternativas, las respuestas y las imágenes NO se escriben en el código de la aplicación. El motor de puntuación es independiente. No se crea un segundo repositorio ni se recupera el antiguo cuestionario cultural.

## Campos a revisar

- `rondas[]`: orden canónico, ID estable, contexto previo, personaje, pregunta anticipatoria, opciones plausibles (3 habitualmente, 4 si está justificado), única acción correcta, consecuencia, explicación y checkpoint cuando corresponda.
- `pasajeId`: pasaje real de GitHub; si no existe ancla fraccionada, usar `null` y declarar la ronda en `pendientes_editoriales`. Nunca inventar una cita o referencia.
- `imagenPrevia`: imagen exclusiva por ronda y sin spoilers; `imagenConsecuencia`: solo tras la revelación. Rutas existentes, texto alternativo y `medioId` únicamente si existe ficha.
- `estado_editorial`: `borrador`, `en_revision`, `piloto_integrado`, `aprobado`. `piloto_integrado` significa que ya era jugable antes de DC-34, **NO una aprobación artística final**. Solo pueden activarse los catálogos `piloto_integrado` o `aprobado`.
- `revision_visual`: `pendiente` o `verificada`. No pasar a `aprobado` sin QA visual y revisión editorial/propietario verificables.

## Migración inicial del capítulo VIII

Se conservan exactamente los **9 IDs**, **27 alternativas**, soluciones correctas, textos, consecuencias, pre/post imágenes, checkpoints y formato de partida v2 del piloto. La revisión visual definitiva continúa `pendiente`. Tres rondas siguen sin `pasajeId` fraccionado: `AV2-I8-05`, `AV2-I8-06`, `AV2-I8-09`. Su falta no se oculta y debe subsanarse desde el texto del repositorio.

## Publicación y validación

Seguir DC-30: rondas candidatas → revisión del propietario → inventario visual → prompts solo para imágenes cuya ausencia confirme → Historia y reutilización → aprobación y QA → integración. Un archivo JSON en una rama no acredita aprobación.

Desde la raíz: `python tools/editorial_validation/validar_aventura.py` y `python tests/dev/test_catalogo_aventura.py`. GitHub Actions ejecuta ambos junto al build y pruebas existentes. Se verifican esquema, unicidad, respuestas, rutas, imágenes, medio IDs y pasajes. **La revisión humana** de fidelidad a Cervantes, calidad premium, continuidad, derechos y antiespoilers continúa siendo obligatoria.

**Producción I.1 (2026-11-09):** tras el encargo directo del propietario, `piloto_integrado` se aplica también a un capítulo nuevo que pasa a ser ejecutable como piloto de la fase autorizada. Esto acredita **solo integración técnica en la aplicación**, no revisión artística final: `revision_visual` sigue `pendiente`, con QA de pantallas y prueba real obligatorias. No usar este estado para saltarse el ciclo DC-30.
