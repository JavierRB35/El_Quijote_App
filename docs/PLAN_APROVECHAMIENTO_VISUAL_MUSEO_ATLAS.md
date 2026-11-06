# R16 — Plan de aprovechamiento visual para lector, museo y atlas

**Versión:** 0.1.0 · **Fecha:** 2026-11-06 · **Prioridad:** P1 · **Modo:** CONTENIDOS con coordinación/auditoría  
**Responsabilidades asumidas (no revisión humana externa):** curaduría iconográfica y literaria, documentación del Siglo de Oro, GIS literario, control de procedencia y derechos.  
**Estado:** propuesta editorial **NO PUBLICABLE**; no constituye permiso de reproducción, dictamen jurídico definitivo ni implementación de museo/atlas.  
**Repositorios de evidencia:** JavierRB35/El_Quijote_App; inventario contrastado con árbol de main SHA 2e23b1cd27c764d946610716a4566a46ceda27cf (consulta 2026-11-06).  
**Matriz asociada:** docs/data/propuesta_vinculos_culturales_visuales.csv. **Rama:** feature/r16-curaduria-cultural-visual.

## 1. Dictamen y perímetro

El mejor aprovechamiento inmediato no consiste en generar nuevos gráficos: consiste en **vincular el banco existente con el episodio y con la naturaleza de la evidencia**, incorporando controles de spoilers, fuentes, atribuciones y licencia. Se seleccionan **68 propuestas** (22 P1 y 46 P2), de las que **46** utilizan una acuarela numerada de Tusell, **18** una recreación contemporánea IA (14 escenas y 4 primeros planos), **2** una pieza editorial, **1** la cubierta digital como evidencia documental *de esa edición electrónica*, y **1** una obra cartográfica histórica conocida **solo por su ficha QBI**. No se incorpora ningún fichero gráfico nuevo.

El inventario de partida consta de **376 JPG numerados como acuarelas** (DQ.IL.0001–0376), **39 elementos decorativos/editoriales** (DQ.DEC.*), **253 entradas en el manifiesto de escenas** (incluida la imagen de referencia de personajes) y **10 primeros planos** del personaje. Son recuentos de **manifiestos y árbol Git**, no una certificación de calidad visual o derechos de cada imagen. La clasificación de las 376 procede del EPUB y requiere cotejo individual antes de afirmar que todas son acuarelas originales de una misma mano.

Existen **siete fichas museísticas documentadas en el paquete piloto** (DQ.MUS.0001–0007). **No crearlas de nuevo**: reutilizarlas como referencias y resolver sus derechos antes de activar cualquier ficha visible. Los museos/atlas permanecerán conceptualmente abiertos desde el inicio, pero un recurso individual sin autorización seguirá oculto o sustituido por **ficha textual y metadatos**, nunca por un binario no licenciado.

**Fuera de alcance:** nuevas ilustraciones, importar ficheros QBI al repositorio, modificar la app, crear rutas cartográficas, asignar coordenadas inventadas, mutar schemas/contratos, alterar los manifiestos originales o dar por autorizada la redistribución de Tusell.

## 2. Fuentes contrastadas y jerarquía de evidencia

| Nivel | Fuente y localización | Valor real | Límite |
|---|---|---|---|
| Literario A | content/piloto/passages/DQ.*.json, edición de citas PG #2000, y docs/data/piloto_segmentacion.json | Parte/capítulo y pasajes o segmentos anclados del piloto | Fuera del piloto aún faltan pasajes exactos; el lector usa otra capa textual |
| Literario B | assets/ilustraciones_tusell/manifests/manifest_ilustraciones.csv y .json | ID, archivo, ubicación en EPUB, texto alternativo, SHA-256 declarado | Un alt **describe un dibujo**; no prueba su exactitud ni un hecho histórico |
| Producción | assets/scenes/manifest.json; assets/closeups/manifest.json | Identidad de recreación IA, fase narrativa, ruta, alt, hash declarado | Estado editorial borrador y potenciales spoilers |
| Bibliográfico institucional | BVPB, registro 463832: https://bvpb.mcu.es/cervantes/es/consulta/registro.do?id=463832 | Edición Barcelona, Luis Tasso, 1905, 2 vols.; más de 350 acuarelas atribuidas a Salvador Tusell sobre composiciones de Gustave Doré; digitalización institucional con rótulo CC BY | **No** se demuestra identidad binaria entre escaneos BVPB y JPG del EPUB Epublibre |
| Cartográfico documental | BVMC/QBI, ficha 10485: https://www.cervantesvirtual.com/portales/quijote_banco_imagenes_qbi/ficha_imagen/?id=10485 | Registro de un mapa-grabado publicado en edición Tomás Gorchs (Barcelona, 1859), título e inscripción catalogados | No certifica itinerario real, ni el permiso para copiar su fichero |
| Jurídico | BOE: https://www.boe.es/buscar/act.php?id=BOE-A-1996-8930; https://www.cervantesvirtual.com/marco-legal/ | Cómputos legales y condiciones expresas de uso del portal QBI | No sustituyen acreditación de fallecimiento de Tusell ni licencia específica del fichero |
| Gobernanza local | docs/DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md, docs/USO_PRIVADO_Y_RECURSOS_QBI.md, docs/RESOLUCION_PEND01_EDICION_REFERENCIA.md | Decisiones de proyecto y expediente existente | No son cesión de derechos por terceros |

