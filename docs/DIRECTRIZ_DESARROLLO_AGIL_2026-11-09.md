# Directriz operativa vigente — desarrollo ágil y finalización efectiva
**Aprobada por el propietario: 2026-11-09. Aplica a todo el proyecto El_Quijote_App.**
**Lectura obligatoria al iniciar cada encargo junto con `/AGENTS.md`.**
**Prevalece sobre las reglas históricas incompatibles de ramas, PR, validación y aprobación, sin anular seguridad, derechos, requisitos funcionales ni límites de fase.**

## 1. Misión y criterio de éxito
Actúa con el criterio y autonomía de un ingeniero sénior. Maximiza progreso real, calidad profesional y entrega efectiva. No confundas calidad con perfección infinita ni cantidad de comprobaciones con rigor. Evita burocracia, sobreingeniería, revisiones redundantes y refactorizaciones ajenas al encargo. Una solución correcta, segura y terminada vale más que una perfección hipotética que retrasa el producto.

## 2. Documentación: consultar la vigente y descartar lo desplazado
Antes de responder operativamente o modificar algo, consulta `AGENTS.md`, esta directriz y **solo los documentos pertinentes a la tarea**. Revisa el estado real de `origin/main` y el registro de decisiones. No recorras todo el proyecto en cada solicitud si ya tienes información suficiente.
Orden de interpretación, respetando instrucciones superiores, seguridad y permisos: (1) instrucción explícita más reciente del propietario; (2) decisiones aprobadas vigentes en `docs/VISION_Y_DECISIONES.md`; (3) esta política y la documentación técnica vigente; (4) código y recursos reales; (5) documentación histórica, como contexto. Una instrucción posterior sustituye a la anterior **solo en lo que sea incompatible**; la antigüedad por sí sola no invalida un documento.
No reabras decisiones cerradas ni repitas auditorías ya resueltas sin evidencia nueva. Diferencia trabajo realizado, planificado y pendiente. En el Quijote siguen vigentes DC-18 (solo Fase 1 autorizada), DC-23–DC-28, TS-001, derechos y seguridad.

## 2 bis. Conformidad documental previa y obligatoria (DC-32, 2026-11-09)

**Ningún contenido, respuesta operativa, prompt, imagen, funcionalidad, interfaz, archivo, cambio ni entrega de la aplicación se preparará, aceptará ni integrará contraviniendo las normas oficiales vigentes publicadas en el repositorio GitHub.** Antes de actuar se identifica el estado de `main`, se revisan `AGENTS.md`, `docs/VISION_Y_DECISIONES.md`, esta directriz y **la documentación pertinente al área concreta**. Se comprueban los requisitos aplicables y su compatibilidad con las decisiones aprobadas; no vale asumir conformidad por haber visto un ejemplo anterior.

**Todas las imágenes** (reutilizadas, encargadas, generadas, derivadas o integradas) y sus **prompts** deberán ajustarse a la dirección artística y normativa visual oficiales: `docs/DIRECCION_ARTISTICA.md`, `docs/DIRECCION_ARTISTICA_PILOTO.md`, `docs/DECISIONES_OPERATIVAS_Y_POLITICA_VISUAL_2026-11-08.md`, `docs/DICTAMEN_COMPOSICION_TEXTO_IMAGEN_2026-11-08.md` y el flujo por capítulos, además de reglas de derechos, manifiestos y fidelidad literaria DC-31. Aplicar a cada categoría lo que corresponda: preimágenes propias sin spoilers; continuidad de personajes y época; zona segura y composición imagen/texto; acuarelas/obras completas sin recorte; identificación del origen, derechos, metadatos y autorización del propietario para nuevas imágenes. No inventar detalles textuales ni reemplazar un recurso inapropiado por otro no validado.

**Puerta de cumplimiento:** (a) comprobar reglas aplicables; (b) preparar solo entregables compatibles; (c) verificar fidelidad, visuales, enlaces, licencias, funcionalidad y pruebas proporcionales; (d) publicar/integrar solo cuando proceda. Si falta un requisito, existe un conflicto material o no se puede verificar un aspecto indispensable, **detener únicamente el entregable afectado**, describir el incumplimiento con la ruta/sección y proponer subsanación; no afirmar que está aprobado o terminado. Una excepción exige autorización **expresa y registrada en GitHub** del propietario. Resolver contradicciones por precedencia de decisiones vigentes, sin tratar instrucciones históricas desplazadas como requisitos activos ni reabrir decisiones aprobadas.

## 3. Autonomía sin bloqueos artificiales
Ejecuta decisiones técnicas ordinarias dentro del alcance sin solicitar confirmación: organización interna, nombres, pequeños arreglos, pruebas de riesgo proporcionado, optimización y clasificación de recursos. Pide aclaración solo por ambigüedad material, decisiones funcionales del propietario, permisos, seguridad, riesgo de pérdida de datos o acciones irreversibles. En decisiones menores, reversibles y de bajo riesgo, elige la alternativa razonable y avanza.

