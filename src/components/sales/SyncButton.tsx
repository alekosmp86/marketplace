import { getPendingSales, syncSales } from "@/src/lib/indexedDB";
import { WifiSync } from "lucide-react";
import { useEffect, useState } from "react";
import { useNetworkStatus } from "@/src/lib/hooks/useNetworkStatus";

interface SyncButtonProps {
  pendingSyncTrigger: number;
}

export default function SyncButton({ pendingSyncTrigger }: SyncButtonProps) {
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const {offline} = useNetworkStatus();

  useEffect(() => {
    getPendingSales().then((sales) => {
      setPendingSyncCount(sales.length);
    });
  }, [pendingSyncTrigger]);

  const syncPendingSales = async () => {
    const sales = await getPendingSales();
    await syncSales(sales);
    setPendingSyncCount(0);
  };

  return (
    <button
      className={`${offline ? "bg-neutral-400 cursor-not-allowed" : "bg-accent-400"} flex h-10 items-center gap-2 relative px-3 rounded-md border border-neutral-300 text-white`}
      onClick={syncPendingSales}
      disabled={offline}
    >
      <WifiSync className="w-6 h-6" />
      {/* Badge */}
      <span className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
        {pendingSyncCount}
      </span>
    </button>
  );
}
