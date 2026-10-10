"use client";

import type { CommonType } from "./commonType";
import Link from "next/link";
import { useMemo, useState } from "react";

type PriceSortOrder = "default" | "ascending" | "descending";

const unitBn: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const badge = {
  up: { icon: "▲", style: "bg-red-50 text-red-600" },
  down: { icon: "▼", style: "bg-green-50 text-green-600" },
  flat: { icon: "—", style: "bg-gray-100 text-gray-600" },
};

const toBn = (value: number) => value.toLocaleString("bn-BD");

function parseNumericPrice(value: number | string): number {
  const normalized = String(value)
    .replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[٬،,]/g, "")
    .replace(/[^\d.-]/g, "");

  return Number(normalized);
}

export default function CategoryProductList({
  products,
}: {
  products: CommonType[];
}) {
  const [sortOrder, setSortOrder] = useState<PriceSortOrder>("default");

  const sortedProducts = useMemo(() => {
    if (sortOrder === "default") {
      return products;
    }

    return [...products].sort((first, second) => {
      const firstPrice = parseNumericPrice(first.today);
      const secondPrice = parseNumericPrice(second.today);

      if (!Number.isFinite(firstPrice) || !Number.isFinite(secondPrice)) {
        return 0;
      }

      return sortOrder === "ascending"
        ? firstPrice - secondPrice
        : secondPrice - firstPrice;
    });
  }, [products, sortOrder]);

  return (
    <>
      <div className="flex items-center justify-end gap-2 rounded-2xl border bg-white p-3 text-sm sm:p-4">
        <label htmlFor="product-price-sort" className="shrink-0 text-gray-600">
          সাজান
        </label>
        <div className="relative">
          <select
            id="product-price-sort"
            value={sortOrder}
            onChange={(event) => {
              const value = event.currentTarget.value;
              if (
                value === "default" ||
                value === "ascending" ||
                value === "descending"
              ) {
                setSortOrder(value);
              }
            }}
            className="appearance-none rounded-lg border bg-white py-1.5 pl-3 pr-9"
          >
            <option value="default">ডিফল্ট</option>
            <option value="ascending">দাম: কম থেকে বেশি</option>
            <option value="descending">দাম: বেশি থেকে কম</option>
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600"
          >
            <path
              d="m5 7.5 5 5 5-5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {sortedProducts.map((product) => {
          const productBadge = badge[product.change.dir];

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="block rounded-2xl border bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                  {product.image}
                </div>
                <div>
                  <h3 className="font-bold">{product.nameBn}</h3>
                  <p className="text-xs text-gray-600">
                    {unitBn[product.unit] ?? product.unit}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-700">আজকের দাম</p>
                  <p className="text-lg font-bold">
                    {toBn(product.today)} টাকা
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs ${productBadge.style}`}
                >
                  {productBadge.icon}{" "}
                  {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                    minimumFractionDigits: 1,
                  })}
                  %
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
