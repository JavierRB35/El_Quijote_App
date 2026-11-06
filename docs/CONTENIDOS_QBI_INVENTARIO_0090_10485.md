# QBI — Inventario documental inicial y necesidades de assets

**Fecha de consulta:** 2026-11-06  
**Modo:** CONTENIDOS (curaduría iconográfica, geografía histórico-literaria y derechos).  
**Estado:** investigación inicial; **ningún binario QBI autorizado para repositorio**.  
**Alcance:** https://www.cervantesvirtual.com/portales/quijote_banco_imagenes_qbi/ ; consulta `imagenes/?episodio=0090`; ficha `ficha_imagen/?id=10485`.

## 1. Inspección del repositorio

El árbol de `main` ya incluye `assets/scenes/part_1/`, `assets/scenes/part_2/`, `assets/ilustraciones_tusell/`, `assets/maps/.gitkeep` y `assets/historical_art/.gitkeep`. Por tanto, **no** se debe descargar un grabado por el mero hecho de existir en el catálogo. Priorizar piezas históricas para el atlas y museo, no duplicados de escenas cinematográficas ni ilustraciones de la edición propia.

Contratos de referencia: `docs/ENCARGO_MAESTRO.md` §§4.5–4.7 y 6.2; `docs/CONTRATO_EDITORIAL_TECNICO.md` v0.2.0; `docs/GOBERNANZA_GIT.md`; `docs/DERECHOS_Y_PROCEDENCIA.md`. Para nuevos MediaAsset se exige el patrón `DQ.MA.######` y Source/License `DQ.SRC.####` / `DQ.LIC.####`, pero **no se reservan números** sin comprobar los existentes.

## 2. Ficha verificada

| Campo | Evidencia / valoración |
|---|---|
| ID externo | QBI 10485 |
| Permalink | https://www.cervantesvirtual.com/portales/quijote_banco_imagenes_qbi/ficha_imagen/?id=10485 |
| Título de ficha | Mapa |
| Título original | *Carta geografica de los viajes de Don Quijote y sitios de sus aventuras* |
| Edición catalogada | Barcelona, Tomás Gorchs, 1859, *El ingenioso hidalgo don Quijote de la Mancha* |
| Dibujante catalogado | Antonio Rodríguez (1765–1823) |
| Tipo | Grabado / mapa |
| Inscripción recogida | «Delineada por D. Manuel Antº. Rodrig[uez] segun las observaciones historicas de D. Juan Antº. Pellicer, Bibliotecº. de S.M.» |
| Episodio QBI | Mapa de las aventuras de Don Quijote (referencia de filtro `episodio=0090`) |
| Uso editorial previsto | Atlas: capa o lámina histórica consultable; museo: pieza cartográfica contextualizada |
| Contexto interpretativo | Itinerario propuesto por la tradición editorial: **no** demostración de desplazamientos reales ni geometría fiable para navegación |
| Imagen previa a preguntas | **No usar** como escena de aventura; podría anticipar localizaciones y recorridos |
| Formato/medidas/hash | **Sin comprobar**: todavía no hay archivo validado |
| Ruta binaria propuesta (solo tras permiso) | `assets/maps/historical/qbi_10485_original.*` y derivado optimizado, sujetos a contrato y validación técnica |
| Estado derechos del archivo QBI | **No autorizado para Git remoto** sin licencia/permiso específico |
| Estado de revisión | Documentado parcialmente; derechos y archivo pendientes |

