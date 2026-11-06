# R06 — REVISIÓN ARTÍSTICA Y LITERARIA DE LOS BRIEFS H4

**Versión:** 0.1, dictamen propuesto · **Fecha:** 2026-11-06 · **Modo:** DIRECCIÓN ARTÍSTICA · **Prioridad:** P0  
**Objeto:** revisión de docs/DOSSIER_ARTISTICO_H4.md sin alterar el original; instrumento de corrección para R01/R05/R06/R08/R09/R12/R13/R14.  
**Estado:** PENDIENTE_REVISION_COORDINACION; **no** aprobación de nuevos assets, no orden de regeneración, no cambio automático de media bindings.

## 1. Evidencia utilizada y límites

Se han consultado en el repositorio privado: docs/FICHA_ESCENA_P1_C08_MOLINOS.md v1.1; docs/DOSSIER_ARTISTICO_H4.md v0.1; docs/DIRECCION_ARTISTICA.md §9; docs/DIRECCION_ARTISTICA_PILOTO.md; docs/DC_IMG_001_ASIGNACION_INTEGRAL_ASSETS.md; docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md; docs/REVISION_EDITORIAL_ESCENAS.md; assets/scenes/PROMPTS_REGENERACION.md; assets/scenes/manifest.json (v14, 253 entradas); assets/closeups/manifest.json (10 entradas); docs/ENCARGO_MAESTRO.md y docs/GOBERNANZA_GIT.md. Se contrastaron dos episodios literarios contra el texto en línea, además de la referencia PG 2000 documentada en el proyecto:

- **I,6 / I,7:** Biblioteca Virtual Miguel de Cervantes, edición web de *El ingenioso hidalgo don Quijote de la Mancha*, capítulos VI–VII: https://www.cervantesvirtual.com/obra-visor/el-ingenioso-hidalgo-don-quijote-de-la-mancha--10/html/fefcf8b4-82b1-11df-acc7-002185ce6064_28.html. El capítulo VII contiene «Aquella noche quemó y abrasó el ama cuantos libros había en el corral y en toda la casa» (localizar en capítulo VII, no VI).
- **II,1:** Centro de Estudios Cervantinos/Texas A&M, *Don Quijote 1615*, capítulos I–X (transcripción, cotejar edición definitiva): https://cervantes.library.tamu.edu/V2/CPI/textos/fsevilla/Quijote1615_cap1cap10.htm. El relato comienza «En la casa de los locos de Sevilla estaba un hombre...» e introduce a licenciado, arzobispo/capellán, otro interno que dice ser Júpiter y respuesta de Neptuno. La interpretación académica del diálogo puede cotejarse además en https://www.scielo.org.mx/pdf/ap/v37n1/0185-3082-ap-37-01-00013.pdf.
- **Desambiguación imprescindible:** el *Prólogo al lector* de la Segunda parte trae **otro** «loco de Sevilla», con un cañuto de caña y un perro, en contexto metaficcional sobre escribir libros: https://cervantesvirtual.com/obra-visor-din/segunda-parte-del-ingenioso-caballero-don-quijote-de-la-mancha--0/html/ff311ff4-82b1-11df-acc7-002185ce6064_98.html. No es la anécdota narrada por el barbero **dentro de II,1**.

La comprobación de GitHub realizada es **de archivos/manifiestos**, no una nueva inspección visual completa de los WebP ni una validación humana externa. Por eso los diagnósticos gráficos son recomendaciones condicionadas; no se emite un PASS de píxeles. Dossier H4 y revisión editorial previa solo documentan dos inspecciones visuales PASS (personajes_referencia y p1_c08_molinos_pre), pero el paquete sigue en estado borrador.

## 2. Registro de incidencias y decisiones propuestas

