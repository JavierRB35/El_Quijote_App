# R12 — INFORME QA DEL PATRIMONIO VISUAL

**Revisión v0.2 — ampliación del piloto · 2026-11-06**  
**Modo:** CALIDAD / AUDITORÍA VISUAL; **P1**.  
**Base de revisión:** `main@66d2f7d3a5c6a28b18fdc7cce5148375d277e21f`; primera auditoría en `2e23b1cd27c764d946610716a4566a46ceda27cf`.  
**Responsable:** R12 (asistente; inspección asistida por visualización efectiva de archivos obtenidos de GitHub). Dirección Artística R06 y Coordinación **pendientes de revisión cruzada**; no se atribuyen aprobaciones ajenas.  
**Estado:** **AUDITORÍA DOCUMENTAL + INSPECCIÓN VISUAL PARCIAL; QA GLOBAL TODAVÍA PENDIENTE.** Esta versión integra el dictamen de Coordinación y reemplaza los recuentos del informe inicial.

## 1. Resultados consolidados

| Familia | Inventario total | Inspecciones directas acumuladas | Pendientes de apertura visual |
|---|---:|---:|---:|
| Escenas cinematográficas (incluida referencia de personajes) | 253 | **22** | 231 |
| Primeros planos | 10 | **10** | 0 |
| Acuarelas Tusell | 376 | **20** | 356 |
| Decorativos | 39 | **1** | 38 |
| **Total** | **678** | **53** | **625** |

**Resultado actualizado en `docs/data/registro_revision_visual.csv`: 18 PASS / 2 FAIL / 658 PENDIENTE / 0 NO APLICA.** Hay **53 registros con `inspeccion_visual_efectiva=SI`**, de los cuales **33** conservan PENDIENTE tras observación por faltas de cotejo de secuencia o prueba TS-001. Las **625** imágenes restantes no se han visualizado individualmente, y no se han promovido a PASS.

**Evolución frente a la auditoría parcial aceptada:** inicio 27 inspecciones (6 PASS / 1 FAIL / 671 PENDIENTE); ahora **26 nuevas aperturas directas**, total 53. Las clasificaciones históricas se revisan con evidencia nueva: `027.jpg` pasa a PASS para el episodio de los frailes; `025.jpg` pasa a PENDIENTE para la recreación literal de la hoguera nocturna; se detectan 2 FAIL contextuales nuevos (`p1_c06_ama_sobrina_libros_pre.webp` y `021.jpg` para un uso literal concreto). Por tanto los 2 FAIL actuales **no prueban dos archivos corruptos**, sino errores de narrativa/asignación corregibles.

## 2. Cobertura prioritaria del piloto: 37 imágenes abiertas

Se revisaron **todas las 16 escenas cuya parte y capítulo son uno de los seis capítulos piloto**: I,6; I,8; I,11; I,18; II,1; II,74. Se observaron también **17 acuarelas vinculadas a esos capítulos o seleccionadas en H4**, y **4 alternativas de otros capítulos**. El subconjunto directo consta de **37 archivos distintos**, todos con observación individual en el CSV (11 de ellos ya estaban incluidos en inspecciones anteriores; 26 se incorporan ahora). La vinculación se basó en `docs/DOSSIER_ARTISTICO_H4.md`, `assets/scenes/manifest.json`, `assets/ilustraciones_tusell/manifests/manifest_ilustraciones.json` y las rutas del catálogo.

### I,6 — Escrutinio de libros

