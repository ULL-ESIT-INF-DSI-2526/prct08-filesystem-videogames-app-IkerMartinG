/**
 * Interfaces for CLI command arguments.
 * These are used to strongly type yargs commands.
 */

export interface AddArgs {
  user: string;
  id: number;
  name: string;
  desc: string;
  platform: string;
  genre: string;
  developer: string;
  year: number;
  multiplayer: boolean;
  hours: number;
  value: number;
}

export interface UpdateArgs {
  user: string;
  id: number;
  name: string;
  desc: string;
  platform: string;
  genre: string;
  developer: string;
  year: number;
  multiplayer: boolean;
  hours: number;
  value: number;
}

export interface RemoveArgs {
  user: string;
  id: number;
}

export interface ReadArgs {
  user: string;
  id: number;
}

export interface ListArgs {
  user: string;
}
