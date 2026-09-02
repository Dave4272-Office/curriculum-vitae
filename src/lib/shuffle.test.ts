import { expect, test, vi } from "vitest";
import { shuffle } from "./shuffle";

test("returns a new array with the same members", () => {
  const items = ["a", "b", "c", "d"] as const;
  const shuffled = shuffle(items);

  expect(shuffled).not.toBe(items);
  expect(shuffled).toHaveLength(items.length);
  expect([...shuffled].sort()).toEqual([...items].sort());
  expect(items).toEqual(["a", "b", "c", "d"]);
});

test("leaves empty and singleton lists unchanged", () => {
  expect(shuffle([])).toEqual([]);
  expect(shuffle(["only"])).toEqual(["only"]);
});

test("Fisher–Yates picks j from Math.random at each index", () => {
  const random = vi.spyOn(Math, "random");
  // i = 2, random 0.9 → j = 2 (no swap); i = 1, random 0 → j = 0 (swap).
  random.mockReturnValueOnce(0.9).mockReturnValueOnce(0);

  expect(shuffle(["a", "b", "c"])).toEqual(["b", "a", "c"]);
  expect(random).toHaveBeenCalledTimes(2);
  random.mockRestore();
});
