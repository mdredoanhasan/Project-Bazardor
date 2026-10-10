import { CommonType } from "@/app/component/commonType";
import Link from "next/link";
import { notFound } from "next/navigation";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const toBn = (n: number) =>
  n.toLocaleString("bn-BD", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );
  const products: CommonType[] = await response.json();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const unit = unitBn[product.unit] ?? product.unit;
  const dir = product.change.dir;
  const diff = Math.abs(product.today - product.yesterday);

  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));

  // markets sorted by average price (low to high)
  const rows = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const trend = {
    up: { icon: "▲", text: "text-red-600", word: "বেড়েছে" },
    down: { icon: "▼", text: "text-green-600", word: "কমেছে" },
    flat: { icon: "—", text: "text-gray-600", word: "অপরিবর্তিত" },
  }[dir];

  return (
    <main className="container mx-auto my-8 max-w-5xl space-y-4 px-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-700">
        <Link href="/" className="hover:underline">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/catagory/${product.category}`}
          className="hover:underline"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span>{product.nameBn}</span>
      </nav>

      {/* Header card */}
      <div className="flex flex-col gap-4 rounded-3xl border bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{product.nameBn}</h1>
            <p className="text-sm text-gray-600">
              প্রতি {unit} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              গতকালের তুলনায় আজ দাম{" "}
              <span className="font-bold">{trend.word}</span> · {toBn(diff)}{" "}
              টাকা
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-gray-100 px-8 py-4 text-center">
          <p className="text-xs text-gray-600">আজকের দাম</p>
          <p className="text-3xl font-bold">{toBn(product.today)}</p>
          <p className="text-xs text-gray-600">টাকা / {unit}</p>
          <p className={`mt-1 text-xs font-semibold ${trend.text}`}>
            {trend.icon} {toBn(Math.abs(product.change.pct))}%
          </p>
        </div>
      </div>

      {/* Summary + table */}
      <div className="rounded-3xl border bg-white p-6">
        <h2 className="mb-4 font-bold">দামের সারসংক্ষেপ</h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <p className="text-xs text-gray-600">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-green-600">
              {toBn(minPrice)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-xs text-gray-600">সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="rounded-2xl border p-4">
            <p className="text-xs text-gray-600">সর্বাধিক দাম</p>
            <p className="text-2xl font-bold text-red-600">
              {toBn(maxPrice)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-xs text-gray-600">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          <div className="rounded-2xl border p-4">
            <p className="text-xs text-gray-600">গড় দাম</p>
            <p className="text-2xl font-bold text-green-700">
              {toBn(product.today)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-xs text-gray-600">প্রতি {unit}-এর হিসাবে</p>
          </div>
        </div>

        <h2 className="mb-3 mt-8 font-bold">বাজারভিত্তিক আজকের দাম</h2>

        <div className="overflow-x-auto rounded-2xl border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="px-4 py-3 font-medium">বাজার</th>
                <th className="px-4 py-3 font-medium">বিভাগ</th>
                <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                <th className="px-4 py-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m, i) => (
                <tr
                  key={m.market}
                  className={`border-b last:border-b-0 ${
                    i % 2 === 1 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="px-4 py-3">{m.market}</td>
                  <td className="px-4 py-3">{m.division}</td>
                  <td className="px-4 py-3 text-right">{toBn(m.min)} টাকা</td>
                  <td className="px-4 py-3 text-right">{toBn(m.max)} টাকা</td>
                  <td className="px-4 py-3 text-right font-bold">
                    {toBn(m.avg)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}