import fs from "fs";
import path from "path";
import chalk from "chalk";
import { Videoggame, VideogameProps } from "../models/Videogame.js";
import { colorValue } from "../utils/colors.js";

/**
 * Manages videogames for a specific user.
 */
export class VideogameManager {
  constructor(private basePath = "src/data") {}

  private getUserDir(user: string): string {
    return path.join(this.basePath, user);
  }

  private getGamePath(user: string, id: number): string {
    return path.join(this.getUserDir(user), `${id}.json`);
  }

  private ensureUserDir(user: string): void {
    const dir = this.getUserDir(user);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  add(user: string, props: VideogameProps): void {
    this.ensureUserDir(user);
    const file = this.getGamePath(user, props.id);

    if (fs.existsSync(file)) {
      console.log(chalk.red("Videogame already exists!"));
      return;
    }

    fs.writeFileSync(file, JSON.stringify(props, null, 2));
    console.log(chalk.green("Videogame added!"));
  }

  update(user: string, props: VideogameProps): void {
    const file = this.getGamePath(user, props.id);

    if (!fs.existsSync(file)) {
      console.log(chalk.red("Videogame not found!"));
      return;
    }

    fs.writeFileSync(file, JSON.stringify(props, null, 2));
    console.log(chalk.green("Videogame updated!"));
  }

  remove(user: string, id: number): void {
    const file = this.getGamePath(user, id);

    if (!fs.existsSync(file)) {
      console.log(chalk.red("Videogame not found!"));
      return;
    }

    fs.unlinkSync(file);
    console.log(chalk.green("Videogame removed!"));
  }

  list(user: string): void {
    const dir = this.getUserDir(user);

    if (!fs.existsSync(dir)) {
      console.log(chalk.red("User has no collection."));
      return;
    }

    const files = fs.readdirSync(dir);

    console.log(chalk.bold(`${user} videogame collection`));
    console.log("--------------------------------");

    files.forEach((file) => {
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));
      console.log(`ID: ${data.id}`);
      console.log(`Name: ${data.name}`);
      console.log(`Description: ${data.description}`);
      console.log(`Platform: ${data.platform}`);
      console.log(`Genre: ${data.genre}`);
      console.log(`Developer: ${data.developer}`);
      console.log(`Year: ${data.year}`);
      console.log(`Multiplayer: ${data.multiplayer}`);
      console.log(`Estimated hours: ${data.hours}`);
      console.log(`Market value: ${colorValue(data.value)}`);
      console.log("--------------------------------");
    });
  }

  read(user: string, id: number): void {
    const file = this.getGamePath(user, id);

    if (!fs.existsSync(file)) {
      console.log(chalk.red("Videogame not found!"));
      return;
    }

    const data = JSON.parse(fs.readFileSync(file, "utf-8"));

    console.log(`ID: ${data.id}`);
    console.log(`Name: ${data.name}`);
    console.log(`Description: ${data.description}`);
    console.log(`Platform: ${data.platform}`);
    console.log(`Genre: ${data.genre}`);
    console.log(`Developer: ${data.developer}`);
    console.log(`Year: ${data.year}`);
    console.log(`Multiplayer: ${data.multiplayer}`);
    console.log(`Estimated hours: ${data.hours}`);
    console.log(`Market value: ${colorValue(data.value)}`);
  }
}