**Citas literarias:** en la propuesta, un ID de pasaje de content/piloto/passages solo se considera un vínculo **textualmente verificable en el paquete del piloto**; su correspondencia con el EPUB visible en el lector exige comprobar la variante de edición. Si hay solo segmento DQ.P*.SG* o documento XHTML, es **candidato** y no debe activarse como salto a una cita exacta. El texto PG #2000 se usa para las citas del banco conforme a la resolución editorial vigente; el lector previsto utiliza el EPUB Tusell. Para los casos sin pasaje exacto, la matriz dice expresamente que el anclaje está pendiente.

El valor de un documento es específico: el registro BVPB prueba la existencia y descripción bibliográfica de una edición; el registro QBI documenta un mapa de la **recepción e interpretación** de la novela; ninguno hace históricos los acontecimientos ficticios representados.

## 3. Taxonomía obligatoria de imágenes y afirmaciones

| Clase visual | Qué se muestra | Qué NO se puede deducir |
|---|---|---|
| ILUSTRACION_LITERARIA | Acuarela publicada históricamente, atribuida a Tusell, que representa un capítulo o una alegoría | Que los personajes reales vistieran o se vieran así; que la composición sea un documento del siglo XVII |
| RECREACION_CONTEMPORANEA | Imagen IA creada para el proyecto en 2026, incluidos retratos expresivos | Que sea fotografía, retrato auténtico, prueba de arquitectura, traje, objetos o paisaje histórico |
| OBRA_HISTORICA | Objeto gráfico producido en una fecha histórica comprobable; p. ej., mapa-grabado editorial de 1859 | Que sus hipótesis geográficas sean el recorrido verdadero de Don Quijote |
| EVIDENCIA_DOCUMENTAL | Documento material o registro que acredita un hecho **sobre la edición, procedencia o recepción**; en la selección, imagen de la cubierta **del EPUB digital** | Que sea cubierta original de Tasso 1905, ni prueba de historia cultural del XVII |
| PIEZA_EDITORIAL | Letra capitular, orla u otro paratexto visual digital | Autoría por Tusell o procedencia de 1905 sin cotejo |

**Dos dimensiones que no se confunden:** (a) una acuarela de 1905 es **histórica como objeto artístico/editorial** y simultáneamente **ilustración literaria** respecto de la ficción; (b) la certeza de la narración se registra separadamente de la certeza de la ubicación geográfica y de la situación jurídica. Rotular en la interfaz: **«Ilustración literaria (edición de 1905; atribución a Salvador Tusell sobre composición de Gustave Doré)»**, **«Recreación artística generada con IA (2026)»**, **«Mapa histórico de interpretación literaria (1859), ruta no probada»** o **«Paratexto del EPUB digital»**, según la pieza.

Las pruebas textuales usan TEXTO_EXPLICITO, mientras que la historia material requiere HECHO_HISTORICO_DOCUMENTADO con fuente independiente; las interpretaciones se marcan INTERPRETACION_ACADEMICA o HIPOTESIS_PLAUSIBLE con atribución. Las cartografías no comprobadas quedan DISCUTIDO/NO_ESTABLECIDO. Ningún texto alternativo de Tusell se eleva por sí solo a hecho histórico.

## 4. Colecciones propuestas para el museo

El museo debe ser **selectivo y contextual**, no una reproducción indiscriminada de 415 imágenes. Agrupaciones editoriales iniciales:

