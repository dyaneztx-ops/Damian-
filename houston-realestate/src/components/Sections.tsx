import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { photos } from "@/config/photos";
import { SmartImage } from "./SmartImage";
import { listings, type Listing } from "@/data/listings";
import { testimonials } from "@/data/testimonials";
import type { Neighborhood } from "@/lib/content";
import { ArrowIcon, ChartIcon, CheckIcon, HandshakeIcon, HomeIcon, KeyIcon, PhoneIcon, TagIcon, ToolIcon } from "./Icons";

/* ---------- Layout helpers ---------- */

export function Section({
  children,
  className = "",
  id,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "sand" | "navy";
}) {
  const bg = tone === "sand" ? "bg-sand" : tone === "navy" ? "bg-navy text-white" : "bg-white";
  return (
    <section id={id} className={`${bg} py-16 sm:py-24 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${light ? "!text-accent" : ""}`}>{eyebrow}</p>}
      <h2 className={`h2 mt-3 ${light ? "!text-white" : ""}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg ${light ? "text-slate-300" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

/** Banner at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image = photos.pageHero,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      <SmartImage src={image} fallback="/images/hero-houston.svg" alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />
      <div className="container-x py-16 sm:py-24">
        <p className="eyebrow !text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight font-semibold text-white sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-200">{intro}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Ready to talk through your next move?",
  text = "No pressure, no scripts. Just a straight conversation about your goals and the numbers.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-accent">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-3xl font-semibold text-navy-deep">{title}</h2>
          <p className="mt-2 max-w-2xl text-navy-deep/85">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={`tel:${site.phoneE164}`} className="btn-dark">
            <PhoneIcon className="size-5" /> {site.phone}
          </a>
          <Link href="/contact" className="btn border-2 border-navy-deep text-navy-deep hover:bg-navy-deep hover:text-white">
            Send a message
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <CheckIcon className="mt-0.5 size-5 shrink-0 text-accent" />
          <span className={light ? "text-slate-200" : "text-ink"}>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="card p-6">
          <span className="grid size-10 place-items-center rounded-full bg-navy font-semibold text-accent">{i + 1}</span>
          <h3 className="mt-4 text-lg font-semibold text-navy">{s.title}</h3>
          <p className="mt-2 text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Home page blocks ---------- */

export function TrustBar() {
  return (
    <div className="relative z-10 -mt-12 sm:-mt-14">
      <div className="container-x">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/5 shadow-xl ring-1 ring-black/5 lg:grid-cols-4">
          {site.trustBar.map((s) => (
            <div key={s.label} className="bg-white px-5 py-6 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-2xl font-semibold text-navy sm:text-3xl">{s.value}</dd>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

const services = [
  {
    icon: HomeIcon,
    title: "Buy",
    href: "/buy",
    text: "From first-time buyers to move-up buyers: search, tour, negotiate, inspect, close. I'll flag the repair costs most buyers miss.",
  },
  {
    icon: TagIcon,
    title: "Sell",
    href: "/sell",
    text: "Pricing backed by real comps, prep advice from someone who's renovated, and marketing built to get you the strongest offer.",
  },
  {
    icon: ChartIcon,
    title: "Invest",
    href: "/invest",
    text: "Flips, rentals, and small multifamily. I run the numbers on every deal: rehab budget, rent, cash flow, cap rate, and cash-on-cash.",
  },
  {
    icon: KeyIcon,
    title: "Lease",
    href: "/lease",
    text: "Tenants find the right rental fast. Landlords get pricing, screening, and lease-up from an agent who's a landlord too.",
  },
];

export function ServicesGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.map(({ icon: Icon, title, href, text }) => (
        <Link key={title} href={href} className="card group flex flex-col p-6">
          <span className="grid size-12 place-items-center rounded-xl bg-sand text-accent-dark transition group-hover:bg-accent group-hover:text-navy-deep">
            <Icon className="size-6" />
          </span>
          <h3 className="mt-5 text-xl font-semibold text-navy">{title}</h3>
          <p className="mt-2 flex-1 text-muted">{text}</p>
          <span className="mt-5 inline-flex items-center gap-1 font-semibold text-accent-dark">
            Learn more <ArrowIcon className="size-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export const investorEdge = [
  {
    icon: HomeIcon,
    title: "I've been the buyer",
    text: "I've bought homes twice myself. I know the stress, the paperwork, and the questions you'll have at 11pm.",
  },
  {
    icon: ToolIcon,
    title: "I'm in the renovations",
    text: "I've renovated and rented out an investment property, and I'm in the middle of my next renovate, rent, and refinance. I can walk a property and tell you what repairs really cost and which ones matter.",
  },
  {
    icon: KeyIcon,
    title: "I manage my own rentals",
    text: "I'm a landlord. I price rentals, screen tenants, and handle maintenance on my own properties, so my advice is practical.",
  },
  {
    icon: HandshakeIcon,
    title: "Sales & follow-up are my background",
    text: "4.5 years in sales, ranked among my company's top performers, taught me to listen, communicate clearly, follow up fast, and negotiate with confidence.",
  },
];

export function InvestorEdge() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {investorEdge.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-navy-deep">
            <Icon className="size-6" />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-1 text-slate-300">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Listings ---------- */

export const listingDisclaimer =
  "Information deemed reliable but not guaranteed. All listing information, including square footage, is approximate and should be independently verified. Listings may be subject to prior sale, price change, or withdrawal.";

export function ListingCard({ l }: { l: Listing }) {
  const external = l.link.startsWith("http");
  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image src={l.photo} alt={`Photo of ${l.address}, ${l.city}`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
        <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy shadow">{l.status}</span>
      </div>
      <div className="p-5">
        <p className="font-display text-2xl font-semibold text-navy">{l.price}</p>
        <h3 className="mt-1 font-medium text-ink">{l.address}</h3>
        <p className="text-sm text-muted">{l.city}</p>
        <p className="mt-3 flex gap-4 border-t border-slate-100 pt-3 text-sm text-muted">
          <span>
            <b className="text-ink">{l.beds}</b> bd
          </span>
          <span>
            <b className="text-ink">{l.baths}</b> ba
          </span>
          <span>
            <b className="text-ink">{l.sqft.toLocaleString()}</b> sqft
          </span>
        </p>
        <a
          href={l.link}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="mt-4 inline-flex items-center gap-1 font-semibold text-accent-dark hover:underline"
        >
          View details <ArrowIcon className="size-4" />
        </a>
      </div>
    </article>
  );
}

export function FeaturedListings() {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => (
          <ListingCard key={l.address} l={l} />
        ))}
      </div>
      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-xs text-muted">{listingDisclaimer}</p>
        <a href={site.harSearchUrl} target="_blank" rel="noopener noreferrer" className="btn-outline shrink-0">
          Search all Houston homes
        </a>
      </div>
    </>
  );
}

/* ---------- Neighborhoods ---------- */

export function NeighborhoodCard({ n }: { n: Neighborhood }) {
  return (
    <Link href={`/neighborhoods/${n.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[3/4]">
      <SmartImage
        src={n.image}
        fallback={`/images/neighborhoods/${n.slug}.svg`}
        alt={`${n.name}, Texas`}
        fill
        sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-2xl font-semibold text-white">{n.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-200">{n.description}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
          Explore homes <ArrowIcon className="size-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/* ---------- Testimonials ---------- */

export function Testimonials() {
  if (testimonials.length === 0) {
    // Placeholder shown until real reviews are added in src/data/testimonials.ts
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border-2 border-dashed border-accent/50 bg-white p-8 text-center sm:p-12">
        <p className="font-display text-2xl text-navy">Client stories coming soon.</p>
        <p className="mt-3 text-muted">
          I&apos;m building my business one client at a time, and every review here will be real. Want to be one of the
          first? I&apos;ll work twice as hard to earn it.
        </p>
        {site.harProfileUrl && (
          <a href={site.harProfileUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex font-semibold text-accent-dark hover:underline">
            See my HAR.com profile →
          </a>
        )}
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <figure key={t.name + t.quote.slice(0, 10)} className="card flex flex-col p-6">
          <p aria-hidden="true" className="font-display text-5xl leading-none text-accent">
            &ldquo;
          </p>
          <blockquote className="flex-1 text-ink">{t.quote}</blockquote>
          <figcaption className="mt-5 border-t border-slate-100 pt-4">
            <p className="font-semibold text-navy">{t.name}</p>
            <p className="text-sm text-muted">{t.detail}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
