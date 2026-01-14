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
    onAdd(name, Number(price));
    setName("");
    setPrice("");
  }

  return (
    <div className="m-2 pt-2 flex gap-2 border-t">
      <input
        placeholder="Producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 px-3 py-2 border rounded text-sm"
      />
      <input
        placeholder="Precio"
        inputMode="numeric"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-20 px-3 py-2 border rounded text-sm"
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-accent-500 text-white rounded-full text-sm font-semibold"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
