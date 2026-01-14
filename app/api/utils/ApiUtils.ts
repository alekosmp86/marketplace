import { prisma } from "@/src/lib/prisma";
import { headers } from "next/headers";

export class ApiUtils {
  static async resolveMarketId(): Promise<string> {
    const marketId = (await headers()).get("market-id");

    if (!marketId) {
      throw new Error("Missing market id");
    }

    const market = await prisma.market.findUnique({
      where: { id: marketId },
      select: { id: true },
    });

    if (!market) {
      throw new Error("Invalid market id");
    }

    return market.id;
  }
}
