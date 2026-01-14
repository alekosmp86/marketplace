"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/api/(business)/products/models/Product";
import { RequestStatus } from "@/app/api/types/RequestStatus";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch("/api/products", {
        headers: {
          "market-id": localStorage.getItem("market-id")!,
        },
      });
      const { message, data } = await res.json();

      if (message === RequestStatus.SUCCESS) {
        setProducts(data);
      }
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("market-id", "cmkeciuke0000fwwngi8v4hrh");
    fetchProducts();
  }, []);

  return {
    products,
    setProducts,
    loading,
    error,
    refetch: fetchProducts,
  };
}
