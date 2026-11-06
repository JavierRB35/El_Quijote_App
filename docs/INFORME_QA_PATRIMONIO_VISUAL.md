# R12 — INFORME QA DEL PATRIMONIO VISUAL DE EL QUIJOTE

**Fecha:** 2026-11-06  
**Modo:** CALIDAD / AUDITORÍA VISUAL · **Prioridad:** P1  
**Roles de esta revisión:** R12 (Control de Calidad Visual, inspección asistida); colaboración R06 **recomendada, no realizada ni certificada**.  
**Repositorio:** `JavierRB35/El_Quijote_App` · **base congelada:** `main@2e23b1cd27c764d946610716a4566a46ceda27cf`  
**Estado:** **AUDITORÍA PARCIAL CON TRAZABILIDAD COMPLETA; NO APTO PARA CIERRE DE ACEPTACIÓN EXHAUSTIVA.**  
**Documentos revisados:** `AGENTS.md`, `docs/ENCARGO_MAESTRO.md`, `docs/VISION_Y_DECISIONES.md`, `docs/DIRECCION_ARTISTICA.md`, `docs/DIRECCION_ARTISTICA_PILOTO.md`, `docs/DOSSIER_ARTISTICO_H4.md`, `docs/DC_IMG_001_ASIGNACION_INTEGRAL_ASSETS.md`, `assets/scenes/manifest.json`, `assets/closeups/manifest.json`, `assets/ilustraciones_tusell/manifests/manifest_ilustraciones.json`.  
**Restricciones respetadas:** no se generaron ni alteraron imágenes; no se tocó UI, contratos o esquemas. La procedencia jurídica, licencias y distribución quedan **fuera de alcance**.

## 1. Resumen ejecutivo y límites de evidencia

Se inventariaron **678 archivos gráficos distintos**, comparando su ruta, tamaño y SHA Git en el árbol del commit congelado con los manifiestos editoriales:

| Familia | Inventariadas | Abiertas y observadas realmente | Aún sin inspección visual individual |
|---|---:|---:|---:|
| Escenas cinematográficas, incluida referencia de personajes | 253 | **10** | 243 |
| Primeros planos expresivos de Don Quijote | 10 | **10** | 0 |
| Acuarelas numeradas | 376 | **6** | 370 |
| Elementos editoriales/decorativos | 39 | **1** | 38 |
| **Total** | **678** | **27** | **651** |

**Estado global por asset:** **PASS 6 · FAIL 1 · PENDIENTE 671 · NO APLICA 0**. Dentro de los 671 pendientes, **20 fueron observados visualmente, pero no aprobaron todas las verificaciones necesarias**, y **651 solo fueron contrastados por árbol/manifiesto**. Esta separación es esencial: **678 inventariados ≠ 678 examinados visualmente**. Ningún archivo restante se certifica como válido, inválido o corrupto sin abrirlo.

Los 6 PASS se limitan al **contexto indicado en el registro**, no representan publicación editorial general. Los 20 visualizados y pendientes necesitan cotejo de texto/fase, validación de overlay TS-001 en el juego, acuerdo de estilo o comprobación de continuidad. El FAIL es **una asignación de imagen al episodio/pregunta incorrectos**, no una rotura del archivo ni una recomendación de descartarlo.

La tabla íntegra, con **una fila por archivo**, consta en `docs/data/registro_revision_visual.csv` y contiene rutas, capítulo, episodio, fase, Git SHA, SHA-256 declarado, dimensiones, estado de inspección real, ejes QA, justificación y acción propuesta.

## 2. Inventario, resolución, integridad y duplicados

