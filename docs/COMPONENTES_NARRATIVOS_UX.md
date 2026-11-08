# COMPONENTES NARRATIVOS — Especificación de UX y contrato del consumidor (Dirección integral / desarrollador)

**Estado:** especificación histórica v1.0, actualizada en decisiones de producto **DC-23–DC-27 (2026-11-08)**; **no es evidencia de implementación**. Dirección integral define y revisa; el desarrollador único implementa y prueba. Los anteriores informes R08/R10 son antecedentes, no equipos operativos.
**Base normativa:** DC-22 (TS-001 — texto hablado siempre escrito y visible), decisión de coordinación del propietario (texto = elemento principal del contrato; audio = recurso opcional asociado), `schemas/content/beat.schema.json` (contrato v1.1.0), ADR-0005.
**Fecha:** 2026-11-06.

## 1. Representación de una intervención narrativa (estructura de datos ↔ pantalla)

| Campo del contrato | En pantalla |
|---|---|
| `utterance_id` (DQ.INT.*) | Identificador interno; clave del estado de reproducción y del guardado |
| `speaker.tipo` + `label`/`person_id` | **Rótulo de hablante** sobre el texto: nombre del personaje, o «Narrador» en estilo distinto (versalitas/itálica) |
| `texto_visible` (obligatorio, íntegro) | **Panel de texto**: siempres visible, completo, sin truncar ni paginar por defecto; es la fuente principal de la escena |
| `text_kind` | Tratamiento tipográfico: CITA_LITERAL con comillas latinas y atribución; ADAPTACION_FIEL con nota discreta «adaptado»; NARRACION_ENLACE estilo narrador |
| `passage_ids` + `localizador` | Acción «ver en el lector» (enlace a pasaje; desactivada sin capa textual) |
| `audio_asset_id` (opcional) | **Control de voz**: reproduce si existe; si falta, silencio y el panel funciona igual (criterio de aceptación) |
| beat `visual_asset_ids` | Fondos de escena (≥1 perspectiva); cross-fade entre beats sin vaciar el fotograma |
| beat `order` / `manual_advance_allowed` / `replay_allowed` | Habilitan los controles «Siguiente/Atrás» y «Repetir» |
| `reduced_motion_fallback` | Con movimiento reducido: cambio de plano sin deriva, transición instantánea |

## 2. Estados del reproductor de beats — matriz subsanada (dictamen H5)

Alcance de «texto siempre visible»: el **texto íntegro de la intervención activa** permanece en pantalla durante todo su beat (y es recuperable íntegro al retroceder); no significa mantener la novela entera fijada en una sola pantalla.

**Invariante P0-1 (sin rutas de avance dependientes del audio):** existe siempre una vía de avance que no requiere voz. La voz —ausente, silenciada, fallida o terminada— nunca bloquea, nunca oculta el texto y nunca es condición necesaria para continuar.

### 2.1 Estados

| Estado | Descripción | Sale por |
|---|---|---|
| `TEXTO_VISIBLE` | El texto íntegro del beat se muestra **desde que los DATOS del beat están listos** — nunca se espera a las imágenes | avance (auto/manual) → `TRANSICION`; voz disponible y auto → `CON_VOZ` |
| `CON_VOZ` | Voz sonando; el texto completo está en pantalla desde el primer instante | fin de voz → `TEXTO_VISIBLE` (el texto permanece; el fin de la voz NUNCA oculta ni avanza por sí solo) |
| `EN_PAUSA` | Pausa activada: voz y temporizador de autoavance detenidos; **texto íntegro en pantalla** | continuar → estado previo |
| `ERROR_VOZ` | Audio ausente/corrupto: aviso discreto una sola vez; la escena continúa **por texto**, con avance disponible | continuar normal |
| `TRANSICION` | Cambio de beat: el texto del beat entrante aparece **antes** de resolver su imagen; el saliente persiste hasta que el entrante tiene texto legible (sin marco en blanco) | beat listo → `TEXTO_VISIBLE` |