| ID / severidad | Hallazgo, evidencia y riesgo | Corrección / responsable / puerta |
|---|---|---|
| **R06-H4-01 · P0 · fidelidad I,6/I,7** | BRIEF-H4-03 sitúa **el fuego consumado** como desenlace de I,6, con cura, barbero, ama, sobrina y un **ventero** presentes. El escrutinio pertenece a I,6; la narración de la quema efectiva, realizada por el **ama**, aparece en **I,7** después del episodio del despertar de DQ. El ventero no forma parte de esa escena; el texto no obliga a mostrar cura/barbero/sobrina alrededor de la hoguera. | **RETIRAR COMO BRIEF EJECUTABLE DE I,6.** Mantener I,6 cubierto por 900013/157/230; si el arco de Modo Historia incluye la consecuencia nocturna, asociarla como transición **I,7** o puente autorizado I,6→I,7 y elaborar guion/pasaje/instante preciso. R01/R02/R14. |
| **R06-H4-02 · P0 · fidelidad II,1** | BRIEF-H4-04 inventa/traslada una **caña a modo de lanza**, un **abad** y la idea de alguien que «finge estar cuerdo para no volver». En la historia del barbero el protagonista es un **licenciado en cánones**, intenta probar que ha recobrado el juicio, recibe la visita de un **capellán enviado por el arzobispo**; otro interno proclama ser **Júpiter** y amenaza con impedir la lluvia; el licenciado replica que él es **Neptuno**, evidenciando su delirio. El rector/retor también aparece, no un abad como observador causal. | **INVALIDAR EL BRIEF ACTUAL.** Si se requiere vigneta tras guion R03, representar el *instante de la réplica Júpiter→Neptuno* o la entrevista previa, sin caña, abad ni DQ presente. R01/R02/R03/R06; revisión editorial independiente obligatoria. |
| **R06-H4-03 · P0 · IDs de molinos** | Ficha I,8 usa DQ.MA.900030 para p1_c08_molinos_siluetas_pre; manifiesto v14 tiene **DQ.MED.900231** para la ruta assets/scenes/part_1/chapter_08/p1_c08_molinos_siluetas_pre.webp. Los ID no son equivalentes demostrados. 900005 y 900006 también aparecen con familia DQ.MED.* en el manifiesto frente a DQ.MA.* en ficha. | No cambiar números ni reetiquetar por intuición. Mantener **ruta física+candidate_media_id** y crear en un PR de contrato separado matriz verificada (physical_path, sha256, candidate_id, canonical_id, alias_legacy, revisión). R05/R09/R11/R14. |
| **R06-H4-04 · P0 · estados de aprobación** | H4 §4 declara varias IMAGEN_ADECUADA/APTA sobre criterios de cobertura; sin embargo las **253** imágenes de assets/scenes/manifest.json tienen review_state=borrador, source_media_policy=IA y production_state=visual_pilot_not_editorially_approved; los **10** closeups también son borradores con catalog_status=editorial_review_pending. Hay **2 PASS de inspección anterior**, no 253 aprobaciones. | Separar **cobertura narrativa candidata**, **coherencia de metadatos**, **inspección visual documentada**, **legal/procedencia** y **aprobación editorial publicable**. Evitar la palabra APROBADA para cualquier asset no promovido mediante proceso verificable. R06/R05/R12/R13. |
| **R06-H4-05 · P0 · TS-001** | Las 253 entradas de escenas repiten preferred_overlay_side=right, pero no tienen por ello máscara de zona segura individual. El texto íntegro I02/I07/I11/I14 no cabe automáticamente en «35–40 % derecha» sin riesgo de tapar molino, gesto o lanza. | En storyboard asignar Z-R candidata, banda externa o vista dividida; R08/R09 validan regiones normalizadas tras inspección visual y layout real, incluida lectura grande, sin omitir textos. **No comprometer TS-001 con recortes.** |
| **R06-H4-06 · P1 · continuidad de luz** | Ficha I,8 sitúa secuencia en **media mañana**. BRIEF-H4-02 propone «media tarde suave» para B08, apenas instantes después de caer. B02, B05 y B08 no deben cambiar hora solar sin justificación diegética. | Mantener media mañana, mismo eje de sol, dirección de sombra, cromatismo y polvo asentándose; verificar foto por foto. R06/R04. |
| **R06-H4-07 · P1 · continuidad de personajes** | Fisionomía y vestuario base: referencia personas, DQ alto/enjuto (armadura antigua), Sancho bajo/robusto (lino/chaleco), Rocinante pardo claro, rucio gris. Los closeups son cuadrados genéricos de DQ con armadura y **sin episodio ni grado de iluminación**; no hay PP de Sancho. Riego de «otro actor» o primer plano nocturno de cara diurna. | Aceptar closeup solo después de cotejo lado a lado (cara, barba, casco, placas, luz, eje, fondo, heridas). No usar PP con armadura en Alonso Quijano convaleciente II,1 ni en el lecho II,74. No inventar ausencia de Sancho con un closeup de DQ. R06/R12. |
| **R06-H4-08 · P0 · spoilers Q.112** | H4 §5 registra pregunta hotspot sobre la embestida, pero binding a molinos_pre que no contiene ese desenlace; tampoco se validó coordenada en Tusell 027. | R15/R01/R08: proponer Tusell 027 únicamente en reveal/post con crédito y hotspot visualmente comprobado; o reformular la pregunta usando post y nueva geometría. No publicar hotspot inexistente ni adelantarse a la revelación. |
| **R06-H4-09 · P1 · amplitud del piloto** | H4 ofrece precisión beat a beat solo en I,8. Los otros cinco capítulos tienen episodios/fases y activos, **no ficha H3 equivalente**. | Mantener evaluación por escena/fase; no inventar cámaras y tiempos por réplica para I,6/I,11/I,18/II,1/II,74 hasta que haya guion. R03/R06/R14. |
| **R06-H4-10 · P1 · derechos y evidencia** | La familia IA permite catalogación interna, **no** aprobación automática de redistribución pública. Tusell 027/056 requieren atribución y condición aplicable. El carácter visual de recurso no constituye prueba histórica. | Conservar rotulación RECREACION_ARTISTICA en IA; revisar licencias por archivo/derivado, atribución Tusell/Doré y allowed_uses antes de producto distribuible. R13. |

