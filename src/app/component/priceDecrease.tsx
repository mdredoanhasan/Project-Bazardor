import { CommonType } from "./commonType";

export default async function PriceDecrease() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const data: CommonType[] = await res.json();

  const decrease = data.filter((p) => p.change.pct < 0).slice(0, 6);

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-xl font-bold">
        <span className="text-green-600">▼</span> আজ দাম কমেছে
      </h1>

      <div className="grid gap-4 sm:grid-cols-3">
        {decrease.map((p) => (
          <div key={p.id} className="rounded-3xl border bg-white p-4">
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

              <span className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-600">
                ▼ {Math.abs(p.change.pct)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
