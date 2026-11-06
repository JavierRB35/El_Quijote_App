# INFORME DE SUBSANACIÓN — Dictamen H5 de Coordinación (PR #19)

**Fecha:** 2026-11-06 · **Modo:** DESARROLLO (R08/R09/R10/R11)
**Dictamen atendido:** «CONTRATO ESTRUCTURAL ACEPTADO. SUBSANACIÓN FUNCIONAL NECESARIA» (comentario en PR #19).
**Alcance respetado:** sin implementar el reproductor, sin conversión masiva de intervenciones, T5–T9 siguen sin ejecutarse.

## Resumen de verificación

| Comprobación | Resultado |
|---|---|
| Suite de contrato | **51/51 PASS** (+2 fixtures nuevos) |
| Paquetes reales de `content/` | VÁLIDO |
| Cotejo textual | 130/130 OK |
| FTS5 (ADR-0001.1) | 9/9 SUPERADO |
| `check_schema` | 17/17 OK |

## Respuesta punto por punto

### P0-1 — Avance sin audio → CORREGIDO

- **Diagnóstico confirmado:** `AVANCE_BLOQUEADO` era alcanzable con `manual_advance_allowed: false` + `audio_asset_id: null` — un callejón sin salida contrario a DC-22.
- **Corrección:** estado eliminado y sustituido por `ESPERA_DE_VOZ`, sub-estado interno que **solo existe mientras hay voz sonando**. Invariante nuevo en `COMPONENTES_NARRATIVOS_UX.md` §2.1: «existe siempre una vía de avance que no requiere voz». Sin voz (ausente, silenciada o fallida), el avance manual está **siempre** disponible, aunque el beat declare `manual_advance_allowed: false`.
- **Prueba:** T8 (con reproductor) + la combinación queda imposible por política documentada; el flag re-semanticizado (ver P1-1) hace que el dato ya no pueda expresar el bloqueo.

### P0-2 — Avance automático → DEFINIDO

- Política en `COMPONENTES_NARRATIVOS_UX.md` §2.3: Modo Historia avanza ordinariamente en automático con duración del beat = `max(duración_de_voz, lectura_mínima)`, siendo `lectura_mínima = max(1500 ms, 800 ms + 35 ms/palabra)` — **parámetros ajustables por el piloto**, no segundos arbitrarios.
- **El fin de la voz por sí solo no avanza ni oculta texto**: si la voz termina antes, el texto permanece hasta cumplir su tiempo de lectura. Pausa congela voz y temporizador; Retroceder relee íntegro; salto manual siempre disponible salvo la espera de voz.
- Datos nuevos (opcionales, retrocompatibles): `avance_automatico` (bool|null; null = preferencia del perfil) y `lectura_minima_ms` por beat.
- Aclaración incorporada: «texto siempre visible» = texto íntegro de la intervención activa (recuperable al retroceder), no la novela fija en una pantalla.

### P1-1 — Controles obligatorios vs. flags → ACLARADO

Los cuatro controles del propietario **existen siempre** (DC-21/DC-22). Los flags del beat son sugerencias de ritmo, no restricciones: `manual_advance_allowed: false` solo difiere el salto manual mientras hay voz sonando y queda lectura; `replay_allowed: false` solo deshabilita la repetición de la **voz** (el control Repetir sigue operable sobre el texto). Queda prohibido ocultar controles o inventar modos bloqueantes (`COMPONENTES_NARRATIVOS_UX.md` §2.4; semántica documentada en el esquema).

### P1-2 — Texto independiente de imágenes → CORREGIDO

- El beat entra en `TEXTO_VISIBLE` cuando sus **datos** están listos; las imágenes cargan en paralelo y nunca gatean el texto.
- Fallback en cascada: perspectivas del beat → de la escena → fotograma anterior → fondo neutro, con nota discreta de error; la narración continúa íntegra por texto.
- `visual_asset_ids ≥ 1` se **mantiene en el dato** (calidad editorial) pero reetiquetado: **pendiente de doble firma** — ya no se presenta como decisión del propietario (dictamen, punto 4).

### P1-3 — Correspondencia texto/voz → MAPEADO Y VERIFICABLE

- Triada adoptada con la semántica **exacta** de FICHA_ESCENA_P1_C08 §3 (v1.1): `texto_visible` (íntegro, con incisos — forman parte del texto literario), `incisos_narrador` (del narrador, no del personaje), `texto_oral` (solo palabras del hablante, incisos retirados y raya eliminada; ausente = voz lee `texto_visible` verbatim, caso Narrador).
- **Regla verificable activa en el validador:** ningún `incisos_narrador` puede aparecer en `texto_oral` — el caso de referencia del dictamen («—respondió Sancho—») está cubierto por el fixture `beat_oral_incisos.json` (patrón sintético equivalente: visible con inciso, oral sin él).
- La asignación de pausas/segmentación de voz es del guion de voz (R07, cue sheet por intervención) derivada de estos campos.

### P1-4 — Validación del texto → CORREGIDO

`texto_visible` incorpora `pattern: \S`: los textos compuestos solo por espacios se rechazan (fixture `invalid_beat_texto_blanco.json` → `SCHEMA_ERROR`). **Sin normalización del contenido** — no se tocan saltos de línea, rayas ni dobles espacios de las citas literales.

### P1-5 — Contrafirma editorial → SOLICITADA FORMALMENTE

Solicitud registrada en PR #19 y en este informe: se requiere la **revisión y contrafirma editorial del ADR-0005**, en particular de las desviaciones de la Biblia Narrativa §4 (estructura beat/utterance convertida, `speaker` tipado, `visual_asset_ids ≥ 1`, `texto_oral`/`incisos_narrador` adoptados de su ficha). La fusión en `main` y el CI verde no sustituyen esa aprobación (dictamen, punto 7). Estado del ADR: «Propuesto — doble firma editorial pendiente».

## Matriz de pruebas actualizada

- **Automáticas activas en CI (T1–T4 + T4b):** incluyen ahora el rechazo de solo-espacios (T1 ampliado, P1-6) y la proyección visible→oral (T4b, P1-5).
- **Pendientes de ejecución real (T5–T9 + funcionales T10–T11):** separadas explícitamente según el dictamen — comprenderán la comprensión sin audio, la persistencia de texto en transiciones, los controles por teclado, la voz fallida sin bloqueo, el movimiento reducido y la política de autoavance, cuando exista reproductor (R10/R12).

## Estado resultante

P0-1 y P0-2 resueltos; P1-1 a P1-4 resueltos; P1-5 en curso (solicitud formal registrada). H5 queda en las condiciones definidas por Coordinación: **aceptación definitiva condicionada a la aprobación compartida del contrato**. Ninguna otra acción de este encargo ha sido iniciada (ni reproductor ni conversión masiva).
