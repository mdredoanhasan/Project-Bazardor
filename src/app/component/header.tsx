import Image from "next/image";
import React from "react";
import DateAndTime from "./dateAndTime";
import { Button } from "@heroui/react";

const HeaderPage = () => {
  return (
    <div className="border border-b-black/10">
      <div className="container mx-auto flex justify-between mt-5 mb-5 ">
        <div className="flex ">
          <Image src={"/Stack.png"} alt="logo" height={40} width={54} />
          <div className="ml-2">
            <p className="font-bold text-2xl ">বাজার দর</p>
            <span className="text-[14px] opacity-80">
              <DateAndTime />
            </span>
          </div>
        </div>

        <div>
          <Button className="text-black bg-white">সাইন ইন</Button>
          <Button className="bg-[#05893e]">সাইন আপ</Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderPage;
