import Image from "next/image";
import Link from "next/link";
import { filled, site } from "@/config/site";
import { getNeighborhoods, getPosts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { T } from "@/lib/i18n";
import {
  FeaturedListings,
  InvestorEdge,
  NeighborhoodCard,
  Section,
  SectionHeading,
  ServicesGrid,
  Testimonials,
  TrustBar,
} from "@/components/Sections";
import { LeadForm } from "@/components/LeadForm";
import { GuideSignup } from "@/components/GuideSignup";
import { PostCard } from "@/components/PostCard";
import { ArrowIcon, PhoneIcon } from "@/components/Icons";

export const metadata = pageMeta({
  title: `Houston Realtor & Investment Property Agent | ${site.agentName}`,
  description: `Looking for a Houston real estate agent who actually invests? ${site.agentName} helps you buy, sell, invest, and lease across Greater Houston. Call or text ${site.phone}.`,
  path: "/",
});

export default function HomePage() {
  const neighborhoods = getNeighborhoods().slice(0, 8);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <Image src={site.heroImage} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-navy-deep/20" />
        <div className="container-x pt-20 pb-28 sm:pt-28 sm:pb-36">
          <p className="eyebrow !text-accent">
            {site.agentName} · Houston REALTOR® & Investor
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] font-semibold text-white sm:text-6xl">
            <T k="hero.title">Houston real estate, guided by an agent who invests too.</T>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl">
            <T k="hero.subtitle">
              I&apos;ve bought my own homes, flipped properties, and manage my own rentals. Whether you&apos;re buying,
              selling, investing, or leasing, you get advice backed by real deals, not just a license.
            </T>
          </p>
          <div className="mt-9 grid max-w-md grid-cols-2 gap-3 sm:flex sm:max-w-none">
            <Link href="/buy" className="btn-primary whitespace-nowrap !px-4 !py-4 sm:!px-8 sm:!text-lg">
              <T k="cta.buy">I want to Buy</T>
            </Link>
            <Link href="/sell" className="btn-outline-light whitespace-nowrap !px-4 !py-4 sm:!px-8 sm:!text-lg">
              <T k="cta.sell">I want to Sell</T>
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-300">
            Thinking about investing or leasing?{" "}
            <Link href="/invest" className="font-semibold text-white underline underline-offset-4">
              Invest
            </Link>{" "}
            ·{" "}
            <Link href="/lease" className="font-semibold text-white underline underline-offset-4">
              Lease
            </Link>
          </p>
        </div>
      </section>

      <TrustBar />

      {/* WHY AN INVESTOR-AGENT */}
      <Section tone="navy" className="mt-16 sm:mt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              eyebrow="Why work with an investor-agent"
              title="Advice from someone who has skin in the game."
              intro="Most agents learn real estate from a textbook. I learned it by buying, renovating, renting, and running the numbers with my own money. That means sharper pricing, fewer surprises at inspection, and honest answers about what a property is really worth."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                My story <ArrowIcon className="size-4" />
              </Link>
              <a href={`tel:${site.phoneE164}`} className="btn-outline-light">
                <PhoneIcon className="size-4" /> {site.phone}
              </a>
            </div>
          </div>
          <InvestorEdge />
        </div>
      </Section>

      {/* SERVICES */}
      <Section>
        <SectionHeading
          eyebrow="How I can help"
          title="Buy, sell, invest, or lease. All property types."
          intro="Single-family, townhomes, condos, land, small multifamily, and rentals across Greater Houston."
        />
        <div className="mt-10">
          <ServicesGrid />
        </div>
      </Section>

      {/* FEATURED LISTINGS */}
      <Section tone="sand">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Featured listings" title="Homes I'm featuring right now" />
          <Link href="/buy#idx-search" className="font-semibold text-accent-dark hover:underline">
            Search all homes →
          </Link>
        </div>
        <div className="mt-10">
          <FeaturedListings />
        </div>
      </Section>

      {/* NEIGHBORHOODS */}
      <Section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Where I work"
            title="Explore Houston neighborhoods"
            intro="From the Heights to the suburbs: lifestyle, commutes, and what your money buys in each area."
          />
          <Link href="/neighborhoods" className="font-semibold whitespace-nowrap text-accent-dark hover:underline">
            All neighborhoods →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {neighborhoods.map((n) => (
            <NeighborhoodCard key={n.slug} n={n} />
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section tone="sand">
        <SectionHeading center eyebrow="Client stories" title="What clients say" />
        <div className="mt-10">
          <Testimonials />
        </div>
      </Section>

      {/* FREE GUIDE */}
      <Section tone="navy">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              eyebrow="Free download"
              title="The Houston Neighborhood Guide"
              intro="Compare 10 of the area's most popular neighborhoods and suburbs side by side: price ranges, commutes, schools to research, flood-zone tips, and what each area is best for."
            />
            <Link href="/guide" className="mt-6 inline-flex font-semibold text-accent hover:underline">
              See what&apos;s inside →
            </Link>
          </div>
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8">
            <GuideSignup dark />
          </div>
        </div>
      </Section>

      {/* BLOG */}
      <Section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Market updates & advice" title="From the blog" />
          <Link href="/blog" className="font-semibold text-accent-dark hover:underline">
            All posts →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section tone="sand" id="contact">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Let's talk"
              title="Tell me what you're working on."
              intro="Buying, selling, investing, or leasing, send me a quick note and I'll get back to you fast. Usually same day."
            />
            <div className="mt-8 space-y-2 text-lg">
              <a href={`tel:${site.phoneE164}`} className="block font-semibold text-navy hover:text-accent-dark">
                {site.phone}
              </a>
              {filled(site.email) && (
                <a href={`mailto:${site.email}`} className="block break-all text-muted hover:text-accent-dark">
                  {site.email}
                </a>
              )}
              <p className="pt-2 text-sm text-muted">{site.brokerage.name}</p>
            </div>
          </div>
          <div className="card-static p-6 sm:p-8 lg:col-span-3">
            <LeadForm formName="Home page contact" />
          </div>
        </div>
      </Section>
    </>
  );
}
