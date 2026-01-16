import { Product } from "@/app/api/(business)/products/models/Product";
import { useState } from "react";

type AddProductModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, "id">) => void;
};

export default function AddProductModal({
  open,
  onClose,
  onSubmit,
}: AddProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newProduct: Omit<Product, "id"> = { name, price };
    onSubmit(newProduct);

    // reset
    setName("");
    setPrice(0);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-sm rounded-md bg-white shadow-lg">
        {/* Header */}
        <div className="border-b px-4 py-3 rounded-t-md bg-primary-600">
          <h2 className="text-white font-semibold">
            Agregar Producto
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1">
              NOMBRE
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1">
              PRECIO (por kg)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-neutral-300 py-2 bg-neutral-100 text-neutral-600 text-sm font-medium"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 rounded-lg py-2 text-sm font-semibold bg-accent-500 text-white active:bg-primary-600"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
