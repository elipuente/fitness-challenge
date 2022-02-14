/*
  Warnings:

  - You are about to alter the column `date` on the `fitness_workout_log` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `fitness_workout_log` ADD COLUMN `totalLikes` INTEGER NOT NULL DEFAULT 0,
    MODIFY `date` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `fitness_workout_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(256) NOT NULL,
    `caption` LONGTEXT NOT NULL,
    `fitness_workoutLogId` INTEGER NOT NULL,

    UNIQUE INDEX `fitness_workout_image_fitness_workoutLogId_key`(`fitness_workoutLogId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fitness_workout_comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment` LONGTEXT NOT NULL,
    `fitness_workoutLogId` INTEGER NOT NULL,
    `fitness_userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fitness_workout_likes` (
    `id` VARCHAR(191) NOT NULL,
    `fitness_workoutLogId` INTEGER NOT NULL,
    `fitness_userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
