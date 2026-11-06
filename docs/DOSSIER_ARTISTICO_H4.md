# DOSSIER ARTÍSTICO H4 — Auditoría de imágenes desde el guion, decisiones documentadas y encargos de recreación (Modo Historia)

**Modo:** CONTENIDOS + ARTE · **Roles:** R05 (curador iconográfico) + R06 (dirección artística) + R13 (derechos) · **Hito:** H4 (Dossier artístico).
**Versión:** propuesta 0.1 · **Fecha:** 2026-11-06 · **Estado:** documentación para revisión editorial (R01/R14). **No autoriza la producción de imágenes ni la implementación.**
**Fuentes contrastadas en `main` (commit `a54243b`):** `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md` (§3 R05/R06/R13, §5), `docs/DC_IMG_001_ASIGNACION_INTEGRAL_ASSETS.md`, `docs/DIRECCION_ARTISTICA.md` (§9), `docs/DIRECCION_ARTISTICA_PILOTO.md`, `docs/FICHA_ESCENA_P1_C08_MOLINOS.md`, `docs/CATALOGO_NECESIDADES_VISUALES.md`, `docs/REVISION_EDITORIAL_ESCENAS.md`, `docs/DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md`, `assets/scenes/manifest.json` (paquete v14, 253 imágenes), `assets/closeups/manifest.json` (10 planos), `assets/ilustraciones_tusell/manifests/manifest_ilustraciones.csv` (376 acuarelas + 39 piezas de edición), `content/piloto/` (10 episodios, pasajes, 74 preguntas), `docs/MATRIZ_IMAGENES_2026-11-06.xlsx` (697 imágenes inventariadas).

---

## 1. Principio rector: el guion manda, el banco de imágenes obedece

**La auditoría de imágenes se realiza a partir de las necesidades del guion, nunca al revés.** La cadena obligatoria es:

```
unidad literaria → episodio → escena → beat/fase → necesidad visual expresada en el guion
   → veredicto documentado → (imagen existente | ajuste | brief de recreación | narración ilustrada)
```

Prohibiciones derivadas:

1. **No se parte del banco** («¿qué tenemos?» primero) ni se reparten imágenes para alcanzar métricas (DC-IMG-001 §1). Un hueco que el guion no demanda **no es un hueco**; una imagen sobrante no crea una escena.
2. **Ninguna orden vaga al diseñador.** Cada encargo de recreación se emite con el brief completo del §6: fragmento, instante exacto, mecanismo del humor, personajes y emoción, plano, luz, zona de reserva de texto y negative prompts. Queda expresamente prohibido emitir instrucciones del tipo «haz una escena graciosa» o «ilustra el capítulo X».
3. **Regla de ahorro** (Biblia §5.4): nunca exigir imagen nueva cuando el texto y el ambiente comunican mejor la situación. La narración ilustrada es una decisión digna, no un déficit.
4. **Granularidad honesta:** el guion a nivel de beat (fichas H3) solo existe hoy para **I, 8**. El resto del piloto editorial tiene guion de episodio + pasajes + preguntas: para esos capítulos la auditoría se emite **a nivel de escena y fase** (before/question/reveal/after), y se ampliará a nivel beat a medida que H3 produzca fichas. No se falsifica precisión que el guion aún no contiene.

## 2. Escala de veredictos

Cada escena (o beat, cuando existe ficha) recibe **exactamente una** de estas cuatro decisiones, con su correspondencia a los códigos R05:

| Veredicto (este dossier) | Código R05 | Definición operativa | Evidencia exigida |
|---|---|---|---|
| **IMAGEN_ADECUADA** | APTA | La imagen existente expresa el instante, el tono y la función narrativa sin ajustes; licencia verificada; spoiler conforme a fase | Cotejo visual con la biblia de continuidad + registro de fase y spoiler |
| **IMAGEN_PARCIALMENTE_ADECUADA** | APTA_CON_APOYO / SUSTITUIR (con ajuste) | Sirve con un ajuste definido: recorte, reencuadre, cambio de plano, cambio de fase de uso, apoyo de acuarela o de close-up. El ajuste se escribe aquí, no se delega | Descripción exacta del ajuste y de qué queda sin cubrir |
| **NUEVA_RECREACION_NECESARIA** | CREAR | Ningún recurso existente (escena, acuarela, close-up) expresa el instante sin traicionar el guion; se emite brief completo (§6) | Brief con los 10 campos del §6 + veredicto R13 |
| **NARRACION_ILUSTRADA_SUFICIENTE** | NO_REQUIERE_IMAGEN nueva | El texto visible (TS-001), el ambiente sonoro y/o una imagen existente ya aprobada en otra fase comunican la escena; el coste de una recreación no aporta valor narrativo | Justificación de por qué el texto comunica mejor |

