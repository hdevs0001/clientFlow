/*
  Warnings:

  - The `status` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "status",
ADD COLUMN     "status" "ClientStatus" NOT NULL DEFAULT 'INACTIVE';
