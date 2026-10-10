"use client";

import Image from "next/image";
import DateAndTime from "./dateAndTime";
import { Avatar, Button, Dropdown } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient, useSession } from "../lib/auth-client";

const HeaderPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setSignOutError(null);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setSignOutError(error.message ?? "সাইন আউট করা যায়নি।");
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      setSignOutError(
        error instanceof Error ? error.message : "সাইন আউট করা যায়নি।",
      );
    }
  };

  return (
    <div className="border border-b-black/10">
      <div className="container mx-auto mt-3 mb-3 flex justify-between">
        <Link href={"/"}>
          <div className="flex">
            <Image src={"/Stack.png"} alt="logo" height={40} width={54} />
            <div className="ml-2">
              <p className="text-2xl font-bold">বাজার দর</p>
              <span className="text-[14px] opacity-80">
                <DateAndTime />
              </span>
            </div>
          </div>
        </Link>

        {session?.user ? (
          <div className="flex flex-col items-end">
            <Dropdown>
              <Dropdown.Trigger
                aria-label="ব্যবহারকারীর মেনু খুলুন"
                className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100"
              >
                <Avatar
                  color="accent"
                  size="md"
                  aria-label={`${session.user.name} avatar`}
                >
                  {session.user.image && (
                    <Avatar.Image
                      src={session.user.image}
                      alt={session.user.name}
                    />
                  )}
                  <Avatar.Fallback>
                    {Array.from(session.user.name.trim())[0]?.toUpperCase() ??
                      "U"}
                  </Avatar.Fallback>
                </Avatar>
                <span>{session.user.name}</span>
                <span aria-hidden="true" className="text-xs text-gray-500">
                  ▼
                </span>
              </Dropdown.Trigger>
              <Dropdown.Popover placement="bottom end">
                <Dropdown.Menu aria-label="ব্যবহারকারী মেনু">
                  <Dropdown.Item
                    id="account-details"
                    isDisabled
                    textValue={`${session.user.name} ${session.user.email}`}
                  >
                    <span className="flex flex-col">
                      <span className="font-semibold">{session.user.name}</span>
                      <span className="text-xs text-gray-500">
                        {session.user.email}
                      </span>
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="profile"
                    textValue="আমার প্রোফাইল"
                    onAction={() => router.push("/profile")}
                  >
                    👤 আমার প্রোফাইল
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="sign-out"
                    textValue="সাইন আউট"
                    onAction={handleSignOut}
                  >
                    ↩ সাইন আউট
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
            {signOutError && (
              <p className="mt-1 text-right text-xs text-red-600" role="alert">
                {signOutError}
              </p>
            )}
          </div>
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
