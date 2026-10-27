import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { Analytics } from "@/components/Analytics";
import { AgentJsonLd } from "@/components/JsonLd";
import { LanguageProvider } from "@/lib/i18n";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const heading = Fraunces({ subsets: ["latin"], variable: "--font-heading", display: "swap", axes: ["opsz"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `The Woodlands & Spring Realtor | ${site.agentName}, Investor-Agent | Keller Williams`,
    template: `%s | ${site.agentName}, REALTOR® in The Woodlands`,
  },
  description: `${site.agentName} is a REALTOR® with Keller Williams Realty The Woodlands and a real estate investor helping clients buy, sell, invest, and lease homes in The Woodlands, Spring, Conroe, Magnolia, Tomball and North Houston. Call ${site.phone}.`,
  applicationName: site.brandName,
  authors: [{ name: site.agentName }],
  openGraph: { siteName: site.brandName, locale: "en_US", type: "website" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: site.colors.navy };

// Colors from src/config/site.ts → CSS variables used by Tailwind.
const c = site.colors;
const brandVars = `:root{--brand-navy:${c.navy};--brand-navy-deep:${c.navyDeep};--brand-accent:${c.accent};--brand-accent-dark:${c.accentDark};--brand-sand:${c.sand};--brand-ink:${c.ink};--brand-muted:${c.muted};}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: brandVars }} />
      </head>
      <body className="font-sans">
        <LanguageProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileCallBar />
        </LanguageProvider>
        <AgentJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
