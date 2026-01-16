import { SalesItem } from "@/app/api/(business)/sales/models/SalesItem";

type ProductRowProps = {
  item: SalesItem;
};

export default function SalesProductRow({ item }: ProductRowProps) {
  return (
    <div className="bg-white border-b border-neutral-200 px-4 py-3">
      <div className="grid grid-cols-[2fr_1fr] items-center gap-3">
        {/* Product name (wider) */}
        <span className="font-medium text-neutral-900 truncate">
          {item.product.name}
        </span>

        {/* Price */}
        <span className="text-sm text-neutral-600 text-right whitespace-nowrap">
          ${item.subtotal}
        </span>
      </div>
    </div>
  );
}
