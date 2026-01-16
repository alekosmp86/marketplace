const DB_NAME = "market-db";
const DB_VERSION = 1;

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("sales")) {
        const store = db.createObjectStore("sales", {
          keyPath: "id",
        });
        store.createIndex("pendingSync", "pendingSync");
      }

      if (!db.objectStoreNames.contains("products")) {
        db.createObjectStore("products", {
          keyPath: "id",
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

