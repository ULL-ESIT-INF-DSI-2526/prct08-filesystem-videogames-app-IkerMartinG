/**
 * CLI del procesador de texto.
 *
 * Comandos disponibles:
 *  - wc     → contar líneas, palabras y caracteres
 *  - concat → concatenar varios ficheros
 *  - split  → dividir un fichero en partes
 *
 * @packageDocumentation
 */

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { TextProcessor } from "../services/TextProcessor.js";

const processor = new TextProcessor();

yargs(hideBin(process.argv))

  /**
   * Comando: wc
   */
  .command(
    "wc",
    "Count lines, words and characters",
    (yargs) =>
      yargs.option("file", {
        type: "string",
        demandOption: true,
        describe: "File to analyze"
      }),
    (argv) => {
      processor.countFile(argv.file!, (err, result) => {
        if (err) console.log("Error:", err.message);
        else console.log(result);
      });
    }
  )

  /**
   * Comando: concat
   */
  .command(
    "concat",
    "Concatenate multiple files",
    (yargs) =>
      yargs
        .option("files", {
          type: "array",
          demandOption: true,
          describe: "Files to concatenate"
        })
        .option("out", {
          type: "string",
          demandOption: true,
          describe: "Output file"
        }),
    (argv) => {
      processor.concatFiles(
        argv.files as string[],
        argv.out!,
        (err) => {
          if (err) console.log("Error:", err.message);
          else console.log("Files concatenated!");
        }
      );
    }
  )

  /**
   * Comando: split
   */
  .command(
    "split",
    "Split a file into fragments",
    (yargs) =>
      yargs
        .option("file", {
          type: "string",
          demandOption: true
        })
        .option("lines", {
          type: "number",
          demandOption: true
        }),
    (argv) => {
      processor.splitFile(
        argv.file!,
        argv.lines!,
        (err) => {
          if (err) console.log("Error:", err.message);
          else console.log("File split completed!");
        }
      );
    }
  )

  .help()
  .parse();
