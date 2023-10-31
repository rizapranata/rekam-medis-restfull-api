/*
  Warnings:

  - You are about to drop the column `polyclinic` on the `patients` table. All the data in the column will be lost.
  - Added the required column `poly` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patients` DROP COLUMN `polyclinic`,
    ADD COLUMN `poly` VARCHAR(20) NOT NULL;
