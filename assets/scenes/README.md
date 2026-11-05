# Catálogo de escenas — piloto visual v0.5

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

Por petición expresa del propietario, los **WebP optimizados de este piloto** se almacenan en Git normal (59 archivos en total); los PNG maestros de mayor tamaño permanecen fuera del repositorio y se entregan en ZIPs independientes por batería. Esta excepción está recogida en `.gitignore` y `docs/GOBERNANZA_GIT.md`. Las baterías tercera, cuarta y quinta se incorporaron directamente a `main` por autorización expresa, mediante commits comprobados y sin abrir ramas o PR específicos. Esto no modifica automáticamente la política de integración de otros cambios del proyecto.

**Historial del catálogo:** v0.1, 11 imágenes (10 escenas más referencia); v0.2, 12 escenas nuevas; v0.3, 12 escenas nuevas; v0.4, 12 escenas nuevas; v0.5, 12 escenas nuevas (6 de cada parte) en capítulos no ilustrados anteriormente, conservando IDs y hashes de los 47 recursos anteriores. El catálogo incluye escenas de relato intercalado (`p1_c33_*` y `p1_c41_*`) y narrador-marco (`p1_c09_*`), **que no deben confundirse con aventuras vividas por Don Quijote**. No se considera un catálogo editorial aprobado: la versión indica evolución del paquete artístico, no aprobación GO/NO-GO del videojuego.

Todos los archivos quedan en `editorial_review_pending` hasta que se cotejen los capítulos, la indumentaria, la arquitectura y los detalles de utilería. Las asociaciones con la novela no constituyen una edición textual ni justifican preguntas por sí mismas.
