import fs from "fs";
import path from "path";
import chalk from "chalk";
import { VideogameProps } from "../models/Videogame.js";
import { colorValue } from "../utils/colors.js";

/**
 * Gestor de videojuegos usando la API asíncrona con callbacks.
 */
export class VideogameManager {
  constructor(private basePath = "src/ejercicio-1/data") {}

  private getUserDir(user: string): string {
    return path.join(this.basePath, user);
  }

  private getGamePath(user: string, id: number): string {
    return path.join(this.getUserDir(user), `${id}.json`);
  }

  /**
   * Crea el directorio del usuario si no existe.
   */
  private ensureUserDir(user: string, callback: () => void): void {
    const dir = this.getUserDir(user);

    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        console.log(chalk.red("Error creating user directory"));
        return;
      }
      callback();
    });
  }

  /**
   * Añadir videojuego (callback async)
   */
  add(user: string, props: VideogameProps): void {
    this.ensureUserDir(user, () => {
      const file = this.getGamePath(user, props.id);

      fs.access(file, fs.constants.F_OK, (existsErr) => {
        if (!existsErr) {
          console.log(chalk.red("Videogame already exists!"));
          return;
        }

        fs.writeFile(file, JSON.stringify(props, null, 2), (err) => {
          if (err) console.log(chalk.red("Error writing file"));
          else console.log(chalk.green("Videogame added!"));
        });
      });
    });
  }

  /**
   * Modificar videojuego (callback async)
   */
  update(user: string, props: VideogameProps): void {
    const file = this.getGamePath(user, props.id);

    fs.access(file, fs.constants.F_OK, (existsErr) => {
      if (existsErr) {
        console.log(chalk.red("Videogame not found!"));
        return;
      }

      fs.writeFile(file, JSON.stringify(props, null, 2), (err) => {
        if (err) console.log(chalk.red("Error updating file"));
        else console.log(chalk.green("Videogame updated!"));
      });
    });
  }

  /**
   * Eliminar videojuego (callback async)
   */
  remove(user: string, id: number): void {
    const file = this.getGamePath(user, id);

    fs.unlink(file, (err) => {
      if (err) {
        console.log(chalk.red("Videogame not found!"));
        return;
      }
      console.log(chalk.green("Videogame removed!"));
    });
  }

  /**
   * Listar videojuegos (callback async)
   */
  list(user: string): void {
    const dir = this.getUserDir(user);

    fs.readdir(dir, (err, files) => {
      if (err || files.length === 0) {
        console.log(chalk.red("User has no collection."));
        return;
      }

      console.log(chalk.bold(`${user} videogame collection`));
      console.log("--------------------------------");

      files.forEach((file) => {
        const filePath = path.join(dir, file);

        fs.readFile(filePath, "utf-8", (err, data) => {
          if (err) return;

          const game = JSON.parse(data);

          console.log(`ID: ${game.id}`);
          console.log(`Name: ${game.name}`);
          console.log(`Description: ${game.description}`);
          console.log(`Platform: ${game.platform}`);
          console.log(`Genre: ${game.genre}`);
          console.log(`Developer: ${game.developer}`);
          console.log(`Year: ${game.year}`);
          console.log(`Multiplayer: ${game.multiplayer}`);
          console.log(`Estimated hours: ${game.hours}`);
          console.log(`Market value: ${colorValue(game.value)}`);
          console.log("--------------------------------");
        });
      });
    });
  }

  /**
   * Leer videojuego (callback async)
   */
  read(user: string, id: number): void {
    const file = this.getGamePath(user, id);

    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log(chalk.red("Videogame not found!"));
        return;
      }

      const game = JSON.parse(data);

      console.log(`ID: ${game.id}`);
      console.log(`Name: ${game.name}`);
      console.log(`Description: ${game.description}`);
      console.log(`Platform: ${game.platform}`);
      console.log(`Genre: ${game.genre}`);
      console.log(`Developer: ${game.developer}`);
      console.log(`Year: ${game.year}`);
      console.log(`Multiplayer: ${game.multiplayer}`);
      console.log(`Estimated hours: ${game.hours}`);
      console.log(`Market value: ${colorValue(game.value)}`);
    });
  }
}
