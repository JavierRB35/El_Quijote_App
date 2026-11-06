# R12 — PROPUESTAS DE MEJORA VISUAL (v0.2, piloto)

**2026-11-06 · base:** `main@66d2f7d3a5c6a28b18fdc7cce5148375d277e21f`. Revisión documental y visual parcial.  
**Informe relacionado:** `docs/INFORME_QA_PATRIMONIO_VISUAL.md` · **Registro:** `docs/data/registro_revision_visual.csv`.  
**Resultados acumulados:** 678 imágenes, 53 observadas, **18 PASS / 2 FAIL / 658 PENDIENTE**. **625 no abiertas**. Todas las escenas directas de los seis capítulos del piloto se han abierto: **16 de 16**, junto a 17 acuarelas de apoyo del piloto y cuatro alternativas intercapítulos. La aceptación del inventario **no certifica** calidad visual general ni legibilidad TS-001 en runtime.

## 1. Imagen válida sin cambios, para la función específica (18 PASS)

No alterar los archivos ni confundir la aceptación de la acuarela para *su función* con su elegibilidad en cualquier fase o pregunta. Cada PASS tiene evidencia visual individual en el CSV.

| Archivos inspeccionados | Uso narrativo exacto | Restricción de fase |
|---|---|---|
| `assets/scenes/_art_direction/personajes_referencia.webp` | Patrón visual de DQ/Sancho/Rocinante/rucio | Referencia de QA, no episodio |
| `020.jpg` | DQ recuperándose en cama, antes del escrutinio | Lector/transición I,6, **no** prueba del escrutinio |
| `026.jpg` | El aspa arrastra a caballo y caballero | I,8 `reveal`; foco visual previsto Q.112 |
| `027.jpg` | Ataque de DQ contra los frailes | I,8 tras el encuentro, **no** molinos |
| `028.jpg` | DQ en tierra tras molino y Rocinante caído | I,8 `after` |
| `029.jpg` | Sancho auxilia al DQ tras los molinos | I,8 `after` |
| `030.jpg` | Duelo con el vizcaíno y coche | Continuación I,9 **después** de la interrupción de I,8 |
| `034.jpg` | Cena de DQ y Sancho con cabreros | I,11, descubrimiento después de presentación |
| `035.jpg` | Discurso de la Edad de Oro con cabreros | I,11, discusión/discurso |
| `036.jpg` | Un cabrero cura la oreja del hidalgo | I,11, **no** usar como ilustración indiferenciada del discurso |
| `056.jpg` | Sancho sale de la venta | Puente I,17 → I,18, no prueba de batalla de rebaños |
| `057.jpg` | Carga contra ovejas | I,18, `reveal` de los 'ejércitos' |
| `058.jpg` | Sancho examina la boca de DQ | I,18, `after` |
| `170.jpg` | Cura/barbero visitan a DQ convaleciente | II,1, lectura/revelación de visita |
| `371.jpg` | DQ acostado con crucifijo | II,74, desenlace final |
| `372.jpg` | Despedida con familiares y Sancho | II,74, desenlace final |
| `373.jpg` | Alegoría del final de los libros caballerescos | Epílogo literario, **no** hecho literal |
| `assets/ilustraciones_tusell/decorativos/A.png` | Capitular decorativa del lector | Decoración en tamaño compatible con 90×89 |

**Rutas completas de los JPG:** `assets/ilustraciones_tusell/acuarelas/<número>.jpg`. PASS se limita a estos usos; su incorporación al juego requiere autorización de fase y decisión editorial. Las acuarelas **nunca** sustituyen por defecto a una escena `pre` si anticipan desenlace.

## 2. Reutilización con ajuste, recorte, presentación separada o secuenciación

