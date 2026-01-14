import { DailyProductSummary } from "./DailyProductSummary";

export type DailyReport = {
  totalTransactions: number;
  totalAmount: number;
  products: DailyProductSummary[];
};
