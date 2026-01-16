"use client";

import { getPendingSales, syncSales } from "@/src/lib/indexedDB";
import { Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConnectivityHandler() {
  const [offline, setOffline] = useState(false);

  const syncPendingSales = async () => {
    const sales = await getPendingSales();
    if (sales.length > 0) {
      await syncSales(sales);
    }
  };

  useEffect(() => {
    setOffline(!navigator.onLine);
    const onOnline = () => setOffline(false);
    const onOffline = () => setOffline(true);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", syncPendingSales);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", syncPendingSales);
    };
  }, []);

  return (
    <div
      className={`text-sm px-3 py-1 rounded-lg ${offline ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
    >
      {offline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
    </div>
  );
}
