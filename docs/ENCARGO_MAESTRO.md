# EL QUIJOTE — PROMPT MAESTRO DE PRODUCCIÓN EDITORIAL Y DESARROLLO

**Documento de encargo íntegro y compartido. Versión de especificación para auditoría y coordinación.**

**Repositorio GitHub verificado:** https://github.com/JavierRB35/El_Quijote_App — **JavierRB35/El_Quijote_App**, privado, rama predeterminada **main**. En la comprobación del 5 de noviembre de 2026 estaba **vacío**, sin estructura ni código previo. Si esta situación cambia, inspeccionar el contenido real y no sobrescribirlo. No confundirlo con otro proyecto del propietario.

## INSTRUCCIÓN DE USO — LÉELA ANTES DE ACTUAR

Este texto se entregará íntegramente, sin resumir, a dos agentes/equipos independientes que trabajarán sobre **el mismo repositorio Git**. Al invocar al agente, el propietario identificará expresamente uno de estos modos:

- **MODO CONTENIDOS:** investigación cervantina, fuentes, preguntas, geografía, patrimonio, licencias, catálogo audiovisual y dirección documental.
- **MODO DESARROLLO:** arquitectura, diseño de la aplicación, integración, seguridad, accesibilidad, pruebas y distribución.
- **MODO COORDINACIÓN/AUDITORÍA:** dirección de producto, contratos entre equipos, validación editorial-técnica y resolución documentada de dependencias.

El agente debe asumir **los perfiles profesionales que correspondan al modo asignado**, definidos a continuación, y hacerse responsable de sus entregables. Un mismo agente puede simular un equipo multidisciplinar, pero debe identificar qué especialidad avala cada conclusión; no debe fingir revisiones humanas realizadas por especialistas que no hayan intervenido realmente.

**Fase actual:** especificación integral y auditoría de viabilidad. **No iniciar la implementación del videojuego, no producir en masa el contenido ni subir paquetes de terceros al repositorio hasta que el propietario apruebe expresamente la especificación auditada y autorice la fase de ejecución.** Una vez aprobada, este mismo documento servirá de contrato de ejecución, con los ajustes aprobados. El trabajo de estudio, inventario, diseño documental, estimaciones y propuestas de esquema está autorizado; un piloto editorial o prototipo técnico requiere el permiso correspondiente si implica creación de contenido de producción o código.

**No reabrir decisiones ya tomadas por Julián.** Si aparecen contradicciones, distinguir entre acuerdo vinculante, propuesta histórica no aceptada y cuestión genuinamente pendiente. No someter al usuario a rondas repetitivas de preguntas. Agrupar únicamente las incertidumbres bloqueantes en un registro de decisiones y formular recomendaciones motivadas.

---

## 1. MISIÓN, FILOSOFÍA Y ALCANCE

Crear un **videojuego premium para PC basado en las dos partes completas de Don Quijote de la Mancha, de Miguel de Cervantes**, con equilibrio real entre **aventura narrativa interactiva, preguntas, atlas geográfico y museo histórico-literario**, y con un **cuaderno personal de investigador**.

El jugador será un **viajero-investigador**: acompañará y contemplará los acontecimientos de la novela, descubrirá qué ocurrió, por qué, cómo actuaron y reaccionaron los personajes, se encontrará con el humor y el ingenio cervantinos y ampliará su conocimiento de los lugares, las personas y la época. La experiencia deberá emocionar, entretener y sorprender; nunca debe sentirse como un examen escolar ni como una enciclopedia con botones.

El objetivo principal de la recompensa será **el descubrimiento cultural y narrativo**. Existirán puntuaciones y desafíos competitivos **opcionales**, nunca dominantes.

Principios obligatorios:

1. **Fidelidad:** no alterar el argumento ni atribuir a Cervantes frases, hechos o intenciones que no constan.
2. **Rigor y trazabilidad:** toda afirmación histórica, cita y pregunta debe estar respaldada por su fuente exacta.
3. **Entretenimiento:** humor, frases disparatadas, ironías y sorpresas presentes con frecuencia natural, integrados en la acción.
4. **Diseño premium:** identidad visual propia, limpia, elegante, cinematográfica y muy cuidada; mínimo esfuerzo cognitivo.
5. **Offline real:** instalación y juego completo sin acceso a internet; la IA en línea es una ampliación voluntaria.
6. **Respeto a la autonomía:** sin bloqueos punitivos por fallos, sin conexión obligatoria, sin cuentas remotas, sin actualizaciones impuestas.
7. **Propiedad de los datos:** varios perfiles locales y copias de seguridad seguras.
8. **Calidad sobre volumen:** no inflar preguntas, activos o funciones para alcanzar cifras artificiales.
9. **Separación de disciplinas:** los contenidos no deben depender de detalles internos de la interfaz y la interfaz no debe incorporar contenido editorial hardcodeado.

**Proyecto inicialmente personal, no destinado a distribución pública ni comercial.** Esta condición no equivale a una autorización universal para copiar, alojar o redistribuir material ajeno. Mantener arquitectura y trazabilidad que permitan una futura revisión de derechos si cambia el destino del proyecto, pero **no convertir la posibilidad de comercialización en un requisito actual**.

Público objetivo: **todos los públicos desde la adolescencia**. Lenguaje claro en explicaciones, respeto al original, varios niveles de profundidad y accesibilidad suficiente. Evitar infantilizar al público.

## 2. DECISIONES VINCULANTES YA CONFIRMADAS

**Normativa consolidada, 2026-11-09 (Aventura narrativa y DC-23–DC-28):** desde esta fecha la estructura operativa del proyecto es **Dirección integral (ChatGPT) + desarrollador único**, con **director artístico únicamente para encargos concretos de imágenes canalizados por el propietario**. La fuente y destino únicos del desarrollo son el repositorio GitHub `JavierRB35/El_Quijote_App`. Cada pregunta terminada requiere **imagen propia específica y no reutilizada genéricamente**, y Modo Historia requiere **cobertura visual cinematográfica suficiente** para sostener el interés. Priorizar `assets/scenes/` y primeros planos aptos, usar las acuarelas solo secundariamente en gameplay y como contenido principal de una **sección artística dedicada**. Los fondos neutros son válidos para prototipo/fallback, no aceptación visual final por defecto. Estas decisiones **reemplazan** cualquier asignación anterior a equipos o roles R01–R16 y cualquier política de preguntas finales sin imagen. Se registran en `docs/VISION_Y_DECISIONES.md` y `docs/DECISIONES_OPERATIVAS_Y_POLITICA_VISUAL_2026-11-08.md`. No implican Fase 2 ni derechos para distribución.



### 2.1 Experiencia de juego

- Equilibrio entre **aventura, preguntas, atlas y museo**.
- **Historia principal progresiva en el orden de Cervantes**, con **aventuras aleatorias opcionales** que permiten revisitar o explorar episodios pertinentes; no se modificará el canon.
- Perspectiva de **viajero que vive las aventuras** más **cuaderno de investigador que reúne los descubrimientos**.
- Base visual: **aventura cinematográfica interactiva de tipo 2.5D**, NO mundo abierto ni exploración libre en 3D.
- **Imágenes realistas con movimientos sutiles** de cámara y ambiente: parallax, profundidad, viento, luz, polvo y otros efectos discretos cuando convenga.
- **Puntos interactivos discretos y opcionales** sobre la imagen; navegación sencilla con ratón y teclado.
- **Varias perspectivas visuales y cambios de plano suficientes por episodio**, seleccionadas según el momento y el atractivo narrativo; una sola imagen genérica por capítulo no es suficiente. **Cada pregunta final debe contar con una imagen exclusiva propia y pertinente**; escenas cinematográficas primero, acuarelas secundarias en gameplay, con galería artística propia (DC-24–DC-26).
- Personalidad visual: **realismo cinematográfico con influencias pictóricas**; sistema mixto de fotografía patrimonial, reproducciones históricas y recreaciones IA según la escena, siempre identificadas por su naturaleza.
- Imágenes de **alta calidad y tamaño optimizado**. No confundir máxima resolución con máxima experiencia.
- Interfaz inmersiva, elegante y discreta; no tapar la escena con menús y avisos.
- Rondas de **anticipación narrativa**, con opciones exclusivamente seleccionadas y consecuencia inalterable según Cervantes.
- Primera partida: **introducción breve y opcional**.
- Experiencia amable y adaptativa; desafíos competitivos optativos. No usar dificultad artificial ni penalizaciones que impidan avanzar.
- Ritmo cinematográfico de rondas en momentos significativos; dificultad moderada uniforme, con checkpoints.

