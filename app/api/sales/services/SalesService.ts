import { prisma } from "@/src/lib/prisma";
import { SaleItem } from "@/app/api/sales/models/SaleItem";
import { DateUtils } from "@/src/lib/utils/date";

export class SalesService {
  static async createSale(data: SaleItem[]) {
    const businessDate = new DateUtils().now();

    await prisma.sale.create({
      data: {
        total: data.reduce((acc, item) => acc + item.subtotal, 0),
        items: {
          create: data.map((item) => ({
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
