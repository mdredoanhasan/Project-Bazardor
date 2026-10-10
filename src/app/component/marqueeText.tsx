import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import type { CommonType } from "./commonType";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const trend = {
  up: { icon: "▲", color: "text-red-500" },
  down: { icon: "▼", color: "text-green-500" },
  flat: { icon: "—", color: "text-gray-500" },
};

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch marquee products: ${res.status}`);
  }

  const payload: unknown = await res.json();
  if (!Array.isArray(payload)) {
    throw new Error("Marquee products API returned an invalid response.");
  }
  const data: CommonType[] = payload;

  return (
    <div className="border-b">
      <MarqueeText className="m-2">
        {data.map((p) => {
          const t = trend[p.change.dir];

          return (
            <span key={p.id} className="mx-6 my-2 inline-flex items-center gap-2">
              <span>{p.image}</span>
              <span>{p.nameBn}</span>
              <span>{`${p.today} টাকা/${unitBn[p.unit] ?? p.unit}`}</span>
              <span className={t.color}>
                {t.icon} {Math.abs(p.change.pct)}%
              </span>
            </span>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;