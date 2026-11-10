# Capítulo I.3 — Matriz visual conjunta Aventura + Historia (DC-36)

**Fecha:** 2026-11-10. **Estado:** PROPUESTA PARA REVISIÓN DEL PROPIETARIO; inventario comprobado en GitHub; **NO ES una aprobación artística, una orden de nuevos prompts ni un capítulo activado**.

**Fuente exclusiva:** `content/textos/gutenberg_2000/El_Quijote.txt` (DQ.ED.0003 / DQ.SRC.0005), Parte I, capítulo III, L1455–1664.
**Dependencias editoriales ya redactadas:**
- Aventura: [`docs/PRODUCCION_CAPITULO_P1_C03_AVENTURA_CANDIDATA_2026-11-10.md`](PRODUCCION_CAPITULO_P1_C03_AVENTURA_CANDIDATA_2026-11-10.md), 4 rondas candidatas R01–R04.
- Historia: [`docs/guiones/HISTORIA_P1_C03_CANDIDATA_2026-11-10.md`](guiones/HISTORIA_P1_C03_CANDIDATA_2026-11-10.md), 11 escenas H01–H11, 30 intervenciones íntegras; sin integración al reproductor.
- Reglas: DC-24/25/26/28/30–36, `docs/DIRECCION_ARTISTICA_PILOTO.md` (tercio izquierdo), `docs/REGLAS_MODO_AVENTURA_V2_2026-11-08.md` (§5: escena izquierda y panel derecho) y `docs/PROTOCOLO_ELABORACION_CAPITULO_X.md` en su versión ya ajustada a DC-36.

## 1. Dictamen de composición comunicado por el propietario

**Norma preexistente, no nueva:** en Aventura la imagen debe favorecer el peso visual a la izquierda y dejar **espacio seguro a la derecha** para pregunta/opciones, sin tapar protagonistas, acción ni pistas. La pregunta se formula ANTES del hecho y cada ronda debe llevar su preimagen **diferente, específica y antiespoiler**. En Historia no se impone el mismo encuadre de pregunta: prevalecen cobertura cinematográfica, sincronía y texto íntegro (TS-001), con DC-28 aplicable.

| Recurso real en `assets/scenes/part_1/chapter_03/` | ID catálogo | Aventura según propietario | Historia según propietario | Beat de Historia |
|---|---|---|---|---|
| `p1_c03_vela_armas_pre.webp` | DQ.MED.900131 | **Apta por composición, ÚNICA entre las cuatro**; aún sin ronda concreta definitiva | **Sí** | H05, vela de armas L1539–1553 |
| `p1_c03_arriero_pozo_pre.webp` | DQ.MED.900155 | **No apta por composición** | **Sí** | H06, llegada del primer arriero L1553–1565 |
| `p1_c03_ventero_libro_cuentas_pre.webp` | DQ.MED.900205 | **No apta por composición** | **Sí** | H09, libro de cuentas L1627–1633 |
| `p1_c03_investidura_post.webp` | DQ.MED.900012 | **No apta por composición** | **Sí** | H10, investidura L1631–1642, nunca antes |

Los cuatro WebP **existen físicamente** en la ruta indicada, 1672 × 941 píxeles, y aparecen en `assets/scenes/manifest.json` con `review_state=borrador`, estado de derechos `original_generated_asset_review_on_redistribution` y QA de referencias literarias y spoilers todavía pendientes. **No mutar** esos campos por una selección compositiva. La opinión del propietario sobre uso previsto no elimina las verificaciones de contenido exacto, derechos y montaje.

## 2. Aventura: matriz de pregunta → instantánea previa → consecuencia

