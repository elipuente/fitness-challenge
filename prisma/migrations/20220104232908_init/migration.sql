-- CreateTable
CREATE TABLE `fitness_user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(256) NOT NULL,
    `lastName` VARCHAR(256) NOT NULL,
    `phoneNumber` BIGINT NOT NULL,
    `totalScore` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fitness_workout_log` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `date` DATETIME NOT NULL,
    `description` LONGTEXT NOT NULL,
    `minutes` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `type` VARCHAR(256) NOT NULL,
    `fitness_userId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fitness_workout_suggestions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `description` LONGTEXT NOT NULL,
    `difficulty` VARCHAR(100) NOT NULL,
    `type` VARCHAR(256) NOT NULL,
    `fitness_userId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
