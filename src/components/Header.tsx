"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    update();
    const interval = setInterval(update, 60_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className='flex items-center justify-between px-4 py-3 bg-primary-500 border-b border-primary-200'
    >
      <span className='text-lg font-bold text-primary-50'>My Market</span>

      <span className='text-xs font-medium text-primary-50'>{time}</span>
    </header>
  );
}
