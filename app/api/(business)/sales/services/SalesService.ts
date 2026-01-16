import { prisma } from "@/src/lib/prisma";
import { DateUtils } from "@/src/lib/utils/date";
import { SalesItem } from "../models/SalesItem";
import { ApiUtils } from "@/app/api/utils/ApiUtils";

export class SalesService {
  static async createSale(data: SalesItem[]) {
    const marketId = await ApiUtils.resolveMarketId();
    const businessDate = new DateUtils().now();

    /*await prisma.sale.create({
      data: {
        marketId,
        total: data.reduce((acc, item) => acc + item.subtotal, 0),
        items: {
          create: data.map((item) => ({
            marketId,
            productId: item.product.id,
            subtotal: item.subtotal,
          })),
        },
        createdAt: businessDate.date,
      },
    });*/
  }
}
