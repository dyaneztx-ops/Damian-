import type { Field } from "./LeadForm";

const contact: Field[] = [
  { name: "name", label: "Full name", required: true, autoComplete: "name", width: "half" },
  { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", width: "half" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
];

export const valuationFields: Field[] = [
  { name: "address", label: "Property address", required: true, autoComplete: "street-address" },
  { name: "city_zip", label: "City & ZIP", required: true, autoComplete: "postal-code", width: "half" },
  { name: "sqft", label: "Approx. square feet", type: "number", width: "half" },
  { name: "beds", label: "Bedrooms", type: "select", required: true, options: ["1", "2", "3", "4", "5", "6+"], width: "half" },
  { name: "baths", label: "Bathrooms", type: "select", required: true, options: ["1", "1.5", "2", "2.5", "3", "3.5", "4+"], width: "half" },
  {
    name: "condition",
    label: "Condition",
    type: "select",
    required: true,
    options: ["Move-in ready / updated", "Good, some dated areas", "Needs work", "Major renovation needed"],
    width: "half",
  },
  {
    name: "timeline",
    label: "When are you thinking of selling?",
    type: "select",
    required: true,
    options: ["ASAP", "1–3 months", "3–6 months", "6–12 months", "Just curious"],
    width: "half",
  },
  ...contact,
  { name: "message", label: "Anything else I should know? (upgrades, repairs, etc.)", type: "textarea" },
];

export const investorFields: Field[] = [
  ...contact,
  {
    name: "strategy",
    label: "What are you looking for?",
    type: "select",
    required: true,
    options: ["Long-term rental", "Fix & flip", "BRRRR", "Small multifamily (2–4 units)", "Short-term rental", "Not sure yet"],
    width: "half",
  },
  {
    name: "budget",
    label: "Purchase budget",
    type: "select",
    required: true,
    options: ["Under $200k", "$200k–$300k", "$300k–$450k", "$450k–$700k", "$700k+"],
    width: "half",
  },
  {
    name: "financing",
    label: "Financing",
    type: "select",
    options: ["Cash", "Conventional", "DSCR / investor loan", "Hard money", "Not sure yet"],
    width: "half",
  },
  {
    name: "experience",
    label: "Experience",
    type: "select",
    options: ["First investment", "1–2 properties", "3+ properties"],
    width: "half",
  },
  { name: "areas", label: "Target areas", placeholder: "e.g. Pearland, Spring, inside the Beltway" },
  { name: "message", label: "Goals (cash flow target, timeline, etc.)", type: "textarea" },
];

export const landlordFields: Field[] = [
  ...contact,
  { name: "address", label: "Property address", required: true, autoComplete: "street-address" },
  {
    name: "property_type",
    label: "Property type",
    type: "select",
    required: true,
    options: ["Single-family", "Townhome / condo", "Duplex / small multifamily", "Other"],
    width: "half",
  },
  { name: "beds_baths", label: "Beds / baths", placeholder: "e.g. 3 / 2", width: "half" },
  {
    name: "status",
    label: "Current status",
    type: "select",
    required: true,
    options: ["Vacant now", "Tenant moving out soon", "Currently my home", "Under renovation"],
    width: "half",
  },
  {
    name: "help_with",
    label: "I need help with",
    type: "select",
    required: true,
    options: ["Pricing the rent", "Finding & screening a tenant", "Full lease-up (marketing to move-in)", "Selling instead of renting"],
    width: "half",
  },
  { name: "message", label: "Anything else?", type: "textarea" },
];

export const tenantFields: Field[] = [
  ...contact,
  { name: "areas", label: "Areas you'd like to live", placeholder: "e.g. Katy, Cypress, Heights", width: "half" },
  { name: "budget", label: "Monthly budget", placeholder: "e.g. $2,000", width: "half" },
  {
    name: "move_date",
    label: "Move-in timing",
    type: "select",
    required: true,
    options: ["Within 30 days", "1–2 months", "2–3 months", "Just looking"],
    width: "half",
  },
  { name: "beds", label: "Bedrooms needed", type: "select", options: ["Studio / 1", "2", "3", "4+"], width: "half" },
  { name: "message", label: "Pets, must-haves, schools, etc.", type: "textarea" },
];
