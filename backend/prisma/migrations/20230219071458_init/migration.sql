/*
  Warnings:

  - You are about to drop the column `beer` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `curry` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `fish_n_chips` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `kebab` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `olives` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `poutine` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `ramen` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `salad` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `shawarma` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `sushi` on the `Preference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Preference" DROP COLUMN "beer",
DROP COLUMN "curry",
DROP COLUMN "fish_n_chips",
DROP COLUMN "kebab",
DROP COLUMN "olives",
DROP COLUMN "poutine",
DROP COLUMN "ramen",
DROP COLUMN "salad",
DROP COLUMN "shawarma",
DROP COLUMN "sushi",
ADD COLUMN     "like_matrix" INTEGER[] DEFAULT ARRAY[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]::INTEGER[];