- `DQ.MED.900013` (`p1_c06_escrutinio_pre.webp`) y `DQ.MED.900230` (`p1_c06_cura_barbero_libros_pre.webp`) permiten retratar el examen de libros sin Don Quijote ni Sancho presentes. Mantener como planos de diálogo, con panel TS-001 separado cuando aparezcan caras u objetos por ambos lados. Ambos siguen PENDIENTE de composición real.
- **FAIL narrativo `DQ.MED.900157` / `p1_c06_ama_sobrina_libros_pre.webp`**: se ve al hidalgo armado con Sancho y los animales observando el escrutinio fuera de la casa. **Es una anticipación de la incorporación de Sancho, que no participa hasta I,7, y contradice al Quijote en cama durante el escrutinio.** Acción propuesta: retirar el plano completo de I,6; ensayar únicamente un **recorte izquierdo x≈0.00–0.49** sobre cura/barbero y ama/sobrina, evaluando si da lugar a un plano vertical útil; sin modificar el original.
- `020.jpg` es una acuarela de Quijote recuperándose en cama: utilizable para convalecencia, no representación del escrutinio.
- **FAIL de asignación literal `021.jpg`**: se observa una **alegoría de expurgo** (figura gigante barriendo pequeñas representaciones caballerescas), **no** al cura/barbero verificando libros. En H4 figura como imagen de revelación que documenta el gesto del escrutinio: cambiar su función a **alegoría/discusión literaria rotulada**, nunca recreación literal.
- `025.jpg` (registrada desde el primer informe) sí muestra una mujer arrojando libros al fuego, **pero en un interior**, y H4 actual sitúa la quema *de noche en el corral* y solo a cargo del ama. **No puede aprobarse como representación literal equivalente**; es apoyo artístico postepisodio opcional. Conservar PENDIENTE respecto de la necesidad específica y probar primero narración ilustrada con texto TS-001.

### I,8 — Molinos, frailes y vizcaíno

- `900231` (molinos a distancia) → `900005` (señalamiento de DQ y advertencia de Sancho) → `900006` (consecuencia de la caída y socorro) es una secuencia visual reutilizable ya inspeccionada, **siempre que el último plano sea posterior**.
- `900159`: frailes a caballo y coche con dama visible; posible **revelación anticipada** en preguntas cuyo enunciado pida identificar quién se aproxima. No clasificar automáticamente como fallo: verificar pregunta/fase exactas. `900133`: DQ y vizcaíno discuten ante coche; útil como plano preconflicto, pero no anticipar combate.
- Acuarelas: `026.jpg` muestra el aspa arrastrando a caballo y caballero; `028.jpg` muestra las consecuencias en tierra; `029.jpg`, el socorro; `027.jpg` representa **los frailes**, no el molino. **Los cuatro archivos se conservan** en sus eventos y tiempos adecuados.
- **Q.112 verificada en catálogo actual**: `content/piloto/questions/DQ.Q.000112.json` ya referencia `hotspot_media_id: DQ.MA.000026` y `pre_image_media_id: DQ.MA.900005`; además exige `safe_after_episodes: [DQ.P1.C08.E01]`. Por tanto **no sigue pendiente corregir 027→026 en la asignación actual**. Queda pendiente validar las coordenadas `hotspot_area={x:0.30,y:0.22,w:0.45,h:0.50}` sobre la imagen **real 833×1041 px** (H4 menciona un tamaño distinto) y comprobar si el área cubre demasiado caballo/aire frente al aspa solicitada. No tocar la pregunta ni mover la fase unilateralmente.
- Alternativa intercapítulos: `030.jpg` representa el **duelo vizcaíno**, transicionado de I,8 a I,9. Su uso es *after/reveal* de I,9, nunca plano pre I,8. `p1_c10_dialogo_victoria_pre.webp` se observó como conversación posterior con DQ magullado y molinos al fondo, pero **no se ha aprobado como reemplazo B08** por cronología/lesiones aún por cotejar.

### I,11 — Cabreros y Edad de Oro

- `900007`: cena nocturna en plano de grupo con hoguera, Sancho y cabreros; `900134`: DQ de pie pronunciando discurso. Ambos mantienen identidad y atmósfera; ofrecen **cielo alto a la derecha como zona candidata de texto**, no aprobación TS-001.
- `034.jpg`: cena ante hoguera; `035.jpg`: discurso a los cabreros; `036.jpg`: **curación de oreja** por un cabrero (así la describe también el manifiesto), no una reacción genérica al final del discurso. Las tres abiertas y aptas **en esas funciones precisas**, con fase contextual.

### I,18 — Los rebaños

- `900008`: DQ señala ovejas reales antes de la carga, con Sancho desconcertado; puede sostener el humor de confundirlas con ejércitos. Su riesgo `medium` debe cotejarse con pregunta, no se presume spoiler. `900136` muestra DQ doliente atendido por Sancho tras la batalla; **no muestra la pedrada en vuelo ni examen bucal**, así que no utilizarlo como prueba visual de estos detalles.
- `056.jpg`: puente desde la salida de la venta; `057.jpg`: ataque a ovejas; `058.jpg`: examen de la boca. Las tres abiertas y útiles en fases **puente / reveal / after**, evitando anticipar las respuestas en fase previa.

