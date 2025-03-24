import { prisma } from '../lib/prisma';

export async function getShelterById(id: string) {
  return prisma.shelter.findUnique({
    where: { id },
    include: { animals: true },
  });
}

export async function getAllShelters() {
  return prisma.shelter.findMany({
    include: { animals: true },
  });
}

export async function createShelter(data: {
  name: string;
  location: string;
  imageUrl: string;
  description: string;
  contractAddress: string;
  ownerWallet: string;
}) {
  return prisma.shelter.create({ data });
}
