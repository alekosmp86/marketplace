import { useProducts } from "@/src/lib/hooks/useProducts";
import { SalesProductRow } from "../SalesProductRow";
import { SaleItem } from "@/app/api/(business)/sales/models/SaleItem";
import { Plus } from "lucide-react";
import AddProductModal from "./AddProductDialog";
import { useState } from "react";
import { Product } from "@/app/api/(business)/products/models/Product";

export default function ProductList() {
  const { products, setProducts } = useProducts();
  const [open, setOpen] = useState(false);

  const handleAddProduct = (product: Omit<Product, "id">) => {
    setOpen(false);
    setProducts((prev) => [...prev, { ...product, id: "" }]);
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
