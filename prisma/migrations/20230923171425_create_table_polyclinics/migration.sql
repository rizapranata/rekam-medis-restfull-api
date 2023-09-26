/*
  Warnings:

  - Added the required column `admin_id` to the `polyclinics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `polyclinics` ADD COLUMN `admin_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `polyclinics` ADD CONSTRAINT `polyclinics_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
