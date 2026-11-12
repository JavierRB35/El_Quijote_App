# DC-37 — Conformidad, pruebas y pendientes

Fecha: 2026-11-11. Base: `0e23a221c77ea31a83d3fe5042b826bd54660494`.
Estado: **implementación parcial verificada; no aceptación visual ni cierre de DC-37**.

## Qué cambia y por qué

La imagen ocupaba un rectángulo separado del texto. Historia y Aventura tenían composiciones diferentes, sin contemplación. Ahora ambos usan `ContenedorCine`, geometría `composicion.ts` y `lienzo.css`: imagen a superficie completa cuando el encuadre lo permite, pergamino sobre una región libre y control accesible arriba a la derecha. Una composición sin espacio queda expresamente pendiente y usa un respaldo legible; no se certifica como experiencia visual final.

Se conserva el texto editorial completo, incluida la pregunta y sus alternativas. La medición prueba disposición vertical, opciones en columnas y contexto/pregunta junto a opciones dentro del mismo pergamino. Escoge la que ocupa menos altura sin reducir la preferencia tipográfica. El cierre de Historia se abre mediante acción explícita después de la última intervención: no sustituye ni recorta esa intervención y permite volver a ella. Las descripciones alternativas de escenas quedan accesibles al lector de pantalla, sin duplicar el relato visible. La cabecera compacta conserva capítulo, puntuación numérica y controles; solo retira adornos repetidos.

Historia pausa el tiempo restante al contemplar y requiere Continuar para reanudar; Aventura no tiene temporizador ni avance automático. Los elementos ocultos salen del orden de tabulación. `Descubrir más` es un diálogo documental independiente con foco, Esc y pausa del relato. No se añade un motor de audio que no existía. Los ajustes, motores, puntuación, checkpoints, archivos de progreso y contratos mantienen sus funciones.

La asociación visual de Historia ya no arrastra un fotograma de otro beat. El arreglo de apertura de II/IV/V toma el título de la ficha real cuando el paquete base no contiene esa entidad Episodio. I.3 permanece desactivado. Menú, Museo, Descubrir y estados de carga/error reutilizan material y capa de fondo; los fondos ambientales sin aprobación permanecen identificados como pendientes. El error de catálogo permite reintentar.

## Evidencia ejecutada

| Prueba | Resultado y límites |
|---|---|
| React/TypeScript + Vite | Build correcto. Advertencia preexistente de bundle principal >500 kB; sin error de compilación |
| Lógica frontend | **72/72 PASS**, incluye geometría, integridad textual, progreso y motor de aventura |
| Contrato editorial | **44/44 PASS**; sin cambios de esquema ni migraciones |
| Integridad de medios aprobados | **67 WebP PASS**; ningún original artístico modificado |
| Integridad del informe | **4/4 PASS**: todos los IDs, rutas/candidatos existentes, dos funciones por ronda, activación real y carencias sin omisiones |
| Recorrido de UI real | 129 intervenciones, cinco cierres de Historia y 29 rondas con pregunta, resultado, revelación, checkpoints y cierre; texto cotejado con los JSON |
| Matriz de composición | **687 observaciones, cero desbordamientos ni invasiones de cabecera detectados y cero errores de ejecución**. Cinco resoluciones: 1920×1080, 1366×768, 1280×800, 2560×1440 y 3840×2160; texto medio/grande/muy grande y viewport equivalente al 100/125/150 %. Casos más extensos de cada capítulo. Resultado y detalle en [mediciones.json](evidencias/mediciones.json) |
| Interacción | Ocultar/mostrar por ratón y teclado, temporizador detenido, reanudación explícita, retroceso, repetición, estado de Aventura inalterado. **PASS** |
| Recuperación y errores | **PASS**: regreso al capítulo restaura ambos modos; Esc de ajustes no sale; diálogo conserva foco y bloquea atajos; fallo de imagen mantiene texto y control; fallo de catálogo permite reintentar. [recuperacion.json](evidencias/recuperacion.json) |
| Windows nativo | Compilación MSVC/Rust correcta. Tauri con frontend embebido y WebView2, **1366×768 / DPR 1**, red desactivada por CDP (`navigator.onLine=false`), cinco capítulos y ambos modos con recuperación de archivos nativos. [nativo.json](evidencias/nativo.json) |
| Reinicio nativo | Segunda apertura del proceso QA conserva la intervención 2 y el estado de resultado de Aventura en los cinco capítulos. [nativo-reinicio.json](evidencias/nativo-reinicio.json) |
| Movimiento reducido | Preferencia activa en los recorridos y capturas; estilos sin animación/transición |
| Audio disponible/desactivado/fallido | **No ejecutable en este frontend:** no hay reproductor de voz implementado. Los metadatos de audio no equivalen a reproducción probada; permanece pendiente |
| Windows 125/150 % reales | **Pendiente**. La equivalencia de viewport prueba espacio CSS, no sustituye cambiar el DPI del sistema y validar WebView2 en esas configuraciones |
| CI remoto | La PR ejecuta contrato/editorial, frontend y backend Linux. Consultar el estado del commit integrado en Actions; la entrega final identifica SHA y resultado real |

