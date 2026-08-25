import { DateTime } from "luxon";
import { expect, test, vi } from "vitest";
import { durationAsString } from "./date-time";

function monthStart(value: string): DateTime {
  return DateTime.fromFormat(value, "yyyy-MM");
}

function monthEnd(value: string): DateTime {
  return DateTime.fromFormat(value, "yyyy-MM").endOf("month");
}

test("rolls 12 ceiled months into the next year and omits 0 months", () => {
  expect(
    durationAsString(DateTime.fromISO("2020-09-01"), DateTime.fromISO("2026-08-25")),
  ).toBe("6 yrs");
  expect(durationAsString(monthStart("2024-01"), monthEnd("2024-12"))).toBe("1 yr");
});

test("keeps mixed year and month copy when months stay below 12", () => {
  expect(durationAsString(monthStart("2025-01"), DateTime.fromISO("2026-08-25"))).toBe(
    "1 yr 8 mths",
  );
  expect(durationAsString(monthStart("2022-11"), monthEnd("2023-12"))).toBe(
    "1 yr 2 mths",
  );
  expect(durationAsString(monthStart("2020-09"), monthEnd("2022-10"))).toBe(
    "2 yrs 2 mths",
  );
});

test("uses singular labels for one year or one month", () => {
  expect(
    durationAsString(DateTime.fromISO("2024-01-01"), DateTime.fromISO("2025-01-01")),
  ).toBe("1 yr");
  expect(
    durationAsString(DateTime.fromISO("2024-01-01"), DateTime.fromISO("2024-02-15")),
  ).toBe("2 mths");
  expect(
    durationAsString(DateTime.fromISO("2024-01-01"), DateTime.fromISO("2024-02-01")),
  ).toBe("1 mth");
});

test("returns an empty string for a zero-length span", () => {
  const instant = DateTime.fromISO("2024-06-01");
  expect(durationAsString(instant, instant)).toBe("");
});

test("defaults the end date to now", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-25T12:00:00+05:30"));
  expect(durationAsString(DateTime.fromISO("2024-01-01"))).toBe("2 yrs 8 mths");
  vi.useRealTimers();
});
