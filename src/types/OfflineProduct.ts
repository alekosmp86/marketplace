export interface OfflineProduct {
  id: string;
  name: string;
  price: number;
  pendingSync?: boolean;
}