### 2.2 Interacción de Aventura — DECISIÓN VIGENTE

El jugador no responde preguntas de examen. En cada ronda observa una imagen anterior al hecho, conoce una situación y **anticipa la próxima acción** de un personaje mediante tres alternativas seleccionables (cuatro solo justificadas). La respuesta correcta sigue el relato de Cervantes; un fallo no bifurca la historia. Mostrar primero el efecto sobre los puntos, después la consecuencia canónica e imagen de revelación. Dificultad **media y uniforme**. La puntuación comienza en 3, suma/resta 1, tiene techo 5 y utiliza checkpoints según las [reglas canónicas](REGLAS_MODO_AVENTURA_V2_2026-11-08.md). No hay campos libres, test de conocimientos, verdadero/falso retrospectivo, ordenación de sucesos ya narrados ni preguntas triviales por completar cupos.

Una escena no se inventa: la situación, cada opción y el desenlace deben apoyarse en la novela, mantener cronología y evitar spoilers. Dirección propone las rondas; el propietario verifica si existe cada preimagen y solicita las faltantes. Los prompts describen exclusivamente elementos respaldados por el texto. La capa visual debe cumplir DC-28.

### 2.3 Texto, investigación y volumen

- Las **dos partes completas de la novela** estarán incluidas localmente en la aplicación.
- **Lector íntegro e interactivo confirmado**: 126 capítulos organizados por parte; lectura continua, búsqueda, marcadores, anotaciones, tamaño de letra ajustable, conservación de posición, acceso desde preguntas y museo, ilustraciones asociadas y ayudas diferenciadas del original.
- Preferencia arquitectónica: conservar **el EPUB completo de una edición legalmente adecuada** y una representación textual estructurada e indexable por capítulos/pasajes. Verificar antes la edición elegida, variaciones textuales y derechos.
- No se establece cuota de preguntas ni banco cultural. Las rondas se seleccionan por su relevancia dramática y posibilidad de anticipación fiel; ninguna cifra justifica inventar hechos.
- Piloto de auditoría editorial sobre **seis capítulos representativos** antes de proyectar el tamaño del catálogo total; informar del rendimiento por capítulo y del coste real de validación.
- Frases exactas y extractos con **parte, capítulo, edición y localizador de pasaje**, y circunstancias narrativas. Distinguir cita literal, resumen, adaptación y comentario.
- Interpretaciones, mensajes ocultos, sátiras y alusiones históricas como **hipótesis atribuidas y graduadas por evidencia**, no como intenciones demostradas sin prueba.
- Humor, bromas, locuras e ingenio de Cervantes y de los personajes con aparición aleatoria pero habitual, sin saturación y sin inventar citas.

### 2.4 Atlas, patrimonio y museo

- **Atlas completamente abierto desde el principio**; no desbloquear ni ocultar fichas por progreso.
- Alcance: **geografía literaria y patrimonio relacionado**, no atlas global irrelevante.
- Mapas de recorridos **propuestos/hipotéticos**, nombres modernos e históricos cuando se justifique, fotografías actuales identificadas como tales, referencias a la época y conexión con capítulos.
- No mostrar como ruta histórica probada un itinerario literario reconstruido; conservar grado de certeza, variantes y fuente.
- **Museo abierto desde el principio** y **cuidadosamente seleccionado**, contextual y ligado a la novela, Cervantes y su tiempo; no museo enciclopédico ilimitado.
- Obras, retratos, personajes históricos y objetos con ficha, relación documentada con el capítulo, autor/fecha/ubicación si se conocen, imagen con permiso de uso y atribución. Distinguir personajes ficticios, históricos reales y atribuciones debatidas.

### 2.5 Imágenes y edición ilustrada del usuario

- El propietario posee un EPUB ilustrado de Don Quijote presuntamente con **más de 300 acuarelas atribuidas a Salvador Tusell**, en relación con composiciones de **Gustave Doré**. El archivo mencionado anteriormente se llamaba **Don_Quijote_de_la_Mancha_Ilustrado_por_Salvador_Tusell_Miguel_de.epub**.
- **No afirmar que ese EPUB se ha inspeccionado, extraído o validado**: en el intercambio previo no se pudo abrir. El archivo **Texto pegado.txt** es material conversacional, NO el EPUB ni las imágenes.
- Cuando el propietario facilite el EPUB accesible y autorice su análisis, auditar su estructura, cantidad, resoluciones, formatos, metadatos, orden, integridad, correspondencia con parte/capítulo/episodio, autoría y derechos. No suponer que todas son acuarelas distintas o de calidad suficiente.
- Conservar las ilustraciones originales sin retocarlas engañosamente; pueden acompañar al texto, el museo, el cuaderno y la **revelación posterior** de un episodio.
- Las escenas cinematográficas fotorrealistas serán la principal imagen de contexto **antes de formular preguntas**, evitando que una ilustración revele la respuesta.
- Fotografía moderna, imagen histórica y recreación por IA deben mostrarse y catalogarse como clases distintas de evidencia.

### 2.6 Plataforma y tecnología

- **Windows 11 x64** como primera plataforma. Arquitectura preparada para otros sistemas, sin obligación de lanzarlos inicialmente.
- **Español** como idioma inicial; textos de interfaz y contenidos internacionalizables para futuras traducciones. La cita castellana original nunca debe confundirse con una traducción.
- Objetivo orientativo pendiente de prueba: diseño para **1920 × 1080**, adaptación a 1440p/4K, alrededor de **8 GB RAM** y gráfica integrada moderna donde sea viable. No publicar estos números como requisitos mínimos validados sin medirlos. Dimensionar instalación/almacenamiento después de inventariar recursos.
- **Stack base definido para la propuesta que se someterá a aprobación:** **Tauri 2 + React + TypeScript + Vite + Rust + SQLite/FTS5 + epub.js + MapLibre GL JS/PMTiles**, escenas **HTML/CSS + Web Animations API** y audio web local. Es una propuesta técnica concreta, no autorización para comenzar a programar; el detalle está en 5.2. Godot 4 solo se reconsiderará con evidencias de una limitación esencial.
- Garantizar **instalador inicial offline**, incluidas dependencias necesarias (revisar WebView2 para Tauri); nada de descargar el juego esencial en el primer arranque.
- Evitar dependencia de servidores públicos de teselas para los mapas offline; obtener o generar paquetes cartográficos de fuentes y servicios que lo permitan.
- Voz: **producción mixta con revisión artística**; narrador, Don Quijote, Sancho y secundarios relevantes; audios precocinados incluidos localmente, subtítulos y controles de volumen.

### 2.7 Datos, IA, mantenimiento

