import { openDB } from "./indexedDB";
import { OfflineProduct } from "@/src/types/OfflineProduct";

export function loadProductsFromDB(): Promise<OfflineProduct[]> {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("products", "readonly");
      const store = transaction.objectStore("products");
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
        db.close();
      };

      request.onerror = () => {
        reject(request.error);
        db.close();
      };
    });
  });
}

export function saveSingleProduct(product: OfflineProduct) {
  const db = openDB();

  db.then((db) => {
    const transaction = db.transaction("products", "readwrite");
    const store = transaction.objectStore("products");
    store.put(product);
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

export function saveProducts(products: OfflineProduct[]): Promise<void> {
  const db = openDB();

  return db.then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("products", "readwrite");
      const store = transaction.objectStore("products");
      products.forEach((product) => store.put(product));
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
    });
  });
}

export async function getProductById(id: string) {
  const db = await openDB();

  return new Promise<any | null>((resolve, reject) => {
    const tx = db.transaction("products", "readonly");
    const store = tx.objectStore("products");

    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result ?? null);
    };

    request.onerror = () => reject(request.error);
  });
}
