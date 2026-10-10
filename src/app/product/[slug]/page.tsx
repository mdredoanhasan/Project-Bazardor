import { CommonType } from "@/app/component/commonType";
import Link from "next/link";
import { notFound } from "next/navigation";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const products: CommonType[] = await res.json();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto my-14 max-w-3xl px-4">
      <Link href="/" className="text-sm text-green-700 hover:underline">
        ← সব পণ্যে ফিরে যান
      </Link>

      <article className="mt-6 rounded-3xl border bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
            {product.image}
          </div>
          <div>
            <p className="text-sm text-gray-600">{product.categoryNameBn}</p>
            <h1 className="text-2xl font-bold">{product.nameBn}</h1>
            <p className="text-sm text-gray-600">
              দাম {unitBn[product.unit] ?? product.unit} হিসাবে
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-green-50 p-5">
          <p className="text-sm text-gray-700">আজকের দাম</p>
          <p className="mt-1 text-3xl font-bold">
            {product.today.toLocaleString("bn-BD")} টাকা
          </p>
          <p
            className={`mt-2 text-sm ${
              product.change.dir === "up"
                ? "text-red-600"
                : product.change.dir === "down"
                  ? "text-green-600"
                  : "text-gray-600"
            }`}
          >
            {product.change.dir === "up"
              ? "▲ দাম বেড়েছে"
              : product.change.dir === "down"
                ? "▼ দাম কমেছে"
                : "— দাম অপরিবর্তিত"}
            {" "}
            {Math.abs(product.change.pct).toLocaleString("bn-BD", {
              minimumFractionDigits: 1,
            })}
            %
          </p>
        </div>

        <h2 className="mb-3 mt-8 text-lg font-bold">আগের দামের তুলনা</h2>
        <dl className="grid gap-3 sm:grid-cols-3">
          {[
            ["গতকাল", product.yesterday],
            ["গত সপ্তাহে", product.lastWeek],
            ["গত মাসে", product.lastMonth],
          ].map(([label, price]) => (
            <div key={label} className="rounded-xl border p-4">
              <dt className="text-sm text-gray-600">{label}</dt>
              <dd className="mt-1 font-semibold">
                {price.toLocaleString("bn-BD")} টাকা
              </dd>
            </div>
          ))}
        </dl>
      </article>
    </main>
  );
}