Regla de desempate: ante duda entre ADECUADA y PARCIALMENTE, prevalece PARCIALMENTE (obliga a documentar el ajuste). Ante duda entre PARCIALMENTE y NUEVA_RECREACION, se consulta R01/R14 antes de encargar: **encargar es la opción cara y se justifica, no se presume.**

## 3. Criterios de decisión R06 (aplicables a todo veredicto)

1. **Función de la fase:** `before` ambienta y **no revela desenlace** (spoiler `ninguno`); `question` apoya el enunciado sin contener la respuesta; `reveal`/`after` muestran consecuencia **solo tras la revelación**. El contrato actual prescribe `spoiler_level: ninguno` para imagen previa (DC-IMG-001 §6).
2. **Mecanismo del humor documentado:** toda escena cómica se audita en su cadena preparación → mecanismo → reacción (Biblia §5). El humor de *El Quijote* es habitualmente **de contradicción percepción/realidad y de factura doméstica contra grandilocuencia**: la imagen debe servir a ese mecanismo, no sustituirlo por un gag visual añadido. No se impone comicidad donde el texto tiene dolor o ambivalencia.
3. **Continuidad:** fisonomía, vestuario, Rocinante (pardo claro, enjuto), rucio (gris) según `DIRECCION_ARTISTICA_PILOTO.md` y `personajes_referencia.webp`. Relatos intercalados (Curioso impertinente, el cautivo, el loco de Sevilla, Montesinos) **no se presentan como hechos presenciados por los protagonistas**.
4. **Plano y perspectiva al servicio del instante:** el banco ya contiene diversidad (interiores, conversaciones, multitudes, paisajes); se conserva y no se reutiliza siempre el mismo encuadre de protagonistas a caballo.
5. **Reserva de texto TS-001 (innegociable):** toda palabra hablada se muestra en pantalla siempre. Las 253 escenas del manifiesto registran `preferred_overlay_side: right` (sujeto en tercio izquierdo/central, 1672×941). Cada decisión de veredicto confirma que la zona derecha (o la franja que UX determine) queda libre de rostros, gestos y objetos narrativos; **no existen áreas seguras universales**: la zona se registra por escena.
6. **Licencia (R13):** ninguna imagen se marca APTA sin estado de licencia registrado (§7). Licencia desconocida ≠ autorizada.
7. **Rotulación:** toda recreación IA se rotula `RECREACION_ARTISTICA`; toda acuarela Tusell lleva atribución completa; ninguna imagen se presenta como documento histórico.

## 4. Auditoría del piloto editorial — escena a escena

Ámbito: los **seis capítulos del piloto editorial** (I,6 · I,8 · I,11 · I,18 · II,1 · II,74) más los cuatro episodios adicionales de la precarga con guion y preguntas ya definidos (I,1 · I,16 · I,21 · II,10). Para cada capítulo se audita la demanda del guion por fase y se cita el asset real del manifiesto (IDs `DQ.MED.*` tal como constan hoy; ver hallazgo §8.1 sobre la familia `DQ.MED`/`DQ.MA`).

### 4.1 Capítulo I, 8 — «Los molinos de viento» (`DQ.P1.C08.E01`, ficha de escena completa B01–B09)

Único capítulo con ficha H3 completa. Auditoría **beat a beat** sobre los 3 assets citados por la ficha + los 2 assets de la segunda mitad del capítulo (frailes y vizcaíno):

| Beat | Instante del guion | Asset existente | Veredicto | Decisión R06 |
|---|---|---|---|---|
| B01 | Descubrimiento: «descubrieron treinta o cuarenta molinos…» | `DQ.MED.900231` siluetas desde la loma | **IMAGEN_ADECUADA** | Da la realidad antes del delirio (preparación del humor). Cielo/camino a la derecha = reserva de texto verificada |
| B02 | DQ señala: «desaforados gigantes… gran servicio de Dios» | `DQ.MED.900005` señalamiento con advertencia de Sancho | **IMAGEN_ADEQUADA** | Verificación visual PASS 2026-11-06; ~8 molinos visibles vs «treinta o cuarenta»: licencia artística aceptada (la pregunta del cómputo se responde con el texto, no con la imagen) |
| B03 | «¿Qué gigantes?» / «brazos de casi dos leguas» | — | **NARRACION_ILUSTRADA_SUFICIENTE** | Diálogo breve y rápido; mantener plano de B01/B02 (uso continuado de `900005`/`900231`) evita un salto de plano por cada réplica. El texto manda |
| B04 | Corrección técnica de Sancho; «ponte en oración» | — | **NARRACION_ILUSTRADA_SUFICIENTE** | Igual que B03: uso continuado de `900005`. Aquí se enlazan Q.101, Q.109: la imagen no contiene la explicación que Sancho acaba de dar (anti-spoiler verificado) |
| B05 | La carga: espuelas, sordera selectiva, «Non fuyades» | — | **NUEVA_RECREACION_NECESARIA** | Hueco declarado ya por la ficha (§9.4). Ningún asset muestra el arranque de la carga con Sancho gritando en primer término — el ajuste que compensa la condensación (que el arrojo no se lea como valentía). → **BRIEF-H4-01** |
| B06 | El viento mueve las aspas; Briareo; embestida y caída | `DQ.MED.900006` caído junto a la lanza rota | **IMAGEN_PARCIALMENTE_ADECUADA** | Cubre el **después** del golpe (post-golpe como imagen de la consecuencia). El golpe en sí queda en el texto + silencio de audio de 1 s (reacción por contraste, no gag añadido). Se confirma su uso **solo como imagen posterior**, nunca anticipatoria. → ver ajuste §5.3 para Q.112 |
| B07 | Sancho acude al socorro | `DQ.MED.900006` (reutilización) | **IMAGEN_ADECUADA** | La misma imagen sirve B06/B07: Sancho acercándose al caído ya está en la composición. Reutilización entre beats documentada, sin duplicar archivo (DC-IMG-001 §9.2) |
| B08 | Regañina de Sancho; Frestón; «Dios lo haga como puede» | — | **NUEVA_RECREACION_NECESARIA** | Hueco declarado por la ficha. Es el **núcleo cómico de la escena** (la factura doméstica contra la inmunidad psicológica del delirio): merece plano propio, no un plano genérico de conversación. → **BRIEF-H4-02** |
| B09 | Transición al Puerto Lápice | — | **NARRACION_ILUSTRADA_SUFICIENTE** | Enlace textual; sin imagen nueva |

