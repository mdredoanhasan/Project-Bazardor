"use client";

import Image from "next/image";
import DateAndTime from "./dateAndTime";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useSession } from "../lib/auth-client";

const HeaderPage = () => {
  const { data: session } = useSession();
  return (
    <div className="border border-b-black/10">
      <div className="container mx-auto flex justify-between mt-3 mb-3 ">
        <Link href={"/"}>
        <div className="flex ">
          <Image src={"/Stack.png"} alt="logo" height={40} width={54} />
          <div className="ml-2">
            <p className="font-bold text-2xl ">বাজার দর</p>
            <span className="text-[14px] opacity-80">
              <DateAndTime />
            </span>
          </div>
          </div>
          </Link>

        {session?.user ? (
          <span>{session.user?.name}</span>
        ) : (
          <div>
            <Link href={"/sign-in"}>
              <Button className="text-black bg-white">সাইন ইন</Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button className="bg-[#05893e]">সাইন আপ</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderPage;
