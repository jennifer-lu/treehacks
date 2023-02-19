/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Preference` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Preference_user_id_key" ON "Preference"("user_id");
