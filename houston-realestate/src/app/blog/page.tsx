import { pageMeta } from "@/lib/seo";
import { getPosts } from "@/lib/content";
import { PageHero, Section } from "@/components/Sections";
import { PostCard } from "@/components/PostCard";

export const metadata = pageMeta({
  title: "Houston Real Estate Blog | Market Updates & Advice",
  description: "Houston real estate advice for buyers, sellers, investors, and landlords: market updates, first-time buyer tips, and rental property analysis.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPosts();
  return (
    <>
      <PageHero
        eyebrow="Blog & market updates"
        title="Straight talk on Houston real estate."
        intro="Practical advice for buyers, sellers, investors, and landlords, written from real deals I've done."
      />
      <Section>
        <h2 className="sr-only">All posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
