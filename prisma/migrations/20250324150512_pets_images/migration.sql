/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `mainImageUrl` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nftImageUrl` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "nftImageUrl" TEXT NOT NULL,
    "mainImageUrl" TEXT NOT NULL,
    "shelterId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Pet_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("age", "createdAt", "description", "id", "name", "shelterId") SELECT "age", "createdAt", "description", "id", "name", "shelterId" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
