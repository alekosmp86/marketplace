import { Product } from "@/app/api/products/models/Product";
import { SaleItem } from "@/app/api/sales/models/SaleItem";
import { useState, useEffect } from "react";

type ProductRowProps = {
  product: Product;
  onAdd: (item: SaleItem) => void;
  resetTrigger: number;
};

export function ProductRow({ product, onAdd, resetTrigger }: ProductRowProps) {
  const [weight, setWeight] = useState<string | number>(0);

  useEffect(() => {
    const resetWeight = () => {
      setWeight(0);
    };
    resetWeight();
  }, [resetTrigger]);

  const handleAdd = () => {
    if (weight === 0) return;
    onAdd({
      productId: product.id,
      weight: Number(weight),
      price: product.price,
      subtotal: Number(weight) * product.price,
    });
  };

  return (
    <div className='bg-white border-b border-neutral-200 px-4 py-3'>
      <div className='grid grid-cols-[2fr_1fr_1fr] items-center gap-3'>
        {/* Product name (wider) */}
        <span className='font-medium text-neutral-900 truncate'>
          {product.name}
        </span>

        {/* Weight input */}
        <input
          type='number'
          step='0.01'
          min='0'
          value={weight}
          onFocus={() => {
            if (weight === 0) setWeight("");
          }}
          onBlur={() => {
            if (weight === "") setWeight(0);
            handleAdd();
          }}
          onChange={(e) =>
            setWeight(e.target.value === "" ? "" : Number(e.target.value))
          }
          className='w-full px-2 py-1 border border-neutral-300 rounded-md text-sm text-right'
        />

        {/* Price */}
        <span className='text-sm text-neutral-600 text-right whitespace-nowrap'>
          ${product.price} / kg
        </span>
      </div>
    </div>
  );
}