## 4. Git: `main` por defecto, ramas por riesgo
`JavierRB35/El_Quijote_App`, rama `main`, es fuente de verdad y destino final. Antes de escribir, verifica su HEAD remoto; sincroniza el trabajo y evita pisar cambios concurrentes.
**Se elimina la obligación general de usar rama y PR por estar en Fase 1.** Trabaja directamente sobre `main` si el repositorio lo permite para:
- documentación, metadatos, manifiestos, imágenes, audio o recursos permitidos sin cambio funcional de código;
- ajustes visuales menores, pequeñas correcciones de código y cambios localizados, reversibles y de bajo riesgo;
- reorganización de archivos y nombres con referencias comprobadas.
Crea rama y PR **solo si aporta una protección real**: cambios grandes o de arquitectura, migraciones, seguridad, datos sensibles, cambios incompatibles, incertidumbre relevante, trabajo concurrente o regla de protección obligatoria. No crees ramas ni PR por hábito. Si usas una rama, mantenla corta y fusiónala pronto.
No hagas force-push ni reescribas `main`; respeta protección y permisos. Un commit por intención coherente, mensaje claro y verificación de integración; reporta SHA inicial/final. El trabajo solo local no cuenta como entregado.

## 5. Verificación proporcional y sin repeticiones
Cada comprobación debe cubrir un riesgo concreto:
- **Solo documentos/activos:** integridad, duplicados pertinentes, formato/dimensiones, rutas, hashes, manifiestos, referencias, derechos y riesgo de spoilers. No ejecutes toda la batería de código por cambios exclusivamente artísticos.
- **Código menor:** compilación o pruebas focalizadas según corresponda y verificación del comportamiento modificado.
- **Código importante:** pruebas de integración, regresiones relevantes, seguridad y suites globales cuando el impacto o controles obligatorios lo requieran.
No repitas pruebas que ya pasaron sobre el mismo estado sin nueva razón. Respeta siempre los checks de CI obligatorios y reconoce un fallo real; «ágil» nunca significa omitir controles críticos ni declarar PASS sin ejecutarlos.

## 6. Límite a los bucles de IA
Analiza una vez, implementa, verifica y corrige defectos concretos. No repitas exactamente un diagnóstico fallido sin información nueva. Tras dos intentos fallidos sobre el mismo problema, cambia de hipótesis o método y delimita el bloqueo. Mientras sea seguro, avanza en trabajo independiente. No eternices la tarea con autoevaluaciones, mejoras marginales, más alternativas o pruebas equivalentes. Este límite no permite dejar deliberadamente errores críticos conocidos.

## 7. Definición de terminado
Cierra una tarea cuando satisface el encargo, funciona en los escenarios relevantes, no tiene fallos críticos conocidos, respeta decisiones y convenciones, supera la validación proporcional/obligatoria y está integrada en el destino acordado. Una mejora opcional no impide cerrar lo esencial. Distingue **obligatorio** (requisitos, seguridad, integridad, regresiones relevantes), **deseable** (beneficio claro) y **opcional** (retoques marginales). No arrastres lo opcional como bloqueo.

## 8. Mínima complejidad suficiente
Reutiliza lo existente; evita dependencias, abstracciones, herramientas, roles, documentos o capas nuevas sin justificación concreta. No refactorices áreas no afectadas. No multipliques tickets, planes y revisiones para una tarea pequeña. Mantén compatibilidad y claridad.

## 9. Continuidad real
Al retomar: identifica último estado válido, recursos existentes, pendientes y decisiones cerradas. No reinicies el trabajo por cambiar de conversación o agente. Antes de encargar imágenes, revisa inventario para evitar repeticiones y conserva trazabilidad por capítulo, identificador, uso pre/post y manifiesto. Mantén documentación decisional concisa y actualizada, sin duplicar informes.

## 10. Ejecución de principio a fin
Flujo por defecto: **analiza → implementa → verifica → integra → cierra**. No introduzcas autorizaciones intermedias artificiales. Completa lo solicitado, incluido commit e integración autorizados. No declares completado un plan ni una subida fallida. Si falta autoridad o aparece un bloqueo externo, detente en esa operación, explica exactamente el obstáculo y progresa con lo independiente.

## 11. Comunicación útil
Durante el trabajo, comunica avances materiales y bloqueos reales, no narración continua de acciones triviales. Al terminar: (1) realizado; (2) verificado y resultado; (3) destino y SHA; (4) pendiente real. No atribuyas revisiones o firmas a agentes/personas inexistentes.

## 12. Regla antiperfeccionismo
Antes de otra iteración: ¿hay un defecto demostrable?, ¿falta un requisito?, ¿mejora de forma apreciable?, ¿justifica coste y riesgo? Si cumple el encargo y no hay defectos relevantes, **detente y entrega**. No persigas un ideal abstracto de perfección.

## 13. Prioridad de trabajo
1. Seguridad, integridad y fallos críticos.
2. Funcionalidades esenciales del alcance autorizado.
3. Estabilidad, accesibilidad y usabilidad.
4. Integración y entrega de trabajo terminado.
5. Rendimiento probado como necesario.
6. Mejoras secundarias.
7. Pulidos marginales.

**Regla final: calidad profesional + máxima agilidad + mínima burocracia + finalización efectiva.** Esta política cambia el *proceso*, no concede por sí sola autorización para Fase 2, publicación comercial, uso de terceros o ampliaciones funcionales.
