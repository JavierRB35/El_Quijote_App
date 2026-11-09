# Dirección artística — Validación gráfica Modo Historia sin scroll

**Entregable:** [póster visual I01 (SVG autocontenido)](historia_i01_poster_sin_scroll.svg). **Modo:** propuesta gráfica de Dirección Artística; sin modificación de aplicación ni visado de runtime. **Fecha:** 2026-11-08.

**Fuente y destino únicos:** GitHub `JavierRB35/El_Quijote_App`. **SHA de `main` inicial verificado:** `8e3ec9694298b13c204aaffd1b70febc38e36fb3`. Rama: `feature/r06-ejemplo-poster-historia-sin-scroll-20261108`. No se alteran WebP, fichas, `review.state`, contratos ni código.

## Escena y material originales

**Parte I, capítulo VIII, escena de los molinos, B01 / intervención I01, NARRADOR.** Se utiliza el MediaAsset real **`DQ.MA.900030`** con `logical_uri = assets://scenes/part_1/chapter_08/p1_c08_molinos_siluetas_pre_safe_right_v2.webp`, que ya incluye una zona de respiro visual a la derecha; es un activo de `review.state=borrador`. **No se presenta como aprobación editorial o puesta en producción.**

- Imagen base: `assets/scenes/part_1/chapter_08/p1_c08_molinos_siluetas_pre_safe_right_v2.webp`, Git blob **`0dc4ae303586d8cad68b9b2edb1f35571d9f27f7`**.
- Ficha MediaAsset: `content/piloto/media_assets/DQ.MA.900030.json`, blob **`c31ed8757007d1980729db791b317f2b6e7159c7`**.
- Texto: `docs/FICHA_ESCENA_P1_C08_MOLINOS.md`, blob **`ec7351ec4f3dab10ab0b19f72597b4ba934fe9de`**, intervención **I01 / NARRADOR**, pasaje vinculado `DQ.P1.C08.P0001`.

La intervención mostrada es **íntegra, sin cortes, añadidos ni elipsis**:

> En esto, descubrieron treinta o cuarenta molinos de viento que hay en aquel campo; y, así como don Quijote los vio, dijo a su escudero:

El **SVG** es una composición autocontenida de **1672 × 941 px**: incorpora el **WebP original exacto en base64** y superpone únicamente elementos tipográficos y un panel translúcido; el WebP no se recorta, recomprime ni modifica.

## Composición recomendada y criterios cuantificables

| Requisito | Decisión gráfica | Dictamen en el ejemplo |
|---|---|---|
| **No scroll** | Seis líneas estáticas completas de I01, tipografía `32px`, interlínea `43px`, sin contenedor desplazable, puntos suspensivos ni texto escondido | **CUMPLE en maqueta** |
| **Ensanche antes de bajar letra** | Panel lateral **x=1070 a 1620**, ancho **550 px = 32,9 % del lienzo**, contenido útil x=1108 a ~1582, ancho **474 px**. Línea más ancha ≈**437 px** (medida con DejaVu Serif 32), margen ≈37 px. Se ha ensanchado hasta donde el entorno permite sin cubrir el núcleo de acción | **CUMPLE en maqueta** |
| **Tipografía pequeña solo como último recurso** | `32px` de cuerpo, sin reducción respecto al diseño propuesto. Si otra intervención no cabe, se aumentará **primero el ancho** dentro de la zona segura y **solo después** se reducirá tipografía hasta un mínimo que deberá aprobar UX. Si sigue sin caber, será necesario **nuevo encuadre o otra maquetación segura**, no scroll ni tapar acción | **NO NECESARIA en I01**; regla pendiente de implementación |
| **Panel semitransparente** | `fill=#14201F`, `fill-opacity=0.76`: deja traslucir **24 % del paisaje**; desenfoque suave de `7px` aplicado solo detrás del panel y filete claro muy fino. No es una superficie opaca | **CUMPLE** |
| **Legibilidad** | Cuerpo serif crema `#FFFAF0`, títulos serif grandes `47px`, hablante `18px` versal sans, metadatos `15–17px`; relleno lateral de `38px`, texto organizado sin solapamientos | **FAVORABLE preliminar** |
| **No invasión de área relevante** | Don Quijote, Sancho, Rocinante, rucio, lanza y molinos están en izquierda/centro (hasta aprox. x=1000); el panel empieza en **x=1070** y cubre únicamente cielo y campo de respiración | **CUMPLE visualmente**, QA final pendiente |
| **«Tipo póster»** | Fotograma completo y dominante; título editorial, línea dorada sutil, rótulo del narrador, cita y pie; unidad de color y lectura escalonada. El panel ocupa cerca de un tercio, la historia visual sigue siendo protagonista | **OPCIÓN RECOMENDADA** |