- `assets/scenes/manifest.json`: **253** registros, con **1** referencia de personajes, **208** escenas `pre` y **44** `post`; **121** imágenes de la Parte I y **131** de la Parte II (más la referencia). Los **126 capítulos** están representados por al menos una escena. Resolución declarada uniforme: **1672×941**, `image/webp`.
- `assets/closeups/manifest.json`: **10** registros, todos de Don Quijote, **1254×1254** `image/webp`; existen sus diez binarios.
- Ilustraciones: **376** acuarelas, **39** decorativos (entre ellos 20 capitulares y 9 orlas). El contenido de baja resolución es especialmente relevante para zoom/lector: **145 acuarelas tienen menos de 600 px de alto; 11 tienen menos de 600 px de ancho; 2 incumplen ambos umbrales**. No significa que esas 145 sean defectuosas: su uso a tamaño real debe comprobarse.
- **0 archivos manifestados ausentes** de las tres familias; **0 diferencias de tamaño** allí donde el manifiesto declara bytes; **0 archivos sin entrada** en los manifiestos de `scenes/` o `closeups/`; **0 parejas con SHA de blob Git idéntico** entre las 678 imágenes. En el inventario no se observan duplicados binarios exactos.
- Los **SHA-256** declarados se han archivado, **no recalculado independientemente**. La comprobación Git SHA distingue blobs, pero no sustituye a verificar SHA-256 de bytes descargados ni a decodificar cada recurso. **Solo las 27 imágenes efectivamente abiertas han pasado una decodificación visual en esta revisión**. Para las 651 restantes, corrupción de datos, perfiles de color, truncamientos y artefactos de compresión siguen **PENDIENTES**.
- **Duplicados perceptivos o casi iguales:** **NO EVALUADOS SISTEMÁTICAMENTE**. Hay composiciones repetidas de pareja a la izquierda y paisaje a la derecha en los ejemplos observados; no se declara que sean duplicados sin análisis con miniaturas/pHash y contraste humano.

## 3. Hallazgos concretos y defectos rastreables

| Código | Severidad | Activo / referencia | Evidencia efectiva | Corrección sin nueva imagen |
|---|---|---|---|---|
| R12-01 | **P0 — relación editorial errónea** | `assets/ilustraciones_tusell/acuarelas/027.jpg`; H4 §5.3, Q.112 | **Observación directa:** muestra el ataque a los frailes de San Benito, **no** el molino ni un aspa. El propio manifiesto lo vincula a ese suceso. | El hotspot de la embestida debe trabajar sobre **`026.jpg`**, que sí representa caballo y caballero arrastrados por el aspa, solo en fase `reveal`. Recalcular coordenadas; dejar `027.jpg` para frailes. |
| R12-02 | **P1 — reutilización desaprovechada** | `025.jpg`; H4, I,6/I,7, hoguera | **Observación directa:** persona arrojando libros al fuego; el dossier H4 contempla una nueva recreación de la quema. El manifiesto ubica la acuarela en `1007.xhtml`. | Usar **`025.jpg`** como ilustración posterior a la quema, con localizador correcto y texto TS-001. No producir recreación hasta probar que esta solución narrativa es insuficiente. |
| R12-03 | **P1 — TS-001, conflicto de composición** | `p1_c01_biblioteca_pre` | El personaje y libro están **a la derecha**, pero el manifiesto prefiere `preferred_overlay_side: right`. | Texto a izquierda o banda exterior; máscara protegida del personaje/libro. |
| R12-04 | **P1 — TS-001** | `p1_c08_molinos_pre`, `p1_c08_molinos_siluetas_pre` | Los molinos —información clave de la escena— están **a la derecha**. | Texto fuera del fotograma durante explicación/pregunta visual; no ocultar molino ni usar la versión posterior para preguntas previas. |
| R12-05 | **P1 — TS-001** | `p1_c06_escrutinio_pre` | Figuras, libros y gestos ocupan ambos lados; el barbero y los libros están a derecha. | Reducir la imagen dentro de un marco y reservar una zona tipográfica inferior/externa para diálogos extensos. |
| R12-06 | **P1 — TS-001** | `p1_c18_rebanos_pre` | El rebaño está a derecha, justo donde aparecería el texto. | Mantener ovejas legibles hasta formular la pregunta; usar panel separado. |
| R12-07 | **P1 — TS-001** | `p2_c10_dulcinea_pre` | Las tres campesinas están en centro-derecha. | Proteger sus cuerpos y el gesto de Sancho; texto en zona externa. |
| R12-08 | **P1 — TS-001** | `p2_c60_roque_guinart_pre` | Encuentro coral con Roque a derecha. | No cubrir interlocutores ni armas. Retener imagen, sacar el texto del fotograma. |
| R12-09 | **P1 — TS-001, momento final** | `p2_c74_despedida_post` | Rostro de Alonso Quijano y manos enlazadas son el centro dramático; `right` no es seguro. | Banda de texto externa y uso **solo después del desenlace final**. Evitar recortes que eliminen manos/rostro. |
| R12-10 | **P1 — continuidad de estilo** | Los 10 `assets/closeups/` frente a `personajes_referencia.webp` | **Se observaron los diez:** identidad de cejas, bigote, perilla, casco y armadura consistente; acabado de ilustración expresiva mucho más marcado que el naturalismo cinematográfico de los fondos. | Conservarlos como **retratos estilizados de reacción** en panel distinto; no integrarlos a escala natural como cara fotográfica sin aprobación de R06. |
| R12-11 | **P1 — metadatos/contrato de spoiler** | Las 208 imágenes `pre` | **172** declaran `spoiler_risk: low` y **36** `medium`, ninguna `none`; el contrato vigente exige política previa sin revelación. Esta es inconsistencia de clasificación, **no 208 spoilers visuales demostrados**. | Verificar de forma contextual con pregunta, conocimiento previo y fase; corregir clasificación o asignación editorial después de inspección. |
| R12-12 | **P2 — accesibilidad y función** | 50 escenas con alt genérico; 5 decorativos sin alt de referencia | El alt genérico repite “Recreación cinematográfica del episodio…” sin describir los sujetos reales. Los decorativos sin alt son `Don1.jpg`, `Don2.jpg`, `cover.jpg`, `cover2.jpg`, `rednij-JPG.jpg`. | Completar alt narrativo tras ver cada imagen; para decoración pura usar política accesible de recurso decorativo, no inventar descripción de personaje. |
| R12-13 | **P2 — ergonomía de imagen** | Acuarelas originales menores a 600 px en una dimensión | Riesgo de sobreescalado en lector o pregunta con hotspot. | Mostrar a escala real o menor, con zoom sin prometer detalle inexistente; priorizar escena WebP cuando la pregunta necesite distinguir un objeto pequeño. |

