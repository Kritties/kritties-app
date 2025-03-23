// backend/services/users.ts
import { prisma } from '../lib/prisma';

export async function createUser(data: {
  name: string;
  email?: string;
  walletAddress: string;
}) {
  return prisma.user.create({ data });
}

export async function findUserByWalletAddress(walletAddress: string) {
  return prisma.user.findUnique({ where: { walletAddress } });
}

export async function getUsers() {
  return prisma.user.findMany();
}