import { pageMeta } from "@/lib/seo";
import { getNeighborhoods } from "@/lib/content";
import { CtaBand, NeighborhoodCard, PageHero, Section } from "@/components/Sections";

export const metadata = pageMeta({
  title: "Houston Neighborhoods & Suburbs | Homes for Sale by Area",
  description:
    "Explore Houston neighborhoods and suburbs: Houston Heights, Katy, Cypress, Sugar Land, Pearland, The Woodlands, Spring, Humble, Missouri City, and League City homes for sale.",
  path: "/neighborhoods",
});

export default function NeighborhoodsPage() {
  const all = getNeighborhoods();
  return (
    <>
      <PageHero
        eyebrow="Neighborhood guides"
        title="Find your place in Greater Houston."
        intro="Every area has its own personality, price point, and commute. Start here, then let's tour the ones that fit your life."
      />
      <Section>
        <h2 className="sr-only">All neighborhoods</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {all.map((n) => (
            <NeighborhoodCard key={n.slug} n={n} />
          ))}
        </div>
      </Section>
      <CtaBand title="Don't see your area?" text="I work all across Greater Houston. Tell me where you're looking." />
    </>
  );
}