**Dictamen global:** R06-H4-01, -02, -03, -04 y -05 (más el caso Q.112) impiden llamar **ejecutables/aprobados** los briefs o el paquete sin revisión cruzada. No impiden documentar un storyboard ni contar los nueve beats por narración ilustrada.

## 3. Corrección detallada de los cuatro briefs H4

### 3.1 BRIEF-H4-01 — p1_c08_carga_molinos (B05)

- **Fidelidad en H4:** la carga, I07/I08 y la advertencia desoída de Sancho están respaldadas por la ficha H3; «Non fuyades» tiene lugar antes del choque. Molino inerte, ninguna figura de gigante ni Frestón manifestado.
- **Diagnóstico visual:** ningún WebP catalogado muestra literalmente arranque de galope con Sancho advirtiendo; esto es una **carencia de un plano específico**, no necesariamente de comprensión del beat. M-PRE (DQ.MED.900005) ya contiene señalamiento/advertencia, M-SIL (DQ.MED.900231) establece distancia y CU-BA (DQ.MED.901003) ofrece el gesto combativo si supera continuidad.
- **Tratamiento R06 actual:** montar elipsis de decisión→arenga→consecuencia sin ilustrar falsamente la carrera, con texto I07/I08 íntegro y viento/voz futuros; no colocar M-POST antes del impacto. Priorizar esta solución en la prueba de comprensión.
- **Veredicto revisado:** **NARRACION_ILUSTRADA_SUFICIENTE provisional**; si la lectura con y sin audio no comunica la acción, volver a etiquetar como **IMAGEN_PARCIALMENTE_ADECUADA** y revisar BRIEF-H4-01 bajo control R01/R06/R14. **No encargar ahora**.
- **Si se reabre:** mantener media mañana; lanza intacta en ristre; Sancho en gesto verificable (sin deformación de rucio ni Rocinante), polvo del galope y aspa sin choque, zonas TS comprobadas, etiqueta como recreación IA candidata.

### 3.2 BRIEF-H4-02 — p1_c08_reganina_freston (B08)

