import { filled, site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of Use",
  description: `Terms of use for the ${site.brandName} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="container-x max-w-3xl py-16 sm:py-24">
      <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy">
        <h1>Terms of Use</h1>
        <p><em>Last updated: [EFFECTIVE DATE]</em></p>
        <p>
          [TEMPLATE: have this reviewed by your broker or an attorney before launch.] By using this website you agree to these
          terms. If you don&apos;t agree, please don&apos;t use the site.
        </p>
        <h2>Real estate services</h2>
        <p>
          {site.agentName} is a licensed Texas real estate sales agent (License #{site.licenseNumber}) sponsored by{" "}
          {site.brokerage.name}
          {filled(site.brokerage.licenseNumber) && ` (License #${site.brokerage.licenseNumber})`}. Contacting us through this site does not create an
          agency relationship. An agency relationship is created only by a written agreement. Please review the Texas Real
          Estate Commission <a href={site.brokerage.iabsUrl}>Information About Brokerage Services</a> and{" "}
          <a href={site.trecConsumerProtectionUrl}>Consumer Protection Notice</a>.
        </p>
        <h2>Listing information</h2>
        <p>
          Property information on this site is deemed reliable but not guaranteed. Listings may be subject to prior sale,
          price changes, errors, omissions, or withdrawal without notice. Square footage, school information, and other
          details are approximate and should be independently verified.
        </p>
        <h2>Calculators & articles</h2>
        <p>
          Calculators, articles, and guides are for general educational purposes only and are not legal, tax, lending, or
          financial advice. Consult the appropriate licensed professional before making decisions.
        </p>
        <h2>Fair housing</h2>
        <p>
          We are committed to the letter and spirit of federal, state, and local fair housing laws and do not discriminate on
          the basis of race, color, religion, sex, disability, familial status, national origin, or any other protected class.
        </p>
        <h2>Third-party links</h2>
        <p>This site links to third-party websites such as HAR.com. We are not responsible for their content or practices.</p>
        <h2>Intellectual property</h2>
        <p>Content on this site belongs to {site.brandName} or its licensors and may not be copied without permission.</p>
        <h2>Limitation of liability</h2>
        <p>
          This site is provided &ldquo;as is.&rdquo; To the fullest extent allowed by law, we are not liable for damages
          arising from your use of the site.
        </p>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the State of Texas.</p>
        <h2>Contact</h2>
        <p>
          Questions?{" "}
          {filled(site.email) && (
            <>
              Email <a href={`mailto:${site.email}`}>{site.email}</a> or{" "}
            </>
          )}
          call {site.phone}.
        </p>
      </article>
    </div>
  );
}
