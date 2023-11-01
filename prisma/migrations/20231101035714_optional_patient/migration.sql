-- DropForeignKey
ALTER TABLE `medical_records` DROP FOREIGN KEY `medical_records_patientId_fkey`;

-- AlterTable
ALTER TABLE `medical_records` MODIFY `patientId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
