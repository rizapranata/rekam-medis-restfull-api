/*
  Warnings:

  - A unique constraint covering the columns `[polyClinicId]` on the table `patients` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `patients` ADD COLUMN `polyClinicId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `patients_polyClinicId_key` ON `patients`(`polyClinicId`);

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_polyClinicId_fkey` FOREIGN KEY (`polyClinicId`) REFERENCES `polyclinics`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
