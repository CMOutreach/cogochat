import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CTABanner } from "@/components/sections/CTABanner";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props { params: { slug: string } }

const posts: Record<string, {
  title: string;
  date: string;
  readTime: string;
  category: string;
  content: { heading?: string; body: string }[];
}> = {
  "5-reasons-local-businesses-lose-leads": {
    title: "5 reasons your local business is losing leads online",
    date: "3 February 2026",
    readTime: "4 min read",
    category: "Lead Generation",
    content: [
      {
        body: "You built the website. You paid someone to put it together. Maybe you even spent money getting people to visit it. But the phone is not ringing. Sound familiar? Here are the five most common reasons local business websites fail to convert and what to do about each one."
      },
      {
        heading: "1. Your homepage does not say what you do in the first 5 seconds",
        body: "Visitors are impatient. If someone lands on your homepage and cannot immediately tell what you do, where you are and why they should care, they are gone. Your headline needs to be specific. Something like the best emergency plumber in Cardiff, available around the clock, seven days a week is the kind of line that stops someone mid-scroll and makes them pick up the phone."
      },
      {
        heading: "2. There is no clear next step",
        body: "Every page on your site should have one obvious call to action. Call us. Book online. Get a free quote. If visitors have to hunt for a way to contact you, they will not bother. Put your phone number in the header. Put a contact button on every page. Make it impossible to miss."
      },
      {
        heading: "3. Your site is slow on mobile",
        body: "Over 60% of local business searches happen on a phone. If your site takes more than 3 seconds to load on mobile, most visitors will leave before they have even seen it. Images that have not been compressed, old website builders and cheap hosting are the usual culprits."
      },
      {
        heading: "4. You have no social proof",
        body: "People trust other people more than they trust businesses. If your website has no reviews, no testimonials and no photos of real work, visitors have no reason to choose you over a competitor. Even three genuine testimonials from happy customers can make a real difference to how many people actually get in touch."
      },
      {
        heading: "5. You are sending paid traffic to your homepage",
        body: "If you are running Google Ads or Facebook Ads and pointing people to your homepage, you are making it harder than it needs to be. Paid traffic converts better when it lands on a focused page built around one specific offer. Your homepage serves everyone. A good landing page is built for one person with one goal: to get them to contact you."
      },
      {
        heading: "What to do next",
        body: "Pick the one that resonates most and tackle it this week. You do not need to overhaul everything at once. Small, targeted improvements add up quickly. And if you want a fresh set of eyes on your site, we offer a free consultation where we will go through it with you and tell you honestly what we think. No strings attached."
      },
    ],
  },
  "how-much-does-a-website-cost-uk": {
    title: "How much does a website cost for a small business in the UK?",
    date: "2 March 2025",
    readTime: "6 min read",
    category: "Web Design",
    content: [
      {
        body: "It is one of the most Googled questions by small business owners and the honest answer is: it depends. But that is not very useful, so here is a proper breakdown of what you can expect to pay and what you actually get at each price point."
      },
      {
        heading: "DIY website builders (£0 to £30 per month)",
        body: "Wix, Squarespace and similar builders let you create a basic site yourself. The monthly cost is low but the hidden cost is your time, and the results are often generic. These tools are fine if you just need something online quickly, but they are not built to convert visitors into paying customers. You will also hit limitations fast if you want anything custom."
      },
      {
        heading: "Freelancers (£300 to £800)",
        body: "A junior freelancer can put together a decent-looking site at this price. The risk is quality and reliability. Timelines can slip, communication can be patchy and ongoing support is rarely included. At this budget, expect a template with your content dropped in rather than something built around your business."
      },
      {
        heading: "Small agencies like CogoChat (£499 to £1,500)",
        body: "This is where you start getting a properly designed site built around your goals. A good small agency will take the time to understand what your site needs to achieve, design something specific to your brand and make sure every page is working to bring in enquiries. You also get proper support after launch rather than being left to figure it out yourself."
      },
      {
        heading: "Large agencies (£3,000 and above)",
        body: "Big agencies come with big overheads. You are paying for account managers, project managers and layers of process on top of the actual work. For most small businesses this level of spend rarely translates into meaningfully better results. The size of the invoice does not always reflect the quality of what gets built."
      },
      {
        heading: "What should you actually pay?",
        body: "For most small businesses, somewhere between £499 and £1,500 is the right range for a well-designed, conversion-focused website. Add a monthly retainer of £100 to £300 if you want ongoing updates and marketing support. The most important thing is finding someone who understands what the site needs to do for your business, not just someone who can make it look nice."
      },
    ],
  },
  "google-business-profile-guide": {
    title: "Google Business Profile: the local business guide for 2025",
    date: "18 January 2025",
    readTime: "8 min read",
    category: "SEO",
    content: [
      {
        body: "If you run a local business and you have not claimed your Google Business Profile, you are leaving money on the table. It is free, it puts you on Google Maps and it can generate leads without you spending a penny on ads. Here is everything you need to know."
      },
      {
        heading: "What is Google Business Profile?",
        body: "It is the box that appears on the right side of Google search results when someone searches for your business or looks for a type of business near them. It shows your address, phone number, opening hours, photos and reviews. When someone searches for a plumber nearby, the businesses that show up in the map results are the ones with optimised Google Business Profiles."
      },
      {
        heading: "How to claim your profile",
        body: "Go to business.google.com and search for your business. If it already exists, claim it. Google often creates basic listings automatically. If nothing comes up, create one from scratch. You will need to verify your business, usually by receiving a postcard at your address with a code on it. The whole process takes about a week."
      },
      {
        heading: "The mistakes most businesses make",
        body: "Most businesses claim their profile and then leave it alone. The ones that appear at the top of local searches do these things consistently: they keep their opening hours accurate especially over holidays, they upload real photos of their work and premises on a regular basis, they respond to every review whether positive or negative, and they post updates at least once a month to show Google the profile is active."
      },
      {
        heading: "Reviews are everything",
        body: "Google uses the number and quality of your reviews as a major ranking factor. Businesses with 50 or more reviews almost always outrank those with only a handful. The easiest way to get more is simply to ask. Send a short follow-up message to happy customers with a direct link to your review page. Most people are glad to help if you make it easy for them."
      },
      {
        heading: "What to do this week",
        body: "Claim your profile if you have not already. Check that your name, address, phone number and website are all correct. Upload at least 10 photos. Then reach out to your last five happy customers and ask them to leave a review. That is genuinely all it takes to get ahead of most of your local competition."
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts[params.slug];
  if (!post) return {};
  return { title: post.title, description: post.content[0]?.body.slice(0, 155) };
}

export default function BlogPostPage({ params }: Props) {
  const post = posts[params.slug];
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <article className="py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <Link href="/blog" className="text-sm text-brand-400 hover:text-brand-300 transition-colors mb-8 inline-block">
              Back to blog
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded-full px-3 py-1">
                {post.category}
              </span>
              <span className="text-xs text-white/30">{post.date} · {post.readTime}</span>
            </div>

            <h1 className="font-display text-4xl text-white mb-12 lg:text-5xl leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col gap-8">
              {post.content.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 className="font-display text-2xl text-white mb-3">{section.heading}</h2>
                  )}
                  <p className="text-white/60 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
        <CTABanner
          headline="Want help putting this into practice?"
          subheadline="We offer free consultations with no obligation and no hard sell."
          cta="Book a free call"
        />
      </main>
      <Footer />
    </>
  );
}
