# ENTREGA R11 — ADR-0005 / H5: Persistencia visual y política de fallback del Modo Historia

**Para:** R14 — Coordinación, arbitraje y cierre H5
**De:** R11 — UX, Interacción y Accesibilidad (encargo P0, runtime SIN GO)
**Fecha:** 2026-11-07
**Base documental:** `main` de `JavierRB35/El_Quijote_App` @ `3334cb5` (incluye fusión de PR #47, visado editorial 26/26) — SHA verificado contra el remoto en el momento de la publicación
**Dictamen R14 sobre esta propuesta (2026-11-07):** «PROPUESTA FUNCIONAL ACEPTADA CON CONDICIONES» — aceptación **funcional y provisional**; no autoriza modificar el esquema ni declarar cerrado ADR-0005/H5. Publicación tramitada como PR exclusivamente documental a petición de R14.
**Alcance:** documental y de diseño funcional. **No modifica schemas, no implementa reproductor, no genera recursos, no fusiona, no declara resuelto ADR-0005/H5.**

---

## 0. Resumen ejecutivo

1. La salvedad H5 es **real y bloqueante para la conversión del guion a datos**: hoy no existe forma válida de declarar un beat con plano persistente (array vacío → `SCHEMA_ERROR` por `minItems: 1`), y forzar ≥1 identificador obliga a duplicar activos (vacío de sentido editorial) o a inventar imágenes (contrario a DC-03 y a la biblia §5).
2. **Recomendación principal: Opción 2** — mantener `visual_asset_ids` como campo **obligatorio** y permitir `[]` como declaración editorial explícita de persistencia. Cambio MINOR (v1.2.0), sin migración de datos existentes.
3. La resolución visual se define como **función determinista** con herencia **intra-escena**, reinicio en frontera de escena, cascada de fallo (beat → perspectiva activa → fondo neutro) y **garantía absoluta: el texto nunca espera a una imagen** (invariante P1-4 ya activo).
4. Se elevan a Coordinación **cinco discrepancias concretas** entre disciplinas (§7), la mayor: el `kind: TRANSICION` de la ficha B09 no existe en el enum del contrato.
5. **Dictamen: CONFORME CON CONDICIONES.** La solución funcional es inequívoca; el cierre de H5 queda condicionado a la evaluación de R09, la coaprobación editorial-técnica y la autorización de R14.

---

## 1. Entregable 1 — Diagnóstico de la salvedad H5

### 1.1 Qué introduce la obligatoriedad actual

El contrato vigente (`schemas/content/beat.schema.json`, líneas 7 y 34–40) exige `visual_asset_ids` en `required` **con `minItems: 1`**. El propio esquema anota su estado: «Pendiente de DOBLE FIRMA (dictamen H5 punto 4): la obligatoriedad de ≥1 perspectiva por beat es desviación de la biblia §4 mantenida en el dato editorial». ADR-0005 la marca igualmente como desviación pendiente de doble firma tras la corrección P1-c.

La biblia narrativa §4 — fuente editorial del contrato — presenta en su ejemplo canónico `"visual_asset_ids": []`, y su §5 ordena: «No exigir imagen nueva cuando el texto y ambiente comuniquen mejor la situación». La salvedad de R01/R02 (`PAQUETE_REVISION_EDITORIAL.md` §D4.5) declara ese requisito **no firmado editorialmente**.

### 1.2 El problema narrativo: la regla no refleja cómo funciona una secuencia cinematográfica

El Modo Historia es una aventura cinematográfica 2.5D (DC-21). En una puesta en escena cinematográfica real hay momentos que **no producen un plano nuevo por diseño**:

| Momento narrativo | ¿Imagen nueva? | Qué exige el esquema hoy |
|---|---|---|
| Diálogo en el mismo encuadre (p. ej., B03/B04/B08 de la ficha molinos) | No — plano persiste | Un `DQ.MA.*` aunque sea el repetido |
| Intervención del narrador sobre escena estática | No | Ídem |
| Silencio (`kind: SILENCIO`, sin intervención hablada) | No | Ídem |
| Transición narrativa de enlace (p. ej., B09 hacia el Puerto Lápice) | No necesariamente | Ídem |
| Acción dentro del plano ya mostrado | No siempre | Ídem |

### 1.3 La evidencia concreta: ficha de los molinos (I, 8)

La ficha de escena de referencia (`docs/FICHA_ESCENA_P1_C08_MOLINOS.md`, estado `GUIONIZADA_PROPUESTA`) tiene **9 beats y 16 intervenciones**, con solo **3 activos verificados**:

| Beat | Kind | Activo asignado |
|---|---|---|
| B01 | NARRACION | `DQ.MA.900030` (siluetas: hilera de molinos) |
| B02 | DIALOGO | `DQ.MA.900005` (señalamiento con advertencia) |
| B03 | DIALOGO | — sin asignación |
| B04 | DIALOGO | — sin asignación |
| B05 | ACCION | — hueco documentado (§9.3) |
| B06 | ACCION | `DQ.MA.900006` (post: caído, lanza rota) |
| B07 | ACCION | — sin asignación |
| B08 | DIALOGO | — hueco documentado (§9.3) |
| B09 | TRANSICION | — salida literal |

Cumplir `minItems: 1` en los 9 beats obligaría a **duplicar** los 3 activos en 6 beats (B02 repetido cuatro veces, etc.) o a **inventar ≥6 imágenes nuevas**. Ambas salidas son rechazables:

- **Duplicar** vacía de semántica el campo: `visual_asset_ids` se definiría como «perspectivas del beat» (DC-03: varios puntos de vista por episodio); repetir el mismo identificador para pasar la validación no declara ninguna perspectiva, solo satisface un cardinal. Contaminaría además cualquier métrica de cobertura visual («todo beat tiene imagen» sería cierto y falso a la vez).
- **Inventar** contradice la jerarquía de la biblia §5 («nunca eliminar escena significativa por carecer de imagen; no exigir imagen nueva cuando el texto comunica mejor»), la hoja de ruta del Modo Historia («no forzar un recurso visual irrelevante, con spoiler prematuro o derechos no verificados») y multiplica carga de encargos (R06), licencias (R13), QA (R12) y superficie de spoiler.

### 1.4 El problema técnico: la regla no protege nada en ejecución

Desde la subsanación P1-4 (INFORME_SUBSANACION_H5 §P1-4; `COMPONENTES_NARRATIVOS_UX.md` §2.2), la ejecución **nunca gatea el texto por imágenes**: existe ya la cascada documentada «perspectivas del beat → de la escena → fotograma anterior → fondo neutro». Es decir, la obligatoriedad `≥1` **no aporta ninguna garantía de runtime** — la robustez viene de la cascada, no del cardinal. Todo el coste de la regla está en el dato (falsificar o inflar asignaciones) y ningún beneficio en ejecución.

### 1.5 El bloqueo real

- **Hoy no hay forma válida de expresar persistencia**: un beat con plano compartido solo puede validarse mintiendo en el dato. El array vacío produce `SCHEMA_ERROR` (verificado contra el validador actual y `tests/contracts/fixtures/`: todos los fixtures válidos llevan ≥1).
- **Segundo defecto de la ficha frente al esquema:** B09 se declara con `kind: TRANSICION`, valor ausente del enum del contrato — ese dato tampoco validaría hoy (análisis completo y propuesta en D-1, §7).
- La **conversión de las fichas de guion a datos de beat** (siguiente paso del pipeline, requisito para las altas de pasajes P0013–P0017 según la ficha §9.2) queda bloqueada hasta resolver la cardinalidad.
- La contrafirma editorial integral de ADR-0005 (condición de cierre de H5) está explícitamente suspendida en §D4.5 hasta que se tramite esta salvedad.

**Conclusión del diagnóstico:** la salvedad no es una preferencia estilística sino un defecto del contrato que fuerza datos editorialmente falsos y bloquea la producción del piloto narrativo. Corresponde corregirla por la vía prevista: propuesta funcional (este documento) → evaluación técnica R09 → coaprobación editorial-técnica → autorización R14.

---

## 2. Entregable 2 — Matriz de alternativas y recomendación

### 2.1 Descripción de las opciones

- **Opción 1 — Contrato actual:** `visual_asset_ids` obligatorio con `minItems: 1`; todo beat declara ≥1 identificador, aunque se repita.
- **Opción 2 — Array vacío permitido:** campo **permanece obligatorio**; se relaja a `minItems: 0`. `[]` declara editorialmente «este beat no aporta plano nuevo: persiste la perspectiva vigente».
- **Opción 3 — Campo opcional:** `visual_asset_ids` sale de `required`; se distinguen tres estados: ausente (herencia), `[]` (¿sin imagen?) y lista no vacía (configuración explícita).

### 2.2 Matriz comparativa

| Criterio | Opción 1 (actual) | **Opción 2 ([] obligatorio-relajado)** | Opción 3 (campo opcional) |
|---|---|---|---|
| **Sencillez de datos** | Trivial de escribir, pero obliga a rellenar con repeticiones | Un campo, dos estados claros: lista no vacía = plano nuevo/principal; `[]` = persistencia | Tres estados; el consumidor debe ramificar ausente vs `[]` vs lista |
| **Semántica editorial** | Contaminada: la repetición para validar es una declaración falsa de perspectiva; choca con DC-03 y biblia §5 | **Fiel al guion cinematográfico**: la persistencia se declara, no se disimula; cierra la desviación con la biblia §4 (su ejemplo canónico es `[]`) | Expresiva pero ambigua: «ausente» no distingue «declaración de heredar» de «campo olvidado/registro a medio hacer» |
| **Compatibilidad (versionado)** | Sin cambio; H5 sigue abierto | **MINOR v1.2.0 (propuesta, pendiente de validación R09):** por análisis de esquema, los registros 1.0.0/1.1.0 (todos con ≥1) seguirían válidos; datos nuevos con `[]` serían rechazados por validadores antiguos — ruptura unidireccional coordinada por `contract_version`, patrón ya usado en v1.1.0. **La retrocompatibilidad es una inferencia de diseño, NO una propiedad ya demostrada: deberá evidenciarse con la suite de contrato (CT-5) una vez R09 redacte el cambio** | También MINOR formal, pero con mayor deriva semántica; ADR-0005 ya rechazó la opcionalidad en su decisión (c) y la ambigüedad subsiste tras corregir P1-c |
| **Accesibilidad (runtime)** | Neutral: la robustez la da la cascada P1-4 | Neutral (idéntica cascada); la persistencia **reduce** el churn visual — mejor para movimiento reducido y fotosensibilidad | Neutral, igual que O2 |
| **Validabilidad** | Valida poco: repetición pasa; cobertura real no se mide | Presencia obligatoria mantiene el invariante «el autor miró el campo»; cobertura garantizada con suelo a nivel de escena (`scene.media_ids minItems:1`, ya activo) y métrica QA por escena | Un campo ausente pasa silenciosamente: el validador no puede distinguir olvido de intención; linting de acabado más débil |
| **Riesgos técnicos** | H5 sin cerrar; conversión de fichas bloqueada; datos falsos sistemáticos | Consumidores deben iterar listas posiblemente vacías (trivial); riesgo de abuso de `[]` → mitigado por cobertura a nivel de escena + QA | Complejidad de migración/consumidores; convención «ausente = heredar» debe enseñarse y forzarse; riesgo de divergencia entre equipos |

### 2.3 Recomendación

**Opción 2, como opción principal y única.** Justificación:

1. **Una sola semántica nula.** `[]` es una *declaración* («persiste el plano»); la ausencia del campo seguiría siendo un error. Esto convierte la persistencia en un acto editorial explícito y auditable, y mantiene el validador estricto contra registros a medio hacer — exactamente el espíritu del resto del contrato (`texto_visible` obligatorio con `pattern: \S`, audio opcional pero tipado).
2. **Fidelidad a la fuente editorial.** El ejemplo canónico de la biblia §4 ya usa `[]`; la Opción 2 elimina la única desviación que impide la doble firma (H5), sin introducir una nueva (la tri-estatalidad de la Opción 3).
3. **Coste de cambio mínimo.** MINOR propuesta, sin datos de producción existentes que migrar (no hay beats en `content/`; solo fixtures de contrato), mismo patrón de versionado ya ejercitado en v1.1.0. **La retrocompatibilidad se declara como análisis pendiente de demostración (CT-5), no como hecho consumado** (ver §5.1).
4. **Cobertura garantizada donde importa.** La cobertura visual se asegura **a nivel de escena** — tal como propone §D4.5 — y `scene.media_ids` ya exige `minItems: 1` en el contrato vigente; el suelo existe, y la política de fallback lo refuerza en ejecución.
5. **La Opción 1 no es sostenible** (rompe la contrafirma y fuerza datos falsos) y la **Opción 3 no aporta capacidad expresiva nueva** que la Opción 2 no cubra: la «configuración explícita» ya la expresan las listas no vacías (repetir un ID deliberadamente = reafirmar plano; ID distinto = nuevo plano). La única capacidad extra de la Opción 3 — «forzar fondo neutro» — no está solicitada por ninguna disciplina y se difiere (§4.4), sin cerrar la puerta a una extensión futura.

**Nota para R14:** la salvedad §D4.5 dice «permitir `visual_asset_ids: []` **o** ausente». R11 recomienda que la coaprobación se cierre por la variante `[]` exclusivamente; si R01/R02 consideraran indispensable también la forma ausente, sería Opción 3 y requeriría reevaluar la ambigüedad — se solicita confirmación explícita de R01/R02 sobre este punto (discrepancia D-5 en §7).

---

## 3. Entregable 3 — Especificación de comportamiento (persistencia, cambio de escena, fallback)

### 3.1 Modelo y definiciones

- **Plano vigente (perspectiva activa):** la imagen mostrada como fondo del reproductor en un instante dado. Es un **estado interno de la escena**, inicializado al entrar en ella y actualizado por cada beat según las reglas R-V.
- **Plano base de escena:** el primer elemento de `scene.media_ids` (convención semántica propuesta; ver discrepancia D-3). Es el respaldo del primer beat y de cualquier beat que deba iniciar escena sin plano propio.
- **Resolución visual de un beat:** función determinista `V(beat, estado_escena) → plano` computada **solo con datos presentes y pasados** (el beat y sus anteriores dentro de la escena, y los medios de la escena entrante en frontera). Ninguna consulta a beats/escenas posteriores — la anti-revelación es estructural, no una comprobación adicional.
- **Ventana de transición de escena:** el intervalo gobernado por `exit_transition` de la escena saliente y `entry_transition` de la entrante (fade/dissolve/pan/corte, ya en contrato).

### 3.2 Reglas R-V (deterministas, verificables)

| # | Regla |
|---|---|
| **R-V1** | Al entrar en una escena, la perspectiva activa se **inicializa** resolviendo el plano base de la escena entrante: primer elemento de `scene.media_ids` cuya carga tenga éxito; si falla, el siguiente; si todos fallan, perspectiva activa = nula (→ R-V6). |
| **R-V2** | Beat con `visual_asset_ids` **no vacío**: el plano mostrado es el **primer elemento con carga exitosa** de la lista (los restantes son alternativas de reserva ante fallo; el elemento [0] es el plano principal). Si la carga del elemento cambia la imagen respecto del plano vigente, se aplica la transición vigente (cross-fade); si es idéntico al vigente, **sin transición ni repintado** (cero churn). La perspectiva activa pasa a ser ese plano. |
| **R-V3** | Beat con `visual_asset_ids: []`: **persistencia**. La perspectiva activa **no se toca**: no se recarga, no se repinta, no hay transición. El texto del beat entra con normalidad (R-V8). Si no existe perspectiva activa (R-V1 fallida), se aplica R-V6. |
| **R-V4 (frontera de escena)** | La cadena de herencia es **intra-escena**: al cambiar de escena, la perspectiva activa se **reinicializa** con la escena entrante (R-V1). Durante la ventana de transición el fotograma saliente persiste visualmente (no se vacía el fotograma — §1 de COMPONENTES_NARRATIVOS_UX). Al cerrar la ventana, el plano vigente es el de la escena entrante; **el plano de la escena anterior nunca se arrastra como plano vigente más allá de la ventana**. |
| **R-V5 (primer beat de escena sin imagen propia)** | Si el primer beat declara `[]`, se muestra el plano base de la escena (R-V1 ya inicializó la perspectiva activa). Si el primer beat declara lista no vacía, R-V2 con esa lista. En ambos casos el texto entra sin esperar imágenes. |
| **R-V6 (fallo general — «no hay ninguna imagen disponible»)** | Cascada completa: elementos del propio beat → elementos de `scene.media_ids` → (solo dentro de la misma escena) último fotograma válido → **fondo neutro de la dirección artística** + nota discreta de error. Con fondo neutro: panel de texto con contraste AA garantizado por diseño (panel opaco/sólido — DIRECCION_ARTISTICA §sobre contraste), narración íntegra por texto, avance disponible. **El texto nunca se bloquea** (invariante P1-4). |
| **R-V7 (imagen inexistente o inaccesible en ejecución)** | Referencia rota en **datos** → `REFERENCE_ERROR` del validador (ya activo; no llega a ejecución). Fichero ausente/corrupto en **ejecución** (offline, daños locales): se descarta el elemento y se continúa por la cascada R-V6. La nota de error se muestra **una vez por beat**, es cerrable con teclado (Esc), no roba el foco del panel de texto, no se repite en bucle y se registra en log local. |
| **R-V8 (texto y tiempos — invariante TS-001/P1-4)** | El beat entra en `TEXTO_VISIBLE` cuando sus **datos** están listos; las imágenes cargan en paralelo y nunca gatean. En `TRANSICION`, el texto entrante aparece antes de resolver su imagen y el saliente persiste hasta que el entrante tiene texto legible. Tiempos: suelo `max(1500 ms, 800 ms + 35 ms/palabra)` inalterado; `lectura_minima_ms` solo eleva; autoavance `max(voz, lectura_mínima)`; el fin de la voz nunca oculta ni avanza por sí solo. |
| **R-V9 (SILENCIO)** | Beat `SILENCIO` (sin intervención hablada — §D4.5: no contraviene TS-001): el plano persiste (R-V3 si `[]`); el panel de texto **no se vacía**: conserva la última intervención visible, atenuada y con marcador discreto de silencio (recomendación de tratamiento a R06/R08, discrepancia D-4); nunca pantalla vacía; duración mínima del beat = `max(1500 ms, lectura_minima_ms si declarada)`. Retroceder restaura la intervención anterior íntegra. |
| **R-V10 (recuperación de partida)** | La resolución es función pura de los datos hasta el beat restaurado ⇒ el plano se **recomputa determinísticamente** al restaurar (mismo resultado que antes del cierre, salvo estado físico de ficheros). El guardado registra `scene_id` + beat/intervención y, como dato de conciliación (no autoritativo), el id del plano resuelto en el momento de guardar; si al restaurar el recomputado difiere (activo retirado por actualización), se aplica R-V7 sin sorpresa visible. Cumple EF-AV-08. |
| **R-V11 (movimiento reducido)** | Con movimiento reducido: los cambios de plano reales son **corte instantáneo sin deriva**; la persistencia (R-V3) produce idéntico resultado (menos cambios aún); parallax ignorado; texto idéntico (cerrado: `reduced_motion_fallback: true` en todo beat; `imagen_estatica` en escena). |
| **R-V12 (anti-spoiler estructural)** | La resolución solo consulta datos presentes/pasados; es imposible mostrar un plano de escena o beat posteriores porque el estado no los conoce. Adicionalmente, los activos usados en beats `before`/`question` deben ser `spoiler_level: ninguno|leve` según curation (R05/R06; el runtime ejecuta el dato, no lo interpreta). |

### 3.3 Resolución de las situaciones del encargo (§4.A)

| Situación | Resolución |
|---|---|
| Beat usa la misma imagen que el anterior | O bien `[]` (persistencia, recomendado — sin repintado), o bien el mismo ID deliberadamente (R-V2: idéntico ⇒ sin transición). Ambas producen el mismo resultado visual. |
| Personaje continúa hablando sin cambio de plano | `[]` en el beat; plano persiste; el rótulo de hablante cambia; tiempos de lectura normales. |
| Narrador sobre escena estática | `[]`; plano persiste; `texto_oral` = `texto_visible` (caso Narrador). |
| Silencio | Beat `SILENCIO` con `[]`; R-V9. |
| Transición narrativa sin activo nuevo | Beat de enlace (ver discrepancia D-1 sobre su `kind`) con `[]`; si cruza frontera de escena, R-V4. |
| Falta físicamente una imagen / no puede cargarse | R-V7 → R-V6; texto nunca bloqueado; nota discreta única. |
| Primer beat de escena sin imagen propia | R-V5: plano base de escena; si la escena carece de medios cargables → fondo neutro + nota (R-V6). |

### 3.4 Distingo cerrado / nuevo (exigencia §4.D del encargo)

| Elemento | Estado |
|---|---|
| Texto siempre visible e íntegro, rótulos de hablante, subtítulos, audio opcional no bloqueante, Pausa/Continuar/Repetir/Retroceder/Salto siempre operables, suelo de lectura, movimiento reducido, texto jamás gateado por imágenes (cascada «beat → escena → fotograma anterior → neutro») | **CERRADO** (DC-21, DC-22/TS-001, P0-1, P0-2, P1-1…P1-6; INFORME_SUBSANACION_H5; COMPONENTES_NARRATIVOS_UX §2). No se reabre; esta propuesta lo conserva y lo hace operativo |
| Semántica de `[]` como declaración de persistencia (R-V3), herencia intra-escena y reinicio en frontera (R-V4), plano base de escena (R-V1/R-V5), saltos dentro de la lista ante fallo (R-V2/R-V7), cero repintado con plano idéntico (R-V2), panel en SILENCIO (R-V9), recomputación determinista al restaurar (R-V10), nota de error discreta y teclado (R-V7), anti-spoiler estructural (R-V12) | **NUEVO (propuesta R11)** — sometido a R09 (viabilidad/validación), R01/R02 (semántica), R06 (continuidad), R08 (contraste accesibilidad) y R14 (arbitraje) |

---

## 4. Entregable 4 — Contrato funcional propuesto (semántica esperada, sin modificar esquemas)

> Lo que sigue es la **semántica objetivo** que R11 somete a R09 (evaluación técnica y redacción del cambio de esquema) y a R01/R02 (aprobación de semántica narrativa). Nada de esto está aplicado; los esquemas vigentes siguen rechazando `[]`.

### 4.1 `beat.visual_asset_ids` (propuesta para contrato v1.2.0, MINOR — pendiente de validación y redacción por R09)

| Aspecto | Semántica propuesta |
|---|---|
| Presencia | **Obligatorio** (permanece en `required`). Ausencia del campo = `SCHEMA_ERROR`. |
| Cardinalidad | `minItems: 0` (cambio único respecto de v1.1.0). |
| Lista no vacía | Elemento [0] = plano principal del beat; restantes = alternativas de reserva ante fallo de carga (no controles interactivos). IDs distintos al vigente = cambio de plano (transición vigente); ID idéntico al vigente = sin repintado. |
| `[]` | **Declaración editorial de persistencia**: «este beat no aporta plano nuevo; mantiene la perspectiva vigente de la escena» (R-V3). Equivale al ejemplo canónico de la biblia §4. |
| Referencias | Invariantes ya activos: referencia inexistente → `REFERENCE_ERROR`; `contract_version` ∈ {1.0.0, 1.1.0, **1.2.0**} (extensión de enum, registros anteriores siguen válidos). |
| Qué NO declara | `[]` no significa «sin imagen» ni «fondo neutro forzado»; el neutro es siempre consecuencia de fallo (R-V6), nunca una declaración. |

### 4.2 Campos relacionados — semántica inalterada (cerrada, se lista para trazabilidad)

- `scene.media_ids` (`minItems: 1`): **suelo de cobertura visual por escena** — la garantía estructural que hace determinista R-V1/R-V5. Primer elemento = plano base (convención, D-3).
- `scene.entry_transition` / `exit_transition`: gobiernan la ventana de transición en frontera de escena (R-V4).
- `beat.kind` {NARRACION, DIALOGO, ACCION, SILENCIO}: la persistencia es **ortogonal al kind** (la declaran los `visual_asset_ids`, no el tipo) — ver D-1 para el caso B09.
- `avance_automatico` (bool|null), `lectura_minima_ms` (≥1, solo eleva), `manual_advance_allowed`/`replay_allowed` (sugerencias de ritmo, P1-1), `reduced_motion_fallback` (siempre true), triada `texto_visible`/`incisos_narrador`/`texto_oral` (P1-5): sin cambios.
- Exigencias TS-001/DC-22 ya cerradas y mantenidas tal cual: texto visible íntegro, no ocultable, trazable (`passage_ids`/`localizador`); rótulo de hablante (narrador en estilo distinto); subtítulos accesibles (`scene.subtitles_ref`); audio opcional y nunca bloqueante (invariante P0-1); los cuatro controles siempre presentes (DC-21); suelo de lectura `max(1500 ms, 800 ms + 35 ms/palabra)`; movimiento reducido sin pérdida de contenido; sin pantallas vacías ni destellos.

### 4.3 Invariantes funcionales que el contrato debe garantizar (verificables)

1. Todo beat **resuelve a un plano o a fondo neutro**; nunca a vacío visual ni a bloqueo de texto.
2. Toda escena con beats tiene ≥1 medio declarado (ya en esquema) ⇒ el suelo de la cascada existe en datos.
3. Ninguna ruta de resolución consulta datos futuros (R-V12).
4. Ninguna ruta de avance depende de imágenes ni de audio (P0-1/P1-4, ya cerrados).

### 4.4 Extensión diferida (no propuesta ahora)

Si R06/R01/R02 necesitaran expresar «silencio con fondo neutro deliberado» (neutralidad artística, no por fallo), cabría un campo opcional `visual_policy: HEREDAR|NEUTRO` en una futura MINOR. **R11 no lo propone** en esta iteración: no hay petición de ninguna disciplina y añade superficie de decisión. Queda registrado como puerta abierta, no como compromiso.

---

## 5. Entregable 5 — Matriz de pruebas

**Convención:** las pruebas **CT** (contrato) son propuestas de fixtures/reglas ejecutables por el validador **una vez aprobada v1.2.0 por R09+editorial+R14** — hoy no son ejecutables (el esquema vigente rechazaría `[]`). Las pruebas **FP** (reproductor funcional) se ejecutarán cuando exista reproductor (R10/R12), como extensión de T5–T11 (no las duplican). Ninguna prueba se declara ejecutada: todas son propuestas.

| # | Caso | Entrada | Comportamiento esperado | PASS | Riesgo cubierto |
|---|---|---|---|---|---|
| CT-1 | Beat con `[]` válido | Fixture `beat_visual_vacio.json` (resto conforme) | Validador VÁLIDO bajo v1.2.0 | Registro aceptado; `contract_version` 1.2.0 | Desbloqueo de la conversión de fichas |
| CT-2 | Campo ausente sigue inválido | Fixture `invalid_beat_sin_campo_visual.json` | `SCHEMA_ERROR` (campo en `required`) | Rechazo con código claro | Ambigüedad Opción 3; registros a medio hacer |
| CT-3 | Referencia rota | Beat con `DQ.MA.999999` inexistente | `REFERENCE_ERROR` | Rechazo (ya activo, se mantiene) | Datos que ejecutarían imágenes fantasma |
| CT-4 | Cobertura de escena | Escena con `media_ids: []` | `SCHEMA_ERROR` (`minItems:1` escena) | Rechazo (ya activo) | Suelo de la cascada (R-V1/R-V5) |
| CT-5 | Cita/intervención intactas bajo v1.2.0 | Suite completa 53/53 + fixtures v1.1.0 | Todo sigue PASS (retrocompatibilidad) | 0 regresiones | Migración y versionado |
| FP-1 | Primer beat con imagen | Escena con plano base; beat1 con [X] | Tras la ventana de entrada: plano X visible; texto visible desde datos listos; lectura mínima respetada | Plano y texto correctos; sin hueco; sin flash | Entrada de escena; TS-001 |
| FP-2 | Segundo beat sin imagen nueva | beat2 con `[]` | Mismo plano; **sin cross-fade ni repintado**; texto nuevo entra con normalidad | Cero churn visual; texto íntegro y trazable | Continuidad; fotosensibilidad |
| FP-3 | Secuencia de varios beats sin cambio | beats 2..k con `[]` | Plano idéntico durante toda la secuencia; avances/tiempos correctos; sin pantallas vacías | Persistencia total; ritmo correcto | Continuidad larga; silencio visual |
| FP-4 | Transición entre escenas | Último beat de A (plano PA) → escena B beat1 `[]` | Durante ventana: PA persiste; al cerrar: plano base de B; texto de B antes de su imagen; **nunca** PA como vigente tras la ventana | Resolución por B; sin plano ajeno; sin vaciado | Fronteras; anti-spoiler (R-V12) |
| FP-5 | Imagen inexistente/inaccesible | beat1 con [X] y fichero de X dañado | Skip → reserva del beat → escena → último fotograma → **fondo neutro + nota discreta única (cerrable con Esc)**; narración íntegra; avance disponible | Texto íntegro siempre; nota no intrusiva; sin bloqueo | Offline; robustez (P1-4/T11) |
| FP-6 | Narración sin audio | Beats NARRACION sin `audio_asset_id` | Secuencia completa por texto; avance manual siempre disponible; sin `ERROR_VOZ` espurio | Recorrido completo sin voz (criterio de aceptación existente) | P0-1; TS-001 |
| FP-7 | Diálogo con audio | Beat DIALOGO con voz | Texto desde el primer instante; autoavance `max(voz, lectura_mínima)`; fin de voz no oculta ni avanza por sí solo; `ESPERA_DE_VOZ` solo con voz sonando | Tiempos correctos; texto permanente | P0-2; sincronía |
| FP-8 | Silencio narrativo | Beat `SILENCIO` con `[]` | Plano persiste; panel conserva última intervención atenuada + marcador discreto; duración ≥ 1500 ms; sin pantalla vacía | Sin vaciado; TS-001 intacto (no hay intervención hablada) | R-V9; dignidad del ritmo |
| FP-9 | Navegación hacia atrás | Desde beat k (plano persistido) → Retroceder a beat j con `[]` | Recomputación determinista hacia atrás: plano de j (el de j−1, por persistencia); texto de j íntegro y re-legible; voz re-leída según política | Estado coherente; lectura íntegra | Coherencia de estado; TS-001 |
| FP-10 | Reducción de movimiento | Perfil `reduced_motion: true` | Cambios de plano = corte instantáneo sin deriva; persistencia idéntica; parallax ignorado; texto idéntico | Igualdad de contenido; sin movimiento | Accesibilidad (cerrado + R-V11) |
| FP-11 | Navegación exclusiva por teclado | Recorrido completo solo teclado | Pausa/Continuar/Repetir/Retroceder/Salto operables; nota de error cerrable con Esc sin robar foco; orden de foco lógico y visible | Todos los controles y avisos alcanzables por teclado | Accesibilidad (T7 + nota R-V7) |
| FP-12 | Recuperación en beat sin imagen propia | Guardar en beat con `[]`; cerrar; restaurar | Beat restaurado correcto; plano recomputado = el vigente al guardar (o cascada si el activo desapareció); texto íntegro; sin corrupción | Restauración transparente (EF-AV-08) | Guardado; confianza del jugador |
| FP-13 | Anti-spoiler estructural | Recorrido normal hacia adelante | Jamás aparece plano de beat/escena posteriores (R-V12; verificación por capturas de recorrido) | 0 apariciones de planos futuros | Revelación prematura |

Cobertura cruzada: FP-5 ≙ T11 (existente), FP-11 ≙ T7, FP-10 ≙ T9, FP-6/FP-7 ≙ T5/T8/T10. Esta matriz **extiende** la batería de `COMPONENTES_NARRATIVOS_UX.md` §4, no la sustituye.

### 5.1 Estado de validación: comportamiento DOCUMENTADO ≠ comportamiento EJECUTADO (exigencia §3.C de R14)

| Nivel | Qué | Estado real |
|---|---|---|
| **Documentado (especificación)** | La cascada P1-4 «perspectivas del beat → de la escena → fotograma anterior → fondo neutro» y todas las reglas R-V1…R-V12 de este documento | **SOLO documentado.** Su presencia en esta especificación NO constituye verificación. No existe reproductor (R10): la cascada P1-4 **no ha sido verificada en runtime**; T5–T11 y FP-1…FP-13 permanecen sin ejecutar |
| **Ejecutado (contrato, CI)** | Validación de esquema y referencias: T1–T4b (suite 53/53 PASS, `tests/contracts/`) | **Ejecutado y activo en CI** — pero cubre exclusivamente el contrato de datos vigente (v1.1.0, `minItems: 1`). No cubre ninguna regla funcional de este documento |
| **Diseñado (no ejecutado)** | CT-1…CT-5 y FP-1…FP-13 de esta entrega | **Diseñados, NO ejecutados.** CT-* requieren que R09 redacte y R14 autorice v1.2.0; FP-* requieren reproductor (R10/R12). Ninguno puede declararse superado en este estado |
| **No iniciado** | Implementación del cambio de esquema, conversión de fichas a beats, reproductor | Fuera del alcance de este documento; requiere GO de R14 por la vía editorial-técnica |

**Regla de lectura:** cualquier afirmación de este documento sobre comportamiento en ejecución es un **requerimiento de diseño**, no una garantía verificada. La única evidencia ejecutada del proyecto a esta fecha es la suite de contrato (53/53), el cotejo textual (130/130) y las pruebas FTS5 (9/9) — ninguna de ellas prueba persistencia visual, fallback ni TS-001 en pantalla.

---

## 6. Entregable 6 — Impactos y dependencias

| Responsable | Deberá aprobar o desarrollar | Origen en este documento |
|---|---|---|
| **R09** (compatibilidad técnica, validadores, migración, consumidores) | Evaluar viabilidad de v1.2.0 MINOR: `minItems: 0` en `beat.visual_asset_ids` + extensión de enum `ContractVersion`; fixtures CT-1/CT-2; regla semántica de resolubilidad (§4.3); nota: `COMPONENTES_NARRATIVOS_UX` §2.3.3 menciona preferencia de avance **por perfil** y `schemas/player/profile.schema.json` aún no la contiene (hueco MINOR, no bloqueante aquí); confirmar estrategia de consumidor ante listas vacías | §2.3, §4.1, §5 (CT-1/2) |
| **R01/R02** (semántica narrativa, contrafirma) | Aprobar la semántica `[]` = persistencia declarada (y confirmar que basta la variante `[]` sin forma «ausente» — D-5); resolver D-1 (kind de B09); guiar la conversión de fichas: en los molinos, B03/B04/B05/B07/B08 con `[]` salvo asignación de R06; B01/B02/B06 con sus activos | §1.3, §2.3, §7 (D-1, D-5) |
| **R06** (continuidad visual, transiciones) | Ratificar la convención de plano base (primer `media_ids` de escena — D-3); criterios de continuidad para planos persistidos entre beats; tratamiento artístico del panel en SILENCIO (D-4); fondos neutros de la dirección artística ya definidos en briefs (franja TS-001 reservada); revisar que las escenas del piloto tengan su `media_ids` completo | §3.1–3.2, §7 (D-3, D-4) |
| **R08** (contraste TS-001, criterios UX) | Armonizar la línea «Fondos de escena (≥1 perspectiva)» de `COMPONENTES_NARRATIVOS_UX.md` §1 con la semántica aprobada (D-2); contrastar R-V7 (nota de error discreta, no intrusiva, teclado) y R-V9 (panel en silencio) frente a los criterios de accesibilidad | §3.2, §7 (D-2) |
| **R12/QA** (informado) | Integrar CT/FP en la matriz de cobertura cuando corresponda; métrica de cobertura visual por escena | §5 |
| **R14** | Arbitrar D-1…D-5; autorizar (o no) el cambio de esquema por la vía editorial-técnica; cierre de H5 | §7 |

**Lo que NO cambia:** DC-21, DC-22/TS-001, P0-1, P0-2, P1-1…P1-6 (cerrados); la cascada P1-4 se conserva y refina, no se sustituye; ninguna decisión del expediente A/B/C de preguntas (A-11/A-12 son de R15/R02, fuera de este encargo).

---

## 7. Decisiones D-1…D-5 — discrepancias entre disciplinas, elevación a Coordinación

Cada fila explicita: responsable de la decisión, alternativa recomendada por R11, consecuencias de la adopción y aprobación que queda pendiente. **Ninguna de estas decisiones está tomada; todas requieren arbitraje de R14.**

| ID | Discrepancia | Responsable de decisión | Alternativa recomendada (R11) | Consecuencias si se adopta | Consecuencias si se rechaza | Aprobación pendiente de |
|---|---|---|---|---|---|---|
| **D-1** | **B09/TRANSICION:** la ficha de los molinos (`FICHA_ESCENA_P1_C08_MOLINOS.md` §2) declara B09 con `kind: TRANSICION`, valor **no admitido** por el enum del contrato {NARRACION, DIALOGO, ACCION, SILENCIO} — ese dato no validaría hoy contra `beat.schema.json`. | R01/R02 (semántica narrativa) con R09 (contrato); arbitraje R14 | **Representar B09 como `NARRACION`** manteniendo íntegra la intervención textual I16 (CITA_LITERAL, P0017), y resolver la transición visual mediante `scene.exit_transition` de la escena saliente + `entry_transition` de la entrante (campos ya existentes). La transición es puesta en escena, no tipo de habla; así no se infla el enum ni se abre v1.2.0 por esta vía. Alternativa descartada por R11: ampliar el enum con `TRANSICION` (innecesario si (a) es viable) | B09 valida sin cambios de esquema; la semántica de transición queda en los campos de escena donde ya vive; la conversión de fichas es directa | Habría que ampliar el enum (cambio adicional de contrato) o reescribir las fichas que usen TRANSICION como kind | R01/R02 (confirmación semántica) + R09 (verificación de que NARRACION + transiciones de escena cubren el caso) + R14 |
| **D-2** | `COMPONENTES_NARRATIVOS_UX.md` §1 dice «Fondos de escena (≥1 perspectiva)»; si se aprueba la Opción 2, la descripción queda desalineada. | R08/R10 (documento de componentes) | Actualizar la fila de la tabla §1 para reflejar `[]` = persistencia declarada, **solo después** de que v1.2.0 se apruebe (no editar en paralelo a la decisión) | Coherencia documental entre especificación y contrato aprobado | Divergencia documental persistente entre dos especificaciones vigentes | R14 (secuencia de aprobación) + R08/R10 (ejecución del cambio documental) |
| **D-3** | «Plano base de escena» no tiene campo explícito; la convención «primer elemento de `scene.media_ids`» no está declarada semánticamente. | R06 (continuidad artística) + R09 (contrato) | Adoptar la **convención documentada** (orden de `media_ids` = prioridad; elemento [0] = plano base) ahora; campo opcional `base_media_id` solo si se detecta ambigüedad real | Resolución R-V1/R-V5 determinista sin cambio de esquema adicional | Si se opta por campo explícito: extensión MINOR adicional de `scene.schema.json` con sus pruebas | R06 (ratificación artística) + R09 (registro de la convención en el contrato de consumidor) |
| **D-4** | Tratamiento del panel de texto durante `SILENCIO` (conservar última intervención atenuada + marcador discreto) es propuesta R11 sin contraste previo de accesibilidad/artístico. | R08 (accesibilidad TS-001) + R06 (artístico) | **Conservar la última intervención visible, atenuada, con marcador discreto de silencio** (R-V9). Alternativa descartada por R11: vaciar el panel (pantalla vacía, contra el espíritu de TS-001 y de «nunca pantallas vacías») | El silencio respeta la continuidad del panel; TS-001 permanece íntegro (no hay intervención hablada en SILENCIO) | R11 revisaría R-V9 y propondría un tratamiento alternativo para contraste | R08 (criterio accesibilidad) + R06 (criterio artístico) |
| **D-5** | La salvedad §D4.5 de R01/R02 propone «permitir `visual_asset_ids: []` **o ausente**»; R11 desaconseja la forma «ausente» (tri-estatalidad: no distingue declaración de olvido). | R01/R02 (alcance de su propia salvedad) + R14 | **Cerrar la salvedad por la variante `[]` exclusiva** (campo obligatorio, `minItems: 0`) — Opción 2. Si R01/R02 consideraran imprescindible también la forma «ausente», se reabriría la evaluación de la Opción 3 con sus riesgos documentados (§2.2) | Salvedad resuelta con una sola semántica nula; validador estricto; equivalencia con el ejemplo canónico de la biblia §4 | Se evaluaría la Opción 3: mayor complejidad de validadores y consumidores, debilidad de linting | R01/R02 (confirmación explícita de que `[]`-exclusivo satisface su salvedad) + R14 (arbitraje) |

---

## 8. Entregable 7 — Dictamen R11

**CONFORME CON CONDICIONES.**

**Fundamento:** existe una solución funcional inequívoca, determinista y compatible con la fidelidad narrativa (la persistencia declarada refleja cómo se narra cinematográficamente y cierra la desviación con la biblia §4) y con la accesibilidad (TS-001 intacto; menos churn visual; texto jamás bloqueado; teclado y movimiento reducido cubiertos; offline por construcción). La especificación es suficientemente precisa para que R09 evalúe la implementación y para que R01/R02 decidan su contrafirma.

**Condiciones (sin las cuales este dictamen no sustenta el cierre de H5):**

1. **C-1:** el cambio de esquema (v1.2.0 MINOR, `minItems: 0` + enum de versión) se tramita por la vía editorial-técnica: evaluación de R09 + aprobación de R01/R02 + **autorización expresa de R14**. R11 no lo da por aprobado.
2. **C-2:** la variante de la salvedad se cierra por la **Opción 2 exclusiva** (`[]` obligatorio-relajado); si R01/R02 exigieran además la forma «ausente», R11 reabriría la evaluación de la Opción 3 (D-5).
3. **C-3:** las pruebas CT-1…CT-5 quedan **propuestas**, no ejecutadas; su ejecución es parte de la validación de R09 antes de cualquier fusión.
4. **C-4:** las discrepancias D-1…D-5 se resuelven por Coordinación antes del cierre; en particular D-1 (kind de B09) afecta datos que se convertirían de inmediato.
5. **C-5:** ninguna prueba FP se declara superada: requieren reproductor (R10/R12). El cumplimiento de TS-001 en ejecución sigue dependiendo de T5–T11.

**Estado que R11 deja constatado:** ADR-0005/H5 **sigue abierto**; la contrafirma editorial integral permanece pendiente; **no se concede GO de integración** ni de implementación desde este documento. R15 no ha sido interferido; no se han tocado preguntas, schemas, recursos ni visados del expediente A/B/C.

---

### Anexo A — Fuentes cotejadas (estado `main` @ 3334cb5)

1. `docs/ARQUITECTURA_Y_ADR.md` — ADR-0005 y addendum de subsanación/reauditoría H5.
2. `schemas/content/beat.schema.json` — `required` + `minItems: 1` (líneas 7, 34–40) y comentarios de doble firma.
3. `schemas/content/scene.schema.json` — `media_ids minItems:1`, transiciones, accesibilidad.
4. `schemas/content/_definitions.schema.json` — IDs, `Speaker`, `OrigenTexto`, `MediaFunction`, `ContractVersion`.
5. `schemas/media/media-asset.schema.json` — `alt` obligatorio, `spoiler_level`, URI lógica offline.
6. `docs/COMPONENTES_NARRATIVOS_UX.md` — estados §2.1, carga P1-4 §2.2, autoavance §2.3, controles §2.4, matriz T1–T11.
7. `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md` — §1 TS-001, §4 (ejemplo con `[]`), §5 (jerarquía visual), roles.
8. `docs/PAQUETE_REVISION_EDITORIAL.md` — §D4.5 (salvedad bloqueante) y estado vigente tras PR #47.
9. `docs/FICHA_ESCENA_P1_C08_MOLINOS.md` — 9 beats / 16 intervenciones / 3 activos; huecos B05/B08; B09 TRANSICION.
10. `docs/INFORME_SUBSANACION_H5.md` — P0-1, P0-2, P1-1…P1-6, reauditoría P1-a/b/c, estado 53/53.
11. `docs/VISION_Y_DECISIONES.md` — DC-19…DC-22 (cerradas, no reabiertas).
12. `docs/UX_ACCESIBILIDAD.md`, `docs/ESPECIFICACION_FUNCIONAL.md` (EF-AV-02, EF-AV-08, EF-HIS-01…04), `docs/HOJA_RUTA_MODOS_HISTORIA_E_HISTORICO.md`, `docs/DIRECCION_ARTISTICA.md` (contraste/áreas seguras), `docs/DOSSIER_ARTISTICO_H4.md` (franja TS-001).
13. `tests/contracts/fixtures/` — todos los beats válidos actuales con ≥1 activo (ningún fixture de `[]`).
14. `schemas/player/profile.schema.json` — sin preferencia de avance automático (hueco anotado a R09).

*R11 — UX, Interacción y Accesibilidad. Documento de trabajo remitido a R14 para arbitraje. SIN GO.*
