# Protocolo de elaboración de capítulo X — Aventura e Historia

**Estado:** metodología operativa reproducible; se aplica solo dentro de la fase autorizada y las decisiones vigentes. **Comando de activación:** «usa el protocolo de elaboración de capítulo X», sustituyendo X por la parte/capítulo deseados.

**Precedencia actualizada, DC-36 (2026-11-10):** el orden de aptitud visual cambió por instrucción expresa del propietario: **Aventura (preguntas) → Historia (textos completos) → validación visual conjunta → prompts solo para carencias confirmadas → aceptación/integración/QA**. Esta regla prevalece sobre cualquier resumen histórico de DC-30 incompatible, sin alterar Fase 1, DC-28, TS-001, derechos ni DC-35. No confundir el inventario técnico inicial con un dictamen de aptitud.

**Fuente y destino únicos:** `https://github.com/JavierRB35/El_Quijote_App`, rama `main`. **Caso de referencia:** Primera parte, capítulo I (2026-11-09), Aventura 5 rondas, Historia 11 escenas y 25 intervenciones, 8 fotogramas nuevos con aprobación visual del propietario. Los resultados no acreditan QA visual de interfaz ni autorización de Fase 2.

## 0. Puerta de entrada antes de cualquier elaboración

1. Comprobar SHA HEAD de `main`; leer `AGENTS.md`, directriz ágil, `VISION_Y_DECISIONES.md`, `ENCARGO_MAESTRO.md`, flujo DC-30, normas editoriales DC-31, cumplimiento DC-32, origen/destino DC-33 y protocolo DC-35 de imágenes. Consultar contratos, esquema, código y QA vigentes del módulo.
2. Confirmar que el capítulo está dentro del **alcance/fase autorizados**; no crear por una orden genérica una ampliación a Fase 2.
3. Usar como única fuente literaria para producción nueva `content/textos/gutenberg_2000/El_Quijote.txt`. Localizar parte, capítulo, líneas/anclas; distinguir **cita literal**, **adaptación fiel** y **decisión plástica no documentada**.

## 1. Coordinador del capítulo — Aventura PRIMERO (DC-36)

1. Delimitar hechos significativos y orden canónico en Cervantes. Definir, como **propuestas candidatas**, las rondas de anticipación de acciones inmediatas, nunca exámenes ni historias alternativas: contexto previo, personaje, tres opciones verosímiles, una canónica inequívoca, consecuencia oculta hasta «Descubrir qué sucede», referencia DC-31 y pasajeId solo cuando exista una ficha física que cubra el hecho. No inventar IDs ni usar personajes posteriores.
2. Consultar **preliminarmente** `assets/scenes/part_*/chapter_*/`, manifiestos, closeups y acuarelas para **localizar** recursos; comprobar si los nombres de archivo existen, su revisión y licencias. **No declarar todavía que son imágenes aptas para preguntas o Historia**: la aptitud depende de las preguntas y textos completos de ambos modos. Mantener preimagen propia, cronología sin spoilers y consecuencia solo tras revelación.
3. Presentar primero al propietario las rondas completas y los instantes de imagen previa y posterior necesarios, **sin redactar prompts artísticos ni marcar FALTA_CONFIRMADA todavía**.

## 2. Coordinador del capítulo — Historia DESPUÉS DE LAS PREGUNTAS y ANTES DEL DICTAMEN VISUAL (DC-36)

1. Elaborar guion audiovisual condensado y fiel al orden del capítulo, con escenas, beats y anclas del corpus, sin inventar hechos ni prolongarlo como lector íntegro. Mantener humor, causalidad y condensaciones motivadas.
2. Cada intervención ha de contener texto **íntegro**, hablante y clasificación `CITA_LITERAL` o `ADAPTACION_FIEL`. **TS-001**: visible y legible también sin audio/mute, con pausa/repetición/retroceso, sin truncado ni scroll interno en cuadros sobre imagen (DC-28).
3. Proponer la función visual de cada beat de Historia **sin confundir localización técnica con aprobación artística**. Puede identificarse un recurso existente como candidato, siempre sujeto a adecuación literaria, orden, continuidad, licencia, composición y QA.
4. No activar ni incorporar aún datos a los reproductores; primero se revisan editorialmente ambos modos y se completa la fase visual conjunta.

## 2 bis. Evaluación conjunta Aventura + Historia, y producción de arte bajo control del propietario

