import { PaymentMethod } from "./PaymentMethods";
import { SalesItem } from "@/app/api/(business)/sales/models/SalesItem";

export interface OfflineSale {
  id: string;
  marketId: string;
  items: SalesItem[];
  total: number;
  paymentMethod: PaymentMethod;
  date: string;
  pendingSync: boolean;
}