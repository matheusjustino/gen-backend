/*
  Warnings:

  - You are about to drop the column `updaedate` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "updaedate",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