`AVANCE_BLOQUEADO` queda **eliminado** (era alcanzable con `manual_advance_allowed: false` + sin voz). Sustituido por `ESPERA_DE_VOZ`, sub-estado interno de la política automática que **solo existe mientras hay voz sonando** (ver §2.3); sin voz, el avance manual está siempre disponible aunque el beat declare `manual_advance_allowed: false`.

### 2.2 Carga de recursos (P1-4)

1. El beat entra en `TEXTO_VISIBLE` cuando sus **datos** (texto, hablante) están listos: las imágenes se cargan **en paralelo** y nunca gatean el texto.
2. Fallback visual **sujeto a elegibilidad temporal**: perspectivas aprobadas del beat → de la escena → fotograma anterior **solo si no ha caducado ni anticipa nada** → fondo neutro seguro. El neutro deliberado no es un error; el fallo de carga real puede notificarse discretamente. **La narración continúa íntegra por texto**. Esto sirve al vertical técnico, no demuestra suficiencia visual final.
3. **Diferenciar versión ejecutada y decisión de producto:** el esquema actualmente integrado exige `visual_asset_ids.minItems:1` y `scene.media_ids.minItems:1`; el cambio **a arrays vacíos permitidos y obligatorios** pertenece al encargo técnico de v1.2.0 y **no se considera implementado hasta fusionar y probar la PR**. La revisión es de Dirección integral + desarrollador único, **no doble firma de roles antiguos**. `[]` de beat significa no solicitar nuevo plano; cambio a escena neutra reinicia imagen. La obligatoriedad de una imagen específica por pregunta final (DC-24) y la suficiencia visual narrativa (DC-25) son **criterios de producto distintos**, no cardinalidad por beat.

### 2.3 Política de autoavance (P0-2 — cinematografía DC-21)

El Modo Historia avanza **ordinariamente en automático**, con lectura garantizada:

1. **Duración mínima del beat** = `max(duración_de_voz, lectura_mínima)` donde `lectura_mínima = max(1500 ms, 800 ms + 35 ms/palabra de texto_visible)` — parámetros ajustables por el piloto (no segundos arbitrarios fijados a mano). Un beat puede fijar `lectura_minima_ms` propio, que **solo puede ELEVAR** ese suelo (mínimo 1; nunca rebaja la política) — **el suelo de lectura garantizado aplica también sin audio** (reauditoría H5).
2. El autoavance se dispara solo cuando `voz terminada (si la hay)` **y** `lectura_mínima cumplida`. **El fin de la voz por sí solo no avanza ni oculta nada**: si la voz termina antes, el texto permanece hasta cumplir su tiempo de lectura.
3. La preferencia se define por perfil (`avance_automatico`: automático / manual / velocidad) y cada beat puede anularla (`avance_automatico: true|false`).
4. **Pausa** detiene voz y temporizador; **Continuar** los reanuda; **Retroceder** relee el beat anterior íntegro; **Salto manual** siempre disponible salvo la única excepción del §2.1 (espera de voz), y siempre disponible sin voz.
5. Con `avance_automatico: false` (perfil o beat), todo el avance es manual y el texto no caduca nunca.

### 2.4 Controles (P1-3 — reconciliación con los flags del beat)

Los **cuatro controles del propietario existen siempre**: Pausa, Continuar, Repetir, Retroceder (DC-21: «pausa, repetición, retroceso y salto manual»). Los flags del beat son **sugerencias de ritmo cinematográfico**, no restricciones de controles:

| Flag | Único efecto |
|---|---|
| `manual_advance_allowed: false` | Difiere el salto manual **solo mientras hay voz sonando y queda lectura pendiente**; sin voz (o con voz terminada) el salto manual queda disponible. Pausa y Retroceder jamás se deshabilitan. |
| `replay_allowed: false` | Deshabilita únicamente la **repetición de la voz**; el control Repetir sigue operable sobre el texto (reinicia el beat y su legibilidad). |

