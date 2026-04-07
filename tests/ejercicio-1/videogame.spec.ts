import { describe, test, expect } from "vitest";
import { Videogame, Platform, Genre } from "../../src/ejercicio-1/models/Videogame.js";

describe("Videogame model", () => {
  test("Getters work correctly", () => {
    const game = new Videogame(
      1,
      "Test",
      "desc",
      Platform.PC,
      Genre.Action,
      "Dev",
      2020,
      false,
      10,
      50
    );

    expect(game.name).toBe("Test");
    expect(game.value).toBe(50);
    expect(game.platform).toBe(Platform.PC);
  });
});
