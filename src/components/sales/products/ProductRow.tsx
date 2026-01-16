import { SalesItem } from "@/app/api/(business)/sales/models/SalesItem";
import { X } from "lucide-react";

type ProductRowProps = {
  item: SalesItem;
  onRemove: (item: SalesItem) => void;
};

export default function ProductRow({ item, onRemove }: ProductRowProps) {
  return (
    <div className="bg-white border-b border-neutral-200 px-4 py-3">
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
        {/* Product name */}
        <span className="font-medium text-neutral-900 truncate">
          {item.product.name}
        </span>

        {/* Price */}
        <span className="text-sm text-neutral-600 whitespace-nowrap text-right">
          ${item.subtotal}
        </span>

        {/* Remove */}
        <button
          onClick={() => onRemove(item)}
          className="flex items-center justify-end"
        >
          <X className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>
  );
}
