# R12 — PROPUESTAS DE MEJORA VISUAL (SIN MODIFICAR ACTIVOS)

**Fecha:** 2026-11-06 · **Commit auditado:** `2e23b1cd27c764d946610716a4566a46ceda27cf`  
**Estado:** propuestas verificables para Coordinación y R06, **no aprobación final de 678 imágenes**.  
**Origen de la evidencia:** archivo individual en `docs/data/registro_revision_visual.csv`; 27 visualizados directamente, 651 pendientes.  
**Orden:** impacto narrativo descendente y, dentro de cada prioridad, menor esfuerzo primero. No se pide generar imágenes nuevas.

## Criterio de clasificación

- **Imagen válida sin cambios:** el propio binario observado es reutilizable para el contexto indicado. Aun así debe respetarse su fase y quedar fuera de cualquier validación de licencia (no abordada).
- **Imagen reutilizable mediante reencuadre o ajuste:** preservar archivo original; cambiar encuadre, posición de panel, duración de plano o fase de presentación. Una propuesta **no equivale a haber validado el fotograma en la UI**.
- **Imagen que necesita corrección:** el problema detectado es de **asignación editorial/metadatos/relación con guion**; no regenerar píxeles cuando puede subsanarse el vínculo.
- **Imagen que realmente requiere sustitución:** solo si queda demostrado tras inspección visual, cotejo narrativo y agotamiento de alternativas presentes. **Cero sustituciones nuevas confirmadas** en la muestra.

## A. Imagen válida sin cambios (6 PASS visuales en su función concreta)

| ID / ruta | Uso preciso aprobado por la evidencia R12 | Condición narrativa | Impacto / esfuerzo de aplicación |
|---|---|---|---|
| `assets/scenes/_art_direction/personajes_referencia.webp` | Referencia de proporciones/vestuario: Don Quijote, Sancho, Rocinante, rucio | Referencia, no escena del guion | Alto / Bajo |
| `assets/ilustraciones_tusell/acuarelas/025.jpg` | Quema de libros al cerrar la secuencia de escrutinio | Solo `after` de la quema, ubicar pasaje I,6–I,7 con rigor | **Muy alto / Bajo** |
| `assets/ilustraciones_tusell/acuarelas/026.jpg` | Caballero y caballo arrastrados por el aspa; imagen visual correcta para Q.112 | `reveal` o `after`, nunca antes de la respuesta | **Crítico / Bajo** |
| `assets/ilustraciones_tusell/acuarelas/029.jpg` | Sancho ayuda tras el molino; ilustración de consecuencia | Después de la caída | Alto / Bajo |
| `assets/ilustraciones_tusell/acuarelas/371.jpg` | Ilustración íntima de Alonso en cama | Desenlace final II,74 únicamente | Alto / Bajo |
| `assets/ilustraciones_tusell/decorativos/A.png` | Letra capitular ornamental del lector | Decoración; sin escalado abusivo desde 90×89 | Bajo / Muy bajo |

**Interpretación de PASS:** es un dictamen sobre lo efectivamente visible y su función descrita, **no** la aprobación de contrato, runtime, texto literario íntegro o publicación de producto.

## B. Reutilizables mediante reencuadre, cambio de presentación o secuencia

