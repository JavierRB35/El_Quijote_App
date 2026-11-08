# ESPECIFICACIÓN R08 — Estados UX de escena neutra y transiciones seguras del Modo Historia

**Para:** R14 — Coordinación (arbitraje y cierre) · **De:** R08 — UX/UI y Accesibilidad
**Fecha:** 2026-11-08 · **Modalidad:** especificación de diseño documental. **Sin implementación de componentes, sin cambios de contratos, sin PR.**
**Encargo:** P0 R14→R08 — estados de presentación del Modo Historia sin imagen elegible; diferenciación de seis situaciones (neutro deliberado, no elegible por spoiler, caducada, fallo de carga, SILENCIO narrativo, audio ausente/silenciado); entregable = estados UX + tabla de transiciones + wireframes descritos + criterios comprobables R10/R12.
**Estado final:** **UX NEUTRO DEFINIDO / TS-001 PRESERVADO / RUNTIME SIN GO.**

---

## 0. Fuente de verdad verificada

| Verificación | Resultado |
|---|---|
| SHA de referencia `afc72644dc4283ff72f45baa5f85ca79e0498930` | **VIGENTE** al iniciar la especificación (cabeza de `main`, fusión de PR #52, evaluación R09 D-6). Verificado contra el remoto por API de GitHub y `git log` local |
| Movimiento del remoto durante la redacción | `main` avanzó a `6c6e2c9` (PR #53: diseño sonoro R07 de B06–B08 y frontera neutra post-I11). Este documento se **rebasó** sobre el nuevo HEAD; el doc R07 nuevo fue incorporado a la revisión (Anexo A, ítem 15) y es **compatible** con esta especificación: refuerza la distinción «silencio sonoro ≠ imagen neutra», la caducidad post-I11 («invalidar toda imagen de Quijote montado con lanza intacta») y el neutro de B07 con texto I12 íntegro. Sin conflictos detectados. También apareció la rama `feature/r11-validadores-escena-neutra` (no evaluada: fuera de `main`) |
| Ramas activas revisadas | Solo `main`; ramas `feature/*` listadas en el remoto sin contenido nuevo pertinente para este encargo |
| Dictámenes leídos íntegros | `ENTREGA_R11_H5_ADR0005.md` (R-V1…R-V12, E-1…E-4, D-1…D-6, CT/FP) · `EVALUACION_R09_D6_ELEGIBILIDAD_CADUCIDAD.md` (A+D, cursor de «intervención presentada», segmentación I.8) |
| Documentos contrastados | `COMPONENTES_NARRATIVOS_UX.md` (v1.0, 2026-11-06) · `UX_ACCESIBILIDAD.md` (0.2) · `BIBLIA_NARRATIVA…ROLES.md` (§1 TS-001, §3 R08) · `FICHA_ESCENA_P1_C08_MOLINOS.md` (I01–I16, B01–B09; texto I11/I12) · `DIRECCION_SONORA_PILOTO_MODO_HISTORIA.md` (R07, §4–§5) · `DIRECCION_ARTISTICA.md` + `DOSSIER_ARTISTICO_H4.md` (franja TS-001, contraste) · `ESPECIFICACION_FUNCIONAL.md` (EF-HIS-01…04) · `schemas/content/beat.schema.json`, `scene.schema.json`, `schemas/player/profile.schema.json`, `app/src/contrato.ts` |
| Búsqueda de definición de «fondo neutro» | **Sin resultado** en `DIRECCION_ARTISTICA.md`, `DIRECCION_ARTISTICA_PILOTO.md`, `DOSSIER_ARTISTICO_H4.md`, `BIBLIA…`, `VISION_Y_DECISIONES.md` (ver §7, X-7) |

---

## 1. Planteamiento: el neutro deja de ser sinónimo de fallo

La especificación vigente (`COMPONENTES_NARRATIVOS_UX` §2.2; R11 R-V6) conoce el fondo neutro **solo como término de la cascada ante fallo**, y por eso lo empareja con «nota discreta de error». El dictamen R09 (recomendación A+D, §4.1) crea por primera vez una escena **cuyo comienzo correcto y previsto es el fondo neutro**: la Escena B de I.8 (post-I11) entra con `[]` sin plano base elegible (900006 no declarado aún; los planos de la escena anterior no cruzan la frontera — R-V4), y eso **no es un fallo**: es el comportamiento exigido por la curaduría (NOT BEFORE/NOT AFTER; «Intervalo post-I11 → cierre de I12: fondo neutro + texto íntegro, obligación P0»).

**Principio rector R08-N0 (función de señal):** *las señales visibles (avisos, errores, indicadores de espera) se asocian a sucesos (fallos reales de recursos), nunca a estados de resultado (qué plano resuelve la función).* El neutro es un resultado legítimo con cuatro causas distintas; solo una de ellas (fallo de carga de un activo elegible) genera señal. Todo lo demás se presenta **en silencio absoluto de señales**: sin spinner, sin aviso, sin icono, sin texto explicativo añadido — con el texto íntegro de la intervención como único contenido activo de la pantalla.

**R08-N1 (mecanismos agnósticos del «por qué»):** el runtime **no puede ni debe distinguir** un neutro «deliberado» de un neutro «por elegibilidad vacía»: ambos son el mismo resultado determinista de la función de resolución (R09 §4.5 prohíbe reinterpretar `[]` como «neutro voluntario»). No hace falta distinguirlos: su tratamiento UX es idéntico (neutro + texto íntegro + cero señales). La única distinción en ejecución que exige R08 es binaria y comprobable: **¿falló la carga de un activo elegible?** Sí → nota única (§3.10). No → cero señales.

**Consecuencia TS-001 (preservada):** en todos los estados de este documento, `texto_visible` íntegro + rótulo de hablante permanecen en pantalla desde que los datos del beat están listos; ninguna causa visual o sonora los oculta, atenúa (salvo el caso SILENCIO definido en §3.5b), trunca ni bloquea. El neutro **no es una pantalla vacía con texto encima: es una superficie diseñada** (§3.1) cuya apariencia es idéntica sea cual sea la causa no visible.

## 2. Taxonomía de los seis estados del encargo

Las seis situaciones del encargo **no son seis estados de superficie**: se resuelven en **dos estados de superficie visibles** (NEUTRO y SILENCIO), **dos causas ocultas** (que el usuario jamás percibe) y **dos canales independientes** (fallo de recursos y canal de voz). Esta es la desconfusión pedida.

| # (encargo) | Situación | Qué es | Superficie resultante | Señal visible para el usuario |
|---|---|---|---|---|
| S-1 | **Escena neutra deliberada** | Diseño editorial: el momento narrativo actual no tiene plano elegible **por diseño** (p. ej. arranque de Escena B de I.8 en B07 tras la frontera I11) | `SUPERFICIE.NEUTRO` + texto íntegro | **Ninguna.** Ni spinner, ni aviso, ni marca de «sin imagen» |
| S-2 | **Imagen no elegible por spoiler** | Causa de filtrado: un activo existe y cargaría, pero E-1…E-4 lo excluye (representa un momento posterior; fail-closed E-4) | `SUPERFICIE.NEUTRO` (u otro plano elegible) + texto íntegro | **Ninguna.** Ni siquiera una pista meta de «hay una imagen que no se muestra» — esa pista insinuaría que ocurre algo, que es en sí una micro-revelación |
| S-3 | **Imagen caducada** | Causa de filtrado: un plano vigente deja de serlo al cruzar su umbral NOT AFTER (p. ej. 900005/900030 tras I11: «DQ montado, lanza íntegra» contradice la caída recién narrada) | Transición regulada a `SUPERFICIE.NEUTRO` (u otro plano elegible) en la frontera de beat, + texto íntegro | **Ninguna.** El cambio de plano sucede en la frontera de beat con la transición de §3.7; nunca a mitad de beat ni con aviso |
| S-4 | **Fallo de carga** | Suceso: un activo **elegible y declarado** no puede cargarse (fichero ausente/corrupto, offline) | Cascada R-V6 con filtro E → `SUPERFICIE.NEUTRO` (u otro plano elegible) + texto íntegro | **Una nota discreta no bloqueante** (UX-ER-1, §3.10): única por entrada de beat, cerrable con Esc, sin robo de foco |
| S-5 | **SILENCIO narrativo** | Beat `kind: SILENCIO` sin intervención hablada (no contraviene TS-001; §D4.5) | `SUPERFICIE.SILENCIO`: plano persiste (R-V3); el panel **conserva la última intervención, atenuada** con marcador discreto de silencio (posición R08 en D-4, §3.5b) | **Ninguna señal de error.** Solo el marcador editorial de silencio |
| S-6 | **Audio ausente o silenciado** | Canal de voz: `audio_asset_id` no declarado (ausente por diseño) o volumen/mute de perfil; distinto del **fallo** de voz (declarado y no reproduce → `ERROR_VOZ`) | Superficie intacta: texto íntegro, controles operables | **Ninguna** para ausente/silenciado (P0-1). **Una nota discreta única** solo para voz fallida (ERROR_VOZ, §2.1 de COMPONENTES) |

**Regla de lectura:** el usuario **nunca** ve S-2, S-3 o S-6 como estados — las percibe, a lo sumo, como la ausencia natural de algo que jamás se le prometió en ese momento. Solo S-4 y la voz fallida producen texto añadido en pantalla, y ambos son sucesos de fallo verificables en log.

## 3. Especificación normativa (10 puntos del encargo)

Cada regla lleva ID `UX-nn` y es comprobable (criterios en §6). Las reglas se suman a lo ya cerrado (DC-21, DC-22/TS-001, P0-1, P0-2, P1-1…P1-6) sin reabrirlo.

### 3.1 Fondo neutro, contraste y legibilidad

- **UX-01 (superficie diseñada, no vacío):** el neutro es una superficie plana y estática del sistema visual del producto, no un color por defecto del motor. Prohibido el negro puro sin matizar, los degradados con movimiento y cualquier textura que compita con el texto.
- **UX-02 (panel opaco):** el panel de texto sobre neutro es **opaco o suficientemente sólido** (`DIRECCION_ARTISTICA`, «Contraste» y §panel): el contraste del texto se calcula sobre la superficie efectiva final, no sobre la teórica. En neutro no hay imagen bajo el panel, pero la regla se mantiene para que el panel sea idéntico en todos los estados (misma geometría, mismo padding).
- **UX-03 (contraste):** mínimo WCAG AA (4,5:1 texto normal; 3:1 texto grande y controles gráficos, `UX_ACCESIBILIDAD` §2). R08 **fija como objetivo del neutro ≥7:1** en texto de cuerpo (AAA) precisamente porque no existe imagen que lo degrade: es la superficie más legible del producto y sirve como referencia de calibración del panel sobre imágenes.
- **UX-04 (propuesta de tokens — hipótesis pendiente de ratificación R06):** dos variantes alineadas con la paleta ocre/terracota/oliva/ámbar del proyecto: (a) **«Niebla de Mancha»** (por defecto): fondo plano ~`#EFE6D8`, texto ~`#29241D` (contraste ≈12:1); (b) **«Nocturno sobrio»** (tema oscuro/perfil): fondo ~`#23201B`, texto ~`#E8DFCF` (≈12:1). Valores a medir con herramienta en implementación; el requisito vinculante es el ratio, no el hex. R06 decidirá el token definitivo (ver X-7); mientras tanto, cualquier superficie que cumpla UX-02/UX-03 es admisible.
- **UX-05 (franja TS-001):** la reserva de texto declarada por escena (`preferred_overlay_side`, hoy `right` en las 253 escenas — hipótesis de layout pendiente de prueba, DOSSIER_H4 §3.5) **no aplica en neutro como restricción de composición** (no hay imagen que proteger): el panel puede centrarse u ocupar su disposición estándar. La geometría del panel **no cambia** entre estados (neutro ↔ imagen) más allá del reflujo, para evitar saltos de layout al entrar/salir de neutro.
- **UX-06 (estabilidad):** el neutro es idéntico en todas sus causas (S-1/S-2/S-3/S-4 salvo nota): sin parpadeos, sin alternancias con imágenes posteriores (FP-18), sin vibración. Es estático **incluso sin movimiento reducido**: el neutro no lleva movimiento ambiental 2.5D (ese lenguaje pertenece a las escenas ilustradas; simularle «vida» fabricaría una afirmación visual falsa sobre el momento narrativo).

### 3.2 Texto íntegro siempre visible y asociado al hablante

- **UX-07:** estructura del panel, invariable en todos los estados de este documento: (1) **rótulo de hablante** (nombre del personaje, o «Narrador» en estilo distinto — versalitas/itálica, §1 de COMPONENTES), (2) `texto_visible` **íntegro** — citas literales con raya y puntuación, incisos del narrador incluidos (P1-5; R07 §1: «se mantiene en todo estado con sonido, mute, voz ausente o error»), (3) tratamiento tipográfico por `text_kind` (comillas latinas + atribución / nota discreta «adaptado» / estilo narrador).
- **UX-08 (sin pantallas vacías de texto):** prohibido cualquier estado en el que el panel de texto esté vacío, en blanco o con placeholder (p. ej. «…»): la cadena TRANSICION (texto entrante antes de resolver imagen; saliente persiste hasta que el entrante es legible — §2.1 COMPONENTES) aplica igualmente en entrada a neutro.
- **UX-09 (trazabilidad):** la acción «ver en el lector» (pasajes) permanece disponible en neutro; se desactiva solo sin capa textual (comportamiento ya especificado §1 de COMPONENTES, P0013–P0017 pendientes de alta — R07 §1).

### 3.3 Avance manual y automático

- **UX-10 (política inalterada):** en neutro rige exactamente la política P0-2 (`COMPONENTES` §2.3): autoavance dispara solo cuando voz terminada (si la hay) **y** `lectura_mínima` cumplida, con `lectura_mínima = max(1500 ms, 800 ms + 35 ms/palabra)`; sin voz, el suelo de lectura aplica igual (reauditoría H5). El neutro **no acorta ni alarga** los tiempos: el ritmo lo marca el texto, no la imagen.
- **UX-11 (salto manual):** el avance manual está siempre disponible en neutro (no hay voz sonando → la única excepción del §2.1 no existe). Los flags del beat (`manual_advance_allowed`) no deshabilitan controles en ausencia de voz (§2.4).
- **UX-12 (anulación por beat):** `avance_automatico: false` del beat o del perfil (preferencia **pendiente de alta en `profile.schema.json`** — hueco registrado por R11 §6, heredado aquí sin reabrir) hace el texto no caduca nunca también en neutro.

### 3.4 Pausa, retroceso, repetición e historial

- **UX-13 (cuatro controles, siempre):** Pausa, Continuar, Repetir, Retroceder operables en todos los estados de este documento (DC-21; §2.4: pausa y retroceso jamás se deshabilitan). En neutro, Repetir reinicia el beat y su legibilidad (replay de voz solo si la hay).
- **UX-14 (retroceso recomputa):** retroceder recalcula la elegibilidad con el cursor derivado de la posición (R09 §5): al volver a un beat anterior, un plano caducado **reaparece** si era elegible en ese momento (p. ej. retroceder de B07 a B05 restaura 900005), y un plano aún no activo desaparece. El neutro de entrada a escena se restablece idéntico al de la ejecución continua (R-V10, EF-AV-08).
- **UX-15 (historial — especificación nueva):** el acceso «Historial de la escena» muestra la lista de **intervenciones presentadas** (rótulo de hablante + extracto del inicio del texto + posición). Por construcción solo contiene contenido con cursor ≤ actual (derivado de la posición, R09 §5): **jamás puede revelar contenido futuro**. Abrir el historial activa pausa implícita; seleccionar una entrada = retroceso a ese beat (con recomputación UX-14); cerrarlo devuelve al beat actual sin pérdida de estado. El texto íntegro es legible desde el historial (TS-001 recuperable). El historial es **por escena** y se restaura con la partida (función pura de la posición).

### 3.5 Lectura mínima y texto ampliado

- **UX-16 (suelo con o sin audio):** reafirmación: el suelo `max(1500 ms, 800 + 35 ms/palabra)` aplica **también sin audio** y también en neutro (reauditoría H5; R-V8). `lectura_minima_ms` del beat solo puede elevar.
- **UX-17 (texto ampliado escala el suelo — hipótesis de calibración):** con `text_size` del perfil (`pequeno|medio|grande|muy_grande`, `profile.schema.json`), el coeficiente por palabra se multiplica: `medio` = ×1,0 (base 35 ms/palabra); `grande` ≈ ×1,25; `muy_grande` ≈ ×1,5; `pequeno` = ×1,0 (nunca reduce). Parámetros a calibrar en el piloto con R12/R08 (T5/T10); mientras tanto son hipótesis de diseño, no constantes de implementación.
- **UX-18 (reflujo sin truncamiento):** texto ampliado con reflujo; si el panel no cabe en viewport, **paginación accesible sin truncamiento** (R07 §5: «Reflujo/paginación accesible sin truncamiento y con speaker persistente»): el rótulo de hablante persiste en todas las páginas; el autoavance espera a que **todas** las páginas hayan cumplido su lectura (el suelo se multiplica por el número de páginas); el avance manual pasa página a página antes de cambiar de beat; Retroceder repone la página inicial. Nunca se reduce la tipografía para caber (prohibición de `DIRECCION_ARTISTICA`).

### 3.5b SILENCIO narrativo (posición R08 en D-4)

- **UX-19 (dictamen favorable a R-V9 con condiciones):** en beat `SILENCIO` el panel conserva la última intervención **visible, atenuada, con marcador discreto de silencio**. Condiciones vinculantes: (i) la atenuación **nunca reduce el contraste por debajo de AA** sobre su fondo efectivo (opacidad mínima calibrada por token — verificable, no decorativa); (ii) marcador **redundante textual + no textual** (p. ej. «· silencio ·» acompañado de un glifo), fuera de la futura franja de texto si hubiera plano; (iii) para lectores de pantalla, la intervención retenida se marca presentacional (no se re-anuncia como contenido nuevo) y **el marcador se anuncia** brevemente («silencio»); (iv) Retroceder restaura la intervención anterior íntegra (ya en R-V9); (v) duración ≥ `max(1500 ms, lectura_minima_ms declarada)`; (vi) el plano persiste (R-V3) o neutro si no lo hay — nunca vacío. Queda pendiente el visado artístico de R06 (mitad editorial de D-4).

### 3.6 Comportamiento al cambiar de escena

- **UX-20 (ventana sin vaciado):** durante la ventana `exit_transition` → `entry_transition` (R-V4) el fotograma saliente persiste visualmente; **el texto del beat entrante aparece antes de resolver su imagen**; el plano de la escena anterior nunca queda como vigente tras la ventana.
- **UX-21 (entrada en neutro):** si la escena entrante no tiene base elegible (caso Escena B de I.8), la ventana resuelve en fundido a neutro (o corte con movimiento reducido): transición legítima, **sin nota, sin spinner** (S-1). El neutro de arranque no se percibe como «carga pendiente»: el texto entra con su lectura garantizada y la escena está completa por texto.
- **UX-22 (llegada tardía de imagen):** si la base elegible de la escena entrante resuelve **después** del texto (carga en paralelo, P1-4), el frame muestra neutro/texto y la imagen incorpora con fundido suave de entrada (sin flash, sin repintado del texto, sin desplazamiento del panel). Si no llega, rige §3.10.
- **UX-23 (anuncio de escena):** el cambio de escena se anuncia a lectores de pantalla con el título/identificación de la escena antes del texto del primer beat (orden: escena → hablante → texto).

### 3.7 Movimiento reducido y ausencia de transiciones reveladoras

- **UX-24 (movimiento reducido, R-V11 reafirmado):** con `reduced_motion: true`, todo cambio de plano (incluido hacia/desde neutro) es **corte instantáneo sin deriva**; parallax ignorado; texto idéntico. El neutro es estático en ambos modos (UX-06).
- **UX-25 (ninguna transición revela contenido):** dos prohibiciones: (a) **cap de la ventana**: el fotograma saliente persiste solo durante la ventana de transición de escena (≤ su duración declarada; referencia de diseño 300–600 ms, a calibrar), nunca como «recuerdo» más allá de la frontera; (b) **sin superposición de elegibilidad cambiante**: cuando en una frontera un plano caduca y otro se **activa** (primer instante de elegibilidad, p. ej. un hipotético 900005→900006 intra-escena), la transición entre ambos es **corte o fundido a través del neutro** — prohibido el cross-fade directo, porque su punto medio superpondría visualmente el contenido entrante (post-desenlace) sobre el saliente antes de completar la frontera. El cross-fade directo queda reservado a planos cuya elegibilidad mutua no cambia en la frontera (R-V2).
- **UX-26 (sin movimiento que anticipe):** ninguna animación de cámara, deriva o entradilla puede encuadrar o insinuar elementos de momentos narrativos posteriores (extensión del principio FP-13/FP-18 a la capa de movimiento).

### 3.8 Foco, teclado y lectores de pantalla

- **UX-27 (orden de foco):** secuencia lógica estable: panel de texto (contenedor con `aria-live="polite"` para el anuncio de hablante+texto) → controles Pausa/Continuar → Repetir → Retroceder → Historial → Salto manual → acciones secundarias (lector, ajustes). El foco inicial al entrar en un beat recae en el panel (no en controles) para que la lectura sea lo primero anunciado.
- **UX-28 (teclado):** teclas mínimas (mapeo a confirmar en implementación): `Espacio` pausa/continuar; `←/→` retroceder/avanzar (avance solo cuando disponible); `R` repetir; `H` historial; `Esc` cerrar nota de fallo. Todos los objetivos ≥48×48 CSS px con separación visible (UX_ACCESIBILIDAD §2). La nota de fallo es cerrable con `Esc` **sin robar el foco** (R-V7).
- **UX-29 (lectores de pantalla):** cada beat anuncia: hablante → texto íntegro (sin truncar el anuncio); S-1/S-2/S-3 (neutro) **no generan anuncio alguno** (el fondo es decorativo: no existe «estado sin imagen» que comunicar — nombrarlo transmitiría una anomalía inexistente); la nota de fallo se anuncia con `role="status"`/`polite` (S-4); el marcador de silencio se anuncia (S-5); la voz fallida se anuncia una vez (ERROR_VOZ). Cambio de escena: título primero (UX-23).
- **UX-30 (semántica de `settings.subtitles` — desambiguación TS-001):** la preferencia `subtitles` del perfil **gobierna exclusivamente las captions descriptivas de sonido** (R07 §5: «[Viento; aspas]», metadatos de accesibilidad sujetos a R08/R12) y **jamás oculta ni atenúa `texto_visible`** en Modo Historia (biblia §6.3: «TS-001 debe prevalecer frente a cualquier control de "ocultar subtítulos"»). El control de volumen de voz afecta solo al audio, nunca al texto (P0-1).

### 3.9 Ausencia de spinners o avisos cuando el neutro es intencionado

- **UX-31 (prohibición de indicadores de espera):** en la presentación del Modo Historia **no existen spinners, por ningún motivo**. El texto-first convierte la espera en un estado invisible: si un activo carga, el frame muestra neutro/plano anterior con el texto íntegro y nada «pendiente» que el usuario deba esperar; la escena nunca parece incompleta porque su contenido principal (el texto) ya está completo. Un spinner comunicaría un bloqueo que P1-4 excluye por construcción.
- **UX-32 (cero señales en neutro legítimo):** en un beat resuelto a neutro **sin fallo de carga** (S-1/S-2/S-3), el DOM de presentación no contiene: nodo de aviso, icono de error, texto de estado («sin imagen», «cargando…»), ni ningún elemento no previsto en §3.1/§3.2. Comprobable por inspección (§6, UX-C).
- **UX-33 (coherencia de identidad visual):** el neutro por diseño (S-1) y el neutro por fallo sin nota activa (S-4 ya cerrada por el usuario o tras cambiar de beat) son **pixel-idénticos** salvo la nota mientras viva: el usuario no puede distinguir estados que no le incumben.

### 3.10 Mensajes no bloqueantes para fallos reales de recursos

- **UX-34 (disparo):** la nota de fallo (`UX-ER-1`) aparece **solo** cuando un activo elegible y declarado (beat o escena, E-1…E-4) falla físicamente en carga (R-V7), o cuando la voz declarada no reproduce (`ERROR_VOZ`). Nunca ante neutro por elegibilidad, caducidad, ausencia de `audio_asset_id`, mute o volumen 0 (R07 §5).
- **UX-35 (anatomía de la nota):** chip discreto en la esquina inferior izquierda (opuesta a la franja derecha de texto cuando existe composición), fondo del token neutro, borde fino, texto corto y sobrio, sin códigos técnicos, sin tono de error del sistema. Propuesta de copy (a cerrar con R01/R02): imagen — «No se ha podido mostrar una imagen de esta escena. La historia continúa con normalidad.»; voz — «La voz de esta intervención no está disponible. El texto continúa en pantalla.»
- **UX-36 (comportamiento):** una sola vez por entrada de beat (no en bucle); cerrable con `Esc` y con botón ≥48 px; **no roba el foco** del panel; no bloquea avance, controles ni lectura; se desvanece al pasar al beat siguiente (no persiste entre beats); se registra en log local con beat/`utterance_id`/activo/timestamp (R-V7). En retroceso al beat fallido puede reaparecer una vez (nueva entrada de beat) — el registro de log no se duplica en pantalla.

## 4. Tabla de transiciones

Estados de superficie (columna izquierda) × sucesos. Los estados del reproductor (`TEXTO_VISIBLE`, `CON_VOZ`, `EN_PAUSA`, `ERROR_VOZ`, `TRANSICION` — §2.1 COMPONENTES) son ortogonales y coexisten con cualquiera de estas superficies; se anotan donde son determinantes.

| Superficie \ Suceso | Entrada de beat / escena | Éxito de carga tardía | Fallo de carga (activo elegible) | Avance (auto/manual) | Retroceso | Restauración de partida | Cambio de perfil (texto/movimiento) |
|---|---|---|---|---|---|---|---|
| **NEUTRO** (S-1/S-2/S-3) | Texto íntegro + neutro; **cero señales**; `TEXTO_VISIBLE` desde datos | Fundido suave al plano elegible que llega (UX-22); texto intacto; sin repintado del panel | Permanece NEUTRO **+ nota única** (UX-34/35); texto íntegro; avance disponible | Beat siguiente resuelve por la función (imagen, neutro o SILENCIO); transición §3.7 | Recomputación UX-14: puede restaurar plano caducado reaparecido o neutro | Recomputación determinista R-V10; neutro/restaurado según posición | Re-layout/reflujo (UX-17/18); transiciones según `reduced_motion` (UX-24) |
| **NEUTRO + nota** (S-4 activa) | — | Nota se cierra al incorporarse la imagen (fundido suave); si el activo declarado era otro y falla, rige fila anterior | Nota única ya mostrada; sin acumulación | Nota se retira al cambiar de beat (UX-36) | Retroceso al beat fallido puede mostrar la nota una vez (UX-36) | Como NEUTRO; el log persiste, la nota solo si el fallo se reproduce | Nota persiste mientras el beat no cambie |
| **IMAGEN_VIGENTE** (plano elegible cargado) | Cross-fade solo si elegibilidad mutua no cambia (UX-25b); texto primero siempre | — | Cascada R-V6 con filtro E → plano alternativo o NEUTRO + nota | Siguiente beat por función; `[]` persiste sin repintado (R-V3) | Recomputación UX-14 | Determinista (R-V10) | Re-layout; corte o cross-fade según `reduced_motion` |
| **SILENCIO** (S-5) | Panel conserva última intervención atenuada + marcador (UX-19); plano persiste (R-V3); ≥ max(1500 ms, lectura_minima_ms) | — (el plano persiste; si no hay plano, neutro) | Como IMAGEN_VIGENTE (la nota no interfiere con el panel atenuado) | Beat siguiente por función; retroceso posterior restaura intervención íntegra (R-V9) | Restauración íntegra del texto anterior | Determinista | Atenuación recalibrada al token activo; marcador constante |

**Invariante transversal (todas las celdas):** texto íntegro + rótulo visible desde datos listos; controles operables; ninguna ruta de avance depende de imagen o voz (P0-1/P1-4); ninguna celda produce pantalla vacía ni spinner (UX-31/32).

## 5. Wireframes descritos (texto, no implementación)

Geometría común: marco 16:9 (fotograma 1672×941 en composición con imagen); panel de texto opaco; controles en barra inferior; la disposición del panel no cambia entre estados (UX-05).

**W1 — Escena neutra deliberada con diálogo (S-1; caso B07 de I.8, I12):**

```
┌──────────────────────────────────────────────────────────────┐
│  superficie «Niebla de Mancha» (plana, estática)             │
│                                                              │
│   ┌─ panel opaco (derecha o disposición estándar) ────────┐  │
│   │  NARRADOR                            [rótulo, versal] │  │
│   │  «Acudió Sancho Panza a socorrerle, a todo el correr │  │
│   │  de su asno, y cuando llegó halló que no se podía    │  │
│   │  menear: tal fue el golpe que dio con él Rocinante.» │  │
│   │  [ver en el lector] (si capa textual disponible)     │  │
│   └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [Pausa] [Repetir] [Retroceder] [Historial]      (≥48 px)    │
│                                                              │
│  SIN spinner · SIN aviso · SIN marca de «sin imagen»         │
└──────────────────────────────────────────────────────────────┘
```

**W2 — Frontera de caducidad (S-3; cierre de B06 → entrada a B07/Escena B):** el fotograma de 900005 (DQ montado) persiste solo durante la ventana de salida; fundido a neutro (o corte con `reduced_motion`); el texto de I11 ya se leyó íntegro; al abrir B07 la pantalla es W1. **Nunca** un frame intermedio superpone contenido de 900006 (UX-25b).

**W3 — Neutro con nota de fallo real (S-4):**

```
│  ┌ W1 íntegro ──────────────────────────────────────────┐    │
│  │                                                      │    │
│  │  ┌ nota (inf-izq) ────────────────────────────────┐  │    │
│  │  │ ⓘ No se ha podido mostrar una imagen de esta   │  │    │
│  │  │ escena. La historia continúa con normalidad. ✕ │  │    │
│  │  └────────────────────────────────────────────────┘  │    │
```

Nota única, fuera de la franja de texto; texto íntegro visible; controles operables; `Esc` la cierra sin mover el foco.

**W4 — SILENCIO (S-5; propuesta D-4):** plano vigente persiste (o neutro); panel conserva la última intervención con opacidad calibrada (contraste ≥ AA sobre fondo efectivo) y marcador discreto «· silencio ·» + glifo, debajo del rótulo; controles íntegros; sin contador de tiempo visible.

**W5 — Texto ampliado / paginación (UX-18):** panel reflujo con rótulo persistente en la página 2 de 2; indicador de página discreto (texto, no solo color); autoavance espera la lectura completa de ambas páginas; controles sin solapamiento con el texto (R07 §5).

## 6. Criterios comprobables para R10/R12

Extienden (no duplican) T5–T11 y FP-1…FP-18. **Ninguno está ejecutado** — requieren reproductor (R10/R12); los automáticos son propuestas de fixture/mock.

| ID | Criterio comprobable | Método | Enlaza con |
|---|---|---|---|
| UX-C1 | Beat resuelto a neutro **sin fallo** (S-1/S-2/S-3): el DOM no contiene nodo de aviso, icono de error ni texto de estado; la superficie contiene solo neutro + panel | Automática (inspección de árbol de presentación, mock) | FP-18; UX-31/32 |
| UX-C2 | Con activo elegible y fichero dañado: neutro (u alternativa de cascada) **+ una nota**, mostrada ≤1 vez por entrada de beat, cerrable con `Esc` sin mover el foco | Automática (mock) + manual | FP-5/FP-15; R-V7 |
| UX-C3 | La nota nunca aparece ante: elegibilidad vacía, caducidad, `audio_asset_id` ausente, mute, volumen 0 | Automática (mock, matriz de causas) | FP-6; R07 §5 |
| UX-C4 | Contraste texto/superficie del neutro ≥7:1 (cuerpo) y ≥4,5:1 en toda la atenuación de SILENCIO sobre su fondo efectivo, medido con herramienta en ambos tokens | Automática (medición de tokens) + auditoría manual | UX-03/19; DIRECCION_ARTISTICA |
| UX-C5 | Con `reduced_motion: true`: todo cambio de plano es corte instantáneo (0 desplazamiento, 0 deriva); texto píxel-idéntico al modo normal | Automática (captura por estado) | FP-10; T9; R-V11 |
| UX-C6 | En frontera con activación de plano nuevo tras caducidad del anterior: el frame intermedio no superpone contenido entrante y saliente (corte o fundido a través de neutro) | Automática (muestreo de frames) + capturas | UX-25b; FP-16 |
| UX-C7 | El fotograma saliente no persiste más allá de la ventana de transición; jamás vacío durante la ventana | Automática | FP-4; R-V4; UX-20 |
| UX-C8 | Retroceso/restauración recomputan elegibilidad: plano caducado reaparece al volver; plano futuro jamás aparece (incluido estado restaurado pre-golpe) | Automática (mock) + manual | FP-9/FP-17; R-V10; UX-14 |
| UX-C9 | Historial contiene exclusivamente intervenciones con cursor ≤ actual; abrirlo pausa; seleccionar entrada = retroceso coherente | Manual (caja negra) | UX-15; EF-HIS-03 |
| UX-C10 | Texto ampliado `muy_grande`: reflujo/paginación sin truncamiento; rótulo persistente; autoavance respeta suelo escalado (hipótesis UX-17) y páginas completas | Manual (personas mayores) + mock | T5/T10; UX-17/18 |
| UX-C11 | Recorrido completo solo teclado (pausa/continuar/repetir/retroceder/historial/salto/nota `Esc`), foco visible y orden UX-27 | Manual (accesibilidad) | T7; FP-11 |
| UX-C12 | Lectores de pantalla: beat anuncia hablante→texto íntegro; neutro no genera anuncio; nota y marcador de silencio se anuncian; cambio de escena anuncia título primero | Manual (NVDA/JAWS/VoiceOver) | UX-19/23/29 |
| UX-C13 | `subtitles: false` no oculta ni atenúa `texto_visible` (Modo Historia); solo afecta a captions descriptivas | Automática (mock de perfil) + manual | UX-30; TS-001 |
| UX-C14 | Voz fallida: aviso discreto único, sin bloqueo, texto íntegro; voz ausente/mute: sin aviso y recorrido completo | Automática (mock) + manual | T8; FP-6; P0-1 |
| UX-C15 | Neutro estable: sin parpadeos ni alternancias con imágenes posteriores bajo cualquier combinación de fallos (incl. fotofobia) | Automática (muestreo temporal) | FP-18 |
| UX-C16 | SILENCIO: sin pantalla vacía; marcador redundante; retroceso restaura intervención íntegra; duración ≥ max(1500 ms, lectura_minima_ms) | Manual + mock | FP-8; R-V9; UX-19 |

## 7. Contradicciones y desalineaciones detectadas (sin modificar ningún documento)

| ID | Dónde | Qué dice hoy | Conflicto | Tratamiento propuesto |
|---|---|---|---|---|
| **X-1** | `COMPONENTES_NARRATIVOS_UX` §1, fila `visual_asset_ids` | «Fondos de escena (≥1 perspectiva); cross-fade entre beats sin vaciar el fotograma» | Doble: (a) «≥1» desalineado con Opción 2 (`minItems: 0`) recomendada por R09 (CT-5 favorable); (b) «cross-fade entre beats» choca con R-V3 (persistencia **sin** transición ni repintado) y con UX-25b | Es la discrepancia **D-2 ya registrada** por R11: actualizar solo tras la secuencia de aprobación; no editar en paralelo |
| **X-2** | `COMPONENTES_NARRATIVOS_UX` §2.2 punto 2 | Cascada «beat → escena → fotograma anterior → fondo neutro» **sin filtro de elegibilidad** | Anterior a la rectificación antispoiler (R11 §3.2, R-V6/R-V12): un implementador que siga solo §2.2 puede promocionar 900006 al fallar 900030 (lo que FP-15 prohíbe) | Alineación documental futura (post-coaprobación): incorporar el filtro E-1…E-4 y la regla «la indisponibilidad de previas nunca promociona una posterior» |
| **X-3** | `COMPONENTES_NARRATIVOS_UX` §2.2 punto 2 | «Si nada carga, se muestra nota discreta de error» — nota asociada al **resultado** (neutro) | Con A+D existen neutros legítimos sin fallo (B07 de I.8); la lectura literal produciría avisos en neutros intencionados (contra el punto 9 del encargo). FP-15 sí liga la nota al fallo de activos elegibles — la redacción de §2.2 no lo distingue | Esta especificación fija la distinción (UX-34: nota = suceso de fallo, no estado). Reflejo futuro en el documento de componentes junto con X-2 |
| **X-4** | `COMPONENTES_NARRATIVOS_UX` §2.2 punto 3 | «La obligatoriedad editorial de `visual_asset_ids ≥ 1` se MANTIENE en el dato» | Desactualizada frente a la recomendación R09 (v1.2.0, CT-5 favorable) pendiente de coaprobación | Mantener en suspenso; no editar hasta arbitraje R14 (misma lógica de D-2) |
| **X-5** | `COMPONENTES_NARRATIVOS_UX` §2.1 | No existe estado de superficie para neutro ni para el tratamiento SILENCIO (R-V9 vive solo en R11) | El documento de estados del reproductor no cubre la dimensión «superficie» que este encargo exige | Los estados de superficie de §2 son **aditivos** y compatibles; convergencia documental tras arbitraje |
| **X-6** | `schemas/player/profile.schema.json` (`settings.subtitles`) | Preferencia booleana «subtitles» sin semántica definida frente a TS-001 | Si se interpreta como «ocultar texto» choca con TS-001; la biblia §6.3 ya anticipa la prevalencia pero el esquema no lo anota | UX-30 fija la semántica (solo captions descriptivas). Sugerencia no vinculante a R09: comentario de esquema; a R10: reflejo en contrato de consumidor |
| **X-7** | `DIRECCION_ARTISTICA` / `PILOTO` / `DOSSIER_H4` | «Fondo neutro de la dirección artística» es invocado por §2.2 de COMPONENTES y por R-V6/R-V7, pero **no está definido** en ningún documento artístico (verificado por búsqueda) | Hueco: tres especificaciones dependen de un token inexistente | **Solicitud a R06:** definir el token/variante del neutro. UX-02/03/04 fijan requisitos y una propuesta de hipótesis mientras tanto |
| **X-8** | `profile.schema.json` (registrado por R11 §6) | Sin preferencia `avance_automatico` por perfil, requerida por §2.3 de COMPONENTES y por UX-12 | Hueco heredado, no reabierto aquí | Referencia cruzada; tramitación con la futura v1.2.0 si R14 la autoriza |

Ninguna de estas desalineaciones se ha corregido en este encargo. Todas son documentales; ninguna afecta a datos de contenido ni a esquemas vigentes.

## 8. Posicionamiento de R08 en decisiones abiertas que le competen

- **D-2** (alineación de §1 de COMPONENTES): conforme con la secuencia propuesta por R11 — actualización solo tras aprobación de v1.2.0; R08 ejecutará su parte junto con R10.
- **D-4** (panel en SILENCIO): **dictamen favorable de accesibilidad** a la propuesta R-V9 con las condiciones vinculantes de UX-19 (atenuación con contraste ≥ AA, marcador redundante, tratamiento de lectores de pantalla, restauración íntegra). Pendiente el visado artístico de R06.
- **E-4 fail-closed / D-6**: sin competencia técnica de R08, pero con consecuencia UX fijada: todo el espacio de fallo del mecanismo de elegibilidad desemboca en neutro **sin señal** (S-2) — el coste de la duda es solo visual y el usuario no lo percibe como anomalía. Esto hace al diseño tolerante a la incertidumbre del mecanismo mientras R09 lo cierra.
- **Solicitudes a R14:** (1) tomar nota de esta especificación como base de criterios R10/R12 (§6); (2) trasladar X-7 a R06 (token del neutro) y X-6 a R09/R10; (3) mantener la regla de señal (R08-N0) como criterio de aceptación transversal del reproductor. **Nada de esto autoriza GO de runtime ni de implementación.**

## 9. Dictamen R08

**CONFORME — especificación emitida.** El diseño A+D de R09 es **compatible con TS-001 y con la experiencia del usuario** si y solo si la señal de error se desacopla del estado de resultado (R08-N0): el neutro deja de ser «la escena rota» y pasa a ser «un momento narrado sin plano, con su texto íntegro», que es exactamente lo que la curaduría pidió para el intervalo post-I11. Las seis situaciones del encargo quedan diferenciadas sin introducir seis pantallas distintas: dos superficies, causas ocultas y señales ligadas a sucesos. Ninguna contradicción con `COMPONENTES_NARRATIVOS_UX.md` ha sido corregida unilateralmente (X-1…X-8 en §7).

**Estado:** **UX NEUTRO DEFINIDO / TS-001 PRESERVADO / RUNTIME SIN GO.** Sin implementación, sin cambios de contratos, sin PR. Los tokens de §3.1 y los coeficientes de UX-17 son hipótesis de diseño sujetas a calibración (R06/R12), no decisiones cerradas.

---

### Anexo A — Fuentes efectivamente consultadas (todas sobre `main` @ `afc72644dc4283ff72f45baa5f85ca79e0498930`)

1. `ENTREGA_R11_H5_ADR0005.md` — R-V1…R-V12, E-1…E-4, D-1…D-6, CT/FP, §5.1 (documentado ≠ ejecutado).
2. `EVALUACION_R09_D6_ELEGIBILIDAD_CADUCIDAD.md` — A+D, tabla NOT BEFORE/NOT AFTER, cursor de «intervención presentada», Escena B (B07 neutro), matriz CT-6/FP.
3. `COMPONENTES_NARRATIVOS_UX.md` — §1 (estructura dato↔pantalla), §2.1 (estados), §2.2 (carga P1-4), §2.3 (P0-2), §2.4 (controles), §4 (T1–T11).
4. `BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md` — TS-001 (§1), rol R08 (§3), §6.3 (prevalencia TS-001).
5. `FICHA_ESCENA_P1_C08_MOLINOS.md` — B01–B09, texto íntegro I11/I12 (base de W1/W2).
6. `DIRECCION_SONORA_PILOTO_MODO_HISTORIA.md` — §4 (autoavance, texto antes de voz), §5 (estados de ausencia de audio, captions, prueba silenciosa).
7. `DIRECCION_ARTISTICA.md` — contraste AA, panel opaco/sólido, prohibición de reducir tipografía, franja reservada.
8. `DOSSIER_ARTISTICO_H4.md` — franja TS-001 como hipótesis de layout pendiente de prueba; ausencia de definición de fondo neutro.
9. `UX_ACCESIBILIDAD.md` — reglas de interacción (§2), prioridad personas mayores, pruebas de caja negra (§5).
10. `ESPECIFICACION_FUNCIONAL.md` — EF-HIS-01…04.
11. `GO_NO_GO_FASE0.md` — estado SIN GO de implementación.
12. Esquemas: `schemas/content/beat.schema.json` (flags con $comment P0-2/P1-3), `scene.schema.json` (transiciones, accessibility, subtitles_ref), `schemas/player/profile.schema.json` (`text_size`, `reduced_motion`, `subtitles`, `volumes`; sin `avance_automatico`).
13. `app/src/contrato.ts` — espejo tipado del contrato (sin estados de presentación: coherente con «sin implementación»).
14. Remoto GitHub (API): SHA de `main` y listado de ramas (2026-11-08, dos consultas: `afc7264` al inicio y `6c6e2c9` al publicar).
15. `DISENO_SONORO_B06_B08_ESCENAS_NEUTRAS.md` + `data/cue_sheet_molinos_b06_b08_neutras.csv` (PR #53, incorporados al remoto durante esta redacción) — coherentes con S-1/S-3/S-5/S-6; sin contradicciones.

*R08 — UX/UI y Accesibilidad. Documento de especificación remitido a R14 para arbitraje. SIN GO.*
