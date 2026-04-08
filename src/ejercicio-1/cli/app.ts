import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { VideogameManager } from "../services/VideogameManager.js";
import { Platform, Genre } from "../models/Videogame.js";

import {
  AddArgs,
  UpdateArgs,
  RemoveArgs,
  ReadArgs,
  ListArgs
} from "./command-types.js";

/**
 * Instancia principal del gestor de videojuegos.
 * Se encarga de añadir, modificar, eliminar, listar y leer videojuegos.
 */
const manager = new VideogameManager();

/**
 * Configuración del CLI mediante yargs.
 * Cada comando está documentado con TSDoc y tipado mediante generics.
 */
yargs(hideBin(process.argv))

  /**
   * Requiere todos los campos definidos en AddArgs.
   */
  .command<AddArgs>(
    "add",
    "Add a videogame",
    (yargs) =>
      yargs.options({
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true },
        name: { type: "string", demandOption: true },
        desc: { type: "string", demandOption: true },
        platform: { type: "string", demandOption: true },
        genre: { type: "string", demandOption: true },
        developer: { type: "string", demandOption: true },
        year: { type: "number", demandOption: true },
        multiplayer: { type: "boolean", demandOption: true },
        hours: { type: "number", demandOption: true },
        value: { type: "number", demandOption: true }
      }),
    (argv) => {
      manager.add(argv.user, {
        id: argv.id,
        name: argv.name,
        description: argv.desc,
        platform: argv.platform as Platform,
        genre: argv.genre as Genre,
        developer: argv.developer,
        year: argv.year,
        multiplayer: argv.multiplayer,
        hours: argv.hours,
        value: argv.value
      });
    }
  )

  /**
   * Si el videojuego no existe, se muestra un mensaje de error.
   */
  .command<UpdateArgs>(
    "update",
    "Update a videogame",
    (yargs) =>
      yargs.options({
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true },
        name: { type: "string", demandOption: true },
        desc: { type: "string", demandOption: true },
        platform: { type: "string", demandOption: true },
        genre: { type: "string", demandOption: true },
        developer: { type: "string", demandOption: true },
        year: { type: "number", demandOption: true },
        multiplayer: { type: "boolean", demandOption: true },
        hours: { type: "number", demandOption: true },
        value: { type: "number", demandOption: true }
      }),
    (argv) => {
      manager.update(argv.user, {
        id: argv.id,
        name: argv.name,
        description: argv.desc,
        platform: argv.platform as Platform,
        genre: argv.genre as Genre,
        developer: argv.developer,
        year: argv.year,
        multiplayer: argv.multiplayer,
        hours: argv.hours,
        value: argv.value
      });
    }
  )

  /**
   * Elimina un videojuego de la colección del usuario.
   */
  .command<RemoveArgs>(
    "remove",
    "Remove a videogame",
    (yargs) =>
      yargs.options({
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true }
      }),
    (argv) => manager.remove(argv.user, argv.id)
  )

  /**
   * Utiliza colores mediante chalk para mostrar el valor de mercado.
   */
  .command<ListArgs>(
    "list",
    "List videogames",
    (yargs) =>
      yargs.options({
        user: { type: "string", demandOption: true }
      }),
    (argv) => manager.list(argv.user)
  )

  /**
   * Muestra la información de un videojuego concreto.
   */
  .command<ReadArgs>(
    "read",
    "Read a videogame",
    (yargs) =>
      yargs.options({
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true }
      }),
    (argv) => manager.read(argv.user, argv.id)
  )

  .help()
  .parse();