- **Fidelidad en H4:** la regañina y Frestón pertenecen a B08. Correcto distinguir dolor físico de certeza inalterada. La caracterización de Sancho es regañina que deriva a aceptación afectuosa, no burla cruel.
- **Problema:** H4 pide un dos-plano que no existe en manifiesto y **cambia media mañana a «media tarde»**. La instrucción visual de Sancho «dedo índice alzado» es una **elección de puesta en escena**, no gesto literalmente obligado por el texto. Puede figurar en un futuro brief como propuesta, jamás como dato cervantino.
- **Tratamiento R06 actual:** M-POST (DQ.MED.900006), una misma relación espacial continua con Sancho acercándose, más CU-MA (901002) después del golpe; CU-PR (901007) para convicción solo si no parece triunfalismo. I13–I15 íntegros hacen audible/visible el cambio de sentido. **El contraplano preciso de Sancho sigue ausente**, no disimularlo con otro gesto inventado.
- **Veredicto revisado:** **IMAGEN_PARCIALMENTE_ADECUADA / NARRACION_ILUSTRADA_SUFICIENTE** hasta test del efecto cómico; **mejora cinematográfica candidata**, no imagen imprescindible. Si R14 autoriza brief nuevo después de prueba, luz de media mañana, continuidad de lanza rota y herida, sin ridiculizar al herido.

### 3.3 BRIEF-H4-03 — p1_c06_hoguera_corral_post

**Corrección P0 de cronología y reparto.** El título y contenido del capítulo I,6 sitúan al cura y barbero examinando libros. El ama y la sobrina proponen la hoguera en el corral y se lanzan ejemplares condenados; la quema **consumada** se cuenta explícitamente en **I,7**, después de interrumpirse el escrutinio por las voces del hidalgo y de que vuelva a acostarse. El narrador atribuye la acción al **ama**; no exige una escena coral con cura, barbero, sobrina y **ventero**. La inclusión de ventero es error (no confundir con la venta de otros capítulos).

- **Eliminar afirmaciones no apoyadas:** ventero presente, cura/barbero quemando simultáneamente al fuego, ventana concreta del cuarto de DQ, todos los personajes testigos del fuego. Pueden existir como decisiones **artísticas explícitas** salvo el ventero, pero no como reconstrucción de hechos documentados sin discusión.
- **Luz:** «aquella noche» sí sustenta iluminación nocturna para el tramo de I,7, con luz de fuego como hipótesis de puesta en escena; no sustenta una toma cronológicamente dentro del escrutinio I,6.
- **Cobertura:** I,6 ya tiene tres ángulos M 900013 / 900157 / 900230; una sucesión de ejemplares y el texto que sentencia libros bastan para su escena. La consecuencia I,7 puede narrarse sobre un plano de libros sin representar fuego y sin añadir evento retroactivo.
- **Veredicto revisado:** **BRIEF-H4-03 NO EJECUTABLE, FUERA DE I,6**. Si el guion H3 del enlace I,6→I,7 demanda plano de fuego, redactar **nuevo brief de I,7 con pasaje de ese capítulo**; revisión R01/R02 antes de enviarlo a arte. No producir en R06.

### 3.4 BRIEF-H4-04 — p2_c01_loco_sevillano_reveal

**Corrección P0 de atribución y trama.** En II,1 el barbero pide licencia para contar un cuento breve; se refiere a **un licenciado en cánones de la casa de los locos de Sevilla** que se considera cuerdo, escribe al arzobispo y convence inicialmente al capellán. Al despedirse de un compañero que se proclama **Júpiter**, acaba afirmándose **Neptuno** y vuelve a quedar internado. El diálogo exhibe cómo su pretendida lucidez cede ante el delirio. **No** representa a un personaje que simula cordura para evitar salir, ni incluye un «abad que lo observa con una caña a modo de lanza».

**Precaución de fuentes:** la **cana/cañuto** aparece en otra anécdota de Sevilla del *Prólogo* de la Segunda Parte (el cuento del perro hinchado); no mezclar prólogo dirigido al lector con relato interpolado por el barbero en II,1. El recurso a «Neptuno» y «Júpiter» no autoriza representarlos **literalmente como dioses sobrehumanos**: son afirmaciones de internos.

