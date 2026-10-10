"use client";

import { authClient, useSession } from "@/app/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GoSignOut } from "react-icons/go";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUpdateName = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setMessage(null);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const updatedName = formData.get("name");
    if (typeof updatedName !== "string" || !updatedName.trim()) {
      setErrorMessage("নাম লিখুন।");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await authClient.updateUser({
        name: updatedName.trim(),
      });

      if (error) {
        setErrorMessage(error.message ?? "নাম আপডেট করা যায়নি।");
        return;
      }

      setMessage("নাম আপডেট হয়েছে।");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "নাম আপডেট করা যায়নি।",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <main className="container mx-auto max-w-2xl px-4 py-12">
        <p>প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-2">প্রোফাইল দেখতে সাইন ইন করুন।</p>
        <Link href="/sign-in" className="mt-4 inline-block text-green-700">
          সাইন ইন
        </Link>
      </main>
    );
  }

  const { name, email, image } = session.user;

  return (
    <main className="container mx-auto my-12 max-w-2xl space-y-4 px-4">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-600">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      {/* User card */}
      <section className="flex items-center justify-between gap-4 rounded-3xl border bg-white p-5">
        <div className="flex items-center gap-4">
          {image ? (
            <Image
              src={image}
              alt={name}
              className="h-16 w-16 rounded-2xl bg-gray-100 object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-2xl font-bold text-gray-600">
              {name?.charAt(0)}
            </div>
          )}

          <div>
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm text-gray-600">{email}</p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg border border-red-500 px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
        >
         <span className="flex items-center gap-2 "><GoSignOut /> সাইন আউট</span>
        </button>
      </section>

      {/* Info card */}
      <section className="rounded-3xl border bg-white p-5">
        <h2 className="mb-4 font-semibold">তথ্য</h2>

        <form className="space-y-3 px-3 pb-3" onSubmit={handleUpdateName}>
          <div>
            <label htmlFor="name" className="mb-1 block text-sm">
              নাম
            </label>
            <input
              id="name"
              name="name"
              defaultValue={name}
              required
              className="w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600"
            />
          </div>

          {message && (
            <p className="text-sm text-green-700" role="status">
              {message}
            </p>
          )}
          {errorMessage && (
            <p className="text-sm text-red-600" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="w-full rounded-xl bg-green-700 py-2.5 text-sm font-medium text-white hover:bg-green-800"
          >
            {isSaving ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </section>
    </main>
  );
}