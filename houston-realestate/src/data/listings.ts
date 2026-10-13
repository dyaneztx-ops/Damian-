/**
 * FEATURED LISTINGS — edit this list by hand.
 * Only show listings you're authorized to advertise (your own, or with
 * your broker's / listing agent's permission).
 * status: "For Sale" | "For Lease" | "Pending" | "Sold" | "Coming Soon"
 * photo: put images in /public/images/listings/ and reference them here.
 */
export type Listing = {
  address: string;
  city: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  photo: string;
  status: "For Sale" | "For Lease" | "Pending" | "Sold" | "Coming Soon";
  link: string;
};

export const listings: Listing[] = [
  {
    address: "[SAMPLE] 1234 Example St",
    city: "Houston Heights, TX 77008",
    price: "$000,000",
    beds: 3,
    baths: 2,
    sqft: 1850,
    photo: "/images/listings/listing-1.svg",
    status: "Coming Soon",
    link: "/contact?interest=buy",
  },
  {
    address: "[SAMPLE] 5678 Placeholder Ln",
    city: "Katy, TX 77494",
    price: "$000,000",
    beds: 4,
    baths: 3,
    sqft: 2600,
    photo: "/images/listings/listing-2.svg",
    status: "Coming Soon",
    link: "/contact?interest=buy",
  },
  {
    address: "[SAMPLE] 910 Sample Ct",
    city: "Pearland, TX 77584",
    price: "$0,000/mo",
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    photo: "/images/listings/listing-3.svg",
    status: "For Lease",
    link: "/lease",
  },
];
