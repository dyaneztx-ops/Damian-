import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: `Privacy policy for ${site.brandName}: how we collect, use, and protect your information.`,
  path: "/privacy",
});

const updated = "[EFFECTIVE DATE]";

export default function PrivacyPage() {
  return (
    <div className="container-x max-w-3xl py-16 sm:py-24">
      <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy">
        <h1>Privacy Policy</h1>
        <p><em>Last updated: {updated}</em></p>
        <p>
          [TEMPLATE: have this reviewed by your broker or an attorney before launch.] This Privacy Policy explains how{" "}
          {site.agentName}, a real estate sales agent with {site.brokerage.name} (&ldquo;we,&rdquo; &ldquo;us&rdquo;), collects,
          uses, and protects information when you use this website.
        </p>
        <h2>Information we collect</h2>
        <ul>
          <li><strong>Information you give us</strong>: your name, email, phone number, property address, and anything you write in a form.</li>
          <li><strong>Usage information</strong>: pages visited, device and browser type, and general location, collected through cookies and analytics tools such as Google Analytics and Meta Pixel (when enabled).</li>
        </ul>
        <h2>How we use it</h2>
        <ul>
          <li>To respond to your questions and provide real estate services you request</li>
          <li>To send listings, market updates, and the resources you asked for</li>
          <li>To contact you by phone, text message, or email if you gave consent</li>
          <li>To improve this website and measure our advertising</li>
          <li>To comply with legal and brokerage record-keeping obligations</li>
        </ul>
        <h2>Text messages (SMS)</h2>
        <p>
          If you consent to receive text messages, message frequency varies and message and data rates may apply. Reply STOP
          to opt out at any time or HELP for help. Consent to receive calls or texts is not a condition of buying or selling
          property or any service. <strong>We do not sell, rent, or share your mobile number or SMS opt-in consent with third
          parties or affiliates for their marketing purposes.</strong>
        </p>
        <h2>How we share information</h2>
        <p>
          We do not sell your personal information. We may share it with our brokerage ({site.brokerage.name}), service
          providers who help us operate this site and deliver email (for example, our form and email providers), and with
          professionals involved in your transaction (such as lenders, title companies, or other agents) only when you ask us
          to or when needed to provide our services, or when required by law.
        </p>
        <h2>Cookies & analytics</h2>
        <p>
          You can block or delete cookies in your browser settings. You can opt out of Google Analytics at
          tools.google.com/dlpage/gaoptout and manage ad preferences through your Meta account settings.
        </p>
        <h2>Data security & retention</h2>
        <p>
          We use reasonable safeguards to protect your information, but no website is 100% secure. We keep information only as
          long as needed for the purposes above or as required by law and brokerage policy.
        </p>
        <h2>Your choices</h2>
        <p>
          You may ask us to access, correct, or delete your information, or to stop contacting you, by emailing{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> or calling {site.phone}.
        </p>
        <h2>Children</h2>
        <p>This website is not directed to children under 13, and we do not knowingly collect their information.</p>
        <h2>Contact</h2>
        <p>
          {site.agentName}, {site.brokerage.name}, {site.brokerage.address}. Phone: {site.phone}. Email: {site.email}.
        </p>
      </article>
    </div>
  );
}
