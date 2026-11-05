//! Backend del sistema vertical (FASE 1, DC-18).
//!
//! Comandos tipados y acotados (encargo §5.2.1: la UI nunca recibe SQL ni
//! acceso arbitrario a ficheros). En FASE 1-dev el catálogo se lee del
//! repositorio; en producción irá empaquetado como recursos (ADR-0002).

use base64::engine::general_purpose::STANDARD as B64;
use base64::Engine;
use serde_json::{json, Value};
use std::collections::BTreeMap;
use std::io::Read;
use std::path::{Path, PathBuf};
use tauri::Manager;

/// Raíz del repositorio en desarrollo: sube dos niveles desde src-tauri.
fn raiz_repo() -> PathBuf {
    std::env::current_dir()
        .unwrap_or_else(|_| PathBuf::from("."))
        .canonicalize()
        .map(|p| p.ancestors().nth(2).map(Path::to_path_buf).unwrap_or(p))
        .unwrap_or_else(|_| PathBuf::from(".."))
}

fn leer_json(path: &Path) -> Result<Value, String> {
    let raw = std::fs::read(path).map_err(|e| format!("no se pudo leer {}: {e}", path.display()))?;
    serde_json::from_slice(&raw).map_err(|e| format!("JSON inválido en {}: {e}", path.display()))
}

/// Carga el paquete canónico completo: package.json + todos los ficheros
/// listados en `files`, indexados por categoría e ID.
#[tauri::command]
fn cargar_paquete(raiz: Option<String>) -> Result<Value, String> {
    let raiz = raiz.map(PathBuf::from).unwrap_or_else(raiz_repo);
    let dir_paquete = raiz.join("content/piloto");
    let manifest = leer_json(&dir_paquete.join("package.json"))?;
    let version = manifest
        .get("contract_version")
        .and_then(Value::as_str)
        .ok_or("manifest sin contract_version")?
        .to_string();
    if version != "1.0.0" {
        return Err(format!(
            "contract_version '{version}' no soportada por este consumidor (§6.5.8)"
        ));
    }
    let files = manifest
        .get("files")
        .and_then(Value::as_object)
        .ok_or("manifest sin files")?;

    let mut categorias: BTreeMap<String, BTreeMap<String, Value>> = BTreeMap::new();
    for (categoria, rutas) in files {
        let Some(rutas) = rutas.as_array() else { continue };
        for ruta in rutas {
            let Some(ruta) = ruta.as_str() else { continue };
            let registro = leer_json(&dir_paquete.join(ruta))?;
            let Some(id) = registro.get("id").and_then(Value::as_str) else {
                return Err(format!("registro sin id: {ruta}"));
            };
            categorias
                .entry(categoria.clone())
                .or_default()
                .insert(id.to_string(), registro);
        }
    }
    let counts: BTreeMap<&String, usize> = categorias.iter().map(|(k, v)| (k, v.len())).collect();
    Ok(json!({
        "package_id": manifest.get("package_id"),
        "contract_version": version,
        "catalog_version": manifest.get("catalog_version"),
        "categorias": categorias,
        "counts": counts,
    }))
}

/// Resuelve una URI lógica del contrato (`assets://…` o `content://…`) contra
/// la raíz y devuelve la imagen como data-URL base64. Ámbito restringido a la
/// raíz del repo en dev; en producción será el directorio de recursos firmados.
#[tauri::command]
fn leer_asset(uri: String, raiz: Option<String>) -> Result<String, String> {
    let permitido = uri.starts_with("assets://") || uri.starts_with("content://");
    if !permitido || uri.contains("..") {
        return Err(format!("URI lógica fuera de ámbito: {uri}"));
    }
    let relativa = uri.split("://").nth(1).unwrap_or_default();
    let raiz = raiz.map(PathBuf::from).unwrap_or_else(raiz_repo);
    let path = raiz.join(relativa.replace('/', std::path::MAIN_SEPARATOR_STR));
    let mime = match path.extension().and_then(|e| e.to_str()).unwrap_or("") {
        "webp" => "image/webp",
        "jpg" | "jpeg" => "image/jpeg",
        "png" => "image/png",
        "avif" => "image/avif",
        "gif" => "image/gif",
        "mp3" => "audio/mpeg",
        "ogg" => "audio/ogg",
        _ => "application/octet-stream",
    };
    let mut fichero =
        std::fs::File::open(&path).map_err(|e| format!("asset no disponible ({uri}): {e}"))?;
    let mut bytes = Vec::new();
    fichero.read_to_end(&mut bytes).map_err(|e| e.to_string())?;
    Ok(format!("data:{mime};base64,{}", B64.encode(bytes)))
}

fn ruta_progreso(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let dir = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("sin directorio de datos: {e}"))?;
    std::fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    Ok(dir.join("progreso.json"))
}

/// Autoguardado del progreso de la sesión (EF-AV-08, FASE 1 slice).
#[tauri::command]
fn guardar_progreso(app: tauri::AppHandle, datos: String) -> Result<(), String> {
    let destino = ruta_progreso(&app)?;
    let tmp = destino.with_extension("json.tmp");
    // Sustitución atómica: escribir temporal → validar JSON → renombrar (§2.7).
    std::fs::write(&tmp, datos.as_bytes()).map_err(|e| e.to_string())?;
    serde_json::from_str::<Value>(&datos).map_err(|e| format!("progreso no es JSON válido: {e}"))?;
    std::fs::rename(&tmp, &destino).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn cargar_progreso(app: tauri::AppHandle) -> Result<Option<String>, String> {
    let destino = ruta_progreso(&app)?;
    match std::fs::read_to_string(&destino) {
        Ok(s) => Ok(Some(s)),
        Err(_) => Ok(None),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            cargar_paquete,
            leer_asset,
            guardar_progreso,
            cargar_progreso
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
