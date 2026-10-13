import type { Metadata } from "next";
import { site, siteUrl } from "@/config/site";

/** Builds unique per-page metadata with canonical URL + Open Graph. */
export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.brandName,
      type: "website",
      locale: "en_US",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
