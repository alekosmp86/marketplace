"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type AddProductActionableProps = {
  onAdd: (name: string, price: number) => void;
};

export default function AddProductActionable({
  onAdd,
}: AddProductActionableProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function handleAdd() {
    if (!name || !price) return;
    onAdd(name, Number(price));
    setName("");
    setPrice("");
  }

  return (
    <div className='m-3 flex items-center rounded-xl border border-neutral-200 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary-200 transition'>
      {/* Product name */}
      <input
        placeholder='Producto'
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='flex-1 bg-transparent text-sm font-semibold text-neutral-900 outline-none placeholder-neutral-400'
      />

      {/* Price */}
      <div className='flex items-center gap-1 rounded-lg bg-neutral-100 px-2 py-1'>
        <span className='text-xs font-medium text-neutral-500'>$</span>
        <input
          placeholder='0.00'
          inputMode='decimal'
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className='w-13 bg-transparent text-right text-sm font-medium text-neutral-800 outline-none'
        />
      </div>

      {/* Add */}
      <button
        onClick={handleAdd}
        className='ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-white'
        aria-label='Agregar producto'
      >
        <Plus className='h-4 w-4' />
      </button>
    </div>
  );
}