### II,1 — La visita y el cuento sevillano

- `900029` muestra Quijote recuperado conversando con sacerdote y barbero; `900179` aporta otro ángulo con DQ gesticulando y libros. Comparten casa/protagonistas; la continuidad de rostros se debe cotejar en secuencia.
- `170.jpg` ilustra la visita en convalecencia y puede acompañar lectura posterior.
- `171.jpg` representa **un bufón-juguete saliendo de una caja**, una **metáfora gráfica** del loco sevillano, **no** el licenciado, el rector ni la discusión Júpiter/Neptuno. Puede conservarse en descubrimiento simbólico, pero **no cierra una necesidad de dramatización literal del relato insertado**. No representar a Don Quijote como testigo de ese cuento.

### II,74 — Testamento y muerte

- `900011` presenta a Alonso en cama y Sancho agarrando su mano; `900202` incorpora escribiente/testigos y libro de testamento. Ambos ocupan áreas críticas en mitad derecha o a lo largo del cuadro: un overlay `right` taparía rostros o scribe; usar **banda de texto externa**.
- `371.jpg` muestra a DQ en cama con crucifijo; `372.jpg` muerte/despedida con asistentes; `373.jpg` **alegoría literaria** del fin de los libros de caballerías. Todos válidos en función **posterior**, distinguiendo evento literal de epílogo simbólico. **Riesgo de spoiler máximo** si aparecen antes del capítulo final.

### Alternativa adicional I,7

- `p1_c07_sancho_promesa_pre.webp` muestra a DQ y Sancho hablando tras incorporarse el escudero. Sirve de contraste cronológico: confirma por secuencia que **no debe colocarse a Sancho como observador del escrutinio I,6**. Mantener en I,7, no desplazar a I,6.

## 3. Inventario e integridad técnica (sin falsas certificaciones)

El inventario **permanece en 678 imágenes**: 253 escenas (208 `pre`, 44 `post`, 1 referencia), 10 closeups, 376 acuarelas, 39 decorativas. Las 253 escenas tienen dimensiones manifestadas **1672×941 WebP**, los 10 closeups **1254×1254 WebP**. Hay al menos una escena de cada uno de los **126 capítulos**.

El cotejo original del árbol Git con manifiestos reveló **0 rutas ausentes, 0 diferencias de tamaño declarado y 0 grupos con blobs SHA Git idénticos**. No se ha recalculado independientemente el SHA-256 sobre el contenido bruto de las 678 imágenes ni calculado `pHash`, **no se certifica ausencia de corrupción en 625 binarios no abiertos**. En las 53 aperturas visuales sí se demostró decodificación y observación del archivo mostrado; no se declara inspección a escala 100% de todos los píxeles ni ausencia de defectos imperceptibles a la vista mostrada. Entre acuarelas, 145 tienen alto inferior a 600px, 11 ancho inferior a 600px y 2 ambas condiciones: comprobar el uso a escala real en lugar de rechazar automáticamente por tamaño.

## 4. Continuidad y criterios R06 / TS-001

Los diez closeups se examinaron en la primera auditoría: mantienen identidad expresiva de Don Quijote, pero su **render ilustrativo** contrasta con el acabado naturalista de los fondos. Conservar los diez, proponer uso como **tarjetas de reacción** y esperar **dictamen de R06** antes de aprobar integraciones; no crear variantes nuevas.

En las escenas abiertas se conserva en general DQ enjuto, Sancho robusto, Rocinante caballo pardo claro y rucio gris, con excepción de **errores de presencia cronológica**, como el FAIL I,6, que no se resuelven con solo apariencia reconocible.

**TS-001:** ningún lado es seguro por defecto. En algunas exteriores de cabreros hay cielo alto que puede servir para intervenciones cortas, pero sin prueba con texto real, ampliación, 1080p y 4K, **0 escenas aprobadas para la UI final**. En interiores y escenas corales (I,6, II,1, II,74), usar banda/panel exterior y dejar libre la acción; los subtítulos obligatorios no pueden tapar caras ni objetos de pregunta. Pendiente una verificación R06 + R08/UX + R12 con guion de diálogos extensos, audio silenciado y tamaño ampliado.

## 5. Spoilers por pregunta y fase — sin automatismos erróneos

