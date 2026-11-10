# Capítulo I.3 — expediente de integración técnica y puertas de aceptación

**Fecha:** 2026-11-10 · **Fuente/destino:** `JavierRB35/El_Quijote_App`, rama `main`. **Norma:** protocolo de elaboración de capítulo X, DC-18, DC-28, DC-31–DC-36 y TS-001.

## Trabajo integrado de esta fase

- **Aventura:** cuatro rondas editorialmente aprobadas, tres acciones cada una y una respuesta canónica (B). Datos en `content/aventura/parte_1/capitulo_03.json`, incluyendo consecuencias, puntuación heredada del motor común, checkpoints tras R02/R04, localizador al corpus `DQ.SRC.0005` y cuatro preimágenes diferentes. Todos los `pasajeId` están en `null` por no haberse creado pasajes físicos fraccionados, correctamente declarados como pendientes.
- **Historia:** once escenas y treinta intervenciones editoriales aprobadas, textos completos para TS-001 (dos citas literales cotejadas), clasificación de fuente, hablantes, localizadores y planos por beat en `content/historia/parte_1/capitulo_03.json`.
- **Imágenes:** existen físicamente 15 WebP catalogados en `assets/scenes/part_1/chapter_03`. Las once solicitadas por el propietario están en `review_state=aprobada`. Las cuatro anteriores (`p1_c03_vela_armas_pre`, `p1_c03_arriero_pozo_pre`, `p1_c03_ventero_libro_cuentas_pre`, `p1_c03_investidura_post`) **siguen como `borrador`**. No alterar las aprobaciones sin evidencia.
- **Episodio técnico:** `DQ.P1.C03.E01`, capítulo independiente, sin formalizar la propuesta histórica multicapítulo I.3–I.5.
- **Validaciones añadidas:** `tests/dev/test_capitulo_03.py`, `app/tests/capitulo_03.test.ts` y paso de CI en `.github/workflows/validar-contrato.yml`. Los controles automáticos verifican esquema DC-34, archivos, SHA-256 de medios aprobados, texto, orden y progreso mediante la suite existente. No se atribuyen resultados hasta la ejecución real de GitHub Actions.

## Matriz de Aventura

| Ronda | Preimagen | Consecuencia | Revisión |
|---|---|---|---|
| R01 — petición al ventero | `p1_c03_a01_encuentro_caballeriza_pre` | `p1_c03_a02_promesa_ventero_post` | Ambas imágenes aprobadas |
| R02 — primer arriero | `p1_c03_vela_armas_pre` | `p1_c03_a04_golpe_primer_arriero_post` | **Preimagen solo candidata**: el plano representa la vela anterior a la llegada del arriero, no necesariamente el instante en que ya ha arrojado las armas |
| R03 — ventero apresura ceremonia | `p1_c03_a05_silencio_tras_pedrea_pre` | `p1_c03_a06_ventero_abrevia_ceremonia_post` | Ambas aprobadas |
| R04 — gestos de investidura | `p1_c03_a07_ceremonia_previa_pre` | `p1_c03_a08_espaldarazo_improvisado_post` | Ambas aprobadas |

La R02 **no queda visualmente aceptada**: la preimagen de vela fue considerada compositivamente apta por el propietario, pero todavía requiere comprobar la relación exacta con la pregunta, la continuidad, el spoiler y la disposición de las opciones. Si no encaja, debe solicitarse A03 sin falsear que la ronda está cubierta.

## Historia y reservas editoriales

Se emplean las escenas nuevas A01/A02, H-A, A04, H-B, A05/A06, A07/A08, H-C/H-D y se referencian como **candidatas no activadas** las antiguas de vela (H05), arriero-pozo (H06 y transición H07), libro-de-cuentas (H09) e investidura (H10). H-B no se muestra hasta el relato de las piedras; H-D no se muestra hasta la salida. El uso contextual de arriero-pozo en H07-I01 para un **segundo** arriero requiere revisión de continuidad, pues un mismo personaje visible no debe parecer atacado dos veces.

## Puertas para declarar capítulo COMPLETO

1. **Aprobación visual/documental de los cuatro originales**, o sustitución de sus usos por recursos aprobados y narrativamente exactos, conservando derechos, provenance y QA. La decisión previa sobre su *aptitud por modo* no cambió el `review_state` a `aprobada`.
2. **Resolución material de A03/R02:** verificar el WebP `vela_armas_pre` en su composición real, comparar el instante L1539–1553 con la pregunta L1553–1575 y decidir reutilización específica o nueva preimagen.
3. **Revisión final DC-28/TS-001:** capturas y pruebas a 1920×1080, 1366×768 y 1280×800; texto completo con mute y fuente ampliada, teclado, movimiento reducido, sin scroll interno ni recorte, antiespoilers y offline. Un test de JSON no sustituye estas evidencias.
4. **Activación técnica posterior a esas puertas:** ambos catálogos se mantienen en `estado_editorial="en_revision"`, `revision_visual="pendiente"`. No se registra I.3 en `content/capitulos/registro.json` hasta estar apto, pues ello expondría al usuario a medios pendientes y a un posible error del reproductor (que solo admite aprobados). No cambiar por iniciativa propia las aprobaciones pendientes.

**Estado:** fuentes, textos, medios solicitados y catálogos formalizados; **capítulo I.3 NO ACTIVADO ni declarado visualmente terminado**. Los controles de CI deben consultarse por SHA real antes de declararlos correctos.
