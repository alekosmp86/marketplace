import { PaymentMethod } from "@/src/types/PaymentMethods";

const METHODS: PaymentMethod[] = [
  PaymentMethod.CASH,
  PaymentMethod.DEBIT,
  PaymentMethod.CREDIT,
];

type PaymentMethodSelectorProps = {
  value: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
};

export default function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="shrink-0 border-t bg-white px-4 py-3">
      <label className="block text-xs font-medium text-neutral-500 mb-1">
        METODO DE PAGO
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as PaymentMethod)}
          className="
            w-full appearance-none rounded-lg border border-neutral-300
            bg-white px-3 py-2 pr-10
            text-sm font-medium text-neutral-800
            focus:outline-none focus:ring-2 focus:ring-primary-500
          "
        >
          {METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