| Colección | Recursos preferentes (IDs de origen) | Lectura cultural autorizable con texto verificado |
|---|---|---|
| Personajes e identidades | DQ.IL.0004, 0022, 0037, 0179, 0191, 0371–0372 | Construcción visual de don Quijote, Sancho, Marcela, Teresa, Dulcinea y Alonso Quijano; personajes ficticios, no retratos históricos |
| Vida cotidiana y sociabilidad | DQ.IL.0034, 0036, 0218, 0219, 0292, 0311 | Cena, cuidados, cocina, fiesta, conversación y hospitalidad **según la novela**; investigar fuentes externas antes de afirmar costumbres reales |
| Indumentaria y representación de armas | DQ.IL.0006, 0009, 0250, 0360 (última **no seleccionada** en el CSV) | Comparación de iconografías; no homologar trajes/armas del dibujo de 1905 como vestuario del XVII |
| Oficios, objetos y técnicas | DQ.IL.0021, 0059, 0065, 0239, 0247 | Libro y escrutinio, batanes, bacía, teatro de títeres y molineros; explicación material exige fuente patrimonial externa |
| Caballería y su parodia | DQ.IL.0026–0029, 0057, 0207, 0276, 0346 | Diferencia entre lectura caballeresca, realidad narrativa y desenlace; ocultar imágenes reveladoras antes de responder |
| Literatura y cultura del Siglo de Oro | DQ.IL.0002, 0021, 0035, 0113, 0121–0122, 0373 | Libros de caballerías, Edad de Oro clásica, novela intercalada, armas/letras y autorreferencia |
| Geografía literaria y recepción | DQ.IL.0072, 0191, 0335, 0346; QBI 10485 (solo metadatos) | Topónimos literarios explícitos, mapa editorial hipotético e iconografía posterior de lugares |
| Historia editorial de la edición | DQ.DEC.0007, 0025, 0037; DQ.IL.0001 | Paratextos de la copia digital y retrato **no autenticado**, cotejados con registro BVPB |

Estas asociaciones temáticas son **propuestas de ficha** y no aprobaciones de imagen. En particular: DQ.IL.0001 («Retrato de Miguel de Cervantes») **no** acredita la apariencia física de Cervantes; DQ.IL.0043 tiene alt de la Edad de Oro pero está **insertada en el archivo I.15**: la relación interpretativa corresponde a I.11, sin reescribir la ubicación de fuente. DQ.IL.0012 tiene alt «rescata» al joven Andrés: debe cotejarse contra consecuencias narrativas para no transmitir un desenlace simplificado.

## 5. Lector: anclaje al capítulo, pasaje y política de spoilers

**Regla de activación:** capítulo + pasaje exacto de la edición declarada + validación de correspondencia con EPUB + derechos + control de revelación. La pertenencia al capítulo no basta para hacer clic directamente a un párrafo. En la matriz, **16 propuestas** apuntan a un ID existente de content/piloto/passages; las restantes se enlazan solo a capítulo/tema o a un segmento provisional hasta disponer del anclaje de lectura.

Primera cadena curatorial robusta sobre los seis capítulos piloto:

| Capítulo | Núcleo y ancla | Ilustración posterior o de museo | Imagen de contexto / precaución |
|---|---|---|---|
| I.6 | Escrutinio; DQ.P1.C06.SG01 | DQ.IL.0021; ficha DQ.MUS.0001 | DQ.MED.900013 antes de pregunta solo después de comprobar que no adelanta solución |
| I.8 | Molinos: DQ.P1.C08.P0005–P0006, SG03; frailes: P0007, SG04 | DQ.IL.0026–0027 y 0029; fichas DQ.MUS.0002–0003 | DQ.MED.900005 es «pre» pero **muestra molinos** y puede resolver la pregunta; DQ.MED.900006 es post |
| I.11 | Cena P0003/SG02 y Edad de Oro P0001–P0002/SG03 | DQ.IL.0034–0035; ficha DQ.MUS.0004 | DQ.MED.900007; no presentar argumento de la Edad de Oro como crónica histórica |
| I.18 | Carga SG03 y examen de muelas P0002/SG05 | DQ.IL.0057–0058; ficha DQ.MUS.0005 | DQ.MED.900008 contiene rebaños: revisión por pregunta obligatoria |
| II.1 | Visita del cura y barbero P0001/SG01 | DQ.IL.0170; ficha DQ.MUS.0006 | DQ.MED.900029; no adjudicar representaciones a personas históricas |
| II.74 | Enfermedad, confesión, muerte y epitafio: SG01–SG05; P0001 y P0003 | DQ.IL.0371–0373; ficha DQ.MUS.0007 | DQ.MED.900011 siempre post; bloquear spoilers hasta el desenlace |

