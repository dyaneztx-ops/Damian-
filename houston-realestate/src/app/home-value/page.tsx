import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { CheckList, PageHero, Section } from "@/components/Sections";
import { LeadForm } from "@/components/LeadForm";
import { valuationFields } from "@/components/formFields";

export const metadata = pageMeta({
  title: "What's My Home Worth? Free Houston Home Valuation",
  description: `Get a free, personal home valuation from ${site.agentName}, a Houston REALTOR® and investor. Based on real comparable sales, not an algorithm.`,
  path: "/home-value",
});

export default function HomeValuePage() {
  return (
    <>
      <PageHero
        eyebrow="Free home valuation"
        title="What's my home worth?"
        intro="Get a personal valuation from a local agent who has bought, renovated, and sold property, based on real comparable sales, your upgrades, and your home's condition."
      />
      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="h2">Here&apos;s what you&apos;ll get</h2>
            <div className="mt-6">
              <CheckList
                items={[
                  "A comparative market analysis using recent nearby sales",
                  "A realistic list-price range for today's market",
                  "Estimated net proceeds after costs",
                  "Investor-eye advice on what's worth fixing before you sell",
                  "No obligation and no pressure",
                ]}
              />
            </div>
            <p className="mt-8 text-sm text-muted">
              Prefer to talk? Call or text{" "}
              <a className="font-semibold text-navy underline" href={`tel:${site.phoneE164}`}>
                {site.phone}
              </a>
              .
            </p>
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
    </>
  );
}
