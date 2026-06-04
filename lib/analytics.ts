// Drop in your GA4 / Plausible / Posthog calls here
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined" || !GA_ID) return;
  // @ts-ignore
  window.gtag?.("event", name, params);
}
