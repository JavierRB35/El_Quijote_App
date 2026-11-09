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

---

## Actualización QA transversal — 2026-11-09 (ejecución real en GitHub)

**Precedencia:** este apartado sustituye los estados «NO EJECUTADO/PENDIENTE» de compilación, tests y Chromium indicados más arriba para los SHA identificados aquí. Las capturas existen como artefactos del runner, **no han sido inspeccionadas artísticamente por Dirección**; ningún PASS automático significa aceptación final.

### Identidad, reproducibilidad y resultados

- `main`: `ea6ad7aa0f10f253c82a6ab8f10cd2c81d92959e` al comenzar.
- #79: `271faa9c790d488b7e4a29f4cb73473e30b0b986`; #87: `3921acfd1584e8c5209ec7bfa15ea41915a43c84`; #88: `3f09b3304c2afda2059a751c6614d71642e3004a`.
- Comparativa real `main` vs #79 vs #89 vs #87: [GitHub Actions #42645051640](https://github.com/JavierRB35/El_Quijote_App/actions/runs/42645051640). Sus cuatro jobs emplearon checkout por variante, Node 24, Vite real, Chromium y assets originales del paquete del repositorio.
- **#89:** `npm run build` PASS, `npm test` **74 PASS / 0 FAIL**; Chromium **19/19** mediciones sin error ni precaución automática; QA interactivo **36 casos / 0 fallos** reportados. [Capturas/JSON/logs originales](https://github.com/JavierRB35/El_Quijote_App/actions/runs/42645051640/artifacts/13687086545).
- **#87 por separado:** build PASS; **66 tests PASS / 0 FAIL**, Chromium **9/9** mediciones y QA interactivo **59 casos / 0 fallos** reportados. [Capturas/JSON/logs](https://github.com/JavierRB35/El_Quijote_App/actions/runs/42645051640/artifacts/13687780400). **No es prueba de una integración combinada #87 + #89**.
- Los jobs de variantes anteriores `main` y #79 **FAIL en gate de composición previsto**, pese a ejecutarse build y pruebas: la ejecución global aparece como FAIL por estos controles de referencia, no por el job #89.
- Nuevo workflow de QA dedicado `.github/workflows/qa-p0-cinematografico.yml` en rama #89; [ejecución complementaria](https://github.com/JavierRB35/El_Quijote_App/actions/runs/42645687931). Ver su resultado exacto antes de considerar esta nueva referencia cerrada.

### IMPACTO TRANSVERSAL Y REUTILIZACIÓN (PR #88, norma pendiente de fusionar)

| Consumidor | Patrón y alcance | Estado |
|---|---|---|
| Aventura clásica | `ContenedorCine`, `App.css`, preguntas y hotspot; imagen `contain`, rail lateral de escritorio, fallback | **PASS técnico del job #89**; juicio de composición artística PENDIENTE |
| Historia | Reutiliza `ContenedorCine`; texto TS-001 sin corte, misma política de overlays | **Medida en Chromium #89**; lectura visual completa / Tauri PENDIENTE |
| Aventura v2 #87 | **No utiliza `ContenedorCine`**. Usa `AventuraNarrativa.tsx` y `aventuraNarrativa.css` propios; `object-fit:contain` en obra y panel independiente | **PASS técnico separado**; integración combinada y revisión de accesibilidad real PENDIENTE |
| Museo | `Museo`, `VisorObra`, CSS propio; obras patrimoniales completas, scroll de ficha permitido | **Chromium de muestra #89**; inspección visual y regresión extensa PENDIENTE |
| Atlas, Lector, Cuaderno, menús y ajustes | No consumen `ContenedorCine` en este piloto o son pantallas con lectura/fichas que admiten scroll legítimo | **No incluidos en la suite visual**; no extrapolar PASS |

**Causa raíz:** políticas de `object-fit`, presupuesto y overflow fragmentadas por módulo. **Nivel adecuado:** patrones genéricos y políticas por superficie; no CSS por ID de pregunta. **Excepciones legítimas:** lector/fichas y vista independiente sin escena tienen scroll; overlays cinematográficos no.

### Incidencias y criterios de aceptación restantes

1. **Original vs CSS:** la comprobación de `naturalWidth`/`naturalHeight`, `objectFit` y caja DOM certifica geometría, **no** presencia física de cabeza/gesto fuera del archivo. Comparar PNG original contra captura real: incidencia artística PENDIENTE de identificación por asset.
2. **Cinematografía:** medición automática de área y visibilidad no reemplaza criterio humano de si el raíl de 36 % sigue siendo subordinado a imagen protagonista. Revisión de las 3×3 capturas antes/después PENDIENTE.
3. **Accesibilidad:** controles de teclado/hotspots/persistencia tienen pruebas automatizadas, pero lector de pantalla, Windows/WebView2 con zoom 125–150 %, foco y cambios de resolución en la misma sesión necesitan validación complementaria.
4. **Regla #88:** norma leída y aplicada a esta matriz; el cambio documental está en otra rama sin fusión. No asumir herencia automática en Aventura v2 por estilos/componentes distintos.
5. **Dependencias:** primero decidir #88 documental; revisar #79; validar combinación de código #87 + #89 (incluido `App.tsx`, CSS global y guardados); resolver conflictos con intervención acotada; después revalidación integrada. **No fusionar automáticamente #79, #87 ni #89**.

**Dictamen:** candidato funcional y técnicamente probado por jobs aislados; **ACEPTACIÓN VISUAL Y TRANSVERSAL AÚN PENDIENTES** hasta inspeccionar archivos de evidencia originales y construir la combinación real #87 + #89.
