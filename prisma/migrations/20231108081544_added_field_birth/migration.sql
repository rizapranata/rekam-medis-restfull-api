/*
  Warnings:

  - You are about to drop the column `nik` on the `patients` table. All the data in the column will be lost.
  - Added the required column `noRm` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patients` DROP COLUMN `nik`,
    ADD COLUMN `birth` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `noRm` VARCHAR(100) NOT NULL;
