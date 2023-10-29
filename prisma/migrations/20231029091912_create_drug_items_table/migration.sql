/*
  Warnings:

  - You are about to drop the column `drugId` on the `medical_records` table. All the data in the column will be lost.
  - You are about to drop the column `polyclinic` on the `patients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[polyClinicId]` on the table `patients` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `medical_records` DROP FOREIGN KEY `medical_records_drugId_fkey`;

-- AlterTable
ALTER TABLE `medical_records` DROP COLUMN `drugId`;

-- AlterTable
ALTER TABLE `patients` DROP COLUMN `polyclinic`,
    ADD COLUMN `polyClinicId` INTEGER NULL;

-- CreateTable
CREATE TABLE `drugItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `drugSelectedId` INTEGER NULL,
    `medical_record_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateIndex
CREATE UNIQUE INDEX `patients_polyClinicId_key` ON `patients`(`polyClinicId`);

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_polyClinicId_fkey` FOREIGN KEY (`polyClinicId`) REFERENCES `polyclinics`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugItems` ADD CONSTRAINT `drugItems_medical_record_id_fkey` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_records`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
