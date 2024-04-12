-- CreateTable
CREATE TABLE "IntroducingYourself" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refereeScore_1" INTEGER NOT NULL DEFAULT 0,
    "refereeScore_2" INTEGER NOT NULL DEFAULT 0,
    "refereeScore_3" INTEGER NOT NULL DEFAULT 0,
    "refereeScore_4" INTEGER NOT NULL DEFAULT 0,
    "studentId" INTEGER NOT NULL,
    CONSTRAINT "IntroducingYourself_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "IntroducingYourself_studentId_key" ON "IntroducingYourself"("studentId");
