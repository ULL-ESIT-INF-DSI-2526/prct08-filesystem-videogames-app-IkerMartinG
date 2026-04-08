import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { BackupManager } from "../services/BackupManager.js";

const manager = new BackupManager();

yargs(hideBin(process.argv))

  .command(
    "create",
    "Create a backup of a directory",
    (y) =>
      y
        .option("src", { type: "string", demandOption: true })
        .option("dest", { type: "string", demandOption: true }),
    (argv) => {
      try {
        const result = manager.createBackup(argv.src!, argv.dest!);
        console.log("Backup created:", result);
      } catch (err: any) {
        console.log("Error:", err.message);
      }
    }
  )

  .command(
    "list",
    "List backups in a directory",
    (y) =>
      y.option("dir", { type: "string", demandOption: true }),
    (argv) => {
      try {
        const list = manager.listBackups(argv.dir!);
        console.log(list);
      } catch (err: any) {
        console.log("Error:", err.message);
      }
    }
  )

  .command(
    "restore",
    "Restore a backup",
    (y) =>
      y
        .option("backup", { type: "string", demandOption: true })
        .option("dest", { type: "string", demandOption: true }),
    (argv) => {
      try {
        const count = manager.restoreBackup(argv.backup!, argv.dest!);
        console.log(`Restored ${count} files`);
      } catch (err: any) {
        console.log("Error:", err.message);
      }
    }
  )

  .help()
  .parse();