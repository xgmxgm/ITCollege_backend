/*
  Warnings:

  - You are about to drop the `IntroducingYourself` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "IntroducingYourself";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Stage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stageName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Stage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RefereeScore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refereeName" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "RefereeScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Stage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Stage_userId_key" ON "Stage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RefereeScore_userId_key" ON "RefereeScore"("userId");
