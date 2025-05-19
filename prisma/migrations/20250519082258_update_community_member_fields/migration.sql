/*
  Warnings:

  - You are about to drop the column `profilePhotoUrl` on the `CommunityMember` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('PRIA', 'WANITA');

-- CreateEnum
CREATE TYPE "GenderIdentity" AS ENUM ('NONE', 'WARIA');

-- CreateEnum
CREATE TYPE "ResidencyStatus" AS ENUM ('PENDATANG', 'PENDUDUK_TETAP');

-- CreateEnum
CREATE TYPE "LivingSituation" AS ENUM ('BERSAMA_ORANG_TUA', 'RUMAH_PRIBADI', 'SEWA_KONTRAK');

-- CreateEnum
CREATE TYPE "EKTPStatus" AS ENUM ('MEMILIKI', 'TIDAK_MEMILIKI', 'DALAM_PROSES');

-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('SD', 'SMP', 'SMA_SMK', 'PERGURUAN_TINGGI', 'TIDAK_SEKOLAH');

-- CreateEnum
CREATE TYPE "HealthServiceAccess" AS ENUM ('PUSKESMAS', 'RUMAH_SAKIT', 'KLINIK', 'TIDAK_PERNAH');

-- CreateEnum
CREATE TYPE "DiscriminationExperience" AS ENUM ('TIDAK_PERNAH', 'PERNAH_MENGALAMI');

-- AlterTable
ALTER TABLE "CommunityMember" DROP COLUMN "profilePhotoUrl",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "chronicIllness" TEXT,
ADD COLUMN     "communityGroup" TEXT,
ADD COLUMN     "communityNickname" TEXT,
ADD COLUMN     "desiredSkillTraining" TEXT,
ADD COLUMN     "discriminationExperience" "DiscriminationExperience",
ADD COLUMN     "discriminationLocation" TEXT,
ADD COLUMN     "discriminationPerpetrator" TEXT,
ADD COLUMN     "discriminationType" TEXT,
ADD COLUMN     "domicileKecamatan" TEXT,
ADD COLUMN     "domicileKelurahan" TEXT,
ADD COLUMN     "domicileRegencyCity" TEXT,
ADD COLUMN     "ektpStatus" "EKTPStatus",
ADD COLUMN     "employmentStatus" TEXT,
ADD COLUMN     "familyCardNumber" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "genderIdentity" "GenderIdentity",
ADD COLUMN     "hasOwnBusiness" BOOLEAN,
ADD COLUMN     "hasReceivedSkillTraining" BOOLEAN,
ADD COLUMN     "healthServiceAccess" "HealthServiceAccess",
ADD COLUMN     "isRegisteredInDTKS" BOOLEAN,
ADD COLUMN     "isStillStudying" BOOLEAN,
ADD COLUMN     "lastEducation" "EducationLevel",
ADD COLUMN     "livingSituation" "LivingSituation",
ADD COLUMN     "maritalStatus" TEXT,
ADD COLUMN     "monthlyIncome" TEXT,
ADD COLUMN     "placeOfBirth" TEXT,
ADD COLUMN     "receivesSocialAssistance" BOOLEAN,
ADD COLUMN     "residencyStatus" "ResidencyStatus",
ADD COLUMN     "serviceContactPerson" TEXT,
ADD COLUMN     "skillTrainingType" TEXT,
ADD COLUMN     "wasDiscriminationReported" BOOLEAN,
ALTER COLUMN "city" DROP NOT NULL;
