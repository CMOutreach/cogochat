import type { Metadata } from "next";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about CogoChat web design and marketing services.",
};

const faqs = [
  {
    question: "Do I have to pay anything for the consultation?",
    answer: "Nothing at all. The first call, the audit and the second call where we share our findings are completely free. You only ever pay if you decide you want us to build something for you.",
  },
  {
    question: "What actually happens on the free audit?",
    answer: "After the first call we go away and check your website speed, how it looks on a phone, whether you are showing up on Google when people search for your service in your area, what your Google Business Profile looks like and how you compare to your local competitors. We then come back on a second call and walk you through everything we found.",
  },
  {
    question: "What if I already have a website?",
    answer: "That is fine and actually really common. A lot of businesses we work with have a website that is just not bringing in any enquiries. The audit will tell you exactly why and what needs to change. Sometimes it is a few targeted fixes, other times a fresh start makes more sense. We will always be honest about which one you need.",
  },
  {
    question: "Do I have to be in a specific area?",
    answer: "Not at all. We work fully remotely with businesses everywhere. Everything happens over video call, email and shared documents. No travel needed on either side.",
  },
  {
    question: "How much does it cost?",
    answer: "Websites start from £499, landing pages from £249 and monthly marketing plans from £149 per month. Every project gets a fixed written quote before we start so you always know exactly what you are paying.",
  },
  {
    question: "Do I have to pay anything upfront?",
    answer: "Yes, we ask for 50% of the project cost before we start building. The remaining 50% is due once you have reviewed and approved the finished site, before it goes live. This is standard practice and protects both sides.",
  },
  {
    question: "How long does it take?",
    answer: "Most websites are live within 2 to 4 weeks from when we start. Landing pages can be done in 5 business days. We agree a clear timeline before we start and stick to it.",
  },
  {
    question: "What do I need to provide?",
    answer: "Your logo if you have one, any photos of your business or work, and an idea of what services you want to feature. We handle the copy, design and everything technical. If you do not have photos we can source professional ones for you.",
  },
  {
    question: "What happens after the site goes live?",
    answer: "Every project includes one month of free support. After that you can manage the site yourself or move onto one of our monthly plans which cover ongoing updates, marketing and lead generation.",
  },
  {
    question: "Do I own the website?",
    answer: "Yes, completely. Your domain, your hosting and your website files are all in your name from day one. If you ever want to move on we will help you do it cleanly. We will never hold anything hostage.",
  },
  {
    question: "Is there a long-term contract?",
    answer: "No. Monthly plans run on a rolling basis and can be cancelled with 30 days notice. We would rather earn your loyalty every month than lock you in.",
  },
  {
    question: "What if I am not happy with the design?",
    answer: "After the first design review, if you are not happy with the direction we have taken we will go back to the drawing board at no extra cost. We would rather get it right than get it done.",
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-4">FAQ</p>
          <h1 className="font-display text-5xl text-white mb-4 lg:text-6xl">Questions and answers</h1>
          <p className="text-white/50 mb-16">Everything you probably want to know before getting in touch. If something is not covered here just ask us directly.</p>

          <div className="flex flex-col divide-y divide-white/8">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <h2 className="font-display text-xl text-white mb-3">{faq.question}</h2>
                <p className="text-white/55 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner
        headline="Still have a question?"
        subheadline="Just ask us directly. No bots, no forms, just a real conversation."
        cta="Get in touch"
      />
    </>
  );
}
