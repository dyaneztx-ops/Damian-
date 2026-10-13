/**
 * FEATURED LISTINGS — edit this list by hand.
 * Only show listings you're authorized to advertise (your own, or with
 * your broker's / listing agent's permission).
 * status: "For Sale" | "For Lease" | "Pending" | "Sold" | "Coming Soon"
 * photo: put images in /public/images/listings/ and reference them here.
 * Only use photos you have the rights to (your own or the listing's MLS photos per MLS rules).
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

// Empty = the "Featured listings" sections are hidden. Add your own listings here.
// Example:
// {
//   address: "1234 Example St",
//   city: "Katy, TX 77494",
//   price: "$425,000",
//   beds: 4, baths: 3, sqft: 2600,
//   photo: "/images/listings/1234-example.jpg",
//   status: "For Sale",
//   link: "https://www.har.com/...",
// },
export const listings: Listing[] = [];
