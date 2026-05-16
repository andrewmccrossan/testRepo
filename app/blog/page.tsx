import { getPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { OrnamentDivider } from "@/components/Ornament";

export const metadata = { title: "Journal" };

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="container-wide pt-16 pb-10 text-center">
        <p className="eyebrow">Diarium</p>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-wide text-ink md:text-6xl">
          The Journal
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink-soft">
          Notes and essays from the desk and the street. Short, slow,
          occasionally photographic.
        </p>
        <OrnamentDivider className="mt-10" />
      </section>

      <section className="container-wide pb-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