Cobertura de fases del capítulo: `before` = `900005`+`900231` (APTA), frailes `DQ.MED.900159` (APTA, antes del encuentro con el coche, sin desenlace), vizcaíno `DQ.MED.900133` (APTA, encaramado esperando, sin combate), `after` = `900006` (APTA tras revelación).

### 4.2 Capítulo I, 6 — «El escrutinio de la librería» (`DQ.P1.C06.E01`)

| Fase | Necesidad del guion | Asset existente | Veredicto | Decisión |
|---|---|---|---|---|
| before | Cura y barbero examinan libros mientras el dueño duerme | `DQ.MED.900013` escrutinio (2.ª batería) + `DQ.MED.900230` cura/barbero con títulos en mesa | **IMAGEN_ADECUADA** (dos planos de la misma secuencia) | Composición interior claroscuro; reserva derecha verificada en manifiesto |
| question | Enunciados sobre veredictos de libros (Q.201–Q.208) | `900013`/`900230` + acuarelas Tusell 020–021 como apoyo visual del lector | **IMAGEN_ADECUADA** | Las preguntas se responden con el texto oído; las imágenes no muestran veredictos concretos |
| reveal | — | Acuarela Tusell 021 | **IMAGEN_ADECUADA** (con atribución) | Documenta el gesto del escrutinio; rotulación obligatoria |
| **after** | **La hoguera en el corral** (ama, sobrina y ventero secundan; los libros arden; DQ sigue durmiendo) | — | **NUEVA_RECREACION_NECESARIA** | Hueco real desde el catálogo FASE 0.5, ya solicitado como `p1_c06_hoguera_corral_post` y **no producido** (no existe en el manifiesto v14). Humor: la «inquisición bibliográfica» consumada por la casa entera contra una biblioteca que solo está loca en la cabeza del dueño. → **BRIEF-H4-03** |

### 4.3 Capítulo I, 11 — «Los cabreros y la Edad de Oro» (`DQ.P1.C11.E01`)

| Fase | Necesidad | Asset | Veredicto | Decisión |
|---|---|---|---|---|
| before | Cena con cabreros junto al fuego | `DQ.MED.900007` | **IMAGEN_ADECUADA** | Verificación de continuidad pendiente de lote, pero metadatos y prompt conformes |
| question | Discurso de la Edad de Oro (Q.209–Q.216) | `DQ.MED.900134` discurso ante los cabreros | **IMAGEN_ADECUADA** | Plano de palabra solemne-paródica: DQ en pie entre pastores; la solemnidad expansiva del discurso ES el mecanismo cómico (grandilocuencia sobre silvestrería) |
| reveal / after | Cierre del discurso y respuesta de los cabreros | Acuarelas Tusell 034–036 | **IMAGEN_ADECUADA** con atribución | Cobertura completa declarada en catálogo FASE 0.5 |

**Capítulo sin huecos: ninguna recreación.** La ternura paródica del discurso se apoya en el texto; no se añade gag visual.

### 4.4 Capítulo I, 18 — «La batalla de los rebaños» (`DQ.P1.C18.E01`)

