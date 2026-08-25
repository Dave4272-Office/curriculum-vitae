"use client";

import { useEffect } from "react";
import { reportWebVitals } from "../reportWebVitals";

export function WebVitals() {
  useEffect(() => {
    reportWebVitals(console.log);
  }, []);

  return null;
}
