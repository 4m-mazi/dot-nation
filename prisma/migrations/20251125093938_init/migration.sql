-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nation" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Nation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Citizen" (
    "id" TEXT NOT NULL,
    "nationId" TEXT NOT NULL,
    "communityId" TEXT,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "className" TEXT,
    "activity" INTEGER NOT NULL,
    "creativity" INTEGER NOT NULL,
    "sociability" INTEGER NOT NULL,
    "curiosity" INTEGER NOT NULL,
    "shortBio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Citizen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_slug_key" ON "Community"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Nation_slug_key" ON "Nation"("slug");

-- CreateIndex
CREATE INDEX "Citizen_nationId_idx" ON "Citizen"("nationId");

-- CreateIndex
CREATE INDEX "Citizen_communityId_idx" ON "Citizen"("communityId");

-- AddForeignKey
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_nationId_fkey" FOREIGN KEY ("nationId") REFERENCES "Nation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE SET NULL ON UPDATE CASCADE;
