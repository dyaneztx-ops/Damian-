import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { photos } from "@/config/photos";
import { CheckList, CtaBand, PageHero, Section, SectionHeading, Steps } from "@/components/Sections";
import { LeadForm } from "@/components/LeadForm";
import { valuationFields } from "@/components/formFields";

export const metadata = pageMeta({
  title: "Sell Your Houston Home | Free Home Valuation",
  description: `Selling in Houston? Get a free home valuation and a marketing plan from ${site.agentName}, a Houston agent and investor who has renovated and sold property. Know what to fix and what to skip.`,
  path: "/sell",
});

const plan = [
  { title: "Pricing from real comps", text: "A detailed market analysis of recent nearby sales, adjusted for condition and upgrades, the way an investor prices a deal." },
  { title: "Prep plan with real costs", text: "I've renovated homes, so I'll tell you which fixes pay you back and which to skip, with ballpark costs." },
  { title: "Professional photos & video", text: "High-quality photography, plus video and floor plans when the home calls for it, so buyers stop scrolling." },
  { title: "Maximum exposure", text: "Houston MLS and HAR.com, syndication to major home-search sites, social media promotion, and outreach to agents and investors." },
  { title: "Fast follow-up & feedback", text: "Every showing gets followed up. You'll hear what buyers are saying every week, not when you have to chase me." },
  { title: "Strong negotiation to closing", text: "I compare offers on net proceeds and terms, not just price, and manage inspection, appraisal, and repairs to the finish." },
];

export default function SellPage() {
  return (
    <>
      <PageHero
        image={photos.sellHero}
        eyebrow="Sell for more, with less stress"
        title="Sell your Houston home with an agent who thinks like a buyer."
        intro="I've bought, renovated, and sold property myself. I know what buyers notice, what they'll pay for, and what's not worth your money before listing."
      >
        <a href="#valuation" className="btn-primary">What&apos;s my home worth?</a>
        <a href={`tel:${site.phoneE164}`} className="btn-outline-light">Call {site.phone}</a>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="My listing marketing plan" title="How I'll market your home" />
        <div className="mt-10">
          <Steps steps={plan} />
        </div>
      </Section>

      <Section tone="sand" id="valuation">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Free home valuation"
              title="What's your home worth?"
              intro="Online estimates can miss by tens of thousands of dollars because they can't see your upgrades or condition. I'll prepare a personal valuation based on real comparable sales. Free, no obligation."
            />
            <div className="mt-8">
              <CheckList
                items={[
                  "Personal comparative market analysis (CMA)",
                  "Suggested list price range",
                  "Estimated net proceeds",
                  "Which repairs or updates are worth doing",
                ]}
              />
            </div>
          </div>
          <div className="card-static p-6 sm:p-8 lg:col-span-3">
            <LeadForm
              formName="Home valuation"
              fields={valuationFields}
              submitLabel="Get my free valuation"
              successTitle="Got it! Your valuation is in the works."
              successText="I'll review recent sales near you and reach out within 1 business day."
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Seller tips"
            title="Get your home ready to sell"
            intro="Small, smart prep usually beats big renovations. Here's where I'd start."
          />
          <CheckList
            items={[
              "Declutter and depersonalize. Buyers need to picture their own life there.",
              "Fix the obvious: leaky faucets, broken blinds, missing outlet covers, sticking doors.",
              "Neutral paint and bright light bulbs make rooms feel bigger in photos.",
              "Service the HVAC and keep the receipt. Houston buyers always ask about the AC.",
              "Gather documents: survey, HOA info, warranties, repair receipts, and any flood or insurance history.",
              "Boost curb appeal: fresh mulch, trimmed shrubs, a clean front door and walkway.",
              "Consider a pre-listing inspection on older homes so there are no surprises in the option period.",
            ]}
          />
        </div>
      </Section>

      <CtaBand title="Not sure whether to sell, rent it out, or renovate?" text="As an investor and landlord, I can run the numbers on all three options with you." />
    </>
  );
}