Queda prohibido inventar modos bloqueantes o ocultar controles por combinación de flags.

### 2.5 Proyección texto_visible → texto_oral (P1-5)

Semántica de FICHA_ESCENA_P1_C08 §3 (caso de referencia del dictamen, «—respondió Sancho—»):

| Campo | Contenido |
|---|---|
| `texto_visible` | **Íntegro y literal en pantalla**, incluidos los incisos del narrador («—respondió Sancho—»), que forman parte del texto literario |
| `incisos_narrador` | Los fragmentos del inciso; pertenecen al **narrador**, no al personaje |
| `texto_oral` | Lo que se entrega al intérprete de voz: **solo las palabras del hablante**, con los incisos retirados y la raya de diálogo eliminada; ausente = la voz lee `texto_visible` verbatim (caso del Narrador) |

Regla verificable en el validador (activa): **ningún inciso del narrador puede aparecer en `texto_oral`** — la voz jamás lee incisos del narrador. La asignación de pausas y segmentación de la voz es decisión del guion de voz (R07, cue sheet por intervención) derivada de estos campos, sin divergencias entre lo mostrado y lo grabado.

## 4. Matriz de pruebas derivada del criterio de aceptación

| # | Prueba | Tipo | Cuándo |
|---|---|---|---|
| T1 | Toda intervención del catálogo tiene `texto_visible` no vacío **y con contenido** (rechazo de solo-espacios, P1-6) | Automática (contrato: suite 51/51) | Activa |
| T2 | CITA_LITERAL/ADAPTACION_FIEL con pasaje de respaldo existente | Automática (contrato) | Activa |
| T3 | Audio sin texto visible es imposible; audio con referencia rota o sin formato de voz se rechaza | Automática (contrato: paquetes negativos) | Activa |
| T4 | `utterance_id` único y `order` único por escena | Automática (contrato) | Activa |
| T4b | Proyección visible→oral sin divergencias: ningún `incisos_narrador` aparece en `texto_oral` (caso «—respondió Sancho—», P1-5) | Automática (contrato: fixture beat_oral_incisos) | Activa |
| T5 | Comprensión de escena completa con sonido desactivado (recorrido sin audio) | Usabilidad (caja negra) | Con reproductor (pendiente) |
| T6 | Ninguna transición oculta texto antes de ser legible (recorrido + capturas por estado) | Usabilidad + accesibilidad | Con reproductor (pendiente) |
| T7 | Controles pausa/continuar/repetir/retroceder operables solo con teclado | Accesibilidad | Con reproductor (pendiente) |
| T8 | Voz fallida o ausente: la escena avanza sin error bloqueante — **ninguna combinación de flags bloquea sin voz (P0-1)** | Automática (mock) + manual | Con reproductor (pendiente) |
| T9 | Movimiento reducido: sin deriva; texto idéntico | Accesibilidad | Con reproductor (pendiente) |
| T10 | Política de autoavance (P0-2): el autoavance respeta `max(voz, lectura_mínima)`; fin de voz solo no oculta texto; pausa congela voz y temporizador | Automática (mock) + manual | Con reproductor (pendiente) |
| T11 | Texto primero: con imágenes ausentes, lentas o erróneas, el texto aparece y la narración continúa (P1-4) | Automática (mock) + manual | Con reproductor (pendiente) |

T5–T9 (y T10–T11 funcionales) **siguen pendientes de ejecución real hasta nueva evidencia**: alimentarán pruebas de usabilidad y componentes del desarrollador único, con aceptación de Dirección. Las pruebas de contrato T1–T4b no constituyen prueba de visualización real. Añadir QA de imagen específica por pregunta, cobertura cinematográfica por capítulo y galería artística de acuarelas con fuente y derechos.