**Revelación narrativa:** usar, cuando resulte pertinente, la recreación previa para vivir la escena y la acuarela como comparación iconográfica **posterior**; un estado «pre» del manifiesto no equivale a garantía anti-spoiler. Los primeros planos de assets/closeups acompañarán solo reacciones y beats concretos tras su anclaje emocional al texto, no la documentación histórica ni la colección de retratos de personajes reales.

**Relatos dentro de relatos:** DQ.IL.0113 (*El curioso impertinente*, I.34) y DQ.IL.0126 (relato del cautivo, I.40) deben etiquetarse como historias intercaladas. No registrarlas como acciones vividas por el hidalgo ni agregarlas automáticamente a su trayecto en el atlas.

## 6. Atlas: únicamente relaciones justificables

| Candidato y referencia | Tipo de vínculo permitido | Exclusión o incertidumbre |
|---|---|---|
| Molinos I.8 — DQ.IL.0026/0029, DQ.MED.900005 | Episodio literario de molinos; DQ.LOC.0004 **solo como propuesta de localización discutida** | No presentar Consuegra, sus molinos ni un punto de combate como ubicación textual probada; el capítulo no da el lugar exacto |
| La Mancha / Campo de Montiel, I.8 | Región narrativa; DQ.LOC.0001/0002 como contexto en el catálogo piloto | Sus centroides aproximados no son coordenadas del episodio |
| Sierra Morena I.23 — DQ.IL.0072 | Región/topónimo textual identificable, sin itinerario definido en esta tarea | No calcular ruta ni atribuir un escenario ilustrado a un monte concreto |
| Argel I.40 — DQ.IL.0126 | Lugar nombrado en un **relato intercalado** | No es parada de los viajes de Quijote y Sancho |
| El Toboso II.10 — DQ.IL.0191 / DQ.MED.900019 | Topónimo literario; evaluar extensión de capítulos de DQ.LOC.0003 | No afirmar ubicación exacta de la escena ni identidad real de Dulcinea |
| Barcelona II.61 y II.64 — DQ.IL.0335/0346, DQ.MED.900010/900153 | Ciudad textual explícita; entidad GIS por crear o validar | El grabado de 1905 no autentica el aspecto de la ciudad en 1615; no fijar la playa exacta del duelo |
| QBI 10485, Gorchs 1859 — R16-068 | **Mapa histórico como pieza de recepción** (ficha, interpretación, tradición cartográfica) | No importar geometría al atlas de hechos; no usar el fichero QBI ni subirlo a Git sin permiso individual |

**Umbral de publicación atlas:** lugar/entidad existente + fuente textual pertinente + certeza geográfica y precisión explícitas + licencia de imagen + revisión GIS. Si falta cualquiera, ofrecer ficha literaria sin pin, o no ofrecer enlace. No construir un trazado «definitivo» por interpolar imágenes o mapas de ediciones antiguas.

## 7. Autoría, procedencia y restricciones de derechos

La evaluación debe distinguir **tres actos independientes**: consulta/uso personal, almacenamiento en Git privado, y redistribución pública o empaquetado para terceros. **Una autorización del propietario para trabajar con un libro no confiere derechos de tercero**. Tampoco son equivalentes el dominio público de las composiciones de Doré y una licencia válida sobre la acuarela, la edición digital o el fichero fotográfico concreto.

