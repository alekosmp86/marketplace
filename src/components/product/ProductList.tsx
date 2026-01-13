"use client";

import { useState } from "react";
import { ProductRow } from "./ProductRow";

type Product = {
  id: number;
  name: string;
  price: number;
};

const PRODUCTS: Product[] = [
  { id: 1, name: "Banana", price: 30 },
  { id: 2, name: "Apple", price: 40 },
  { id: 3, name: "Potato", price: 25 },
  { id: 4, name: "Tomato", price: 35 },
  { id: 5, name: "Onion", price: 20 },
];

export function ProductList() {
  const [total, setTotal] = useState(0);

  return (
    <div className='flex flex-col bg-neutral-50'>
      {/* TOTAL */}
      <div className='px-4 py-3 border-b border-neutral-200'>
        <span className='text-xs text-neutral-500'>TOTAL</span>
        <div className='text-2xl font-bold text-primary-700'>$ {total}</div>
      </div>

      {/* PRODUCTS */}
      <div className='flex-1 overflow-y-auto max-h-[calc(100vh-15rem)]'>
        {PRODUCTS.map((p) => (
          <ProductRow
            key={p.id}
            name={p.name}
            price={p.price}
            onAdd={(amount) => setTotal((t) => t + amount)}
          />
        ))}
      </div>

      {/* ACTIONS */}
      <div className='flex w-full gap-2 p-3 bg-neutral-100 border-t border-neutral-200 absolute bottom-0'>
        <button className='flex-1 py-3 border border-neutral-300 rounded-lg text-sm font-semibold bg-white active:bg-neutral-200'>
          QUICK SALE
        </button>

        <button className='flex-1 py-3 bg-primary-500 text-white rounded-lg text-sm font-semibold'>
          CHARGE
        </button>
      </div>
    </div>
  );
}
