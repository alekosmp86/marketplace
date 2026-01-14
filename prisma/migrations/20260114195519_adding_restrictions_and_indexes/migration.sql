/*
  Warnings:

  - A unique constraint covering the columns `[name,marketId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_saleId_fkey";

-- DropIndex
DROP INDEX "Product_name_key";

-- CreateIndex
CREATE INDEX "Product_name_marketId_idx" ON "Product"("name", "marketId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_marketId_key" ON "Product"("name", "marketId");

-- CreateIndex
CREATE INDEX "Sale_marketId_createdAt_idx" ON "Sale"("marketId", "createdAt");

-- CreateIndex
CREATE INDEX "SaleItem_marketId_productId_idx" ON "SaleItem"("marketId", "productId");

-- CreateIndex
CREATE INDEX "SaleItem_saleId_idx" ON "SaleItem"("saleId");

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
