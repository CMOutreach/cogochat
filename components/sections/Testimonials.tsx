import { testimonials } from "@/content/testimonials";
import { Card } from "@/components/ui/Card";

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
            Real results
          </p>
          <h2 className="font-display text-4xl text-white lg:text-5xl">
            What our clients say
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <Card key={t.name} className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block rounded-full bg-brand-500/15 border border-brand-500/20 px-3 py-1 text-xs font-medium text-brand-400">
                  {t.result}
                </span>
              </div>
              <blockquote className="flex-1 text-sm text-white/60 leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-white/40">{t.business} · {t.location}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
