"use client";

import { signIn } from "@/app/lib/auth-client";
import { Button } from "@heroui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const requestedCallback = new URLSearchParams(
        window.location.search,
      ).get("callbackURL");
      const safeCallbackURL =
        requestedCallback?.startsWith("/") &&
        !requestedCallback.startsWith("//")
          ? requestedCallback
          : "/";
      const callback = new URL(safeCallbackURL, window.location.origin);
      if (callback.origin !== window.location.origin) {
        callback.pathname = "/";
        callback.search = "";
      }

      const { error } = await signIn.social({
        provider: "google",
        callbackURL: `${callback.pathname}${callback.search}`,
        errorCallbackURL: "/sign-in?authError=google",
      });

      if (error) {
        setErrorMessage(error.message ?? "Google দিয়ে সাইন ইন করা যায়নি।");
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Google দিয়ে সাইন ইন করা যায়নি।",
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onPress={handleGoogleSignIn}
        isDisabled={isLoading}
      >
        <FcGoogle />
        {isLoading ? "Google-এ সংযোগ হচ্ছে..." : "Google দিয়ে চালিয়ে যান"}
      </Button>
      {errorMessage && (
        <p role="alert" className="col-span-2 text-sm text-red-600">
          {errorMessage}
        </p>
      )}
    </>
  );
}
