"use client";

import { signIn } from "@/app/lib/auth-client";
import { Button } from "@heroui/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function GithubAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGithubSignIn = async () => {
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
        provider: "github",
        callbackURL: `${callback.pathname}${callback.search}`,
        errorCallbackURL: "/sign-in?authError=github",
      });

      if (error) {
        setErrorMessage(error.message ?? "GitHub দিয়ে সাইন ইন করা যায়নি।");
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "GitHub দিয়ে সাইন ইন করা যায়নি।",
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onPress={handleGithubSignIn}
        isDisabled={isLoading}
      >
        <FaGithub />
        {isLoading ? "GitHub-এ সংযোগ হচ্ছে..." : "GitHub দিয়ে চালিয়ে যান"}
      </Button>
      {errorMessage && (
        <p role="alert" className="col-span-2 text-sm text-red-600">
          {errorMessage}
        </p>
      )}
    </>
  );
}
