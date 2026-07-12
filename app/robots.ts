import type { MetadataRoute } from "next";

// Generated at build time into /robots.txt. The decoder page is Greg's
// private tool and the Stripe setup guide is internal documentation —
// neither belongs in search results.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/decode/", "/stripe-setup-instructions/"],
    },
    sitemap: "https://italybygreg.com/sitemap.xml",
  };
}
