/*
  Warnings:

  - The primary key for the `UserData` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserData" DROP CONSTRAINT "UserData_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserData_pkey" PRIMARY KEY ("id");
