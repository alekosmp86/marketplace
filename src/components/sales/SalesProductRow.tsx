import { Product } from "@/app/api/(business)/products/models/Product";
import { useState, useEffect } from "react";

type ProductRowProps = {
  product: Product;
};

export function SalesProductRow({ product }: ProductRowProps) {
  return (
    <div className='bg-white border-b border-neutral-200 px-4 py-3'>
      <div className='grid grid-cols-[2fr_1fr] items-center gap-3'>
        {/* Product name (wider) */}
        <span className='font-medium text-neutral-900 truncate'>
          {product.name}
        </span>

        {/* Price */}
        <span className='text-sm text-neutral-600 text-right whitespace-nowrap'>
          ${product.price}
        </span>
      </div>
    </div>
  );
}
