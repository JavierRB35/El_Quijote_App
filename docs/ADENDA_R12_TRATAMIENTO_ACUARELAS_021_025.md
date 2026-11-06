# ADENDA R12 — Tratamiento documental de las acuarelas 021 y 025 (corrección localizada)

**Fecha:** 2026-11-06 · **Origen:** dictamen de Coordinación tras la 2.ª auditoría R12 (H4 cerrado documentalmente); corrección localizada exigida, sin reabrir H4 ni generar imágenes.
**Precedente aplicado:** los CSV de matrices **no se retroeditan** (PR #35); las correcciones se tramitan como adenda documental con traza. **CSV inalterados.**

## 1. Regla documental que se impone (evidencia: `INFORME_QA_PATRIMONIO_VISUAL.md`, inspección directa R12)

| Acuarela | Evidencia R12 | Tratamiento OBLIGATORIO en toda propuesta y futura integración |
|---|---|---|
| **021.jpg** («Espurgo de libros de caballerías») | Inspección directa: **alegoría de expurgo** (figura gigante barriendo pequeñas representaciones caballerescas) — NO muestra al cura/barbero verificando libros | **ALEGORÍA**: únicamente como imagen alegórica/discusión literaria **rotulada**, vinculada a descubrimientos/lector/museo/cuaderno. **Nunca** como documentación visual del gesto literal del escrutinio ni como prueba del hecho |
| **025.jpg** («El ama quema los libros») | Pasa a PENDIENTE para recreación literal de la hoguera nocturna (luz diurna, estilo 1905, sin reserva TS-001) | **APOYO ILUSTRADO NO LITERAL** (narración ilustrada, `APTA_CON_APOYO` per H4 §4.2): la recreación literal de la hoguera permanece **diferible** y requiere producción propia si la continuidad 16:9 la exige |

## 2. Alcance sobre la matriz de propuestas (`vinculos_visuales_consolidados.csv`, PR #32 — CSV congelado)

Las filas siguientes quedan **condicionadas** por esta adenda (su `estado_aprobacion_destino` ya es `NO_APROBADO_PROPUESTA_DOCUMENTAL`; la condición añade el tratamiento obligatorio a cualquier aprobación futura):

- **021:** `R05C-000005` (cuaderno) · `R05C-000006` (descubrimientos) · `R05C-000007`/`R05C-000008` (lector) · `R05C-000009`/`R05C-000010` (museo) · `R05C-000011` (preguntas→discovery).
  Condición: rotulado «alegoría de expurgo» y **prohibido** su uso como imagen documental del escrutinio literal en cualquier destino.
- **025:** `R05C-000505` (cuaderno) · `R05C-000506` (descubrimientos) · `R05C-000507` (lector) · `R05C-000508` (museo).
  Condición: tratamiento «apoyo ilustrado no literal» — la imagen acompaña la narración; **nunca** sustituye una recreación literal de la hoguera ni se presenta como reconstrucción del hecho.

## 3. Coherencia con documentos vigentes

- H4 v0.2.2 (PR #33, cerrado documentalmente): la 025 ya figuraba como `APTA_CON_APOYO`/diferible; esta adenda añade el rotulado **no literal** exigido por la evidencia R12 posterior. No reabre H4.
- `INFORME_QA_PATRIMONIO_VISUAL.md` (R12-PIL-02): fuente de la evidencia; esta adenda es su ejecución documental.
- Las 14 propuestas antiespoiler de PR #30 siguen **no incorporadas** (PR #35); esta adenda no las toca.

## 4. Estado

- Corrección localizada **aplicada** (esta adenda; CSV intactos por precedencia).
- Pendiente de visado editorial en la próxima revisión de la matriz (R05/R06/R12 + Coordinación), junto con las 14 propuestas de PR #30.
