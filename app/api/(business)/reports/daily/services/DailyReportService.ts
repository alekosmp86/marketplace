import { prisma } from "@/src/lib/prisma";
import { DateUtils } from "@/src/lib/utils/date";
import { DailyReport } from "../models/DailyReport";
import { DailyProductSummary } from "../models/DailyProductSummary";

export class DailyReportService {
  static async getDailyReport(): Promise<DailyReport> {
    const businessDate = new DateUtils().now();

    const items = await prisma.saleItem.findMany({
      where: {
        sale: {
          createdAt: businessDate.date,
        },
      },
      select: {
        productId: true,
        subtotal: true,
        product: {
          select: {
            name: true,
          },
        },
      },
    });

    const productMap: Record<string, DailyProductSummary> = {};
    let totalEarned = 0;

    for (const item of items) {
      totalEarned += item.subtotal;

      if (!productMap[item.productId]) {
        productMap[item.productId] = {
          productId: item.productId,
          name: item.product.name,
          totalAmount: 0,
        };
      }

      productMap[item.productId].totalAmount += item.subtotal;
    }

    const products = Object.values(productMap).map((p) => ({
      ...p,
      totalAmount: Math.round(p.totalAmount * 100) / 100,
    }));

    const totalSales = await prisma.sale.count({
      where: {
        createdAt: businessDate.date,
      },
    });

    return {
      totalTransactions: totalSales,
      totalAmount: Math.round(totalEarned * 100) / 100,
      products,
    };
  }
}
