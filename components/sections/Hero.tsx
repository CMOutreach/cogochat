import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface HeroProps {
  badge?: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: { value: string; label: string }[];
}

export function Hero({
  badge,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  stats,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-36">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="absolute left-1/4 bottom-0 h-[400px] w-[600px] rounded-full bg-brand-700/8 blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        {badge && (
          <div className="mb-6 flex justify-center">
            <Badge>{badge}</Badge>
          </div>
        )}

        <h1 className="font-display text-5xl text-white text-balance leading-[1.1] lg:text-7xl">
          {headline}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/55 text-balance leading-relaxed">
          {subheadline}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href={primaryCta.href} size="lg">
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button href={secondaryCta.href} size="lg" variant="secondary">
              {secondaryCta.label}
            </Button>
          )}
        </div>

        {stats && (
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/8 pt-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl text-brand-400 lg:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
