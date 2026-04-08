import {
  dirExists,
  ensureDir,
  copyDirRecursive,
  getDirSize,
} from "../utils/file-utils.js";
import path from "path";
import fs from "fs";

export class BackupManager {
  /**
   * Genera un timestamp
   */
  private generateTimestamp(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");

    return (
      now.getFullYear().toString() +
      pad(now.getMonth()) +
      pad(now.getDate()) +
      "_" +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds())
    );
  }

  /**
   * Crea una copia de seguridad de un directorio.
   *
   * @param sourceDir - Directorio origen.
   * @param backupRoot - Directorio donde guardar la copia.
   * @returns Ruta de la copia creada.
   */
  createBackup(sourceDir: string, backupRoot: string): string {
    if (!dirExists(sourceDir)) {
      throw new Error("Source directory does not exist");
    }

    ensureDir(backupRoot);

    const name = path.basename(sourceDir);
    const timestamp = this.generateTimestamp();
    const backupDir = path.join(backupRoot, `${name}_${timestamp}`);

    copyDirRecursive(sourceDir, backupDir);

    return backupDir;
  }

  /**
   * Lista las copias de seguridad existentes.
   *
   * @param backupRoot - Directorio donde están las copias.
   */
  listBackups(
    backupRoot: string,
  ): { name: string; size: number; created: Date }[] {
    if (!dirExists(backupRoot)) {
      throw new Error("Backup directory does not exist");
    }

    const entries = fs.readdirSync(backupRoot);

    const backups: { name: string; size: number; created: Date }[] = [];

    for (const entry of entries) {
      const full = path.join(backupRoot, entry);
      if (dirExists(full)) {
        const stats = fs.statSync(full);
        backups.push({
          name: entry,
          size: getDirSize(full),
          created: stats.birthtime,
        });
      }
    }

    backups.sort((a, b) => b.created.getTime() - a.created.getTime());
    return backups;
  }

  /**
   * Restaura una copia de seguridad.
   *
   * @param backupDir - Directorio de la copia.
   * @param restoreDir - Directorio donde restaurar.
   * @returns Número de ficheros restaurados.
   */
  restoreBackup(backupDir: string, restoreDir: string): number {
    if (!dirExists(backupDir)) {
      throw new Error("Backup does not exist");
    }

    ensureDir(restoreDir);

    return copyDirRecursive(backupDir, restoreDir);
  }
}
