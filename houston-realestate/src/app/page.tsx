import { testimonials } from "@/data/testimonials";
import Link from "next/link";
import Image from "next/image";
import { filled, site } from "@/config/site";
import { listings } from "@/data/listings";
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
import { ArrowIcon, ChatIcon, PhoneIcon } from "@/components/Icons";
import { SmartImage } from "@/components/SmartImage";

export const metadata = pageMeta({
  title: `The Woodlands & Spring Realtor, Investor-Agent | ${site.agentName}`,
  description: `Looking for a real estate agent in The Woodlands, Spring, or North Houston who actually invests? ${site.agentName} (Keller Williams Realty The Woodlands) helps you buy, sell, invest, and lease. Call or text ${site.phone}.`,
  path: "/",
});

export default function HomePage() {
  const allNeighborhoods = getNeighborhoods();
  const areaCount = allNeighborhoods.length;
  const neighborhoods = allNeighborhoods.slice(0, 8);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <SmartImage
          src={site.heroImage}
          fallback="/images/hero-houston.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-navy-deep/30" />
        <div className="container-x grid items-center gap-10 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full ring-2 ring-accent lg:hidden">
                <Image src={site.headshot} alt={`${site.agentName}, REALTOR®`} fill priority sizes="64px" className="object-cover object-top" />
              </div>
              <p className="eyebrow !text-accent">
                {site.agentName} · REALTOR® · {site.brokerage.name}
              </p>
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] font-semibold text-white sm:text-6xl">
              <T k="hero.title">The Woodlands &amp; North Houston real estate, from an agent who invests too.</T>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl">
              <T k="hero.subtitle">
                I&apos;ve bought, renovated, rented, and refinanced my own properties. Buying, selling, investing, or
                leasing, you get the real numbers before you decide.
              </T>
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/home-value" className="btn-primary whitespace-nowrap !px-6 !py-4 sm:!px-8 sm:!text-lg">
                <T k="nav.homeValue">What&apos;s my home worth?</T>
              </Link>
              <a href={`sms:${site.phoneE164}`} className="btn-outline-light whitespace-nowrap !px-6 !py-4 sm:!px-8 sm:!text-lg">
                <ChatIcon className="size-5" /> Call or text Damian
              </a>
            </div>
            <p className="mt-6 text-sm text-slate-300">
              Looking to{" "}
              <Link href="/buy" className="font-semibold text-white underline underline-offset-4">buy</Link>,{" "}
              <Link href="/invest" className="font-semibold text-white underline underline-offset-4">invest</Link>, or{" "}
              <Link href="/lease" className="font-semibold text-white underline underline-offset-4">lease</Link>?
            </p>
          </div>
          <div className="relative hidden aspect-[4/5] w-80 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15 lg:block xl:w-96">
            <Image src={site.headshot} alt={`${site.agentName}, REALTOR® with ${site.brokerage.name}`} fill priority sizes="384px" className="object-cover object-top" />
          </div>
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

      {/* FEATURED LISTINGS (hidden until you add listings in src/data/listings.ts) */}
      {listings.length > 0 && (
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
      )}

      {/* NEIGHBORHOODS */}
      <Section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Where I work"
            title="North Houston neighborhoods"
            intro="Based in The Woodlands area, serving Montgomery County, northwest Harris County, and Greater Houston: lifestyle, commutes, and what your money buys in each area."
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

      {/* TESTIMONIALS (hidden until real reviews are added in src/data/testimonials.ts) */}
      {testimonials.length > 0 && (
        <Section tone="sand">
          <SectionHeading center eyebrow="Client stories" title="What clients say" />
          <div className="mt-10">
            <Testimonials />
          </div>
        </Section>
      )}

      {/* FREE GUIDE */}
      <Section tone="navy">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              eyebrow="Free download"
              title="The Houston Neighborhood Guide"
              intro={`Compare ${areaCount} of the area's most popular neighborhoods and suburbs side by side: lifestyle, getting around, an investor's take on each, and the 5 things to check on every Houston home.`}
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
              title="Let's grab a coffee. I'll bring the comps."
              intro="Recent sales, real numbers, and a straight answer on what a home is worth. Coffee's on me. Send a quick note and I'll get back to you fast, usually same day."
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
