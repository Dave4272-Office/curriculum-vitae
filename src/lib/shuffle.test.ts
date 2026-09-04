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

test("Fisher–Yates picks j from crypto.getRandomValues at each index", () => {
  const random = vi.spyOn(crypto, "getRandomValues");
  // i = 2, 2 % 3 → j = 2 (no swap); i = 1, 0 % 2 → j = 0 (swap).
  random
    .mockImplementationOnce((arr) => {
      if (arr instanceof Uint32Array) {
        arr[0] = 2;
      }
      return arr;
    })
    .mockImplementationOnce((arr) => {
      if (arr instanceof Uint32Array) {
        arr[0] = 0;
      }
      return arr;
    });

  expect(shuffle(["a", "b", "c"])).toEqual(["b", "a", "c"]);
  expect(random).toHaveBeenCalledTimes(2);
  random.mockRestore();
});
