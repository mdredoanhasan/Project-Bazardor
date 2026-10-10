"use client";

import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  const intervalId = window.setInterval(callback, 60_000);

  return () => window.clearInterval(intervalId);
};

const getSnapshot = () =>
  new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

const getServerSnapshot = () => "";

const DateAndTime = () => {
  const date = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <>{date}</>;
};

export default DateAndTime;