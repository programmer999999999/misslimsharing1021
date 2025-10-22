import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Global meta tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/xiaohu.jpeg" type="image/jpeg" />

        {/* Global Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Miss Lim Sharing" />

        {/* Global Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@misslimsharing" />

        {/* LodgingBusiness JSON-LD (site-wide) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Miss Lim Sharing",
              "description": "Comfortable, modern, and thoughtfully designed Airbnb stays across Malaysia. Enjoy bright interiors, fast Wi-Fi, and self check-in for a seamless experience.",
              "image": "https://misslimsharing.com/og-image.png",
              "url": "https://www.misslimsharing.com",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Malaysia"
              },
              "amenityFeature": [
                { "@type": "LocationFeatureSpecification", "name": "Free WiFi" },
                { "@type": "LocationFeatureSpecification", "name": "Self Check-in" },
                { "@type": "LocationFeatureSpecification", "name": "Modern Amenities" }
              ]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
