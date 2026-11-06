# DC-IMG-001 — Utilización integral y asignación contextual de imágenes en EL QUIJOTE

**Fecha:** 2026-11-06  
**Estado de la decisión de producto:** **APROBADA POR EL PROPIETARIO**  
**Estado del diseño de integración:** **PROPUESTA PARA REVISIÓN CONJUNTA** (Contenidos + Desarrollo + QA)  
**Modo:** Coordinación/Auditoría · Fase 0  
**Alcance:** todas las imágenes presentes y futuras en `assets/`, incluidas `assets/scenes/`; Modo Historia, preguntas, lector, museo, atlas, cuaderno y descubrimientos.  
**Documentos de referencia:** `docs/ENCARGO_MAESTRO.md`, `docs/CONTRATO_EDITORIAL_TECNICO.md` (v0.2.0), `docs/ESPECIFICACION_FUNCIONAL.md`, `docs/DIRECCION_ARTISTICA.md`, `docs/VISION_Y_DECISIONES.md`.

> **Decisión literal de producto (paráfrasis fiel, 2026-11-06):** Se utilizarán **TODAS** las imágenes de `assets/`, siempre que tengan sentido para la pregunta o la escena del Modo Historia, respectivamente. No debe forzarse una imagen incoherente, reveladora, defectuosa o sin autorización para alcanzar una cifra.

## 1. Qué queda cerrado y qué no

**Cerrado (DC-IMG-001):** aprovechar integralmente las imágenes y no olvidar ninguna; imagen/contexto pertinente; uso de escenas cinematográficas en Modo Historia; reutilización justificada entre preguntas y escenas; inventario y seguimiento del 100 % de archivos visuales; ningún recurso se publica saltándose licencias, calidad, fidelidad narrativa, accesibilidad o controles de spoilers.

**No cerrado:** forma física definitiva de las relaciones (campos existentes frente a entidad `MediaBinding`), orden exacto de prioridades/fallbacks, evolución de JSON Schema, inventario de la revisión definitiva de Git, decisión técnica de empaquetado/caché. Son propuestas de ingeniería y necesitan revisión conjunta. No autoriza implementación ni producción masiva.

**Distinguir objetivos:**
- **100 % de imágenes inventariadas y evaluadas**, con destino rastreable o incidencia documentada: requisito inmediato de gobernanza.
- **100 % de imágenes aptas utilizadas** en algún contexto coherente: objetivo de producto.
- Imágenes sin uso razonable, con derechos pendientes, duplicadas o de uso meramente interno deberán tener **excepción explícita**, motivo, responsable y próximo paso. Prohibido asignarlas artificialmente solo para mejorar la métrica.

## 2. Arquitectura de asignación propuesta (ADR-IMAGES-001)

**Opción A:** copiar/asignar una imagen directamente a cada pregunta. Simplicidad, pero duplicación y pérdida de continuidad. **No recomendada**.

**Opción B:** asignar imágenes solo a escenas. Continuidad cinematográfica, pero no cubre preguntas visuales especializadas. **Insuficiente**.

**Opción C — RECOMENDADA:** catálogo central `MediaAsset` + asignaciones de escena + asociaciones contextuales específicas de pregunta. La misma imagen puede aparecer en varios contextos con distinta fase y política de spoilers, sin duplicación de ficheros.

**Regla fundamental:** las imágenes se enlazan por **ID estable** y URI lógica, jamás por nombre del archivo, posición en array, carpeta o texto de un título. Conservar patrón canónico `DQ.MA.######`, no crear familias paralelas `DQ.IL.*` ni `DQ.MED.*`. Los IDs históricos requieren tabla de correspondencia/migración verificada, sin renumeración ciega.

## 3. Relaciones y momentos narrativos

- `Episode` 1:N `Scene`; una `Scene` puede ambientar N preguntas.
- `MediaAsset` N:M `Scene`, `Question`, `Discovery` y fichas de lector/museo/atlas mediante vínculos contextuales.
- Una pregunta puede usar **cero, una o varias** imágenes según su formato y contenido: `pre_question`, `question_focus`, `post_answer`, `reveal`, `discovery`; una pregunta `hotspot` exige recurso visual o alternativa accesible definida.
- Modo Historia: **situación previa → interacción opcional → pregunta seleccionada → explicación → desenlace/revelación → descubrimiento opcional → continuación**, sin alterar el canon.
- Modo Historia y preguntas independientes podrán reutilizar recursos, pero **no se presume** la misma elegibilidad narrativa: hay que validar qué sabe el jugador y qué revela la imagen.
- Mantener un plano durante varias preguntas si la continuidad lo justifica; cambiar perspectiva solo cuando la pregunta, la acción, el detalle o la dramaturgia lo requieran. No fabricar variantes superficiales.

