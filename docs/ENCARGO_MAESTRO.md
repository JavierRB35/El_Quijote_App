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

### 2.1 Experiencia de juego

- Equilibrio entre **aventura, preguntas, atlas y museo**.
- **Historia principal progresiva en el orden de Cervantes**, con **aventuras aleatorias opcionales** que permiten revisitar o explorar episodios pertinentes; no se modificará el canon.
- Perspectiva de **viajero que vive las aventuras** más **cuaderno de investigador que reúne los descubrimientos**.
- Base visual: **aventura cinematográfica interactiva de tipo 2.5D**, NO mundo abierto ni exploración libre en 3D.
- **Imágenes realistas con movimientos sutiles** de cámara y ambiente: parallax, profundidad, viento, luz, polvo y otros efectos discretos cuando convenga.
- **Puntos interactivos discretos y opcionales** sobre la imagen; navegación sencilla con ratón y teclado.
- **Varias perspectivas visuales por episodio**, seleccionadas según el momento y la pregunta; una sola imagen genérica por capítulo no es suficiente.
- Personalidad visual: **realismo cinematográfico con influencias pictóricas**; sistema mixto de fotografía patrimonial, reproducciones históricas y recreaciones IA según la escena, siempre identificadas por su naturaleza.
- Imágenes de **alta calidad y tamaño optimizado**. No confundir máxima resolución con máxima experiencia.
- Interfaz inmersiva, elegante y discreta; no tapar la escena con menús y avisos.
- Preguntas con **presentación variable** según contenido y tipo, pero **RESPUESTAS EXCLUSIVAMENTE SELECCIONADAS**.
- Primera partida: **introducción breve y opcional**.
- Experiencia amable y adaptativa; desafíos competitivos optativos. No usar dificultad artificial ni penalizaciones que impidan avanzar.
- Ritmo de preguntas: **cinematográfico y adaptativo**; aparecen en momentos significativos y su frecuencia es ajustable; desafíos adicionales voluntarios.

### 2.2 Formatos de respuesta — DECISIÓN CERRADA

**No pedir al jugador respuestas libres por escrito, no introducir cuadros de respuesta textual ni reabrir esta decisión.** Todas las respuestas se resuelven mediante opciones propuestas por el juego:

- Elección de una respuesta entre varias.
- Elección de varias respuestas **solo cuando la pregunta indique explícitamente que puede haber varias correctas**.
- Verdadero/falso como selección.
- Selección de elementos, personajes u objetos en la escena mediante puntos interactivos claros.
- Ordenación de alternativas mediante selección/arrastre con alternativa accesible por teclado, si aporta valor.
- Asociación de opciones en pares o conjuntos, con interacción accesible.

La variedad estará en la **formulación, el razonamiento, la imagen y la disposición de las opciones**, no en exigir escritura al jugador. Cuando una interpretación literaria admita varias lecturas defendibles, formular la pregunta y las opciones con precisión; aceptar más de una interpretación cuando proceda y explicarlo. No fabricar una verdad única sobre supuestas intenciones ocultas de Cervantes.

### 2.3 Texto, investigación y volumen

- Las **dos partes completas de la novela** estarán incluidas localmente en la aplicación.
- **Lector íntegro e interactivo confirmado**: 126 capítulos organizados por parte; lectura continua, búsqueda, marcadores, anotaciones, tamaño de letra ajustable, conservación de posición, acceso desde preguntas y museo, ilustraciones asociadas y ayudas diferenciadas del original.
- Preferencia arquitectónica: conservar **el EPUB completo de una edición legalmente adecuada** y una representación textual estructurada e indexable por capítulos/pasajes. Verificar antes la edición elegida, variaciones textuales y derechos.
- La aspiración inicial de **10.000 preguntas** ha sido expresamente **sustituida** por **tantas preguntas realmente diferentes, útiles y verificables como permita un trabajo riguroso**. Ninguna cuota numérica mínima inventada.
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

**Presentación de preguntas:** tarjetas discretas, paneles sobre fondo atenuado, selección sobre objetos, comparaciones de escenas u otros patrones, según la necesidad. La interacción siempre debe poder completarse sin puntería precisa, mediante teclado y lectores de pantalla cuando sea aplicable. No introducir campos de escritura como mecanismo de respuesta.

**Dificultad adaptativa:** ajustar frecuencia, complejidad conceptual y variedad usando historial local; permitir cambios manuales, desactivar presión temporal y ofrecer repaso voluntario. No castigar el error ni ocultar explicaciones esenciales.

