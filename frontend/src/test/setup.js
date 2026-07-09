import '@testing-library/jest-dom/vitest'

// jsdom has no IntersectionObserver. Components that call useScrollReveal
// need *some* implementation to exist so they don't crash on mount; tests
// that care about reveal behavior itself override this per-test.
class NoopIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!('IntersectionObserver' in globalThis)) {
  globalThis.IntersectionObserver = NoopIntersectionObserver
}
