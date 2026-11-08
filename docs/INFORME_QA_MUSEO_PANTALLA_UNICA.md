# INFORME QA — Museo: pantalla única conforme a la maqueta visual oficial (P1)

**Encargo:** PROMPT «MUSEO DE EL QUIJOTE: implementación completa de la pantalla única conforme a la maqueta visual oficial» (auditoría 2026-11-08).
**Rama:** `feature/museo-pantalla-unica` · **SHA inicial de `main`:** `921237af0c364418d64f12735ce4c7231dc54c0a` · **SHA final:** ver PR.
**Referencia visual:** `docs/referencias/museo/MUSEO_REFERENCIA_VISUAL_OFICIAL.png` — SHA-256 recalculado antes de empezar: `edc1afebf58f88a25ed249fe5cd288d1f24e2202195cceb288e6a414146994a7` ✓ (blob `1355c6018e5d878cc14bf0cdbddd3e63accbf467`, commit de alta `54826cd`).

## 1. Qué se ha implementado

- **Pantalla única reutilizable** (`app/src/museo/VisorObra.tsx`): obra protagonista izquierda (~69 %, `object-fit: contain`, sin texto encima, flechas ‹ › semitransparentes, botón ⤢), ficha editorial derecha (~28 %, fuera del rectángulo de la obra: overheader → título serif → pastilla «Parte I · Capítulo VIII» → Explicación → separador → Texto original cursivo → separador → «Ver la obra completa» + «Ficha de la imagen» → separador → fuente al pie) y **carrusel horizontal de miniaturas debajo de la imagen** (5 visibles, activa con filete dorado, flechas en extremos).
- **Vistas auxiliares** (`Museo.tsx`): portada (colección inicial) y galería con filtros Parte/Capítulo documentales y contador — desembocan SIEMPRE en la misma pantalla única. Prohibido cumplido: ningún componente por obra.
- **Cabecera de la maqueta** en el módulo Museo (marca dorada, navegación Historia · Aventura · **Museo** · Atlas · Lector, ajustes/ayuda, filete dorado). Entrada «Museo · Galería artística» añadida al menú principal.
- **Datos**: adaptador `obras.ts` — proyección validada del manifiesto (376 acuarelas, orden de lectura del EPUB, URI canónica `assets://…`), **fusión de las 7 fichas DQ.MUS** del paquete piloto (la ficha manda: título, Explicación, técnica, procedencia, licencia) y anclas de «Texto original» **solo** con vínculos documentados (`pasaje_id_verificado` R16) cotejados contra `content/piloto/passages`. Sin ficha ni ancla → «Procedencia pendiente de verificar» y sin cita. Manifiesto en chunk propio (268 kB / 52 kB gzip) descargado solo al abrir el Museo.
- **Contrato**: `contrato.ts` ampliado con los tipos `MuseumItem`/`License`/`Source` y accesores `piezasMuseo()/licencia()/fuente()` (espejo de `schemas/`; sin cambios en esquemas ni manifiestos fuente).
- **Derechos**: aviso permanente al pie; «Ficha de la imagen» muestra licencia `DQ.LIC.0001` (redistribución **condicionada**, atribución obligatoria); sin descargas de originales.

## 2. Resultados de pruebas

**Automatizadas (`npm test`, 57/57 PASS — 13 nuevas en `app/tests/museo.test.ts`):** 376 acuarelas con IDs únicos y SHA-256; orden de lectura (027 precede a 026); URI canónica y fichero físico 376/376; colección inicial 027→026→028→029→030; fusión de las 7 fichas (DQ.MUS.0003 manda en 029.jpg, spoiler `revelador` detectado); pastilla parejos (Parte I · Capítulo VIII / Parte II · Capítulo PRIMERO con mojibake normalizado); 5 anclas de pasaje con texto cotejado real; fuente sin datos falsos; filtros Parte/Capítulo parejos (Cap. VIII Parte I = exactamente 026–029; no contamina Parte II); ventana del carrusel (5, bordes, colección de 1); derechos `condicionada`; sin avisos estructurales del manifiesto.
**Validador canónico:** `validate.py package content/piloto/package.json` → **VÁLIDO**. **Typecheck:** `tsc --noEmit` → 0 errores. **Build de producción:** ✓ (chunk del manifiesto separado).

**Manuales (navegador real, Vite dev contra el paquete real del repo):**

