"use client";

import { useState } from "react";
import { SalesProductRow } from "./SalesProductRow";
import { Banknote } from "lucide-react";
import { useProducts } from "../../lib/hooks/useProducts";
import { SaleItem } from "@/app/api/(business)/sales/models/SaleItem";
import { RequestStatus } from "@/app/api/types/RequestStatus";
import { Header } from "../header/Header";
import ProductSearch from "./products/ProductSearch";
import ProductList from "./products/ProductList";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { PaymentMethod } from "@/src/types/PaymentMethods";

export function SalesScreen() {
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH);

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
    }
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-50">
      <Header />
      {/* TOTAL (fixed) */}
      <div className="shrink-0 px-4 py-3 border-b border-neutral-200">
        <span className="text-xs text-neutral-500">TOTAL</span>
        <div className="text-2xl font-bold text-primary-700">$ {total}</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <ProductSearch />
        <ProductList />
      </div>

      <PaymentMethodSelector
        value={paymentMethod}
        onChange={setPaymentMethod}
      />

      {/* ACTIONS (fixed bottom) */}
      <div className="shrink-0 flex w-full gap-2 p-3 bg-neutral-100 border-t border-neutral-200">
        <button className="flex-1 py-3 border border-neutral-300 rounded-lg text-sm font-semibold bg-white active:bg-neutral-200">
          VENTA RAPIDA
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
