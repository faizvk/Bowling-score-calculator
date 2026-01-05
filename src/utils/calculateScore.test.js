import { calculateScore } from "./calculateScore";

describe("Bowling score calculation", () => {
  test("all open frames", () => {
    expect(calculateScore("9-9-9-9-9-9-9-9-9-9-")).toBe(90);
  });

  test("perfect game", () => {
    expect(calculateScore("XXXXXXXXXXXX")).toBe(300);
  });

  test("all spares with 5", () => {
    expect(calculateScore("5/5/5/5/5/5/5/5/5/5/5")).toBe(150);
  });
});
