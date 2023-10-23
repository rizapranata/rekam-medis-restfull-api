-- DropForeignKey
ALTER TABLE `drugs` DROP FOREIGN KEY `drugs_medical_record_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients` DROP FOREIGN KEY `patients_medicalRecordId_fkey`;

-- AlterTable
ALTER TABLE `drugs` MODIFY `medical_record_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `patients` MODIFY `medicalRecordId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_medicalRecordId_fkey` FOREIGN KEY (`medicalRecordId`) REFERENCES `medical_records`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugs` ADD CONSTRAINT `drugs_medical_record_id_fkey` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_records`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
