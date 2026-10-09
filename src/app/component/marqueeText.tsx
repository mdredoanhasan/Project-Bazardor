import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { CommonType } from "./commonType";

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
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const data: CommonType[] = await res.json();

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