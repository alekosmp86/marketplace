import { createContext, useEffect, useState } from "react";
import { OfflineProduct } from "@/src/types/OfflineProduct";
import { loadProductsFromDB, saveProducts } from "../indexedDB";
import { RequestStatus } from "@/app/api/types/RequestStatus";

interface ProductContextValue {
  products: OfflineProduct[];
  setProducts: (products: OfflineProduct[]) => void;
}

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined
);

export function ProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<OfflineProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!navigator.onLine) {
          const products: OfflineProduct[] = await loadProductsFromDB();
          setProducts(products);
          return;
        }

        const res = await fetch("/api/products", {
          headers: {
            "market-id": localStorage.getItem("market-id")!,
          },
        });
        const { message, data }: { message: string; data: OfflineProduct[] } =
          await res.json();

        if (message === RequestStatus.SUCCESS) {
          // Save valid products from server to IndexedDB (as "clean" data, so pendingSync is false or undefined)
          await saveProducts(data.map((p) => ({ ...p, pendingSync: false })));
          setProducts(data);
        } else {
          console.log(message);
        }
      } catch (error) {
        console.error(
          "Error loading products, falling back to offline DB:",
          error
        );
        const products: OfflineProduct[] = await loadProductsFromDB();
        setProducts(products);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
