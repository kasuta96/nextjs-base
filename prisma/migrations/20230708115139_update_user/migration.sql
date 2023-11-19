-- AlterTable
ALTER TABLE `users` MODIFY `gender` ENUM('Male', 'Female', 'Other', 'Unknown') NULL DEFAULT 'Unknown';