- Proyecto personal con **varios perfiles locales independientes**: partidas, preferencias, ritmo, descubrimientos, cuaderno y estadísticas separadas.
- **Guardado automático transparente** y preferencias recordadas por perfil.
- **Copia automática en un único archivo elegido por el usuario**; reemplazo seguro: crear instantánea coherente, validar y sustituir atómicamente o con mecanismo recuperable; mantener recuperación interna ante fallo y ofrecer restauración completa. No acumular una lista visible de copias.
- La copia incluye perfiles, progreso, anotaciones, preguntas vistas/estadísticas, preferencias y versiones de catálogo. **No necesita duplicar todos los medios del juego; nunca incorporar claves de IA**.
- El usuario debe poder elegir ubicación, verificar el estado de la copia, restaurar y modificar la ruta. La lógica nunca debe dar por completada una copia fallida.
- **IA online solo opcional y bajo petición expresa** del jugador, mediante su **propia clave de un proveedor configurable**. La experiencia completa, las preguntas, atlas, museo y lector funcionan sin IA ni internet.
- Antes de ofrecer IA, consultar el **corpus local** y mostrar lo que ya esté fundamentado. Si el usuario solicita ampliación online, remitir solo el contexto necesario y avisar de uso/costes/privacidad; no enviar automáticamente historial ni secretos.
- Respuestas de IA claramente identificadas y separadas del contenido editorial verificado. No incorporar de forma automática resultados generativos al catálogo de preguntas o al museo sin revisión.
- Almacenar claves en el mecanismo seguro disponible del sistema, nunca en repositorio, recursos empaquetados, logs ni backup.
- **Actualizaciones de software y contenido separadas**, comprobación prudente cuando haya conexión, **avisar y dejar decidir**; no instalar sin consentimiento. Validar integridad y compatibilidad, preservar partidas, perfiles y marcadores.

## 3. EXPERIENCIA NARRATIVA Y DISEÑO DE JUEGO

El modo principal sigue los episodios en secuencia canónica. La entrada a una aventura puede ofrecer:

1. **Situación previa** con entorno realista, voz/subtítulos y detalles observables.
2. **Interacción discreta** con objetos, lugares, gestos o personajes, siempre opcional.
3. **Pregunta seleccionada**, pertinente a lo que el jugador ha visto o escuchado, **sin adelantar visualmente la respuesta**.
4. **Respuesta/retroalimentación amable**: confirmar, explicar, ofrecer ayuda o un nuevo intento sin bloqueo narrativo.
5. **Desenlace y reacción de personajes**, con consecuencias fieles al relato.
6. **Descubrimiento opcional**: extracto citado, humor contextual, curiosidad, interpretación argumentada, acuarela, mapa, pieza de museo y anotación.
7. **Continuación** sin pantallas administrativas intrusivas.

El ejemplo de los molinos de viento es **solo un caso ilustrativo de diseño**: identificar lo que Don Quijote imagina, qué advierte Sancho, qué sucede y cómo interpreta después el episodio. Cualquier pregunta, frase o ilustración concreta deberá verificarse antes de entrar al catálogo.

No introducir decisiones que reescriban el desenlace de la novela. Si en el futuro se autorizan ejercicios contrafactuales, deben estar **aislados y rotulados como hipotéticos**; no forman parte del hilo canónico.

**Aventuras aleatorias opcionales:** usar únicamente episodios ya compatibles con el conocimiento del jugador, o avisar claramente de posibles revelaciones si se permite explorar por adelantado. Mantener acceso abierto a atlas y museo, pero distinguir el material que podría revelar hechos de capítulos futuros.

**Presentación de preguntas:** cada pregunta final dispone de **imagen propia** que no anticipe la respuesta ni se reutilice genéricamente en otras preguntas. Tarjetas discretas, paneles sobre fondo atenuado, selección sobre objetos y comparaciones de escenas según la necesidad. La interacción siempre debe poder completarse sin puntería precisa, mediante teclado y lectores de pantalla cuando sea aplicable. No introducir campos de escritura como mecanismo de respuesta.

**Dificultad adaptativa:** ajustar frecuencia, complejidad conceptual y variedad usando historial local; permitir cambios manuales, desactivar presión temporal y ofrecer repaso voluntario. No castigar el error ni ocultar explicaciones esenciales.

**Recompensas:** colecciones temáticas de descubrimientos, vínculos entre personajes, piezas del museo, mapas comentados, citas memorables y evolución del cuaderno. Distintivos/puntos pueden existir de forma discreta; desafío competitivo siempre separado y voluntario. Atlas y museo **no** se desbloquean como premios.

## 4. PLIEGO DEL EQUIPO DE CONTENIDOS

### 4.1 Competencias de Dirección integral (descripciones profesionales históricas, NO equipos activos)

Las especialidades enumeradas a continuación expresan **controles de calidad asumidos directamente por Dirección integral**, no contratos separados de trabajo, personas convocables ni necesidad de firmas R01–R16 (DC-23). El director artístico solo ejecuta imágenes cuando el propietario recibe un prompt concreto de Dirección; el desarrollador integra datos/código.

**Responsable editorial / director cervantista**
- Decide la edición textual de referencia, controla variantes y firma la coherencia literaria.
- Establece tipología de episodios, criterios de citas exactas, interpretación y revisión.
- Asegura cobertura de ambas partes y controla los anacronismos.

**Filólogo cervantino / documentalista textual**
- Segmenta partes, capítulos, episodios y pasajes con localizadores estables.
- Verifica quién habla, a quién, en qué situación, qué sucede antes y después.
- Atribuye correctamente refranes y frases; señala modernizaciones de ortografía.
- Distingue palabras de Cervantes, del narrador y de los personajes; identifica marcos narrativos y autorías ficticias internas.

**Historiador del Siglo de Oro / investigador cultural**
- Documenta costumbres, instituciones, sociedad, armamento, indumentaria, oficios, religión, política y cultura material relevantes.
- Analiza alusiones a personajes reales: homenaje, sátira o referencia posible, siempre con grado de evidencia y bibliografía.
- Identifica debates historiográficos y evita presentar hipótesis como hechos.

**Especialista en diseño de situaciones y decisiones narrativas**
- Transforma situaciones verificables del relato en **anticipaciones de la siguiente acción**, con alternativas justas y consecuencias canónicas.
- Controla variedad, dificultad media uniforme, precisión, dramatismo y repeticiones.
- Audita distribución de situaciones por capítulos, tramos y personajes.

**Curador iconográfico / investigador de archivos y patrimonio**
- Busca reproducciones, fotografías y fuentes primarias en repositorios fiables; establece relación con episodio y autoría.
- Cataloga las acuarelas Tusell/Doré después de inspeccionar legítimamente el EPUB.
- Documenta procedencia, licencia, atribución, dimensiones, fidelidad contextual y condiciones de uso.

**Responsable de derechos y licencias / asesor legal de propiedad intelectual**
- Comprueba derechos de cada edición digital, fotografía, acuarela, escaneo, audio, mapa y obra histórica.
- Documenta permiso para **uso personal**, posibilidad o no de **almacenamiento en repositorio** y de **redistribución**; no inferir «libre de derechos» por ser antiguo o estar disponible en internet.
- Escala casos dudosos y veta su inclusión en paquetes distribuibles hasta resolverlos.

**Geógrafo histórico / especialista GIS**
- Identifica topónimos literarios, equivalencias actuales, ubicaciones verificadas, lugares discutidos y rutas hipotéticas.
- Produce datos espaciales, fuentes, incertidumbre geográfica y fichas patrimoniales.

**Director artístico / artista de entornos y supervisor IA visual**
- Define biblia visual, continuidad física de personajes/vestuario/arquitectura, cámara, color y ambiente.
- Produce instrucciones y controles de calidad de recreaciones, evita anacronismos y rotula origen sintético.
- Define imágenes previas, posteriores, planos alternativos, puntos interactivos y zonas seguras para la UI.

**Especialista en calidad editorial y gestión de datos**
- Diseña validadores de metadatos, controla duplicados, enlazado de entidades y completitud de expedientes.
- Impide que contenidos pendientes de fuente o derechos aparezcan como listos.

**Director de audio / interpretación histórica**
- Determina qué narraciones, diálogos y ambientes merecen audio; verifica transcripciones, pronunciación y licencias de voz/música/efectos.
- Revisa las voces sintéticas y las mezclas con supervisión artística.

### 4.2 Corpus documental obligatorio

Primero seleccionar una **edición española de referencia jurídicamente utilizable** y registrar:

