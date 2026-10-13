"use client";

import { useId, useMemo, useState } from "react";

type Inputs = {
  price: number;
  downPct: number;
  rate: number;
  years: number;
  closing: number;
  rent: number;
  taxes: number;
  insurance: number;
  hoa: number;
  vacancyPct: number;
  repairsPct: number;
  mgmtPct: number;
};

// Houston-ish defaults. Property taxes here commonly run ~2–3% of value.
const defaults: Inputs = {
  price: 285000,
  downPct: 25,
  rate: 7,
  years: 30,
  closing: 9000,
  rent: 2300,
  taxes: 6300,
  insurance: 2400,
  hoa: 0,
  vacancyPct: 5,
  repairsPct: 8,
  mgmtPct: 0,
};

const usd = (n: number) =>
  (n < 0 ? "-" : "") + Math.abs(n).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const pct = (n: number) => (Number.isFinite(n) ? `${n.toFixed(2)}%` : "—");

export function calculate(i: Inputs) {
  const down = i.price * (i.downPct / 100);
  const loan = i.price - down;
  const r = i.rate / 100 / 12;
  const n = i.years * 12;
  const mortgage = loan <= 0 ? 0 : r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
  const vacancy = i.rent * (i.vacancyPct / 100);
  const repairs = i.rent * (i.repairsPct / 100);
  const mgmt = i.rent * (i.mgmtPct / 100);
  const operating = i.taxes / 12 + i.insurance / 12 + i.hoa + vacancy + repairs + mgmt;
  const cashFlow = i.rent - operating - mortgage;
  const noi = (i.rent - operating) * 12;
  const cashInvested = down + i.closing;
  return {
    down,
    loan,
    mortgage,
    operating,
    totalExpenses: operating + mortgage,
    cashFlow,
    noi,
    capRate: i.price > 0 ? (noi / i.price) * 100 : NaN,
    coc: cashInvested > 0 ? ((cashFlow * 12) / cashInvested) * 100 : NaN,
    cashInvested,
  };
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  hint,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  hint?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative">
        {prefix && <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className={`field ${prefix ? "pl-8" : ""} ${suffix ? "pr-14" : ""}`}
        />
        {suffix && <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-muted">{suffix}</span>}
      </div>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function CashFlowCalculator() {
  const [v, setV] = useState<Inputs>(defaults);
  const set = (k: keyof Inputs) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const out = useMemo(() => calculate(v), [v]);
  const positive = out.cashFlow >= 0;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <form className="card-static grid gap-4 p-6 sm:grid-cols-2 lg:col-span-3" onSubmit={(e) => e.preventDefault()} aria-label="Rental property inputs">
        <fieldset className="contents">
          <legend className="text-lg font-semibold text-navy sm:col-span-2">Purchase & loan</legend>
          <NumberField label="Purchase price" prefix="$" value={v.price} onChange={set("price")} step={1000} />
          <NumberField label="Down payment" suffix="%" value={v.downPct} onChange={set("downPct")} step={0.5} hint={usd(out.down)} />
          <NumberField label="Interest rate" suffix="%" value={v.rate} onChange={set("rate")} step={0.125} />
          <NumberField label="Loan term" suffix="years" value={v.years} onChange={set("years")} />
          <NumberField label="Closing costs + rehab" prefix="$" value={v.closing} onChange={set("closing")} step={500} />
        </fieldset>
        <fieldset className="contents">
          <legend className="mt-2 text-lg font-semibold text-navy sm:col-span-2">Income & expenses</legend>
          <NumberField label="Monthly rent" prefix="$" value={v.rent} onChange={set("rent")} step={25} />
          <NumberField label="Property taxes (per year)" prefix="$" value={v.taxes} onChange={set("taxes")} step={100} hint="Houston-area rates are often 2–3% of value" />
          <NumberField label="Insurance (per year)" prefix="$" value={v.insurance} onChange={set("insurance")} step={100} />
          <NumberField label="HOA (per month)" prefix="$" value={v.hoa} onChange={set("hoa")} step={10} />
          <NumberField label="Vacancy" suffix="% rent" value={v.vacancyPct} onChange={set("vacancyPct")} step={0.5} />
          <NumberField label="Repairs & maintenance" suffix="% rent" value={v.repairsPct} onChange={set("repairsPct")} step={0.5} />
          <NumberField label="Property management" suffix="% rent" value={v.mgmtPct} onChange={set("mgmtPct")} step={0.5} hint="0 if you self-manage" />
        </fieldset>
        <div className="sm:col-span-2">
          <button type="button" onClick={() => setV(defaults)} className="text-sm font-semibold text-accent-dark hover:underline">
            Reset to example numbers
          </button>
        </div>
      </form>

      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-2xl bg-navy p-6 text-white shadow-xl" aria-live="polite">
          <p className="text-sm tracking-widest text-slate-300 uppercase">Monthly cash flow</p>
          <p className={`mt-1 font-display text-5xl font-semibold ${positive ? "text-accent" : "text-red-300"}`}>{usd(out.cashFlow)}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-white/10 p-4">
              <dt className="text-xs text-slate-300">Cap rate</dt>
              <dd className="mt-1 text-2xl font-semibold">{pct(out.capRate)}</dd>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <dt className="text-xs text-slate-300">Cash-on-cash</dt>
              <dd className="mt-1 text-2xl font-semibold">{pct(out.coc)}</dd>
            </div>
          </dl>
          <dl className="mt-6 space-y-2 border-t border-white/15 pt-4 text-sm">
            {[
              ["Rent", usd(v.rent)],
              ["Mortgage (P&I)", usd(-out.mortgage)],
              ["Operating expenses", usd(-out.operating)],
              ["Annual NOI", usd(out.noi)],
              ["Total cash invested", usd(out.cashInvested)],
            ].map(([k, val]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-slate-300">{k}</dt>
                <dd className="font-semibold">{val}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs text-slate-400">
            Estimates for education only, not financial advice. Verify taxes, insurance, and rents for the specific property.
          </p>
        </div>
      </div>
    </div>
  );
}
