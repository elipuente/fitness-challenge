/*
  Warnings:

  - You are about to alter the column `date` on the `fitness_workout_log` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `fitness_workout_image` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `fitness_workout_log` ADD COLUMN `imageUrl` VARCHAR(256) NULL,
    MODIFY `date` DATETIME NOT NULL;

-- DropTable
DROP TABLE `fitness_workout_image`;
