import { prisma } from '../lib/prisma';

export async function createDonation(data: {
  userId: string;
  petId: string;
  amount: number;
  transactionId: string;
}) {
  return prisma.donation.create({
    data,
  });
}

export async function getDonationsByUser(userId: string) {
  return prisma.donation.findMany({
    where: { userId },
    include: { pet: true },
    orderBy: { date: 'desc' },
  });
}

export async function getDonationsByPet(petId: string) {
  return prisma.donation.findMany({
    where: { petId },
    include: { user: true },
    orderBy: { date: 'desc' },
  });
}

export async function getDonation(id: string) {
  return prisma.donation.findUnique({
    where: { id },
    include: { pet: true },
  });
}