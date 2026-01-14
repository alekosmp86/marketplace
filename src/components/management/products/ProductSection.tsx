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
        "market-id": localStorage.getItem("market-id")!,
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
        "market-id": localStorage.getItem("market-id")!,
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
      headers: {
        "market-id": localStorage.getItem("market-id")!,
      },
    });
    const { message } = await response.json();
    if (message === RequestStatus.SUCCESS) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div className='flex flex-col h-screen bg-neutral-100'>
      {/* HEADER */}
      <SectionHeader title='Productos' />

      {/* ADD PRODUCT */}
      <AddProductActionable onAdd={addProduct} />

      {/* LIST */}
      <div className='flex-1 overflow-y-auto max-h-[65vh] p-4 space-y-3 bg-neutral-50'>
        {products.map((p) => (
          <div
            key={p.id}
            className='group bg-white rounded-xl border border-neutral-200 px-4 py-3 shadow-sm'
          >
            {/* Product name */}
            <input
              defaultValue={p.name}
              onBlur={(e) => updateProduct(p.id, "name", e.target.value)}
              className='w-full text-base font-semibold text-neutral-900 bg-neutral-100 rounded-lg px-3 py-2 outline-none focus:bg-white focus:ring-2 focus:ring-primary-200'
            />

            {/* Bottom row */}
            <div className='mt-3 flex items-center justify-between'>
              {/* Price */}
              <div className='flex items-center gap-1 bg-neutral-100 rounded-lg px-3 py-2'>
                <span className='text-sm font-medium text-neutral-500'>$</span>
                <input
                  defaultValue={p.price}
                  inputMode='decimal'
                  onBlur={(e) =>
                    updateProduct(p.id, "price", Number(e.target.value))
                  }
                  className='w-24 text-right text-sm font-semibold text-neutral-800 bg-transparent outline-none'
                />
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteProduct(p.id)}
                className='p-2 rounded-full active:bg-red-50 bg-red-50'
                aria-label='Delete product'
              >
                <X className='w-5 h-5 text-red-500' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