| Prueba | Resultado |
|---|---|
| Visor 029 a 1672×941: estructura de 4 zonas, proporciones ~69/28 | ✓ (captura 01) |
| Clic en miniatura 28 → imagen principal y ficha cambian SIN recrear pantalla (región DOM estable) | ✓ |
| Teclado ←/→ navega obras (30→31→30), +/−/0 zoom en vista completa, Esc cierra por capas (ficha → vista → galería) | ✓ |
| «Ficha de la imagen»: diálogo con identificador, huella SHA-256, técnica, procedencia, licencia condicionada; cierra con Esc | ✓ |
| «Ver la obra completa»: obra sola, sin texto encima, zoom ×1.5 verificado, retorno sin perder posición | ✓ |
| Filtros Parte I + Capítulo VIII → «4 obras»; carrusel se adapta al contexto (4 miniaturas); «(1 de 4)» en visor | ✓ (captura 02) |
| 1366×768 y 1280×800: estructura conservada, ficha refluye sin tapar la obra | ✓ (capturas 03, 04) |
| Offline (activos locales): todo se resuelve vía `entorno.leerAsset` (`assets://`); sin peticiones a servicios externos | ✓ en dev (middleware local); validación Tauri pendiente de integración nativa |
| Portada: 5 destacadas con títulos de ficha/colección, sin progreso previo | ✓ |

**Fallo corregido durante QA:** Esc desde el visor no volvía a la galería (el render priorizaba `obraActual` sobre `vista`); corregido y regresado.

## 3. Comparación visual con la maqueta (criterio de aceptación §7)

Artefacto: `docs/capturas/p1-museo-unico/05-comparacion-maqueta-vs-implementacion.png` (maqueta arriba, implementación abajo, misma resolución 1672×941).

**Coincide:** estructura de 4 zonas; obra a la izquierda íntegra con `contain`, flechas y botón ⤢ abajo-derecha; ficha oscura a la derecha FUERA de la obra con el orden exacto (overheader versalitas → título serif grande → pastilla con borde dorado «Parte I · Capítulo VIII» → Explicación → Texto original cursivo → 2 botones con borde dorado → fuente pequeña al pie); carrusel inferior de 5 miniaturas paisaje con flechas en extremos; paleta azul noche–pergamino–oro; filete dorado de cabecera; Museo activo en dorado.

**Diferencias justificadas (únicas):**
1. **Obra real del catálogo** (029.jpg, 798×567) en lugar del placeholder IA 16:9 de la maqueta — autorizado expresamente por el encargo §1; márgenes de pillarbox elegantes por `contain` (obra íntegra, sin recorte).
2. **Overheader contextual** «ILUSTRACIONES DEL QUIJOTE» (dato del filtro/colección activa) frente al rótulo de ejemplo «LA SERIE DE LAS AVENTURAS» de la maqueta — el overheader es un dato, no un texto fijo; con colecciones editoriales futuras mostrará su nombre.
3. **Cita real cotejada** del pasaje del momento representado (DQ.P1.C08.P0006: «Acudió Sancho Panza a socorrerle…») en lugar de la cita ilustrativa de la maqueta — exigido por §3 (prohibido inventar comillas).
4. Iconografía de navegación aproximada (emoji/estilo propio) — adaptación tipográfica/estilística menor dentro de la paleta y jerarquía aprobadas.
5. Línea adicional de estado de derechos al pie — exigida por issue #73 §6 (aviso visible y permanente).

## 4. Deudas y pendientes (no bloquean la aceptación visual)

- Validación **Tauri nativa** (`leer_asset` Rust) y prueba offline con instalador: el backend ya resuelve `assets://` (lib.rs); pendiente de ejecutar en entorno MSVC de la máquina.
- Los 369 títulos de obras sin ficha muestran el `alt` del manifiesto (honesto); el título editorial corto llegará con futuras fichas DQ.MUS (el adaptador ya prioriza ficha > colección > alt).
- 7 etiquetas de capítulo del manifiesto llegan con mojibake cp1252 («CapÝtulo», «CAP═TULO»); el adaptador las normaliza para mostrar/pastillas/filtros — los ficheros fuente NO se tocan (pendiente de saneamiento upstream si Dirección lo ordena).
- Atlas/Lector/Ajustes/Ayuda en la cabecera: deshabilitados con `title` informativo (módulos aún no implementados en `main`).

## 5. Derechos

Uso interno en desarrollo. `DQ.LIC.0001.redistribution=condicionada` vigente: la PR es a repositorio **privado** (uso autorizado 2026-11-05), sin instaladores públicos ni descargas de originales. Atribución obligatoria mostrada en toda ficha. La maqueta solo se usa como referencia interna de diseño.
