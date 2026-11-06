# COMPONENTES NARRATIVOS — Especificación de UX y contrato de consumidor (R08/R10)

**Estado:** v1.0 — entregable de documentación (R08: especificación de componentes y estados; R10: contrato de consumidor y tabla de eventos/estados). **Sin implementación en este encargo** (R10: «No implementar en este encargo»).
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

## 2. Estados del reproductor de beats (tabla de eventos/estados, R10)

| Estado | Descripción | Sale por |
|---|---|---|
| `CARGANDO` | Catálogo o assets del beat en camino | assets listos → `TEXTO_VISIBLE` |
| `TEXTO_VISIBLE` | Texto completo en pantalla; sin voz o voz no iniciada | usuario → `REPRODUCIENDO` (si hay voz) / `EN_PAUSA` |
| `REPRODUCIENDO` | Voz sonando; texto completo visible desde el primer instante | fin de audio → `TEXTO_VISIBLE` (avance manual) |
| `EN_PAUSA` | Voz detenida; **texto sigue visible** (nunca se oculta) | continuar → estado previo |
| `AVANCE_BLOQUEADO` | `manual_advance_allowed: false`: solo se avanza al terminar la voz | fin de voz → `TEXTO_VISIBLE`+avance |
| `ERROR_VOZ` | Audio ausente/corrupto: aviso discreto; **la escena continúa por texto** | continuar normal |

Reglas invariables (TS-001):

1. **El texto aparece completo en el primer fotograma del beat** y no desaparece en ninguna transición hasta que el jugador avanza (criterio del propietario: «ninguna transición debe hacer desaparecer texto antes de que el jugador haya tenido oportunidad de leerlo»).
2. Nunca se requiere oír nada para entender ni avanzar (criterio: «entenderse completamente con el sonido desactivado»).
3. El audio nunca sustituye, recorta ni retrasa la aparición del texto.

## 3. Controles (tabla del propietario)

| Control | Comportamiento | Disponible |
|---|---|---|
| **Pausa** | Detiene la voz (si suena); el texto permanece | siempre que haya voz activa |
| **Continuar** | Reanuda la voz o avanza al siguiente beat según estado | siempre |
| **Repetir** | Reinicia el audio del beat actual (`replay_allowed: true`); el texto no parpadea | `replay_allowed` |
| **Retroceder** | Beat anterior (texto anterior vuelve íntegro) | hay beat previo |
| Avance manual | `manual_advance_allowed: true` → botón/teclado avanza sin esperar voz | según beat |

Operables por teclado (orden de foco: controles → opciones → continuar) y con áreas de toque generosas; los cuatro controles del propietario son obligatorios en la barra del reproductor.

## 4. Matriz de pruebas derivada del criterio de aceptación

| # | Prueba | Tipo | Cuándo |
|---|---|---|---|
| T1 | Toda intervención del catálogo tiene `texto_visible` no vacío | Automática (contrato: suite 49/49) | Activa |
| T2 | CITA_LITERAL/ADAPTACION_FIEL con pasaje de respaldo existente | Automática (contrato) | Activa |
| T3 | Audio sin texto visible es imposible; audio con referencia rota o sin formato de voz se rechaza | Automática (contrato: paquetes negativos) | Activa |
| T4 | `utterance_id` único y `order` único por escena | Automática (contrato) | Activa |
| T5 | Comprensión de escena completa con sonido desactivado (recorrido sin audio) | Usabilidad (caja negra) | FASE 1 QA |
| T6 | Ninguna transición oculta texto antes de ser legible (recorrido + capturas por estado) | Usabilidad + accesibilidad | FASE 1 QA |
| T7 | Controles pausa/continuar/repetir/retroceder operables solo con teclado | Accesibilidad | FASE 1 QA |
| T8 | Voz fallida o ausente: la escena avanza sin error bloqueante | Automática (mock) + manual | FASE 1 QA |
| T9 | Movimiento reducido: sin deriva; texto idéntico | Accesibilidad | FASE 1 QA |

T5–T9 alimentarán la batería de usabilidad del §7.4 (perfiles de caja negra) y, tras autorizarse el framework de pruebas de UI (R12), las pruebas automáticas de componente.
