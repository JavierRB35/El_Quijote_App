# Capítulo I.5 — integración técnica de Aventura e Historia

**Fecha:** 2026-11-11 · **Fuente:** `content/textos/gutenberg_2000/El_Quijote.txt`, DQ.ED.0003 / DQ.SRC.0005, Parte I, capítulo V, líneas 1917–2077.

## Alcance ejecutado

- **Aventura:** cinco rondas `AV2-I5-01…05`, tres alternativas cada una, respuestas correctas **B/A/C/A/B**, preimagen exclusiva por ronda, revelación de consecuencia tras la elección y checkpoints tras R03 y R05.
- **Historia:** once escenas, treinta intervenciones completas visibles (TS-001), una cita literal y veintinueve adaptaciones fieles, con recurso visual aprobado del manifiesto por intervención.
- **Registro:** `DQ.P1.C05.E01` incorporado al selector genérico. Se reutilizan sin modificaciones los componentes y motor narrativos, así como la persistencia v2 individual por episodio; ningún nuevo componente específico.
- **Cobertura de medios:** solo recursos de `review_state: aprobada` según `assets/scenes/manifest.json`. PRE R01 reutiliza el cierre H14 aprobado del capítulo IV por continuidad cronológica; POST R01 usa la recreación de romance aprobada del V. R02 PRE usa la versión corregida aprobada y R02 POST el auxilio aprobado. R03 PRE usa el recurso de labrador ya reconocido; POST la escena de regreso H04 (don Quijote sobre el asno, Rocinante presente). R04 utiliza A07 PRE y A08 POST aprobados. R05 PRE usa H10 y POST A10. Historia usa H03–H11 aprobadas y planos del comienzo; se excluyen dos alternativas explícitamente no aprobadas. Los usos nuevos y la reserva de cronología en A08 requieren QA de pantalla.
- **Contratos:** `pasajeId: null` en las cinco rondas por no constar una ficha fraccionada verificable; declaradas en `pendientes_editoriales`, como en I.4. Estado `piloto_integrado` permite uso técnico en fase 1; **NO equivale a aprobación final de contenido, derechos o interfaz**. `revision_visual: pendiente` respeta DC-28.
- **Límites narrativos:** Valdovinos, marqués de Mantua, Abindarráez, Rodrigo de Narváez, Jarifa, Urganda y gigantes no aparecen como actores reales. Ninguna quema o escrutinio se presenta como acontecimiento consumado: son del capítulo VI. Se mantiene la forma original «señor Quijana» y la cita literal del corpus.

## Validación y pendientes reales

Añadidas pruebas `tests/dev/test_capitulo_05.py` y `app/tests/capitulo_05.test.ts`, integradas en el CI de contrato: conteos, IDs, consecuencias, checkpoints, texto TS-001, hash SHA-256 de medios aprobados, exclusión de variantes no validadas y coherencia con la fuente. El resultado de CI debe consultarse en la ejecución real del commit: **no se afirma PASS sin evidencia**.

**Pendiente:** evaluación manual de imágenes **en contexto** (zonas seguras y el texto completo a 1920×1080, 1366×768 y 1280×800, escala tipográfica, mute, teclado, antiespoiler, cronología de R04/A08), aptitud específica de la reutilización I.4 H14 como PRE de I.5, licencia de redistribución fuera del piloto privado y eventuales ajustes editoriales. Ninguna revisión visual se marca verificada por la mera integración del JSON; no se declara completada la validación premium.

**Normas:** AGENTS, directriz ágil, DC-18, DC-24, DC-28–DC-36, protocolo capítulo X, TS-001, DC-31, dirección artística y flujo por capítulos. No se altera el código de pantalla ni se generan imágenes nuevas.
