import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, siteUrl } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { formatDate, getPost, getPosts } from "@/lib/content";
import { CtaBand, Section } from "@/components/Sections";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.description, path: `/blog/${p.slug}`, image: p.image });
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const more = getPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          image: `${siteUrl}${post.image}`,
          author: { "@type": "Person", name: site.agentName, url: `${siteUrl}/about` },
          publisher: { "@id": `${siteUrl}/#agent` },
          mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
        }}
      />
      <article>
        <header className="bg-sand">
          <div className="container-x max-w-3xl py-14 sm:py-20">
            <Link href="/blog" className="text-sm font-semibold text-accent-dark hover:underline">
              ← All posts
            </Link>
            <p className="eyebrow mt-6">{post.category}</p>
            <h1 className="mt-3 font-display text-4xl leading-tight font-semibold text-navy sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-muted">{post.description}</p>
            <p className="mt-6 text-sm text-muted">
              By <Link href="/about" className="font-semibold text-navy hover:underline">{site.agentName}</Link> ·{" "}
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
            </p>
          </div>
        </header>
        <div className="container-x max-w-3xl">
          <div className="relative -mt-0 aspect-[16/9] overflow-hidden rounded-2xl sm:mt-10">
            <Image src={post.image} alt="" fill priority sizes="(min-width:768px) 768px, 100vw" className="object-cover" />
          </div>
          <div
            className="prose prose-lg mt-10 max-w-none pb-16 prose-headings:font-display prose-headings:text-navy prose-a:text-accent-dark prose-strong:text-navy"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </article>
      <CtaBand title="Have a question about this?" text={`Call or text me at ${site.phone}. I'm happy to talk it through.`} />
      {more.length > 0 && (
        <Section>
          <h2 className="h2">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
