/*
  Warnings:

  - You are about to drop the `MedicalTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MedicalTransaction` DROP FOREIGN KEY `MedicalTransaction_medicalRecordId_fkey`;

-- DropForeignKey
ALTER TABLE `MedicalTransaction` DROP FOREIGN KEY `MedicalTransaction_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_medical_record_id_fkey`;

-- AlterTable
ALTER TABLE `transactions` MODIFY `medical_record_id` INTEGER NULL;

-- DropTable
DROP TABLE `MedicalTransaction`;

-- CreateTable
CREATE TABLE `medicalTransaction` (
    `medicalRecordId` INTEGER NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `medicalTransaction_medicalRecordId_key`(`medicalRecordId`),
    UNIQUE INDEX `medicalTransaction_transactionId_key`(`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_medical_record_id_fkey` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_records`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicalTransaction` ADD CONSTRAINT `medicalTransaction_medicalRecordId_fkey` FOREIGN KEY (`medicalRecordId`) REFERENCES `medical_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicalTransaction` ADD CONSTRAINT `medicalTransaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
