import { useEffect, useState } from "react";

export function useNetworkStatus(onOnline?: () => void) {
  const [offline, setOffline] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
      onOnline?.();
    };

    const handleOffline = () => {
      setOffline(true);
    };

    // run only on client
    setOffline(!navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [onOnline]);

  return { offline };
}
