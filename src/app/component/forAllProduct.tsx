import { CommonType } from "./commonType";


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

export default async function AllProducts() {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const data: CommonType[] = await res.json();

  return (
    <div className="container mx-auto mt-14">
      <h1 className="text-2xl font-bold">সব পণ্য</h1>
      <p className="mb-4 text-sm text-gray-600">
        মোট {data.length}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {data.map((p) => {
          const b = badge[p.change.dir];

          return (
            <div key={p.id} className="rounded-3xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
                  {p.image}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{p.nameBn}</h3>
                  <p className="text-sm text-gray-600">{unitBn[p.unit] ?? p.unit}</p>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-700">আজকের দাম</p>
                  <p className="text-xl font-bold">{p.today} টাকা</p>
                </div>

                <span className={`rounded-full px-3 py-1 text-sm ${b.style}`}>
                  {b.icon}{" "}
                  {Math.abs(p.change.pct).toLocaleString("bn-BD", {
                    minimumFractionDigits: 1,
                  })}
                  %
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}