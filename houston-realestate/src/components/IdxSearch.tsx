import { site } from "@/config/site";
import { listingDisclaimer } from "./Sections";

/**
 * IDX HOME SEARCH
 * ---------------------------------------------------------------
 * Real MLS search needs an IDX provider approved through your broker / HAR
 * (e.g. IDX Broker, iHomefinder, Showcase IDX). Once you have one:
 *   1. Set `features.idxEnabled: true` in src/config/site.ts
 *   2. Paste the provider's embed code where marked below (most give you a
 *      <script> tag or an <iframe>; for scripts use next/script).
 * Until then this shows a placeholder that links to your HAR.com search.
 */
export function IdxSearch() {
  if (site.features.idxEnabled) {
    return (
      <div id="idx-search" className="min-h-[600px]">
        {/* ======== PASTE YOUR IDX EMBED HERE ======== */}
        <p className="mt-4 text-xs text-muted">{listingDisclaimer}</p>
      </div>
    );
  }

  return (
    <div id="idx-search" className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center sm:p-12">
      <p className="eyebrow">Home search</p>
      <h3 className="mt-3 font-display text-3xl font-semibold text-navy">Search every home on the Houston MLS</h3>
      <p className="mx-auto mt-3 max-w-xl text-muted">
        Live MLS search is coming to this site soon. In the meantime, browse every active Houston listing on HAR.com, then
        send me the ones you love and I&apos;ll set up showings.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href={site.harSearchUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Search all Houston homes
        </a>
        <a href={`sms:${site.phoneE164}`} className="btn-outline">
          Text me a listing
        </a>
      </div>
    </div>
  );
}
