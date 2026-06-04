# CogoChat Website

A production-ready Next.js 14 marketing website for CogoChat — a web design and marketing agency for local businesses.

## Tech stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Fonts**: DM Serif Display + DM Sans (Google Fonts)
- **Language**: TypeScript

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

| Path | Purpose |
|------|---------|
| `app/(marketing)/` | All public marketing pages |
| `app/blog/` | Blog index + post pages |
| `app/legal/` | Privacy policy + terms |
| `app/api/contact/` | Lead form API route |
| `components/sections/` | Page-level sections (Hero, CTA, etc.) |
| `components/ui/` | Atomic UI components (Button, Card, etc.) |
| `components/layout/` | Navbar + Footer |
| `content/` | All site copy as TypeScript data files |
| `lib/` | Utilities (metadata helpers, form submit, analytics) |

## Customisation

### Content
Edit files in `/content/` — services, pricing, testimonials, portfolio, FAQ. All page text is decoupled from components.

### Colours
Edit `tailwind.config.ts` — the `brand` colour ramp drives the whole design.

### Email
Edit `app/api/contact/route.ts` and add your email provider (Resend recommended). Add your API key to `.env.local`.

### Analytics
Set `NEXT_PUBLIC_GA_ID` in `.env.local` and add the GA4 script to `app/layout.tsx`.

## Deployment

Deploy to [Vercel](https://vercel.com) with one command:

```bash
npx vercel
```

Set environment variables in the Vercel dashboard.