| Fase | Necesidad | Asset | Veredicto | Decisión |
|---|---|---|---|---|
| before | Polvareda y «dos ejércitos» imaginados | `DQ.MED.900008` rebaños con DQ señalando, sin batalla | **IMAGEN_ADECUADA** | Anti-spoiler correcto: no se ve la carga ni el desenlace. El mecanismo (hipérbole heráldica sobre ovejas) lo ejecuta el texto: Q.217–Q.220 |
| question / reveal | La carga contra las ovejas y sus consecuencias (Q.221–Q.222) | Acuarelas Tusell 057–058 en fase reveal + texto | **NARRACION_ILUSTRADA_SUFICIENTE** | La carga se narra con el texto literal; la consecuencia visual (derribo, dientes perdidos) queda en la acuarela de la composición de Doré, rotulada. No se encarga recreación: la comicidad es verbal (Arete de los motes «del Arremangado Brazo», etc.) |
| after | Sancho examina la boca de DQ; nueva pedrada | `DQ.MED.900136` pastores/piedras (post) | **IMAGEN_ADECUADA** | Spoiler alto admitido solo tras revelación; sirve Q.223 |
| apertura (puente) | Sancho llega «marchito y desmayado» de la venta | Acuarela Tusell 056 | **IMAGEN_ADECUADA** como puente | Auditoría de la discrepancia alt↔capítulo **resuelta** en catálogo FASE 0.5: 056 ilustra el cierre de I,17 y funciona como imagen de transición de apertura de I,18; se rotula y se usa en esa función, no como prueba del episodio |

### 4.5 Capítulo II, 1 — «La visita del cura y el barbero» (`DQ.P2.C01.E01`)

| Fase | Necesidad | Asset | Veredicto | Decisión |
|---|---|---|---|---|
| before | Visita de cura y barbero a DQ recuperado | `DQ.MED.900029` (3.ª batería) | **IMAGEN_ADECUADA** | Hueco `before` del catálogo FASE 0.5 ya cubierto |
| question | Conversación sobre el libro publicado y Angélica (Q.226–Q.231) | `DQ.MED.900179` locura/caballerías + `900029` | **IMAGEN_ADECUADA** | Continuidad de sala y luz entre ambas escenas ya documentada en revisión editorial |
| **reveal** | **El relato del loco de la casa de Sevilla** (el barbero narra la anécdota del hombre que creía estar loco solo cuando dejaba de estarlo; la caña) | — | **NUEVA_RECREACION_NECESARIA** | Hueco real, solicitado como `p2_c01_loco_sevillano_reveal` y **no producido** (no existe en v14). Es relato **interpolado**: la imagen muestra la anécdota narrada, nunca a DQ presenciándola. Su humor es especular (un loco cuerdo entre locos = espejo de la cordura de DQ) y por eso merece plano propio. → **BRIEF-H4-04** |
| after | Cierre de la conversación | — | **NARRACION_ILUSTRADA_SUFICIENTE** | Texto + uso continuado del plano de la visita |

### 4.6 Capítulo II, 74 — «La muerte de Alonso Quijano» (`DQ.P2.C74.E01`)

| Fase | Necesidad | Asset | Veredicto | Decisión |
|---|---|---|---|---|
| before | La cama; la lucidez tras seis días | `DQ.MED.900011` despedida | **IMAGEN_ADECUADA** | Tono: sin comicidad impuesta — el texto aquí tiene dolor y serenidad; la imagen acompaña (Biblia §5: no imponer comicidad donde hay ambivalencia) |
| question | Anuncios, testamento, epitafio (Q.232–Q.238) | `DQ.MED.900202` testamento + `900011` | **IMAGEN_ADECUADA** | — |
| reveal / after | La muerte y la advertencia final | Acuarelas Tusell 371–373 + `900011`/`900202` | **IMAGEN_ADECUADA** | Cobertura completa declarada en catálogo FASE 0.5 |

**Capítulo sin huecos.** Spoiler máximo (`critical`) admitido solo en fase after final.

### 4.7 Episodios adicionales de la precarga con preguntas definidas

| Capítulo | Fases cubiertas | Assets | Veredicto global |
|---|---|---|---|
| I, 1 | before/question | `DQ.MED.900002` biblioteca + `DQ.MED.900130` armas/limpieza | **IMAGEN_ADECUADA** — sin huecos; Q.301–Q.306 se responden con texto |
| I, 16 | before/question | `DQ.MED.900049` Maritornes + `DQ.MED.900164` la cama («golpes de rey») | **IMAGEN_ADECUADA** — el humor de la cama lo ejecuta el texto (Q.308/Q.311); la imagen muestra la venta sin gag |
| I, 21 | before/question/reveal | `DQ.MED.900025` Mambrino + `DQ.MED.900237` bacía bajo la lluvia + `DQ.MED.900167` examen de la bacía (post) | **IMAGEN_ADECUADA** — ciclo completo del equívoco del yelmo; Q.317 apoya el post. Sin recreaciones nuevas |
| II, 10 | before/question | `DQ.MED.900019` Dulcinea/campesinas + `DQ.MED.900243` labradoras (perspectiva real) + `DQ.MED.900145` perspectiva de Sancho | **IMAGEN_ADECUADA** — los dos puntos de vista (real vs. impuesto por Sancho) ya existen como planos distintos: es exactamente la dirección que el mecanismo cómico exige (el engaño construido en dos niveles). Q.319–Q.324 cubiertas |

