/**
 * ============================================================
 *  YOUR BUSINESS INFO — EDIT EVERYTHING HERE
 * ============================================================
 * This one file controls your name, phone, brokerage, license,
 * social links, service areas, colors and feature switches across
 * the entire site. Anything wrapped in [BRACKETS] is a placeholder
 * you still need to fill in.
 */

import { photos } from "./photos";

export const site = {
  // ---- Brand ----
  brandName: "Damian Yanez Real Estate", // [CONFIRM BRAND NAME]
  agentName: "Damian Yanez",
  agentFirstName: "Damian",
  title: "Licensed Texas REALTOR®",
  tagline: "The Woodlands & North Houston real estate from an agent who invests too.",
  // Set to a file in /public (e.g. "/images/logo.svg") to use an image logo.
  // Leave null to show a clean text logo.
  logo: null as string | null,

  // ---- Contact ----
  phone: "(832) 873-3625",
  phoneE164: "+18328733625", // used for tel: and sms: links
  email: "Damian.yanez@kw.com", // shown on the site
  // Where website leads are emailed. Must be the email you signed up to Resend
  // with until you verify your own domain in Resend. (LEAD_TO_EMAIL overrides it.)
  leadInbox: "dyanez.tx@gmail.com",
  serviceAreaText: "The Woodlands, Magnolia & North Houston — Montgomery and Harris counties, plus Greater Houston",

  // ---- Texas license & brokerage (required by TREC on all advertising) ----
  licenseNumber: "857656",
  brokerage: {
    name: "Keller Williams Realty The Woodlands",
    licenseNumber: "[BROKER LICENSE #]",
    phone: "[BROKER PHONE]",
    email: "[BROKER EMAIL]",
    address: "2201 Lake Woodlands Dr., The Woodlands, TX 77380",
    // TREC "Information About Brokerage Services" (your brokerage's filled-out IABS, hosted by HAR)
    iabsUrl: "https://www.har.com/mhf/terms/dispBrokerInfo?sitetype=aws&cid=857656",
  },
  trecConsumerProtectionUrl:
    "https://content.harstatic.com/pdf/TREC_CPN.pdf",

  // ---- Links ----
  harProfileUrl: "https://www.har.com/damian-yanez/agent_damianyanez",
  harSearchUrl: "https://www.har.com/search/dosearch?for_sale=1&city=The%20Woodlands",
  preApprovalUrl: "/contact?interest=buy&topic=pre-approval", // swap for your lender's link if you have one
  social: {
    instagram: "https://www.instagram.com/damiany.realty",
    facebook: "",
    tiktok: "https://www.tiktok.com/@damiany.realty",
    youtube: "",
    linkedin: "",
  },

  // ---- Photos (replace the files in /public/images with real photos) ----
  headshot: "/images/damian-yanez-headshot.jpg",
  heroImage: photos.homeHero, // see src/config/photos.ts

  // ---- Colors (the whole site's palette lives here) ----
  // Black & Champagne. (Key names are historical: "navy" = main dark color.)
  // Previous Navy & Gold: navy #14213d, navyDeep #0b1427, accent #c8873a,
  // accentDark #8f5a1c, sand #f7f3ee, ink #1d2433, muted #5b6577
  colors: {
    navy: "#161616", // primary dark
    navyDeep: "#050505", // darkest sections / footer
    accent: "#d8c3a5", // champagne for buttons & highlights
    accentDark: "#7a6242", // hover state + accessible accent text
    sand: "#f6f3ee", // soft warm background
    ink: "#161616", // body text
    muted: "#5c5c5c", // secondary text
  },

  // ---- Trust bar (real experience, not invented sales stats) ----
  // Add real numbers later, e.g. { value: "25+", label: "Homes sold" }
  trustBar: [
    { value: "2×", label: "Personal home purchases" },
    { value: "BRRRR", label: "Renovate, rent & refinance" },
    { value: "Landlord", label: "Owns & manages rentals" },
    { value: "All types", label: "Buy · Sell · Invest · Lease" },
  ],

  // ---- Feature switches ----
  features: {
    // Shows an EN / ES toggle in the header. Translations live in src/lib/i18n.ts
    spanishToggle: false,
    // Set to true once your IDX provider gives you an embed (see src/components/IdxSearch.tsx)
    idxEnabled: false,
  },
};

export type SiteConfig = typeof site;

/** True once a value has been filled in (not empty and not a "[PLACEHOLDER]"). */
export function filled(value: string | null | undefined): value is string {
  return !!value && !value.includes("[") && !value.endsWith("@example.com");
}

// Your live address (used for the sitemap, canonical links, and social previews).
// www is the primary domain in Vercel; damianyanez.space redirects to it.
// NEXT_PUBLIC_SITE_URL overrides this if set.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.damianyanez.space").replace(/\/$/, "");

export const navLinks = [
  { href: "/buy", label: "Buy", key: "nav.buy" },
  { href: "/sell", label: "Sell", key: "nav.sell" },
  { href: "/invest", label: "Invest", key: "nav.invest" },
  { href: "/lease", label: "Lease", key: "nav.lease" },
  { href: "/neighborhoods", label: "Neighborhoods", key: "nav.neighborhoods" },
  { href: "/about", label: "About", key: "nav.about" },
  { href: "/blog", label: "Blog", key: "nav.blog" },
] as const;