| Clase | Atribución y fuente | Uso personal | Git remoto | Redistribución |
|---|---|---|---|---|
| Acuarelas DQ.IL | Salvador Tusell, **atribución editorial** sobre Gustave Doré; edición Tasso (1905); JPG del EPUB Epublibre/Titivillus (2024) | Uso interno autorizado según expediente del proyecto | **Ya presentes** en repo privado por orden del propietario (2026-11-05); no volver a cargar ni extender permiso | **BLOQUEADA** hasta documentar fecha de muerte Tusell, procedencia de cada lámina y condiciones de los JPG del EPUB |
| Decorativos DQ.DEC | Autor gráfico concreto desconocido; paratexto de EPUB | Consulta interna con cautela | Ya existentes; sin nuevas subidas | **BLOQUEADA** hasta identificación de autor, datación y condiciones del fichero |
| Recreaciones DQ.MED | OpenAI ImageGen, 2026, generación para este proyecto | Uso interno del proyecto | WebP presentes en Git, descritos por manifiesto | **Revisar** condiciones aplicables, elementos de terceros, continuidad y revisión editorial antes de otra distribución |
| Mapa QBI 10485 | Antonio Rodríguez según ficha QBI; inscripción menciona «Manuel Antº. Rodríg[uez]» y a Juan Antonio Pellicer | Consulta y posible copia personal **solo** bajo marco legal y condiciones concretas | **NO AUTORIZADO** subir binario al remoto | **BLOQUEADA** sin permiso específico o digitalización alternativa con licencia demostrada |
| Facsímil BVPB registro 463832 | Digitalización institucional de edición Tasso 1905, ficha con aviso CC BY | Verificar condiciones concretas | **Ningún fichero BVPB añadido por R16** | Su licencia no se traslada automáticamente a JPG del EPUB con hash diferente |

El **BOE, art. 26 y disposición transitoria cuarta** regulan la duración y la transición aplicable a autores fallecidos antes del 7-12-1987; **sin fecha de muerte comprobada de Salvador Tusell no se puede cerrar el cómputo español**. No declarar «dominio público universal» de las acuarelas. El registro BVPB muestra «CC BY» para su copia institucional, no automáticamente para la procedencia Epublibre. La BVMC permite uso personal bajo condiciones y **no concede por ello licencia general de difusión online**: https://www.cervantesvirtual.com/marco-legal/ (apartado 5).

**Créditos provisionales (si el uso interno llegase a activarse):**
- Acuarela: «Salvador Tusell (atrib.), sobre composición de Gustave Doré; edición Luis Tasso, Barcelona, 1905; fichero procedente de EPUB Epublibre/Titivillus, 2024. Derechos de redistribución pendientes».
- Recreación: «Recreación artística generada con IA para EL QUIJOTE, 2026. No representa evidencia histórica».
- Mapa: «Antonio Rodríguez (según QBI), grabado de edición Tomás Gorchs, Barcelona, 1859; cartografía interpretativa, no ruta probada. Ficha BVMC/QBI 10485».

**Advertencia sobre atribuciones:** la ficha QBI cataloga a Antonio Rodríguez, mientras que la inscripción publicada incorpora el nombre abreviado Manuel Antº. Rodríguez. Este dato se deja visible como **discrepancia de atribución/lectura por investigar**, sin resolverla por conjetura.

## 8. Matriz CSV y contrato con Desarrollo

Se entrega un CSV UTF-8, cabecera y **68 filas**, con identificador de propuesta **R16-001…R16-068**. Campos de trazabilidad: recurso_id_origen, media_id_canonico (solo si **ya existe** en content/piloto/media_assets), archivo_o_url, hash_sha256 **tomado del manifiesto y NO recalculado**, categoria_visual, descripcion_fuente, capitulo_colocacion_epub, capitulo_propuesto, tema_museo, funcion_cultural, politica_visibilidad, pasaje_id_verificado, segmento_o_ancla, atlas_relacion, certeza_geografica, fuente_justificativa, atribucion, procedencia, derechos_uso_personal, derechos_git, derechos_redistribucion, estado_revision, riesgo_spoiler, notas_curatoriales, prioridad y fecha_revision.

- **IDs sin suposición:** DQ.IL.* y DQ.DEC.* son identificadores originales del inventario, no IDs canónicos MediaAsset; DQ.MED.* son candidatos del manifiesto de escenas; los existentes DQ.MA.* se muestran **solo** cuando hay registro real en el paquete del piloto. Las propuestas R16-* no sustituyen IDs de catálogo ni autorizan alta de nuevos recursos.
- **No publicar CSV como catálogo visible:** es una **lista de trabajo**; no modificar content/piloto ni schemas por su mera existencia. Cualquier nuevo MediaAsset necesita esquema, source/license y revisión conjunta de Contenidos + Desarrollo.
- **Integración deseada:** resolver por ID y no por ruta hardcodeada, validar URI y hash contra fichero real, ligar a Passage de edición visible, aplicar spoiler policy, estado de derechos y alternativa textual de accesibilidad. El QBI 10485 será exclusivamente enlace/cita documental hasta obtener binario y permiso.
- **Política de incertidumbre:** un campo vacío de pasaje/lugar/permiso significa pendiente, nunca «aprobado por defecto».

