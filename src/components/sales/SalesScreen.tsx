"use client";

import { useState } from "react";
import { ProductRow } from "./ProductRow";
import { Banknote } from "lucide-react";
import { useProducts } from "../../lib/hooks/useProducts";
import { SaleItem } from "@/app/api/(business)/sales/models/SaleItem";
import { RequestStatus } from "@/app/api/types/RequestStatus";

export function SalesScreen() {
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<SaleItem[]>([]);
  const [resetTrigger, setResetTrigger] = useState(0);
  const { products, refetch } = useProducts();

  const handleAddItem = (item: SaleItem) => {
    setItems((prev) => [...prev, item]);
    setTotal((prev) => prev + item.subtotal);
  };

  const handleSale = async () => {
    const response = await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "market-id": localStorage.getItem("market-id")!,
      },
      body: JSON.stringify({ items }),
    });
    const { message } = await response.json();

    if (message === RequestStatus.SUCCESS) {
      setTotal(0);
      setItems([]);
      setResetTrigger((prev) => prev + 1);
      refetch();
    }
  };

  return (
    <div className='flex flex-col bg-neutral-50'>
      {/* TOTAL */}
      <div className='px-4 py-3 border-b border-neutral-200'>
        <span className='text-xs text-neutral-500'>TOTAL</span>
        <div className='text-2xl font-bold text-primary-700'>$ {total}</div>
      </div>

      {/* PRODUCTS */}
      <div className='overflow-y-auto h-[calc(100vh-15rem)]'>
        {products.map((p) => (
          <ProductRow
            key={p.id}
            product={p}
            onAdd={(item) => handleAddItem(item)}
            resetTrigger={resetTrigger}
          />
        ))}
      </div>

      {/* ACTIONS */}
      <div className='flex w-full gap-2 p-3 bg-neutral-100 border-t border-neutral-200 absolute bottom-0'>
        <button className='flex-1 py-3 border border-neutral-300 rounded-lg text-sm font-semibold bg-white active:bg-neutral-200'>
          QUICK SALE
        </button>

        <button
          className='flex-1 flex items-center justify-center gap-2 py-3 border border-neutral-300 rounded-lg text-sm font-semibold bg-primary-500 text-white active:bg-primary-600'
          onClick={handleSale}
        >
          <Banknote className='w-6 h-6' /> VENTA
        </button>
      </div>
    </div>
  );
}
