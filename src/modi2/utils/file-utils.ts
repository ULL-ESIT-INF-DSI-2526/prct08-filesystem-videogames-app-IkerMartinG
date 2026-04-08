import fs from "fs";
import path from "path";

/**
 * Comprueba si un directorio existe.
 * @param dir - Ruta del directorio.
 */
export function dirExists(dir: string): boolean {
  return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
}

/**
 * Comprueba si un fichero existe.
 * @param file - Ruta del fichero.
 */
export function fileExists(file: string): boolean {
  return fs.existsSync(file) && fs.statSync(file).isFile();
}

/**
 * Crea un directorio si no existe.
 * @param dir - Ruta del directorio.
 */
export function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Copia un directorio completo de forma recursiva.
 * @param src - Directorio origen.
 * @param dest - Directorio destino.
 */
export function copyDirRecursive(src: string, dest: string): number {
  ensureDir(dest);
  let count = 0;

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      count += copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }

  return count;
}

/**
 * Calcula el tamaño total de un directorio.
 * @param dir - Ruta del directorio.
 */
export function getDirSize(dir: string): number {
  let total = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += getDirSize(full);
    } else {
      total += fs.statSync(full).size;
    }
  }

  return total;
}
