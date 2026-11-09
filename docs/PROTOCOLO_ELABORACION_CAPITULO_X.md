# Protocolo de elaboración de capítulo X — Aventura e Historia

**Estado:** metodología operativa reproducible; se aplica solo dentro de la fase autorizada y las decisiones vigentes. **Comando de activación:** «usa el protocolo de elaboración de capítulo X», sustituyendo X por la parte/capítulo deseados.

**Fuente y destino únicos:** `https://github.com/JavierRB35/El_Quijote_App`, rama `main`. **Caso de referencia:** Primera parte, capítulo I (2026-11-09), Aventura 5 rondas, Historia 11 escenas y 25 intervenciones, 8 fotogramas nuevos con aprobación visual del propietario. Los resultados no acreditan QA visual de interfaz ni autorización de Fase 2.

## 0. Puerta de entrada antes de cualquier elaboración

1. Comprobar SHA HEAD de `main`; leer `AGENTS.md`, directriz ágil, `VISION_Y_DECISIONES.md`, `ENCARGO_MAESTRO.md`, flujo DC-30, normas editoriales DC-31, cumplimiento DC-32, origen/destino DC-33 y protocolo DC-35 de imágenes. Consultar contratos, esquema, código y QA vigentes del módulo.
2. Confirmar que el capítulo está dentro del **alcance/fase autorizados**; no crear por una orden genérica una ampliación a Fase 2.
3. Usar como única fuente literaria para producción nueva `content/textos/gutenberg_2000/El_Quijote.txt`. Localizar parte, capítulo, líneas/anclas; distinguir **cita literal**, **adaptación fiel** y **decisión plástica no documentada**.

## 1. Coordinador del capítulo — primero Aventura

1. Delimitar hechos significativos y su orden en Cervantes. Proponer rondas de **anticipación de la acción inmediata**, jamás preguntas de examen ni historias alternativas. Por ronda: contexto previo sin spoiler, personaje, tres acciones verosímiles, una sola canónica, consecuencia, explicación breve, pasaje ID **solo cuando el archivo físico existente cubra realmente el hecho**; para otros casos, `pasajeId:null` y declarar pendiente con localización de líneas en dossier.
2. Revisar `assets/scenes/part_*/chapter_*/`, su `manifest.json`, primeros planos y solo secundariamente acuarelas. Comprobar bytes, capítulo, fase `pre/post`, continuidad y aprobación. **Cada ronda requiere preimagen diferente**, sin revelar el hecho; consecuencia solo después de «Descubrir qué sucede».
3. Entregar al propietario tabla de rondas → imagen previa → posterior → existente/apta/faltante → razón. El propietario confirma carencias; preparar los **prompts exactos solo para imágenes faltantes**, agrupados en un encargo si así lo pide. Nada se genera por iniciativa del coordinador.
4. El artista recibe por imagen: referencia DC-31, momento único, descripción narrativa comprobable, formato 1672×941 WebP, cine realista premium, continuidad, composición y región para texto, exclusiones antiespoiler, alt y QA objetivo. Evitar personajes posteriores, anacronismos y detalles inventados presentados como hechos.
5. El propietario revisa/acepta los WebP y ordena catalogación e integración. **Aplicar DC-35**, validar los originales/hashes, licencias, catálogo/IDs y SHA final de `main`; la aprobación visual no autoriza activar la ronda ni acredita DC-28. No usar un nombre de fichero como prueba de su existencia.

## 2. Coordinador — después Modo Historia

1. Crear guion audiovisual **condensado** con las escenas y beats precisos en orden original, sin fabricar sucesos ni prolongarlo como lector íntegro. Identificar narrador/personajes, humor y condensaciones justificadas.
2. Cada intervención posee texto íntegro, hablante y `CITA_LITERAL` o `ADAPTACION_FIEL`; `TS-001`: visible también en mute/sin audio, con pausa/repetición/retroceso, sin truncado ni scroll interno en paneles sobre imagen.
3. Cruzar cada intervención con las imágenes aprobadas de Aventura, las `assets/scenes` pertinentes y los `assets/closeups`. No reutilizar con spoiler cronológico ni colocar postimagen antes de su consecuencia. Registrar carencias de Historia **aparte**; pedir al propietario confirmación y elaborar nuevos prompts únicamente tras esa decisión.
4. Repetir integración DC-35 para las imágenes aprobadas, con referencias y metadatos; antes de activar, comprobar montaje y zonas seguras por escena. No aprobar biblioteca, closeups u otros recursos en borrador de forma implícita.

