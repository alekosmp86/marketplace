import { RequestStatus } from "@/app/api/types/RequestStatus";
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

export async function getPendingSales() {
  const db = await openDB();

  return new Promise<OfflineSale[]>((resolve, reject) => {
    const tx = db.transaction("sales", "readonly");
    const store = tx.objectStore("sales");

    const request = store.getAll();
    request.onsuccess = () => resolve(request.result ?? []);
    request.onerror = () => reject(tx.error);
  });
}

export async function syncSales(sales: OfflineSale[]) {
  const response = await fetch("/api/sales", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "market-id": localStorage.getItem("market-id")!,
    },
    body: JSON.stringify(sales),
  });

  const { message } = await response.json();

  if (message === RequestStatus.SUCCESS) {
    const db = await openDB();

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("sales", "readwrite");
      const store = tx.objectStore("sales");

      sales.forEach((sale) => store.delete(sale.id));

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
}
