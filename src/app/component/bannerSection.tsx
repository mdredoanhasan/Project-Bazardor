import React from "react";
import DateAndTime from "./dateAndTime";
import { Button} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const BannerSection = () => {
  return (
    <div>
      <div className="container mx-auto my-6 flex flex-col-reverse items-center justify-between gap-5 rounded-2xl bg-white px-5 py-6 sm:my-10 sm:px-8 md:flex-row md:gap-8 lg:px-10">
        <div className="w-full md:w-3/5">
          <span className="rounded-2xl bg-[#05893e]/20 p-2 text-[14px] font-bold text-[#05893e]">
            <DateAndTime />
          </span>
          <h1 className="mt-5 mb-4 text-2xl font-bold sm:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mb-7 text-sm opacity-70 sm:text-base md:mb-10">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন- <br className="hidden lg:block" />
            সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <Link href="#products">
            <Button className="bg-[#05893e]">সব পণ্য দেখুন</Button>
          </Link>
        </div>

        <Image
          src={"/bazar-hero.png"}
          alt="banner image"
          height={300}
          width={300}
          className="h-auto w-36 shrink-0 sm:w-48 md:w-2/5 md:max-w-64"
        ></Image>
      </div>
    </div>
  );
};

export default BannerSection;
