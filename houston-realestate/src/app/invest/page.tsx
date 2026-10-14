import Link from "next/link";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { photos } from "@/config/photos";
import { CheckList, CtaBand, PageHero, Section, SectionHeading } from "@/components/Sections";
import { CashFlowCalculator } from "@/components/CashFlowCalculator";
import { LeadForm } from "@/components/LeadForm";
import { investorFields } from "@/components/formFields";
import { ChartIcon, KeyIcon, ToolIcon } from "@/components/Icons";

export const metadata = pageMeta({
  title: "Houston Investment Property Agent | Flips & Rentals",
  description: `Looking for Houston investment property? ${site.agentName} is an investor-agent who renovates, rents, and refinances property. Run cash flow, cap rate, and cash-on-cash numbers with the free calculator.`,
  path: "/invest",
});

const strategies = [
  {
    icon: ToolIcon,
    title: "Fix & flip",
    text: "Buy right, renovate smart, sell for profit. I help you estimate rehab budgets and after-repair value (ARV), and I know which upgrades Houston buyers pay for.",
  },
  {
    icon: KeyIcon,
    title: "Buy & hold rentals",
    text: "Single-family and small multifamily properties that cash flow. I own and manage rentals, so I know real rents, real expenses, and what tenants want.",
  },
  {
    icon: ChartIcon,
    title: "BRRRR & value-add",
    text: "Buy, rehab, rent, refinance, repeat. I'm doing one right now, so we'll stress-test the numbers to make sure the refinance and cash flow actually work.",
  },
];

export default function InvestPage() {
  return (
    <>
      <PageHero
        image={photos.investHero}
        eyebrow="Investor services"
        title="Your Houston investment property agent, who invests too."
        intro="I've renovated and rented out an investment property, I'm in the middle of a renovate, rent, and refinance right now, and I manage my own rentals. I'll help you find deals, run honest numbers, estimate rehab, and avoid the mistakes that cost new investors money."
      >
        <a href="#calculator" className="btn-primary">Run the numbers</a>
        <a href="#investor-intake" className="btn-outline-light">Tell me what you&apos;re looking for</a>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Strategies" title="Flips, rentals, and everything in between" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {strategies.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <span className="grid size-12 place-items-center rounded-xl bg-sand text-accent-dark">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Cash flow basics"
            title="The numbers that matter"
            intro="Every deal I look at, for myself or a client, gets the same checks. Here's what they mean."
          />
          <dl className="space-y-6">
            {[
              ["Cash flow", "Rent minus every expense: mortgage, taxes, insurance, HOA, vacancy, repairs, and management. If it's negative, you're paying to own it."],
              ["Cap rate", "Net operating income (before the mortgage) divided by price. It lets you compare properties regardless of how they're financed."],
              ["Cash-on-cash return", "Your yearly cash flow divided by the cash you actually put in (down payment, closing, and rehab). This is your return on your money."],
              ["Houston-specific costs", "Property taxes here are high, often 2–3% of value, and insurance and flood risk vary a lot by street. Never use national averages."],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className="text-lg font-semibold text-navy">{t}</dt>
                <dd className="mt-1 text-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="calculator">
        <SectionHeading
          eyebrow="Free tool"
          title="Rental cash-flow calculator"
          intro="Plug in a property's numbers to see monthly cash flow, cap rate, and cash-on-cash return. Want me to sanity-check a deal? Send it over."
        />
        <div className="mt-10">
          <CashFlowCalculator />
        </div>
        <p className="mt-6 text-sm text-muted">
          Want to see how I analyze a deal step by step?{" "}
          <Link href="/blog/how-i-evaluate-a-rental-property" className="font-semibold text-accent-dark hover:underline">
            Read: How I evaluate a rental property →
          </Link>
        </p>
      </Section>

      <Section tone="sand" id="investor-intake">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Investor intake"
              title="Tell me what you're looking for."
              intro="Share your strategy, budget, and target areas. I'll send deals that fit your criteria, including off-market opportunities when I find them."
            />
            <div className="mt-8">
              <CheckList
                items={["Deal analysis on any property you send me", "Rehab budget estimates", "Rent comps from real local data", "Help building your team: lenders, inspectors, contractors"]}
              />
            </div>
          </div>
          <div className="card-static p-6 sm:p-8 lg:col-span-3">
            <LeadForm formName="Investor intake" fields={investorFields} submitLabel="Send my investment criteria" />
          </div>
        </div>
      </Section>

      <CtaBand title="Found a deal? Let's run it together." text={`Text me the address at ${site.phone} and I'll take a look.`} />
    </>
  );
}