1. Solo cuando estén definidas las **preguntas, opciones, consecuencias y textos de Historia**, cruzar cada instante con el inventario de escenas, closeups y, secundariamente, acuarelas. Registrar `EXISTE_Y_APROBADA`, `EXISTE_PENDIENTE_REVISION`, `NO_APTA` y `FALTA_CONFIRMADA` de forma precisa por **modo y uso**. En Aventura una imagen del hecho no basta si su composición no deja sitio a pregunta y opciones.
2. **Norma visual ya vigente:** Aventura coloca preferentemente el peso de la escena a la **izquierda** y reserva zona segura para el panel editorial a la **derecha**, tal y como consta en `docs/DIRECCION_ARTISTICA_PILOTO.md` (§ Cámara e interfaz), `docs/REGLAS_MODO_AVENTURA_V2_2026-11-08.md` (§5), y DC-28. No desplazar rostros o acciones, introducir scroll interno, truncar texto, recortar arte ni presentar como apta una imagen cuyo panel no cabe. Historia mantiene TS-001 y exige varios planos narrativamente pertinentes.
3. Entregar al propietario una **matriz cruzada de Aventura (ronda/pre/post) y de Historia (beat)** con recurso real, compatibilidad visual, ancla literaria, antiespoiler, estado de catálogo, propuesta de reutilización y huecos. Su revisión es la que establece qué carencias están confirmadas; no inventar ausencia por no encontrar un archivo con cierto nombre.
4. **Solo para cada imagen realmente faltante confirmada por el propietario**, redactar un prompt independiente listo para arte: ancla exacta DC-31, instante antes/después, personajes, utilería, fuente/decisiones plásticas no especificadas, **1672×941 WebP**, cine realista premium, continuidad de personajes/época, composición y zona segura de pregunta, antiespoilers, accesibilidad, alt, procedencia y QA objetivo. No generar imágenes por iniciativa del coordinador.
5. El propietario solicita y valida el arte nuevo y autoriza la aceptación e integración del conjunto identificado. Ejecutar DC-35 con los **bytes reales** y SHA-256, metadatos, licencias, manifiesto y commit final verificado en `main`; una aprobación visual no equivale a activar ronda ni certifica DC-28.
6. Las reutilizaciones entre Aventura e Historia requieren **mismo hecho e instante**, sin spoilers, y cada pregunta final mantiene su **preimagen exclusiva**. No asignar un post de Historia a una pregunta si el propietario ha descartado ese medio por composición.

## 3. Desarrollador — ejecución posterior al trabajo del coordinador

**Base fija de pantallas reutilizables; SOLO cambian catálogos, textos y referencias visuales.**

- `app/src/aventura/AventuraNarrativa.tsx`: pantalla única; `motorNarrativo.ts`: estado, puntos, consecuencia y checkpoints; `content/aventura/parte_*/capitulo_*.json`: ronda por capítulo (DC-34). No incrustar textos/opciones en TSX.
- `app/src/historia/ReproductorHistoria.tsx`: reproductor único; `content/historia/parte_*/capitulo_*.json`: escenas, intervenciones y selección de plano. El adaptador genérico conecta ambos con los recursos **existentes y aprobados** del manifiesto sin crear fichas MediaAsset canónicas ficticias.
- `app/src/capitulos/registro.ts`: catálogo declarativo de capítulos disponibles en la **fase autorizada**. Agregar un capítulo implica añadir su ficha al registro, no copiar pantallas.
- Progreso Historia y Aventura separado **por episodio y modo**, preservando el guardado v2 del piloto I.8; invalidar restauraciones de capítulos ajenos o partidas corruptas. Offline y accesibilidad permanecen obligatorios.
- En Historia la imagen ocupa un panel propio sin recorte esencial y el texto completo su panel editorial. DC-28 prohíbe scroll interno en cuadros sobre imagen. Si un viewport no permite lectura íntegra con imagen, usar presentación editorial separada y registrar QA, no esconder texto ni disminuirlo ilegiblemente.
- Validar esquema y rutas; probar el número **real** de rondas e intervenciones del capítulo (I.1 tuvo 5/25, pero no es una cuota), imágenes físicas existentes y orden de spoilers; ejecutar build, tests, checks Rust y QA con capturas 1920×1080, 1366×768, 1280×800, texto ampliado, mute, teclado y movimiento reducido. **Nunca afirmar PASS no ejecutado**.
- Git: riesgo bajo → directo a `main`; cambios de varios motores/persistencia → rama y PR, CI y fusión verificable sin force-push (DC-29). No es «terminado» hasta HEAD `main`, commit, rutas, controles reales y pendientes comunicados.

## 4. Cierre de coordinador y fórmula para futuros capítulos

Informar en una tabla compacta: capítulo y fuente → rondas y decisiones → escenas/intervenciones → inventario con `EXISTE/APROBADA/QA PENDIENTE/FALTA` → prompts solicitados → assets incorporados con hashes/IDs → rutas JSON, versión → pruebas y capturas → SHA final `main` → impedimentos.

**En I.1:** ocho imágenes nuevas aprobadas y presentes en `assets/scenes/part_1/chapter_01/` (cinco de Aventura + H01/H04/H07 de Historia); la biblioteca antigua sigue en `borrador` y queda fuera de la activación. La continuidad exige no mostrar Sancho, molinos o la salida del capítulo II. R01–R05 tienen cinco preimágenes diferentes; H07 exhibe primero la rotura y después la celada rehecha. Cotejo literario de I.1 líneas 1072–1228. Catálogos del capítulo registrados como `piloto_integrado` de **integración técnica**, con `revision_visual:pendiente` hasta QA real; nunca equivalen a aprobación artística de toda la interfaz.

**Orden reutilizable vigente (DC-36):** «Usa el protocolo de elaboración de capítulo X. Consulta `main` actual; prepara las preguntas y consecuencias de Aventura → redacta escenas/intervenciones completas de Historia → audita conjuntamente el inventario y entrega al propietario la matriz de aptitud visual por modo → redacta prompts solo de carencias confirmadas → incorpora arte expresamente aprobado con DC-35 → datos JSON y pantallas genéricas autorizadas → pruebas, CI e integración verificable en `main`, con SHA final». El coordinador no da por aprobadas imágenes ni fases no expresamente autorizadas.
