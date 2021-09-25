/*
  Warnings:

  - Made the column `salt` on table `Credentials` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hash` on table `Credentials` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Credentials" ALTER COLUMN "salt" SET NOT NULL,
ALTER COLUMN "hash" SET NOT NULL;
