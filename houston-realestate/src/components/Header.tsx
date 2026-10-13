"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/config/site";
import { T, useLang } from "@/lib/i18n";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

function Logo() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3">
      {site.logo ? (
        <Image src={site.logo} alt={site.brandName} width={160} height={40} className="h-10 w-auto" priority />
      ) : (
        <>
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy font-display text-lg font-bold text-accent">
            DY
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg font-semibold text-navy">{site.agentName}</span>
            {/* Brokerage name shown alongside the agent name (TREC advertising rule) */}
            <span className="line-clamp-2 block text-xs leading-snug text-muted">REALTOR® · {site.brokerage.name}</span>
          </span>
        </>
      )}
    </Link>
  );
}

function LangToggle() {
  const { lang, setLang } = useLang();
  if (!site.features.spanishToggle) return null;
  return (
    <div className="flex rounded-full border border-slate-300 p-0.5 text-xs font-semibold" role="group" aria-label="Language">
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase ${lang === l ? "bg-navy text-white" : "text-navy"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-[15px] font-medium transition hover:bg-sand hover:text-navy ${
                isActive(l.href) ? "text-accent-dark" : "text-ink"
              }`}
            >
              <T k={l.key}>{l.label}</T>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
          <a
            href={`tel:${site.phoneE164}`}
            className="hidden items-center gap-2 rounded-full px-3 py-2 font-semibold text-navy hover:bg-sand sm:flex"
          >
            <PhoneIcon className="size-4 text-accent-dark" />
            {site.phone}
          </a>
          <Link href="/home-value" className="btn-primary hidden !px-4 !py-2.5 !text-sm lg:inline-flex">
            <T k="nav.homeValue">What&apos;s my home worth?</T>
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-navy hover:bg-sand xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-white xl:hidden">
          <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="rounded-xl px-4 py-3 text-lg font-medium text-navy hover:bg-sand"
              >
                <T k={l.key}>{l.label}</T>
              </Link>
            ))}
            <Link href="/contact" className="rounded-xl px-4 py-3 text-lg font-medium text-navy hover:bg-sand">
              <T k="nav.contact">Contact</T>
            </Link>
            <Link href="/home-value" className="btn-primary mt-4">
              <T k="nav.homeValue">What&apos;s my home worth?</T>
            </Link>
            <a href={`tel:${site.phoneE164}`} className="btn-outline mt-2">
              <PhoneIcon className="size-5" /> {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
