-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "avatarURL" TEXT DEFAULT 'avatar.png',
    "role" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("avatarURL", "email", "fullName", "id", "passwordHash", "role") SELECT "avatarURL", "email", "fullName", "id", "passwordHash", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
