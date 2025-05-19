-- CreateTable
CREATE TABLE "CommunityMember" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT,
    "nik" TEXT,
    "idScanUrl" TEXT,
    "hasBpjs" BOOLEAN NOT NULL DEFAULT false,
    "bpjsId" TEXT,
    "bpjsScanUrl" TEXT,
    "profilePhotoUrl" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "address" TEXT,
    "city" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "notes" TEXT,

    CONSTRAINT "CommunityMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityMember_nik_key" ON "CommunityMember"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityMember_bpjsId_key" ON "CommunityMember"("bpjsId");
