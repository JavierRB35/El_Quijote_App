# MUSEO — MAQUETA VISUAL OFICIAL APROBADA (V1)

**Decisión irrevocable de estilo salvo nueva autorización expresa del propietario, 2026-11-08.**

**Repositorio canónico:** https://github.com/JavierRB35/El_Quijote_App  
**Encargo funcional:** [Issue #73](https://github.com/JavierRB35/El_Quijote_App/issues/73)  
**Regla de visualización patrimonial:** [Issue #75](https://github.com/JavierRB35/El_Quijote_App/issues/75)

## 1. Imagen de referencia obligatoria: reproducirla FIELMENTE

- **Fichero binario aprobado:** `MUSEO_REFERENCIA_VISUAL_OFICIAL.png`
- **Dimensiones:** 1672 × 941 px, PNG, orientación horizontal.
- **SHA-256 exacto:** `7c1e1f5159838750af90493f87ca7c305077c2dcee776483202d1ed3edbf4c1a`.
- **Ubicación persistente actual:** Biblioteca del proyecto `/EL_QUIJOTE/MUSEO_REFERENCIA_VISUAL_OFICIAL.png`; una copia descargable de la imagen se entregó al propietario en ChatGPT.
- **Ubicación canónica que debe adquirir en ESTE repositorio en la PR de Museo:** `docs/referencias/museo/MUSEO_REFERENCIA_VISUAL_OFICIAL.png`. **ADVERTENCIA DE TRAZABILIDAD:** esta especificación en GitHub **no acredita aún que el PNG esté subido al repositorio**. Se requiere añadir el archivo binario idéntico y verificar exactamente el SHA-256 anterior ANTES del desarrollo/QA del Museo; si no, informar del bloqueo. No sustituir por captura regenerada, render distinto, JPG comprimido o mockup aproximado. No falsear su presencia en GitHub.

### Preservación de la composición aprobada

Esta pantalla no es inspiración genérica: constituye **referencia visual exacta de aceptación**. Evitar reinterpretaciones. Mantener:
- **Cabecera horizontal** azul noche con logotipo dorado «El Quijote» a la izquierda, navegación **Historia · Aventura · Museo · Atlas · Lector** al centro, **Museo resaltado en dorado**, ajustes y ayuda a la derecha. Filete dorado fino de separación.
- **Área principal de obra a la izquierda (~69 % del ancho)**, la acuarela **íntegra** y sin superposición de textos, acciones flotantes limitadas a flechas de navegación y botón discreto de ampliar. El fondo exterior es oscuro, neutro, elegante.
- **Ficha editorial oscura a la derecha (~28 % ancho), fuera del rectángulo de la obra**: sobreencabezado/colección, título grande, pastilla «Parte I · Capítulo VIII», bloque «Explicación» breve, separador, bloque «Texto original» con cita corta cursiva y resaltado oro, separador, dos acciones **«Ver la obra completa»** y **«Ficha de la imagen»**, separador y **línea pequeña de fuente / procedencia en el pie**.
- **Carrusel horizontal de cinco miniaturas** en banda inferior, obra activa con filete dorado, navegación anterior/siguiente a los extremos y armonía visual con la ficha.
- Tipografía clásica/serif, paleta azul noche–pergamino–oro, bordes finos, sombras sutiles y amplios espacios para mirar la imagen.
- En la maqueta de 1672×941, el lienzo de imagen se aproxima a x=0–1145, y=80–760; la ficha a x=1160–1640 y=88–694, y el carrusel desde y≈767. Estas medidas **sirven como patrón de proporciones**, no como obligación de fijar píxeles para todas las pantallas.
- **No poner un bloque de texto encima de la acuarela.** No hacer un panel inferior enorme. No cambiar la maquetación por una cuadrícula de tarjetas mientras se mira una obra. No producir pantallas individualizadas por acuarela.

## 2. Texto editorial y procedencia de cada obra

La ficha de museo debe incluir **ambas** cosas que pide el propietario: (a) identificación **Parte y Capítulo**, (b) explicación concisa y (c) **fragmento literal de la fuente de Cervantes**, cotejado con `content/textos/gutenberg_2000/El_Quijote.txt` PG #2000 y con pasaje canónico cuando lo haya; no inventar comillas ni asumir que las frases de la maqueta generada sean transcripciones verificadas.

**Se añade una cuarta obligación explícita: (d) pequeña fuente de la IMAGEN**, preferiblemente bajo los botones y separada por filete fino, con este patrón de datos:
> **Fuente:** [autor/atribución verificada] · [edición y fecha verificadas] · [institución/colección/repositorio si consta] · [ID canónico de obra].
No inventar autores, colecciones ni años. Si un dato no está acreditado, mostrar «Procedencia pendiente de verificar» en lugar de un dato falso. La ficha detallada incluirá fuente, referencias, identificador de manifiesto, licencia/estado de derechos y créditos ampliados.

**Caso de ejemplo de acuarelas del banco:** `assets/ilustraciones_tusell/manifests/manifest_ilustraciones.json` y `content/piloto/licenses/DQ.LIC.0001.json` apuntan a acuarelas de **Salvador Tusell**, edición **Luis Tasso, 1905**, con `redistribution=condicionada` y fallecimiento/derechos España aún no resueltos. Verificar individualmente antes de atribuir cada una. No extrapolar autoría a nuevas imágenes.

**AVISO IMPORTANTE SOBRE LA IMAGEN MAQUETA:** el gran paisaje de molinos del PNG aprobado es una **ilustración conceptual generada con IA solo como patrón visual**, NO una acuarela de Salvador Tusell, ni de José Segrelles, ni una obra conservada en una colección privada. La maqueta oficial ya muestra al pie «Fuente de esta maqueta: recreación conceptual generada con IA». Sustituir la **obra representada** por el JPG real del catálogo en producción, **sin alterar la estructura compositiva aprobada**. No atribuir el placeholder a un artista real.

## 3. Obra íntegra, nunca distorsionada

Para las acuarelas de proporciones diferentes a 16:9: `object-fit: contain` o equivalente, sin deformar ni recortar un solo borde ni alterar el JPG original. Usar márgenes/pillarbox/letterbox elegantes del propio marco, **nunca estirar la acuarela para replicar un mockup horizontal**. La imagen es siempre protagonista y debe poder abrirse sola en tamaño completo. Miniaturas preferiblemente fieles también, sin cortar elementos sustantivos.

La fuente, metadatos y texto se muestran **fuera** de la obra. En pantallas estrechas, mantener **prioridad visual de la obra** y reflujo de la ficha por debajo o a panel de consulta voluntario sin superposición por defecto. No reducir legibilidad por preservar una foto artificialmente grande.

## 4. Comportamiento y QA

- Reutilizar una sola pantalla/ficha configurada desde `manifest_ilustraciones.json` y metadatos editoriales, para 376 acuarelas, no un componente por obra.
- Navegar con flechas y miniaturas; selección activa, carga offline, foco/teclado y accesibilidad. «Ver obra completa» realmente abre vista sin texto encima, preservando proporción y permitiendo retorno sin perder posición. «Ficha de la imagen» abre créditos/derechos completos.
- Verificar en 1672×941 (patrón), 1920×1080, 1366×768, 1280×800 y móvil, texto ampliado, obras verticales/horizontales. Requerir **comparación directa pixel/perceptual con la maqueta** en escritorio, justificando única y exclusivamente diferencias por adaptación responsive y uso de las verdaderas obras de catálogo.
- **No difundir públicamente acuarelas históricas** mientras su licencia de redistribución siga condicionada. Mockup de diseño aceptado ≠ autorización jurídica.
- No fusionar una implementación que rediseñe el Museo sin aceptación expresa de Dirección.

## 5. Estado del artefacto

- **Aprobado:** concepto compositivo exacto y texto pequeño de fuente.
- **Guardado:** archivo PNG oficial en Biblioteca del proyecto con la huella arriba indicada; especificación canónica en GitHub.
- **Pendiente en GitHub:** importar **exactamente el mismo PNG** a `docs/referencias/museo/MUSEO_REFERENCIA_VISUAL_OFICIAL.png`, verificando SHA-256. Este pendiente es de transferencia del binario, no autoriza generar otro diseño ni supone que el fichero ya exista en GitHub.