**Recompensas:** colecciones temáticas de descubrimientos, vínculos entre personajes, piezas del museo, mapas comentados, citas memorables y evolución del cuaderno. Distintivos/puntos pueden existir de forma discreta; desafío competitivo siempre separado y voluntario. Atlas y museo **no** se desbloquean como premios.

## 4. PLIEGO DEL EQUIPO DE CONTENIDOS

### 4.1 Roles y responsabilidad profesional

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

**Especialista en diseño pedagógico y banco de preguntas**
- Convierte unidades verificables de conocimiento en **preguntas de respuesta seleccionada**, con distractores justos y explicaciones.
- Controla variedad, dificultad, precisión, valor de aprendizaje y repeticiones semánticas.
- Audita la distribución por capítulos, temas, protagonistas y capacidades cognitivas.

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

### 4.3 Banco de preguntas: requisitos de cada registro

Una pregunta publicable necesita **como mínimo**:

1. Identificador permanente y versión editorial.
2. Parte, capítulo, episodio y pasaje(s) de respaldo.
3. Tipo cognitivo y tema: hecho, secuencia, causa/consecuencia, actitud o reacción, diálogo, humor, cita, interpretación, historia, lugar, arte, etc.
4. Enunciado inequívoco en español, sin spoilers de la respuesta en la imagen o el título.
5. **Opciones seleccionables** con identificadores propios y orden presentable aleatoriamente si no cambia el sentido.
6. Una solución exacta o conjunto explícito de alternativas válidas; especificar single-choice, multi-choice, ordenación, emparejamiento o hotspot.
7. Distractores plausibles, no tramposos, estilísticamente equilibrados y libres de falsedades difundidas como hechos.
8. Explicación verificable, breve primero y ampliación opcional.
9. Referencia de evidencia exacta: edición, parte, capítulo, pasaje, cita o paráfrasis, URL de fuente secundaria si aplica.
10. Grado de certeza; para interpretaciones, autoría de la tesis y alternativas admitidas.
11. Dependencias narrativas y restricción de spoilers; cuándo es seguro mostrarla.
12. Requisitos visuales: imagen previa idónea, perspectiva, puntos interactivos, imagen de desenlace, vínculo con acuarela si procede.
13. Dificultad estimada, etiquetas, accesibilidad, idioma, revisión y auditoría de duplicados.
14. Estado: borrador, documentada, revisada, aprobada, descartada; responsables y fechas.

**Prohibiciones:** ninguna respuesta libre escrita; ninguna pregunta improvisada en tiempo de juego con respuesta no verificada; nada de preguntas clones cambiando un sinónimo, el orden o las alternativas; no inventar intenciones de Cervantes; no «todas las anteriores» ambiguo; no sustentar una pregunta textual solo en una versión cinematográfica; no hacer la respuesta obvia por una imagen previa reveladora.

Las **preguntas históricas** se respaldan con fuentes históricas, no solo con la ficción; las de **interpretación** deben formularse como «según esta interpretación documentada...», «¿cuál es una lectura defendible...?» cuando no exista respuesta única. No forzar como verdad conclusiones debatidas.

Aleatoriedad con sentido: mostrar preguntas pertinentes al episodio, sin repetición exacta en la misma sesión, con historial por perfil, dificultad adaptable, repaso inteligente de fallos y control de preguntas agotadas. Las opciones pueden cambiar de orden; nunca alterar el identificador de la respuesta correcta ni la cita asociada.

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

1. Inventario de necesidades por **episodio, escena, perspectiva y función** (antes de pregunta / después / lector / museo / cuaderno / atlas).
2. Buscar primero imágenes oficiales, instituciones, repositorios legítimos y obras de dominio público o licencias compatibles **comprobadas individualmente**.
3. Mantener hoja/manifiesto de procedencia y licencias; conservar original intacto y derivados optimizados con hash y metadatos.
4. Cuando exista EPUB real y autorización, inventariar las imágenes internas sin manipular sistemas de protección ni vulnerar permisos; registrar número real y calidad técnica. Enlazar por capítulo mediante evidencias bibliográficas (incluido QBI cuando corresponda).
5. Para escenas no cubiertas o que requieran una imagen anterior al desenlace, definir **recreación fotorrealista original** con composición histórica validada, continuidad de personajes y revisión artística.
6. No usar imágenes IA como «fotografía histórica», «retrato real» o prueba de la época.
7. Optimizar formatos, dimensiones, niveles de detalle y empaquetado; definir texto alternativo, colorimetría, espacio para controles y opciones de movimiento reducido.
8. Marcar fuente y estado de derechos por **cada archivo y derivado**; material de uso privado no autorizado para redistribución no se sube sin más a un Git remoto ni a un instalador público.
9. Si falta autorización o hay dudas, usar metadatos y placeholders claramente marcados en los contratos, no sustituir sin avisar por una imagen no documentada.

