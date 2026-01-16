import { ApiUtils } from "@/app/api/utils/ApiUtils";
import { prisma } from "@/src/lib/prisma";

export class ProductService {
  static async getProducts() {
    const marketId = await ApiUtils.resolveMarketId();

    return await prisma.product.findMany({
      where: {
        marketId,
      },
      orderBy: {
        items: {
          _count: "desc",
        },
      },
    });
  }

  static async addProduct(name: string) {
    const marketId = await ApiUtils.resolveMarketId();

    return await prisma.product.create({
      data: {
        name,
        marketId,
      },
    });
  }

  static async updateProduct(id: string, name: string) {
    const marketId = await ApiUtils.resolveMarketId();

    await prisma.product.update({
      where: { id, marketId },
      data: { name },
    });
  }

  static async deleteProduct(id: string) {
    const marketId = await ApiUtils.resolveMarketId();

    await prisma.product.delete({
      where: { id, marketId },
    });
  }
}
