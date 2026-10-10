import BannerSection from "./component/bannerSection";
import AllProducts from "./component/forAllProduct";
import PriceDecrease from "./component/priceDecrease";
import PriceIncrease from "./component/priceIncrease";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="bg-[#f0f5f0]">
      
      <BannerSection />
      <Suspense fallback={<SectionLoading />}>
        <PriceIncrease />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <PriceDecrease />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <AllProducts />
      </Suspense>
    </div>
  );
}

function SectionLoading() {
  return <div className="container mx-auto mb-14 h-48 animate-pulse rounded-2xl bg-gray-100" />;
}
