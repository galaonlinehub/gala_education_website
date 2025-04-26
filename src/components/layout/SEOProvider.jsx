'use client';

import { DefaultSeo } from "next-seo";

export default function SEOProvider() {
  return (
    <DefaultSeo
      openGraph={{
        type: "website",
        locale: "en_US",
        url: "https://edu.galahub.org/",
        siteName: "Gala Education",
        images: [
          {
            url: "https://edu.galahub.org/gala-logo.jpg", //I should remember to change this to OG-image
            width: 1200,
            height: 630,
            alt: "Gala Education",
          },
        ],
      }}
      twitter={{
        handle: "@galahub_tz",
        site: "@galahub_tz",
        cardType: "summary_large_image",
      }}
    />
  );
}