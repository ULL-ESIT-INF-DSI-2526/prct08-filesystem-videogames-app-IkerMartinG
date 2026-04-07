/**
 * Argumentos del comando `add`.
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

/**
 * Argumentos del comando `update`.
 */
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

/**
 * Argumentos del comando `remove`.
 */
export interface RemoveArgs {
  user: string;
  id: number;
}

/**
 * Argumentos del comando `read`.
 */
export interface ReadArgs {
  user: string;
  id: number;
}

/**
 * Argumentos del comando `list`.
 */
export interface ListArgs {
  user: string;
}
