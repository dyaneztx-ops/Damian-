import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { CtaBand, InvestorEdge, Section, SectionHeading } from "@/components/Sections";
import { PhoneIcon } from "@/components/Icons";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata = pageMeta({
  title: `About ${site.agentName} | Houston REALTOR® & Real Estate Investor`,
  description: `Meet ${site.agentName}: a young Houston REALTOR®, entrepreneur, and real estate investor who has flipped a house, is renovating a second, and manages rentals.`,
  path: "/about",
  image: site.headshot,
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
            <Image src={site.headshot} alt={`${site.agentName}, Houston REALTOR®`} fill priority sizes="(min-width:1024px) 448px, 90vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow">About me</p>
            <h1 className="mt-3 font-display text-4xl leading-tight font-semibold text-navy sm:text-5xl">
              Hi, I&apos;m {site.agentFirstName}.
            </h1>
            <p className="mt-5 text-xl text-ink">
              I&apos;m a {site.title} in Houston, a young entrepreneur, and a hands-on real estate investor. I help people buy, sell,
              invest in, and lease property, using what I&apos;ve learned from doing it myself.
            </p>
            <p className="mt-4 text-sm text-muted">
              Licensed with {site.brokerage.name} · TX License #{site.licenseNumber}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`tel:${site.phoneE164}`} className="btn-dark">
                <PhoneIcon className="size-5" /> {site.phone}
              </a>
              <Link href="/contact" className="btn-outline">
                Send me a message
              </Link>
            </div>
            <SocialLinks dark className="mt-6" />
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy">
            <h2>My story</h2>
            <p>
              Not long ago, I was working as an In-Home Expert at AT&amp;T. I was good at it: sitting at people&apos;s kitchen
              tables, figuring out what they actually needed, and following through. Then my position was cut in a company
              surplus, and just like that, I was let go.
            </p>
            <p>
              It would have been easy to go find another job just like it. Instead, I decided to bet on myself. I&apos;d
              already bought homes of my own and I&apos;d always been drawn to real estate, so I went all in.
            </p>
            <h2>Why I got into real estate</h2>
            <p>
              I bought my first flip, built the rehab budget, managed the contractors, and sold it. That one project taught
              me more than any class could: how to read a house, what repairs really cost, which updates buyers will pay for,
              and why you run the numbers <em>before</em> you sign. Today I&apos;m in the middle of my second flip.
            </p>
            <p>
              Getting let go taught me something too: real security comes from ownership and skills, not a job title.
              I got my license so I could help other people build that same security, whether they&apos;re buying their
              first home, selling to move up, or buying their first investment property.
            </p>
            <h2>My investor background</h2>
            <ul>
              <li>Bought homes of my own, so I&apos;ve been in the buyer&apos;s seat</li>
              <li>Flipped my first house start to finish: purchase, rehab budget, contractors, and sale</li>
              <li>Currently renovating flip #2</li>
              <li>Own and manage rental properties, including pricing, leasing, and maintenance</li>
              <li>Analyze deals the same way for clients as I do for myself: cash flow, cap rate, cash-on-cash</li>
            </ul>
            <h2>My sales background</h2>
            <p>
              My time at AT&amp;T taught me that clear communication and fast follow-up build trust. I bring the same
              approach to every client: you&apos;ll always know what&apos;s happening and what comes next, and I&apos;ll
              negotiate hard on your behalf.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="navy">
        <SectionHeading light eyebrow="What that means for you" title="Experience you can use." />
        <div className="mt-10">
          <InvestorEdge />
        </div>
      </Section>

      <CtaBand title="Let's grab a coffee and talk real estate." text="Whether you're ready now or a year out, I'm happy to help you plan." />
    </>
  );
}