- **Tratamiento R06 sin nueva imagen:** mantener la visita interior 900029/900179; indicar con gesto del barbero y rotulación de voz que se inicia **relato referido**, mostrar su intervención en TS-001, y regresar al mismo espacio al terminar. Ningún DQ/Sancho en el patio de los hechos narrados.
- **Brief alternativo solo si R03/R01 lo exigen:** relato interior separado de la visita; el licenciado de aspecto sobrio y el capellán, otro interno como Júpiter verbal sin iconografía mitológica, el rector si la escena lo requiere; instante a elegir (examen de lucidez o réplica Neptuno). Día y arquitectura plausible del hospital, **no** afirmar historicidad de lugar concreto sin R04. Zona de texto separada porque el cuento es largo. Sin estigmatización visual de las personas encerradas.
- **Veredicto revisado:** **BRIEF-H4-04 RECHAZADO TAL COMO ESTÁ**. Nueva vigneta **opcional condicionada a guion y prueba**; la narración ilustrada sobre la visita permite contar fielmente el relato sin fabricar imágenes nuevas.

## 4. Integridad de identificadores: matriz de conflicto comprobado

| Recurso físico en manifiesto de escenas v14 | candidate_media_id real | Referencia que consta en ficha I,8 | Dictamen |
|---|---|---|---|
| assets/scenes/part_1/chapter_08/p1_c08_molinos_siluetas_pre.webp | **DQ.MED.900231** | **DQ.MA.900030** | **COLISIÓN DE SIGNIFICADO; no hay alias validado** |
| assets/scenes/part_1/chapter_08/p1_c08_molinos_pre.webp | DQ.MED.900005 | DQ.MA.900005 | Mismo sufijo aparente, familia no armonizada; no deducir migración |
| assets/scenes/part_1/chapter_08/p1_c08_molinos_post.webp | DQ.MED.900006 | DQ.MA.900006 | Ídem |

**Acción R05/R09/R11:** elaborar propuesta versionada para asignación canónica y prueba de que no hay otro recurso con DQ.MA.900030 ya ocupado. El nexo primario provisional debe ser **ruta física + hash del manifiesto**, no número inferido. La vista R06 publica nombres y candidatos solo como referencia; **este PR no edita esquemas, contenido, contratos ni manifiestos**.

## 5. Candidato, aptitud y aprobación: semántica obligatoria

La terminología «IMAGEN_ADECUADA» del H4 es un **juicio preliminar sobre pertinencia narrativa** y no debe traducirse sin más a «asset aprobado». Recomendamos conservar cinco ejes distintos:

| Eje | Evidencia admisible | Estado en R06 |
|---|---|---|
| **Existencia** | Ruta listada + hash en el manifiesto | Confirmada por entrada de manifiesto para escenas indicadas; no equivale a archivo renderizado auditado |
| **Cobertura narrativa** | Correspondencia beat/guion/fase y alternativa | Valorada aquí como propuesta; solo I,8 tiene H3 beat a beat |
| **Coherencia visual** | Inspección de píxeles, perspectiva, luz, figuración, errores IA y comparación lado a lado | **PENDIENTE** salvo los 2 PASS previos de otro documento; PASS previo no promueve aprobación |
| **Legalidad/procedencia** | Licencia, fuente, allowed_uses y crédito por archivo y derivado | DQ.LIC.0002 para recreaciones IA **uso interno** según H4; redistribución pública condicionada. Tusell requiere crédito y resolver límites |
| **Publicación/integración** | Revisión R01/R06/R13 y QA, media binding canónico válido, TS-001, spoiler y accesibilidad | **NO APROBADA**: scenes.production_state=visual_pilot_not_editorially_approved; todos review_state=borrador |

Las 253 imágenes registradas en scenes y los 10 PP pueden ser **candidatos** aunque estén bien descritos. Un activo no cambia de estado porque este documento diga “adecuado”. La auditoría de color, contornos, caras, manos, materiales y oclusión de TS-001 no se reemplaza por metadatos.

## 6. Continuidad: checklist de producción y montaje

### 6.1 Molinos B01–B09

