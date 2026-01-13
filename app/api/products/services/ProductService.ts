import { prisma } from "@/src/lib/prisma";

export class ProductService {
  static async getProducts() {
    return await prisma.product.findMany({
      orderBy: {
        items: {
          _count: "desc",
        },
      },
    });
  }
}
