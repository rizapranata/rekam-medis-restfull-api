/*
  Warnings:

  - You are about to drop the column `medical_record_id` on the `drugs` table. All the data in the column will be lost.
  - You are about to drop the column `polyClinicId` on the `patients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[drugId]` on the table `medical_records` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `polyclinic` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `drugs` DROP FOREIGN KEY `drugs_medical_record_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients` DROP FOREIGN KEY `patients_polyClinicId_fkey`;

-- AlterTable
ALTER TABLE `drugs` DROP COLUMN `medical_record_id`;

-- AlterTable
ALTER TABLE `medical_records` ADD COLUMN `drugId` INTEGER NULL;

-- AlterTable
ALTER TABLE `patients` DROP COLUMN `polyClinicId`,
    ADD COLUMN `polyclinic` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `medical_records_drugId_key` ON `medical_records`(`drugId`);

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_drugId_fkey` FOREIGN KEY (`drugId`) REFERENCES `drugs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