**Importante:** TS-001 exige verificación **imagen + tipografía real + texto de intervención + resolución/escala + estado de escena**. Detectar visualmente un conflicto con la reserva derecha **no demuestra que el runtime ya oculte contenido**; sí demuestra que no debe tratarse ese lado como reserva universal y aprobar la escena a ciegas.

## 4. Continuidad, emoción, composición y fidelidad

### Don Quijote, Sancho, Rocinante y rucio

La referencia `personajes_referencia.webp` y los planos `p1_c08_molinos_pre`, `p1_c18_rebanos_pre`, `p2_c60_roque_guinart_pre` sostienen una pareja reconocible: Don Quijote alto y enjuto, casco/armadura y perilla; Sancho más bajo y robusto, sombrero/ropa terrosa; Rocinante caballo claro y rucio asno gris. La muestra disponible sostiene **continuidad local**, **no demuestra continuidad en las 253**. Es necesaria una secuencia de cotejo por personaje, capítulos alejados, iluminación y vestuario, además de revisar anatomía de manos, monturas, riendas y extremidades.

Los diez closeups se observaron individualmente: `angry`, `battered`, `battle`, `determined`, `frightened`, `happy`, `proud`, `sad`, `surprised`, `thoughtful`. Las expresiones son suficientemente distintas para reacciones de Historia. El aspecto más caricaturizado/ilustrativo **no es defecto anatómico demostrado**, pero **sí una divergencia de tratamiento de textura** respecto de las escenas. Requiere decisión R06 sobre separación estilística (por ejemplo, tarjeta/ventana de reacción) antes de PASS integrado.

### Fidelidad y relatos intercalados

En las escenas observadas, molinos, rebaños, quema, Dulcinea/campesinas, escrutinio, Roque y desenlace se reconocen y ofrecen reutilizaciones. **No se ha cotejado individualmente la secuencia de los 126 capítulos, el texto original íntegro ni los relatos intercalados**; no sería riguroso certificar ausencia de anacronismos, episodios inventados o focalización narrativa incorrecta en los otros 651 binarios. Para relatos insertados, exigir etiqueta de marco narrativo y nunca mostrar a los protagonistas como testigos si el pasaje no los sitúa allí.

### Cinematografía y diversidad