- **Tiempo y luz:** misma **media mañana** del setting H3; sol, sombras y temperatura cromática compatibles de 900231→900005→900006 y con CU, sin B08 vespertino ficticio. La disolvencia no camufla cambios bruscos de hora.
- **Actores:** DQ alto enjuto, rostro alargado, bigote/perilla entrecanos, armadura gastada y casco coherente; Sancho robusto y bajo, ropa de lino/chaleco ocre; ambos según personajes_referencia.webp, que es **guía artística**, no prueba histórica.
- **Monturas:** Rocinante pardo claro, viejo y delgado; rucio gris; no cambiar color ni número de animales en contracampos.
- **Utilería:** lanza entera al señalar/antes de embestir y **rota solo después**; rodela, casco y orientación de arma sin teletransporte. DQ caído→socorrido→vuelve a montar (B06–B09) sin falsa imagen de recuperación instantánea.
- **Espacio:** molinos son maquinaria real, sin caras/ojos/brazos humanos ni gigantes literalmente presentes; número visible menor que el narrado no sirve para pregunta de conteo. Horizonte y aproximación deben permitir leer cambio de escala, aunque la carrera quede en narración.
- **Expresión:** euforia orgullosa→determinación→arenga→maltrecho físicamente→certeza intacta. DQ **no tiene miedo ni se arrepiente** en B01–B09; no forzar closeups frightened, sad, thoughtful, happy ni surprised para sumar variedad.
- **Sancho:** perplejidad→aviso→socorro→reprensión→resignación. Como no hay closeup propio de Sancho, mantenerle legible en los M; su ausencia en un plano no se soluciona sustituyéndolo con otro rostro.

### 6.2 Resto del piloto

- **I,6:** interiores diurnos o claroscuro uniforme; la quema nocturna, de representarse, corresponde al tramo I,7. Vestuario doméstico y libros físicos, sin títulos inventados legibles.
- **I,11:** 900007 (cena junto a hoguera) y 900134 (discurso) deben compartir noche/fuego, cabreros, posición de DQ y nivel de desgaste de su ropa; closeup diurno incompatible se descarta.
- **I,18:** 900008 previo frente a 900136 posterior; no mostrar pedradas, herida o dientes antes de tiempo; no alterar paisaje de repente sin transición.
- **II,1:** DQ **sin armadura en convalecencia**; continuidad de la sala 900029/900179. El relato de Sevilla no debe rodarse como aventura presenciada por DQ ni con personajes de prólogo.
- **II,74:** Alonso Quijano en cama, sin armadura; no insertar closeups armados de DQ. Tratamiento sereno, spoiler critical solo cuando el guion revele el desenlace; Tusell 371–373 en fase posterior.

### 6.3 TS-001 y 2.5D: control negativo

**Nunca** superponer texto o botones a rostro, dedo de Sancho, lanza, aspas relevantes, herida, molinos que actúen como pista, ni objetos cuya identificación fundamenta una pregunta. preferred_overlay_side=right solo define orientación candidata: R06/R08 han de entregar máscaras por plano, o desplazar a banda externa o vista dividida. I02, I07, I11 e I14 son pruebas de estrés por longitud; se mostrará **texto visible completo**, incluidos incisos, incluso sin audio. La animación no es una fuente de hechos: rotar artificialmente una aspa de imagen plana no demuestra la física del golpe. Un fallback inmóvil debe transmitir la misma secuencia, incluidas las pausas semánticas.

## 7. Necesidades restantes y divergencia razonada con H4

**H4, foto del momento (v0.1):** 31 decisiones tabuladas, con 4 categorías NUEVA_RECREACION_NECESARIA (B05, B08, hoguera I,6, loco II,1), sobre paquete v14, y verificación visual limitada.

**R06, después de agotar narración ilustrada y primeros planos:** 
1. **Molinos B05:** falta el **plano literal** de carrera/aviso, no el relato del evento. Cubierto provisionalmente por 900005 + 900231 + candidato 901003 + I07/I08. **Mejora opcional 1** si falla prueba de comprensión o de acabado.
2. **Molinos B08:** falta el **dos-plano específico** de Sancho reprendiéndolo, no la reacción de DQ ni el diálogo. Cubierto provisionalmente por 900006 + 901002/901007 condicionados + I13/I14/I15. **Mejora opcional 2** si prueba demuestra que se pierde el contraste afectivo.
3. **Hoguera:** no es carencia de I,6. Puede ser **necesidad en transición I,7**, fuera de las seis fichas de capítulo como episodio autónomo hasta autorización de guion. **No reutilizar brief erróneo**.
4. **Sevilla II,1:** la anécdota se narra perfectamente desde plano del barbero en la visita; imagen específica del licenciado/Neptuno **mejora opcional 3**, subordinada al relato auténtico.
5. **Primeros planos de Sancho:** familia ausente, pero **no encargar por inventario**, solo ante necesidad demostrada en escena concreta tras recortes admitidos y prueba TS-001.

