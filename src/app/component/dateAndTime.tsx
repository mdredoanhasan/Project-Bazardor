"use client";

import { useEffect, useState } from "react";

const DateAndTime = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString("bn-BD", { dateStyle: "full" }));
  }, []);

  return <>{date}</>;
};

export default DateAndTime;