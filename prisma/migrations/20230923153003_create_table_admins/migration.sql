-- CreateTable
CREATE TABLE `admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `email` VARCHAR(200) NULL,
    `phone` VARCHAR(20) NULL,
    `token` VARCHAR(100) NULL,
    `super_user` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_super_user_fkey` FOREIGN KEY (`super_user`) REFERENCES `users`(`super_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
