import { OfflineSale } from "@/src/types/OfflineSale";
import { prisma } from "@/src/lib/prisma";

export class SalesService {
  static async synchronizeSales(sales: OfflineSale[]) {
    const saleIds = sales.map((s) => s.id);

    // Check for existing sales
    const existingSales = await prisma.sale.findMany({
      where: { id: { in: saleIds } },
      select: { id: true },
    });

    const existingIds = new Set(existingSales.map((s) => s.id));
    const newSales = sales.filter((s) => !existingIds.has(s.id));

    const syncedSalesIds: string[] = [...existingIds];

    if (newSales.length > 0) {
      await prisma.$transaction(async (tx) => {
        for (const sale of newSales) {
          const { id, date, marketId, total, items } = sale;

          // Create the sale
          await tx.sale.create({
            data: {
              id,
              total,
              createdAt: date,
              marketId,
            },
          });

          await tx.product.createMany({
            data: items.map((item) => ({
              id: item.product.id,
              name: item.product.name,
              marketId,
            })),
            skipDuplicates: true,
          });

          // Create sale items (bulk insert)
          await tx.saleItem.createMany({
            data: items.map((item) => ({
              saleId: id,
              marketId,
              productId: item.product.id,
              subtotal: item.subtotal,
            })),
          });

          syncedSalesIds.push(id);
        }
      });
    }

    return syncedSalesIds;
  }
}