| Orden impacto/esfuerzo | Ruta o IDs concretos | Acción propuesta sin cambiar el binario | Comprobación de aceptación |
|---|---|---|---|
| **P0 / Bajo–Medio** | `p1_c06_ama_sobrina_libros_pre.webp` (`900157`) | **No usar fotograma entero en I,6:** incluye DQ armado y Sancho como espectadores anacrónicos. Ensayar recorte **x≈0.00–0.49** centrado en cura/barbero y ama/sobrina; mantener como detalle vertical si la lectura del plano es buena. Si no, **usar `900013` y `900230` ya existentes**. | Ningún DQ/Sancho aparece como observador; edad/rostro de personajes restantes y tamaño legible, revisión R06 |
| **P1 / Bajo** | `p1_c06_escrutinio_pre.webp` (`900013`) y `p1_c06_cura_barbero_libros_pre.webp` (`900230`) | Alternar plano coral de escrutinio y plano cercano a libros/cura/barbero según diálogo, sin cambio por cada frase | TS-001 con texto visible sin tapar libros o manos; continuidad de ambos actores |
| **P1 / Bajo** | `p1_c08_molinos_siluetas_pre.webp` (`900231`), `p1_c08_molinos_pre.webp` (`900005`) | Acompañar B01–B04: plano lejano de molinos → advertencia de Sancho; mantener B03/B04 sobre el mismo plano | La pregunta no ve la caída; molinos y gestos siguen visibles bajo TS-001 |
| **P1 / Bajo** | `p1_c08_molinos_post.webp` (`900006`) + `028.jpg` y `029.jpg` | Plano cinematográfico de caída/socorro B06–B07 + ilustración posterior desde otro lenguaje visual | Nunca usar antes de revelar; no ocultar lanza rota, caballo ni manos |
| **P1 / Bajo–Medio** | `p1_c08_frailes_carreta_pre.webp` (`900159`) + `027.jpg` | Imagen cinematográfica de aproximación → ilustración del ataque, **sin confundirse con molinos** | Comprobar si pregunta menciona quién se acerca: si la foto da la respuesta, retrasar a `reveal` |
| **P1 / Bajo–Medio** | `p1_c08_vizcaino_camino_pre.webp` (`900133`) + `030.jpg` | Entrevista ante coche al cierre de I,8 → duelo ilustrado ya en I,9 | Mantener interrupción de capítulos y no anticipar victoria |
| **P1 / Bajo** | `p1_c11_cabreros_pre.webp` (`900007`), `p1_c11_edad_oro_discurso_pre.webp` (`900134`) + `034.jpg`, `035.jpg`, `036.jpg` | Cena nocturna → plano de discurso largo → acuarela del discurso → escena distinta de curación | Discurso acompañado con texto visible y sin cambiar de plano por cada frase; `036` solo curación |
| **P1 / Bajo** | `p1_c18_rebanos_pre.webp` (`900008`) + `057.jpg`, `p1_c18_pastores_piedras_post.webp` (`900136`) + `058.jpg` | Equívoco antes → 057 carga tras respuesta → 900136 dolor/reposo → 058 examen de boca | No mostrar 057/058 en pre; no atribuir pedrada/examen de boca a `900136` |
| **P1 / Bajo** | `056.jpg` | Ilustrar la salida de venta solo como transición I,17 → I,18, con rotulación | No presentarla como escena propia de la lucha de rebaños |
| **P1 / Bajo** | `p2_c01_recuperacion_pre.webp` (`900029`), `p2_c01_locura_caballerias_pre.webp` (`900179`), `170.jpg` | Mantener visita y charla de II,1 con dos ángulos; 170 para lector | El episodio intercalado del loco no se confunde con conversación presente |
| **P1 / Bajo–Medio** | `p2_c74_despedida_post.webp` (`900011`), `p2_c74_testamento_quijano_post.webp` (`900202`), `371–373.jpg` | Escena de despedida + testamento + epílogo ilustrado; separar fases exactas | No mostrar antes de II,74; testigo/escribiente, manos y rostros preservados |
| **P1 / Bajo–Medio** | `assets/closeups/don_quixote_*.webp` (10) | Presentar retratos como **tarjetas estilizadas de reacción**, separadas del fondo fotorrealista; no injertar rostro pictórico a escala 1:1 | R06 valida la convivencia de estilos, zoom y texto TS-001 |
| **P2 / Medio** | `p1_c10_dialogo_victoria_pre.webp` (`900066`) | Imagen observada de charla entre DQ magullado y Sancho. **No reutilizar automáticamente para B08 de molinos:** imagen y heridas responden al capítulo I,10 | Cotejo de cronología y estado de heridas por R01, luego posible fallback justificado |
| **P2 / Bajo** | `p1_c07_sancho_promesa_pre.webp` (`900158`) | Reservar la conversación sobre la promesa y alistamiento de Sancho en I,7 | Su presencia en I,7 no debe introducirse en I,6 |

### TS-001 — ajuste por imagen, no mediante overlay universal

La preferencia `preferred_overlay_side=right` de todas las escenas **no es una máscara verificada**. Se proponen, sin modificar imagen, las siguientes reservas candidatas:

- `900007` y `900134`: **cielo superior derecho** para frases breves, sujeto a prueba con textos largos; para el discurso completo, reservar área **externa** si no cabe legible.
- `900013`/`900230`: libros, manos, cura/barbero protegidos; texto en banda externa o zona superior derecha libre comprobada `900230`.
- `900029`/`900179`: la conversación ocupa ambos lados y gesto de DQ a derecha; texto en panel exterior.
- `900011`/`900202`: proteger **manos enlazadas**, rostro de Alonso y **escribiente**; texto en banda exterior.
- `900008`/`900005`/`900231`: proteger ovejas/molinos a derecha, y la pareja a izquierda; durante pregunta visual no cubrir el objeto sobre el que se pregunta.
- `900159`/`900133`: personajes y coche centrales, panel exterior o cielo superior derecho evaluado.

