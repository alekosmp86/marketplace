"use client";

import { getPendingSales, syncSales } from "@/src/lib/indexedDB";
import { Wifi, WifiOff } from "lucide-react";
import { useNetworkStatus } from "@/src/lib/hooks/useNetworkStatus";

export default function ConnectivityHandler() {
  const syncPendingSales = async () => {
    const sales = await getPendingSales();
    if (sales.length > 0) {
      await syncSales(sales);
    }
  };

  const {offline} = useNetworkStatus(syncPendingSales);

  return (
    <div
      className={`text-sm px-3 py-1 rounded-lg ${offline ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
    >
      {offline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
    </div>
  );
}
