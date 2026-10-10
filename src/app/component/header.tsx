"use client";

import Image from "next/image";
import DateAndTime from "./dateAndTime";
import { Avatar, Button, Dropdown, Toast } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient, useSession } from "../lib/auth-client";
import { GoSignOut } from "react-icons/go";

const HeaderPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setSignOutError(null);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        const message = error.message ?? "সাইন আউট করা যায়নি।";
        setSignOutError(message);
        Toast.toast.danger(message);
        return;
      }

      Toast.toast.success("সাইন আউট সফল হয়েছে।");
      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "সাইন আউট করা যায়নি।";
      setSignOutError(message);
      Toast.toast.danger(message);
    }
  };

  return (
    <div className="border border-b-black/10">
      <div className="container mx-auto my-3 flex items-center justify-between gap-3 px-4">
        <Link href="/" className="min-w-0">
          <div className="flex items-center">
            <Image
              src="/Stack.png"
              alt="logo"
              height={40}
              width={54}
              className="h-9 w-12 shrink-0 sm:h-10 sm:w-13.5"
            />
            <div className="ml-2 min-w-0">
              <p className="truncate text-xl font-bold sm:text-2xl">বাজার দর</p>
              <span className="hidden text-[14px] opacity-80 sm:block">
                <DateAndTime />
              </span>
            </div>
          </div>
        </Link>

        {session?.user ? (
          <div className="flex min-w-0 flex-col items-end">
            <Dropdown>
              <Dropdown.Trigger
                aria-label="ব্যবহারকারীর মেনু খুলুন"
                className="flex max-w-[min(50vw,16rem)] items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 sm:max-w-64"
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
                <span className="max-w-24 truncate text-sm sm:max-w-40 sm:text-base">
                  {session.user.name}
                </span>
                <span aria-hidden="true" className="hidden text-xs text-gray-500 sm:inline">
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
                    <GoSignOut />সাইন আউট
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
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link href={"/sign-in"}>
              <Button className="bg-white px-2 text-sm text-black sm:px-4">
                সাইন ইন
              </Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button className="bg-[#05893e] px-2 text-sm sm:px-4">
                সাইন আপ
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderPage;
