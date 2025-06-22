/*
  Warnings:

  - You are about to drop the column `bpjsId` on the `CommunityMember` table. All the data in the column will be lost.
  - You are about to drop the column `bpjsScanUrl` on the `CommunityMember` table. All the data in the column will be lost.
  - You are about to drop the column `discriminationPerpetrator` on the `CommunityMember` table. All the data in the column will be lost.
  - You are about to drop the column `discriminationType` on the `CommunityMember` table. All the data in the column will be lost.
  - You are about to drop the column `hasBpjs` on the `CommunityMember` table. All the data in the column will be lost.
  - You are about to drop the column `serviceContactPerson` on the `CommunityMember` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SocialSecurityType" AS ENUM ('NONE', 'BPJS_KESEHATAN', 'BPJS_TK', 'OTHER');

-- CreateEnum
CREATE TYPE "DisabilityType" AS ENUM ('PHYSICAL', 'INTELLECTUAL', 'MENTAL', 'SENSORY');

-- CreateEnum
CREATE TYPE "DiscriminationType" AS ENUM ('PHYSICAL', 'ECONOMIC', 'VERBAL', 'SEXUAL', 'PSYCHOLOGICAL', 'SOCIAL');

-- CreateEnum
CREATE TYPE "DiscriminationPerpetrator" AS ENUM ('FAMILY_RELATIVE', 'COLLEAGUE', 'CUSTOMER_GUEST', 'OTHER');

-- DropIndex
DROP INDEX "CommunityMember_bpjsId_key";

-- AlterTable
ALTER TABLE "CommunityMember" DROP COLUMN "bpjsId",
DROP COLUMN "bpjsScanUrl",
DROP COLUMN "discriminationPerpetrator",
DROP COLUMN "discriminationType",
DROP COLUMN "hasBpjs",
DROP COLUMN "serviceContactPerson",
ADD COLUMN     "disabilityNotes" TEXT,
ADD COLUMN     "disabilityTypes" "DisabilityType"[],
ADD COLUMN     "discriminationPerpetratorOther" TEXT,
ADD COLUMN     "discriminationPerpetrators" "DiscriminationPerpetrator"[],
ADD COLUMN     "discriminationTypes" "DiscriminationType"[],
ADD COLUMN     "isPersonWithDisability" BOOLEAN DEFAULT false,
ADD COLUMN     "otherSocialAssistance" TEXT[],
ADD COLUMN     "socialSecurityId" TEXT,
ADD COLUMN     "socialSecurityOther" TEXT,
ADD COLUMN     "socialSecurityScanUrl" TEXT,
ADD COLUMN     "socialSecurityType" "SocialSecurityType" DEFAULT 'NONE',
ADD COLUMN     "trainingOrganizer" TEXT;
