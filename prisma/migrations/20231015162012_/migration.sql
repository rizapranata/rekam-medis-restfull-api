-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NULL,
    `email` VARCHAR(200) NULL,
    `phone` VARCHAR(20) NULL,
    `status` BOOLEAN NULL,
    `specialist` VARCHAR(100) NULL,
    `poliName` VARCHAR(100) NULL,
    `role` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `polyclinics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `floor` VARCHAR(100) NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `gender` VARCHAR(20) NOT NULL,
    `age` INTEGER NOT NULL,
    `email` VARCHAR(200) NULL,
    `phone` VARCHAR(20) NULL,
    `address` VARCHAR(225) NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `medical_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient` VARCHAR(100) NOT NULL,
    `problem` VARCHAR(100) NOT NULL,
    `diagnosis` VARCHAR(200) NOT NULL,
    `note` VARCHAR(255) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `drugs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `description` VARCHAR(225) NULL,
    `username` VARCHAR(100) NOT NULL,
    `medical_record_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total_price` INTEGER NOT NULL,
    `medical_record_id` INTEGER NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `transactions_medical_record_id_key`(`medical_record_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `MedicalTransaction` (
    `medicalRecordId` INTEGER NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `printedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`medicalRecordId`, `transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `polyclinics` ADD CONSTRAINT `polyclinics_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugs` ADD CONSTRAINT `drugs_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugs` ADD CONSTRAINT `drugs_medical_record_id_fkey` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_medical_record_id_fkey` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalTransaction` ADD CONSTRAINT `MedicalTransaction_medicalRecordId_fkey` FOREIGN KEY (`medicalRecordId`) REFERENCES `medical_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalTransaction` ADD CONSTRAINT `MedicalTransaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
