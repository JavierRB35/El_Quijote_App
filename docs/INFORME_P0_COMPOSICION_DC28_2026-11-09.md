# P0 — Composición íntegra de imagen y paneles (DC-28), 2026-11-09

**Estado:** IMPLEMENTACIÓN CANDIDATA / QA VISUAL PENDIENTE. No declarar el P0 aceptado sin evidencia real.
**Fuente única:** GitHub `JavierRB35/El_Quijote_App`.
**SHA remoto de `main` verificado al comenzar:** `ea6ad7aa0f10f253c82a6ab8f10cd2c81d92959e`.
**Base técnica:** PR #79, rama `feature/p0-composicion-aventura`, HEAD `271faa9c790d488b7e4a29f4cb73473e30b0b986`.
**Rama de esta entrega:** `feature/p0-dc28-composicion-sin-scroll-20261109`. Es una PR apilada sobre #79, sin modificar la rama del otro trabajo y **sin fusionar**.
**Coordinación:** PR #87 introduce otra pantalla de Aventura; no combinar sus estilos a ciegas.

## Diagnóstico reproducible por código

1. `app/src/App.css`, estilo anterior de `.plano`: `object-fit: cover` y deriva escalada que puede recortar la cabeza y otros elementos de escena. No se ha podido examinar aquí el archivo binario original; si el recorte ya está en el original, esta PR no lo repara: escalar a arte.
2. `.panel-pregunta` en `main` tenía `max-height: min(52vh, 32rem)` y `overflow-y: auto`, con una instrucción explícita de ver solo 2,5–3 opciones. La PR #79 trasladó el panel a un lado pero mantuvo `overflow-y: auto` y una columna estrecha.
3. `.banda-texto` y `.lectura` también limitaban alto y permitían scroll; DC-28 (2026-11-08) lo prohíbe para overlays. Los descubrimientos largos tenían un cajón superpuesto con scroll y superficie opaca.

## Solución implementada en esta rama

- El encuadre por defecto se vuelve **`contain`, sin zoom ni deriva**, salvo `cover` solicitado de forma explícita. En Aventura, las preguntas fuerzan `contain`. Se conservan proporciones originales; no se retocan acuarelas. En Historia, el default también es íntegro.
- La pregunta ordinaria vive en una **banda inferior separada de la superficie útil de la imagen**: la imagen completa ocupa la zona superior, las opciones caben en dos columnas adaptativas y conservan controles y tamaño de interacción. No existe scroll en el overlay ordinario ni scroll global. La banda crece por contenido real.
- En viewport estrecho, las opciones pasan a una columna. Si el contenido no cabe respetando presupuesto de escena/viewport, `ContenedorCine` lo detecta mediante DOM + `ResizeObserver` y cambia a una **vista de lectura autónoma sin imagen subyacente**. Solo allí se permite desplazamiento, como contingencia excepcional documentada en DC-28. No hay truncamiento silencioso.
- La narración conserva la banda lateral. Se eliminan sus scrolls ordinarios y se aplica el mismo fallback para intervenciones extensas (TS-001).
- Los descubrimientos voluntarios se abren como **vista autónoma completa**, no como cajón desplazable sobre imagen.
- El cálculo existente de hotspots de #79 sigue asociado a la superficie real dibujada con `contain`; se añade un observador geométrico al tamaño del elemento `img` para adaptarse a cambios en la rejilla.
- No se modifican preguntas, opciones, respuestas, pasajes, licencias, medios binarios ni guardados.

## Ficheros de esta PR

- `app/src/App.css`
- `app/src/cine/ContenedorCine.tsx`
- `app/src/cine/composicion.ts` (nuevo: decisión pura de fallback)
- `app/src/aventura/ModoAventura.tsx`
- `app/src/historia/ReproductorHistoria.tsx`
- `app/tests/composicion.test.ts` (nuevo)
- Este informe.

## Matriz de pruebas y evidencias

| Prueba | Estado | Evidencia |
|---|---|---|
| Reglas puras del fallback (5 casos) | PENDIENTE de ejecución CI | `app/tests/composicion.test.ts` |
| `npm test` | NO EJECUTADO localmente | Ejecutar en GitHub Actions / checkout |
| `npm run build` (TypeScript/Vite) | NO EJECUTADO localmente | Ejecutar en GitHub Actions / checkout |
| 1920×1080, 1366×768, 1280×800 | PENDIENTE | Capturas reales antes/después requeridas |
| Ventana estrecha, Windows escalado 125/150 % | PENDIENTE | Capturas y medidas DOM requeridas |
| Texto medio, grande, muy grande | PENDIENTE | Verificar legibilidad y no recorte |
| single/multi/ordering/matching/hotspot | PENDIENTE | Verificar todas las opciones a la vez y teclado |
| Imagen original y cabeza íntegra | PENDIENTE | Inspeccionar píxeles originales y fotograma final |
| Historia TS-001, progreso, guardar/restaurar, Esc | PENDIENTE | QA de extremo a extremo |
| Hotspots dentro/fuera de obra y teclado | PENDIENTE | QA funcional y coordenadas normalizadas |
| CI de PR | PENDIENTE | Consultar estado de Actions |

**No existen capturas simuladas en esta entrega.** Las capturas previas de PR #79 no demuestran la conformidad de esta modificación. Este texto es trazabilidad técnica, no certificación visual.

## Riesgos y criterios para aceptar

- La reserva inferior de pregunta reduce el alto disponible para contemplar el fotograma. Es un intercambio deliberado para no tapar rostros/acciones; Dirección debe validar visualmente si mantiene calidad de póster.
- `contain` puede dejar bandas neutras. No es defecto: evita pérdidas de contenido; verificar contraste y ubicación de controles.
- Un caso largo puede pasar a vista independiente y necesitar scroll **solo allí**. Ese caso debe identificarse, no contabilizarse como pregunta ordinaria satisfactoria sin juicio visual.
- Si la imagen original está cortada, tramitar incidencia artística; no resolver con CSS. No se regeneran medios.
- La PR #79 (dependencia) aún puede cambiar: revalidar y resolver conflictos antes de promover esta PR contra `main`.

**Cierre bloqueado hasta:** compilación y tests completos, capturas reales y mediciones `scrollHeight/clientHeight` de los overlays, validación de hotspots, no regresiones en Historia/Aventura y aceptación visual de Dirección.