No se afirma un recorrido visual manual de los 317 recursos. La geometría evita el rectángulo crítico declarado, pero la corrección de ese metadato para cada obra sigue siendo un requisito de aceptación. Tampoco se afirma que toda combinación de toda intervención y todo estado se haya recorrido a cada tamaño: el recorrido completo usa 1366×768, mientras la matriz utiliza los textos más extensos por capítulo. Las capturas incluyen escenas claras/oscuras y vistas de emergencia; la aprobación de contraste y composición por intervención sigue pendiente.

El entorno nativo usa el identificador separado `com.javierrb35.elquijote.dc37qa` y un perfil WebView2 de QA. Sus diez archivos de progreso son datos de prueba y **no se incorporan al repositorio**. El backend todavía lee recursos del repositorio local: el resultado offline no certifica un instalador autónomo ni distribución pública.

## Capturas comparables, no renders

Las imágenes «antes» proceden de un checkout separado del SHA inicial servido en 1421; las posteriores, del código de esta entrega en 1420. Mismo viewport, capítulo y contenido. Las capturas son evidencias de UI, no nuevos recursos artísticos.

| Pantalla | Antes | Después |
|---|---|---|
| Historia I.1, intervención 3 | [Original](evidencias/antes-historia-1366.png) | [Lienzo](evidencias/historia-1366.png) |
| Aventura I.1, ronda 1 | [Original](evidencias/antes-aventura-1366.png) | [Pergamino](evidencias/aventura-1366.png) |
| Menú | [Original](evidencias/antes-menu-1366.png) | [Fondo pendiente explícito](evidencias/menu-1366.png) |
| Contemplación | No existía | [Imagen recuperable](evidencias/contemplacion-1366.png) |
| Museo | Se conserva catálogo y obra íntegra | [Vista real](evidencias/museo-1366.png) |
| Fallo de imagen | — | [Texto y control disponibles](evidencias/fallo-imagen-1366.png) |
| Tauri sin red | — | [Captura nativa](evidencias/nativo-offline.png) |

## Incidencias localizadas y acciones

| ID / prioridad | Localización | Estado / acción |
|---|---|---|
| DC37-V01 / P0 | [159 filas de Historia](historia_carencias.csv) | 144 pendientes de validación nueva, cuatro no aptas según objeciones existentes, 11 sin asignación. Revisar candidatos y confirmar carencias reales; no producir automáticamente |
| DC37-V02 / P0 | [66 funciones de 33 rondas](aventura_carencias.csv) | Validar preimagen/consecuencia, cronología y composición. Cuatro rondas son de I.3 inactivo |
| DC37-V03 / P0 | Menú/Museo y destinos del [informe de fondos](FONDOS_Y_PANTALLAS.md) | Falta aprobación ambiental por destino; no reasignar biblioteca/paisaje solo por existir |
| DC37-V04 / P0 | `app/src/cine/encuadres.json` y recursos sin entrada | El valor por defecto es una hipótesis histórica. Validar regiones de cada recurso; la corrección conservadora del hidalgo/Rocinante evita una oclusión observada, pero no aprueba esa composición |
| DC37-Q01 / P1 | WebView2, Windows 125/150 % | Ejecutar QA con DPI real y nuevas capturas; no extrapolar el DPR 1 |
| DC37-Q02 / P1 | Historia/audio | Implementar/validar voz solo dentro del desarrollo autorizado que corresponda; probar pausa y fallos cuando exista reproductor real |
| DC37-T01 / P1 | Adaptador `app/src/capitulos/registro.ts` | IDs DQ.INT/DQ.BEAT derivados del orden activo. Deuda previa: estabilizar mediante migración explícita de guardados, no cambiar identidades en este rediseño |
| DC37-T02 / P2 | Build frontend | Bundle principal ~780 kB; optimización posterior con medición, sin bloquear esta corrección |
| DC37-T03 / P1 | Backend Fase 1 | Recursos leídos del repo local; empaquetado autónomo no certificado por esta prueba offline |

Se corrigieron durante la verificación: apertura en blanco de Historia II/IV/V, cierre que aumentaba demasiado la altura del último relato, márgenes heredados de Aventura en ventanas estrechas, cabecera que invadía el pergamino y opciones largas con texto muy grande. La solución es compartida, no una excepción por capítulo. No quedan esos defectos certificados solo por una captura: se vuelven a medir los consumidores en la matriz.

## Reproducción

