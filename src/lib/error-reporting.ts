type ErrorBoundaryContext = Record<string, unknown>;

// Client-side error hook. Errors that React's error boundaries catch never reach
// window.onerror, so surface them here in one place. Wire this up to a real
// monitoring service (Sentry, Rollbar, a /api/log endpoint) when one is chosen.
export function reportClientError(error: unknown, context: ErrorBoundaryContext = {}) {
  if (typeof window === "undefined") return;

  const detail = error instanceof Error ? error : new Error(String(error));
  console.error("[gramonnati]", detail, context);
}
