import { MetricType } from "web-vitals";

export const reportWebVitals = (
  metricsReporter: (_metric: MetricType) => void,
) => {
  if (typeof metricsReporter === "function") {
    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(metricsReporter);
      onINP(metricsReporter);
      onFCP(metricsReporter);
      onLCP(metricsReporter);
      onTTFB(metricsReporter);
    });
  }
};
