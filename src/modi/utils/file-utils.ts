import fs from "fs";
import path from "path";

/**
 * Comprueba si un fichero existe.
 *
 * @param filePath - Ruta del fichero.
 * @param callback - Callback que recibe (exists: boolean).
 */
export function fileExists(
  filePath: string,
  callback: (exists: boolean) => void
): void {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    callback(!err);
  });
}

/**
 * Asegura que un directorio existe, creándolo si es necesario.
 *
 * @param dir - Ruta del directorio.
 * @param callback - Callback sin argumentos.
 */
export function ensureDir(dir: string, callback: () => void): void {
  fs.mkdir(dir, { recursive: true }, () => callback());
}

/**
 * Lee un fichero de texto de forma segura.
 *
 * @param filePath - Ruta del fichero.
 * @param callback - Callback con (err, data).
 */
export function safeReadFile(
  filePath: string,
  callback: (err: NodeJS.ErrnoException | null, data?: string) => void
): void {
  fs.readFile(filePath, "utf-8", callback);
}

/**
 * Escribe un fichero de texto de forma segura.
 *
 * @param filePath - Ruta del fichero.
 * @param content - Contenido a escribir.
 * @param callback - Callback con (err).
 */
export function safeWriteFile(
  filePath: string,
  content: string,
  callback: (err: NodeJS.ErrnoException | null) => void
): void {
  ensureDir(path.dirname(filePath), () => {
    fs.writeFile(filePath, content, callback);
  });
}
