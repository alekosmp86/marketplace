import { SalesProductRow } from "../SalesProductRow";
import { Plus } from "lucide-react";
import AddProductModal from "./AddProductDialog";
import { useEffect, useState } from "react";
import { Product } from "@/app/api/(business)/products/models/Product";
import { saveSingleProduct } from "@/src/lib/indexedDB";
import { OfflineProduct } from "@/src/types/OfflineProduct";
import { loadProductsFromDB, saveProducts } from "@/src/lib/indexedDB/product";
import { RequestStatus } from "@/app/api/types/RequestStatus";

export default function ProductList() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<(Product | OfflineProduct)[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        if (!navigator.onLine) {
          const products: OfflineProduct[] = await loadProductsFromDB();
          setProducts(products);
          setLoading(false);
          return;
        }

        const res = await fetch("/api/products", {
          headers: {
            "market-id": localStorage.getItem("market-id")!,
          },
        });
        const { message, data }: { message: string; data: Product[] } =
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
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = (product: Product) => {
    setOpen(false);
    saveSingleProduct({ ...product, pendingSync: true });
    setProducts((prev) => [...prev, product]);
  };

  return (
    <>
      <AddProductModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddProduct}
      />
      <div className="space-y-2">
        <button
          className="w-full flex items-center text-left px-3 py-2 border border-dashed rounded-md text-sm text-gray-500"
          onClick={() => setOpen(true)}
        >
          <Plus /> Agregar Producto
        </button>

        {products.map((p) => (
          <SalesProductRow key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