## 9. QA ejecutado, no ejecutado y backlog de validación

**Comprobado al preparar la propuesta:**
1. Existencia de los dos manifiestos de la edición ilustrada y de los manifiestos de escenas/primeros planos.
2. Índices originales: 376 acuarelas, 39 editoriales; escenas: 253 entradas; primeros planos: 10.
3. Selección de **68 recursos**, de los que **22 P1**; 46 ilustraciones, 18 recreaciones, 2 piezas editoriales, 1 cubierta como documento de edición y 1 mapa histórico conocido por su ficha.
4. **16 registros con Passage ID realmente presente** en la documentación de content/piloto/passages; vínculos restantes de capítulo/segmento como candidatos; **27 referencias canónicas MediaAsset preexistentes**. Estos números miden trazabilidad parcial, NO aprobación de sus usos.
5. Manifiestos originales no alterados; propuesta sin imagen nueva y sin código para museo/atlas.

**No realizado y expresamente no certificado:** inspección ocular comparada de las 68 imágenes, revisión humana por historiador/filólogo/abogado, cotejo individual de todos los derechos, verificación de hashes recalculados sobre bytes binarios, importación en lector real, validación de contraste/alt con lectores de pantalla, prueba funcional offline ni aprobación de mapas. No afirmar que el CSV supera los validadores de catálogo: **aún no forma parte de un esquema de producción**.

**Backlog obligatorio antes de activar cada vínculo:**
1. **Curaduría/filología:** cotejar imagen y alt con el texto, localizar fragmento exacto del EPUB visible y registrar equivalencia PG, revisar spoilers/relato intercalado (P1 sobre seis capítulos primero).
2. **Patrimonio/historia:** contrastar indumentaria, técnicas, objetos y costumbres con fuentes institucionales **individuales**; si no hay soporte, redactar solo lo que la novela o la ilustración muestran.
3. **Derechos:** completar expediente Tusell; para cada decorativo datar y atribuir; para QBI conseguir permiso individual o usar metadatos sin binario.
4. **GIS:** validar entidad, precisión y certeza; Barcelona y Sierra Morena requieren sus fichas formales; molinos sin ubicación fijada; rutas históricas solo como hipótesis identificada.
5. **Desarrollo + QA:** decidir contrato de importación de vínculos (sin tocar schemas en R16), verificar uso de IDs canónicos, no filtración de imágenes prohibidas, vínculo bidireccional lector/museo/atlas, accesibilidad y uso offline.
6. **Coordinación:** registrar firma/revisión de los roles que efectivamente participen y conservar versión/fecha/fuente de cada autorización.

## 10. Criterios de cierre del encargo R16

- **Entregado:** plan curatorial, agrupaciones temáticas, CSV con propuesta imagen→capítulo/tema→función→fuente→atribución→derechos, distinción entre cinco clases (cuatro requeridas y paratexto adicional), prioridad, cautelas geográficas, política de spoilers y registro de pendientes.
- **No entregado deliberadamente:** ilustraciones nuevas, datos GIS publicables, nuevas fichas de museo implementadas, binarios QBI, permisos pendientes, cambios a manifiestos originales o app.
- **GO de integración:** únicamente filas con cotejo textual de la edición mostrada, revisión visual y documental, archivo presente si corresponde, estado jurídico compatible y validación editorial/técnica. **Hasta ese GO, esta selección es una recomendación trazable, no contenido listo para el usuario final.**

---

**Fuentes internas:** docs/ENCARGO_MAESTRO.md §§2.4–2.5 y 4.5–4.7; docs/EXPEDIENTE_MUSEO.md; docs/CATALOGO_NECESIDADES_VISUALES.md; docs/USO_PRIVADO_Y_RECURSOS_QBI.md; docs/CONTENIDOS_QBI_INVENTARIO_0090_10485.md; docs/DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md; docs/RESOLUCION_PEND01_EDICION_REFERENCIA.md; docs/DC_IMG_001_ASIGNACION_INTEGRAL_ASSETS.md; assets/ilustraciones_tusell/manifests/*.csv|json; assets/scenes/manifest.json; assets/closeups/manifest.json; docs/data/piloto_segmentacion.json; content/piloto/passages/*.json. Las URLs institucionales figuran en §2 y §7.
