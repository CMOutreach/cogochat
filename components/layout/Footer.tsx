import Link from "next/link";

const footerLinks = {
  Services: [
    { href: "/services/web-design", label: "Web Design" },
    { href: "/services/landing-pages", label: "Landing Pages" },
    { href: "/services/lead-generation", label: "Lead Generation" },
    { href: "/services/ads-management", label: "Ads Management" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/process", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ],
  Support: [
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-dark">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="font-display text-xl text-white">
              Cogo<span className="text-brand-400">Chat</span>
            </Link>
            <p className="mt-3 text-sm text-white/40 max-w-xs">
              Websites and marketing for local businesses that want to grow.
            </p>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                {group}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} CogoChat. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built in Wales 🏴󠁧󠁢󠁷󠁬󠁳󠁿
          </p>
        </div>
      </div>
    </footer>
  );
}
