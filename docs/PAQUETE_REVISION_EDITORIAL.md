# PAQUETE ÚNICO DE REVISIÓN EDITORIAL — decisiones pendientes del piloto

**Fecha:** 2026-11-06 · **Preparado por:** DESARROLLO (R09/R11) a partir del dictamen de Coordinación sobre PR #35/#36.
**Objetivo:** un solo expediente que agrupe **todas** las decisiones editoriales pendientes del piloto, con **tabla común de visados por especialidad** (R05, R06, R12, R01/R02) y **comprobación técnica posterior (R09)** — según la recomendación expresa: «una única pasada de R01/R02 no sustituye los visados de R05, R06 y R12».
**Regla de cierre:** una fila queda decidida cuando las cuatro especialidades marcan conformidad (o rechazo con motivo) **y** R09 valida la viabilidad técnica del resultado. Ninguna fila de este paquete autoriza por sí sola integración en runtime.

## A. Las 14 propuestas antiespoiler (PR #30 — no incorporadas a la matriz #32)

Fuente: `docs/data/propuesta_correcciones_visuales_pre_r15.csv` (13 `RETIRAR_PRE` + 1 `MANTENER_CONDICIONAL`). Estado: **0/14 incorporadas, 0/14 aprobadas** (PR #35).

| # | Propuesta (resumen) | Evidencia | R05 | R06 | R12 | R01/R02 | R09 |
|---|---|---|---|---|---|---|---|
| A-01 | Q.217 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-02 | Q.232 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-03 | Q.233 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-04 | Q.234 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-05 | Q.235 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-06 | Q.236 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-07 | Q.237 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-08 | Q.238 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-09 | Q.313 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-10 | Q.314 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-11 | Q.315 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-12 | Q.316 mantener condicional | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-13 | Q.317 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |
| A-14 | Q.318 retirar pre | CSV PR #30 | ☐ | ☐ | ☐ | ☐ | ☐ |

## B. Los 11 vínculos condicionados de las acuarelas 021/025 (adenda R12, PR #36)

Fuente: `docs/ADENDA_R12_TRATAMIENTO_ACUARELAS_021_025.md` + `INFORME_QA_PATRIMONIO_VISUAL.md` (R12-PIL-02). Condición ya vigente: **021 = alegoría (nunca documentación literal del escrutinio)**; **025 = apoyo ilustrado no literal** (recreación de la hoguera diferible).

| # | Vínculo | Destino/fase | Condición a visar | R05 | R06 | R12 | R01/R02 | R09 |
|---|---|---|---|---|---|---|---|---|
| B-01 | `R05C-000005` (021) | cuaderno · consulta | Rotulado «alegoría de expurgo» | ☐ | ☐ | ☐ | ☐ | ☐ |
| B-02 | `R05C-000006` (021) | descubrimientos · discovery | Idem + sin uso como prueba del hecho | ☐ | ☐ | ☐ | ☐ | ☐ |
| B-03 | `R05C-000007` (021) | lector · after | Idem, tras el desenlace | ☐ | ☐ | ☐ | ☐ | ☐ |
| B-04 | `R05C-000008` (021) | lector · lectura contextual | Idem, anclada a su pasaje | ☐ | ☐ | ☐ | ☐ | ☐ |
| B-05 | `R05C-000009` (021) | museo · after | Idem, ficha con atribución Tusell/Doré | ☐ | ☐ | ☐ | ☐ | ☐ |
| B-06 | `R05C-000010` (021) | museo · consulta | Idem | ☐ | ☐ | ☐ | ☐ | ☐ |
| B-07 | `R05C-000011` (021) | preguntas → discovery | Idem + `safe_after` del episodio | ☐ | ☐ | ☐ | ☐ | ☐ |
| B-08 | `R05C-000505` (025) | cuaderno · consulta | Rotulado «apoyo ilustrado no literal» | ☐ | ☐ | ☐ | ☐ | ☐ |
| B-09 | `R05C-000506` (025) | descubrimientos · discovery | Idem | ☐ | ☐ | ☐ | ☐ | ☐ |
| B-10 | `R05C-000507` (025) | lector · lectura contextual | Idem (no recreación de la hoguera) | ☐ | ☐ | ☐ | ☐ | ☐ |
| B-11 | `R05C-000508` (025) | museo · consulta | Idem, con atribución Tusell/Doré 1905 | ☐ | ☐ | ☐ | ☐ | ☐ |

## C. El fallo contextual de `900157` (I,6)

Fuente: `INFORME_QA_PATRIMONIO_VISUAL.md` (2.ª auditoría R12) y `PROPUESTAS_MEJORA_VISUAL.md`. El fotograma `p1_c06_ama_sobrina_libros_pre.webp` (900157) deja de usarse entero en I,6; rescate posible con **recorte izquierdo** si pasa QA; el fichero original permanece íntegro.

| # | Decisión | Evidencia | R05 | R06 | R12 | R01/R02 | R09 |
|---|---|---|---|---|---|---|---|
| C-01 | Retirar 900157 del uso completo en I,6 y evaluar rescate por recorte | R12 2.ª auditoría | ☐ | ☐ | ☐ | ☐ | ☐ |

## D. Comprobación técnica (R09) — tras los visados

1. Verificar que toda fila «conforme» tiene su condición registrada en el dato (o su alta tramitada por PR documental, sin retroeditar CSVs).
2. Ejecutar suite de contrato (49→51+) y paquetes reales tras cualquier alta.
3. Registrar el resultado de esta tabla en `VISION_Y_DECISIONES` (o el acta de hito que corresponda).

## Estado

- ☐ Visados R05/R06/R12 (contenidos/arte/QA) — **pendientes**
- ☐ Visado editorial R01/R02 — **pendiente** (puede ejecutarse en la misma pasada que la contrafirma de ADR-0005, H5)
- ☐ Comprobación técnica R09 — la realizará DESARROLLO cuando la tabla vuelva con los visados
