import Link from "next/link";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { CheckList, CtaBand, FeaturedListings, PageHero, Section, SectionHeading, Steps } from "@/components/Sections";
import { IdxSearch } from "@/components/IdxSearch";
import { LeadForm } from "@/components/LeadForm";

export const metadata = pageMeta({
  title: "Buy a Home in Houston | Buyer's Agent",
  description: `Buying a home in Houston? ${site.agentName} guides first-time and repeat buyers through search, offers, inspections, and closing, with an investor's eye for repair costs and value.`,
  path: "/buy",
});

const steps = [
  { title: "Strategy call", text: "We talk budget, must-haves, commute, schools, and timeline, and I explain how buying works in Texas, start to finish." },
  { title: "Get pre-approved", text: "A lender letter tells you your real budget and makes your offer stronger. I can connect you with trusted local lenders." },
  { title: "Search & tour", text: "I set up searches for new listings and tour with you, pointing out foundation, roof, drainage, and flood-risk red flags." },
  { title: "Write a winning offer", text: "We look at comps together, choose the right price, option period, and terms, and I negotiate on your behalf." },
  { title: "Inspect & negotiate repairs", text: "During your option period we inspect. I've renovated homes, so I can help you judge what repairs are really worth." },
  { title: "Close & get your keys", text: "I coordinate appraisal, title, survey, and final walk-through, and stay in touch long after closing day." },
];

export default function BuyPage() {
  return (
    <>
      <PageHero
        eyebrow="Buy with confidence"
        title="Find the right Houston home, and know what you're really buying."
        intro="I've bought homes myself and renovated others, so I look past the staging to the things that affect your wallet: the roof, the foundation, the flood history, and resale value."
      >
        <a href="#idx-search" className="btn-primary">Search homes</a>
        <Link href={site.preApprovalUrl} className="btn-outline-light">Get pre-approved</Link>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="The buying process" title="Six steps from first call to closing day" />
        <div className="mt-10">
          <Steps steps={steps} />
        </div>
      </Section>

      <Section tone="sand" id="first-time">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="First-time buyers"
              title="Buying your first home? I've been in your shoes."
              intro="Your first purchase comes with a lot of new words: earnest money, option period, MUD taxes, title commitment. I'll explain each one in plain English, and make sure you're never surprised."
            />
            <Link href="/blog/buying-your-first-home-in-houston" className="mt-6 inline-flex font-semibold text-accent-dark hover:underline">
              Read: Buying your first home in Houston →
            </Link>
          </div>
          <div className="card-static p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-navy">What first-time buyers should know in Houston</h3>
            <div className="mt-5">
              <CheckList
                items={[
                  "Down payment assistance programs may be available through the City of Houston, Harris County, and TDHCA. Ask your lender which ones you qualify for.",
                  "Property taxes (including MUD and PID taxes in many suburbs) can change your monthly payment a lot. We'll compare total tax rates, not just prices.",
                  "Check flood history and FEMA flood zones before you fall in love with a house.",
                  "Your option period is your chance to inspect and walk away. We'll use it wisely.",
                  "Closing costs typically run a few percent of the price. Sellers can sometimes help pay them.",
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Home search" title="Search Houston homes for sale" />
        <div className="mt-10">
          <IdxSearch />
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Featured" title="Featured homes" />
        <div className="mt-10">
          <FeaturedListings />
        </div>
      </Section>

      <Section id="pre-approval">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Get pre-approved"
              title="Know your number before you fall in love."
              intro="Tell me a bit about your plans and I'll connect you with a trusted local lender for a no-cost pre-approval, then start sending you homes that fit."
            />
          </div>
          <div className="card-static p-6 sm:p-8 lg:col-span-3">
            <LeadForm formName="Buyer / pre-approval" submitLabel="Start my home search" />
          </div>
        </div>
      </Section>

      <CtaBand title="Want a second opinion on a house?" text="Send me the listing. I'll tell you what I'd check and what I think it's worth." />
    </>
  );
}