**Roles visuales candidatos (por normalizar en esquema):** `scene_background`, `scene_layer`, `pre_question`, `question_focus`, `post_answer`, `reveal`, `discovery`, `reader_illustration`, `museum`, `atlas`, `notebook`, `thumbnail`, `reference_only`. `reference_only` significa referencia interna no presentada al jugador salvo aprobación expresa.

## 4. Contrato de datos propuesto, sin romper el existente

**Conservar** `Scene.media_ids`, `Scene.layers` y `Question.visual_requirements` del contrato v0.2.0. Evaluar si una relación canónica adicional `MediaBinding` es necesaria o si se amplían los campos actuales; evitar dos fuentes de verdad divergentes.

Propuesta conceptual de `MediaBinding`:
- `binding_id`: único y estable; relación no identificada por posición.
- `target_type`: `scene | question | episode | discovery | passage | museum_item | place`.
- `target_id`: ID existente en el catálogo.
- `media_id`: `DQ.MA.######`, existente en catálogo.
- `role`: función contextual permitida.
- `phase`: `before | question | reveal | after` cuando aplique.
- `priority`: orden explícito y determinista, sin empate ambiguo.
- `required`: si la imagen resulta imprescindible para el sentido o la mecánica.
- `safe_after_episodes`: episodios que deben haberse recorrido.
- `reveals_answer_to`: preguntas cuya respuesta sería adelantada por el recurso (revisión editorial, no detección automática fiable).
- `fallback_media_id`: opción aprobada, pertinente y compatible con licencias/spoilers; nunca una imagen aleatoria de la carpeta.
- `review_state`, `reviewed_by_role` y `review_note`.

Los nombres definitivos, semántica de `null`, estructura JSON y versión semver quedan **pendientes de doble revisión**. Ejemplo **sintético, NO publicable**, no se afirma que valide con el esquema vigente:

```json
{
  "question_id": "DQ.Q.000123",
  "scene_id": "DQ.P1.C08.E01.S01",
  "bindings": [
    {"role": "pre_question", "media_id": "DQ.MA.000101"},
    {"role": "question_focus", "media_id": "DQ.MA.000102"},
    {"role": "post_answer", "media_id": "DQ.MA.000103"},
    {"role": "discovery", "media_id": "DQ.MA.000104"}
  ]
}
```

**MediaAsset:** inventariar fichero maestro, derivados y hashes, formato/dimensiones, alt, clase de imagen, autor, `source_id`, `license_id`, usos permitidos (incluido almacenamiento en Git e instalador), estado de revisión y nivel de spoilers. El vínculo debe poder resolverse offline. No considerar cada derivado (thumbnail/WebP/AVIF) como imagen editorial distinta para inflar cobertura.

## 5. Algoritmo propuesto de resolución visual

Para un contexto (episodio, escena, pregunta, fase, perfil):
1. Identificar la asignación **específica** de pregunta/fase, si está aprobada y es elegible.
2. Si no existe, consultar la asignación aprobada de escena/fase compatible con la pregunta.
3. Considerar un fallback editorial **explícito**, evaluando coherencia, derechos y spoilers de nuevo.
4. Si no hay recurso válido: si es **esencial**, rechazar el paquete en publicación o impedir esa pregunta hasta corregirlo; si es **opcional**, mostrar una variante textual accesible o prescindir del recurso, dejando evidencia de la omisión.

La selección debe ser determinista y trazable (qué ID se eligió y qué regla lo habilitó), con minimización de lecturas/carga y variantes según resolución. No buscar en el sistema de archivos por parecido de nombres en tiempo de juego. No usar una ilustración posterior como imagen previa solo porque corresponde al mismo capítulo.

## 6. Reglas de spoilers y derechos

El contrato actual prescribe `spoiler_level: ninguno` para imagen previa; **se mantiene mientras no se apruebe una ampliación**. La futura seguridad contextual (imagen + pregunta + fase) deberá documentar `safe_after_episodes` y `reveals_answer_to`, sin degradar la protección actual.

**Publicación:** solo medios con licencia y uso apropiado verificados, incluyendo diferencias entre uso personal en la aplicación, subida a Git remoto y redistribución. Las recreaciones IA no son pruebas históricas; las fotografías actuales se identifican y las acuarelas conservan autoría/atribución y condiciones de uso. Una imagen existente en Git no implica autorización editorial automática.

## 7. Inventario maestro y métricas

Inventariar recursivamente `assets/` (incluidas `assets/scenes/`), distinguiendo originales, derivados, referencias artísticas, decorativos, imágenes editoriales, capas, miniaturas y archivos no utilizables. Registro mínimo:

