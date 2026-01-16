import { SalesService } from "./services/SalesService";
import { RequestStatus } from "../../types/RequestStatus";
import { OfflineSale } from "@/src/types/OfflineSale";

export const POST = async (req: Request) => {
  try {
    const sales: OfflineSale[] = await req.json();
    const syncedSalesIds = await SalesService.synchronizeSales(sales);
    return Response.json({ message: RequestStatus.SUCCESS, data: syncedSalesIds }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};
