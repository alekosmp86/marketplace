"use client";

import { useEffect, useState } from "react";
import { Banknote } from "lucide-react";
import { RequestStatus } from "@/app/api/types/RequestStatus";
import { Header } from "../header/Header";
import ProductSearch from "./products/ProductSearch";
import ProductList from "./products/ProductList";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { PaymentMethod } from "@/src/types/PaymentMethods";
import { SalesItem } from "@/app/api/(business)/sales/models/SalesItem";
import { OfflineSale } from "@/src/types/OfflineSale";
import { DateUtils } from "@/src/lib/utils/date";
import { saveSale } from "@/src/lib/indexedDB/sale";

export default function SalesScreen() {
  const [total, setTotal] = useState(0);
  const [itemsInSale, setItemsInSale] = useState<SalesItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH
  );

  /** @todo we should set the market-id somewhere else */
  useEffect(() => {
    localStorage.setItem("market-id", "a48f38ab-17a2-485d-a460-b2190fbe17bb");
  }, []);

  const handleRemoveProduct = (item: SalesItem) => {
    setTotal((prev) => prev - item.subtotal);
    setItemsInSale((prev) =>
      prev.filter((i) => i.product.id !== item.product.id)
    );
  };

  const handleAddProduct = (product: SalesItem) => {
    setTotal((prev) => prev + product.subtotal);
    setItemsInSale((prev) => [...prev, product]);
  };

  const handleSale = async () => {
    const sale: OfflineSale = {
      id: crypto.randomUUID(),
      marketId: localStorage.getItem("market-id")!,
      items: itemsInSale,
      total,
      paymentMethod,
      date: new DateUtils().now().date,
      pendingSync: true,
    };

    await saveSale(sale);
    setTotal(0);
    setItemsInSale([]);
    /*const response = await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "market-id": localStorage.getItem("market-id")!,
      },
      body: JSON.stringify(itemsInSale),
    });
    const { message } = await response.json();

    if (message === RequestStatus.SUCCESS) {
      setTotal(0);
    }*/
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-50">
      <Header />
      {/* TOTAL (fixed) */}
      <div className="shrink-0 px-4 py-3 border-b border-neutral-200 bg-neutral-100">
        <span className="text-xs text-neutral-500">TOTAL</span>
        <div className="text-2xl font-bold text-primary-700">$ {total}</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <ProductSearch />
        <ProductList
          items={itemsInSale}
          onAddProduct={handleAddProduct}
          onRemoveProduct={handleRemoveProduct}
        />
      </div>

      <PaymentMethodSelector
        value={paymentMethod}
        onChange={setPaymentMethod}
      />

      {/* ACTIONS (fixed bottom) */}
      <div className="shrink-0 flex w-full gap-2 p-3 bg-neutral-100 border-t border-neutral-200">
        <button className="flex-1 py-3 border border-neutral-300 rounded-lg text-sm font-semibold bg-accent-500 text-white active:bg-neutral-200">
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
