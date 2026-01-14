"use client";

import { useState } from "react";
import { ProductRow } from "./ProductRow";
import { Banknote } from "lucide-react";
import { useProducts } from "../../lib/hooks/useProducts";

export function SalesScreen() {
  const [total, setTotal] = useState(0);

  const { products } = useProducts();

  const handleSale = () => {
    setTotal(0);
    /** TODO: save sale */
    /** TODO: reload products ordering by most sold */
  };

  return (
    <div className="flex flex-col bg-neutral-50">
      {/* TOTAL */}
      <div className="px-4 py-3 border-b border-neutral-200">
        <span className="text-xs text-neutral-500">TOTAL</span>
        <div className="text-2xl font-bold text-primary-700">$ {total}</div>
      </div>

      {/* PRODUCTS */}
      {products &&
        products.map((p) => (
          <ProductRow
            key={p.id}
            name={p.name}
            price={p.price}
            onAdd={(amount) => setTotal((t) => t + amount)}
          />
        ))}

      {/* ACTIONS */}
      <div className="flex w-full gap-2 p-3 bg-neutral-100 border-t border-neutral-200 absolute bottom-0">
        <button className="flex-1 py-3 border border-neutral-300 rounded-lg text-sm font-semibold bg-white active:bg-neutral-200">
          QUICK SALE
        </button>

        <button
          className="flex-1 flex items-center justify-center gap-2 py-3 border border-neutral-300 rounded-lg text-sm font-semibold bg-primary-500 text-white active:bg-primary-600"
          onClick={handleSale}
        >
          <Banknote className="w-6 h-6" /> VENTA
        </button>
      </div>
    </div>
  );
}