**Comprobación analítica de contraste (solo cuerpo):** suponiendo una zona blanca (`RGB 255,255,255`) bajo un panel `#14201F` a 76 % de opacidad, el fondo compuesto es aprox. `RGB(76,86,85)`; con cuerpo `#FFFAF0`, la relación de contraste calculada es **≈7,32:1**, por encima de referencia AAA de `7:1` para texto normal. Es una cota teórica de mezcla sobre blanco, no medición de capturas de ejecución; contraste de títulos, etiquetas y valores finales requieren verificación visual R08/R12.

**Sin scroll, también en ventanas de otro formato:** como imagen de demostración el SVG usa `viewBox` con escalado proporcional `contain`; no introduce desplazamiento interno. Para aplicación real deben medirse los tamaños resultantes y el tratamiento del texto a 1280×800, 1366×768, 1920×1080 y ampliación al 200 %. **No se declara validado el runtime por disponer de este SVG.**

## Reglas para diseño reusable posterior (no implementadas)

1. Identificar la **zona segura** del recurso, preservando personajes, manos, miradas y objetos decisivos.
2. Comprobar el texto exacto y **ensanchar el panel** hasta el límite narrativamente seguro.
3. Si no cabe en ancho y alto disponibles, **reducir tamaño manteniendo un mínimo accesible medido**; nunca ocultar líneas ni crear scroll.
4. Si no cumple, cambiar a una maquetación con texto exterior / reservar otra zona o **encargar una imagen diseñada para ese texto**, no sacrificar legibilidad ni tapar el hecho narrativo.
5. Usar una regla general a partir de metadatos de zona segura; **no copiar valores x/y de este póster a CSS productivo por ID de imagen**.

## Límites, pruebas y aprobación pendientes

Este es un **ejemplo gráfico único**, no prueba que todas las intervenciones —particularmente I02/I07/I11/I14, mucho más extensas— quepan sin scroll sobre cualquier imagen. R08/R12 deberán verificar en el producto real: integridad TS-001 con y sin audio, zoom de texto 200 %, contraste de todos los elementos, navegación por teclado/foco, movimiento reducido, ausencia de cortes/scroll y preservación de zonas de interés en tamaños 1920×1080, 1366×768, 1280×800 y ventana estrecha. Si el diseño deja de caber de manera accesible, **solicitar otra imagen con zona negativa mayor** y reconsiderar la maquetación. No alterar pasajes para conseguir un aprobado visual.

## Trazabilidad adicional

- `docs/AUDITORIA_COMPOSICION_CAPITULO_VIII_2026-11-08.md` — blob `11d4e7d4652952ba89b527f2269bb4612755fa25` (clasificación y regeneración `safe_right_v2`).
- `docs/DIRECCION_ARTISTICA_PILOTO.md` — blob `f8662007eb44cec05d92281f52516fbcdebd8071`.
- `docs/DECISIONES_OPERATIVAS_Y_POLITICA_VISUAL_2026-11-08.md` — blob `18213613f1e7702436ca30c7a5512cc8793c1ba6`, mantiene imágenes suficientes en Historia y `review.state` condicionado.
- Criterio aceptado para este **encargo**: *no scroll → ensanchar sin invadir → reducir solo si legible → semitransparencia → calidad póster*.

**No se solicita fusión automática.** La validación gráfica no equivale a validación del reproductor, derechos de publicación ni GO de runtime.
