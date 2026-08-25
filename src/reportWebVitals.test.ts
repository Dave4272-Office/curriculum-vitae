import type { Metric } from "web-vitals";
import { afterEach, expect, test, vi } from "vitest";

const { metric, onCLS, onINP, onFCP, onLCP, onTTFB } = vi.hoisted(() => {
  const metric = {
    name: "INP",
    value: 180,
    rating: "needs-improvement",
    id: "v4-inp-1",
    delta: 180,
    navigationType: "reload",
    navigationId: 1,
    entries: [],
  } satisfies Metric;

  return {
    metric,
    onCLS: vi.fn(),
    onINP: vi.fn((report: (value: Metric) => void) => {
      report(metric);
    }),
    onFCP: vi.fn(),
    onLCP: vi.fn(),
    onTTFB: vi.fn(),
  };
});

vi.mock("web-vitals", () => ({
  onCLS: (report: (value: Metric) => void) => onCLS(report),
  onINP: (report: (value: Metric) => void) => onINP(report),
  onFCP: (report: (value: Metric) => void) => onFCP(report),
  onLCP: (report: (value: Metric) => void) => onLCP(report),
  onTTFB: (report: (value: Metric) => void) => onTTFB(report),
}));

import { reportWebVitals } from "./reportWebVitals";

afterEach(() => {
  delete window.dataLayer;
  onCLS.mockClear();
  onINP.mockClear();
  onFCP.mockClear();
  onLCP.mockClear();
  onTTFB.mockClear();
});

test("reportWebVitals pushes each metric as event web_vitals", async () => {
  const extra = vi.fn();
  reportWebVitals(extra);

  await vi.waitFor(() => {
    expect(window.dataLayer).toHaveLength(1);
  });

  expect(onCLS).toHaveBeenCalledOnce();
  expect(onINP).toHaveBeenCalledOnce();
  expect(onFCP).toHaveBeenCalledOnce();
  expect(onLCP).toHaveBeenCalledOnce();
  expect(onTTFB).toHaveBeenCalledOnce();
  expect(extra).toHaveBeenCalledWith(metric);
  expect(window.dataLayer?.[0]).toEqual({
    event: "web_vitals",
    name: "INP",
    value: 180,
    rating: "needs-improvement",
    id: "v4-inp-1",
    delta: 180,
    navigationType: "reload",
  });
  expect(window.dataLayer?.[0]).not.toHaveProperty("entries");
});
