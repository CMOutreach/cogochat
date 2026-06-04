import { Button } from "@/components/ui/Button";

interface CTABannerProps {
  headline?: string;
  subheadline?: string;
  cta?: string;
  href?: string;
}

export function CTABanner({
  headline = "Is your business thriving locally but invisible online?",
  subheadline = "Book a free consultation. We will look at your online presence and tell you exactly what we would change. No obligation and no hard sell.",
  cta = "Book a free call",
  href = "/contact",
}: CTABannerProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand-500/10 border border-brand-500/20 px-8 py-16 text-center">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500/5 to-transparent" />
          </div>
          <h2 className="font-display text-4xl text-white lg:text-5xl text-balance">
            {headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/55">{subheadline}</p>
          <div className="mt-8">
            <Button href={href} size="lg">{cta}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
