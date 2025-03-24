import { Pet } from '@prisma/client';
import { prisma } from '../lib/prisma';

export async function getAllPets() {
  return prisma.pet.findMany({
    include: { shelter: true },
  });
}

export async function createPet(data: Omit<Pet, 'id' | 'createdAt'>) {
  return prisma.pet.create({ data });
}

export async function getPetById(id: string) {
  return prisma.pet.findUnique({ where: { id } });
}