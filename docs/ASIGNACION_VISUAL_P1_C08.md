# Asignación visual P1 — episodio DQ.P1.C08.E01 (I, 8)

Registro del estado de la **imagen propia por pregunta (DC-24)**, la **secuencia
narrativa de desbloqueo (encargo P1 §D)** y los **recursos todavía pendientes**
tras la corrección P1. Fuente de plan: Issue #61; decisiones DC-23 a DC-27 en
`VISION_Y_DECISIONES.md`. Herramienta de garantía: reglas nuevas en
`tools/editorial_validation/validate.py` (presentación de `ordering` no resuelta
y exclusividad de imagen por pregunta en `EPISODIOS_CON_IMAGEN_PROPIA`).

## 1. Resueltas con catálogo productivo (6)

| Pregunta | Activo propio | Clase | Nota |
|---|---|---|---|
| DQ.Q.000102 | `DQ.MA.900030` (escena siluetas) | RECREACION_IA | Encuadre parcial; no cuenta el número textual |
| DQ.Q.000103 | `DQ.MA.900005` (molino pre) | RECREACION_IA | Momento seguro previo a la embestida |
| DQ.Q.000104 | `DQ.MA.901003` (closeup batalla) | RECREACION_IA | Catalogado en esta PR (ver §4); no dibuja la respuesta |
| DQ.Q.000107 | `DQ.MA.900029` | RECREACION_IA | Pregunta bloqueada hasta narrar frailes (§3) |
| DQ.Q.000110 | `DQ.MA.900031` | RECREACION_IA | Pregunta bloqueada hasta narrar el vizcaíno (§3) |
| DQ.Q.000112 | `DQ.MA.000026` (hotspot) | ACUARELA_HISTORICA | Recurso secundario excepcional (DC-26); `DQ.LIC.0001`, redistribución condicionada |

La reutilización de un mismo activo entre dos preguntas del episodio quedó
prohibida por regla de paquete (DC-24): hoy ninguna imagen se comparte. La
pre-imagen heredada «desde la pregunta anterior hacia atrás» se eliminó del
consumidor (`ModoAventura`): cada pregunta muestra solo su imagen propia.

## 2. Pendientes del encargo artístico A01 (6)

Estas preguntas **no tienen aún imagen propia** y se presentan con fondo neutro
(fallback técnico permitido por DC-24/DC-25; no las declara visualmente
terminadas ni publicables). No se creó ningún ID nuevo sin verificar unicidad y
no se asignaron activos ajenos para tapar el hueco.

| Pregunta | Composición prevista (Issue #61) | Condición editorial |
|---|---|---|
| DQ.Q.000101 | NUEVA Q101 — Sancho haciendo su advertencia | Sin primer plano que dibuje la respuesta |
| DQ.Q.000105 | NUEVA Q105 — carga a caballo | No representa el mecanismo de la caída; tras I11 |
| DQ.Q.000106 | NUEVA Q106 — campo después del combate | Sin mostrar pruebas de las opciones |
| DQ.Q.000108 | NUEVA Q108 — mosaico de 4 sucesos desordenados | Sin números ni flechas; tras el vizcaíno |
| DQ.Q.000109 | NUEVA Q109 — desacuerdo Quijote/Sancho | Sin representar las parejas resueltas; tras frailes |
| DQ.Q.000111 | NUEVA Q111 — Quijote ante coche y señora | Sin revelar la fórmula exacta; tras la presentación |

Al integrar el lote A01: catalogar cada imagen como MediaAsset con ID único
verificado, licencia real y spoiler ninguno, asignarla en
`visual_requirements` de su pregunta y dejar que las reglas del validador
(DC-24, spoiler de pre-imagen) verifiquen el resultado. El consumidor no
necesitará cambios: la asociación es por ID en los datos.

## 3. Secuencia narrativa y dependencias registradas

La visibilidad se deriva por identificadores (`question.passage_ids` ⊆ pasajes
citados por los beats del episodio), nunca por posición de fichero:

- **Desbloqueadas hoy (narración I01–I16, molinos):** Q.000101–Q.000106 y
  Q.000112 (ejercicio visual de la embestida). El reproductor de Historia
  termina en I16 y su cierre remite al Modo Aventura; esas 7 preguntas cubren
  solo hechos narrados.
- **Bloqueadas hoy:** Q.000107–Q.000111. **Dependencia registrada (no
  simulada):** requieren narración de los lances de frailes, señora del coche y
  vizcaíno — pasajes `DQ.P1.C08.P0007`–`P0011`, sin beats en el paquete
  (Historia cubre P0001–P0006 y P0012–P0017). Cuando una PR futura amplíe los
  beats más allá de I16, el desbloqueo será automático por la misma derivación
  de IDs; no habrá que tocar la UI. Queda pendiente de decisión de Dirección
  cualquier umbral adicional por jugador (p. ej., exigir progreso del Modo
  Historia para abrir Aventura); esta PR no lo implementa ni lo simula.
- `DQ.P1.C08.E01` queda intacto; los datos de episodio, escenas y beats no se
  modificaron.
- El resumen de fin de episodio informa honestamente: «Otras 5 preguntas de
  este capítulo llegarán cuando la narración del Modo Historia alcance sus
  lances».

## 4. Catalogación de `DQ.MA.901003` (primer plano `don_quixote_battle.webp`)

Verificaciones realizadas antes de catalogar:

- Fichero existente: `assets/closeups/don_quixote_battle.webp`; **sha256
  `1bf7ae2f…7008`**, **1254×1254**, **275 942 bytes** — coinciden con
  `assets/closeups/manifest.json` (id `quixote_battle`, candidato
  `DQ.MED.901003`) y verificados de nuevo contra el fichero en esta PR.
- **ID `DQ.MA.901003` único** en todo el paquete (no existía registro previo;
  convención DQ.MED→DQ.MA según `AUDITORIA_MAESTRA_PATRIMONIO_VISUAL.md`).
- Licencia y fuente reales, no inventadas: `DQ.LIC.0002` (derechos propios del
  proyecto — recreaciones) y `DQ.SRC.0003` (producción original), las mismas
  que el resto de recreaciones IA catalogadas.
- `spoiler_level: ninguno`, inspeccionado visualmente: retrato de embestida sin
  desenlace ni respuesta dibujada (`pre_image_must_not_reveal` satisfecho).
- `review.state: borrador` — sin modificar estados de revisión para obtener
  validaciones artificiales; la aceptación artística corresponde a Dirección.
- Puertas de licencia repo/app: `verificada` + `uso_personal_app` +
  `almacenamiento_repo_git` (idéntico patrón que `DQ.MA.900005`).

## 5. Ordenación: corrección sistémica aplicada

- Datos: las 4 preguntas de ordenación del paquete
  (DQ.Q.000108, DQ.Q.000225, DQ.Q.000318, DQ.Q.000324) presentan ahora un
  orden de opciones que **no** coincide con `correct_order`; IDs,
  `correct_order` y evaluación por identificadores quedan intactos.
- Validador: nueva regla intra-registro (presentación de `ordering` ≠
  `correct_order`) y regla de paquete DC-24 descrita arriba, con fixtures
  positivos y negativos.
- Consumidor: `presentacion.ts` garantiza en runtime presentación
  determinista no resuelta (sin azar) y mantiene la operabilidad por teclado
  (opciones como botones enfocables, EF-ACC-01).
- Prueba: `app/tests/presentacion.test.ts` recorre TODAS las `ordering` del
  paquete real —incluida DQ.Q.000108— y verifica las tres garantías.