| Prioridad / coste | Ruta exacta | Problema visto o comprobado | Cambio propuesto | Beneficio |
|---|---|---|---|---|
| **P1 / Bajo** | `assets/scenes/part_1/chapter_01/p1_c01_biblioteca_pre.webp` | Alonso, libro y ventana en derecha; overlay derecho los ocultaría | Mantener imagen íntegra y desplazar texto al lado izquierdo o franja separada; proteger mitad derecha (x≈0.52–1.00) | Recupera biblioteca sin perder lectura/reacción |
| **P1 / Bajo** | `assets/scenes/part_1/chapter_08/p1_c08_molinos_siluetas_pre.webp` | Molinos a derecha | Usar como plano de descubrimiento B01; texto externo al fotograma o sobre banda no narrativa | Establece el espacio antes del equívoco |
| **P1 / Bajo** | `assets/scenes/part_1/chapter_08/p1_c08_molinos_pre.webp` | Molino a derecha, gesto de Sancho a izquierda | Seguir con B02–B04 sin cortar por cada frase; proteger molinos y ambos gestos; pregunta visual con imagen despejada | Continuidad y ahorro de recursos |
| **P1 / Bajo** | `assets/scenes/part_1/chapter_08/p1_c08_molinos_post.webp` | Personajes, caballo y lanza rota ocupan imagen | Usar exclusivamente B06–B07 tras la caída; mostrar texto en zona exterior, nunca tapar la lanza inferior | Una imagen resuelve choque y socorro |
| **P1 / Bajo–Medio** | `assets/scenes/part_1/chapter_06/p1_c06_escrutinio_pre.webp` | Personajes a ambos lados, libros al centro y a derecha | Mantener plano del escrutinio, mostrar diálogo largo fuera de imagen; enlazar después con acuarela 025, sin encargar fuego nuevo | Cubre dos fases con patrimonio existente |
| **P1 / Bajo** | `assets/scenes/part_1/chapter_18/p1_c18_rebanos_pre.webp` | Ovejas a derecha, fundamentales para el contraste real/ficticio | No ocultar las ovejas; panel exterior y reutilización durante las réplicas previas; ataque solo en desenlace | Mantiene la ironía y evita spoiler |
| **P1 / Bajo** | `assets/scenes/part_2/chapter_10/p2_c10_dulcinea_pre.webp` | Tres campesinas en centro/derecha | Mantener una sola vista hasta completar intercambio; reservar sus siluetas, no adelantar transformación imaginada | Conserva lógica del engaño |
| **P1 / Bajo–Medio** | `assets/scenes/part_2/chapter_60/p2_c60_roque_guinart_pre.webp` | Roque y guerrilleros a derecha, pareja a izquierda | Pantalla de texto externa, no recortar interlocutores, conservar el plano para diálogo prolongado | Reduce cambios de plano innecesarios |
| **P1 / Bajo–Medio** | `assets/scenes/part_2/chapter_74/p2_c74_despedida_post.webp` | Rostro de Alonso a derecha y manos en centro | Presentar solo `after` final; banda de texto externa sin cubrir manos ni rostros; alternar con acuarela 371 en lector/descubrimiento | Protege máximo impacto emocional |
| **P1 / Medio (revisión R06)** | `assets/closeups/don_quixote_*.webp` (10 ficheros inventariados individualmente) | Textura muy ilustrativa frente a fondos más realistas, rostro/emoción consistentes entre sí | Tratarlos como **retratos de reacción** en panel separado con estilo de retrato declarado; evitar insertarlos como rostro naturalista en la misma escena. No recortar bigote/mentón ni introducir texto sobre el rostro | Reutiliza las 10 emociones sin crear 10 variantes fotorrealistas |

### Secuencia reutilizable de molinos (prioridad máxima)

1. **B01:** `p1_c08_molinos_siluetas_pre.webp` (presentación del entorno, sin caída).
2. **B02–B04:** `p1_c08_molinos_pre.webp` (pareja, señalamiento, advertencia; continuidad de plano con texto TS-001).
3. **B05:** si el texto comunica mejor la tensión, mantener B02–B04 o recortar con cuidado un detalle; **no añadir imagen automáticamente**.
4. **B06–B07:** `p1_c08_molinos_post.webp` **después** de la embestida; una sola vista para caída/socorro.
5. **Q.112 en fase de revelación:** `026.jpg` para aspas; **no** `027.jpg`.
6. **Descubrimiento posterior:** `029.jpg` como segunda interpretación ilustrativa, sin interrumpir el canon.

Este orden aprovecha cuatro imágenes ya presentes para diferentes funciones y mantiene a `027.jpg` disponible en el encuentro con los frailes.

## C. Imágenes/asignaciones que necesitan corrección

