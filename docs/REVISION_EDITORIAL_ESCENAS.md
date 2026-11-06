# REVISIÓN EDITORIAL DEL PAQUETE VISUAL — 35 escenas (FASE 1, modo CONTENIDOS)

**Fecha:** 2026-11-05 · **Revisor:** responsable editorial (curaduría) · **Alcance:** revisión de **coherencia de metadatos** (capítulo, fase narrativa, título y `spoiler_risk` declarados) contra el mapa de capítulos, el dossier del piloto y la política de fases. **Limitación declarada:** la inspección visual de los WebP no estuvo disponible en esta sesión (sin transcodificador); la verificación visual completa corresponde al equipo de arte/QA antes de `review_state: aprobada`.

## Veredicto global

- **35/35 escenas coherentes a nivel de metadatos**: cada `title_es` corresponde al contenido canónico de su capítulo (cotejado contra `docs/data/mapa_capitulos.json` y el dossier del piloto); ninguna fase contradice el orden narrativo; los tres `post` de la primera batería y los `post`/`pre` de las baterías 2-3 están bien asignados.
- **Política de spoilers bien aplicada en los prompts**: todas las escenas `pre` evitan el desenlace (molinos sin caída, león sin reacción, Blanca Luna sin combate, Camacho sin ardid de Basilio, cueva sin interior) — compatible con la regla de paquete «pre-imagen con `spoiler_level: ninguno`».
- **Continuidad artística**: las escenas de conversación (`p2_c01_recuperacion_pre`, propuesta de `p2_c01_loco_sevillano_reveal`) comparten sala y luz por diseño.

## Tabla por batería (metadatos)

| Batería | Escenas | Capítulos cubiertos | Observaciones |
|---|---|---|---|
| 1 (`ae927a1`) | 11 (900001-900011) | ref + I.1, I.2, I.8, I.11, I.18, II.41, II.61, II.74 | 900001 `reference` → migrará a `MediaFunction.function: referencia` (MINOR ya incorporada por la sesión 3) |
| 2 (`f93f031`) | 12 (900012-900023) | I.3, I.6, I.20, I.22, I.25, I.35, I.46, II.10, II.17, II.26, II.45, II.64 | 900013 cubrió el hueco `before` de I.6 del piloto |
| 3 (`22316e0`) | 12 (900024-900035) | I.14, I.21, I.23, I.30, I.38, II.1, II.20, II.22, II.29, II.30, II.54, II.62 | 900029 cubrió el hueco `before` de II.1 del piloto |

## Pendientes del piloto tras esta revisión

1. **2 huecos de fase restantes** → solicitados como cuarta batería en `PROMPTS_REGENERACION.md`: `p1_c06_hoguera_corral_post` (I.6-after) y `p2_c01_loco_sevillano_reveal` (II.1-reveal).
2. **Verificación visual** de las 35 escenas (equipo arte/QA), antes de elevar `review_state` a `aprobada`; foco recomendado: continuidad de personajes con `personajes_referencia.webp` y ausencia de anacronismos.
3. Al integrar escenas nuevas: actualizar `manifest.json` (hash/size) y la proyección canónica (`DQ.MA.*`) para que el paquete editorial pueda referenciarlas.

## Verificación visual (2026-11-06, modo CONTENIDOS — Pillow disponible)

Transcodificación WebP→PNG con Pillow (13.0.0) e inspección de 2 escenas clave:

| Escena | Veredicto | Detalle |
|---|---|---|
| `_art_direction/personajes_referencia.webp` | **PASS** | Don Quijote alto/enjuto con armadura vieja funcional; Sancho bajo/robusto, sombrero y chaleco ocre; Rocinante enjuto pardo claro; rucio gris; espacio a la derecha para UI — referencia de continuidad válida |
| `p1_c08_molinos_pre.webp` | **PASS** | Continuidad con la referencia; molinos solo en el horizonte, **sin carga ni caída** (fase pre, spoiler-safe); sujeto en tercio izquierdo y cielo/camino a la derecha para UI. Nota menor: ~8 molinos visibles frente a los «treinta ó cuarenta» del texto — licencia artística aceptable; la pregunta del cómputo se apoya en el texto, no en la imagen |

**Método repetible:** Pillow → PNG redimensionado → inspección; el resto de escenas se verificará por lotes con este patrón antes de elevar `review_state` a `aprobada`.
