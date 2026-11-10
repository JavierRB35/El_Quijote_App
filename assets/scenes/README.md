# Catálogo de escenas — piloto visual v0.10

Las imágenes de este directorio son **recreaciones originales generadas con IA** para el videojuego *El Quijote*. Su lenguaje visual sigue el encargo maestro: realismo cinematográfico con influencias pictóricas, España de comienzos del siglo XVII, profundidad para un tratamiento 2.5D, personajes consistentes e interfaz discreta.

## Convenciones

- `part_1/chapter_XX/` y `part_2/chapter_XX/`: asociación **provisional** con parte y capítulo de la novela.
- `p1_c08_molinos_pre.webp`: imagen **anterior** al desenlace del episodio; `*_post.webp`: imagen **posterior**, que puede revelarlo.
- `_art_direction/personajes_referencia.webp`: referencia de continuidad, no escena de un pasaje concreto.
- `manifest.json`: origen, uso previsto, alertas de spoilers, texto alternativo y ruta relativa de cada imagen. El consumidor debe resolver las rutas respecto de la raíz del repositorio.
- `candidate_media_id`: identificador reservado **solo para este piloto** conforme al patrón `DQ.MED.######` del contrato editorial-técnico actual. Aún **no** es un registro `MediaAsset` validado: faltan referencias de fuente/licencia formales, URI lógica y conformidad con el esquema definitivo.

## Uso e integración

1. Leer `manifest.json` y cargar recursos por ID estable; no codificar rutas o nombres en los componentes de React.
2. No mostrar escenas `post` antes de que el jugador conozca el resultado. La marca `pre` **no garantiza** que cualquier pregunta pueda emplearla: el editor debe verificar las opciones concretas y que la imagen no adelante la solución.
3. En la interfaz, mostrar `RECREACIÓN ARTÍSTICA · IA`, separándola visual y semánticamente de fotografía patrimonial, ilustración histórica o documento de archivo.
4. Todas las escenas son **imágenes únicas** listas para cámara sutil (zoom/pan), *no* capas de parallax recortadas. Si se necesitan capas, se solicitará una producción artística separada y se medirá su rendimiento.
5. Mantener texto, subtítulos, preguntas, hotspots, créditos y controles en capas de interfaz accesibles, nunca incrustados en la imagen. Las áreas seguras propuestas deben comprobarse visualmente a distintos tamaños y con subtítulos.
6. Cargar WebP offline con `loading` adecuado; conservar el PNG maestro en el ZIP de entrega, no duplicarlo necesariamente en Git.

## Procedencia y derechos

Este piloto no incorpora ninguna de las acuarelas del EPUB ilustrado por Salvador Tusell ni imágenes de Gustave Doré. Atribución: **recreación artística generada mediante OpenAI ImageGen, noviembre de 2026, a petición del propietario del proyecto**. La obra literaria es la referencia temática, no un origen de píxeles. No se otorga licencia CC0 ni se afirma un permiso sobre obras de terceros. Revisar condiciones aplicables si cambia el ámbito personal del proyecto.

Por petición expresa del propietario, los **WebP optimizados de este piloto** se almacenan en Git normal (103 archivos en total); los PNG maestros de mayor tamaño permanecen fuera del repositorio y se entregan en ZIPs independientes por batería. Esta excepción está recogida en `.gitignore` y `docs/GOBERNANZA_GIT.md`. Las baterías tercera, cuarta y quinta se incorporaron directamente a `main` por autorización expresa, mediante commits comprobados y sin abrir ramas o PR específicos. Esto no modifica automáticamente la política de integración de otros cambios del proyecto.

**Historial del catálogo:** v0.1, 11 imágenes (10 escenas más referencia); v0.2, 12 escenas nuevas; v0.3, 12 escenas nuevas; v0.4, 12 escenas nuevas; v0.5, 12 escenas nuevas (6 de cada parte) en capítulos no ilustrados anteriormente, conservando IDs y hashes de los 47 recursos anteriores. El catálogo incluye escenas de relato intercalado (`p1_c33_*` y `p1_c41_*`) y narrador-marco (`p1_c09_*`), **que no deben confundirse con aventuras vividas por Don Quijote**. No se considera un catálogo editorial aprobado: la versión indica evolución del paquete artístico, no aprobación GO/NO-GO del videojuego.

