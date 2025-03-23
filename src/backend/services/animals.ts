import { prisma } from '../lib/prisma';

export async function getAllAnimals() {
  return prisma.animal.findMany({
    include: { shelter: true },
  });
}

export async function createAnimal(data: {
  name: string;
  age: number;
  description: string;
  shelterId: string;
}) {
  return prisma.animal.create({ data });
}

export async function getAnimalById(id: string) {
  return prisma.animal.findUnique({ where: { id } });
}