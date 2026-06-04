import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cogochat.com";
const siteName = "CogoChat";
const defaultDescription =
  "CogoChat builds high-converting websites and marketing campaigns for local businesses. Turn visitors into leads—fast.";

export function buildMetadata({
  title,
  description = defaultDescription,
  path = "",
  image = "/og-image.png",
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title: `${title} | ${siteName}`,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
