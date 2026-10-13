import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { CheckList, CtaBand, PageHero, Section, SectionHeading, Steps } from "@/components/Sections";
import { LeadForm } from "@/components/LeadForm";
import { landlordFields, tenantFields } from "@/components/formFields";

export const metadata = pageMeta({
  title: "Houston Leasing Agent | Rentals for Tenants & Landlords",
  description: `Find a Houston rental home or lease out your property with ${site.agentName}, a REALTOR® who owns and manages rentals. Rent pricing, tenant screening, and lease-up.`,
  path: "/lease",
});

export default function LeasePage() {
  return (
    <>
      <PageHero
        eyebrow="Leasing & landlord services"
        title="Renting in Houston? Leasing out a property? I do both sides."
        intro="As a landlord myself, I know what makes a lease go smoothly for everyone. Tenants get help finding the right home fast. Owners get accurate rent pricing and quality tenants."
      >
        <a href="#tenants" className="btn-primary">I&apos;m looking to rent</a>
        <a href="#landlords" className="btn-outline-light">I&apos;m a landlord</a>
      </PageHero>

      <Section id="tenants">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="For tenants"
              title="Find your next rental, without the runaround."
              intro="Most Houston rental homes are listed on the MLS, and as a tenant my help usually costs you nothing (the owner typically pays the leasing fee)."
            />
            <div className="mt-8">
              <CheckList
                items={[
                  "Alerts for new rentals that match your budget and areas",
                  "Tours on your schedule, including evenings and weekends",
                  "Help with applications, so you put your best foot forward",
                  "Lease review in plain English before you sign",
                ]}
              />
            </div>
          </div>
          <div className="card-static p-6 sm:p-8 lg:col-span-3">
            <LeadForm formName="Tenant search" fields={tenantFields} submitLabel="Help me find a rental" />
          </div>
        </div>
      </Section>

      <Section tone="sand" id="landlords">
        <SectionHeading
          eyebrow="For landlords"
          title="Lease your property like an owner would."
          intro="I own and manage rentals, so I treat your property the way I treat mine: priced right, marketed well, and leased to a qualified tenant."
        />
        <div className="mt-10">
          <Steps
            steps={[
              { title: "Rent pricing", text: "A rental analysis using recent leased comps, so you don't sit vacant or leave money on the table." },
              { title: "Make-ready advice", text: "What to fix before move-in to attract better tenants and avoid costly turnovers." },
              { title: "Marketing", text: "Professional photos and MLS / HAR.com exposure, where Houston renters actually search." },
              { title: "Screening", text: "Consistent, fair-housing-compliant screening: income, rental history, credit, and background." },
              { title: "Lease & move-in", text: "TAR residential lease, move-in condition report, and keys handed over cleanly." },
              { title: "Ongoing support", text: "Questions on renewals, rent increases, or selling later? As a fellow landlord, I'm a phone call away." },
            ]}
          />
        </div>
        <p className="mt-6 text-sm text-muted">
          [OPTIONAL: Ongoing property management availability depends on your brokerage. Edit this line to reflect the
          services {site.brokerage.name} offers.]
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Landlord intake" title="Tell me about your property." intro="I'll follow up with a rent estimate and a plan to get it leased." />
          </div>
          <div className="card-static p-6 sm:p-8 lg:col-span-3">
            <LeadForm formName="Landlord intake" fields={landlordFields} submitLabel="Get my rent estimate" />
          </div>
        </div>
      </Section>

      <CtaBand title="Thinking about turning your home into a rental?" text="I'll compare renting vs. selling with real numbers so you can decide with confidence." />
    </>
  );
}
