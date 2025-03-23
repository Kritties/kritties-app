import { prisma } from '../lib/prisma';

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
}) {
  return prisma.shelter.create({ data });
}
