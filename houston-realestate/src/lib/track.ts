/** Fire a conversion event in GA4 / Meta Pixel (no-ops if they're not installed). */
export function trackLead(formName: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };
  w.gtag?.("event", "generate_lead", { form_name: formName });
  w.fbq?.("track", "Lead", { content_name: formName });
}
