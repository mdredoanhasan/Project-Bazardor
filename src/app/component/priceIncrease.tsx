import Link from "next/link";
import { CommonType } from "./commonType";

export default async function PriceIncrease() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const data: CommonType[] = await res.json();

  const increased = data.filter((p) => p.change.pct > 0).slice(0, 6);

  return (
    <div className="container mx-auto mb-14">
      <h1 className="mb-4 text-xl font-bold">
        <span className="text-red-600">▲</span> আজ দাম বেড়েছে
      </h1>

      <div className="grid gap-4 sm:grid-cols-3">
        {increased.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            className="block rounded-3xl border bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
                {p.image}
              </div>
              <h3 className="text-lg font-bold">{p.nameBn}</h3>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-700">আজকের দাম</p>
                <p className="text-xl font-bold">{p.today} টাকা</p>
              </div>

              <span className="rounded-full bg-red-50 px-3 py-1 text-sm text-red-600">
                ▲ {p.change.pct}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}