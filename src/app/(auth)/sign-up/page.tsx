"use client";

import { signUp } from "@/app/lib/auth-client";
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
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    const name = data.name?.trim();
    const email = data.email?.trim();
    const confirmPassword = data.confirmPassword;

    if (!name || name.length < 3) {
      Toast.toast.danger("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।");
      return;
    }
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      Toast.toast.danger("সঠিক ইমেইল দিন।");
      return;
    }
    if (data.password.length < 8 || !/[A-Z]/.test(data.password) || !/[0-9]/.test(data.password)) {
      Toast.toast.danger("পাসওয়ার্ডে কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা দিন।");
      return;
    }
    if (confirmPassword !== data.password) {
      Toast.toast.danger("পাসওয়ার্ড মিলছে না।");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signUp.email({
        name,
        email,
        password: data.password,
      });

      if (error) {
        Toast.toast.danger(error.message ?? "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      Toast.toast.success("অ্যাকাউন্ট তৈরি হয়েছে।");
      router.replace("/");
      router.refresh();
    } catch (error) {
      Toast.toast.danger(
        error instanceof Error ? error.message : "অ্যাকাউন্ট তৈরি করা যায়নি।",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Toast.toast.danger("সব তথ্য সঠিকভাবে পূরণ করুন।");
  };

  return (
    <div className="mx-auto w-full max-w-md py-10 text-center">
      <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mb-6 text-sm text-gray-600">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <div className="rounded-3xl border bg-white p-6 text-left">
        <Form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
          onInvalid={onInvalid}
        >
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label>নাম</Label>
            <Input placeholder="যেমন: রহিম উদ্দিন" />
            <FieldError />
          </TextField>

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
            value={password}
            onChange={setPassword}
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

          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            validate={(value) =>
              value !== password ? "পাসওয়ার্ড মিলছে না" : null
            }
          >
            <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input placeholder="আবার লিখুন" />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="w-full bg-green-700 text-white"
          >
            {isSubmitting ? "তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
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
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/sign-in" className="text-green-700 hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-6 inline-block text-sm text-gray-600">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignUpPage;
