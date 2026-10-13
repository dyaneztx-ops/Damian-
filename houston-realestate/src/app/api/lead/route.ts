import { NextResponse } from "next/server";
import { site } from "@/config/site";

/**
 * Receives every form on the site and emails it to you.
 *  - If RESEND_API_KEY is set → sends via Resend (https://resend.com)
 *  - else if FORMSPREE_ENDPOINT is set → forwards to Formspree
 *  - else (local dev) → logs the lead to the terminal
 * Spam protection: hidden honeypot field + minimum time-to-submit.
 */

const MAX_FIELD = 5000;

const pretty: Record<string, string> = {
  company_website: "",
  consent: "Consent to calls/texts/emails",
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  let body: { form?: string; page?: string; elapsedMs?: number; data?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = body.data ?? {};
  const form = String(body.form ?? "website").slice(0, 60);

  // Honeypot filled or submitted inhumanly fast → pretend success, drop it.
  if (String(data.company_website ?? "").trim() !== "" || (body.elapsedMs ?? 0) < 2500) {
    return NextResponse.json({ ok: true });
  }

  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(data)) {
    if (k === "company_website") continue;
    clean[k] = String(v ?? "").slice(0, MAX_FIELD).trim();
  }
  clean.consent = clean.consent === "yes" ? "Yes" : "No";

  const email = clean.email ?? "";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!clean.name && !email) {
    return NextResponse.json({ error: "Please add your name and email." }, { status: 400 });
  }

  const subject = `New ${form} lead${clean.name ? ` from ${clean.name}` : ""}`;
  const rows = Object.entries(clean).map(([k, v]) => [pretty[k] || k.replace(/_/g, " "), v || "—"]);
  const text = `${subject}\nPage: ${body.page ?? ""}\n\n` + rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html =
    `<h2>${escapeHtml(subject)}</h2><p>Page: ${escapeHtml(String(body.page ?? ""))}</p><table cellpadding="6">` +
    rows
      .map(([k, v]) => `<tr><td><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
      .join("") +
    `</table>`;

  const to = process.env.LEAD_TO_EMAIL || site.email;

  try {
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Website Leads <onboarding@resend.dev>",
          to: [to],
          reply_to: email || undefined,
          subject,
          text,
          html,
        }),
      });
      if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
    } else if (process.env.FORMSPREE_ENDPOINT) {
      const res = await fetch(process.env.FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ _subject: subject, form, page: body.page, ...clean, _replyto: email }),
      });
      if (!res.ok) throw new Error(`Formspree error ${res.status}: ${await res.text()}`);
    } else if (process.env.NODE_ENV === "production") {
      // Fail loudly on the live site so leads are never silently lost.
      console.error("[lead] No RESEND_API_KEY or FORMSPREE_ENDPOINT set — lead NOT delivered:\n" + text);
      return NextResponse.json({ error: "Online forms aren't connected yet." }, { status: 503 });
    } else {
      console.log("\n[lead] No email service configured — lead received:\n" + text + "\n");
    }
  } catch (err) {
    console.error("[lead] delivery failed", err);
    return NextResponse.json({ error: "Sorry, your message didn't go through." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
