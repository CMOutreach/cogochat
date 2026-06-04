import Link from "next/link";
import { services } from "@/content/services";
import { Card } from "@/components/ui/Card";

export function ServicesGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
            What we do
          </p>
          <h2 className="font-display text-4xl text-white lg:text-5xl">
            Services built for small businesses
          </h2>
          <p className="mt-4 text-white/50">Every service starts with a free audit so you know exactly what you need before spending anything.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`}>
              <Card hover className="h-full flex flex-col">
                <div className="mb-4 text-3xl">{s.icon}</div>
                <h3 className="font-display text-xl text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/50 mb-4 leading-relaxed flex-1">{s.tagline}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-brand-400">{s.price}</p>
                  <p className="text-xs text-white/30">Free audit first</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
