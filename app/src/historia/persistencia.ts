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

/** Guardados separados por episodio y modo; el episodio I.8 conserva intacto
 *  su fichero nativo y su formato v2 histórico. Los restantes usan comandos
 *  Tauri con nombre de fichero validado (no rutas proporcionadas por la UI). */
export type ModoProgreso = 'aventura' | 'historia';

export async function guardarProgresoDeEpisodio(modo: ModoProgreso, episodio: string, datos: string): Promise<void> {
  if (episodio === 'DQ.P1.C08.E01') {
    return modo === 'aventura' ? guardarProgreso(datos) : guardarProgresoHistoria(datos);
  }
  if (ES_TAURI) return invoke<void>('guardar_progreso_capitulo', { modo, episodio, datos });
  localStorage.setItem(`quijote.${modo}.${episodio}`, datos);
}

export async function cargarProgresoDeEpisodio(modo: ModoProgreso, episodio: string): Promise<string | null> {
  if (episodio === 'DQ.P1.C08.E01') {
    return modo === 'aventura' ? cargarProgreso() : cargarProgresoHistoria();
  }
  if (ES_TAURI) return invoke<string | null>('cargar_progreso_capitulo', { modo, episodio });
  return localStorage.getItem(`quijote.${modo}.${episodio}`);
}