Los **208 `pre`** clasifican riesgo textual `low` (172) o `medium` (36) en el manifiesto. **Esto no constituye 208 errores visuales** ni justifica cambiarlos a FAIL. En piloto se han señalado:
- I,8 molinos: ver molino puede ser contexto legítimo; **la imagen de caída** no debe aparecer hasta después de la pregunta. Q.112 actual tiene `safe_after_episodes` y asset focal 026, pendiente evaluar geometría.
- I,8 frailes: mostrar a los frailes y al coche puede revelar respuesta si la pregunta pide identificar visitantes.
- I,18: ovejas en pre revelan la realidad observable, no la carga; 057–058 se restringen a después de resolver la incertidumbre.
- II,1: el cuento sevillano no es vivido por los protagonistas; 171 solo como metáfora explícita.
- II,74: no mostrar el lecho final, testamento ni despedida antes del desenlace.
Los dictámenes individuales siguen `PENDIENTE` cuando falta vinculación con las preguntas exactas o el momento de reproducción.

## 6. Defectos, prioridad y corrección concreta

| Código | Prioridad | Evidencia | Propuesta sin nuevos activos |
|---|---|---|---|
| **R12-PIL-01** | **P0** | `900157`: DQ y Sancho aparecen presenciando escrutinio I,6 | Prohibir plano entero; considerar recorte solo ama/sobrina+escrutadores; si falla, usar `900013`/`900230` |
| **R12-PIL-02** | **P1** | `021.jpg`: alegoría de expurgo, no escrutinio literal | Reasignar a descubrimiento alegórico, sin tratarla como imagen documental del hecho |
| **R12-PIL-03** | **P1** | `025.jpg`: quema en interior, no noche en corral | No sustituir escena específica; conservar imagen ilustrativa y narración, y probar si basta |
| **R12-PIL-04** | **P1** | Q.112 YA usa 026; hotspot actual amplio y dossier cita tamaño distinto | Validar región sobre 833×1041 y fase segura, sin cambiar pregunta sin R01 |
| **R12-PIL-05** | **P1** | `171.jpg`: bufón de caja, metáfora del loco | Discovery simbólico; no usar como prueba literal del relato ni hacer testigo a DQ |
| **R12-PIL-06** | **P1** | `900136`: aftermath, no pedrada ni examen bucal | Reutilizar 058 para examen y mantener 900136 para dolor/reposo |
| **R12-PIL-07** | **P1** | `right` ocultaría datos en `900011`, `900202`, `900029`, `900179`, `900013` | Reserva externalizada de TS-001 y máscaras de zonas críticas por escena |
| **R12-PIL-08** | **P1** | `034`/ `035`/ `036` tienen acciones distintas | 034 cena, 035 discurso, 036 atención de oreja; no intercambiarlas indiscriminadamente |
| **R12-PIL-09** | **P2** | 50 descripciones de escenas genéricas; 5 decorativos sin alt | Completar alt al abrir cada archivo; registrar si son decorativas |
| **R12-PIL-10** | **P2** | 625 imágenes no abiertas, falta recomputación SHA-256 y duplicación perceptual | Continuar revisiones por lote con evidencia binaria, CSV y contraste R06 |

## 7. Procedimiento de verificación reproducible y cierre

La fila de cada imagen en `docs/data/registro_revision_visual.csv` contiene: ID, ruta, capítulo, acontecimiento, fase, dimensiones, formato, tamaño de árbol Git, blob SHA Git, SHA-256 **declarado y NO recalculado**, si el binario fue efectivamente abierto, justificación individual, calidad técnica, continuidad, fidelidad, compatibilidad TS-001, spoilers, reutilización, estado y corrección. Se mantiene cada recurso físico una sola vez.

**La condición para PASS no es tener metadatos correctos:** requiere imagen decodificada y revisada, y uso narrativo explícito, mientras que cualquier validación no realizada queda pendiente. Continuar con los **625** visuales no abiertos; luego cotejo de secuencias completas, zoom, color, anatomía/animales, pHash, SHA-256, preguntas y composición con texto real. Ningún activo original ni esquema se ha modificado.

**Conclusión:** el piloto de seis capítulos ya dispone de un inventario de imágenes **inspeccionadas visualmente con alternativas concretas**, pero **no está validada la integración de esas imágenes con todos los guiones, preguntas y estados TS-001**. Dictamen de R06 y pruebas finales siguen pendientes; este informe **no es el cierre global de los 678 recursos**.
