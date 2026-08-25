import type { MetricType } from "web-vitals";
import { pushWebVitalToDataLayer } from "./lib/web-vitals-datalayer";

export const reportWebVitals = (
  metricsReporter?: (_metric: MetricType) => void,
) => {
  if (typeof window === "undefined") {
    return;
  }
  void import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    const report = (metric: MetricType) => {
      pushWebVitalToDataLayer(metric);
      metricsReporter?.(metric);
    };
    onCLS(report);
    onINP(report);
    onFCP(report);
    onLCP(report);
    onTTFB(report);
  });
};