- Autor, título de ambas partes, editor, edición, año, fuente/URL, versión digital, derechos y fecha de consulta.
- Diferencias textuales, paginación variable, normalización ortográfica y advertencia sobre modernizaciones.
- Despiece estable: Parte I y II; capítulos; episodios que pueden atravesar capítulos; pasajes segmentados; relaciones entre escenas, protagonistas, objetos, lugares, citas y recursos.
- Texto conservado literalmente por su edición y una capa separada de búsqueda normalizada; no sustituir el original por parafraseos.

Fuentes prioritarias para verificar y documentar, sin atribuirles automáticamente permiso de descarga masiva ni de republicación:

- Biblioteca Nacional de España: https://www.bne.es/es/quijote/
- Biblioteca Virtual Miguel de Cervantes y su Banco de imágenes del «Quijote» (QBI): https://www.cervantesvirtual.com/portales/quijote_banco_imagenes_qbi/
- Fondos patrimoniales y catálogos institucionales con metadatos bibliográficos.
- Estudios académicos y ediciones críticas reconocidas, citando autor, obra y páginas/secciones.
- Fuentes cartográficas y patrimoniales oficiales, con licencias individuales comprobadas.

**Prioridad de evidencia:** texto original → documentación histórica primaria/registro patrimonial → estudio académico acreditado → interpretación editorial propia expresamente indicada. Rechazar anécdotas de webs sin fuente.

### 4.3 Rondas de anticipación — requisitos de cada registro

Cada ronda candidata debe incluir: identificador estable; parte/capítulo/episodio/pasaje exacto; situación inmediatamente anterior a la acción; personaje que decide o actúa; formulación **«¿qué hará a continuación?»** o equivalente natural; tres opciones plausibles de dificultad media uniforme, una canónica e inequívoca; consecuencia auténtica; explicación breve; localizador de evidencia; restricciones de spoilers; imagen previa exclusiva y no reveladora; imagen de consecuencia; continuidad de personajes y vestuario; estado de fuentes, derechos y revisión. La historia no se altera por el acierto/fallo.

El propietario valida qué imágenes existen y solicita individualmente los prompts restantes. No preparar un examen de cultura cervantina, no reutilizar la misma imagen previa como recurso genérico de varias rondas y no generar imágenes antes del control de inventario. Los descubrimientos culturales pueden mantenerse en sus módulos no evaluativos (Museo/Lector/Cuaderno). Los contratos del juego narrativo aún deben llevarse a un formato declarativo versionado antes de generalizar la producción.

### 4.4 Humor, refranes, citas e interpretaciones

Crear un **catálogo de cápsulas de descubrimiento**:

- Frases literales ingeniosas, disparates y refranes con locutor, destinatario, ocasión y consecuencia.
- Escenas cómicas con explicación de la ironía, contraste o equívoco.
- Curiosidades de recepción, edición e iconografía cuando estén documentadas.
- Lecturas posibles, sátiras y mensajes sugeridos con bibliografía y grado de consenso.
- Referencias a personas reales y posibles alusiones satíricas u homenajes, nunca categóricas si son conjeturales.

Cada cápsula registra el momento apto para mostrarse; frecuencia moderada pero habitual y cierta aleatoriedad. Distinguir explícitamente **cita auténtica**, **paráfrasis**, **comentario editorial**, **humor contemporáneo** si se autorizase, y **texto generado por IA**. Por defecto, priorizar el humor propio de la obra.

### 4.5 Atlas literario y patrimonio

Para cada entidad geográfica:

- Nombre mencionado en la obra, nombre moderno, variantes históricas, coordenadas si son justificables, precisión espacial, fuentes, descripción concisa, contexto patrimonial y capítulo relacionado.
- Tipo: lugar explícito, identificación probable/debatida, patrimonio asociado o ruta interpretativa.
- Fotografía actual con fecha, autor, permiso de uso y leyenda «aspecto actual»; mapa histórico fechado si disponible y licenciado.
- Rutas segmentadas como **hipótesis** con sus alternativas; no presentar un único trazado como hecho.
- Referencias a sitios cervantinos relevantes incluso fuera de rutas literarias solo si aportan contexto y están relacionados con un episodio o la obra.
- Datos utilizables sin red, sin llamadas encubiertas a servicios de mapas.

### 4.6 Museo histórico-literario

Museo abierto completo al entrar en la aplicación. Curaduría **selectiva** y coherente:

- Cervantes y su contexto histórico.
- Cultura cotidiana, objetos, armas, vestuario y oficios cuando explican una escena.
- Ilustraciones históricas y su tradición artística; comparación con las recreaciones actuales.
- Personajes reales o instituciones relevantes para interpretar el texto.
- Fotografías del patrimonio relacionado y facsímiles cuando sean lícitos.

Cada pieza: título, autor/atribución, fecha, procedencia, técnica, entidad propietaria si aplica, contexto, relación concreta con el Quijote, fuentes, licencia y disponibilidad offline. No atribuir retratos no identificados de forma inequívoca.

### 4.7 Procedimiento de imágenes y acuarelas

1. Inventario de necesidades por **episodio, escena, perspectiva y función** (antes de pregunta / después / lector / museo / cuaderno / atlas), con **una imagen propia obligatoria por pregunta final** y cobertura cinematográfica de Historia suficiente para sostener el interés (DC-24–DC-25).
2. **Prioridad de gameplay:** buscar primero **escenas existentes** en `assets/scenes/` y primeros planos `assets/closeups/` cuando encajen de forma específica; después considerar **acuarelas como apoyo secundario**, siempre con licencia y momento válidos; si no basta, Dirección redacta el **prompt exacto** para que el propietario encargue una imagen nueva al director artístico. Para museo, patrimonio y la sección artística, consultar también fuentes institucionales y obras de derechos comprobados individualmente.
3. Mantener hoja/manifiesto de procedencia y licencias; conservar original intacto y derivados optimizados con hash y metadatos.
4. Cuando exista EPUB real y autorización, inventariar las imágenes internas sin manipular sistemas de protección ni vulnerar permisos; registrar número real y calidad técnica. Enlazar por capítulo mediante evidencias bibliográficas (incluido QBI cuando corresponda).
5. Para escenas o **preguntas concretas sin imagen propia** y adecuada, Dirección definirá **recreación original** mediante prompt con composición, momento, perspectiva, continuidad, iluminación, prohibiciones antiespoiler, formato y función. El artista la genera bajo encargo del propietario; el desarrollador posteriormente registra e integra los activos aptos en GitHub.
6. No usar imágenes IA como «fotografía histórica», «retrato real» o prueba de la época.
7. Optimizar formatos, dimensiones, niveles de detalle y empaquetado; definir texto alternativo, colorimetría, espacio para controles y opciones de movimiento reducido.
8. Marcar fuente y estado de derechos por **cada archivo y derivado**; material de uso privado no autorizado para redistribución no se sube sin más a un Git remoto ni a un instalador público.
9. Si falta autorización o hay dudas, usar metadatos y fallback **neutro y seguro** en el **vertical técnico**, sin simular aprobación de imágenes; las preguntas sin imagen específica y capítulos de narración visualmente insuficientes **no cuentan como terminados en producto**, aunque compile la aplicación.

### 4.8 Piloto editorial y extensión por capítulos

Usar el capítulo VIII como piloto de la experiencia de anticipación. Preparar nuevos capítulos mediante inventario del texto original, hechos, episodios, diálogos, humor, puntos de anticipación válidos, consecuencias y cobertura de medios. La selección de rondas responde a momentos con incertidumbre dramática verificable, no a cuotas de examen. Para todos los capítulos se examinan primero las imágenes disponibles; únicamente el propietario solicita nuevas creaciones a partir de prompts textualmente fieles. La preparación editorial no supone aprobar Fase 2 ni autorizar integración o publicación sin QA.

## 5. PLIEGO DEL EQUIPO DE DESARROLLO

### 5.1 Capacidades técnicas a ejecutar por el desarrollador único

Las funciones profesionales que siguen son **competencias del único desarrollador**, con decisiones UX, producto, arte y aceptación asumidas por Dirección; no se convocan como miembros de un segundo equipo técnico. El director artístico es una tercera intervención solo para nuevas imágenes (DC-23).

