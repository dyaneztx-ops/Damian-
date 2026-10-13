import { site, siteUrl } from "@/config/site";
import { getNeighborhoods } from "@/lib/content";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped is safe to inline
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** schema.org RealEstateAgent — rendered on every page from the root layout. */
export function AgentJsonLd() {
  const areas = ["Houston", ...getNeighborhoods().map((n) => n.name)];
  const sameAs = [site.harProfileUrl, ...Object.values(site.social)].filter(
    (u) => u && u.startsWith("http") && u !== "https://www.har.com/",
  );
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${siteUrl}/#agent`,
        name: site.agentName,
        alternateName: site.brandName,
        description: `${site.agentName} is a ${site.title} in Houston, TX helping clients buy, sell, invest in, and lease all property types.`,
        url: siteUrl,
        telephone: site.phoneE164,
        email: site.email,
        image: `${siteUrl}${site.headshot}`,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Houston",
          addressRegion: "TX",
          addressCountry: "US",
        },
        areaServed: areas.map((name) => ({ "@type": "Place", name: `${name}, TX` })),
        parentOrganization: {
          "@type": "RealEstateAgent",
          name: site.brokerage.name,
          telephone: site.brokerage.phone,
        },
        knowsLanguage: site.features.spanishToggle ? ["en", "es"] : ["en"],
        ...(sameAs.length ? { sameAs } : {}),
      }}
    />
  );
}
