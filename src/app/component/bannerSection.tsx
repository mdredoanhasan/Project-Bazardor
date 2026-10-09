import React from "react";
import DateAndTime from "./dateAndTime";
import { Button} from "@heroui/react";
import Image from "next/image";

const BannerSection = () => {
  return (
    <div>
      <div className="flex container mx-auto mt-14 mb-14 bg-white rounded-2xl px-10 pb-10 pt-4 justify-between ">
        <div>
          <span className="text-[14px] bg-[#05893e]/20 text-[#05893e] font-bold p-2 rounded-2xl ">
            <DateAndTime />
          </span>
          <h1 className="mt-5 mb-5 font-bold text-3xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="opacity-70 mb-12">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন- <br/>সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <Button className='bg-[#05893e]'>সব পণ্য দেখুন</Button>
        </div>

        <Image
          src={"/bazar-hero.png"}
          alt="banner image"
          height={300}
          width={300}
        ></Image>
      </div>
    </div>
  );
};

export default BannerSection;
