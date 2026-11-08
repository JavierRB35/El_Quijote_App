// Persistencia de progreso: bajo Tauri, ficheros atómicos del backend
// (progreso.json para Aventura, progreso_historia.json para Historia —
// siempre separados). Sin Tauri (vite dev para pruebas de UI), espejo en
// localStorage con las mismas claves JSON; producción no cambia (ADR-0002).
import { invoke } from '@tauri-apps/api/core';

const ES_TAURI = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

export async function guardarProgreso(datos: string): Promise<void> {
  if (ES_TAURI) return invoke<void>('guardar_progreso', { datos });
  localStorage.setItem('quijote.progreso', datos);
}

export async function cargarProgreso(): Promise<string | null> {
  if (ES_TAURI) return invoke<string | null>('cargar_progreso');
  return localStorage.getItem('quijote.progreso');
}

export async function guardarProgresoHistoria(datos: string): Promise<void> {
  if (ES_TAURI) return invoke<void>('guardar_progreso_historia', { datos });
  localStorage.setItem('quijote.progreso_historia', datos);
}

export async function cargarProgresoHistoria(): Promise<string | null> {
  if (ES_TAURI) return invoke<string | null>('cargar_progreso_historia');
  return localStorage.getItem('quijote.progreso_historia');
}
