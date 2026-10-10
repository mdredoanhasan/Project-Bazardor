import { CommonType } from "@/app/component/commonType";
import Link from "next/link";
import { notFound } from "next/navigation";

const toBn = (n: number) => n.toLocaleString("bn-BD");

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

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const products: CommonType[] = await res.json();

  const data = products.filter((p) => p.category === categoryId);

  if (data.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto mt-8 mb-20 space-y-4 px-4 sm:mt-14 sm:mb-32">
      {/* Category header */}
      <div className="flex items-center gap-3 rounded-2xl border bg-white p-4">
        <span className="text-4xl">{data[0].categoryIcon}</span>
        <div>
          <h1 className="text-xl font-bold">{data[0].categoryNameBn}</h1>
          <p className="text-sm text-gray-600">
            {toBn(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sort bar */}
      <div className="flex items-center justify-end gap-2 rounded-2xl border bg-white p-3 text-sm sm:p-4">
        <span className="text-gray-600">সাজান</span>
        <select className="rounded-lg border bg-white px-3 py-1.5">
          <option>ডিফল্ট</option>
        </select>
      </div>

      <p className="text-sm text-gray-600">
        মোট {toBn(data.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {data.map((p) => {
          const b = badge[p.change.dir];

          return (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="block rounded-2xl border bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                  {p.image}
                </div>
                <div>
                  <h3 className="font-bold">{p.nameBn}</h3>
                  <p className="text-xs text-gray-600">
                    {unitBn[p.unit] ?? p.unit}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-700">আজকের দাম</p>
                  <p className="text-lg font-bold">{toBn(p.today)} টাকা</p>
                </div>

                <span className={`rounded-full px-2.5 py-1 text-xs ${b.style}`}>
                  {b.icon}{" "}
                  {Math.abs(p.change.pct).toLocaleString("bn-BD", {
                    minimumFractionDigits: 1,
                  })}
                  %
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;