**No existe PASS de TS-001 en interfaz final:** falta probar el tamaño de letra y guion real en 1080p, 1440p, ampliación y audio ausente. Responsables de decisión: R06 + UX/R08 + R12.

## 3. Corrección necesaria de asignación narrativa (sin tocar originales)

| Prioridad | Hallazgo y estado | Acción verificable |
|---|---|---|
| **P0** | `900157` **FAIL**: DQ/Sancho observadores de I,6 | No permitir este encuadre en I,6; rescatar solo recorte sin observadores o usar `900013`/`900230` |
| **P1** | `021.jpg` **FAIL contextual**: alegoría de expurgo en lugar de examen literal | Usar tras relato como imagen **alegórica**, etiquetada, no como prueba del gesto de cura/barbero |
| **P1** | `025.jpg` **PENDIENTE** para hoguera nocturna del corral: se ve quema **interior** | Probar narración TS-001 del acto con acuarela como apoyo ilustrativo no literal; si el guion exige ver el corral nocturno, mantener como necesidad sin orden de generar |
| **P1** | `171.jpg` **PENDIENTE**: bufón-juguete simbólico de la locura sevillana | Imagen de descubrimiento/alegoría, no escena que represente al licenciado ante el retor ni experiencia de DQ |
| **P1** | **Q.112 YA corregida en el catálogo**: `DQ.MA.000026` es el foco, `DQ.MA.900005` el fondo previo y `safe_after_episodes` protege su presentación. `027.jpg` ya está bien identificada como frailes. | **No volver a proponer 027→026 como cambio aún pendiente**. Validar geométricamente `{x:0.30,y:0.22,w:0.45,h:0.50}` sobre la verdadera imagen 833×1041 y comprobar que el hotspot no seleccione zonas distintas |
| **P1** | `900136` muestra reposo/heridas, no examen de dientes | Asignar `058.jpg` al detalle de examen, mantener `900136` como plano posterior amplio |
| **P2** | 50 alt de escenas genéricos y 5 decorativos sin descripción | Revisar alt individuales tras imagen observada y política accesible; ninguna generación |
| **P2** | `pre` con riesgos `low`/ `medium` en manifiesto | **No marcarlos automáticamente FAIL**; cotejar cada `pre` frente a pregunta y tiempo de visualización |
| **P2** | R06 aún no ha aprobado el uso de closeups | Mantener las diez emociones PENDIENTE de integración hasta dictamen de estilo |

## 4. Imágenes que realmente necesitan sustitución

**Ninguna sustitución binaria nueva demostrada.** Los dos FAIL del registro son *de uso/identificación dentro del relato*: `900157` se podría aprovechar con recorte izquierdo si pasa QA; `021.jpg` funciona como alegoría. El fotograma `900157` debe **dejar de usarse entero en I,6**, pero el fichero original permanece íntegro para una eventual reutilización conforme. No solicitar imágenes nuevas hasta probar estos rescates y el material ya disponible.

La diferencia entre `025.jpg` y la quema nocturna/corral, así como la ausencia de recreación literal del cuento sevillano, puede cubrirse inicialmente con narración dramatizada, imágenes de los protagonistas en contexto **diferenciadas de la historia narrada**, y acuarelas rotuladas. Solo tras probar el guion y documentar que falla el nivel cinematográfico se elevaría una necesidad visual, sin producirla desde R12.

## 5. Orden de implementación documental y pendientes

1. **P0:** bloquear el uso completo de `900157` en I,6 y probar recorte/herramienta de composición sin modificar activo.
2. **P1 rápido:** actualizar la tabla de roles de 021 (alegoría) y 025 (quema interior), mantener Q.112 ya correctamente enlazada a 026 y probar hotspot con resolución real.
3. **P1 narrativo:** confirmar fase de frailes, rebaños y cuento sevillano por pregunta, no por `spoiler_risk` aislado. Emplear 056, 028, 029, 030, 057, 058, 170–173 conforme a escena y orden; la 171 es simbólica.
4. **P1 artístico:** revisión R06 de la continuidad visual entre escenas y closeups, máscaras TS-001 y diversidad de perspectivas; ningún acuerdo se finge realizado.
5. **P2 global:** abrir las **625** imágenes restantes, verificar SHA-256 binario y duplicados perceptuales, comprobar zoom/corrupción, registrar observaciones individuales, mantener criterios de aceptación de cada contexto.

**La PR de esta continuación debe permanecer sin fusionar hasta revisión de Coordinación;** ningún cambio a ficheros visuales, UI, esquema o contrato se incluye.
