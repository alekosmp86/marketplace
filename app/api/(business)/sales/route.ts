import { SalesService } from "./services/SalesService";
import { SaleItem } from "./models/SaleItem";
import { RequestStatus } from "../../types/RequestStatus";

export const POST = async (req: Request) => {
  try {
    const { items }: { items: SaleItem[] } = await req.json();
    await SalesService.createSale(items);
    return Response.json({ message: RequestStatus.SUCCESS }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};