## 5. Ajustes sin recreación (veredicto PARCIALMENTE_ADECUADA → resolución documentada)

1. **Q.112 (hotspot) — I, 8.** El enunciado pide señalar sobre «la acuarela de la embestida» la zona donde el aspa arrastra a caballo y caballero, pero la imagen asignada es `p1_c08_molinos_pre` (fase before, **no muestra la embestida por diseño anti-spoiler**). La asignación actual es inconsistente con el enunciado. **Decisión R06/R05:** asignar como `question_focus` de Q.112 la **acuarela Tusell 027** (la embestida, composición de Doré) en fase `reveal`, con atribución completa, tras verificar visualmente que la zona del aspa es localizable a 849×688 px y registrar las coordenadas del hotspot sobre ESA imagen. Alternativa si la resolución no soporta el hotspot: usar `DQ.MED.900006` (post) y reformular el enunciado en revisión R01. En ningún caso se encarga una recreación nueva para esta pregunta.
2. **`DQ.MED.900006` reutilizado entre beats B06/B07** de I, 8 — reutilización dentro de escena documentada, sin duplicar archivo (caso de prueba 2 de DC-IMG-001 §9).
3. **Acuarela 056 — I, 18:** se acepta como puente de apertura con la función y rotulación descritas en §4.4.

## 6. Briefs de recreación — encargos al diseñador

Los cuatro huecos reales detectados en el piloto. Cada brief contiene los **diez campos obligatorios**; el diseñador no debe suponer nada que no esté escrito aquí. Todos parten del **prompt base común** de `assets/scenes/PROMPTS_REGENERACION.md` (fotograma 16:9 1672×941, realismo cinematográfico con matiz pictórico, paleta ocre/terracota/oliva/ámbar, continuidad con `personajes_referencia.webp`, sujeto en tercio izquierdo y **franja derecha reservada para el texto de TS-001**, sin letras/UI/marcas de agua, sin anacronismos). Lo que sigue es la variación narrativa específica de cada encargo.

### BRIEF-H4-01 — `p1_c08_carga_molinos` (I, 8, beat B05, fase `pre` de acción dentro de la escena)

| Campo | Contenido |
|---|---|
| **Fragmento del guion** | B05 (NARRACION + DIALOGO): «Y, diciendo esto, dio de espuelas a su caballo Rocinante, sin atender a las voces que su escudero Sancho le daba, advirtiéndole que, sin duda alguna, eran molinos de viento…» + «— Non fuyades, cobardes y viles criaturas, que un solo caballero es el que os acomete.» (PG 2000, líneas 2584–2592) |
| **Instante exacto** | El arranque de la carga: Rocinante ya galopa, DQ lancea en ristre hacia el primer molino; Sancho, en el rucio en primer término, grita con el brazo alzado en gesto de advertencia inútil. El molino **aún no ha tocado a nadie** (la caída pertenece a B06 y a la imagen `900006`) |
| **Por qué es cómico** | Mecanismo: sordera selectiva + arenga épica («Non fuyades», latinazo caballeresco) dirigida a **aspas de molino**. La imagen debe dejar leer la contradicción: furia militar formal contra maquinaria agrícola indiferente. El molino no reacciona — esa indiferencia es la mitad del chiste |
| **Personajes y emoción** | DQ: furia belicosa, cuerpo cargado hacia delante, rodela y lanza en ristre. Sancho: impotencia alarmada (boca abierta, brazo extendido). Rocinante: esfuerzo desproporcionado (es parte del humor físico). Molino: volumen estático, sereno, con las aspas girando lentas |
| **Plano y perspectiva** | Plano general medio con diagonal de la carga (de izquierda a derecha, hacia el fondo); Sancho en primer término tercio izquierdo; molino protagonista en tercio derecho **pero alto**: el punto de impacto futuro queda en el tercio superior derecho |
| **Espacio de reserva de texto (TS-001)** | Franja derecha inferior (aprox. 35 % del ancho, tercio inferior) libre de personajes y con fondo de llanura/suelo continuo: ahí se coloca el texto del arenga y de la narración. Los rostros y la lanza quedan en el tercio izquierdo y superior |
| **Luz y atmósfera** | Media mañana, luz rasante seca, polvo bajo los cascos del rebaño NO (aquí: polvo del galope); viento sugerido por las aspas y la ropa, no por árboles doblados |
| **Restricciones / negative prompts** | Sin caída, sin lanza rota, sin heridas, sin caricatura, sin expresión de malvado en el molino (no antropomorfizar), sin gigantes visibles, sin brazos humanos en las aspas, sin texto |
| **Fase / spoiler** | Dentro de escena, beat B05; aparece en el momento de la acción, nunca como `before` del episodio (spoiler del desenlace). `spoiler_level: medio` en metadatos de escena interna; prohibido su uso como pre-pregunta de Q.101–Q.105 |
| **Estado / licencia** | Recreación IA propia → `DQ.LIC.0002`, rotulación `RECREACION_ARTISTICA`; revisión visual pendiente (arte/QA) antes de `aprobada` |

