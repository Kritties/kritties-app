import { prisma } from "../src/backend/lib/prisma";
import { createAnimal } from "../src/backend/services/animals";
import { createShelter } from "../src/backend/services/shelters";
import { createUser } from "../src/backend/services/users";

async function main() {
  const shelter1 = await createShelter({
    name: 'Refugio Huellitas',
    location: 'Buenos Aires',
    description: 'Refugio para animales de calle',
    imageUrl: 'https://example.com/huellitas.jpg',
  });

  const shelter2 = await createShelter({
    name: 'Patitas Felices',
    location: 'Córdoba',
    description: 'Refugio para animales de calle',
    imageUrl: 'https://example.com/patitas.jpg',
  });

  await createAnimal({
    name: 'Luna',
    age: 3,
    description: 'Perrita juguetona',
    shelterId: shelter1.id,
    imageUrl: 'https://example.com/luna.jpg',
  });

  await createAnimal({
    name: 'Simón',
    age: 2,
    description: 'Gatito curioso',
    shelterId: shelter2.id,
    imageUrl: 'https://example.com/simon.jpg',
  });

  await createUser({
    name: 'María',
    walletAddress: '0x1234567890abcdef',
    email: 'maria@example.com',
  });

  await createUser({
    name: 'Carlos',
    walletAddress: '0xabcdef1234567890',
  });
}

main()
  .then(() => {
    console.log('🌱 Seed con servicios completado');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
