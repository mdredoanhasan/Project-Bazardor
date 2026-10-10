"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface ProductCategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function CategoryNavLinks({
  categories,
}: {
  categories: ProductCategory[];
}) {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
      {categories.map((category) => {
        const href = `/category/${category.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            href={href}
            key={category.id}
            aria-current={isActive ? "page" : undefined}
            className={`shrink-0 rounded-lg px-3 py-1.5 transition-colors ${
              isActive
                ? "bg-[#05893e] text-white"
                : "text-gray-800 hover:bg-[#05893e] hover:text-white"
            }`}
          >
            {category.icon} {category.nameBn}
          </Link>
        );
      })}
    </div>
  );
}
