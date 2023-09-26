/*
  Warnings:

  - You are about to alter the column `date` on the `medical_records` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `medical_record_id` to the `drugs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `drugs` ADD COLUMN `medical_record_id` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(225) NULL;

-- AlterTable
ALTER TABLE `medical_records` MODIFY `date` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total_price` INTEGER NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `medical_record_id` INTEGER NOT NULL,

    UNIQUE INDEX `Transaction_medical_record_id_key`(`medical_record_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `drugs` ADD CONSTRAINT `drugs_medical_record_id_fkey` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_medical_record_id_fkey` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