### 4.8 Piloto editorial obligatorio

Seleccionar **seis capítulos representativos**: acción/aventura, diálogo, humor, reflexión, referencias históricas y etapa final de la obra; justificar la muestra antes de ejecutarla. Para cada uno elaborar inventario de episodios, hechos, personajes, lugares, citas, cápsulas, posibles imágenes, preguntas candidatas y evidencia.

Auditar con revisión cruzada filológica e histórica y eliminar duplicados semánticos; medir:

- Preguntas válidas y rechazadas, motivo de rechazo, minutos/horas de investigación por pregunta aprobada.
- Recursos visuales por episodio/perspectiva; imagen histórica vs recreación necesaria.
- Disponibilidad legal, coste/tiempo de licencia o producción, tamaño estimado en disco.
- Necesidades cartográficas/audio/QA y complejidad de integrar fragmentos exactos.
- Variación por tipo de capítulo. No extrapolar multiplicando seis capítulos por 126 sin ponderación.

Publicar **una estimación razonada con intervalo y supuestos**, no prometer 10.000. El propietario validará alcance y fases antes de autorizar producción.

## 5. PLIEGO DEL EQUIPO DE DESARROLLO

### 5.1 Roles y responsabilidad profesional

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

## 6. CONTRATO DE INTEGRACIÓN ENTRE EQUIPOS (OBLIGATORIO)

El factor crítico del proyecto es que **los contenidos y el desarrollo se integren sin interpretación humana informal ni código ad hoc**. Antes de producir lotes, acordar y versionar un **CONTRATO_EDITORIAL_TECNICO.md** con esquemas revisables por ambos responsables, ejemplos válidos y casos negativos.

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

### 6.5 Gobernanza Git y trabajo concurrente

1. Verificar el repositorio exacto **JavierRB35/El_Quijote_App**. En la inspección inicial estaba privado, vacío y con **main** como rama predeterminada. Comprobar de nuevo antes de actuar; si sigue vacío, proponer estructura inicial y crearla únicamente tras autorización.
2. Trabajar en **ramas de trabajo independientes** por equipo y tarea; no editar ambos simultáneamente la misma ruta sin acuerdo.
3. **Los esquemas son propiedad conjunta**: cambios mediante propuesta/ADR y revisión obligatoria de responsables editorial y técnico.
4. Contenido edita el catálogo y metadatos; desarrollo edita la aplicación, pipeline, validadores y estructuras; directrices artísticas, estándares y manifest se revisan conjuntamente.
5. Definir CODEOWNERS o equivalente si el repositorio lo permite; PR pequeños con checklist, pruebas y referencias de decisiones; nunca forzar pushes ni fusionar a main por defecto.
6. Un PR editorial debe indicar cantidades añadidas/descartadas, fuente, validación, activos, licencias, enlaces, spoilers y evidencia de revisión.
7. Un PR técnico debe indicar comportamiento afectado, compatibilidad de esquemas, pruebas unitarias/de integración/UI/offline, migraciones, seguridad y rendimiento.
8. Cuando cambie el contrato, establecer versión, calendario de adaptación y pruebas de consumidor; ningún equipo debe asumir que el otro ha actualizado silenciosamente.
9. Resolver colisiones de IDs, duplicados y cambios de pasajes mediante migraciones/alias y revisión, no mediante renumeración masiva.
10. **No dar una tarea por acabada sin integración real:** validar un paquete representativo de contenidos mediante el consumidor técnico y demostrar en UI sus referencias, preguntas e imágenes.
11. Repositorio remoto público/privado y licencias de activos deben comprobarse antes de cualquier publicación. No subir secretos ni el EPUB privado por defecto.

## 7. CRITERIOS DE CALIDAD Y PRUEBAS

### 7.1 Editoriales, documentales y legales

- **100 %** de preguntas aprobadas con ID único, opciones seleccionadas, respuesta(s) definida(s), explicación, capítulo/pasaje o fuente histórica pertinente, revisión, validez del enlace y estado de licencia de activos.
- **100 %** de citas presentadas como literales cotejadas con la edición declarada. Las adaptaciones se etiquetan.
- **0** preguntas publicadas sin respuesta inequívoca según su formulación; interpretaciones discutidas explícitamente señaladas.
- **0** duplicados semánticos aprobados deliberadamente para aumentar volumen; métricas de posibles duplicados y revisión de falsos positivos.
- **100 %** de imágenes visibles con procedencia, autoría, clase (histórica/foto/recreación) y condición de uso registrada.
- **0** activos de derechos desconocidos o restringidos incluidos inadvertidamente en paquetes o Git remoto no autorizados.
- **100 %** de topónimos/rutas con tipo de certeza y fuente; las rutas inferidas claramente marcadas.
- Ilustraciones Tusell inventariadas **solo después de acceso real al EPUB** y sin prometer un número no verificado.
- Museo y atlas íntegramente accesibles al empezar; no confundir «abierto» con «sin filtros».
- Revisión humana especializada documentada cuando sea necesaria; no certificar validación experta inexistente.

