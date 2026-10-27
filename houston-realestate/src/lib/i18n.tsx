"use client";

/**
 * Lightweight English / Spanish switch.
 * Turn it on with `features.spanishToggle: true` in src/config/site.ts.
 * Add or edit translations in the `dictionary` below. Any key without a
 * Spanish translation falls back to English.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "es";

const dictionary: Record<string, { en: string; es: string }> = {
  "nav.buy": { en: "Buy", es: "Comprar" },
  "nav.sell": { en: "Sell", es: "Vender" },
  "nav.invest": { en: "Invest", es: "Invertir" },
  "nav.lease": { en: "Lease", es: "Rentar" },
  "nav.neighborhoods": { en: "Neighborhoods", es: "Vecindarios" },
  "nav.about": { en: "About", es: "Sobre mí" },
  "nav.blog": { en: "Blog", es: "Blog" },
  "nav.homeValue": { en: "What's my home worth?", es: "¿Cuánto vale mi casa?" },
  "nav.contact": { en: "Contact", es: "Contacto" },
  "cta.call": { en: "Call", es: "Llamar" },
  "cta.text": { en: "Text", es: "Mensaje" },
  "cta.buy": { en: "I want to Buy", es: "Quiero Comprar" },
  "cta.sell": { en: "I want to Sell", es: "Quiero Vender" },
  "hero.title": {
    en: "The Woodlands & North Houston real estate, from an agent who invests too.",
    es: "Bienes raíces en The Woodlands y el norte de Houston, con un agente que también invierte.",
  },
  "hero.subtitle": {
    en: "I've bought, renovated, rented, and refinanced my own properties. Buying, selling, investing, or leasing, you get the real numbers before you decide.",
    es: "He comprado, remodelado, rentado y refinanciado mis propias propiedades. Ya sea que compre, venda, invierta o rente, tendrá los números reales antes de decidir.",
  },
  "form.send": { en: "Send message", es: "Enviar mensaje" },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "es" || saved === "en") setLangState(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* storage unavailable */
    }
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  const { lang } = useLang();
  return (key: string, fallback?: string) => dictionary[key]?.[lang] ?? dictionary[key]?.en ?? fallback ?? key;
}

/** Inline translated text: <T k="nav.buy" /> */
export function T({ k, children }: { k: string; children?: string }) {
  const t = useT();
  return <>{t(k, children)}</>;
}
