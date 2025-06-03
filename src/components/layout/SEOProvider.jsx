'use client';

import { DefaultSeo } from "next-seo";
import { usePathname } from "next/navigation";

export default function SEOProvider() {
  const pathname = usePathname();
  const baseUrl = "https://edu.galahub.org";
  const currentUrl = `${baseUrl}${pathname}`;

  const getPageTitle = () => {
    if (pathname === "/") {
      return "Gala Education - Empowering minds, shaping the future";
    }
    
    const pathSegment = pathname.split("/").filter(Boolean).pop() || "";
    return pathSegment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") + " | Gala Education";
  };

  const getPageDescription = () => {
    if (pathname === "/") {
      return "Gala Education is an innovative online tutoring platform created by academic experts to serve Tanzanian Primary, Secondary, and High School students.";
    }
    
    const pathSegment = pathname.split("/").filter(Boolean).pop() || "";
    const pageTitle = pathSegment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
      
    return `Explore ${pageTitle} at Gala Education - Tanzania's premier online education platform for Primary, Secondary, and High School students.`;
  };

  return (
    <DefaultSeo
      title={getPageTitle()}
      description={getPageDescription()}
      canonical={currentUrl}
      openGraph={{
        type: "website",
        locale: "en_US",
        url: currentUrl,
        siteName: "Gala Education",
        title: getPageTitle(),
        description: getPageDescription(),
        images: [
          {
            url: `${baseUrl}/gala-logo.png`,
            width: 1200,
            height: 630,
            alt: "Gala Education",
            type: "image/jpeg",
          },
        ],
      }}
      twitter={{
        handle: "@galahub_tz",
        site: "@galahub_tz",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          name: "keywords",
          content: "education, tutoring, Tanzania, primary school, secondary school, high school, online learning"
        },
        {
          name: "author",
          content: "Gala Education"
        }
      ]}
    />
  );
}