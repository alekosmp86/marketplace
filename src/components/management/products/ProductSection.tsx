"use client";

import { useProducts } from "@/src/lib/hooks/useProducts";
import AddProductActionable from "./AddProductActionable";
import { RequestStatus } from "@/app/api/types/RequestStatus";
import SectionHeader from "../../shared/SectionHeader";
import { X } from "lucide-react";

export function ProductSection() {
  const { products, setProducts } = useProducts();

  async function addProduct(name: string, price: number) {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price }),
    });
    const { message, data } = await response.json();

    if (message === RequestStatus.SUCCESS) {
      setProducts((prev) => [...prev, data]);
    }
  }

  async function updateProduct(
    id: string,
    field: "name" | "price",
    value: string | number
  ) {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [field]: value }),
    });
    const { message } = await response.json();
    if (message === RequestStatus.SUCCESS) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, [field]: field === "price" ? Number(value) : value }
            : p
        )
      );
    }
  }

  async function deleteProduct(id: string) {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const { message } = await response.json();
    if (message === RequestStatus.SUCCESS) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <SectionHeader title="Productos" />

      {/* ADD PRODUCT */}
      <AddProductActionable onAdd={addProduct} />

      {/* LIST */}
      <div className="flex-1 overflow-y-auto max-h-[65vh] p-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-2 px-4 py-3 border-b"
          >
            <input
              defaultValue={p.name}
              onBlur={(e) => updateProduct(p.id, "name", e.target.value)}
              className="flex-1 text-base"
            />

            <input
              defaultValue={p.price}
              inputMode="numeric"
              onBlur={(e) =>
                updateProduct(p.id, "price", Number(e.target.value))
              }
              className="w-20 text-right"
            />

            <button
              onClick={() => deleteProduct(p.id)}
              className="text-gray-400 text-xl px-2"
            >
              <X className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
