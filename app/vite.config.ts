import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-expect-error type error without @types/node package
import process from "node:process";
// @ts-expect-error type error without @types/node package
import fs from "node:fs";
// @ts-expect-error type error without @types/node package
import path from "node:path";
// @ts-expect-error type error without @types/node package
import { fileURLToPath } from "node:url";

const host = process.env.TAURI_DEV_HOST;

// Raíz del repositorio (app/ está un nivel por debajo).
const RAIZ_REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR_PAQUETE = path.join(RAIZ_REPO, "content", "piloto");

const MIME_POR_EXTENSION: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
};

// SOLO desarrollo (`vite dev` sin Tauri): sirve el paquete real del repositorio
// y sus assets para probar la UI y obtener capturas sin backend Rust.
// Espeja la indexación de cargar_paquete (lib.rs): mismo JSON, misma forma.
function middlewarePaqueteDev() {
  return {
    name: "paquete-dev",
    configureServer(servidor: {
      middlewares: { use: (ruta: string, fn: unknown) => void };
    }) {
      servidor.middlewares.use(
        "/__dev/paquete",
        (
          _req: unknown,
          res: { setHeader: (k: string, v: string) => void; end: (b: string) => void },
        ) => {
          try {
            const manifest = JSON.parse(
              fs.readFileSync(path.join(DIR_PAQUETE, "package.json"), "utf-8"),
            );
            const categorias: Record<string, Record<string, unknown>> = {};
            for (const [categoria, rutas] of Object.entries(
              manifest.files as Record<string, string[]>,
            )) {
              for (const ruta of rutas) {
                const registro = JSON.parse(fs.readFileSync(path.join(DIR_PAQUETE, ruta), "utf-8"));
                (categorias[categoria] ??= {})[registro.id as string] = registro;
              }
            }
            const counts = Object.fromEntries(
              Object.entries(categorias).map(([k, v]) => [k, Object.keys(v).length]),
            );
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(
              JSON.stringify({
                package_id: manifest.package_id,
                contract_version: manifest.contract_version,
                catalog_version: manifest.catalog_version,
                categorias,
                counts,
              }),
            );
          } catch (e) {
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end(`error sirviendo el paquete: ${String(e)}`);
          }
        },
      );
      servidor.middlewares.use(
        "/__dev/asset",
        (
          req: { url?: string },
          res: { setHeader: (k: string, v: string) => void; end: (b: Buffer) => void; statusCode: number },
        ) => {
          const consulta = (req.url ?? "").split("?")[1] ?? "";
          const uri = decodeURIComponent(new URLSearchParams(consulta).get("uri") ?? "");
          const esquema = uri.startsWith("assets://")
            ? "assets"
            : uri.startsWith("content://")
              ? "content"
              : null;
          const relativa = esquema ? uri.slice(esquema.length + 3) : null;
          if (!esquema || !relativa || relativa.includes("..") || relativa.length === 0) {
            res.statusCode = 400;
            res.end(Buffer.from("URI fuera de ámbito"));
            return;
          }
          const fichero = path.join(RAIZ_REPO, esquema, relativa);
          try {
            const bytes = fs.readFileSync(fichero);
            res.setHeader(
              "Content-Type",
              MIME_POR_EXTENSION[path.extname(fichero).toLowerCase()] ?? "application/octet-stream",
            );
            res.end(bytes);
          } catch {
            res.statusCode = 404;
            res.end(Buffer.from("asset no disponible"));
          }
        },
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react(), middlewarePaqueteDev()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    // El Museo importa dinámicamente el manifiesto de ilustraciones, que
    // vive fuera de app/ (assets/ilustraciones_tusell/): permitir servirlo
    // desde la raíz del repositorio en desarrollo.
    fs: {
      allow: [RAIZ_REPO],
    },
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