**Director técnico / arquitecto principal**
- Analiza requisitos, compara alternativas de stack, propone decisión documentada y define límites entre sistema, contenidos y perfiles.
- Resuelve rendimiento, distribución, evolución y seguridad, sin asumir que la propuesta Tauri está aprobada.

**Principal Desktop Engineer (Windows)**
- Instalación offline, empaquetado de recursos, integración con OS, rutas, ficheros, restauración, actualización y eventual soporte multiplataforma.

**Senior Frontend Engineer / ingeniero de interacción**
- Escenas 2.5D, controles inmersivos, animaciones, lectura, tarjetas de pregunta seleccionada, cuaderno y museo.
- Componentes accesibles y desacoplados del contenido, transiciones y estados de carga/errores.

**Diseñador senior de producto, UX/UI y accesibilidad**
- Sistema visual coherente, guías de movimiento, pruebas con adolescentes y adultos, navegación accesible ratón/teclado/lector de pantalla, subtítulos y controles de comodidad.
- Pruebas de caja negra basadas en usuarios sin conocimientos técnicos; minimizar pasos y confusión.

**Ingeniero de datos / SQLite / búsqueda**
- Modelo de contenido inmutable o versionado y datos de perfil mutables, migraciones, índices de texto, consultas contextuales y referencias estables.

**Ingeniero GIS / cartografía offline**
- Integra mapas locales, capas y rutas hipotéticas, licencias, créditos, funcionamiento sin red y degradación elegante sin aceleración gráfica.

**Ingeniero de audio y gráficos 2D**
- Rendimiento visual, parallax ligero, ambientes, reproducción local de voces, mezcla, tiempos y opción sin movimiento.

**Ingeniero de seguridad y privacidad**
- Claves de proveedor de IA en almacén seguro, permisos mínimos, sanitización de EPUB/HTML/activos, protección frente a contenido externo y telemetría no consentida.

**Ingeniero de QA y automatización / release manager**
- Contratos editoriales, pruebas automáticas, accesibilidad, regresiones, instaladores y actualización/restauración. Gestiona evidencia verificable de calidad y lanzamientos.

**Responsable de localización técnica**
- Separa cadenas y textos, internacionalización y fuentes/tipografía, respetando el castellano de las citas originales.

### 5.2 Stack técnico definido para el encargo y criterios de validación

**Recomendación técnica: Tauri 2.** La combinación de escenas 2.5D, lector completo, gran catálogo estructurado, museo y atlas favorece una aplicación documental interactiva con capacidades nativas. El videojuego **no necesita motor 3D ni físicas**. Por eso Godot 4 no será el punto de partida. Esta es la propuesta que debe aprobar el propietario; **no autoriza por sí misma a escribir código**.

| Capa | Tecnología de referencia | Responsabilidad |
|---|---|---|
| Escritorio | **Tauri 2** | Ejecutable, permisos, integración OS, instalador y actualización |
| Interfaz | **React + TypeScript + Vite** | Navegación, preguntas seleccionadas, lector, cuaderno, museo, atlas |
| Servicios nativos | **Rust + comandos Tauri tipados** | Ficheros, seguridad, copia/restauración, importaciones, operaciones sensibles |
| Catálogo | **SQLite + FTS5** | Datos editoriales validados e indexados, búsqueda local |
| Datos privados | **SQLite separado** | Perfiles, progreso, preferencias y notas; migraciones independientes |
| EPUB | **epub.js** y texto estructurado anclado | Lectura, marcadores, anotaciones, salto a citas; contenido saneado |
| Escenas | **HTML/CSS en capas + Web Animations API**; Canvas 2D justificado | Parallax, ambiente, hotspots, transiciones, cámara sutil |
| Atlas | **MapLibre GL JS + PMTiles local con licencia** | Mapas/rutas offline; fallback local si no hay WebGL2 |
| Audio | **HTMLMediaElement/Web Audio API** y archivos precocinados | Voces, ambientes, subtítulos, volúmenes |
| Pipeline editorial | **Python + JSON Schema** | Extracción autorizada, inventario, control de fuentes, validadores |
| Contratos | **JSON Schema** y tipos verificados/generados TS/Rust | Evitar divergencias entre contenidos e implementación |
| QA | **Vitest, React Testing Library, pruebas Rust, Playwright para UI web y prueba nativa Windows** | Unidad, contratos, integración, accesibilidad, offline |
| Distribución | **Tauri Windows 11 x64**, instalador offline con WebView2 cuando corresponda | Primera instalación y recursos esenciales sin red |
| Integración | **GitHub Actions sobre Windows**, cuando se autorice | Tests, contratos, licencias y build; no es requisito para jugar |

**Instrucciones de arquitectura obligatorias:**

1. **Rust/SQLite:** preferir comandos Tauri limitados y tipados; no conceder a la interfaz SQL arbitrario sobre datos sensibles. Separar catálogo de usuario, probar FTS5 con castellano original y modernizado.
2. **EPUB:** epub.js visualiza, pero el texto indexable y los enlaces a pasajes pertenecen al contrato editorial. Validar versión/licencia y sanear cualquier HTML o contenido activo; el libro no debe ejecutar scripts externos.
3. **Gráficos:** usar capas de imágenes, CSS y Web Animations API; añadir PixiJS/u otro motor solo si un benchmark de escena representativa demuestra la necesidad. Respetar movimiento reducido y equipos modestos.
4. **Mapas:** PMTiles exige comprobar acceso local eficiente por protocolo seguro o rangos y licencias de datos. No depender de tiles remotos ni descargarlos masivamente de servidores públicos sin permiso. Proporcionar fallback local accesible si WebGL2 falla.
5. **Medios:** producir formatos optimizados compatibles con el WebView objetivo (WebP/AVIF cuando proceda y alternativas), audio local con subtítulos; originales maestros separados de recursos runtime.
6. **Instalación:** comprobar en VM Windows 11 limpia y sin internet el modo de distribución WebView2. Ningún recurso esencial ni dependencia puede requerir descarga en primer arranque.
7. **Actualizaciones:** firma, integridad, consentimiento, compatibilidad de paquetes, migraciones de ID y rollback; nunca sustituir bases de perfil.
8. **Seguridad:** capacidades Tauri mínimas, claves IA protegidas, validación del contenido externo, red solo para petición opcional o comprobación de actualizaciones según configuración.
9. **Pruebas:** Playwright en web no basta para afirmar que funciona el ejecutable; realizar smoke/e2e real Windows con instalador y WebView2. No declarar objetivo de 8 GB RAM validado sin mediciones.
10. **Portabilidad:** encapsular rutas, servicios OS y persistencia; macOS/Linux son posibilidades futuras, no entregables de la primera versión.

Registrar una **ADR** que recoja esta decisión, riesgos y una comparación breve con Godot 4. Solo proponer cambio de stack con evidencia comprobable de incapacidad esencial de accesibilidad, rendimiento o experiencia.

### 5.3 Separación arquitectónica obligatoria

Diseñar tres dominios independientes:

**A. Catálogo cultural versionado, solo lectura en ejecución**
- Texto, segmentación, preguntas, opciones, episodios, fuentes, citas, personajes, escenas, museo, atlas y metadatos de imágenes.
- Entrega editorial a través de archivos estructurados validados que el proceso de build o importación convierte a un formato eficiente. Permitir parches culturales comprobados.

**B. Activos audiovisuales**
- Imágenes maestras y derivados, recursos 2.5D por capas, mapas empaquetados, clips de ambiente, voces y subtítulos, con manifiestos y hashes.
- Pueden ser paquetes físicos separados de la base cultural, pero **el instalador inicial debe contener todo el contenido esencial para jugar sin red**.

**C. Datos privados del jugador**
- Perfiles, progreso, estadísticas, historial de preguntas, ajustes, preferencias, cuaderno, marcadores y anotaciones. Almacenamiento independiente del catálogo y actualizable mediante migraciones.
- No incrustar estas tablas dentro de una base de catálogo que pueda sobrescribirse durante actualizaciones.

