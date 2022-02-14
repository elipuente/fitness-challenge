/*
  Warnings:

  - You are about to alter the column `date` on the `fitness_workout_log` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `fitness_workout_comment` MODIFY `comment` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `fitness_workout_log` MODIFY `date` DATETIME NOT NULL;
