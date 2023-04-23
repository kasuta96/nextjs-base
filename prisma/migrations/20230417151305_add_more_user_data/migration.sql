-- AlterTable
ALTER TABLE `users` ADD COLUMN `address1` VARCHAR(255) NULL,
    ADD COLUMN `address2` VARCHAR(255) NULL,
    ADD COLUMN `approved_at` DATETIME(3) NULL,
    ADD COLUMN `approved_user_id` VARCHAR(191) NULL,
    ADD COLUMN `bio` VARCHAR(255) NULL,
    ADD COLUMN `date_of_birth` DATE NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_user_id` VARCHAR(191) NULL,
    ADD COLUMN `first_name` VARCHAR(255) NULL,
    ADD COLUMN `gender` ENUM('Male', 'Female', 'Other', 'Unknown') NULL,
    ADD COLUMN `language_code` VARCHAR(32) NOT NULL DEFAULT 'en',
    ADD COLUMN `last_name` VARCHAR(255) NULL,
    ADD COLUMN `phone_number` VARCHAR(32) NULL,
    ADD COLUMN `remarks` VARCHAR(255) NULL,
    ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    ADD COLUMN `status` ENUM('Active', 'Inactive', 'Pending', 'Blocked') NOT NULL DEFAULT 'Pending',
    ADD COLUMN `updated_user_id` VARCHAR(191) NULL,
    ADD COLUMN `zip_code` VARCHAR(32) NULL,
    MODIFY `name` VARCHAR(255) NULL,
    MODIFY `email` VARCHAR(255) NULL,
    MODIFY `image` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_updated_user_id_fkey` FOREIGN KEY (`updated_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_approved_user_id_fkey` FOREIGN KEY (`approved_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_deleted_user_id_fkey` FOREIGN KEY (`deleted_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
