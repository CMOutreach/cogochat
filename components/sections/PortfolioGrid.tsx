import Link from "next/link";
import { portfolio } from "@/content/portfolio";
import { Badge } from "@/components/ui/Badge";

export function PortfolioGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item) => (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-brand-500/40 transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-brand-900/40 to-dark flex items-center justify-center">
                <span className="text-5xl opacity-20 group-hover:opacity-40 transition-opacity font-display text-brand-400">
                  {item.industry.slice(0, 1)}
                </span>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.services.map((s) => (
                    <Badge key={s} variant="neutral">{s}</Badge>
                  ))}
                </div>
                <h3 className="font-display text-xl text-white mb-1">{item.client}</h3>
                <p className="text-sm text-white/40 mb-4">{item.location} · {item.industry}</p>
                <div className="grid grid-cols-3 gap-4 border-t border-white/8 pt-4">
                  {item.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-sm font-semibold text-brand-400">{stat.value}</div>
                      <div className="text-xs text-white/35">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
