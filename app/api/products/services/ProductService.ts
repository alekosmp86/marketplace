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

  static async addProduct(name: string, price: number) {
    return await prisma.product.create({
      data: {
        name,
        price,
      },
    });
  }

  static async updateProduct(id: string, name: string, price: number) {
    await prisma.product.update({
      where: { id },
      data: { name, price },
    });
  }
}
