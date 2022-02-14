/*
  Warnings:

  - The primary key for the `fitness_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `fitness_workout_comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `fitness_workout_image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `fitness_workout_log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `date` on the `fitness_workout_log` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `fitness_workout_suggestions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `fitness_user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `fitness_workout_comment` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `fitness_workoutLogId` VARCHAR(191) NOT NULL,
    MODIFY `fitness_userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `fitness_workout_image` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `fitness_workoutLogId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `fitness_workout_likes` MODIFY `fitness_workoutLogId` VARCHAR(191) NOT NULL,
    MODIFY `fitness_userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `fitness_workout_log` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `date` DATETIME NOT NULL,
    MODIFY `fitness_userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `fitness_workout_suggestions` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `fitness_userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
