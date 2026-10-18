/**
 * Telemetry Utility
 * Dev: posts to the Vite middleware, which appends to telemetry_logs.txt.
 * Prod: posts to VITE_TELEMETRY_URL if set (any endpoint accepting JSON POST); otherwise a no-op.
 * Stores nothing personal — event type, path, referrer, screen size and a per-browser visit count.
 */

const ENDPOINT = import.meta.env.DEV ? '/api/telemetry' : import.meta.env.VITE_TELEMETRY_URL;

let visitCounted = false;

function safeStorage(fn, fallback) {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

export function getVisitCount() {
  const count = safeStorage(() => parseInt(localStorage.getItem('portfolio_visit_count') || '0', 10), 0);
  return count > 0 ? count : 1;
}

// Idempotent per page load (React StrictMode runs mount effects twice in dev).
export function incrementVisitCount() {
  if (visitCounted) return getVisitCount();
  visitCounted = true;
  const current = safeStorage(() => parseInt(localStorage.getItem('portfolio_visit_count') || '0', 10), 0);
  const next = current + 1;
  safeStorage(() => localStorage.setItem('portfolio_visit_count', String(next)));
  return next;
}

let lastVisitSent = false;

export function sendTelemetry(type, details = {}) {
  if (!ENDPOINT) return;
  if (type === 'VISIT') {
    if (lastVisitSent) return;
    lastVisitSent = true;
  }
  const payload = {
    type,
    visitCount: getVisitCount(),
    path: window.location.pathname + window.location.hash,
    referrer: document.referrer || 'Direct / Bookmark',
    screen: `${window.innerWidth}x${window.innerHeight}`,
    ...details,
  };
  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
