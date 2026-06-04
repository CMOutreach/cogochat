import type { Metadata } from "next";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "About Us",
  description: "CogoChat is a web design and marketing agency helping small businesses get found online and turn visitors into customers.",
};

export default function AboutPage() {
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-4">About CogoChat</p>
          <h1 className="font-display text-5xl text-white mb-8 lg:text-6xl">
            We help small businesses win online
          </h1>
          <div className="space-y-6">
            <p className="text-xl text-white/60 leading-relaxed">
              CogoChat is a web design and digital marketing agency built specifically for small and independent businesses.
              Whether you are a plumber in Manchester, a solicitor in Bristol or a restaurant in Edinburgh,
              if you are not getting the online customers your business deserves, we can change that.
            </p>
            <p className="text-white/50 leading-relaxed">
              We started CogoChat because we kept seeing the same problem. Brilliant small businesses
              with years of experience and happy customers, completely invisible online. Either no website,
              an outdated one nobody could find, or one that looked fine but converted nobody.
              Big agencies were too expensive and too slow. DIY builders produced generic results.
              We built something better. Agency-quality work at a price that actually makes sense for a growing small business.
            </p>
            <p className="text-white/50 leading-relaxed">
              The way we work is different too. We do not just jump straight into a pitch. Before we ever ask you
              to spend anything we do a free audit of your online presence, come back to you with exactly what we found
              and let you decide what happens next. You could take those findings and act on them yourself.
              Most people choose to work with us because by that point they can see we know what we are talking about.
            </p>
            <p className="text-white/50 leading-relaxed">
              We work remotely with businesses across the UK and beyond. Everything runs over
              video calls, email and shared documents with no travel needed on either side.
              You get a fast, professional website and a clear marketing plan built around your
              specific business and the customers you want to reach.
            </p>

            <div className="rounded-2xl border border-brand-500/20 bg-brand-500/5 p-8 mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">The name</p>
              <p className="text-white/60 leading-relaxed">
                Cogo comes from the Latin <em className="text-white/80">cogito</em>, meaning to think, to plan, to strategise.
                CogoChat is about strategic conversations. The idea that the best business growth starts
                with the right conversation. A conversation with us first, and then a much better conversation
                between your business and the customers who are out there looking for you right now.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              { value: "Free", label: "Full audit before you spend anything" },
              { value: "Remote", label: "We work with businesses everywhere" },
              { value: "100%", label: "Transparent pricing and no hidden fees" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="font-display text-3xl text-brand-400 mb-2">{s.value}</div>
                <div className="text-sm text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner
        headline="Think your business could be doing better online?"
        subheadline="Start with the free audit. We will tell you exactly what is holding you back and what we would do about it."
        cta="Get my free audit"
      />
    </>
  );
}