### BRIEF-H4-02 — `p1_c08_reganina_freston` (I, 8, beat B08, fase `after`)

| Campo | Contenido |
|---|---|
| **Fragmento del guion** | B08: «— ¡Válame Dios! —dijo Sancho—. ¿No le dije yo a vuestra merced que mirase bien lo que hacía, que no eran sino molinos de viento, y no lo podía ignorar sino quien llevase otros tales en la cabeza?» + «— Calla, amigo Sancho —respondió don Quijote— … aquel sabio Frestón … ha vuelto estos gigantes en molinos por quitarme la gloria de su vencimiento…» + «— Dios lo haga como puede —respondió Sancho Panza.» (PG 2000, líneas 2610–2621) |
| **Instante exacto** | Tras el socorro: DQ sentado o medio incorporado en el suelo, maltrecho, lanza en pedazos a su lado, Rocinante tumbado «medio despaldado»; Sancho **de pie** junto a él, regañando con el dedo índice alzado; DQ mira hacia el horizonte de los molinos, sereno, ya absuelto por Frestón |
| **Por qué es cómico** | **Núcleo de la escena** (lo declara la ficha): la factura doméstica de Sancho contra la inmunidad psicológica del delirio. La imagen debe contener la asimetría: Sancho apela al sentido común (gesto de dedo, cuerpo inclinado), DQ habita su propia cosmología (mirada alta, dignidad intacta, cuerpo vencido). La ternura final («Dios lo haga como puede») pide cariño en la composición: no burla cruel |
| **Personajes y emoción** | Sancho: regañina triunfal desinflándose en resignación cariñosa. DQ: identidad blindada; maltrecho físicamente, intacto mentalmente. Rocinante: extenuado, cómico sin crueldad |
| **Plano y perspectiva** | Plano medio de dos figuras, cámara a la altura de DQ sentado (el espectador comparte el nivel del vencido, no el del regañón); molinos al fondo desenfocados en profundidad |
| **Espacio de reserva de texto (TS-001)** | Las tres intervenciones son largas: franja derecha completa (≈40 %) con fondo de campo continuo; **los dos rostros y el gesto del dedo** en tercio izquierdo, jamás bajo el panel de texto |
| **Luz y atmósfera** | Media tarde suave; aire de respiro tras la acción; polvo asentado |
| **Restricciones / negative prompts** | Sin heridas gráficas ni sangre; sin risa burlona de Sancho (regaña con afecto); sin gestos de «victoria» del molino; lanza rota sí (es texto canónico); sin caricatura |
| **Fase / spoiler** | `after`/reveal del episodio — `spoiler_level: alto`, solo tras la revelación de la caída. Compatible con Q.105 y Q.109 como imagen posterior |
| **Estado / licencia** | Recreación IA propia → `DQ.LIC.0002`; rotulación obligatoria; revisión visual pendiente |

### BRIEF-H4-03 — `p1_c06_hoguera_corral_post` (I, 6, fase `after`)

| Campo | Contenido |
|---|---|
| **Fragmento del guion** | Episodio I,6 (unidades del escrutinio; cierre): el ama, la sobrina y el ventero secundan al cura y al barbero; los libros condenados se llevan al corral y arden. DQ sigue durmiendo y no asiste al funeral de su biblioteca |
| **Instante exacto** | La hoguera ya encendida en el corral: pila de libros ardiendo; el cura y el barbero junto al fuego (uno de ellos aún hojea/consulta un volumen antes de lanzarlo); ama y sobrina detrás con gesto de justicia doméstica; el ventero observando; **ventana de la habitación de DQ al fondo, cerrada y a oscuras** (duerme: es la clave del humor) |
| **Por qué es cómico** | Mecanismo: una «inquisición bibliográfica» celebrada con seriedad eclesiástica (el cura absuelve y condena libros con solemnidad) ejecutada como quemadero de corral por la casa entera. El contraste solemnidad/escenario doméstico + el dueño dormido mientras arde «su ejército». La imagen no debe subrayar el chiste con gestos teatrales: la seriedad de los ejecutores ES el chiste |
| **Personajes y emoción** | Cura: celo escrutador, gesto de juicio. Barbero: complice práctico. Ama y sobrina: satisfacción moral. Ventero: curiosidad. DQ: ausente (solo su ventana oscura) |
| **Plano y perspectiva** | Plano general del corral nocturno; fuego como fuente cálida localizada (paleta ámbar contra noche índigo, según biblia); figuras en semicírculo alrededor del fuego |
| **Espacio de reserva de texto (TS-001)** | Franja derecha o superior derecha con cielo/rincón de corral en sombra continua, lejos del resplandor del fuego (el fuego NO debe ocupar la zona de texto: el parpadeo arruinaría el contraste — §9.3 de dirección artística) |
| **Luz y atmósfera** | Noche; única fuente el fuego + una luz pequeña de linterna/antorcha de los ejecutores; sin luna teatral |
| **Restricciones / negative prompts** | Sin DQ visible en persona (solo la ventana); sin demonios, fantasmas ni alegorías de Inquisición; títulos de libros ilegibles; sin exageración de llamas; sin texto |
| **Fase / spoiler** | `after` del episodio — `spoiler_level: alto` (solo tras revelación); nunca `before` |
| **Estado / licencia** | Recreación IA propia → `DQ.LIC.0002`; rotulación obligatoria; revisión visual pendiente. Registro: hueco declarado ya en catálogo FASE 0.5 y en PROMPTS_REGENERACION (4.ª batería), sin producción a fecha de hoy (verificado en manifiesto v14) |

