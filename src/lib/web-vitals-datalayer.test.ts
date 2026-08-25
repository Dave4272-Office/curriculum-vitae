import type { Metric } from "web-vitals";
import { afterEach, expect, test } from "vitest";
import {
  pushWebVitalToDataLayer,
  toWebVitalsDataLayerEvent,
} from "./web-vitals-datalayer";

const metric = {
  name: "LCP",
  value: 1234.5,
  rating: "good",
  id: "v4-lcp-1",
  delta: 1234.5,
  navigationType: "navigate",
  navigationId: 1,
  entries: [{ name: "largest-contentful-paint" } as PerformanceEntry],
} satisfies Metric;

afterEach(() => {
  delete window.dataLayer;
});

test("dataLayer payload keeps metric fields and omits entries", () => {
  expect(toWebVitalsDataLayerEvent(metric)).toEqual({
    event: "web_vitals",
    name: "LCP",
    value: 1234.5,
    rating: "good",
    id: "v4-lcp-1",
    delta: 1234.5,
    navigationType: "navigate",
  });
  expect(toWebVitalsDataLayerEvent(metric)).not.toHaveProperty("entries");
  expect(toWebVitalsDataLayerEvent(metric)).not.toHaveProperty("navigationId");
});

test("omits navigationType when the metric does not have one", () => {
  const withoutNav = { ...metric, navigationType: undefined };
  expect(toWebVitalsDataLayerEvent(withoutNav)).toEqual({
    event: "web_vitals",
    name: "LCP",
    value: 1234.5,
    rating: "good",
    id: "v4-lcp-1",
    delta: 1234.5,
  });
});

test("initializes dataLayer and pushes the web_vitals event", () => {
  expect(window.dataLayer).toBeUndefined();
  pushWebVitalToDataLayer(metric);
  expect(window.dataLayer).toEqual([
    {
      event: "web_vitals",
      name: "LCP",
      value: 1234.5,
      rating: "good",
      id: "v4-lcp-1",
      delta: 1234.5,
      navigationType: "navigate",
    },
  ]);
  expect(window.dataLayer?.[0]).not.toHaveProperty("entries");
});

test("appends to an existing dataLayer", () => {
  window.dataLayer = [{ event: "gtm.js" }];
  pushWebVitalToDataLayer(metric);
  expect(window.dataLayer).toHaveLength(2);
  expect(window.dataLayer?.[1]).toMatchObject({ event: "web_vitals", name: "LCP" });
});
