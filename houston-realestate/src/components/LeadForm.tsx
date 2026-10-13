"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { site } from "@/config/site";
import { trackLead } from "@/lib/track";
import { CheckIcon } from "./Icons";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  autoComplete?: string;
  /** "half" puts two fields side by side on larger screens */
  width?: "full" | "half";
};

export const contactFields: Field[] = [
  { name: "name", label: "Full name", required: true, autoComplete: "name", width: "half" },
  { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", width: "half" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  {
    name: "interest",
    label: "I'm interested in…",
    type: "select",
    required: true,
    options: ["Buying", "Selling", "Renting / leasing a home", "Leasing out my property", "Investing", "Something else"],
  },
  { name: "message", label: "Message", type: "textarea", placeholder: "Tell me a little about what you're looking for." },
];

const interestFromQuery: Record<string, string> = {
  buy: "Buying",
  sell: "Selling",
  rent: "Renting / leasing a home",
  lease: "Leasing out my property",
  landlord: "Leasing out my property",
  invest: "Investing",
};

type Status = "idle" | "sending" | "success" | "error";

export function LeadForm({
  formName,
  fields = contactFields,
  submitLabel = "Send message",
  successTitle = "Thanks — I got your message!",
  successText = `I'll reach out shortly. If it's urgent, call or text me at ${site.phone}.`,
  dark = false,
  onSuccess,
}: {
  formName: string;
  fields?: Field[];
  submitLabel?: string;
  successTitle?: string;
  successText?: string;
  dark?: boolean;
  onSuccess?: () => void;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number>(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
    // Pre-select the "interest" dropdown from ?interest=buy|sell|rent|invest|lease
    const q = new URLSearchParams(window.location.search).get("interest");
    const select = formRef.current?.elements.namedItem("interest");
    if (q && select instanceof HTMLSelectElement && interestFromQuery[q]) select.value = interestFromQuery[q];
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => (data[k] = String(v)));
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: formName,
          page: window.location.pathname,
          elapsedMs: Date.now() - startedAt.current,
          data,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      trackLead(formName);
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const text = dark ? "text-white" : "text-ink";
  const subtle = dark ? "text-slate-300" : "text-muted";

  if (status === "success") {
    return (
      <div role="status" className={`rounded-2xl p-8 text-center ${dark ? "bg-white/10" : "bg-sand"}`}>
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-navy-deep">
          <CheckIcon className="size-7" />
        </span>
        <p className={`mt-4 font-display text-2xl font-semibold ${dark ? "text-white" : "text-navy"}`}>{successTitle}</p>
        <p className={`mt-2 ${subtle}`}>{successText}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" noValidate={false}>
      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const common = {
          id,
          name: f.name,
          required: f.required,
          autoComplete: f.autoComplete,
          placeholder: f.placeholder,
          className: "field",
        };
        return (
          <div key={f.name} className={f.width === "half" ? "sm:col-span-1" : "sm:col-span-2"}>
            <label htmlFor={id} className={`label ${dark ? "!text-white" : ""}`}>
              {f.label}
              {f.required && <span aria-hidden="true" className="text-accent"> *</span>}
            </label>
            {f.type === "select" ? (
              <select {...common} defaultValue="">
                <option value="" disabled>
                  Select one
                </option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea {...common} rows={4} />
            ) : (
              <input {...common} type={f.type ?? "text"} inputMode={f.type === "number" ? "numeric" : undefined} />
            )}
          </div>
        );
      })}

      {/* Honeypot: hidden from people, bots fill it in and get rejected */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company (leave blank)</label>
        <input id={`${uid}-company`} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className={`flex items-start gap-3 text-xs leading-relaxed ${subtle}`}>
          <input type="checkbox" name="consent" value="yes" className="mt-0.5 size-5 shrink-0 accent-[var(--brand-accent)]" />
          <span>
            By checking this box, I agree to receive calls, text messages (including via automated technology), and emails
            from {site.agentName} / {site.brokerage.name} at the number and email provided about real estate services.
            Consent is not a condition of buying or selling property or any service. Message frequency varies. Message and
            data rates may apply. Reply STOP to opt out of texts or HELP for help. See our{" "}
            <Link href="/privacy" className={`underline ${text}`}>
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        {status === "error" && (
          <p role="alert" className={`mt-3 text-sm font-medium ${dark ? "text-red-300" : "text-red-700"}`}>
            {error} You can also call or text {site.phone}.
          </p>
        )}
      </div>
    </form>
  );
}
