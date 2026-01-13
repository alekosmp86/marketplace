import { useState } from "react";

type ProductRowProps = {
  name: string;
  price: number;
  onAdd: (amount: number) => void;
};

export function ProductRow({ name, price, onAdd }: ProductRowProps) {
  const [weight, setWeight] = useState<string | number>(0);

  const handleAdd = () => {
    if (weight === 0) return;
    onAdd(Number(weight) * price);
  };

  return (
    <div className='bg-white border-b border-neutral-200 px-4 py-3'>
      <div className='flex items-center justify-between'>
        <span className='font-medium text-neutral-900'>{name}</span>
        <div className='flex items-center gap-2'>
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
            }}
            onChange={(e) =>
              setWeight(e.target.value === "" ? "" : Number(e.target.value))
            }
            className='w-24 px-2 py-1 border border-neutral-300 rounded-md text-sm'
          />
          <span className='text-sm text-neutral-600'>${price} / kg</span>
        </div>
      </div>

      <div className='mt-2 flex items-center justify-end gap-2'>
        <button
          onClick={handleAdd}
          className='px-3 py-1 rounded-md bg-accent-500 text-white text-sm font-semibold active:bg-primary-600'
        >
          Add
        </button>
      </div>
    </div>
  );
}
