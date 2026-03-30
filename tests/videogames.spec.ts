import { describe, test, expect, beforeEach } from "vitest";
import fs from "fs";
import path from "path";
import { VideogameManager } from "../src/services/VideogameManager.js";

import { Platform } from "../src/models/Videogame.js"
import { Genre } from "../src/models/Videogame.js"

const TEST_DIR = "test-data";

describe("VideogameManager", () => {
  beforeEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true });
    }
  });

  test("Add a videogame creates the JSON file", () => {
    const manager = new VideogameManager(TEST_DIR);

    manager.add("iker", {
      id: 1,
      name: "Test Game",
      description: "desc",
      platform: Platform.PC,
      genre: Genre.Action,
      developer: "Dev",
      year: 2020,
      multiplayer: false,
      hours: 10,
      value: 50
    });

    const filePath = path.join(TEST_DIR, "iker", "1.json");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test("Add a videogame twice does NOT overwrite", () => {
    const manager = new VideogameManager(TEST_DIR);

    manager.add("iker", {
      id: 1,
      name: "Test Game",
      description: "desc",
      platform: Platform.PC,
      genre: Genre.Action,
      developer: "Dev",
      year: 2020,
      multiplayer: false,
      hours: 10,
      value: 50
    });

    const filePath = path.join(TEST_DIR, "iker", "1.json");
    const originalContent = fs.readFileSync(filePath, "utf-8");

    // Intento de añadir el mismo ID
    manager.add("iker", {
      id: 1,
      name: "Another Game",
      description: "desc2",
      platform: Platform.PC,
      genre: Genre.Action,
      developer: "Dev2",
      year: 2021,
      multiplayer: true,
      hours: 20,
      value: 60
    });

    const newContent = fs.readFileSync(filePath, "utf-8");

    // El archivo NO debe cambiar
    expect(newContent).toBe(originalContent);
  });

  test("Update modifies an existing videogame", () => {
    const manager = new VideogameManager(TEST_DIR);

    manager.add("iker", {
      id: 1,
      name: "Old Name",
      description: "desc",
      platform: Platform.PC,
      genre: Genre.Action,
      developer: "Dev",
      year: 2020,
      multiplayer: false,
      hours: 10,
      value: 50
    });

    manager.update("iker", {
      id: 1,
      name: "New Name",
      description: "desc updated",
      platform: Platform.PC,
      genre: Genre.Action,
      developer: "Dev",
      year: 2020,
      multiplayer: false,
      hours: 10,
      value: 50
    });

    const filePath = path.join(TEST_DIR, "iker", "1.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    expect(data.name).toBe("New Name");
    expect(data.description).toBe("desc updated");
  });

  test("Remove deletes the JSON file", () => {
    const manager = new VideogameManager(TEST_DIR);

    manager.add("iker", {
      id: 1,
      name: "Test Game",
      description: "desc",
      platform: Platform.PC,
      genre: Genre.Action,
      developer: "Dev",
      year: 2020,
      multiplayer: false,
      hours: 10,
      value: 50
    });

    const filePath = path.join(TEST_DIR, "iker", "1.json");
    expect(fs.existsSync(filePath)).toBe(true);

    manager.remove("iker", 1);

    expect(fs.existsSync(filePath)).toBe(false);
  });

  test("List does not crash when user has no games", () => {
    const manager = new VideogameManager(TEST_DIR);

    // No debe lanzar error
    expect(() => manager.list("iker")).not.toThrow();
  });

  test("Read loads the correct videogame", () => {
    const manager = new VideogameManager(TEST_DIR);

    manager.add("iker", {
      id: 1,
      name: "Read Test",
      description: "desc",
      platform: Platform.PC,
      genre: Genre.Action,
      developer: "Dev",
      year: 2020,
      multiplayer: false,
      hours: 10,
      value: 50
    });

    const filePath = path.join(TEST_DIR, "iker", "1.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    expect(data.name).toBe("Read Test");
  });
});
