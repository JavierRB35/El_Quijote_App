# Issue #90 — Primer expediente narrativo de Historia (I.7 / I.9)

**Estado:** propuesta editorial no publicable · 2026-11-09 · base `main=ea6ad7aa0f10f253c82a6ab8f10cd2c81d92959e`.
**Fuente:** `DQ.SRC.0005` / `DQ.ED.0003` (Gutenberg eBook #2000), capítulos I.7 e I.9; https://www.gutenberg.org/cache/epub/2000/pg2000-images.html.
**Cotejo:** lectura puntual de los capítulos y contraste de I.9 con https://www.cervantesvirtual.com/obra-visor/el-ingenioso-hidalgo-don-quijote-de-la-mancha--10/html/ . **Pendiente**: cotejo crítico con el EPUB Tusell y anclajes definitivos `DQ.P*.P*`. No se han inventado citas literales.

## Regla de integración

Los identificadores `ISS90.*` son **temporales de investigación** y no cumplen el contrato de producción; no insertar este documento en `content/piloto/`. Toda voz aquí es una **adaptación editorial atribuida al narrador**, no una frase literal de Cervantes. TS-001: el `texto_visible_integro` de cada intervención debe permanecer accesible completo con audio, sin audio o con audio fallido, con pausa/repetición y avance flexible. Queda pendiente revisión de duración, composición y fuente.

Las fases de cada intervención se refieren al momento narrativo, **no** a pantallas especializadas: `antes` = contexto antiespoiler; `pregunta` = interacción seleccionada; `revelación` = consecuencia fiel; `después` = continuidad.

## Parte I, capítulo 7: segunda salida y nacimiento de la pareja

| Beat provisional | Fase | Texto visible íntegro del narrador (adaptación) | Pregunta/puerta | Evidencia y control visual |
|---|---|---|---|---|
| ISS90.H07.B01 | antes | «De vuelta en casa, el hidalgo busca su biblioteca. El ama y la sobrina, siguiendo la ocurrencia del cura y el barbero, explican su desaparición mediante un encantador.» | Ninguna | I.7, aposento tapiado y explicación inventada. Mostrar casa y puerta ausente; no anticipar la segunda salida |
| ISS90.H07.B02 | antes | «La quietud dura poco. Don Quijote habla con un labrador vecino y le propone acompañarlo como escudero. Falta saber qué le promete a cambio.» | ISS90.I07.Q01 | I.7, reclutamiento de Sancho. Dos personajes conversan, sin coronas, islas ni texto de premio |
| ISS90.H07.B03 | revelación | «El ofrecimiento que decide a Sancho es el posible gobierno de una ínsula. El labrador acepta y comienza a preparar el viaje.» | Después de ISS90.I07.Q01 | I.7, promesa del gobierno. Esta revelación solo después de responder |
| ISS90.H07.B04 | antes → pregunta → revelación | «Don Quijote reúne dinero y recompone su equipo. Sancho prepara alforjas y propone un medio de transporte que desconcierta al caballero.» **Revelación posterior:** «Su asno le parece poco propio de los escuderos de los libros, pero termina por permitirlo.» | ISS90.I07.Q02 | I.7, preparativos y asno. En preimagen ocultar montura; tras respuesta, descubrirla en plano nuevo |
| ISS90.H07.B05 | antes → pregunta → después | «Una noche, sin despedirse, los dos salen de su pueblo. El camino de Montiel vuelve a estar ante ellos, ahora en compañía.» | ISS90.I07.Q03 (ordenación de preparativos) | I.7, salida nocturna y camino de Montiel. No ilustrar de antemano el orden mediante viñetas |

**Dependencia de capítulo:** I.7 continúa I.6 y precede I.8; no adelantar molinos, frailes ni combate. Las preguntas se muestran **después** de los hechos que habilitan su respuesta salvo cuando se busque anticipación explícita sin revelar el canon.

## Parte I, capítulo 9: artificio del manuscrito y continuación del combate

| Beat provisional | Fase | Texto visible íntegro del narrador (adaptación) | Pregunta/puerta | Evidencia y control visual |
|---|---|---|---|---|
| ISS90.H09.B01 | antes | «La batalla entre don Quijote y el vizcaíno había quedado interrumpida en el instante más tenso, con las espadas en alto. El relato también tendrá que encontrar cómo proseguir.» | Ninguna | I.8 final / I.9 inicio. Enlace narrativo entre capítulos; no dar por histórico el manuscrito ficticio |
| ISS90.H09.B02 | antes → pregunta | «El segundo narrador dice haber encontrado unos papeles escritos en caracteres que no podía leer. No conoce todavía el valor de aquellos cartapacios.» | ISS90.I09.Q01 | I.9, hallazgo en el Alcaná de Toledo. Antes de la respuesta, plano de mercado sin rótulos que delaten el lugar |
| ISS90.H09.B03 | revelación | «Según el narrador, el hallazgo sucede en el Alcaná de Toledo; con ayuda de un lector morisco comienza a comprender los papeles.» | Después de ISS90.I09.Q01 | I.9, búsqueda de traductor. Mantener explícito que es un recurso narrativo |
| ISS90.H09.B04 | antes → pregunta → revelación | «Una anotación provoca la risa del lector. El narrador observa la reacción y pide saber qué pone.» **Revelación posterior:** «La mención de Dulcinea y el título atribuido a Cide Hamete Benengeli permiten reconocer la historia.» | ISS90.I09.Q02 | I.9, anotación marginal y título. En preimagen no mostrar texto legible ni identidad del autor |
| ISS90.H09.B05 | antes → pregunta → revelación | «Los papeles describen también una ilustración de ambos combatientes, con sus armas levantadas. Queda por descubrir la peculiar defensa del vizcaíno.» **Revelación posterior:** «Es una almohada, frente a la rodela de don Quijote.» | ISS90.I09.Q03 | I.9, descripción del cartapacio. Antes de respuesta ocultar defensa; después mostrar detalle del manuscrito como recreación, nunca presentarlo como documento histórico |
| ISS90.H09.B06 | después | «Con el relato recuperado, se cuenta cómo prosigue el combate y el vizcaíno acaba en tierra tras el ataque de don Quijote.» | Continuidad, sin pregunta nueva | I.9, reanudación y resultado; cotejar detalle fino y cronología antes de producción |

## Dependencias por capítulo y escena

- `I.7`: hacen falta **al menos** contextos diferenciados para casa/biblioteca, conversación con Sancho, equipo/montura, salida nocturna y camino; la imagen definitiva se decidirá por función del beat, no por cuota fija.
- `I.9`: distinguir batalla suspendida, mercado/hallazgo, lectura/traducción, indicios del manuscrito, detalle de protección y continuación. Las recreaciones de cartapacios no son prueba arqueológica.
- `assets/scenes/` y `assets/closeups/`: auditar **antes** de proponer nuevos medios; no se ha asignado ningún `DQ.MA.*` a estas seis preguntas. Cada pregunta final requiere imagen propia específica y antiespoiler (DC-24–DC-27).
- No se ha creado audio ni imagen. Las licencias, contratos de `Scene`/`Beat`, duración, voz, planos y QA visual permanecen **PENDIENTES**.

## Gates de salida

1. Cotejo textual por Dirección y pasajes verificables en edición declarada.
2. Consolidación de IDs `DQ.Q.*` y `DQ.BEAT.*` por desarrollador, nunca reutilizando IDs ocupados.
3. Prueba de duplicación semántica; validar distractores, balance cognitivo y spoilers pregunta por pregunta.
4. Curaduría de imágenes específicas; hash, derecho de uso, `pre_image_media_id`, zona segura y accesibilidad.
5. Validar JSON Schema y consumidor, TS-001, audio opcional sin pérdida de texto y no alteración del canon.
6. Revisión formal de Dirección y autorización de integración. **Ninguna de estas puertas queda cerrada por este documento.**
