/*
  Warnings:

  - Made the column `patientId` on table `medical_records` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `medical_records` DROP FOREIGN KEY `medical_records_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `medical_records` DROP FOREIGN KEY `medical_records_username_fkey`;

-- AlterTable
ALTER TABLE `medical_records` MODIFY `username` VARCHAR(100) NULL,
    MODIFY `patientId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
