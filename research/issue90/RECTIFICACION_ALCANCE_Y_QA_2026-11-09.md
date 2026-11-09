# Issue #90 — Rectificación de alcance y QA editorial

**Fecha:** 2026-11-09 · **Estado:** investigación editorial integrada; rondas NO integradas en la aplicación.  
**Fuente de verdad:** `main` de `JavierRB35/El_Quijote_App`, partida de `397cb35869fee0ef87ea949452cbe6c5360745bc`.  
**Normativa leída antes de editar:** `AGENTS.md` y `docs/DIRECTRIZ_DESARROLLO_AGIL_2026-11-09.md`; decisiones del producto y mecánica descrita en `docs/REGLAS_MODO_AVENTURA_V2_2026-11-08.md` de PR #87.

## 1. Corrección de rumbo aprobada por la instrucción posterior

La **PR #95** formaliza una orden posterior del propietario: el cuestionario cultural `DQ.Q` se **retira**, no se conserva como modo alternativo ni como banco histórico en producción. Las nuevas interacciones del Modo Aventura son **anticipaciones de acciones siguientes**, con opciones seleccionadas, canon inmutable y puntuación/checkpoints. PR #95 está apilada sobre PR #87 y no debe fusionarse aisladamente. La PR #93 contiene una auditoría y seis preguntas retrospectivas del sistema que se va a retirar; **no debe fusionarse** para evitar reincorporar artefactos obsoletos.

Esta rectificación **no reabre** el esquema, ni modifica el código, los contratos, el manifiesto de contenidos ni los datos de producción; tampoco elimina pasajes o imágenes que puedan servir en Historia/Museo.

## 2. Entrega compatible integrada en main

- `anticipaciones_I07_I09_candidatas.json`: **6 rondas candidatas** (3 para I.7: aceptación de Sancho, montura del asno, salida nocturna; 3 para I.9: búsqueda de intérprete, respuesta de don Quijote al golpe, clemencia condicionada al vizcaíno). Incluye contexto anterior, tres alternativas, solución, consecuencia, fundamento, marcador antiespoiler, referencias y fuentes. IDs **ISS90** temporales, `pasajeId=null` (no inventar pasajes), `integrable=false` y no aplica créditos ni puntos reales. Mantener dificultad media uniforme.
- `cobertura_126_aventura_anticipacion.csv`: **126 capítulos inventariados**; `0` rondas v2 verificadas como integradas en el `main` de este corte; I.8 figura con **9 en PR #87, no fusionada**; las seis candidatas I.7/I.9 figuran como no integradas. No confundir producción de manuscrito con Fase 2 autorizada.
- Los hechos de I.7 e I.9 se han contrastado en **Project Gutenberg #2000**, https://www.gutenberg.org/files/2000/2000-h/2000-h.htm (I.7, desde «En este tiempo, solicitó...» hasta la segunda salida; I.9, Alcaná y desenlace del vizcaíno). La narración y las opciones son paráfrasis **originales**, no citas literales. Faltan anclajes canónicos y cotejo con la edición académica Rico y el EPUB de lectura.

## 3. QA de las correcciones y pendientes reales

| Elemento | Estado | Evidencia / siguiente paso |
|---|---|---|
| Inventario 126 capítulos | **PASS** | CSV 126 filas, IDs de capítulo del mapa; no implica cobertura narrativa completa |
| Estructura de seis propuestas | **PASS básico** | JSON analizable, IDs únicos, tres alternativas por ronda, correcta válida, seis `pasajeId=null`, `integrable=false` |
| Coherencia de continuidad I.7 → I.8 → I.9 | **REVISIÓN EDITORIAL PENDIENTE** | Capítulo IX abre con marco de segundo narrador y continúa el combate detenido en VIII |
| Q.312 del cuestionario clásico | **NO CORREGIR EN PRODUCCIÓN** | Se elimina con PR #95. En estado antiguo, `passage_ids=P0001` y `evidence.passage_id=P0002` discrepaban. No actualizar un objeto destinado a retirada. El pasaje `P0002` se conserva y, si se reutiliza, requiere revisar alcance de capítulo y anclas |
| 58 preguntas con medios repetidos | **OBSOLETO PARA MODO NUEVO** | Pertenecen al catálogo `DQ.Q` que se retira. Auditar las imágenes por su función real en las rondas nuevas, no encargar 58 sustituciones |
| Inventario visual I.7 | **EXISTENCIA PASS; APTITUD PENDIENTE** | 3 WebP existentes: `p1_c07_sancho_promesa_pre`, `p1_c07_sancho_alforjas_pre`, `p1_c07_segunda_salida_pre` |
| Inventario visual I.9 | **EXISTENCIA PASS; APTITUD PENDIENTE** | 2 WebP existentes: `p1_c09_manuscrito_toledo_pre` y `p1_c09_manuscritos_alcana_post` |
| Recursos por ronda | **PENDIENTE** | Cuatro preimágenes candidatas existentes (I.7 ×3, I.9 ×1); I.9 ×2 sin preimagen asignada. Ningún recurso se ha aprobado visualmente ni para derechos; verificar primero los assets del resto de capítulos antes de encargar arte |
| TS-001 | **PENDIENTE** | El guion de Historia debe tener cada intervención visible íntegra incluso sin audio; este expediente no implementa Historia |
| Tests de aplicación/CI | **NO EJECUTADOS** | Solo documentación/datos candidatos, sin cambios en app. No presentar como aprobado un test de motor, compilación o render |

**Privacidad:** GitHub devuelve actualmente `visibility=public`; documentos históricos dicen «privado». La integración de estas propuestas solo incorpora texto original y rutas, **no binarios ni materiales ajenos**. La visibilidad del repositorio es una decisión/configuración del propietario; **no se ha modificado** ni se presume correcta por estar documentada de otra manera.

## 4. Integración y coordinación

El nuevo archivo de candidatos **no forma parte del catálogo productivo** ni se añade a `package.json`. Antes de integrar código o datos: revisión editorial de cada hecho/cronología y distractor, validación antiespoiler de imágenes efectivas, verificación de licencias y anclajes de fuentes, disponibilidad de planos anteriores y posteriores, luego pruebas de motor/guardado y QA de composición/TS-001. La autorización actual permite seguir **preparando** los 126 capítulos, no distribuirlos ni declararlos terminados. PR #87 y PR #95 mantienen su proceso de desarrollo y QA independiente.

**Resultado:** se ha corregido la dirección editorial, **no** se ha aprobado el capítulo ni alterado el juego; tras esta entrega, detener iteración hasta trabajo nuevo concreto o defectos reales demostrados.
