import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.agentName}, Houston REALTOR® & Investor`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social share image for every page (pages with their own image override it).
export default function OgImage() {
  const c = site.colors;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `linear-gradient(135deg, ${c.navyDeep} 0%, ${c.navy} 100%)`,
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: c.accent, color: c.navyDeep, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700 }}>
            DY
          </div>
          <div style={{ fontSize: 28, color: "#cbd5e1" }}>{site.brokerage.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>{site.agentName}</div>
          <div style={{ fontSize: 40, color: c.accent, marginTop: 12 }}>Houston REALTOR® & Real Estate Investor</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#e2e8f0" }}>{`Buy · Sell · Invest · Lease  —  ${site.phone}`}</div>
      </div>
    ),
    size,
  );
}
