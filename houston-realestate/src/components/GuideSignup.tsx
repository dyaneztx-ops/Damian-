"use client";

import { useState } from "react";
import { LeadForm } from "./LeadForm";
import { DownloadIcon } from "./Icons";

export const guideFile = "/docs/houston-neighborhood-guide.pdf";

export function GuideSignup({ dark = false }: { dark?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <div>
      <LeadForm
        formName="Neighborhood Guide"
        dark={dark}
        fields={[
          { name: "name", label: "First name", required: true, autoComplete: "given-name", width: "half" },
          { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", width: "half" },
        ]}
        submitLabel="Send me the free guide"
        successTitle="Your guide is ready!"
        successText="Download it below. I've also got your email, so I'll send updates when new areas are added."
        onSuccess={() => setDone(true)}
      />
      {done && (
        <a href={guideFile} download="Houston-Neighborhood-Guide-Damian-Yanez.pdf" className="btn-primary mt-4 w-full">
          <DownloadIcon className="size-5" /> Download the Houston Neighborhood Guide
        </a>
      )}
    </div>
  );
}
