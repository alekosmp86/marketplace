import { RequestStatus } from "@/app/api/types/RequestStatus";
import { openDB } from "./indexedDB";
import { OfflineSale } from "@/src/types/OfflineSale";

export async function saveSale(sale: OfflineSale) {
  const db = await openDB();

  try {
    return await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("sales", "readwrite");
      const store = tx.objectStore("sales");

      store.put(sale);

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}

export async function getPendingSales() {
  const db = await openDB();

  try {
    return await new Promise<OfflineSale[]>((resolve, reject) => {
      const tx = db.transaction("sales", "readonly");
      const store = tx.objectStore("sales");

      const request = store.getAll();
      request.onsuccess = () => resolve(request.result ?? []);
      request.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
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

  const { message, data } = await response.json();

  if (message === RequestStatus.SUCCESS) {
    console.log("Sync successful, cleaning up local DB. IDs to remove:", data);
    try {
      const db = await openDB();
      console.log("DB opened for cleanup");

      try {
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction("sales", "readwrite");
          const store = tx.objectStore("sales");

          if (Array.isArray(data)) {
            data.forEach((saleId: string) => {
              console.log("Deleting sale:", saleId);
              store.delete(saleId);
            });
          } else {
            console.error("Data returned from sync is not an array:", data);
          }

          tx.oncomplete = () => {
            console.log("Cleanup transaction complete");
            resolve();
          };
          tx.onerror = (e) => {
            console.error("Cleanup transaction error:", tx.error);
            reject(tx.error);
          };
        });
        console.log("Cleanup finished successfully");
      } finally {
        db.close();
      }
    } catch (error) {
      console.error("Error during local DB cleanup:", error);
    }
  } else {
    console.warn("Sync response was not SUCCESS:", message);
  }
}
