/*
  Warnings:

  - You are about to drop the column `desiredSkillTraining` on the `CommunityMember` table. All the data in the column will be lost.
  - You are about to drop the column `skillTrainingType` on the `CommunityMember` table. All the data in the column will be lost.
  - You are about to drop the column `trainingOrganizer` on the `CommunityMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CommunityMember" DROP COLUMN "desiredSkillTraining",
DROP COLUMN "skillTrainingType",
DROP COLUMN "trainingOrganizer",
ADD COLUMN     "desiredSkillTrainings" TEXT[],
ADD COLUMN     "skillTrainingTypes" TEXT[],
ADD COLUMN     "trainingOrganizers" TEXT[];
