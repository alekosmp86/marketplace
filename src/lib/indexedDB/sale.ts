import { openDB } from "./indexedDB";
import { OfflineSale } from "@/src/types/OfflineSale";

export async function saveSale(sale: OfflineSale) {
  const db = await openDB();

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("sales", "readwrite");
    const store = tx.objectStore("sales");

    store.put(sale);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
