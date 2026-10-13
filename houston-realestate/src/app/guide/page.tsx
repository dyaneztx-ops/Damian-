import Image from "next/image";
import { pageMeta } from "@/lib/seo";
import { getNeighborhoods } from "@/lib/content";
import { CheckList, Section } from "@/components/Sections";
import { GuideSignup } from "@/components/GuideSignup";

export const metadata = pageMeta({
  title: "Free Houston Neighborhood Guide (PDF)",
  description:
    "Download the free Houston Neighborhood Guide: compare the Heights, Katy, Cypress, Sugar Land, Pearland, The Woodlands and more by price, commute, and lifestyle.",
  path: "/guide",
  image: "/images/guide-cover.svg",
});

export default function GuidePage() {
  const names = getNeighborhoods().map((n) => n.name);
  return (
    <section className="bg-sand">
      <div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Free download</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-semibold text-navy sm:text-5xl">
            The Houston Neighborhood Guide
          </h1>
          <p className="mt-5 text-lg text-muted">
            Moving to Houston or moving across town? Get a side-by-side look at the area&apos;s most popular neighborhoods and
            suburbs, so you can narrow your search before you spend weekends driving around.
          </p>
          <div className="mt-8">
            <CheckList
              items={[
                `Snapshots of ${names.length} areas: ${names.slice(0, 5).join(", ")} and more`,
                "Typical price ranges and what your budget buys",
                "Commute times to Downtown, the Galleria, the Med Center, and Energy Corridor",
                "How to check flood zones, MUD taxes, and school boundaries",
                "Investor notes: where rentals tend to cash flow",
              ]}
            />
          </div>
          <div className="card-static mt-10 p-6 sm:p-8">
            <GuideSignup />
          </div>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm rotate-2 overflow-hidden rounded-2xl shadow-2xl">
          <Image src="/images/guide-cover.svg" alt="Cover of the Houston Neighborhood Guide" fill priority sizes="384px" className="object-cover" />
        </div>
      </div>
      <Section tone="sand" className="!pt-0">
        <p className="text-center text-xs text-muted">
          Your email is only used to send the guide and occasional Houston real estate updates. Unsubscribe anytime.
        </p>
      </Section>
    </section>
  );
}