Fuentes: ficha individual QBI (URL anterior), portal QBI (https://www.cervantesvirtual.com/portales/quijote_banco_imagenes_qbi/) y marco legal (https://www.cervantesvirtual.com/marco-legal/).

## 3. Restricción de derechos

En su **marco legal**, la Biblioteca Virtual Miguel de Cervantes (§5, *Uso personal*) permite visualizar, imprimir, copiar o guardar contenidos **para fines personales y privados**, sin finalidad comercial, de distribución ni difusión en línea, y señala que ese uso no equivale a licencia general. Otros usos requieren autorización expresa y escrita. Además, el portal QBI declara «Todos los derechos están reservados». La antigüedad del grabado y el probable dominio público del dibujo histórico **no otorgan automáticamente permiso sobre la digitalización descargada del portal ni su subida al Git remoto**.

**Resultado:** registrar enlace y metadatos ahora; solicitar permiso de alojamiento en GitHub o localizar una digitalización alternativa con licencia explícita verificable. No incorporar el fichero binario del QBI a Git hasta documentar esa evidencia. Una descarga privada local, si se realiza conforme al marco legal, no se debe confundir con un asset redistribuible.

## 4. Consulta por episodio 0090

La URL filtrada `https://www.cervantesvirtual.com/portales/quijote_banco_imagenes_qbi/imagenes/?episodio=0090` está identificada a través del vínculo de episodio de la ficha 10485. **El listado filtrado no pudo recuperarse de forma verificable con la consulta utilizada**; por ello no se afirma cuántas imágenes contiene, ni se inventan fichas o descargas. Próxima revisión: obtener el listado navegable y cotejar individualmente cada ficha antes de considerarla candidata.

## 5. Matriz de necesidades de la aplicación

| Módulo | Necesidad | Situación y prioridad |
|---|---|---|
| Atlas | Facsímil/mapa histórico de itinerarios interpretativos | QBI 10485 documentado. **P1**, derechos pendientes. Incluir aviso de naturaleza hipotética |
| Museo | Ficha del mapa: edición, dibujante, cartografía e historia de recepción | **P1**, ficha editorial por redactar, enlace externo utilizable |
| Lector | Ilustraciones ancladas a pasajes y capítulos | **P2**, revisar vínculos con material Tusell existente antes de añadir más |
| Aventura 2.5D | Escena visual previa y posterior a la pregunta | **No usar QBI 10485 como fondo**; se conservan escenas cinematográficas existentes |
| Cuaderno | Descubrimiento cartográfico y comparación de rutas | **P2**, referenciar mapa con atribución, fuente y nivel de certeza |
| Accesibilidad | Texto alternativo, zoom, contraste y transcripción de inscripciones | **P1**, redactar al disponer de copia inspeccionable |

## 6. Requisitos para habilitar la descarga y publicación

1. Identificar **archivo exacto**, responsable de digitalización, entidad depositaria, resolución, formato y URL permanente.
2. Verificar condiciones **individuales** o autorización expresa de alojamiento en GitHub y de empaquetado de la aplicación offline; guardar evidencia documental.
3. Comparar con `assets/maps`, `assets/historical_art`, `assets/ilustraciones_tusell` y sus manifiestos para evitar duplicados conceptuales.
4. Acordar con Desarrollo los IDs existentes, la ubicación, los campos del contrato `MediaAsset` y las reglas de escala/miniaturas antes de añadir nuevos registros de producción.
5. Registrar SHA-256 del original y de cada derivado **una vez efectivamente obtenidos**, dimensiones reales, atribución, créditos, alt, función, política de spoilers y estado de aprobación.
6. Validar la importación y la referencia del consumidor técnico; no marcar el asset como publicable antes de pasar controles y revisión de derechos.

## 7. Resultado del lote

- Nuevos binarios descargados/commiteados: **0** (ausencia de autorización de alojamiento).
- Fichas QBI documentadas individualmente: **1** (id 10485).
- Listado `episodio=0090`: **pendiente de recuperación completa**.
- Cambios al contrato/esquemas: **0**.
- Este documento es investigación trazable, **no** aprobación de derechos ni alta funcional de un MediaAsset.

**Siguiente hito:** resolver permisos o encontrar un facsímil autorizado; completar el listado del episodio y cruzarlo con necesidades reales del atlas/museo y con los IDs del catálogo.