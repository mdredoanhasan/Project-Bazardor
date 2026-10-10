"use client";

import { signIn } from "@/app/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Toast,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const callbackURL = new URLSearchParams(window.location.search).get(
      "callbackURL",
    );
    const safeCallbackURL =
      callbackURL?.startsWith("/") && !callbackURL.startsWith("//")
        ? callbackURL
        : "/";

    if (!data.email || !data.password) {
        Toast.toast.danger("ইমেইল ও পাসওয়ার্ড দিন।");
        return;
    }

    setIsSubmitting(true);
    try {
        const { error } = await signIn.email({
          email: data.email,
          password: data.password,
          rememberMe: true,
        });

        if (error) {
          Toast.toast.danger(error.message ?? "সাইন ইন করা যায়নি।");
          return;
        }

        Toast.toast.success("সাইন ইন সফল হয়েছে।");
        router.replace(safeCallbackURL);
        router.refresh();
    } catch (error) {
        Toast.toast.danger(
          error instanceof Error ? error.message : "সাইন ইন করা যায়নি।",
        );
    } finally {
        setIsSubmitting(false);
    }
  };

  const onInvalid = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Toast.toast.danger("ইমেইল ও পাসওয়ার্ড সঠিকভাবে পূরণ করুন।");
  };

  return (
    <div className="mx-auto w-full max-w-md py-10 text-center">
      <h1 className="text-2xl font-bold">সাইন ইন</h1>
      <p className="mb-6 text-sm text-gray-600">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <div className="rounded-3xl border bg-white p-6 text-left">
        <Form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
          onInvalid={onInvalid}
        >
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল দিন";
              }
              return null;
            }}
          >
            <Label>ইমেইল</Label>
            <Input placeholder="you@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }
              if (!/[A-Z]/.test(value)) {
                return "কমপক্ষে ১টি বড় হাতের অক্ষর দিন";
              }
              if (!/[0-9]/.test(value)) {
                return "কমপক্ষে ১টি সংখ্যা দিন";
              }
              return null;
            }}
          >
            <Label>পাসওয়ার্ড</Label>
            <Input placeholder="কমপক্ষে ৮ অক্ষর" />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="w-full bg-green-700 text-white"
          >
            {isSubmitting ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </Button>
        </Form>

        <div className="my-4 flex items-center gap-3 text-xs text-gray-600">
          <div className="h-px flex-1 bg-gray-200" />
          অথবা
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary">
            <FcGoogle /> Google দিয়ে চালিয়ে যান
          </Button>
          <Button variant="secondary">
            <FaGithub /> GitHub দিয়ে চালিয়ে যান
          </Button>
        </div>

        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/sign-up" className="text-green-700 hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-6 inline-block text-sm text-gray-600">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};
export default SignInPage;