/**
 * Represents a videogame in a user's collection.
 */
export enum Platform {
  PC = "PC",
  PS5 = "PlayStation 5",
  Xbox = "Xbox Series X/S",
  Switch = "Nintendo Switch",
  SteamDeck = "Steam Deck",
}

export enum Genre {
  Action = "Action",
  Adventure = "Adventure",
  RPG = "RPG",
  Strategy = "Strategy",
  Sports = "Sports",
  Simulation = "Simulation",
}

export interface VideogameProps {
  id: number;
  name: string;
  description: string;
  platform: Platform;
  genre: Genre;
  developer: string;
  year: number;
  multiplayer: boolean;
  hours: number;
  value: number;
}

/**
 * Videogame class with validation.
 */
export class Videogame implements VideogameProps {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public platform: Platform,
    public genre: Genre,
    public developer: string,
    public year: number,
    public multiplayer: boolean,
    public hours: number,
    public value: number,
  ) {}
}
