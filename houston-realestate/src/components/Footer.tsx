import Link from "next/link";
import { site } from "@/config/site";
import { getNeighborhoods } from "@/lib/content";
import { SocialLinks } from "./SocialLinks";

export function EqualHousingLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Equal Housing Opportunity">
      <path d="M32 6 4 26h7v30h42V26h7z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <rect x="21" y="32" width="22" height="5" fill="currentColor" />
      <rect x="21" y="42" width="22" height="5" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const areas = getNeighborhoods().slice(0, 10);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep pb-24 text-slate-300 lg:pb-0">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold text-white">{site.agentName}</p>
          <p className="mt-1 text-sm">
            {site.title} · TX License #{site.licenseNumber}
          </p>
          <p className="mt-3 text-sm">
            Brokered by <span className="font-semibold text-white">{site.brokerage.name}</span>
          </p>
          <p className="mt-4 space-y-1 text-sm">
            <a className="block hover:text-white" href={`tel:${site.phoneE164}`}>
              {site.phone}
            </a>
            <a className="block break-all hover:text-white" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <SocialLinks className="mt-5" />
        </div>

        <div>
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-4 space-y-1 text-sm">
            {[
              ["/buy", "Buy a home"],
              ["/sell", "Sell your home"],
              ["/home-value", "What's my home worth?"],
              ["/invest", "Investment property"],
              ["/lease", "Leasing & landlords"],
              ["/guide", "Free neighborhood guide"],
              ["/blog", "Blog & market updates"],
              ["/about", "About Damian"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link className="inline-block py-1 hover:text-white" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Areas served</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm lg:grid-cols-1">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link className="inline-block py-1 hover:text-white" href={`/neighborhoods/${a.slug}`}>
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Texas real estate notices</p>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <a className="underline underline-offset-2 hover:text-white" href={site.brokerage.iabsUrl} target="_blank" rel="noopener noreferrer">
                Texas Real Estate Commission Information About Brokerage Services
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-white" href={site.trecConsumerProtectionUrl} target="_blank" rel="noopener noreferrer">
                Texas Real Estate Commission Consumer Protection Notice
              </a>
            </li>
          </ul>
          <div className="mt-6 flex items-start gap-3">
            <EqualHousingLogo className="size-12 shrink-0 text-white" />
            <p className="text-xs leading-relaxed">
              Equal Housing Opportunity. {site.brokerage.name} and {site.agentName} are committed to compliance with the
              Fair Housing Act and do not discriminate on any protected basis.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs leading-relaxed md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.brandName}. {site.agentName}, REALTOR®, TX License #{site.licenseNumber}. Brokerage:{" "}
            {site.brokerage.name}, License #{site.brokerage.licenseNumber}, {site.brokerage.address}, {site.brokerage.phone}.
            Information deemed reliable but not guaranteed.
          </p>
          <p className="flex shrink-0 gap-4">
            <Link className="hover:text-white" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-white" href="/terms">
              Terms of Use
            </Link>
            <Link className="hover:text-white" href="/sitemap.xml">
              Sitemap
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