| Campo | Significado |
|---|---|
| `physical_path` | Ruta real constatada en una revisión Git concreta |
| `sha256` | Integridad y detección de duplicado binario |
| `media_id` | ID canónico o pendiente de vincular |
| `media_class` / `role_candidates` | Tipo y usos posibles |
| `episode_ids`, `scene_ids`, `question_ids` | Relaciones editoriales justificadas |
| `publication_status` | Apto, en revisión, bloqueado o referencia interna |
| `usage_count` | Número de relaciones aprobadas para el jugador |
| `exception_reason` | Por qué no se utiliza aún |
| `source_id`, `license_id` | Procedencia/derechos |
| `owner_role`, `review_date` | Responsable y fecha de revisión |

**KPI-1 — cobertura de inventario:** imágenes físicas inventariadas / imágenes físicas detectadas = **100 %**.  
**KPI-2 — cobertura de evaluación:** imágenes con destino aprobado **o excepción motivada** / imágenes inventariadas = **100 %**.  
**KPI-3 — utilización efectiva de imágenes aptas:** imágenes distintas aptas con al menos un uso aprobado / imágenes distintas aptas = **objetivo 100 %**.  
**KPI-4 — errores de coherencia, spoilers, licencias y referencias en recursos publicados:** **0**.

No confundir imágenes físicas con recursos editoriales distintos ni contar originales/derivados como imágenes independientes. Informar explícitamente del número de recursos no aptos y sus motivos. Una imagen muy reutilizada no sustituye a otra olvidada.

## 8. Responsabilidades entre equipos

| Trabajo | Responsable | Revisión / evidencia |
|---|---|---|
| Inventario y clasificación del 100 % de `assets/` | Contenidos + iconografía | Lista de archivos, hash, ID, estado |
| Asignación por episodio, fase y pregunta | Contenidos | Matriz justificada y comprobación anti-spoiler |
| Continuidad, planos, capas, zonas seguras | Dirección artística | Revisión visual, accesibilidad |
| JSON Schema / relación definitiva y migraciones | Desarrollo | Doble revisión Contenidos-Desarrollo, semver |
| Resolver de medios, empaquetado y caché | Desarrollo | Pruebas deterministas y offline |
| Auditoría de imágenes no utilizadas | Coordinación + QA | Reporte de cobertura e incidencias |
| Derechos, autoría, permisos de Git e instalador | Contenidos + derechos | Registro verificable y bloqueos |

Cambios de contrato mediante PR y versión; nunca asumir que el otro equipo ha actualizado su consumidor. Prohibidas las asignaciones `hardcoded` en componentes de React. Mantener ramas independientes y no fusionar a `main` sin el flujo de aprobación acordado.

## 9. Casos de prueba de aceptación

1. Pregunta con imagen propia correcta y distinta de la escena de fondo.
2. Dos preguntas que reutilizan la misma escena sin duplicar archivo.
3. Imagen de revelación que **no** aparece antes de responder.
4. Pregunta `hotspot`: imagen y coordenadas de la **misma perspectiva**; alternativa por teclado.
5. Imagen común a pregunta e Historia, con políticas narrativas diferenciadas.
6. Referencia a medio inexistente ⇒ error de contrato.
7. Medio sin derechos suficientes ⇒ bloqueado antes de publicación.
8. Fallback inadecuado o revelador ⇒ rechazado; no selección automática.
9. Recurso auxiliar opcional ausente ⇒ flujo accesible sin pantalla vacía.
10. Inventario con fichero sin destino ⇒ incidencia visible; nunca silencio.
11. Actualización de catálogo/asset preserva IDs, notas y progreso.
12. Instalación y reproducción completa del episodio sin internet, con reducción de movimiento.
13. Múltiples derivados de una imagen cuentan como **un** recurso editorial.
14. Recreación, acuarela y fotografía actual aparecen con rótulo/atribución adecuado.

## 10. Entregables y control de avance

**Fase 0 — autorizado:** (A) inventario contrastado con commit exacto; (B) informe de imágenes con y sin destino; (C) propuesta de extensión mínima de JSON Schema; (D) matriz `imagen → episodio/escena/pregunta/fase`; (E) tests de contrato especificados; (F) aprobación editorial y técnica registrada.

**Fase 1 — solo tras autorización:** implementar resolvedor y validador, integrar un episodio representativo con varios tipos de pregunta y perspectivas; probar coherencia, spoilers, accesibilidad, derechos y offline antes de escalar.

**Decisión de publicación:** **DC-IMG-001 aprobada**; **ADR-IMAGES-001 y cambios de esquema pendientes** de validación conjunta. Este documento no certifica auditoría reciente de todos los bytes ni verificación de todas las asignaciones existentes.
