import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const contentDir = path.join(process.cwd(), "content");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  html: string;
  readingMinutes: number;
};

export type Neighborhood = {
  slug: string;
  name: string;
  description: string;
  image: string;
  priceRange: string;
  commute: string;
  highlights: string[];
  order: number;
  html: string;
};

function readDir(dir: string) {
  const full = path.join(contentDir, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx?$/, ""), data, content };
    });
}

function toHtml(md: string) {
  return marked.parse(md, { async: false }) as string;
}

export function getPosts(): Post[] {
  return readDir("blog")
    .filter(({ data }) => !data.draft)
    .map(({ slug, data, content }) => ({
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
      category: String(data.category ?? "Market Insights"),
      image: String(data.image ?? "/images/blog-default.svg"),
      html: toHtml(content),
      readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

export function getNeighborhoods(): Neighborhood[] {
  return readDir("neighborhoods")
    .map(({ slug, data, content }) => ({
      slug,
      name: String(data.name ?? slug),
      description: String(data.description ?? ""),
      image: String(data.image ?? "/images/neighborhood-default.svg"),
      priceRange: String(data.priceRange ?? "[PRICE RANGE]"),
      commute: String(data.commute ?? ""),
      highlights: Array.isArray(data.highlights) ? data.highlights.map(String) : [],
      order: Number(data.order ?? 99),
      html: toHtml(content),
    }))
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export function getNeighborhood(slug: string) {
  return getNeighborhoods().find((n) => n.slug === slug);
}

export function formatDate(iso: string) {
  const d = new Date(iso + "T12:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
