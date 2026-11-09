# Protocolo oficial — aceptación del propietario, catalogación e integración de imágenes

**Estado:** VIGENTE · **Aprobación expresa:** propietario, 2026-11-09 · **Decisión:** DC-35.  
**Autoridad/destino:** [JavierRB35/El_Quijote_App](https://github.com/JavierRB35/El_Quijote_App), `main`.  
**Precedencia:** decisiones vigentes de `docs/VISION_Y_DECISIONES.md`, `AGENTS.md`, directriz ágil y políticas artísticas, de derechos y QA. No sustituye DC-24–DC-34 ni autoriza fase/publicación nuevas.  
**Precedente real:** [commit a8ff07e (cinco escenas del capítulo I)](https://github.com/JavierRB35/El_Quijote_App/commit/a8ff07e2790629a83e0ff69d58b54e27587bbe59).

## 1. Disparadores y mandato para todos los técnicos y agentes

Cuando el propietario diga **«revisadas y validadas. cataloga e incorpora a main»**, **«sigue el protocolo de aceptación de imágenes»**, **«aplica el protocolo de imágenes aprobadas»** o una expresión inequívoca equivalente sobre **un conjunto concreto e identificable**, se entiende que **aprueba visualmente ese conjunto y autoriza catalogarlo e incorporarlo a `main`**. **Ejecutar el protocolo completo en la misma intervención**, sin pedir otra vez la misma aprobación y sin limitarse a entregar instrucciones o una propuesta.

El alcance es **solo esos archivos**. No se deben regenerar/retocar imágenes, incorporar otras sin validación, sobrescribir recursos, activar rondas, historias, interfaz o publicar el videojuego por iniciativa propia. Una aprobación visual no acredita automáticamente fidelidad, licencias, compatibilidad DC-28/TS-001 ni QA técnico. Si hay prohibición material, identificaciones ausentes o carencia real de permisos, detener solo el entregable afectado e informar. No simular operaciones.

**Fin exigido:** binarios auténticos autorizados, catálogo y metadatos actualizados, commit incorporado y verificado en `main` y comunicación de hashes/pruebas. Blobs, Drive temporal, archivo local o commit aún no referenciado no cuentan como entrega (DC-33).

## 2. Preparación y controles previos

1. Consultar HEAD actual remoto de `main`. Leer `AGENTS.md`, `docs/DIRECTRIZ_DESARROLLO_AGIL_2026-11-09.md`, `docs/VISION_Y_DECISIONES.md`, apartados pertinentes de `docs/ENCARGO_MAESTRO.md` y fuentes aplicables de dirección artística, política visual, DC-28, flujo DC-30, DC-31, DC-32, DC-33, derechos, Git y QA. No basarse en copias históricas.
2. Identificar exactamente los originales aprobados: archivo/bytes, nombre, escena, fase `pre`/`post`, ronda/beat, formato/dimensiones, uso Aventura/Historia, alt, spoilers y zonas seguras. No generar variantes.
3. Inventariar recursos/IDs/rutas existentes de `assets/scenes/` y `assets/closeups/` para no duplicar o sobrescribir sin autorización. Confirmar que el WebP optimizado puede alojarse en Git normal de acuerdo con `.gitignore`, `docs/GOBERNANZA_GIT.md` y licencias; **no subir** PNG maestros pesados, EPUB, obras restringidas, secretos o datos privados.
4. Comprobar bytes reales, tamaño, MIME, dimensiones y archivo legible. Calcular **SHA-256 del original** para el manifiesto y **SHA de objeto Git** para comprobar el traslado: el segundo es SHA-1 sobre `"blob " + tamaño_decimal + "\0" + bytes_originales`, no es el SHA-256.
5. Para imágenes narrativas, verificar capítulo/ancla en `content/textos/gutenberg_2000/El_Quijote.txt` (`DQ.ED.0003` / `DQ.SRC.0005`) y diferenciar lo descrito por Cervantes de recreaciones artísticas plausibles.

## 3. Técnica exacta y comprobada para binarios con conectores

**Caso:** conector GitHub sin carga directa de archivos WebP adjuntos de ChatGPT. **Solución ya probada:** `file_uri original → Google Drive privado temporal → Base64 íntegro → create_blob GitHub → verificar SHA Git → eliminar temporal → árbol/commit`.

Drive actúa **solo como transporte efímero y privado**, no como fuente de verdad ni destino definitivo. Utilizar conexiones autorizadas; no compartir URL públicamente.

### A — Subir el WebP original a Drive temporal

~~~text
mcp__Google_Drive__upload_file({
  file_uri: <referencia real del archivo aprobado>,
  file_name: "tmp_quijote_<nombre_original>.webp",
  mime_type: "image/webp"
})
~~~

Exigir `result.success === true`; conservar la URL `result.url` efectivamente recibida.

### B — Recuperar Base64 completo

~~~text
mcp__Google_Drive__fetch({
  url: <result.url del temporal>,
  download_raw_file: true,
  include_base64: true
})
~~~

Obtener **`result.b64_string` íntegro**, no un resumen, texto extraído, URL o contenido truncado. Comprobar tamaño.

### C — Crear el blob binario en GitHub

~~~text
mcp__GitHub__create_blob({
  repository_full_name: "JavierRB35/El_Quijote_App",
  content: <result.b64_string íntegro>,
  encoding: "base64"
})
~~~

**Puerta de integridad:** `result.sha` debe coincidir exactamente con el SHA de **objeto Git del WebP original** calculado antes. Si no, detener el recurso y diagnosticar. `create_blob` NO crea aún un archivo en `main`.

### D — Borrar inmediatamente el temporal

~~~text
mcp__Google_Drive__delete_file({
  url: <URL real del temporal>
})
~~~

Comprobar `result.success === true`. Ejecutar también ante error en B/C (equivalente a `finally`). Comunicar una limpieza fallida sin declararla realizada.

### E — Repetir y preservar trazabilidad

Para cada archivo conservar **nombre original → ruta final → SHA-256 → Git blob SHA → ID de catálogo**. Reutilizar blobs ya verificables en reintentos; no retransmitir innecesariamente. Si la conexión permite subir los mismos bytes directamente de manera más segura/simple, usarla con controles equivalentes. Si falta un conector, no inventar interfaces ni recurrir a transferencias públicas no autorizadas.

## 4. Catalogar el recurso sin alterar otros

1. Utilizar la carpeta por parte/capítulo (`assets/scenes/part_1/chapter_01/<nombre>.webp`) o `assets/closeups/` según tipo de activo. Respetar los manifiestos/README y esquemas **vigentes**.
2. Asignar IDs no usados según el catálogo. `DQ.MED.900254`–`DQ.MED.900258` pertenecen al precedente y **ya están ocupados**. No inventar registros canónicos `DQ.MA.*`: el `candidate_media_id` del piloto no los equivale.
3. Registrar identificación, ruta, capítulo, pasaje, ronda/beat, `pre`/`post`, riesgo de spoiler, reutilización Aventura/Historia, tamaño, dimensiones, MIME, SHA-256, `recreacion_ia`, generación/atribución, fuente, derechos, alt y revisión.
4. Reflejar **aprobación visual específica del propietario** con valores válidos del esquema. En 2026-11-09 se usaron `review_state: "aprobada"` y `historical_editorial_status: "approved_owner_visual"` con QA en pantalla **todavía pendiente**. Son un precedente, no valores inmutables si cambia el esquema. No aprobar arbitrariamente el resto del catálogo.
5. Mantener preimagen antiespoiler y consecuencia posterior solo tras revelación. Reutilizar entre modos cuando sea legítimo. **No modificar código, JSON de rondas, guiones o activación** salvo orden expresa adicional.

## 5. Commit único con GitHub Git Data API y protección contra concurrencia

Una vez **todos** los blobs binarios verificados:

1. Obtener `GET /repos/JavierRB35/El_Quijote_App/branches/main`; registrar HEAD SHA y `commit.commit.tree.sha`.
2. Crear blobs de texto para `manifest.json` y `README.md` con `mcp__GitHub__create_blob({repository_full_name,content,encoding:"utf-8"})`. Validar sintaxis JSON, IDs, rutas y referencias únicas.
3. `mcp__GitHub__create_tree` con `base_tree_sha` del árbol actual y `tree_elements` de **TODOS** los WebP y textos afectados. Cada elemento: `{path, mode:"100644", type:"blob", sha:<blob_real>}`.
4. `mcp__GitHub__create_commit` con `tree_sha` nuevo, `parent_sha` = HEAD leído y mensaje descriptivo. **Crear commit no significa integrarlo**.
5. Leer el commit y árbol recién creados: comprobar padre, rutas, blobs exactos, manifiesto, duplicados y ausencia de cambios ajenos.
6. **Volver a consultar el HEAD remoto**. Si sigue igual al padre, ejecutar:

~~~text
mcp__GitHub__update_ref({
  repository_full_name: "JavierRB35/El_Quijote_App",
  branch_name: "main",
  sha: <SHA del nuevo commit>,
  expected_sha: <HEAD padre verificado>,
  force: false
})
~~~

**Prohibidos `force:true`, force-push y reescribir `main`.** Si HEAD ha cambiado, inspeccionar diferencias y rehacer árbol/commit sobre el nuevo HEAD, reutilizando blobs verificados. Si la protección del repositorio impide integración directa, seguir rama/PR según DC-29, sin saltarse permisos.

## 6. Verificación posterior, CI y cierre

- Leer de nuevo `branches/main` y comprobar `HEAD == commit_sha`. Si no, **NO INTEGRADO**.
- Leer manifiestos y archivos **desde `main`**. Verificar WebP, dimensiones, SHA-256/Git SHA, IDs/rutas únicas, referencias y comparación con commit padre (solo archivos previstos).
- Revisar permisos, procedencia, riesgos `pre`/`post`, alt y pruebas de integración/visualización que realmente correspondan.
- Consultar GitHub Actions. Si el workflow está `in_progress`, informar **CI pendiente**, nunca CI superada. Si falla un control obligatorio, corregir con commit verificable.
- La aprobación de imágenes no activa automáticamente Aventura/Historia, no acredita DC-28/TS-001 en pantalla ni permite publicación.
- Informar **HEAD inicial/final, commit URL, archivos, IDs, catálogo antes/después, hashes y QA realizado, CI y pendientes reales**. Si hay bloqueo, detener solo el recurso afectado, borrar temporales, conservar blobs válidos y no simular finalización.

## 7. Precedente real de aplicación

El 2026-11-09 se incorporaron cinco WebP del capítulo I y dos textos de catálogo en un commit atómico, desde padre `3b46a6a570a1efc7df8dd4fcbe93aa5bde5c2095` hasta **`a8ff07e2790629a83e0ff69d58b54e27587bbe59`**, usando el puente privado Drive → Base64 → GitHub blob, verificación Git SHA, eliminación de todos los temporales, `create_tree`, `create_commit` y `update_ref(force:false)`. El inventario pasó de 252 a 257. `validar-contrato` seguía ejecutándose en la comprobación final; no se afirmó que ya hubiera terminado en verde.

**Mandato permanente:** ante las frases del `1`, aplicar este procedimiento a los archivos identificados **sin reinventar la técnica, sin repetir aprobación y sin relajar requisitos vigentes**.