### 7.2 Funcionales y de experiencia de usuario

- Instalación y primera ejecución con red desconectada; recorrer al menos un episodio con escena, pregunta, respuesta seleccionada, explicación, voz/subtítulos, descubrimiento, cuaderno y guardado.
- Cambiar de perfil y demostrar aislamiento de progreso, ajustes, favoritos y anotaciones.
- Acceso al lector completo, búsqueda en ambas partes, navegar desde pregunta a pasaje y volver sin perder posición.
- Preguntas fáciles/difíciles, single/multi-select, orden y hotspot; opciones y respuestas correctas persisten frente a cambios de orden visual; sin campos de respuesta escrita.
- Fallos, pistas y repaso no bloquean la historia. Ajuste de frecuencia de preguntas y desafíos voluntarios.
- Conectividad ausente: atlas, museo, partidas, recursos y mapas locales operativos; IA opcional indica que está sin conexión.
- Imagen previa no revela respuestas y sus hotspots opcionales no interfieren con teclado, pantalla táctil si se admite, o ratón.
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

### FASE 0 — Auditoría y diseño (situación autorizada actualmente)

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

- Contenidos: seis capítulos, preguntas y opciones rigurosas, imágenes autorizadas o recreaciones justificadas, citas, descubrimientos, atlas/museo vinculados, licencias y medios.
- Desarrollo: el mínimo sistema vertical necesario para probar una experiencia representativa end-to-end; no construir módulos aislados imposibles de integrar.
- QA conjunto valida datos, visuales, narración, pregunta seleccionada, respuesta/explicación, texto, mapas, museo, cuaderno, backup y offline.
- El equipo presenta resultados, problemas, tiempo real por pregunta/escena, tamaño y memoria; **replanifica el alcance** con datos antes de escalar.

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

## 9. COORDINACIÓN Y FORMATO DE INFORMES

Cada agente debe comenzar por:

1. Indicar su **modo y roles profesionales**.
2. Leer esta especificación y el **repositorio real**, si se le ha dado acceso; revisar AGENTS.md y documentación vigente sin confundir instrucciones técnicas con decisiones editoriales del propietario.
3. Publicar un resumen conciso de **lo que ya está cerrado**, **lo que es candidato** y **lo que requiere verificación real**.
4. Inspeccionar trabajo existente y preservar cambios ajenos.
5. Señalar explícitamente los contratos que espera del otro equipo y sus entregas propias.
6. Elaborar plan por hitos con responsables, dependencias, métricas y evidencia objetiva.
7. No suponer acceso a libros, imágenes, URLs, permisos, herramientas ni Git que no se haya comprobado.

Cada entrega debe incluir:

- Qué se completó, por quién (rol), dónde está y bajo qué versión.
- Qué fuentes se consultaron y cuáles requieren verificación.
- Qué contratos/esquemas cambian y qué otro equipo debe aprobar.
- Resultado de validadores, pruebas y revisión humana realmente efectuada.
- Dependencias, riesgos, derechos pendientes y propuestas de resolución.
- Qué no se hizo o no se pudo comprobar.
- Solicitud puntual de aprobación **solo** si es imprescindible para la siguiente fase.

**Criterio de excelencia:** al recibir un paquete de contenido aprobado, el equipo de desarrollo puede integrarlo siguiendo esquemas y manifiestos, sin preguntas improvisadas ni reescritura manual; al cambiar la interfaz o el almacenamiento, el equipo editorial puede seguir produciendo sin conocer componentes internos. Ambos equipos comparten fuentes, IDs, versiones, reglas de calidad y pruebas automáticas.

**Instrucción final para ambos:** no te limites a contestar con generalidades. Redacta especificaciones ejecutables, decisiones justificadas, contratos comprobables, ejemplos de registros, inventarios y criterios de aceptación. Señala honestamente lo que no puede saberse antes de inspeccionar el EPUB, validar las licencias, auditar seis capítulos o probar el stack. **Nunca sacrifiques fidelidad a Cervantes, claridad para el jugador ni estabilidad de la integración por una cifra llamativa o una entrega apresurada.**

---

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