### BRIEF-H4-04 — `p2_c01_loco_sevillano_reveal` (II, 1, fase `reveal`)

| Campo | Contenido |
|---|---|
| **Fragmento del guion** | Episodio II,1: el barbero relata la anécdota del hombre de la casa de los locos de Sevilla («En la casa de los locos de Sevilla estaba un hombre…») que, por consejo del abad, fingía estar cuerdo delante de sus parientes para no volver con ellos, y al final confiesa que «no estaba loco sino cuando estaba loco» (pasaje presente y verificado en II,1; ver corrección de la discrepancia del «loco de Sevilla» en catálogo FASE 0.5) |
| **Instante exacto** | La anécdota **narrada, no presenciada**: patio de la casa de locos de Sevilla; el hombre sentado o apoyado en su caña (el detalle canónico de la caña a modo de lanza), rodeado de locos ajenos a él, mientras un religioso (el abad) lo observa desde un pasaje. Composición de «relato dentro del relato» |
| **Por qué es cómico** | Mecanismo: ironía especular — el único cuerdo de la casa finge la locura que se le atribuye, y su cordura se juzga locura. El espejo es transparente hacia DQ (un hombre cuerdo que finge ser lo que dicen de él), pero **la imagen no debe subrayar el paralelo**: sin doble de DQ, sin máscaras, sin DQ entre los locos. El texto hace la interpretación; la imagen aporta la escena del relato con sobriedad |
| **Personajes y emoción** | El loco «cuerdo»: calma pícara, mirada lucida. Locos de ambiente: indiferencia, gestos propios, sin grotesquería (respeto por la representación de la locura — dignidad editorial). Abad: observación serena |
| **Plano y perspectiva** | Plano general medio del patio; el protagonista en tercio izquierdo con la caña; profundidad con arcos/pasillo del abad |
| **Espacio de reserva de texto (TS-001)** | El relato es extenso: franja derecha amplia (≈40 %) con pared/patio en sombra continua y sin figuras relevantes |
| **Luz y atmósfera** | Día difuso en patio andaluz; paleta tierra con acentos de lino crudo |
| **Restricciones / negative prompts** | **No** mostrar a DQ, Sancho, el cura ni el barbero en la imagen (relato interpolado — regla de DIRECCION_ARTISTICA_PILOTO §Cámara); sin caricatura de la locura, sin jaulas de hierro, sin cuerdas; caña sí; sin texto |
| **Fase / spoiler** | `reveal` del episodio — `spoiler_level: medio`; es imagen de la anécdota, posterior a la pregunta de la conversación |
| **Estado / licencia** | Recreación IA propia → `DQ.LIC.0002`; rotulación obligatoria; además de la revisión visual, revisión editorial (R01) de que la imagen no recoloca la anécdota como hecho de la aventura |

## 7. Veredicto R13 — licencias y bloqueos por familia