Salvo los cinco recursos aprobados expresamente el 2026-11-09, los demás archivos quedan en `editorial_review_pending` hasta que se cotejen los capítulos, la indumentaria, la arquitectura y los detalles de utilería. Las asociaciones con la novela no constituyen una edición textual ni justifican preguntas por sí mismas.

**Batería sexta (2026-11-06):** seis nuevas escenas `pre`, en capítulos I.4, I.12, I.27, II.4, II.14 y II.43 antes no representados por recreaciones propias; 65 recursos en total. Se conservan los 59 anteriores sin alteración. Pendiente de validación editorial.

**Batería séptima (2026-11-06):** seis escenas `pre` adicionales de capítulos I.10, I.13, I.15, II.12, II.31 y II.51, inéditos en el catálogo de recreaciones hasta esta tanda; colección total de 71 recursos, con 65 anteriores intactos. Pendiente de aprobación editorial.

**Batería octava (2026-11-06):** seis nuevas escenas `pre` para capítulos I.26, I.32, I.40, II.16, II.27 y II.38 sin recreación anterior. Inventario total de 77 recursos (71 previos intactos). La escena de I.40 corresponde a un relato intercalado; no atribuirla como experiencia directa de don Quijote. Pendiente de revisión editorial.

**Batería novena (2026-11-06):** seis escenas `pre` de I.29, I.34, I.43, II.19, II.34 y II.48, todos capítulos sin recreación propia anterior. Se conservan los 77 recursos previos; inventario 83. I.34 pertenece a la novela intercalada *El curioso impertinente*, no a la trama de los protagonistas. Revisión editorial pendiente.

**Décima batería (2026-11-06):** 20 nuevas escenas en capítulos sin recreación propia previa: I.28, 31, 37, 39, 42, 44, 47, 48, 49, 50, 51; II.2, 5, 6, 7, 9, 15, 23, 24, 25. Total: **103 activos** (83 anteriores conservados). I.39 representa el relato intercalado del cautivo; II.15 y II.23 se catalogan `post` con spoiler alto. Pendiente de cotejo editorial individual.

**Duodécima batería (2026-11-06):** 50 nuevas recreaciones WebP de momentos narrativos diferentes, alternando estados `pre` y `post` y perspectivas complementarias; total **203 recursos visuales** (202 escenas y referencia). Las 153 entradas previas se conservan. Todas las nuevas escenas quedan pendientes de cotejo editorial individual.

## Capítulo I — cinco escenas aprobadas por el propietario (2026-11-09)

Se incorporan cinco WebP originales de 1672 × 941 px para Aventura R01/R03/R04/R05 y su reutilización pertinente en Historia, con continuidad visual, fases `pre`/`post`, pasajes de `DQ.ED.0003` / `DQ.SRC.0005`, textos alternativos y SHA-256 en `manifest.json`. El propietario los ha revisado y validado expresamente. Su registro **no activa** por sí mismo las rondas ni el montaje de Historia; queda pendiente el QA de integración y composición DC-28 / TS-001 en la aplicación. La aprobación de estos cinco recursos **no se extiende** al resto del inventario artístico.

## Capítulo I — tres escenas adicionales de Historia aprobadas (2026-11-09)

El propietario aprobó las imágenes específicas H01 (presentación), H04 (desvelo nocturno) y H07 (primera media celada de cartón rota); H01 utiliza su elección expresa, H07 distingue el cartón destruido del morrión original intacto, y H04 no materializa fantasías. Son tres archivos WebP originales derivados de las imágenes aprobadas, a 1672 × 941 px y calidad perceptual 82, catalogados en `manifest.json` como `DQ.MED.900259`–`DQ.MED.900261` con SHA-256 y autoría `recreacion_ia`. No modifican ni reemplazan el recurso de celada reforzada de Aventura. Uso previsto: Historia H01/H04/H07, con H07 exclusivamente tras la rotura narrada. Integración artística autorizada no significa activación del guion ni QA de composición DC-28 y TS-001 en pantalla: ambos continúan pendientes. El cotejo textual directo con el corpus Gutenberg del repositorio sigue pendiente por limitación de extracción del fichero extenso; pasajes documentados en el guion canónico de Historia.

## Capítulo II — R03: temor de las mujeres (aceptación 2026-11-10)

