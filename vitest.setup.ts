import "@testing-library/jest-dom/vitest";

// Polyfill window.matchMedia for jsdom
if (typeof window !== "undefined" && !window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

// Polyfill window.scrollTo for jsdom
if (typeof window !== "undefined" && !window.scrollTo) {
  window.scrollTo = () => {};
}

// Polyfill Element.prototype.scrollIntoView for jsdom
if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

// Polyfill ResizeObserver for jsdom (Radix UI)
if (typeof global !== "undefined" && !global.ResizeObserver) {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
