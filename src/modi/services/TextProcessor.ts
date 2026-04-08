import path from "path";
import { safeReadFile, safeWriteFile } from "../utils/file-utils.js";

/**
 * Clase que implementa las operaciones de procesamiento de texto.
 */
export class TextProcessor {
  /**
   * Cuenta líneas, palabras y caracteres de un fichero.
   *
   * @param file - Ruta del fichero.
   * @param callback - Callback con (err, result).
   */
  countFile(
    file: string,
    callback: (err: Error | null, result?: { lines: number; words: number; chars: number }) => void
  ): void {
    safeReadFile(file, (err, data) => {
      if (err || !data) {
        callback(new Error("Cannot read file"));
        return;
      }

      const lines = data.split("\n").length;
      const words = data.trim().split(/\s+/).filter(Boolean).length;
      const chars = data.length;

      callback(null, { lines, words, chars });
    });
  }

  /**
   * Concatena varios ficheros en uno solo, añadiendo una cabecera
   * antes de cada bloque.
   *
   * @param files - Lista de ficheros a concatenar.
   * @param outFile - Fichero de salida.
   * @param callback - Callback con (err).
   */
  concatFiles(
    files: string[],
    outFile: string,
    callback: (err: Error | null) => void
  ): void {
    let finalContent = "";

    const processNext = (index: number) => {
      if (index >= files.length) {
        safeWriteFile(outFile, finalContent, callback);
        return;
      }

      const current = files[index];

      safeReadFile(current, (err, data) => {
        if (err || !data) {
          callback(new Error(`Cannot read file: ${current}`));
          return;
        }

        finalContent += `===== ${path.basename(current)} =====\n${data}\n\n`;
        processNext(index + 1);
      });
    };

    processNext(0);
  }

  /**
   * Divide un fichero en fragmentos de un número máximo de líneas.
   *
   * @param file - Fichero de entrada.
   * @param linesPerFile - Número máximo de líneas por fragmento.
   * @param callback - Callback con (err).
   */
  splitFile(
    file: string,
    linesPerFile: number,
    callback: (err: Error | null) => void
  ): void {
    safeReadFile(file, (err, data) => {
      if (err || !data) {
        callback(new Error("Cannot read file"));
        return;
      }

      const lines = data.split("\n");
      let part = 1;

      const writeNext = (start: number) => {
        if (start >= lines.length) {
          callback(null);
          return;
        }

        const chunk = lines.slice(start, start + linesPerFile).join("\n");
        const outName = `${path.basename(file, path.extname(file))}_part${part}.txt`;

        safeWriteFile(outName, chunk, (err) => {
          if (err) {
            callback(err);
            return;
          }

          part++;
          writeNext(start + linesPerFile);
        });
      };

      writeNext(0);
    });
  }
}
