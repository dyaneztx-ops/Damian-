import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="card group overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image src={post.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold tracking-wider text-accent-dark uppercase">{post.category}</p>
          <h3 className="mt-2 text-xl font-semibold text-navy group-hover:text-accent-dark">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-muted">{post.description}</p>
          <p className="mt-4 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
        </div>
      </Link>
    </article>
  );
}
