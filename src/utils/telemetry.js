/**
 * Telemetry Utility
 * Tracks visit counts locally and logs privacy-friendly usage telemetry to local server / txt file.
 */

export function getVisitCount() {
  if (typeof window === 'undefined') return 1;
  const count = parseInt(localStorage.getItem('portfolio_visit_count') || '0', 10);
  return count > 0 ? count : 1;
}

export function incrementVisitCount() {
  if (typeof window === 'undefined') return 1;
  const current = parseInt(localStorage.getItem('portfolio_visit_count') || '0', 10);
  const next = current + 1;
  localStorage.setItem('portfolio_visit_count', next.toString());
  return next;
}

export async function sendTelemetry(type, details = {}) {
  try {
    const payload = {
      type,
      visitCount: getVisitCount(),
      path: window.location.pathname + window.location.hash,
      referrer: document.referrer || 'Direct / Bookmark',
      screen: `${window.innerWidth}x${window.innerHeight}`,
      ...details,
    };

    await fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Silently continue if offline or endpoint unavailable
  }
}
