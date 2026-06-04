import type { Metadata } from "next";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Our two call system means you know exactly what is wrong with your online presence before you spend a penny. Here is how it works.",
};

const steps = [
  {
    step: "01",
    title: "You reach out or we reach out to you",
    description: "Either you find us and fill in the form, or one of our team reaches out to you directly. Either way the first conversation costs nothing and commits you to nothing. We just want to learn about your business.",
  },
  {
    step: "02",
    title: "Call one — we ask the questions",
    description: "A short 10-minute call. We find out what your business does, who your customers are, whether you have a website, and what your biggest frustration is with your online presence right now. No pitch, just listening.",
  },
  {
    step: "03",
    title: "We do the audit",
    description: "After that first call we go away and do a proper audit of your online presence. We check your website speed, how it looks on mobile, whether you are showing up on Google, what your competitors are doing and what your Google Business Profile looks like. This takes us about 15 to 20 minutes and you do not have to do anything.",
  },
  {
    step: "04",
    title: "Call two — we share what we found",
    description: "We come back with a clear, honest breakdown of what we found. What is working, what is not and what we would do to fix it. You can take those findings and act on them yourself if you want. There is no obligation to use us.",
  },
  {
    step: "05",
    title: "Proposal within 48 hours",
    description: "If you want to work with us after hearing the audit, we send a written proposal. Fixed price, clear deliverables and an honest timeline. No vague estimates and nothing hidden in the small print.",
  },
  {
    step: "06",
    title: "50% deposit and we get started",
    description: "Once you are happy with the proposal we invoice 50% upfront. That is standard practice and protects both sides. We then get to work and you get regular updates throughout so you always know where things stand.",
  },
  {
    step: "07",
    title: "You review the site before anything goes live",
    description: "We build on a private link so you can check everything on your phone and desktop before it is live. You have one round of revisions included. When you are happy you sign off and we invoice the remaining 50%.",
  },
  {
    step: "08",
    title: "Launch and handover",
    description: "We go live, notify Google, set up analytics and hand over every login. Everything is in your name and under your control from day one. Then we check in after 30 days to make sure everything is working as it should.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-4">How it works</p>
          <h1 className="font-display text-5xl text-white mb-6 lg:text-6xl">
            You know exactly what you are getting before you spend anything
          </h1>
          <p className="text-xl text-white/55 mb-4">
            Most agencies ask you to trust them before they have shown you anything. We do it differently.
          </p>
          <p className="text-white/40 leading-relaxed mb-16">
            Our two call system means you get a full audit of your online presence for free before we ever ask you to commit to anything. You come away from that second call knowing exactly what is holding your business back online, whether you go with us or not.
          </p>

          <div className="flex flex-col gap-12">
            {steps.map((step) => (
              <div key={step.step} className="flex gap-8">
                <div className="font-display text-4xl text-brand-500/25 w-12 shrink-0">{step.step}</div>
                <div>
                  <h2 className="font-display text-2xl text-white mb-3">{step.title}</h2>
                  <p className="text-white/55 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner
        headline="Ready to find out what your website is costing you?"
        subheadline="The first call is free and takes 10 minutes. No pitch, no pressure, just useful information."
        cta="Book your free audit"
      />
    </>
  );
}
