import { describe, test, expect } from "vitest";
import { colorValue } from "../../src//ejercicio-1/utils/colors.js";

describe("Color utilities", () => {
  test("Low value returns a color", () => {
    expect(colorValue(10)).toBeDefined();
  });

  test("Low value returns a color", () => {
    expect(colorValue(22)).toBeDefined();
  });

  test("Low value returns a color", () => {
    expect(colorValue(50)).toBeDefined();
  });

  test("High value returns a color", () => {
    expect(colorValue(200)).toBeDefined();
  });
});
