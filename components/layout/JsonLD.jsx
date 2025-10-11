"use client";
import { usePathname } from "next/navigation";

export default function JsonLd() {
  const pathname = usePathname();
  const baseUrl = "https://edu.galahub.tz";
  const currentUrl = `${baseUrl}${pathname}`;

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Gala Education",
    url: baseUrl,
    logo: `${baseUrl}/gala-logo.jpg`,
    description:
      "Gala Education is an innovative online tutoring platform created by academic experts to serve Tanzanian Primary, Secondary, and High School students.",
    sameAs: [
      "https://www.instagram.com/galahub.tz/",
      "https://twitter.com/galahub_tz",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "Tanzania",
    },
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: baseUrl,
    name: "Gala Education",
  };

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
  ];

  if (pathname !== "/") {
    const pathSegments = pathname
      .split("/")
      .filter((segment) => segment)
      .map((segment) =>
        segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      );
    pathSegments.forEach((segment, index) => {
      const itemUrl = `${baseUrl}/${pathSegments
        .slice(0, index + 1)
        .join("/")
        .toLowerCase()
        .replace(/ /g, "-")}`;
      breadcrumbItems.push({
        "@type": "ListItem",
        position: index + 2,
        name: segment,
        item: itemUrl,
      });
    });
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  const webPageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: currentUrl,
    name:
      pathname === "/"
        ? "Gala Education Home"
        : breadcrumbItems[breadcrumbItems.length - 1].name,
    description:
      pathname === "/"
        ? "Empowering minds, shaping the future with Gala Education."
        : `Explore ${
            breadcrumbItems[breadcrumbItems.length - 1].name
          } at Gala Education.`,
    isPartOf: {
      "@type": "WebSite",
      url: baseUrl,
      name: "Gala Education",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageData) }}
      />
    </>
  );
}
