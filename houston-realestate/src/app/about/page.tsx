import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { CheckList, CtaBand, Section } from "@/components/Sections";
import { ChatIcon, CoffeeIcon, PhoneIcon } from "@/components/Icons";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata = pageMeta({
  title: `About ${site.agentName} | Houston REALTOR® & Real Estate Investor`,
  description: `Meet ${site.agentName}: a young Houston REALTOR®, entrepreneur, and real estate investor who renovates, rents, and refinances investment property.`,
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
          <figure className="border-l-4 border-accent pl-6 sm:pl-8">
            <blockquote className="font-display text-3xl leading-snug font-semibold text-navy sm:text-4xl">
              &ldquo;The best time to start building wealth is the day you decide to.&rdquo;
            </blockquote>
          </figure>

          <div className="prose prose-lg mt-12 max-w-none prose-headings:font-display prose-headings:text-navy">
            <h2>My story</h2>
            <p>
              I got into sales at 19. For four and a half years I put in the work every day, consistently beat
              expectations, and earned a spot among the company&apos;s top-ranked salespeople. Along the way I started real
              estate school, and a few months before everything changed, I bought my first investment property, renovated it,
              and rented it out.
            </p>
            <p>
              Then I was let go. No warning, no notice, for reasons completely out of my control. That rental is what kept
              me afloat while I finished real estate school, and right after the layoff I closed on my next property. I&apos;m
              renovating it now to rent out and refinance, because I knew nothing was going to stop me.
            </p>
            <p>
              So I bet on myself. Now I&apos;m building my own book of business and helping people use real estate to build
              something of their own: a first home, a bigger next home, or their first step into investing.
            </p>
            <h2>What I bring to the table</h2>
          </div>
          <div className="mt-6">
            <CheckList
              items={[
                "Renovated and rented out my first investment property, and I'm in the middle of a renovate, rent, and refinance (BRRRR) now",
                "A rental I own and manage, so I know pricing, leasing, and maintenance firsthand",
                "I've bought homes myself, so I've been in the buyer's seat",
                "4.5 years as a top-ranked salesperson: clear communication, fast follow-up, and hard negotiation",
                "I run the numbers for every client the same way I do for myself",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:flex-row sm:p-10">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-navy text-accent">
            <CoffeeIcon className="size-7" />
          </span>
          <div>
            <p className="eyebrow">Off the clock</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy">Coffee lover and foodie.</h2>
            <p className="mt-3 text-lg text-muted">
              When I&apos;m not looking at houses, I&apos;m probably trying a new restaurant or coffee shop. I&apos;ve eaten and
              sipped my way across Greater Houston, from The Woodlands to Pearland.
            </p>
            <p className="mt-4 text-lg font-semibold text-navy">
              Need a spot to grab a bite or a great cup of coffee? Ask me. I always have a recommendation.
            </p>
            <a href={`sms:${site.phoneE164}`} className="btn-dark mt-6">
              <ChatIcon className="size-5" /> Text me for a recommendation
            </a>
          </div>
        </div>
      </Section>

      <CtaBand title="Let's grab a coffee and talk real estate." text="Whether you're ready now or a year out, I'm happy to help you plan." />
    </>
  );
}