| Ronda y hecho preguntado | Preimagen necesaria ANTES de la acción | Posimagen de consecuencia, solo DESPUÉS de «Descubrir qué sucede» | Estado / reutilización |
|---|---|---|---|
| **R01** · don Quijote exige promesa, L1458–1479 | **A01**: entrevista en caballeriza con ventero; DQ aún **no** se ha arrodillado, sin promesa ni ritual | **A02**: DQ arrodillado insiste ante ventero, este accede a prometer un favor | Ningún medio del I.3 asignado a Aventura; puede cubrir Historia H01–H02 |
| **R02** · DQ responde al arriero que arrojó las armas, L1553–1575 | **A03**: vela interrumpida, arriero junto a pila y armas apartadas, DQ aún no ha golpeado; composición despejada a la derecha | **A04**: DQ descarga la lanza y derriba al primer arriero, sin violencia gráfica innecesaria | `vela_armas_pre` es la única **posible** preimagen desde el punto de vista compositivo, **pero su descripción del manifiesto solo acredita una vela, no que incluya al arriero ni el instante tras arrojar las armas**. Si no da contexto exacto para R02, proponer A03 nuevo; A04 puede cubrir Historia H06 |
| **R03** · ventero decide acelerar la orden tras la pedrea, L1590–1625 | **A05**: tensión en la venta, DQ ha reanudado la vela y ventero contempla la desgracia anterior; aún NO propone investidura | **A06**: ventero se aproxima y persuade a DQ para adelantar ceremonia; todavía sin pescozada/espaldarazo | La imagen `vela_armas_pre` está cronológicamente asociada a H05 **antes de los golpes**, por lo que **no se atribuye automáticamente a R03**, que ocurre después. A05/A06 pueden apoyar Historia H07–H08 |
| **R04** · ventero ejecuta gesto de investidura, L1627–1642 | **A07**: libro de cuentas, cabo de vela, dos mujeres y DQ a punto de recibir el rito, sin golpe ni espada ceñida; **reencuadre propio de Aventura** | **A08**: pescozada y espaldarazo, gesto burlesco del ventero, revelados después de respuesta | `ventero_libro_cuentas_pre` y `investidura_post` están **reservadas a Historia** por el propietario; por tanto no se asignan a Aventura. Los nuevos encuadres A07/A08 podrían aprovecharse también para Historia H09–H10 si se aceptan |

**Resultado operativo:** el capítulo tiene **ocho posiciones narrativas para imagen previa/posterior de sus cuatro rondas**. Solo una de las cuatro imágenes existentes en I.3 está **admitida compositivamente** para Aventura y su atribución cronológica sigue pendiente; por tanto **hay al menos siete posiciones sin recurso asignado**, y **podrían ser ocho** si la imagen de la vela no encaja en R02 ni R03. Una posición sin asignación **no equivale automáticamente a FALTA_CONFIRMADA**: antes se deben descartar recursos válidos del resto del catálogo y el propietario tiene que confirmar el hueco.

**Principio de eficiencia:** no fabricar una ronda extra para consumir una imagen; no reutilizar `vela_armas_pre` en dos preguntas. Si su momento anterior al arriero no responde con precisión a ninguna ronda candidata, conservarla solo para Historia, sin forzar un guion incorrecto.

## 3. Historia: cobertura por escena y posibles comparticiones

| Historia | Imagen / plano previsto | Dependencia respecto a Aventura |
|---|---|---|
| **H01–H02** · cena final, entrevista en caballeriza, súplica | Cobertura **por confirmar**. Los encuadres candidatos A01/A02 resolverían las acciones principales | Posible reutilización A01/A02; una imagen de la cena de I.2 **solo serviría como transición retrospectiva explícita**, no para fingir la petición de I.3 |
| **H03–H04** · burlas, capilla inexistente y consejos sobre dinero/camisas | **Candidato adicional H-A:** reacción del ventero y conversación con DQ; sin inventar capilla | No hay plano específico asignado en Aventura |
| **H05** · vela de armas | **Existe:** `p1_c03_vela_armas_pre.webp` (DQ.MED.900131) | Compartir con Aventura únicamente si hay misma acción y momento, sin spoiler |
| **H06** · primer arriero | **Existe:** `p1_c03_arriero_pozo_pre.webp` (DQ.MED.900155) para llegada; el golpe requerirá un plano de acción | Posible A04 para desenlace, si se produce/aprueba |
| **H07** · segundo arriero y lluvia de piedras | **Candidato adicional H-B:** ataque y pedrea, diferenciando claramente al **segundo** arriero y la defensa con adarga | A05 puede mostrar el final de la tensión sin sustituir por sí sola el desarrollo |
| **H08** · ventero detiene conflicto y precipita investidura | Falta seleccionar plano fiel de reacción/diálogo; A05/A06 podrían cubrirlo | Reutilización preferente A05/A06 |
| **H09** · libro de cuentas | **Existe:** `p1_c03_ventero_libro_cuentas_pre.webp` (DQ.MED.900205) | A07 podría ofrecer un segundo ángulo sin obligar a duplicar la escena |
| **H10** · golpe ceremonial y bendición | **Existe:** `p1_c03_investidura_post.webp` (DQ.MED.900012) | A08 podría dar plano de consecuencia alternativo, siempre en su momento |
| **H11** · Tolosa/Molinera y salida | **Candidatos adicionales H-C/H-D:** intervención de las dos mujeres, y partida de DQ en Rocinante desde la venta | Independientes de las preguntas actuales; revisar si los dos instantes exigen sendos planos |

