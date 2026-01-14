import { prisma } from "@/src/lib/prisma";
import { DateUtils } from "@/src/lib/utils/date";
import { SaleItem } from "../models/SaleItem";
import { ApiUtils } from "@/app/api/utils/ApiUtils";

export class SalesService {
  static async createSale(data: SaleItem[]) {
    const marketId = await ApiUtils.resolveMarketId();
    const businessDate = new DateUtils().now();

    await prisma.sale.create({
      data: {
        marketId,
        total: data.reduce((acc, item) => acc + item.subtotal, 0),
        items: {
          create: data.map((item) => ({
            marketId,
            productId: item.productId,
            weight: item.weight,
            price: item.price,
            subtotal: item.subtotal,
          })),
        },
        createdAt: businessDate.date,
      },
    });
  }
}