Crear servicios explícitos para selección adaptativa, cita exacta, búsqueda, notas, rutas, recursos, guardado, backup, actualizaciones y AI on-demand. **La interfaz no debe codificar textos ni respuestas en componentes**; el equipo editorial no debe necesitar modificar componentes para añadir contenidos aprobados.

### 5.4 Subsistemas funcionales

**Pantalla de inicio:** continuar, comenzar, aventura aleatoria opcional, atlas, museo, cuaderno, lector, perfiles y ajustes; entrada simple e inmersiva; tutorial breve, cancelable y recuperable.

**Aventura:** controlador narrativo con etapas canónicas, escenas por perspectiva, hotspot opcional, preguntas a ritmo adaptativo, reacción de personajes, ambientación y enlaces culturales; progresión y guardado transparente.

**Preguntas:** presentación determinada por un descriptor de interacción; opciones seleccionables, corrección local determinista, solución almacenada en catálogo y explicaciones respaldadas; aleatorización de orden reproducible cuando convenga; sin campos de respuesta escrita.

**Selector adaptativo:** algoritmo local explicado/documentado que considera preguntas vistas, dominadas, falladas, intervalo de repaso, capítulo, afinidades y preferencia de frecuencia, manteniendo coherencia y evitando spoilers. Sin necesidad de LLM.

**Lector:** texto completo de ambas partes, navegación por capítulo, lectura continua, búsqueda, marcador, anotación, ajuste tipográfico y enlace bidireccional a escena/pregunta/imagen. El EPUB ilustrado podrá ser un recurso, sujeto a licencia; la edición de referencia para citas debe fijarse de modo explícito.

**Atlas:** mapas y datos offline, rutas hipotéticas con leyendas, fichas de lugar, fotos actuales identificadas, coordenadas con incertidumbre y enlaces a capítulos. Disponible desde el inicio.

**Museo:** colecciones abiertas desde el principio, filtros pertinentes, fichas con créditos y contexto, zoom adecuado, posibilidad de consultar fuente/relación narrativa; navegación sin sensación de archivo infinito.

**Cuaderno:** descubrimientos reunidos automáticamente, favoritos, citas, acuarelas, notas propias, vínculos y filtros por episodio/personaje/lugar; mantener rastro de fuente y separar anotación del usuario de información verificada o IA.

**Voces y sonido:** archivos incluidos, subtítulos sincronizados, volumen de voz/ambiente/música separado si es viable, mute, avance y repetición.

**Perfiles y copia:** aislamiento total, auto-save, ubicación seleccionada, comprobaciones de integridad, backup y restauración demostrables, aviso de fallo claro, sin perder la copia anterior por error.

**IA opcional:** un adaptador independiente del proveedor, configurado por el usuario, consentimiento para envío de contexto, búsqueda local prioritaria, estado offline y gestión segura de errores y coste; sus respuestas no son verdad editorial.

**Actualizaciones:** contenido y ejecutable independientes, aviso y autorización, versiones compatibles, verificación y rollback si un paquete falla, datos personales intactos.

**Accesibilidad y preferencias:** tamaño del texto, contraste legible, subtítulos, reducción de movimiento, controles con teclado, foco visible, alt en imágenes, opción de omitir animaciones/intros, equilibrio entre estética y comodidad. Guardar por perfil.

## 6. CONTRATO ENTRE DIRECCIÓN INTEGRAL Y DESARROLLADOR (OBLIGATORIO)

El factor crítico es integrar **decisiones editoriales y producto fijadas por Dirección integral** con **implementación del desarrollador único**, sin contenido hardcodeado ni supuestas firmas de R01–R16. Mantener versionado `CONTRATO_EDITORIAL_TECNICO.md`, esquemas, ejemplos, tests y retrocompatibilidad; Dirección revisa editorial/funcionalmente y el desarrollador demuestra técnicamente el comportamiento. **GitHub es la única fuente de verdad de origen y destino de todo cambio**.

### 6.1 Identificadores, enlaces y semántica

- IDs estables, legibles y únicos para edición, parte, capítulo, pasaje, episodio, escena, pregunta, opción, cita, entidad histórica, personaje, lugar, obra, fuente, licencia y recurso.
- Convención orientativa: DQ.P1.C08, DQ.P1.C08.E01, DQ.P1.C08.E01.S01, DQ.Q.000001, DQ.A.000001, DQ.LOC.000001. **Son ejemplos de esquema, NO un inventario editado ni IDs de contenido ya aprobado**.
- Relaciones por ID, nunca mediante texto visible, posición de una opción, nombre del archivo o número de fila.
- Prohibido reutilizar un ID después de retirar un elemento; alias/migraciones para cambios editoriales.
- Versiones semánticas del esquema, del catálogo, de los paquetes de activos y de la aplicación; compatibilidad declarada.
- Los pasajes deben tener localizador robusto (edición, parte, capítulo, unidad textual, ancla y verificación de texto) para no romper las referencias ante correcciones ortográficas.
- Documentación precisa de campos obligatorios, opcionales, enumeraciones, valores nulos, unidades y tipos geográficos.

### 6.2 Modelo conceptual mínimo que deberán formalizar

**Edition:** id, nombre, fuente, versión, reglas ortográficas, licencia, checksum, procedencia.

**Chapter:** id, part, number, title, text edition, orden, inicio/fin, índice.

**Passage:** id, chapter_id, section/anchor, texto original, texto indexable, posición y hash.

**Episode:** id, title, chapters[], narrative_order, synopsis, actors[], places[], passages[], flags de spoiler.

**Scene:** id, episode_id, phase (before/question/reveal/after), media_ids[], layers[], hotspots[], subtitles/audio, entry/exit, accessibility.

**Question:** id, episode_id, chapter_ids[], passage_ids[], prompt, type, options[], correct_option_ids o correct_order/pairs, rationale, evidence[], difficulty, spoiler_policy, scene_id, tags, review_state, semantic_key.

**Option:** id, question_id, label, correctness definida por Question, order_policy, explanation si procede.

**Quote/Discovery:** id, tipo, contenido/cita exacta, speaker, contexto, passages[], bibliografía[], condición de aparición, vínculos de activos, estado de certeza.

**Person/Character:** id, clase ficticio/real/debatido, variantes, relaciones, referencia histórica y apariciones.

**Place/Route:** id, literary_name, modern_name, geometry, precision, status explícito/probable/debatido, chapters[], sources[], heritage_links[], attribution.

**MuseumItem:** id, obra, autoría/atribución, fecha, fuente, media_ids[], chapters[], explicación, licencia, relevancia.

**MediaAsset:** id, función, originales/derivados, uri local lógica, mime, ancho/alto, tamaño, hash, alt, source_id, license_id, autor, fecha, allowed_uses, provenance, review_state, spoiler_level.

**Source/License:** identificador, título, autor/editor, publicación, URL/permalink, fecha de consulta, límites de uso, atribución requerida, evidencia documental, condición redistributiva, certeza.

**Profile** y tablas de jugador: ids propios, progreso/estado de preguntas, descubrimientos, anotaciones, configuración, backup_version; no se mezclan con contenidos de catálogo.

**Requisito de integración:** un elemento editorial nunca se publica si apunta a un ID inexistente o si su imagen/cita/licencia requerida está pendiente.

### 6.3 Esquemas y ejemplos verificables

Antes de producción:

1. Definir archivos JSON Schema o formato tipado equivalente, reglas de migración y validadores automáticos.
2. Entregar **un ejemplo sintético y explícitamente no publicable** de cada entidad y cada tipo de pregunta, incluidos casos de una y varias respuestas seleccionadas.
3. Describir reglas de evolución y compatibilidad, índice por episodios y manifest de paquete.
4. Formalizar valores de certeza y licencia con enumeraciones; «desconocido» no equivale a «autorizado».
5. Formalizar coordenadas y polígonos con sistema de referencia, precisión, leyenda y topologías.
6. Formalizar resoluciones objetivo, compresión, miniaturas, alt, áreas de hotspot normalizadas, margen seguro de interfaz y fallback sin movimiento.
7. Pruebas de contrato: pregunta sin opción correcta, duplicados semánticos, escena sin imagen previa, cita sin pasaje, foto sin licencia, imagen inexistente, capítulo mal referenciado, punto fuera de imagen, ruta sin grado de certeza, verso/cita atribuido erróneamente, paquete incompatible.

