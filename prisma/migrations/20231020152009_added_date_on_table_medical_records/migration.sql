/*
  Warnings:

  - You are about to drop the column `date` on the `medical_records` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `medical_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medical_records` DROP COLUMN `date`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