| Familia | Archivos | Licencia | Estado R13 | Bloqueos |
|---|---|---|---|---|
| Escenas IA (recreaciones) | 253 WebP (`assets/scenes/`) + 10 closeups (`assets/closeups/`) | `DQ.LIC.0002` — derechos propios del proyecto, recreación IA, rotulación obligatoria | **Verificada para uso interno y almacenamiento en repo privado** (uso personal app + Git autorizado) | Redistribución `condicionada`: prohibida en repositorio público, tienda o instalador distribuible sin decisión expresa; nunca presentarlas como documento histórico |
| Acuarelas Tusell | 376 jpg + 39 piezas de edición (`assets/ilustraciones_tusell/`) | `DQ.LIC.0001` — DP presunto (ed. Luis Tasso, 1905; EE. UU. DP por regla <1930; España sujeto a fecha de muerte de Tusell, no establecida) | **APTA para uso interno con atribución obligatoria completa**; alternativa oficial CC BY (BVPB, registro 463832) disponible si se necesita autoridad máxima | **PEND-09** bloquea redistribución pública hasta cerrar fechas vitales de Tusell; atribución: «Acuarela de Salvador Tusell sobre composición de Gustave Doré (Barcelona: Luis Tasso, 1905). Digitalización: Epublibre/Titivillus» |
| Texto (PG 2000 / EPUB Tusell) | `content/textos/gutenberg_2000/El_Quijote.txt` | Cervantes: DP universal; PG: condiciones de Project Gutenberg | Sin bloqueo para uso interno | Mantener la atribución de fuente en ficha/lector |
| Audio | `assets/audio/` (vacío, `.gitkeep`) | — | **Sin material**: la escena es íntegra y comprensible sin audio (TS-001). Cualquier voz futura requerirá licencia propia y cue sheet R07 | Ninguna imagen o audio pendiente bloquea hoy un paquete |
| Fotos actuales / arte histórico | `assets/photographs/`, `assets/historical_art/` (vacíos o sin material editorial) | — | Sin recursos en uso; si se incorporan, inventariar con clase y licencia propia antes de cualquier asignación | — |

**Conclusión R13:** los cuatro encargos del §6 usan recreación IA propia (familia con licencia más limpia del proyecto). **Ningún hueco del piloto exige consumir material de la familia Tusell en condiciones nuevas**; el uso de acuarelas en `question_focus` (§5.1) es uso interno ya autorizado con atribución. No hay imagen marcada APTA con licencia desconocida.

## 8. Hallazgos y registros pendientes (para R05/R09/R14)

1. **Familia de IDs divergente:** el manifiesto de escenas usa `candidate_media_id: DQ.MED.*` (p. ej. `DQ.MED.900231`) mientras el catálogo y la ficha I,8 usan `DQ.MA.*` (`DQ.MA.900030`). DC-IMG-001 §2 establece `DQ.MA.######` como canónico y exige tabla de correspondencia. **Se registra la divergencia; no se resuelve en este dossier** (requiere migración conjunta R05/R09).
2. **Inconsistencia puntual en la ficha I,8:** la ficha cita `DQ.MA.900030` para `p1_c08_molinos_siluetas_pre`; el manifiesto v14 asigna a ese archivo `DQ.MED.900231`. Resolver en la migración; este dossier referencia siempre el archivo físico, no el ID.
3. **Q.112 con imagen inconsistente con su enunciado** (hotspot sobre imagen `before` que no contiene el hecho preguntado): decisión documentada en §5.1.
4. **Verificación visual incompleta:** de 253 escenas, solo 2 tienen verificación visual registrada (`personajes_referencia`, `p1_c08_molinos_pre` — ambas PASS, método Pillow reproducible). Ninguna imagen puede subir a `review_state: aprobada` sin esa verificación por lotes.
5. **Closeups:** 10 planos expresivos de DQ con `catalog_status: editorial_review_pending`. R06 los reserva para interjección/reacción en Modo Historia; **hueco de continuidad: no existen closeups de Sancho** — registrar como necesidad futura solo si el guion de alguna escena los demanda (no se encargan ahora: no hay demanda documentada).
6. **Métricas honestas:** el piloto editorial produce en este dossier **31 decisiones documentadas** (tablas de §4): **21 IMAGEN_ADECUADA**, **1 IMAGEN_PARCIALMENTE_ADECUADA** (resuelta con el ajuste de §5.1, sin recreación), **5 NARRACION_ILUSTRADA_SUFICIENTE** y **4 NUEVA_RECREACION_NECESARIA** (los briefs del §6). Es decir: **27 de 31 decisiones se resuelven sin producir una sola imagen nueva**. Fuera del piloto no se audita aquí: sin guion, no hay demanda — el banco existente (23 recreaciones de capítulos no piloto, acuarelas) queda en inventario a la espera de H2/H3.

## 9. Límites y estado de aprobación

- Este dossier es **documentación**. No genera imágenes, no modifica esquemas, no asigna `media_ids` en catálogo y no autoriza la producción de los cuatro briefs (requiere revisión R01 de los mecanismos cómicos, veredicto R14 y, para producción, la autorización de fase que corresponda).
- Las decisiones de fase y spoiler here propuestas no sobrescriben enumeraciones del contrato; cuando se aprueben, se materializarán vía `MediaBinding`/campos existentes tras la doble revisión editorial-técnica (DC-IMG-001 §4).
- La granularidad beat a beat solo es exigible donde existe ficha H3 (I, 8). Al producirse nuevas fichas, este dossier se ampliará con el mismo método, sin rehacer lo auditado.
- Ninguna revisión humana externa está certificada por este documento.