### 6.4 Organización propuesta del repositorio (validar contra el existente)

No imponer ni crear carpetas ficticias antes de inspeccionar Git. Una estructura lógica candidata:

    /docs/
      VISION_Y_DECISIONES.md
      ESPECIFICACION_FUNCIONAL.md
      ESPECIFICACION_EDITORIAL.md
      CONTRATO_EDITORIAL_TECNICO.md
      DIRECCION_ARTISTICA.md
      UX_ACCESIBILIDAD.md
      ARQUITECTURA_Y_ADR.md
      DERECHOS_Y_PROCEDENCIA.md
      PLAN_QA_Y_ACEPTACION.md
      RIESGOS_Y_PENDIENTES.md
    /schemas/
      content/ media/ player/ manifests/
    /content/
      editions/ chapters/ passages/ episodes/ questions/
      discoveries/ quotations/ characters/ places/ routes/ museum/
      sources/ licenses/ manifests/
    /assets/
      scenes/ historical_art/ photographs/ audio/ maps/ thumbnails/
    /app/
      ui/ domain/ storage/ native/ accessibility/
    /tools/
      editorial_validation/ packaging/ asset_processing/
    /tests/
      contracts/ content/ unit/ integration/ ui/ offline/ accessibility/

Si el repositorio existe con otro diseño, proponer adaptación y **mantener el historial y los archivos del usuario**. Para paquetes audiovisuales grandes, decidir Git LFS, releases privados o almacenamiento de medios trazable, sin romper la instalación offline ni enviar al Git remoto materiales que no se puedan alojar legalmente.

### 6.5 Gobernanza Git y flujo de entrega entre las dos entidades

1. **Única fuente de verdad y destino del desarrollo: https://github.com/JavierRB35/El_Quijote_App**, rama `main` remota. Cada encargo al desarrollador debe exigir la consulta de SHA actual, inspección de dependencias y sincronización local antes de editar.
2. El desarrollador único trabaja en **rama `feature/*`** por objetivo concreto, crea commits y abre PR en **el mismo repositorio GitHub**. Nada terminado solo localmente. Sin force-push, sin sobreescribir trabajo ajeno ni fusiones automáticas.
3. **Dirección integral** define y revisa cambios de contenido, contratos, UX, QA y producto; el desarrollador implementa y prueba. No pedir visados a equipos CONTENIDOS/DESARROLLO/R01–R16 inexistentes. Guardar enlaces y evidencias que justifiquen decisiones.
4. **Director artístico**, tercera entidad puntual, interviene **solo en creación/modificación de imágenes** mediante prompt exacto de Dirección canalizado por el propietario. El desarrollador integra los archivos aprobados y sus metadatos/hash/ID al catálogo.
5. Una PR debe indicar alcance, rutas, versiones, compatibilidad, imágenes propias por pregunta, secuencia de escenas y cobertura, derechos, riesgos de spoiler, pruebas realmente ejecutadas, SHA base y head. CI verde **no sustituye** prueba de UI o instalación.
6. Los IDs estables se preservan; cambios semánticos de preguntas/progreso requieren migración o tratamiento conservador. Los contratos, validadores, consumidor y registros se versionan juntos cuando una modificación lo exige.
7. **Entregas por capítulos:** etapa 1 = vertical técnico jugable aunque use fondos neutros; etapa 2 = capítulo visualmente aprobado, con imagen propia por pregunta, narración suficientemente ilustrada, licencia y QA. Nunca confundir ambas.
8. Dirección decide aceptación/fusión según reglas Git del repositorio. Una PR abierta o una auditoría documental **no equivale** a software funcionando ni a `main`. No habilita Fase 2, publicación o redistribución.

## 7. CRITERIOS DE CALIDAD Y PRUEBAS

### 7.1 Editoriales, documentales y legales

- **100 %** de preguntas aprobadas con ID único, opciones seleccionadas, respuesta(s) definida(s), explicación, capítulo/pasaje o fuente histórica pertinente, revisión, validez del enlace y estado de licencia de activos.
- **100 %** de citas presentadas como literales cotejadas con la edición declarada. Las adaptaciones se etiquetan.
- **0** rondas de anticipación publicadas sin consecuencia inequívoca y documentada en el texto.
- **0** rondas duplicadas o de relleno para aumentar volumen; métricas de diversidad narrativa.
- **100 %** de imágenes visibles con procedencia, autoría, clase (histórica/foto/recreación) y condición de uso registrada.
- **0** activos de derechos desconocidos o restringidos incluidos inadvertidamente en paquetes o Git remoto no autorizados.
- **100 %** de topónimos/rutas con tipo de certeza y fuente; las rutas inferidas claramente marcadas.
- Ilustraciones Tusell inventariadas **solo después de acceso real al EPUB** y sin prometer un número no verificado.
- Museo y atlas íntegramente accesibles al empezar; no confundir «abierto» con «sin filtros».
- Revisión humana especializada documentada cuando sea necesaria; no certificar validación experta inexistente.

### 7.2 Funcionales y de experiencia de usuario

- Instalación y primera ejecución sin conexión; recorrer un episodio con situación, anticipación, puntos, consecuencia, checkpoints y guardado, además de Historia, Museo y Lector.
- Cambiar de perfil y demostrar aislamiento de progreso, ajustes, favoritos y anotaciones.
- Acceso al lector completo, búsqueda en ambas partes, navegar desde una ronda a su pasaje y regresar sin perder posición.
- Anticipaciones con dificultad media uniforme, tres opciones usualmente y una acción canónica; reordenar opciones en reintentos sin alterar solución y sin escritura libre.
- Los fallos reducen puntos y muestran el desenlace canónico; al llegar a cero se revela la consecuencia y se retorna al checkpoint con un mínimo de 3 puntos.
- Conectividad ausente: atlas, museo, partidas, recursos y mapas locales operativos; IA opcional indica que está sin conexión.
- Imagen previa exclusiva sin spoilers; la imagen de consecuencia aparece solo tras elegir «Descubrir qué sucede»; controles de teclado completos.
- Todas las imágenes de evidencia histórica distinguidas de las recreaciones; retratos dudosos y rutas hipotéticas rotulados.
- Accesibilidad: navegación teclado, orden de foco, contraste, escalado, subtítulos, alt y reducción de animaciones.
- Rendimiento medido en el hardware objetivo; tamaño de instalación, picos de RAM/VRAM, tiempos de escena, atlas, búsqueda y carga de imágenes; objetivos definitivos basados en mediciones.

### 7.3 Persistencia, seguridad y actualizaciones

- Auto-save en transición y salida; cierre imprevisto y relanzamiento sin corrupción.
- Copia única en ruta elegida, sustitución segura, error de permisos, disco lleno, interrupción entre escritura y reemplazo, restauración y recuperación anterior.
- La copia no contiene claves de IA ni activos de gran tamaño; se verifica antes de informar éxito.
- Cambio de edición o actualización de catálogo conserva pasajes vinculados, marcadores, IDs o informa de migraciones.
- Actualización opcional no fuerza instalación ni requiere internet; paquete manipulado/incorrecto se rechaza sin destruir progreso.
- API key protegida; red solo al solicitar consulta o revisión de actualizaciones según ajustes; sin telemetría secreta.
- La importación/representación de EPUB se tratará como contenido potencialmente no confiable y no ejecutará scripts arbitrarios.

### 7.4 Prueba integral de caja negra

