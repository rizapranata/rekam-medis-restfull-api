/*
  Warnings:

  - You are about to drop the column `polyClinicId` on the `patients` table. All the data in the column will be lost.
  - Made the column `patientId` on table `medical_records` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `poly` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `medical_records` DROP FOREIGN KEY `medical_records_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `patients` DROP FOREIGN KEY `patients_polyClinicId_fkey`;

-- AlterTable
ALTER TABLE `medical_records` MODIFY `patientId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `patients` DROP COLUMN `polyClinicId`,
    ADD COLUMN `poly` VARCHAR(20) NOT NULL;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
