type ProductRowProps = {
  name: string;
  price: number;
  onAdd: () => void;
};

export function ProductRow({ name, price, onAdd }: ProductRowProps) {
  return (
    <button
      onClick={onAdd}
      className='
        w-full flex items-center justify-between
        px-4 py-4 text-left
        bg-white
        border-b border-neutral-200
        active:bg-neutral-100
      '
    >
      <span className='text-base font-medium text-neutral-900'>{name}</span>

      <span className='flex items-center gap-3'>
        <span className='text-sm text-neutral-600'>${price}</span>

        <span
          className='
          flex items-center justify-center
          w-7 h-7
          rounded-full
          bg-accent-500 text-white
          text-lg font-bold
        '
        >
          +
        </span>
      </span>
    </button>
  );
}