| Prioridad | Qué corregir | Evidencia | Acción verificable y dueño | Esfuerzo orientativo |
|---|---|---|---|---|
| **P0** | **Q.112 / H4**: eliminar asociación de `027.jpg` a aspa de molino | La `027.jpg` observada muestra frailes/caballeros; `026.jpg` muestra arrastre por el aspa | **R01 + R05 + R06**: reatribuir a `026.jpg`, verificar texto de pregunta, fase `reveal`, geometría y alternativa accesible del hotspot | Bajo, después prueba QA |
| **P1** | Replantear el encargo H4 de nueva recreación de hoguera | `025.jpg` visualmente representa libros arrojados al fuego | **R05/R06**: probar `025.jpg` tras el pasaje exacto con narración escrita; documentar si queda un hueco verdaderamente esencial | Bajo |
| **P1** | Corregir la hipótesis de zona de texto derecha universal | Nueve escenas observadas colocan información importante en centro/derecha | **R06 + UX + R12**: anotar máscaras por escena y validar composición con texto real 1920×1080, ampliación, diálogo extenso y audio desactivado; no tocar archivos originales | Medio |
| **P1** | Resolver `spoiler_risk` de escenas `pre` | 172 marcadas `low`, 36 `medium`, ninguna `none` | **R01/R05/R12**: comprobar pregunta + fase, marcar riesgo y corrección individual; no cambiar 208 entradas masivamente sin abrir imagen | Alto (por volumen) |
| **P1** | Decidir criterio de estilo de closeups | Diez closeups abiertos, carácter pictórico frente a referencia naturalista | **R06**: validar función de retrato expresivo independiente y reglas de escala/recorte; mantener todos los binarios | Bajo–Medio |
| **P2** | Mejorar descripciones alternativas | 50 escenas con alt genérico, 5 decorativos sin alt referencial | **R05 + accesibilidad**: describir lo realmente mostrado tras abrir la imagen y distinguir piezas decorativas | Medio |
| **P2** | Revisar pequeños originales en pregunta/hotspot | 145 acuarelas con altura <600 px; 11 con ancho <600 px (2 en ambos) | **R06/R12**: no ampliar más de lo legible; elegir imagen cinematográfica alterna si el hotspot exige más detalle | Medio |

**No se modifican en este encargo los manifiestos, los contratos, el guion ni la interfaz:** se publican hallazgos y cambios candidatos para la revisión conjunta.

## D. Imágenes que realmente necesitan sustitución

**0 sustituciones binarias demostradas**. El único **FAIL** de la muestra es la **asignación errónea de `027.jpg` a Q.112**, solucionable por `026.jpg`. La propia `027.jpg` debe **conservarse** para el encuentro con los frailes. Los fallos potenciales de TS-001 en escenas observadas se resuelven primero con panel externo/reencuadre; los diez closeups se pueden conservar como retratos de emoción. **No existe fundamento suficiente para solicitar generaciones nuevas.**

Para declarar una sustitución futura son necesarias conjuntamente: (a) inspección visual del archivo; (b) contradicción grave o defecto no corregible; (c) búsqueda documentada entre las otras 677 imágenes y opciones de reencuadre/fase; (d) validación editorial y R06 de que el texto y el patrimonio disponible no bastan. Los 651 no abiertos **no se incluyen** entre aptos ni sustituciones.

## E. Priorización operativa y métricas de siguiente aceptación

**Orden propuesto:** Q.112 → reutilización 025 de la quema → máscaras TS-001 de las nueve escenas ejemplificadas → decisión de uso de diez closeups → validación contextual de 36 escenas `pre` con riesgo `medium` → restantes `pre` → revisión de 243 escenas, 370 acuarelas y 38 decorativos no abiertos → prueba de duplicados perceptivos y hashes recálculados → alt y pruebas finales de interfaz.

La cuantificación del trabajo siguiente se refiere a **651 aperturas visuales aún pendientes**, no a 651 imágenes defectuosas. Cada nuevo PASS/FAIL requerirá registrar evidencia individual, defecto, fase y corrección en `docs/data/registro_revision_visual.csv`. Para TS-001, el cierre exige **texto real y audio apagado** además de un retrato bonito.

**PR solicitada:** revisión de Coordinación y R06; **no fusionar** ni aprobar el patrimonio completo a partir de este resultado parcial.
