import type { Metric } from "web-vitals";

export const WEB_VITALS_EVENT = "web_vitals" as const;

export type WebVitalsDataLayerEvent = {
  event: typeof WEB_VITALS_EVENT;
  name: Metric["name"];
  value: number;
  rating: Metric["rating"];
  id: string;
  delta: number;
  navigationType?: Metric["navigationType"];
};

declare global {
  interface Window {
    dataLayer?: Array<WebVitalsDataLayerEvent | Record<string, unknown>>;
  }
}

export type WebVitalReport = Pick<
  Metric,
  "name" | "value" | "rating" | "id" | "delta"
> & {
  navigationType?: Metric["navigationType"];
};

export function toWebVitalsDataLayerEvent(
  metric: WebVitalReport,
): WebVitalsDataLayerEvent {
  const event: WebVitalsDataLayerEvent = {
    event: WEB_VITALS_EVENT,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
    delta: metric.delta,
  };
  if (metric.navigationType) {
    event.navigationType = metric.navigationType;
  }
  return event;
}

export function pushWebVitalToDataLayer(metric: WebVitalReport): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(toWebVitalsDataLayerEvent(metric));
}
