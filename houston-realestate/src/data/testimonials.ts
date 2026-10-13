/**
 * TESTIMONIALS — only add real reviews from real clients, with their permission.
 * While `testimonials` is empty, the site shows a friendly placeholder instead.
 * Example:
 * { quote: "Damian helped us...", name: "Maria G.", detail: "First-time buyer, Pearland" },
 */
export type Testimonial = { quote: string; name: string; detail: string };

export const testimonials: Testimonial[] = [];
