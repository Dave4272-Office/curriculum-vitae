import "@testing-library/jest-dom/vitest";

if (typeof HTMLElement !== "undefined") {
  HTMLElement.prototype.scrollIntoView = () => undefined;
}

if (typeof window !== "undefined") {
  window.scrollTo = () => undefined;

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}
