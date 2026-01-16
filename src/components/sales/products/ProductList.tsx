import { Plus } from "lucide-react";
import AddProductModal from "./AddProductDialog";
import { useState } from "react";
import { saveSingleProduct } from "@/src/lib/indexedDB";
import { SalesItem } from "@/app/api/(business)/sales/models/SalesItem";
import ProductRow from "./ProductRow";

type ProductListProps = {
  items: SalesItem[];
  onAddProduct: (item: SalesItem) => void;
  onRemoveProduct: (item: SalesItem) => void;
};

export default function ProductList({ items, onAddProduct, onRemoveProduct }: ProductListProps) {
  const [open, setOpen] = useState(false);

  const handleAddProduct = (item: SalesItem) => {
    setOpen(false);
    saveSingleProduct(item.product);
    onAddProduct(item);
  };

  const handleRemoveProduct = (item: SalesItem) => {
    onRemoveProduct(item);
  }

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

        {items.map((item) => (
          <ProductRow key={item.product.id} item={item} onRemove={handleRemoveProduct}/>
        ))}
      </div>
    </>
  );
}
