"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/api/products/models/Product";
import { RequestStatus } from "@/app/api/types/RequestStatus";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const { message, data } = await res.json();

      if (message === RequestStatus.SUCCESS) {
        setProducts(data);
      }
    } catch (err) {
      setError("Could not load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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
