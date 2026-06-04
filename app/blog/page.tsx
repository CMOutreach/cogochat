import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips on web design, lead generation, and digital marketing for small businesses.",
};

const posts = [
  {
    slug: "5-reasons-local-businesses-lose-leads",
    title: "5 reasons your local business is losing leads online",
    excerpt: "Most small business websites were not designed to convert. Here is what to fix first.",
    date: "14 May 2025",
    readTime: "4 min read",
    category: "Lead Generation",
  },
  {
    slug: "how-much-does-a-website-cost-uk",
    title: "How much does a website cost for a small business in the UK?",
    excerpt: "Prices vary wildly. Here is an honest breakdown of what you should expect to pay and why.",
    date: "2 March 2025",
    readTime: "6 min read",
    category: "Web Design",
  },
  {
    slug: "google-business-profile-guide",
    title: "Google Business Profile: the local business guide for 2025",
    excerpt: "One of the most powerful free tools for local businesses. Most people set it up wrong.",
    date: "18 January 2025",
    readTime: "8 min read",
    category: "SEO",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-4">Blog</p>
            <h1 className="font-display text-5xl text-white mb-4 lg:text-6xl">
              Tips for small businesses
            </h1>
            <p className="text-white/50 mb-16">Practical advice on websites, marketing and getting more customers.</p>

            <div className="flex flex-col gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="group rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-brand-500/40 transition-all cursor-pointer">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded-full px-3 py-1">
                        {post.category}
                      </span>
                      <span className="text-xs text-white/30">{post.date} · {post.readTime}</span>
                    </div>
                    <h2 className="font-display text-2xl text-white mb-3 group-hover:text-brand-300 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/50 leading-relaxed mb-4">{post.excerpt}</p>
                    <span className="text-sm text-brand-400 group-hover:text-brand-300 transition-colors">
                      Read article
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