Entre las escenas observadas se aprecia paleta terrosa/ocre, horizonte amplio, profundidad por capas, brillos de atardecer y luz interior lateral. El recurso se puede explotar con planos continuos, sin exigir una imagen por frase. Debe medirse la posible **monotonía del encuadre**: la pareja aparece varias veces en el tercio izquierdo ante un paisaje a la derecha. Esto es una alerta de diversidad, **no un duplicado visual confirmado**.

## 5. TS-001 y antiespoiler: matriz de validación

- **Fase `pre`:** no mostrar desenlace, ni respuesta encubierta por ilustración post. Para `p1_c08_molinos_pre`, la presencia visible de molinos puede ser información observacional legítima; solo la comparación con la pregunta concreta permite decidir si revela la respuesta. No marcar automáticamente FAIL por mostrar el objeto.
- **Fase `question`:** comprobar el hotspot sobre **la misma imagen** y evitar zonas ocultas por texto; en Q.112, sustituir la asociación 027 por 026 **en revelación**, o reformular la pregunta si exige un hotspot previo sobre una consecuencia todavía no conocida.
- **Fase `reveal/after`:** `p1_c08_molinos_post`, `026.jpg`, `029.jpg` y la despedida II,74 se preservan para uso posterior. La misma imagen puede acompañar varias intervenciones, con reencuadre o continuación estable.
- **TS-001:** no hay en esta auditoría una ejecución de pantalla con fuente real, tamaño ampliado, diálogo largo y modo sin audio; por tanto **0 escenas certificadas en integración final TS-001**. Las observadas solo tienen diagnósticos de compatibilidad compositiva.

## 6. Método reproducible, garantía y pendientes

1. Congelar commit `2e23b1cd27c764d946610716a4566a46ceda27cf` y listar el árbol Git recursivo.
2. Leer los manifiestos JSON de escenas, closeups y Tusell; enlazar cada ruta y comparar tamaño Git con `size_bytes`/`bytes` cuando existe.
3. Comparar SHA Git de los **678** blobs para duplicados exactos; archivar `sha256` **sin atribuirle recomputación**.
4. Abrir el binario de cada caso marcado `inspeccion_visual_efectiva=SI` y contrastar con `id`, `acontecimiento`, `fase`, `alt`, `spoiler_risk` y encuadre. Las 27 aperturas se realizaron vía conector GitHub, con visualización decodificada de imágenes WebP/JPEG/PNG, el **2026-11-06**.
5. Cotejar continuidad con `personajes_referencia.webp`; distinguir defectos intrínsecos de defectos de asignación, fase y superposición. **No interpretar ningún PASS de árbol como PASS visual.**
6. Para cerrar alcance: abrir y documentar **243 escenas, 370 acuarelas y 38 decorativos** pendientes; ejecutar una comprobación automática de SHA-256 binario, cabeceras/formato/dimensiones y perceptual hash, seguida de contraste humano de similitudes; revisar guion, textos e interfaces TS-001 en casos relevantes; obtener aprobación cruzada R06/R12.
7. Registrar cada ajuste en la misma fila y conservar el commit base. Si hay cambios posteriores en `main`, volver a contrastar manifest y bytes; **no heredar aprobaciones a blobs diferentes**.

**Criterio de cierre no alcanzado:** aunque el inventario está completo, **no se ha realizado la inspección visual efectiva de 651 archivos** ni la integración narrativa/TS-001 de los 253. La PR debe revisarse como **registro verificable y correcciones prioritarias parciales**, nunca como certificación final de todas las imágenes.

## 7. Decisión priorizada

**P0:** reparar vínculo de Q.112 (027 → 026), con revisión de fase y hotspot.  
**P1:** no generar recreación de hoguera sin evaluar `025.jpg`; corregir la suposición global de texto derecho en los ejemplos descritos; revisar marcadores de spoilers `pre`; aprobar criterio R06 para los diez closeups.  
**P2:** mejorar 50 alt genéricos; revisar baja resolución de ilustraciones en usos con zoom; completar la auditoría visual individual de las 651 pendientes y duplicados perceptivos.

**Responsable de la inspección aquí registrada:** R12, asistente. **No se atribuyen validaciones humanas especializadas ni aprobaciones de Dirección Artística que no hayan ocurrido.**
