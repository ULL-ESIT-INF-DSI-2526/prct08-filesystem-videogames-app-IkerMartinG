import chalk from "chalk";

/**
 * Returns a colored string based on market value.
 */
export function colorValue(value: number): string {
  if (value >= 70) return chalk.green(value.toString());
  if (value >= 40) return chalk.blue(value.toString());
  if (value >= 20) return chalk.yellow(value.toString());
  return chalk.red(value.toString());
}