**Conclusión provisional:** **no se ha acreditado ninguna imagen nueva indispensable para dar una solución narrativamente fiel a los nueve beats ni a las fases hoy guionizadas de los seis capítulos**. Se han identificado **tres posibles mejoras artísticas** (carga, regañina, vigneta Sevilla), y una posible necesidad de transición I,7 que exige guion y reubicación. Esta conclusión **no equivale** a que la calidad visual haya sido certificada; hasta ver las imágenes reales juntas, validar recortes y probar con texto íntegro, no se autoriza producción ni publicación de nuevas recreaciones. Se trata de un **cambio propuesto** respecto a los cuatro huecos del H4, pendiente de aceptación por R01/R14.

## 8. Plan de subsanación, pruebas y responsables

| Orden | Acción y evidencia de salida | Responsable de validación |
|---|---|---|
| **P0-1** | Emitir fe de erratas H4: I,6→I,7 para hoguera; eliminar ventero; corregir II,1 (licenciado/arzobispo/capellán/Júpiter/Neptuno), no caña/abad. Relacionar pasajes exactos según edición elegida. | R01/R02/R03 + R14 |
| **P0-2** | Resolver identidad M-SIL DQ.MED.900231 frente a DQ.MA.900030 con SHA, rutas, migraciones y pruebas de no colisión. | R05/R09/R11 + R14 |
| **P0-3** | Auditar pixels de 900231, 900005, 900006, 901002, 901003, 901004 y 901007; ficha de continuidad con capturas, log de PASS/FAIL y máscaras de zonas protegidas. | R06/R12 |
| **P0-4** | Revisar para preguntas Q.101/Q.109/Q.112 ventanas pre/reveal/post y geometría real de Tusell 027. Validar rotulación y licencia. | R15/R01/R08/R13 |
| **P0-5** | Pruebas TS-001 con 16 intervenciones, mute, fallo de voz, texto grande, pausa/retroceso, ventana 16:9, foco/teclado, movimiento reducido; demostrar cero oclusiones/truncamientos. | R08/R09/R12 |
| **P1-1** | Test de comprensión ciego: ¿se comprende que Sancho avisa y que DQ carga? ¿Se capta la explicación Frestón sin el plano propio de regañina? Documentar fallos, no gustos especulativos. | R06/R12/R14 |
| **P1-2** | Solo tras fallo confirmado y revisión editorial, reemitir brief específico acotado a un plano; verificar si mejora el montaje respecto a reutilización. | R01/R06/R13/R14 |
| **P1-3** | Las fases de los otros cinco capítulos obtendrán desglose a beat solo después de sus fichas H3; no inferir tiempos, imágenes ni gestos como si el guion existiera. | R03/R06 |

## 9. Control de cambios y solicitud a Coordinación

**Entregables R06 documentales:** docs/STORYBOARD_VISUAL_PILOTO.md y este dictamen. **No realizados:** generación o edición de imágenes; cambios de esquema/manifest/ID; creación de interfaces; producción masiva; revisión humana experta externa; inspección visual completa, pruebas de animatic o TS-001 en aplicación, ni fusión a main.

**Decisiones propuestas a R14:** (a) aceptar que H4-03 y H4-04 **no se ejecutan** en su redacción actual; (b) admitir narración ilustrada como solución provisional de B05/B08; (c) solicitar a R05/R09 reconciliación formal de identificadores antes de bindings; (d) mantener todos los activos candidatos en borrador hasta revisión de arte/QA; (e) condicionar cualquier imagen nueva a evidencia de una carencia real. **PR R06 abierto para revisión, nunca fusión automática.**