El propietario aceptó expresamente mediante el protocolo DC-35 la **imagen 2** del encargo artístico del capítulo II. Se incorpora un único WebP original (`p1_c02_r03_mujeres_temor_pre.webp`, 1672 × 941 px, calidad 82), con ID `DQ.MED.900262`, SHA-256, texto alternativo y trazabilidad en `manifest.json`. El pasaje se cotejó directamente con `content/textos/gutenberg_2000/El_Quijote.txt` (DQ.ED.0003 / DQ.SRC.0005), Primera parte, capítulo II, líneas 1325–1338: las dos mujeres se disponen a entrar en la venta ante el caballero armado, antes de que alce la visera y les hable. La escena no revela esa respuesta ni muestra a Sancho, el ventero o acciones posteriores. Las particularidades de vestuario, luz y arquitectura son recreaciones artísticas plausibles.

Uso editorial previsto: **Aventura R03, preimagen**; reutilizable en Historia antes del primer diálogo. Este alta no modifica ni activa por sí sola rondas ni guiones. Aprobación visual del archivo no certifica aún legibilidad de superposiciones o composición DC-28/TS-001 dentro de la aplicación; esas pruebas quedan pendientes. No afecta a la revisión de los demás activos del catálogo.

## Capítulo II — R02: aproximación a la venta (aceptación 2026-11-10)

El propietario aprobó expresamente mediante el protocolo DC-35 la **imagen 1** del encargo artístico del capítulo II, `p1_c02_r02_venta_llegada_pre.webp`, convertida del PNG original aprobado a WebP de 1672 × 941 px (calidad 82; 249.070 bytes), sin cambiar la composición. Se cataloga como `DQ.MED.900263` con SHA-256 y metadatos de procedencia en `manifest.json`. Pasaje verificado en `content/textos/gutenberg_2000/El_Quijote.txt`, `DQ.ED.0003` / `DQ.SRC.0005`, I.2, líneas 1305–1323. Representa a don Quijote montado en Rocinante aproximándose a una venta real al anochecer, con **dos mujeres** a la entrada, antes de que detenga las riendas; no hay ventero, porquero ni castillo sobrenatural. Arquitectura e iluminación específicas son recreaciones artísticas.

Uso previsto: **Aventura R02, preimagen antiespoiler**, con posible reutilización en Historia durante la llegada. La aprobación corresponde únicamente a este WebP y **no** modifica ni activa rondas, guiones o funcionalidad. La evaluación de composición DC-28/TS-001 y el QA de interfaz siguen pendientes.

## Capítulo II — R05: la cena imposible (aceptación 2026-11-10)

El propietario aprobó visualmente la **imagen 4** del encargo de Primera Parte, capítulo II, `p1_c02_r05_cena_sin_cana_pre.webp`, y solicitó su integración conforme a DC-35. Se incorpora como `DQ.MED.900264` (WebP original del lote aceptado, 1672 × 941 px, 182.170 bytes), sin sobrescribir imágenes existentes. El archivo tiene SHA-256 `f1f2ade765ea17e7a941cf99057405d5a9a7cb81db8da74f0508c1995f07a89c` y blob Git SHA-1 `1fc98e3e25b86a153205ac73008339c276dbbe09`. El PNG visualmente aprobado tiene SHA-256 `24dc53f2eb5289e2581d767217f96a231decc16860c79ca5c0828a59eaf543cf` y corresponde a la misma escena con diferencias de compresión WebP.

**Función:** Aventura R05, `pre` antiespoiler; posible reutilización en Historia durante la cena, **antes** de la solución del ventero para beber. Cotejo directo con el texto oficial `content/textos/gutenberg_2000/El_Quijote.txt` (`DQ.ED.0003` / `DQ.SRC.0005`), I.2, líneas 1433–1441: mesa a la puerta de la venta por el fresco, bacalao, pan oscuro, celada puesta **con la visera alzada**, mujer ayudando a comer y ventero aún sin horadar la caña. No se muestra el procedimiento de bebida ni intervenciones posteriores. La arquitectura, el vestuario, la luz del candil y el encuadre son recreaciones artísticas plausibles, no especificaciones literales de Cervantes.

**Estado:** aprobación visual específica del propietario; metadatos, procedencia, texto alternativo, derechos y hashes en `manifest.json`. **No implica activación de la ronda, del montaje de Historia ni publicación.** Pendiente QA de pantalla, composición DC-28/TS-001 y revisión de derechos para redistribución.
