import { prisma } from "../lib/prisma";

const registerMarketTask = async () => {
  await prisma.market.upsert({
    where: {
      name: process.env.MARKET_NAME!,
    },
    update: {},
    create: {
      name: process.env.MARKET_NAME!,
    },
  });
}

(async () => {
  try {
    await registerMarketTask();
    console.log("Market registered");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();