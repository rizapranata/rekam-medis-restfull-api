/*
  Warnings:

  - You are about to drop the column `patientId` on the `medical_records` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[medicalRecordId]` on the table `patients` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `medical_records` DROP FOREIGN KEY `medical_records_patientId_fkey`;

-- AlterTable
ALTER TABLE `medical_records` DROP COLUMN `patientId`;

-- AlterTable
ALTER TABLE `patients` ADD COLUMN `medicalRecordId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `patients_medicalRecordId_key` ON `patients`(`medicalRecordId`);

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_medicalRecordId_fkey` FOREIGN KEY (`medicalRecordId`) REFERENCES `medical_records`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
