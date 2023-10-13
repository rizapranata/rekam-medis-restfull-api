/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `doctors` MODIFY `poly_name` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `admins_username_key` ON `admins`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `doctors_username_key` ON `doctors`(`username`);
