import { prisma } from "../src/backend/lib/prisma";
import { createPet } from "../src/backend/services/pets";
import { createShelter } from "../src/backend/services/shelters";
import { createUser } from "../src/backend/services/users";
import { createDonation } from "../src/backend/services/donations";

async function main() {
  const shelter1 = await createShelter({
    name: "Refugio Huellitas",
    location: "Buenos Aires",
    description: "Refugio para animales de calle",
    imageUrl: "https://example.com/huellitas.jpg",
    contractAddress: "0x1234567890abcdef",
  });

  const shelter2 = await createShelter({
    name: "Patitas Felices",
    location: "Córdoba",
    description: "Refugio para animales de calle",
    imageUrl: "https://example.com/patitas.jpg",
    contractAddress: "0xabcdef1234567890",
  });

  const shelter3 = await createShelter({
    name: `Doggy Land`,
    location: "Buenos Aires",
    imageUrl: "http://localhost:3000/mock-data/shelter-1.png",
    description:
      "We give rescued dogs love and a chance for a better life. We promote responsible adoption and create lasting bonds between pets and people.",
    contractAddress: "0x1234567890abcdef",
  });

  const pets = await Promise.all([
    createPet({
      name: "Liza",
      imageUrl: "http://localhost:3000/mock-data/pet-1.png",
      age: 3,
      description: "Perra juguetona y activa",
      shelterId: shelter3.id,
    }),
    createPet({
      name: "Candy",
      imageUrl: "http://localhost:3000/mock-data/pet-2.png",
      age: 1,
      description: "Dulce y amigable",
      shelterId: shelter3.id,
    }),
    createPet({
      name: "Wero",
      imageUrl: "http://localhost:3000/mock-data/pet-3.png",
      age: 8,
      description: "Mayor pero muy sabio y tranquilo",
      shelterId: shelter3.id,
    }),
    createPet({
      name: "Tom",
      imageUrl: "http://localhost:3000/mock-data/pet-4.png",
      age: 3,
      description: "Activo y leal",
      shelterId: shelter3.id,
    }),
    createPet({
      name: "Bongo",
      imageUrl: "http://localhost:3000/mock-data/pet-5.png",
      age: 6,
      description: "Divertido y curioso",
      shelterId: shelter3.id,
    }),
    createPet({
      name: "Luna",
      age: 3,
      description: "Perrita juguetona",
      shelterId: shelter1.id,
      imageUrl: "https://example.com/luna.jpg",
    }),
    createPet({
      name: "Simón",
      age: 2,
      description: "Gatito curioso",
      shelterId: shelter2.id,
      imageUrl: "https://example.com/simon.jpg",
    }),
  ]);

  const user1 = await createUser({
    name: "María",
    walletAddress: "0x1234567890abcdef",
    email: "maria@example.com",
  });

  const user2 = await createUser({
    name: "Carlos",
    walletAddress: "0xabcdef1234567890",
  });

  // 💸 Donaciones
  await createDonation({
    userId: user1.id,
    petId: pets[0].id,
    amount: 25.5,
    transactionId: "0xtx01",
  });

  await createDonation({
    userId: user1.id,
    petId: pets[1].id,
    amount: 10,
    transactionId: "0xtx02",
  });

  await createDonation({
    userId: user2.id,
    petId: pets[0].id,
    amount: 50,
    transactionId: "0xtx03",
  });

  await createDonation({
    userId: user2.id,
    petId: pets[6].id, // Simón
    amount: 15,
    transactionId: "0xtx04",
  });
}

main()
  .then(() => {
    console.log("🌱 Seed con donaciones completado");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