## 3. Desarrollador — ejecución posterior al trabajo del coordinador

**Base fija de pantallas reutilizables; SOLO cambian catálogos, textos y referencias visuales.**

- `app/src/aventura/AventuraNarrativa.tsx`: pantalla única; `motorNarrativo.ts`: estado, puntos, consecuencia y checkpoints; `content/aventura/parte_*/capitulo_*.json`: ronda por capítulo (DC-34). No incrustar textos/opciones en TSX.
- `app/src/historia/ReproductorHistoria.tsx`: reproductor único; `content/historia/parte_*/capitulo_*.json`: escenas, intervenciones y selección de plano. El adaptador genérico conecta ambos con los recursos **existentes y aprobados** del manifiesto sin crear fichas MediaAsset canónicas ficticias.
- `app/src/capitulos/registro.ts`: catálogo declarativo de capítulos disponibles en la **fase autorizada**. Agregar un capítulo implica añadir su ficha al registro, no copiar pantallas.
- Progreso Historia y Aventura separado **por episodio y modo**, preservando el guardado v2 del piloto I.8; invalidar restauraciones de capítulos ajenos o partidas corruptas. Offline y accesibilidad permanecen obligatorios.
- En Historia la imagen ocupa un panel propio sin recorte esencial y el texto completo su panel editorial. DC-28 prohíbe scroll interno en cuadros sobre imagen. Si un viewport no permite lectura íntegra con imagen, usar presentación editorial separada y registrar QA, no esconder texto ni disminuirlo ilegiblemente.
- Validar esquema y rutas; test de 5 rondas, 25 intervenciones, imágenes físicas existentes y orden de spoilers; ejecutar build, tests, checks Rust y QA con capturas 1920×1080, 1366×768, 1280×800, texto ampliado, mute, teclado y movimiento reducido. **Nunca afirmar PASS no ejecutado**.
- Git: riesgo bajo → directo a `main`; cambios de varios motores/persistencia → rama y PR, CI y fusión verificable sin force-push (DC-29). No es «terminado» hasta HEAD `main`, commit, rutas, controles reales y pendientes comunicados.

## 4. Cierre de coordinador y fórmula para futuros capítulos

Informar en una tabla compacta: capítulo y fuente → rondas y decisiones → escenas/intervenciones → inventario con `EXISTE/APROBADA/QA PENDIENTE/FALTA` → prompts solicitados → assets incorporados con hashes/IDs → rutas JSON, versión → pruebas y capturas → SHA final `main` → impedimentos.

**En I.1:** ocho imágenes nuevas aprobadas y presentes en `assets/scenes/part_1/chapter_01/` (cinco de Aventura + H01/H04/H07 de Historia); la biblioteca antigua sigue en `borrador` y queda fuera de la activación. La continuidad exige no mostrar Sancho, molinos o la salida del capítulo II. R01–R05 tienen cinco preimágenes diferentes; H07 exhibe primero la rotura y después la celada rehecha. Cotejo literario de I.1 líneas 1072–1228. Catálogos del capítulo registrados como `piloto_integrado` de **integración técnica**, con `revision_visual:pendiente` hasta QA real; nunca equivalen a aprobación artística de toda la interfaz.

**Orden reutilizable:** «Usa el protocolo de elaboración de capítulo X. Consulta `main` actual; coordina Aventura→inventario→prompts y aceptación del propietario→Historia→reuse/arte faltante→datos JSON→ejecución de las pantallas genéricas→pruebas y CI→integración en `main`, con SHA final y guía de arranque». El coordinador no da por aprobadas imágenes ni fases no expresamente autorizadas.
