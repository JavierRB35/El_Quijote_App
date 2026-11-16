# DC-42 — Canon vinculante de la celada y diferenciación de personajes
**Fecha:** 16 de noviembre de 2026 · **Decisión:** aprobación expresa del propietario · **Ámbito:** producción de imágenes, continuidad, Historia, Aventura, Museo y otros consumidores · **Repositorio de autoridad:** `JavierRB35/El_Quijote_App/main`.

## 1. Única referencia visual aprobada para la celada final
**Imagen escogida:** LÁMINA 1 — IMAGEN 1 (cuadrante superior izquierdo), elegida expresamente por el propietario el 16-11-2026. No son aceptables las otras tres imágenes de la lámina ni las láminas 2–4 como referencia alternativa.

**Recurso inmutable de referencia:** [celada_canon_lamina_1_imagen_1.webp](../assets/scenes/_art_direction/celada_canon_lamina_1_imagen_1.webp) · WebP de 512 × 338 píxeles, recorte del cuadrante aprobado · SHA-256: `50365eb7ba395ddfd5d09acec17d31cf5a2ee65b1b41982c7e930d395c38d7a3` · Git blob SHA: `84b2155554b462558b4d6b43525c4ae941390687`.

**Rasgos visuales OBLIGATORIOS cuando lleve su celada final:** morrión antiguo de hierro oscuro con pátina, abolladuras y cimera/ala conservadas; media celada de cartones pardos claramente añadida y adaptada de modo imperfecto a la pieza metálica; protección frontal angulosa, austera, con abertura visual horizontal estrecha; nudos y cintas textiles verde apagado, con unión artesanal visible, sin sustituirlos por correas negras/metálicas; materiales claramente diferentes (hierro frente a cartón), envejecidos. Interior reforzado por barras de hierro visible cuando la perspectiva lo permite. Geometría, tono y carácter improvisado se tomarán de **esta única imagen**, sin reinterpretarla como yelmo enteramente metálico, casco íntegro de cartón, sombrero de hojas ni casco de fantasía o de placas perfectamente homogéneas. Las cintas son **verdes**, no doradas ni pardas.

**Fidelidad literaria y límites:** conforme a `content/textos/gutenberg_2000/El_Quijote.txt` (DC-31), Parte I, cap. I (morrión, primera celada de cartón rota y segunda reforzada interiormente con hierro) y cap. II (cintas verdes que no pueden desanudarse sin cortar). La geometría precisa del aparato y la posición de cada nudo no están fijadas literalmente por Cervantes: la **imagen aceptada fija la interpretación artística del proyecto**, no constituye prueba de forma histórica exacta. No añadir hechos o piezas incompatibles con las escenas.

## 2. Continuidad cronológica OBLIGATORIA
1. **Antes de la fabricación:** solo morrión antiguo, sin cartones añadidos ni cintas finales.
2. **Primer ensayo no reforzado:** cartones sobre morrión, posible debilidad; no insertar por adelantado el acabado definitivo.
3. **Rotura del primer ensayo:** mantener el cartón roto y el hierro base sin cambios de causalidad.
4. **Tras segunda construcción reforzada y durante primera salida:** celada canónica con hierro base, cartón, refuerzos internos y nudos/cintas verdes. La visera debe tener posición **bajada** si el texto exige ocultar rostro, o **alzada** si el texto exige revelar rostro/gesticular/comer. No retirar el conjunto por comodidad visual; en la venta conserva las cintas atadas hasta donde dice el texto.
5. Evitar **anacronismos narrativos**: Sancho no interviene en los capítulos I–II de la primera parte. El ventero que recibe y arma caballero a don Quijote no es Sancho.