El QA debe inventar desde cero perfiles de jugadores de prueba: adolescente sin experiencia en Cervantes, adulto lector, usuario de teclado, usuario sin internet, aficionado al atlas, persona que restaura tras reinstalar y jugador que falla respuestas. **No debe aprenderse previamente la interfaz ni utilizar conocimientos del código** durante la prueba de usabilidad. Medir dónde se atascan, si entienden las opciones, si distinguen hechos de conjeturas y si localizan los descubrimientos sin instrucciones externas. Registrar problemas y evidencias, corregir, repetir.

## 8. PLAN POR FASES Y ENTREGABLES OBLIGATORIOS

### FASE 0 — Auditoría y diseño (hito histórico completado; FASE 1 autorizada por DC-18)

**Responsable de coordinación** publica:

1. **Documento maestro de alcance**, con este encargo reflejado íntegramente, tabla de decisiones **cerradas/provisionales/pendientes** y prueba de que no se han reabierto decisiones cerradas.
2. **Matriz de trazabilidad:** requisito → responsable → archivo/entidad → prueba de aceptación.
3. **Mapa de episodios y capítulos**; estimación de escenas/perspectivas y activos sin cifras inventadas.
4. **Plan editorial de seis capítulos**, matriz de fuentes, criterios de revisión, plan de licencias y método de deduplicación.
5. **Catálogo inicial de necesidades visuales y fuentes** más auditoría pendiente del EPUB de Tusell; sin afirmar que se extrajo.
6. **ADR de validación del stack específico del apartado 5.2** (Tauri 2/React/TS/Vite/Rust/SQLite/FTS5/epub.js/MapLibre/PMTiles y animación web), riesgos, offline, atlas, almacenamiento y contingencia Godot 4.
7. **Primer contrato editorial-técnico**, con esquemas, IDs, ejemplos sintéticos y reglas de evolución.
8. **Dirección artística y UX**: principios, pantallas y recorridos detallados, accesibilidad, narrativa y presentación de respuestas seleccionadas.
9. **Plan de producción y dimensionamiento**: coste de investigación/validación, imágenes/audio/mapas, carga en disco y rendimiento.
10. **Plan de pruebas y criterios de salida**; evaluación de derechos por tipo de recurso.
11. **Registro de dudas realmente bloqueantes**, con recomendación y coste de cada alternativa.

**PUNTO DE CONTROL GO/NO-GO:** presentar todo al propietario. Sin aprobación explícita, detenerse aquí. Se pueden proponer correcciones a documentos, no generar el juego ni producir el catálogo completo.

### FASE 1 — Piloto coordinado (solo tras autorización)

- **Dirección integral:** decide los seis capítulos, contenido, preguntas sin duplicados, imágenes propias por pregunta, escenas suficientes, fuentes, derechos y criterios de aceptación.
- **Desarrollador único:** implementa el vertical end-to-end, datos/contratos/validadores, interfaz y pruebas, con cada cambio originado y devuelto a GitHub vía PR.
- **Director artístico puntual:** recibe, por conducto del propietario, los prompts exactos para imágenes necesarias tras revisar el banco existente.
- Dirección verifica pruebas, narrativa, imágenes, accesibilidad, audio opcional, guardado y offline; el desarrollador registra evidencia medible y replanifica sin abrir rondas entre antiguos roles.

### FASE 2 — Producción completa (solo tras aceptación del piloto)

- Escalar producción de contenido con revisiones por lotes y manifiestos versionados.
- Completar experiencia de ambas partes, perfiles, instalaciones, contenido cultural, imágenes, atlas, museo, lector y audio.
- Integración continua y pruebas periódicas de importación, referencias, licencias, rendimiento y experiencia.
- Las revisiones de catálogo no deben afectar partidas ni secretos.

### FASE 3 — Auditoría de calidad y entrega (solo tras autorización)

- Examen editorial y legal de cada recurso final.
- Auditoría funcional de todas las rutas del producto, offline, rendimiento, restauración y accesibilidad.
- Instalador Windows 11 x64 completamente autónomo y documentación de instalación, respaldo, restauración, edición y actualización.
- Entrega con lista de decisiones, limitaciones y evidencia de pruebas. Fusión a main/lanzamiento solo según la autorización y flujo Git acordado.

## 9. FLUJO OPERATIVO Y EVIDENCIA DE ENTREGA

Desde **DC-23–DC-27 (2026-11-08)** solo hay **Dirección integral (ChatGPT)** y **desarrollador único** como entidades operativas permanentes; el **director artístico** es tercero puntual para imágenes, a través del propietario. Las antiguas descripciones profesionales de §§4–5 son catálogo de competencias, no responsables externos ni agentes a convocar.

**Cada prompt al desarrollador debe decir explícitamente:**

> La **única fuente de verdad de donde procede la información y a la que deberá volver el desarrollo** es el repositorio GitHub `https://github.com/JavierRB35/El_Quijote_App`, `main` remoto. Verifica el SHA, sincroniza, implementa en rama, prueba, publica la PR en este mismo repositorio y reporta el SHA final.

Cada entrega técnica debe incluir cambios concretos, archivos/IDs, resultado ejecutable, pruebas reales y sus limitaciones, cobertura visual/antispoiler, derechos, SHA de base y HEAD/PR. Dirección acepta o rechaza y resuelve decisiones multidisciplinares sin dictámenes repetidos.

Cada encargo de **imagen nueva** corresponde a un **prompt visual exacto** redactado por Dirección tras inventario de escenas, primeros planos y acuarelas. El propietario lo transmite al director artístico; el desarrollador solo integra los resultados que superan revisión.

**Criterio final de calidad:** capítulo narrativo con imágenes cinematográficas suficientes, **una imagen propia por pregunta**, fidelidad literaria, TS-001, accesibilidad, derechos y continuidad. El neutro permite avanzar el prototipo, pero no sustituye el acabado artístico exigido por el propietario. Ninguna decisión técnica implica autorización de distribución o Fase 2.

## ANEXO A — POLÍTICA DE TRATAMIENTO DE INCERTIDUMBRES

Usar uno de estos estados en afirmaciones editoriales:

- **TEXTO_EXPLICITO:** se verifica directamente en la edición de referencia, con pasaje exacto.
- **HECHO_HISTORICO_DOCUMENTADO:** se apoya en fuente histórica o registro solvente, no en la novela por sí sola.
- **INTERPRETACION_ACADEMICA:** lectura atribuida a investigador(es) concreto(s); incluir otras relevantes cuando proceda.
- **HIPOTESIS_PLAUSIBLE:** propuesta posible, sin prueba suficiente para presentarla como certeza.
- **DISCUTIDO/NO_ESTABLECIDO:** conservar desacuerdo y no establecer respuesta cerrada cuando sería engañoso.
- **RECREACION_ARTISTICA:** imagen, escena o recurso concebido para la experiencia, no evidencia histórica.

No confundir «existe una fotografía de un lugar actual» con «Cervantes situó exactamente allí el episodio». No confundir «el personaje es representado por una acuarela de Tusell» con «así era históricamente».

## ANEXO B — FUENTES TÉCNICAS Y DE DERECHOS PARA CONSULTA

Consultar sus versiones actuales al realizar la auditoría; no deducir licencia de un mero enlace:

- EPUB W3C: https://www.w3.org/TR/epub-33/
- Tauri 2: https://v2.tauri.app/
- Instaladores Tauri para Windows y WebView2 offline: https://v2.tauri.app/distribute/windows-installer/
- MapLibre GL JS: https://maplibre.org/maplibre-gl-js/docs/
- Política de teselas OSM: https://operations.osmfoundation.org/policies/tiles/
- Política de teselas vectoriales OSM: https://operations.osmfoundation.org/policies/vector/
- Ley española de Propiedad Intelectual, versión consolidada BOE: https://www.boe.es/buscar/act.php?id=BOE-A-1996-8930
- Ministerio de Cultura sobre copia privada: https://www.cultura.gob.es/cultura/propiedadintelectual/limite-legal-copia-privada.html
- BNE, Quijotes: https://www.bne.es/es/quijote/
- Banco de imágenes del Quijote (QBI): https://www.cervantesvirtual.com/portales/quijote_banco_imagenes_qbi/

**Fin del encargo maestro.**
