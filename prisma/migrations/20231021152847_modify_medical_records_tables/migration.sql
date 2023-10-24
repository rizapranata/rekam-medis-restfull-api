/*
  Warnings:

  - You are about to drop the column `patient` on the `medical_records` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[medicalRecordId]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `medicalRecordId` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medical_records` DROP COLUMN `patient`;

-- AlterTable
ALTER TABLE `patients` ADD COLUMN `medicalRecordId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `patients_medicalRecordId_key` ON `patients`(`medicalRecordId`);

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_medicalRecordId_fkey` FOREIGN KEY (`medicalRecordId`) REFERENCES `medical_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
