/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `wallet` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerWallet` to the `Shelter` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_walletAddress_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Donation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wallet" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "transactionId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Donation_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Donation" ("amount", "date", "id", "petId", "transactionId") SELECT "amount", "date", "id", "petId", "transactionId" FROM "Donation";
DROP TABLE "Donation";
ALTER TABLE "new_Donation" RENAME TO "Donation";
CREATE UNIQUE INDEX "Donation_transactionId_key" ON "Donation"("transactionId");
CREATE TABLE "new_Shelter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "contractAddress" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerWallet" TEXT NOT NULL
);
INSERT INTO "new_Shelter" ("contractAddress", "createdAt", "description", "id", "imageUrl", "location", "name") SELECT "contractAddress", "createdAt", "description", "id", "imageUrl", "location", "name" FROM "Shelter";
DROP TABLE "Shelter";
ALTER TABLE "new_Shelter" RENAME TO "Shelter";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
