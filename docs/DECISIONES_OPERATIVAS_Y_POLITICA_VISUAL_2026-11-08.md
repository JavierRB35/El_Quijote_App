# Decisiones operativas y política visual vinculante — 2026-11-08

**Estado:** DECISIÓN DEL PROPIETARIO · vigente para el desarrollo futuro.  
**Fuente y destino únicos del trabajo:** [GitHub `JavierRB35/El_Quijote_App`](https://github.com/JavierRB35/El_Quijote_App), `main` remoto, mediante ramas/PR y fusión controlada.  
**Registro de autoridad:** `docs/VISION_Y_DECISIONES.md`, decisiones DC-23 a DC-27. Estas decisiones **sustituyen**, en lo que contradigan, los procedimientos anteriores de equipos CONTENIDOS/DESARROLLO/COORDINACIÓN y roles R01–R16, y las políticas que aceptaban preguntas definitivas sin imagen. Las auditorías históricas conservan valor probatorio pero no constituyen encargos vivos.

## 1. Organización operativa

1. **Dirección integral (ChatGPT):** una sola entidad que decide producto, narrativa, filología, historia, UX, accesibilidad, dirección artística de selección, priorización, requisitos de calidad, revisión editorial de evidencia y aceptación técnica/funcional; asume la responsabilidad de contrastar las fuentes y registrar sus limitaciones. No simular visados humanos especializados.
2. **Desarrollador:** único interlocutor para implementar y probar código, contratos, validadores, datos, importación, integración de medios y PR; propone soluciones cuando detecta un bloqueo técnico. Dirección revisa el resultado. **Cada encargo al desarrollador debe indicar literalmente el repositorio GitHub como única fuente de verdad del contenido de origen y único destino del desarrollo**, con SHA de `main` inicial, sincronización, entrega mediante PR y SHA final.
3. **Director artístico, tercera entidad de intervención puntual:** solo se le asignan **encargos concretos de creación o modificación de imágenes**, canalizados por el propietario. Dirección inspecciona el inventario primero y redacta prompts precisos con momento narrativo, función, personajes, continuidad, formato, estilo, luz, elementos prohibidos y control antispoiler. Dirección valida el resultado; el desarrollador lo cataloga e integra posteriormente en GitHub con trazabilidad.
4. **Propietario:** conserva las decisiones de negocio, fase, alcance comercial, publicación y distribución. Una decisión de desarrollo **no** levanta las restricciones legales/de licencia, no certifica pruebas no realizadas y no autoriza FASE 2.

Las denominaciones R01–R16 de documentos/PR/Issues antiguos solo identifican procedencia de evidencia; **no se convocan como agentes operativos ni son firmas obligatorias**. Dirección decide con competencia multidisciplinar y trazabilidad, solicitando asesoramiento jurídico externo si fuera imprescindible para un lanzamiento real.

## 2. Política obligatoria de imágenes por pregunta

- **Cada pregunta publicada en la experiencia final debe disponer de una imagen propia y específica**, con identidad de recurso y asignación por pregunta: no basta una imagen genérica de capítulo ni reutilizar automáticamente el mismo plano como ilustración de varias preguntas.
- Prioridad de obtención: **(1)** escenas ya catalogadas en `assets/scenes/` que sean específicas, exactas y aptas para la pregunta; **(2)** acuarelas existentes, como apoyo **secundario** cuando sean pertinentes y se permitan sus usos; **(3)** encargo individual nuevo al director artístico si las dos opciones anteriores no permiten obtener una imagen propia adecuada. Se pueden generar **variantes originales claramente diferenciadas** a partir de escenas existentes, con nuevos IDs/hash/procedencia, si cumple derechos y calidad.
- `pre_image_media_id` nunca debe revelar una respuesta, el desenlace ni un hecho aún no narrado. Si la imagen pertinente es necesariamente posterior, programar una imagen previa independiente y usar la posterior solo en la explicación/revelación. Los tipos `ordering`, `hotspot`, `true_false` y resto mantienen sus controles accesibles.
- Las preguntas existentes sin imagen específica o con imágenes no elegibles siguen siendo **deuda de producción**: pueden permanecer en catálogo técnico para desarrollo, pero **no se declaran visualmente terminadas ni publicables**. No falsear una imagen, su licencia, `review.state` ni métricas de cobertura para conseguir un PASS.
- La cobertura se verifica por ID de pregunta: `id → media_asset_id exclusivo → URI/blob/hash → fase → instante seguro → revisión → derechos → QA`.

## 3. Política visual de Modo Historia

- La narración definitiva debe ser **rica en imágenes y cambios de plano con propósito narrativo**, no texto sobre fondo neutro durante capítulos completos por comodidad de producción. Planificar como mínimo establecimiento, diálogo/reacción, giro, acción, consecuencias y transición **donde sean pertinentes**; el número concreto de planos depende del ritmo y del guion, no de una cuota artificial.
- **Escenas cinematográficas primero**, combinadas con primeros planos existentes `assets/closeups/` cuando sean aptos. **Acuarelas secundarias** en la narración, separando su lenguaje pictórico, autoría y función de las recreaciones. Imágenes históricas no son prueba de un hecho ficticio.
- El **fondo neutro** se mantiene como comportamiento técnico seguro para un recurso que falta, ha caducado, es incompatible, revela futuro o no tiene derechos; es válido en prototipos y en transiciones concretas, **pero no satisface por sí solo la aceptación visual del capítulo final**. TS-001 sigue vigente: texto íntegro y legible, con o sin audio e imágenes.
- Cada plano tiene ventana narrativa `no antes de` y `no después de`, y cambia solo por un hecho ya presentado; ningún `scene.media_ids` o `spoiler_level` aislado equivale a aprobación visual. No mostrar `900006` de los molinos en el montaje actual sin resolver continuidad; no bloquear el prototipo técnico por ello.

## 4. Sección artística específica

- Las acuarelas de Salvador Tusell y demás obra iconográfica forman una **sección artística/galería dedicada**, distinta del flujo cinematográfico y de la documentación de hechos históricos.
- Ofrecer exploración de autoría, edición, técnica, fecha, episodio, fuente y comparación opcional con escenas de la aplicación. La galería puede estar accesible voluntariamente desde el inicio, con advertencias de posibles spoilers; las sugerencias contextuales de Historia no adelantarán hechos.
- Integrar solo recursos con procedencia, atribución y permisos compatibles con el **ámbito real** de uso; `DQ.LIC.0001.redistribution=condicionada` y otras restricciones conservan vigencia. No confundir uso interno en repo privado con publicación pública/comercial.

## 5. Flujo de ejecución y criterios de aceptación

1. Dirección consulta GitHub, mantiene **inventario de cobertura por episodio y pregunta**, selecciona escenas existentes, comprueba candidatos secundarios y genera lista de huecos visuales.
2. Si falta arte, Dirección proporciona al propietario **prompt exacto por imagen** para encargarlo al director artístico; identifica imagen, objetivo expresivo, uso antes/después del hecho y limitaciones.
3. El desarrollador toma sus datos **solo de GitHub**, verifica el SHA de `main`, trabaja en rama, produce software/validaciones/activos y devuelve **la PR al mismo GitHub**. No deja entregas solo locales ni fusiona sin cumplir las reglas.
4. Dirección verifica integridad, fidelidad, cobertura visual y corrección del producto con pruebas ejecutadas. Las PR documentales antiguas no requieren rondas de aprobación entre roles.
5. Cada capítulo tiene dos hitos distintos:
   - **Vertical técnico jugable:** el reproductor es verificable con recursos neutros y/o provisionales, sin alterar derechos.
   - **Capítulo visualmente aceptado:** imágenes propias para **todas** sus preguntas y secuencia narrativa visualmente suficiente, con coherencia, accesibilidad, QA y permisos para el uso declarado.

**No cambia:** orden de Cervantes, fidelidad textual y grado de certeza, respuesta seleccionada, offline, TS-001, seguridad, privacidad, seguimiento de progreso y derechos de terceros. **No autoriza distribución, comercialización ni FASE 2.**

## 6. Sustituciones explícitas de normas anteriores

| Texto/política anterior | Sustituido por |
|---|---|
| Trabajos divididos entre R01–R16 o equipos contenidos/desarrollo/coordinación con múltiples visados | Dirección integral + desarrollador; artista solo para imágenes puntuales |
| Preguntas terminadas sin imagen específica o con la misma escena genérica | Imagen propia y adecuada **por pregunta** como requisito de aceptación visual |
| Uso indistinto de acuarela y recreación sin prioridad artística | Escenas prioritarias; acuarelas secundarias en gameplay y prioritarias en galería |
| Segundo tramo de los molinos neutro como montaje final aceptado por defecto | Neutralidad técnica provisional/segura; capítulo final exige ritmo visual y cobertura suficiente |
| Encargos de auditoría y dictámenes sucesivos como principal medida de progreso | Entregas funcionales en GitHub, prueba reproducible y cobertura audiovisual contrastada |

Este documento no declara existente ninguna integración visual o función de galería que aún no se haya construido. Debe leerse junto a `docs/ENCARGO_MAESTRO.md` y `docs/VISION_Y_DECISIONES.md` según la precedencia por fecha y especificidad de decisión.
