"use client";

import { Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConnectivityIndicator() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(!navigator.onLine);
    const onOnline = () => setOffline(false);
    const onOffline = () => setOffline(true);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
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
