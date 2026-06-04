interface LocalBusinessSchemaProps {
  name?: string;
  url?: string;
  telephone?: string;
}

export function LocalBusinessSchema({
  name = "CogoChat",
  url = "https://cogochat.com",
  telephone = "",
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    url,
    telephone,
    areaServed: "United Kingdom",
    description: "Web design and digital marketing for small businesses everywhere.",
    priceRange: "££",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
