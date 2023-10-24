/*
  Warnings:

  - Added the required column `nik` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patients` ADD COLUMN `nik` VARCHAR(100) NOT NULL;
