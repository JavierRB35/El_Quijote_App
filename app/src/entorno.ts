// Puerta única a los servicios nativos (catálogo y assets). Bajo Tauri usa los
// comandos del backend (FASE 1, ADR-0002). En `vite dev` sin Tauri, el
// middleware de desarrollo de vite.config.ts sirve el MISMO paquete real de
// content/piloto — solo para pruebas de UI y capturas; producción y el paquete
// empacado no cambian (ADR-0002).
import { invoke } from '@tauri-apps/api/core';
import { Catalogo } from './contrato';

const ES_TAURI = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

/** Carga el paquete canónico completo, indexado por categoría e ID. */
export async function cargarCatalogo(): Promise<Catalogo> {
  if (ES_TAURI) {
    return new Catalogo((await invoke<unknown>('cargar_paquete')) as never);
  }
  const respuesta = await fetch('/__dev/paquete');
  if (!respuesta.ok) throw new Error(`paquete no disponible en modo dev (${respuesta.status})`);
  return new Catalogo((await respuesta.json()) as never);
}

/** Resuelve una URI lógica (assets://… / content://…) a una URL usable en <img>. */
export async function leerAsset(uri: string): Promise<string> {
  if (ES_TAURI) return invoke<string>('leer_asset', { uri });
  const respuesta = await fetch(`/__dev/asset?uri=${encodeURIComponent(uri)}`);
  if (!respuesta.ok) throw new Error(`asset no disponible (${uri}): ${respuesta.status}`);
  return URL.createObjectURL(await respuesta.blob());
}
