/*
  Warnings:

  - You are about to drop the column `medicalRecordId` on the `patients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[patientId]` on the table `medical_records` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `patientId` to the `medical_records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `patients` DROP FOREIGN KEY `patients_medicalRecordId_fkey`;

-- AlterTable
ALTER TABLE `medical_records` ADD COLUMN `patientId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `patients` DROP COLUMN `medicalRecordId`;

-- CreateIndex
CREATE UNIQUE INDEX `medical_records_patientId_key` ON `medical_records`(`patientId`);

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
