import "@testing-library/jest-dom/vitest";

// Mock APIs not available in jsdom
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [0];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
} as unknown as typeof IntersectionObserver;