Las descripciones H-A a H-D son **funciones visuales por revisar**, no encargos nuevos aprobados; su número no es una cuota mecánica. Reutilizar todo plano **pertinente y aprobado** sin sacrificar variedad cinematográfica, continuidad ni exactitud temporal. Los `assets/closeups/` ofrecen expresiones de DQ pero el catálogo está **en revisión**, de modo que no sustituyen escenas de arrieros, ventero, mujeres o salida.

**Inventario adicional consultado:** escenas de Parte I, capítulos I y II, donde hay recursos aprobados para episodios **anteriores**, como `p1_c02_r05_cena_sin_cana_pre.webp` y `p1_c02_h10_cana_vino_story.webp`. No se asignan en bloque al I.3: requieren encaje literal/temporal y validación de continuidad; no sirven para ilustrar una ceremonia que aún no sucedió. El antiguo `docs/CATALOGO_NECESIDADES_VISUALES.md` es histórico y no sustituye la comprobación física actual.

## 4. Puerta siguiente: revisión de carencias antes de crear prompts

1. **Confirmación editorial:** propietario revisa o corrige las cuatro rondas Aventura y 11 escenas/30 intervenciones Historia. Se mantienen como candidatas.
2. **Confirmación del uso de la vela:** comprobar si `p1_c03_vela_armas_pre.webp` puede ser la **preimagen específica de R02**, u otra ronda, sin adelantar el hecho ni forzar una relación que no aparece en el plano. Para H05 sí ha sido indicada expresamente.
3. **Confirmación de cobertura visual:** propietario determina para cada posición A01–A08 y posibles H-A–H-D si existe ya un recurso aceptable en GitHub, es `NO_APTA`, se evita por redundancia, o es `FALTA_CONFIRMADA`. Puede decidir una cobertura Historia más condensada sin sacrificar hechos significativos.
4. **Solo para `FALTA_CONFIRMADA`:** un prompt individual de referencia cervantina exacta, escena realista premium **1672 × 941 WebP**, peso de acción a la izquierda y área segura a la derecha para **Aventura**, antiespoiler antes/post, coherencia histórica, derechos, alt y QA DC-28/32. No redactar ni generar ese arte antes de la confirmación.
5. **Aceptación/integración:** propietario valida WebP; ejecutar protocolo DC-35 con SHA-256, manifiestos, licencias y commit seguro a `main`. Solo después, revisión de datos JSON por modo/episodio y QA de reproductores, TS-001, DC-28, tests/CI y límites de fase.

**Verificación ejecutada en esta etapa:** GitHub `main`, árbol físico `chapter_03`, manifiesto de escenas, manifiesto de `assets/closeups/`, capítulos I.1–I.2 como contexto, corpus I.3 cotejado, normas artísticas y guiones actuales; **no ejecutado**: inspección de píxeles de las cuatro imágenes, QA de interacción/capturas, tests del juego ni comprobación binaria SHA-256 independiente del manifiesto. Este documento no presume que se hayan ejecutado.
