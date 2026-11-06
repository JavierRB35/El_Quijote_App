# R05 — Informe de imágenes sin destino editorial aprobado

**Snapshot:** `2e23b1cd27c764d946610716a4566a46ceda27cf` · **Fuente de detalle:** `docs/data/matriz_aprovechamiento_visual.csv` (678 filas, ordenadas por ruta).

## Definición operativa
- **Destino propuesto:** recurso y pantalla plausibles con justificación en matriz, **sin autorización para mostrarlo**.
- **Destino aprobado:** relación editorial verificable, compatible con derechos, momento narrativo y spoiler. No debe inferirse de la mera existencia de `MediaAsset`.
- **Excepción:** motivo explícito y siguiente paso, incluso cuando una imagen se conserve solo como material interno. La columna `reason_no_approved_destination` documenta **todos** los casos provisionales; `exclusion_reason` explica las exclusiones de uso narrativo.

## Resultado
| Grupo | Archivos | Estado e intervención |
|---|---:|---|
| Acuarelas Tusell | 376 | Lector/descubrimientos/cuaderno propuestos; cotejar pasaje y derechos antes de aprobar relaciones |
| Escenas narrativas IA | 252 | Historia/preguntas propuestos según fase; validar fidelidad y spoilers antes de usar |
| Primeros planos | 10 | Reacciones de Quijote propuestas; asignar a beat con emoción correspondiente |
| Capitulares y orlas | 29 | Propuesta restringida al lector, opcionalmente museo; **excluidas de preguntas y escena narrativa** |
| Otros editoriales (cubierta/marca/ex-libris/otros) | 10 | Excluidos de narrativa automática; candidato museo solo si se documentan objeto y derechos |
| Referencia artística interna | 1 | **Excluida de publicación**; conservar para continuidad de personajes |
| **Total** | **678** | **678/678** con motivo de pendiente o exclusión y próximo paso |

**No se han emitido aprobaciones editoriales en esta tarea.** La cifra de vínculos aprobados previos y su uso efectivo no se deduce de los manifiestos y queda **NO AUDITADA**. El listado no equipara “sin destino aprobado” a “sin destino propuesto”.

## Casos prioritarios de revisión
1. **P0 — matriz anterior 697 frente a 678 archivos reales:** los XLSX históricos son binarios y no se han podido analizar por este conector. Hay **19 registros de diferencia sin explicación verificada**; no asumir pérdida ni duplicación.
2. **P0 — 9 escenas sin SHA-256:** completar hash y cotejar bytes antes de certificar ausencia de duplicados. Detalle nominal en la auditoría maestra.
3. **P0 — 21 grupos de acuarelas con descripciones repetidas:** revisar si representan vistas distintas del mismo episodio (no borrar por semejanza textual).
4. **P0 — `DQ.IL.0043`:** ilustración colocada en I.15 que representa un discurso de I.11; usar el episodio representado, mantener procedencia del EPUB.
5. **P0 — `DQ.MED.900029`:** el documento histórico de necesidades lo asociaba a II.1, pero el manifiesto actual y el `DQ.MA.900029` del piloto lo relacionan con **I.8, frailes y carreta**. Corregir futura narrativa por evidencia, sin renumerar.
6. **P0 — 39 elementos decorativos editoriales:** 29 capitulares/orlas con destino ornamental candidato y 10 piezas que no justifican por sí mismas aparición en historia o preguntas.
7. **P0 — 1 referencia artística `DQ.MED.900001`:** `reference_only`, evitar exhibición como escena de la novela.
8. **P0 — ilustraciones y derechos:** uso personal/Git privado documentados, distribución bloqueada hasta completar cadena de derechos y atribuciones.
9. **P1 — 10 primeros planos:** carecen de vínculo específico con un beat; la emoción no debe sustituir a la escena ni sugerir hechos no narrados.
10. **P1 — 252 escenas:** `pre` o `post` indica intención, no certificación de ausencia de spoiler. Revisión por pareja imagen–pregunta y por beat del Modo Historia.

## Gobernanza de resolución
Para cada imagen pendiente: responsable R05 (relación textual e iconografía), R06 (consistencia artística), R13 (derechos), R12 (QA spoiler/accesibilidad); registrar evidencia, decisión `APROBADA`/`DESCARTADA` y fecha solo tras intervención efectiva. Descartar de forma motivada un ornamento no es un fallo de cobertura. Ninguna aprobación automática por parecido de filename, capítulo o número.

**Exclusiones físicas:** ninguna fila se suprime de inventario; los recursos no narrativos permanecen trazados con `exclusion_reason`. **Exclusiones del uso narrativo directo:** 39 decorativos y una referencia de arte = 40 archivos; no equivalen a 40 imágenes duplicadas ni inutilizables para su función documental.
