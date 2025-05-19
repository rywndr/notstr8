/*
  Warnings:

  - You are about to drop the column `notes` on the `CommunityMember` table. All the data in the column will be lost.
  - The `employmentStatus` column on the `CommunityMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `maritalStatus` column on the `CommunityMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('BELUM_KAWIN', 'KAWIN', 'CERAI');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('BEKERJA', 'TIDAK_BEKERJA', 'PELAJAR', 'MAHASISWA');

-- AlterTable
ALTER TABLE "CommunityMember" DROP COLUMN "notes",
ADD COLUMN     "jobDescription" TEXT,
DROP COLUMN "employmentStatus",
ADD COLUMN     "employmentStatus" "EmploymentStatus",
DROP COLUMN "maritalStatus",
ADD COLUMN     "maritalStatus" "MaritalStatus";
