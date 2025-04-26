// app/components/BreadcrumbNav.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadcrumbNav() {
  const pathname = usePathname();

  // Skip rendering breadcrumbs on homepage
  if (pathname === "/") return null;

  // Generate breadcrumb items from pathname
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return { href, label };
  });

  breadcrumbItems.unshift({ href: "/", label: "Home" });

  return (
    <nav aria-label="Breadcrumb" className="py-2 px-4 text-sm text-black mt-layout-margin">
      <ol className="flex flex-wrap items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li
            key={item.href}
            className="flex items-center"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {index > 0 && (
              <span className="mx-2 text-gray-400" aria-hidden="true">
                /
              </span>
            )}
            <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {index === breadcrumbItems.length - 1 ? (
                <span
                  aria-current="page"
                  className="font-medium"
                  itemProp="name"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:underline hover:text-blue-600"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={`${index + 1}`} />
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}