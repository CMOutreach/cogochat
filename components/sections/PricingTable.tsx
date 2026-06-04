import { plans } from "@/content/pricing";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function PricingTable() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">Pricing</p>
          <h2 className="font-display text-4xl text-white lg:text-5xl">Simple, honest pricing</h2>
          <p className="mt-4 text-white/50">No hidden fees. No lock-in. Cancel any time.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl border p-8 flex flex-col",
                plan.highlight
                  ? "border-brand-500/50 bg-brand-500/10 ring-1 ring-brand-500/20"
                  : "border-white/10 bg-white/5"
              )}
            >
              {plan.highlight && (
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-400">
                  Most popular
                </p>
              )}
              <h3 className="font-display text-2xl text-white">{plan.name}</h3>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="ml-2 text-sm text-white/40">{plan.period}</span>
              </div>
              <p className="text-sm text-white/50 mb-8">{plan.description}</p>
              <ul className="flex-1 flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-white/70">
                    <span className="text-brand-400 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                href="/contact"
                variant={plan.highlight ? "primary" : "secondary"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
