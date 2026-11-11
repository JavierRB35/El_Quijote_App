# Decisiones operativas y política visual vinculante — 2026-11-08

> **Actualización vinculante DC-37 (2026-11-11):** Prevalece sobre la disposición visual anterior que permitía fondos neutros finales o vistas separadas: escena a toda superficie, pergamino integrado, icono de contemplación y menú contextual manchego. Mantener la revisión de recursos del propietario, derechos y flujo DC-36. Consultar [DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md](DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md). Las instrucciones históricas incompatibles se consideran sustituidas **solo en el ámbito indicado**; no se autoriza código ni producción de imágenes.

**Estado:** DECISIÓN DEL PROPIETARIO · vigente para el desarrollo futuro.  
**Fuente y destino únicos del trabajo:** [GitHub `JavierRB35/El_Quijote_App`](https://github.com/JavierRB35/El_Quijote_App), `main` remoto, mediante ramas/PR y fusión controlada.  
**Registro de autoridad:** `docs/VISION_Y_DECISIONES.md`, decisiones DC-23 a DC-27. Estas decisiones **sustituyen**, en lo que contradigan, los procedimientos anteriores de equipos CONTENIDOS/DESARROLLO/COORDINACIÓN y roles R01–R16, y las políticas que aceptaban preguntas definitivas sin imagen. Las auditorías históricas conservan valor probatorio pero no constituyen encargos vivos.

## 1. Organización operativa

1. **Dirección integral (ChatGPT):** una sola entidad que decide producto, narrativa, filología, historia, UX, accesibilidad, dirección artística de selección, priorización, requisitos de calidad, revisión editorial de evidencia y aceptación técnica/funcional; asume la responsabilidad de contrastar las fuentes y registrar sus limitaciones. No simular visados humanos especializados.
2. **Desarrollador:** único interlocutor para implementar y probar código, contratos, validadores, datos, importación, integración de medios y PR; propone soluciones cuando detecta un bloqueo técnico. Dirección revisa el resultado. **Cada encargo al desarrollador debe indicar literalmente el repositorio GitHub como única fuente de verdad del contenido de origen y único destino del desarrollo**, con SHA de `main` inicial, sincronización, entrega mediante PR y SHA final.
3. **Director artístico, tercera entidad de intervención puntual:** solo se le asignan **encargos concretos de creación o modificación de imágenes**, canalizados por el propietario. Dirección inspecciona el inventario primero y redacta prompts precisos con momento narrativo, función, personajes, continuidad, formato, estilo, luz, elementos prohibidos y control antispoiler. Dirección valida el resultado; el desarrollador lo cataloga e integra posteriormente en GitHub con trazabilidad.
4. **Propietario:** conserva las decisiones de negocio, fase, alcance comercial, publicación y distribución. Una decisión de desarrollo **no** levanta las restricciones legales/de licencia, no certifica pruebas no realizadas y no autoriza FASE 2.

Las denominaciones R01–R16 de documentos/PR/Issues antiguos solo identifican procedencia de evidencia; **no se convocan como agentes operativos ni son firmas obligatorias**. Dirección decide con competencia multidisciplinar y trazabilidad, solicitando asesoramiento jurídico externo si fuera imprescindible para un lanzamiento real.

## 2. Política visual obligatoria de las rondas de Aventura

En la aventura narrativa, **cada ronda exige una imagen previa propia y no reveladora** y una representación del acontecimiento posterior. La revisión de inventario se realiza antes de encargar imágenes; el propietario indica las que ya existen y solicita exclusivamente las faltantes mediante prompts fieles al texto de Cervantes.

Una escena de novela no se debe falsificar para convertirla en imagen. Cada preimagen se vincula por ronda y momento: `round_id → capítulo/pasaje → media_asset/preimagen → consecuencia → momento de revelación → licencias → QA`. La falta de un recurso no autoriza a fingir cobertura visual terminada. Conservar obras e imágenes verificables para Historia, Lector, Museo y Cuaderno.

## 3. Política visual de Modo Historia

- La narración definitiva debe ser **rica en imágenes y cambios de plano con propósito narrativo**, no texto sobre fondo neutro durante capítulos completos por comodidad de producción. Planificar como mínimo establecimiento, diálogo/reacción, giro, acción, consecuencias y transición **donde sean pertinentes**; el número concreto de planos depende del ritmo y del guion, no de una cuota artificial.
- **Escenas cinematográficas primero**, combinadas con primeros planos existentes `assets/closeups/` cuando sean aptos. **Acuarelas secundarias** en la narración, separando su lenguaje pictórico, autoría y función de las recreaciones. Imágenes históricas no son prueba de un hecho ficticio.
- El **fondo neutro** permanece únicamente como respuesta técnica de emergencia/prototipo, nunca como pantalla o transición visual terminada y aprobada; conforme a **DC-37**, sustituirlo por recurso artístico contextual apto y autorizado. TS-001 sigue vigente: texto íntegro y legible, con o sin audio e imágenes.
- Cada plano tiene ventana narrativa `no antes de` y `no después de`, y cambia solo por un hecho ya presentado; ningún `scene.media_ids` o `spoiler_level` aislado equivale a aprobación visual. No mostrar `900006` de los molinos en el montaje actual sin resolver continuidad; no bloquear el prototipo técnico por ello.

## 4. Sección artística específica

- Las acuarelas de Salvador Tusell y demás obra iconográfica forman una **sección artística/galería dedicada**, distinta del flujo cinematográfico y de la documentación de hechos históricos.
- Ofrecer exploración de autoría, edición, técnica, fecha, episodio, fuente y comparación opcional con escenas de la aplicación. La galería puede estar accesible voluntariamente desde el inicio, con advertencias de posibles spoilers; las sugerencias contextuales de Historia no adelantarán hechos.
- Integrar solo recursos con procedencia, atribución y permisos compatibles con el **ámbito real** de uso; `DQ.LIC.0001.redistribution=condicionada` y otras restricciones conservan vigencia. No confundir uso interno en repo privado con publicación pública/comercial.

## 5. Flujo de ejecución y criterios de aceptación

1. Dirección consulta GitHub, mantiene **inventario de cobertura por episodio y ronda**, selecciona escenas existentes, comprueba candidatos secundarios y genera lista de huecos visuales.
2. Si falta arte, Dirección proporciona al propietario **prompt exacto por imagen** para encargarlo al director artístico; identifica imagen, objetivo expresivo, uso antes/después del hecho y limitaciones.
3. El desarrollador toma sus datos **solo de GitHub**, verifica el SHA de `main`, aplica la estrategia de integración de DC-29, produce software y validaciones y entrega commits identificables al mismo GitHub. No deja entregas solo locales ni omite las pruebas obligatorias.
4. Dirección verifica integridad, fidelidad, cobertura visual y corrección del producto con pruebas ejecutadas. Las PR documentales antiguas no requieren rondas de aprobación entre roles.
5. Cada capítulo tiene dos hitos distintos:
   - **Vertical técnico jugable:** el reproductor es verificable con recursos neutros y/o provisionales, sin alterar derechos.
   - **Capítulo visualmente aceptado:** preimágenes propias para **todas** sus rondas de anticipación y secuencia narrativa visualmente suficiente, con coherencia, accesibilidad, QA y permisos para el uso declarado.

**No cambia:** orden de Cervantes, fidelidad textual y grado de certeza, respuesta seleccionada, offline, TS-001, seguridad, privacidad, seguimiento de progreso y derechos de terceros. **No autoriza distribución, comercialización ni FASE 2.**

## 6. Sustituciones explícitas de normas anteriores

| Texto/política anterior | Sustituido por |
|---|---|
| Trabajos divididos entre R01–R16 o equipos contenidos/desarrollo/coordinación con múltiples visados | Dirección integral + desarrollador; artista solo para imágenes puntuales |
| Rondas sin preimagen propia o con imagen genérica repetida | Preimagen específica por ronda como requisito de aceptación visual |
| Uso indistinto de acuarela y recreación sin prioridad artística | Escenas prioritarias; acuarelas secundarias en gameplay y prioritarias en galería |
| Segundo tramo de los molinos neutro como montaje final aceptado por defecto | Neutralidad técnica provisional/segura; capítulo final exige ritmo visual y cobertura suficiente |
| Encargos de auditoría y dictámenes sucesivos como principal medida de progreso | Entregas funcionales en GitHub, prueba reproducible y cobertura audiovisual contrastada |

Este documento no declara existente ninguna integración visual o función de galería que aún no se haya construido. Debe leerse junto a `docs/ENCARGO_MAESTRO.md` y `docs/VISION_Y_DECISIONES.md` según la precedencia por fecha y especificidad de decisión.

## 7. Ampliación vinculante DC-28 — composición texto + imagen

**Decisión posterior y prevalente del propietario (2026-11-08):** en **todo cuadro de texto sobre imagen** no se admite scroll de ningún eje; cuando el contenido no cabe, se amplía primero su **anchura dentro de zonas visuales seguras**, sin ocultar rostros, gestos, acción, pistas ni hotspots. Si eso no basta, se reduce tipografía **solo hasta un mínimo legible y accesible**, sin suprimir texto ni botones. El fondo es **siempre semitransparente**, con contraste evaluado sobre escena real. Cada composición se acepta en conjunto únicamente si puede funcionar como **póster**. Ninguna limitación de altura anterior ni el panel ampliable justifican incumplirlo.

El principio **TS-001** se preserva: no es admisible esconder parte de una intervención detrás de un scroll. Los cajones abiertos sobre la imagen también están sujetos; para textos irresolubles en la zona segura, exigir solución de arte/encuadre o **otra composición de escena completa o partición editorial aprobada conforme a DC-37**, no forzar una letra ilegible. Documento técnico, trazabilidad y checklist: [Dictamen DC-28](DICTAMEN_COMPOSICION_TEXTO_IMAGEN_2026-11-08.md). Esta actualización es documental; no certifica que la aplicación ya pase las pruebas.
