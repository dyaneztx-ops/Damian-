import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { getNeighborhood, getNeighborhoods } from "@/lib/content";
import { CheckList, CtaBand, NeighborhoodCard, PageHero, Section, SectionHeading } from "@/components/Sections";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getNeighborhoods().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props) {
  const n = getNeighborhood((await params).slug);
  if (!n) return {};
  return pageMeta({
    title: `${n.name} Homes for Sale | ${n.name} TX Realtor`,
    description: `${n.name} homes for sale and neighborhood guide: lifestyle, commute, schools, and price ranges. Work with ${site.agentName}, a Houston-area REALTOR® and investor.`,
    path: `/neighborhoods/${n.slug}`,
    image: n.image,
  });
}

export default async function NeighborhoodPage({ params }: Props) {
  const n = getNeighborhood((await params).slug);
  if (!n) notFound();
  const others = getNeighborhoods().filter((o) => o.slug !== n.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Neighborhoods", item: `${siteUrl}/neighborhoods` },
            { "@type": "ListItem", position: 2, name: n.name, item: `${siteUrl}/neighborhoods/${n.slug}` },
          ],
        }}
      />
      <PageHero eyebrow="Neighborhood guide" title={`${n.name} homes for sale & area guide`} intro={n.description} image={n.image}>
        <a href={`https://www.har.com/search/dosearch?for_sale=1&city=${encodeURIComponent(n.harCity)}`} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Search {n.name} homes
        </a>
        <a href="#ask" className="btn-outline-light">Ask me about {n.name}</a>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-a:text-accent-dark lg:col-span-2" dangerouslySetInnerHTML={{ __html: n.html }} />
          <aside className="space-y-6">
            <div className="rounded-2xl bg-sand p-6">
              <h2 className="text-lg font-semibold text-navy">At a glance</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {n.priceRange && (
                  <div>
                    <dt className="text-muted">Typical home prices</dt>
                    <dd className="font-semibold text-ink">{n.priceRange}</dd>
                  </div>
                )}
                {n.commute && (
                  <div>
                    <dt className="text-muted">Commute</dt>
                    <dd className="font-semibold text-ink">{n.commute}</dd>
                  </div>
                )}
              </dl>
              {n.highlights.length > 0 && (
                <div className="mt-5 border-t border-black/10 pt-5 text-sm">
                  <CheckList items={n.highlights} />
                </div>
              )}
            </div>
            <div className="rounded-2xl bg-navy p-6 text-white">
              <h2 className="text-lg font-semibold">A note on schools</h2>
              <p className="mt-2 text-sm text-slate-300">
                School boundaries change, so always verify with the school district directly. I&apos;m happy to point you to the
                right resources, but I can&apos;t tell you which school is &ldquo;best.&rdquo; That&apos;s your call.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="sand" id="ask">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow={n.name} title={`Thinking about ${n.name}?`} intro="Tell me what you're looking for and I'll send homes that fit, plus honest local insight." />
          </div>
          <div className="card-static p-6 sm:p-8 lg:col-span-3">
            <LeadForm formName={`Neighborhood: ${n.name}`} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Keep exploring" title="Other areas I serve" />
          <Link href="/neighborhoods" className="font-semibold whitespace-nowrap text-accent-dark hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <NeighborhoodCard key={o.slug} n={o} />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
