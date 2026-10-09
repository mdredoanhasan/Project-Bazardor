import BannerSection from "./component/bannerSection";
import AllProducts from "./component/forAllProduct";
import PriceDecrease from "./component/priceDecrease";
import PriceIncrease from "./component/priceIncrease";

export default function Home() {
  return (
    <div className="bg-[#f0f5f0]">
      
      <BannerSection />
      <PriceIncrease />
      <PriceDecrease />
      <AllProducts/>
    </div>
  );
}
