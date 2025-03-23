/*
  Warnings:

  - Added the required column `imageUrl` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Shelter` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "shelterId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Animal_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("age", "createdAt", "description", "id", "name", "shelterId") SELECT "age", "createdAt", "description", "id", "name", "shelterId" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_Shelter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Shelter" ("createdAt", "id", "location", "name") SELECT "createdAt", "id", "location", "name" FROM "Shelter";
DROP TABLE "Shelter";
ALTER TABLE "new_Shelter" RENAME TO "Shelter";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