## 3. Mandato de sustitución restringida — solo celada
En imágenes existentes en los capítulos I–II con celada de la etapa final, reemplazar **solo los píxeles de casco, cartones, visera, cintas y nudos que correspondan al objeto**; en caso imprescindible, únicamente el contorno ocluido por ese objeto. Prohibido modificar rostro, cabello fuera del objeto, anatomía, manos, ropa, caballo, escenografía, luz, encuadre, objetos, expresiones o otros personajes. Mantener resolución y relación de aspecto. En las imágenes en que don Quijote sujeta el casco en las manos, editar **el objeto sostenido**, no la cabeza. Respetar el contacto físico con manos, caña para beber y comida. Cada corrección tendrá `original` de respaldo, versión derivada, máscara y comprobación de que **los píxeles fuera de la máscara son exactamente iguales**. No reemplazar un archivo aprobado por un render de escena completa que cambie el entorno, aunque sea parecido.

**Activación:** SOLO después de editar realmente el binario, comprobar comparación fuera de máscara, coherencia narrativa y visual, actualizar `assets/scenes/manifest.json` (hash, metadatos si aplican) y realizar commit verificado en `main`. El archivo canónico guardado bajo `_art_direction/` es una **referencia artística**, no sustituye por sí mismo a ninguna escena y no debe añadirse como imagen de capítulo jugable.

## 4. Identidad visual inequívoca de personajes — OBLIGATORIA
**Ningún par de personajes diferentes podrá aparentar ser la misma persona ni presentar fisonomías confundibles.** Se exige ficha individual de continuidad por personaje, con rasgos suficientemente diferenciados de cara, cejas, nariz, mandíbula, ojos, edad aparente contextualizada, silueta corporal, pelo, barba/bigote, vestuario, paleta y postura. No basta cambiar el color de ropa si el rostro permanece duplicado. No reciclar la misma cara generada ni el mismo referente entre personajes distintos.

**Control prioritario:** **Sancho Panza vs. ventero de la venta de la investidura**: aunque pudieran compartir complexión robusta, deberán ser distinguibles de inmediato por identidad facial, silueta, pelo, vello facial, indumentaria, rol y expresión. Respetar descripciones de Cervantes cuando existan, evitando inventar rasgos como certezas del texto. Verificar diferenciación tanto por separado como en una comparativa lado a lado, también frente al cura, barbero, labradores y secundarios. Tampoco homogeneizar a dos mujeres u otros secundarios si son personajes diferentes.

**Criterio de rechazo automático de arte:** casco distinto de la referencia en etapa final, cambio exterior a la máscara en una corrección de celada, dos personajes confundibles o inversión de cronología. La continuidad es transversal al proyecto y se verifica en prompts y aceptación de imágenes.

## 5. Inventario de auditoría y estado real
Consultar [auditoría de 56 recursos de I.1 e I.2](AUDITORIA_CELADA_P1_C01_C02_2026-11-16.md) y [registro legible por máquina](AUDITORIA_CELADA_P1_C01_C02_2026-11-16.json). La **aprobación de la referencia** no equivale a la aprobación de 29 futuros retoques. Al crear esta directriz, las escenas preexistentes permanecen sin sustitución; no afirmar lo contrario. La instrucción expresa del propietario autoriza la corrección restringida, pero su ejecución y QA deben acreditarse individualmente.

## IMPACTO TRANSVERSAL Y REUTILIZACIÓN
- **Causa raíz:** distintas interpretaciones incoherentes de una misma pieza de utilería y riesgo de duplicación de identidades faciales.
- **Corrección común:** fuente de referencia única + etapas narrativas + regla de inpainting enmascarado, invariancia de píxeles y ficha de personajes.
- **Consumidores:** Historia, Aventura y Museo en escenas actuales, nuevos capítulos y posteriores escenas de la celada; no altera texto original, scripts ni guardados.
- **Antes/después:** el canon aprobado existe; **no se certifican sustituciones de binarios** en este commit documental.
- **Pruebas necesarias:** cobertura del inventario, integridad de original, comparación fuera de máscara, hashes, manifiesto, QA antiespoiler y revisión en interfaz.
- **Limitación:** todo retoque aún pendiente debe pasar su validación específica; sin pruebas gráficas no se declara terminado.
