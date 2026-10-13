import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { PageHero, Section } from "@/components/Sections";
import { LeadForm } from "@/components/LeadForm";
import { SocialLinks } from "@/components/SocialLinks";
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";

export const metadata = pageMeta({
  title: "Contact a Houston Real Estate Agent",
  description: `Contact ${site.agentName}, Houston REALTOR® and investor. Call or text ${site.phone} or send a message about buying, selling, investing, or leasing.`,
  path: "/contact",
});

export default function ContactPage() {
  const items = [
    { icon: PhoneIcon, label: "Call", value: site.phone, href: `tel:${site.phoneE164}` },
    { icon: ChatIcon, label: "Text", value: site.phone, href: `sms:${site.phoneE164}` },
    { icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: PinIcon, label: "Service area", value: site.serviceAreaText },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your next move." intro="Call, text, or send a message. I usually reply the same day." />
      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {items.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy text-accent">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{label}</span>
                    <span className="block font-semibold break-words text-navy">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a key={label} href={href} className="card flex items-center gap-4 p-5">
                  {inner}
                </a>
              ) : (
                <div key={label} className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
                  {inner}
                </div>
              );
            })}
            <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <p className="text-sm text-muted">Brokerage</p>
              <p className="font-semibold text-navy">{site.brokerage.name}</p>
              <p className="text-sm text-muted">{site.brokerage.address}</p>
              <p className="text-sm text-muted">{site.brokerage.phone}</p>
              <SocialLinks dark className="mt-4" />
            </div>
          </div>
          <div className="card-static p-6 sm:p-8 lg:col-span-3">
            <h2 className="mb-6 font-display text-2xl font-semibold text-navy">Send me a message</h2>
            <LeadForm formName="Contact page" />
          </div>
        </div>
      </Section>
    </>
  );
}
