/*
  Warnings:

  - You are about to drop the column `admin_id` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `admin_id` on the `medical_records` table. All the data in the column will be lost.
  - You are about to drop the column `doctor` on the `medical_records` table. All the data in the column will be lost.
  - Added the required column `password` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `super_user` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctor_id` to the `medical_records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `medical_records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `doctors` DROP FOREIGN KEY `doctors_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `medical_records` DROP FOREIGN KEY `medical_records_admin_id_fkey`;

-- AlterTable
ALTER TABLE `doctors` DROP COLUMN `admin_id`,
    ADD COLUMN `password` VARCHAR(100) NOT NULL,
    ADD COLUMN `super_user` VARCHAR(100) NOT NULL,
    ADD COLUMN `username` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `medical_records` DROP COLUMN `admin_id`,
    DROP COLUMN `doctor`,
    ADD COLUMN `doctor_id` INTEGER NOT NULL,
    ADD COLUMN `note` VARCHAR(255) NOT NULL,
    MODIFY `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `MedicalTransaction` (
    `medicalRecordId` INTEGER NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `printedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`medicalRecordId`, `transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_super_user_fkey` FOREIGN KEY (`super_user`) REFERENCES `users`(`super_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalTransaction` ADD CONSTRAINT `MedicalTransaction_medicalRecordId_fkey` FOREIGN KEY (`medicalRecordId`) REFERENCES `medical_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalTransaction` ADD CONSTRAINT `MedicalTransaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
