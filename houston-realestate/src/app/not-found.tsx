import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-navy">This page moved out.</h1>
      <p className="mt-4 text-muted">Let&apos;s get you back home.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/contact" className="btn-outline">Contact</Link>
      </div>
    </div>
  );
}
