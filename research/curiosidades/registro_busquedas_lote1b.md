# Registro de búsquedas — LOTE 1B (2026-11-08)

## Consultas y comprobaciones ejecutadas

1. **Estado del repositorio:** clonado `JavierRB35/El_Quijote_App`; SHA de `main` verificado (`909479db65ae04836c6dec7ae8e602c66866e1e9`); ramas, PRs (listado completo con `gh pr list`) e issues revisados; PR #82 inspeccionada vía API y diff.
2. **Texto primario:** localización y lectura de II,1 e II,74 en `content/textos/gutenberg_2000/El_Quijote.txt` (líneas verificadas en `SRC-L1B-001`); verificación adicional de I,1 (apellido), I,2 (apellido), II,59-60 (ataques al apócrifo), II,70 (Tordesillas), II,4 e II,27 (continuidad del rucio).
3. **Búsqueda académica web** (varias consultas): episodio del arbitrista de II,1 → estudio de *e-Spania* (2016) localizado y registrado (`SRC-L1B-005`); identificación de los poetas de Angélica → síntesis de fuentes críticas (`SRC-L1B-007`); biografía final de Cervantes → acta de entierro transcrita y consenso académico (`SRC-L1B-008`).
4. **Imágenes:** búsqueda en la API de Wikimedia Commons (namespace de ficheros y categorías); metadatos y licencias consultados vía `extmetadata` para cada candidata; descarga efectiva de 3 ficheros con SHA-256 calculado (`sha256sum`) y dimensiones verificadas (PIL).
5. **Verificación de integridad:** validación sintáctica de los JSONL generados y de la existencia de los ficheros descargados (véase `VALIDACION_lote1b.md`).

## Búsquedas infructuosas o pendientes (no repetir sin motivo)

- **Centro Virtual Cervantes (cvc.cervantes.es):** en mantenimiento durante la sesión (redirige a página de mantenimiento); su edición anotada del Quijote no pudo consultarse. Pendiente para el cotejo de notas críticas (Riquer/Rico/CVC).
- **Cervantes Virtual:** consultable pero no se localizó en la sesión la ficha concreta del elogio a Barahona de Soto en I,6; la conexión propuesta en CUR-L1B-003.C4 queda SIN VERIFICAR.
- **Refranero:** no se verificó la presencia de «las comparaciones son odiosas» en un corpus primario de refranes (Correas u otros) → CUR-L1B-004.C4 SIN VERIFICAR.
- **Wikimedia Commons:** no se localizó una imagen individual de dominio público de la escena de la muerte de don Quijote en la serie Doré (la serie «Dom Quixote» de Commons solo contiene láminas de Parte I, caps. 1-2); se adoptó la lámina de la edición Ormsby (1885) documentada en su ficha.
- **Portada de Avellaneda (1614):** existe en Commons solo como PDF de libro completo; no se descargó ni se extrajo la portada (registrada como candidata IMG-L1B-004).
- **Identificación Avellaneda–Tordesillas:** anclaje textual verificado (II,70), pero la referencia académica específica (ediciones críticas) no fue cotejada directamente.
- **JSTOR / bases de pago:** no accesibles en esta sesión; no se consultaron.

## Límites declarados

No se revisó «todo Internet»: corpus efectivamente consultados = texto canónico del proyecto, resultados de búsqueda académica con fuentes identificadas, API de Wikimedia Commons y enciclopedia citada como pista/síntesis. Fuentes de pago y edición crítica impresa quedan pendientes.
