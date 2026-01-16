"use client";

import { BadgeDollarSign, Home, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderNavItemMobile from "./HeaderNavItemMobile";
import { usePathname } from "next/navigation";
import { DateUtils } from "@/src/lib/utils/date";
import ConnectivityHandler from "../shared/ConnectivityHandler";

const HeaderItems = [
  { id: 1, label: "Punto de venta", url: "/", icon: Home },
  { id: 2, label: "Resumen", url: "/reports/daily", icon: BadgeDollarSign }
];

export function Header() {
  const [time, setTime] = useState<string>("");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => {
      const date = new DateUtils().now();
      setTime(date.time);
    };

    update();
    const interval = setInterval(update, 60_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative z-50 flex items-center justify-between px-4 py-3 bg-primary-500 border-b border-primary-200">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden rounded-lg p-2 text-white transition hover:bg-white/10"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      <span className="text-lg font-bold text-primary-50">My Market</span>

      <span className="text-xs font-medium text-primary-50 flex items-center gap-2">
        {time}
        <ConnectivityHandler />
      </span>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-white shadow-lg border-t border-neutral-200">
          <div className="flex flex-col divide-y divide-neutral-200">
            {HeaderItems.map((item) => (
              <HeaderNavItemMobile
                key={item.id}
                label={item.label}
                href={item.url}
                Icon={item.icon}
                active={pathname === item.url}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