1. `npm ci` en `app`; `npm run build`; `npm test`.
2. Desde raíz: `python -I tests/dev/test_auditoria_dc37.py`; `python tools/editorial_validation/auditar_dc37.py`; validadores de contrato y medios del workflow.
3. Vite en `127.0.0.1:1420`; `npm run test:dc37` y `node scripts/qa-dc37-recuperacion.mjs`. Microsoft Edge instalado; `QA_BROWSER_CHANNEL` permite otro canal instalado. Los scripts escriben evidencias y fallan ante regresiones comprobadas.
4. Para el antes: checkout separado del SHA base, Vite 1421, `node scripts/qa-dc37-antes.mjs` desde esta entrega.
5. Nativo: compilar con `scripts/cargo-dev.cmd build --features tauri/custom-protocol` y `TAURI_CONFIG` que seleccione el identificador QA anterior y ventana oculta 1366×768. Lanzar oculto, con `WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS=--remote-debugging-port=9223` y `WEBVIEW2_USER_DATA_FOLDER` separado. Con perfil QA limpio y `DC37_PERFIL_QA=com.javierrb35.elquijote.dc37qa`, ejecutar `node scripts/qa-dc37-nativo.mjs`. Reiniciar ese proceso y repetir con `DC37_REANUDAR=1`. Nunca conectar este ensayo al perfil habitual del jugador.

## Archivos y alcance transversal

- Compartidos: `app/src/cine/ContenedorCine.tsx`, `composicion.ts`, `lienzo.css`, `FondoContextual.tsx`, `PanelDescubrir.tsx`, `encuadres.json`.
- Consumidores: `App.tsx`, `aventura/AventuraNarrativa.tsx`, `historia/ReproductorHistoria.tsx`, `historia/logica.ts`, `museo/Museo.tsx`.
- Verificación: `app/tests/cine.test.ts`, `app/tests/composicion.test.ts`, scripts `qa-dc37*.mjs`, `tests/dev/test_auditoria_dc37.py`, workflow, dependencia Playwright y lockfile.
- Documentación: esta carpeta, generador `tools/editorial_validation/auditar_dc37.py`, referencias en Arquitectura/ADR, UX y QA.
- Sin modificación de corpus, JSON narrativos, imágenes originales, contratos, motor, backend, registro de activación ni datos personales. Lector, Atlas, perfiles y Cuaderno completo carecen de pantalla activa y se registran como pendientes, sin ampliar Fase 1.

**IMPACTO TRANSVERSAL Y REUTILIZACIÓN:** causa y antes/después anteriores; reglas en el contenedor compartido, aplicadas y probadas en ambos modos. Museo mantiene la visualización íntegra de obras; su consulta documental y Descubrir admiten desplazamiento de página, no scroll en un overlay narrativo. Los fondos y las regiones todavía pendientes no son excepciones aprobadas a DC-37. La integración técnica no cierra esos P0 visuales.


## Corrección solicitada tras la PR #99 — controles cinematográficos (2026-11-12)

**Estado de aceptación artística: NO APROBADO.** El propietario rechazó los botones de reproducción situados dentro del pergamino y solicitó tres controles flotantes con posición fija sobre la imagen: anterior «<» en el extremo izquierdo, reproducción/pausa en el centro y siguiente «>» en el extremo derecho, con ocultación tras **2 segundos** sin mover el ratón y recuperación por movimiento. Este encargo técnico posterior concreta la preferencia orientativa de DC-37 §9 (antes se mencionaban 3 s como hipótesis); no altera TS-001 ni la aprobación de imágenes.

**IMPACTO TRANSVERSAL Y REUTILIZACIÓN:**

- Causa raíz: la barra de Historia se representaba dentro de la unidad textual y desplazaba los botones según la altura del contenido. Las continuaciones de Aventura también dependían del pergamino.
- Corrección en el nivel compartido: `ControlesCine.tsx` y `lienzo.css` colocan los controles sobre el lienzo `ContenedorCine`, con posiciones en coordenadas de la superficie de juego, no del texto. El tiempo de inactividad es único y está fijado en 2000 ms. Se evita modificar los motores narrativos.
- Consumidores: Historia usa izquierda, centro y derecha; Aventura conserva sus opciones dentro del pergamino y pasa descubrimiento/continuación/reinicio al mismo control flotante derecho. La repetición y el autoavance de Historia siguen disponibles desde Ajustes y teclado, pero ya no en el texto. Contemplación oculta controles de avance, no su icono fijo de recuperación.
- No afectados: Museo, Lector, Atlas, Cuaderno, perfiles, motor de preguntas, corpus, derechos, imágenes y contratos; sus funcionalidades no utilizan el transporte de escenas. No se consideran pantallas finales artísticamente aprobadas por esta corrección.
- QA: las regresiones de usuario/posición/temporizador se describen en `app/scripts/qa-dc37-controles.mjs`; la batería preexistente de `qa-dc37.mjs` se adapta a los botones flotantes. El resultado ejecutado y CI deben contrastarse en el commit de integración; no se atribuye PASS a una prueba no ejecutada.
- Limitaciones: la evaluación real de contraste, superposición sobre rostros/pistas, fondos, Windows a 125/150 % y cobertura de imágenes mantiene su condición pendiente de la PR #99. Sin nuevas imágenes ni aceptación artística automática.
