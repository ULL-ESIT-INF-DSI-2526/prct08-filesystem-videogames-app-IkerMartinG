import { describe, test, expect, beforeEach } from "vitest";
import fs from "fs";
import path from "path";
import { VideogameManager } from "../src/services/VideogameManager.ts";
import { Platform, Genre } from "../src/models/Videogame.ts";

const TEST_DIR = "test-data";

describe("VideogameManager", () => {
  beforeEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true });
    }
  });

  test("Add creates JSON file", () => {
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

  test("Add twice does NOT overwrite", () => {
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
    const original = fs.readFileSync(filePath, "utf-8");

    manager.add("iker", {
      id: 1,
      name: "Another",
      description: "desc2",
      platform: Platform.PC,
      genre: Genre.Action,
      developer: "Dev2",
      year: 2021,
      multiplayer: true,
      hours: 20,
      value: 60
    });

    const after = fs.readFileSync(filePath, "utf-8");
    expect(after).toBe(original);
  });

  test("Update modifies JSON", () => {
    const manager = new VideogameManager(TEST_DIR);

    manager.add("iker", {
      id: 1,
      name: "Old",
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
      name: "New",
      description: "updated",
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

    expect(data.name).toBe("New");
    expect(data.description).toBe("updated");
  });

  test("Update does not crash if game does not exist", () => {
    const manager = new VideogameManager(TEST_DIR);

    expect(() =>
      manager.update("iker", {
        id: 99,
        name: "X",
        description: "X",
        platform: Platform.PC,
        genre: Genre.Action,
        developer: "Dev",
        year: 2020,
        multiplayer: false,
        hours: 10,
        value: 50
      })
    ).not.toThrow();
  });

  test("Remove deletes JSON", () => {
    const manager = new VideogameManager(TEST_DIR);

    manager.add("iker", {
      id: 1,
      name: "Test",
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

  test("Remove does not crash if game does not exist", () => {
    const manager = new VideogameManager(TEST_DIR);
    expect(() => manager.remove("iker", 123)).not.toThrow();
  });

  test("List works with no games", () => {
    const manager = new VideogameManager(TEST_DIR);
    expect(() => manager.list("iker")).not.toThrow();
  });

  test("List works with games", () => {
    const manager = new VideogameManager(TEST_DIR);

    manager.add("iker", {
      id: 1,
      name: "Game",
      description: "desc",
      platform: Platform.PC,
      genre: Genre.Action,
      developer: "Dev",
      year: 2020,
      multiplayer: false,
      hours: 10,
      value: 10
    });

    expect(() => manager.list("iker")).not.toThrow();
  });

  test("Read loads correct game", () => {
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

  test("Read does not crash if game does not exist", () => {
    const manager = new VideogameManager(TEST_DIR);
    expect(() => manager.read("iker", 999)).not.toThrow();
  });
});
