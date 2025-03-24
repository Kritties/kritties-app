import { prisma } from "../src/backend/lib/prisma";
import { createPet } from "../src/backend/services/pets";
import { createShelter } from "../src/backend/services/shelters";
import { createUser } from "../src/backend/services/users";

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

  createPet({
    name: "Liza",
    nftImageUrl: "http://localhost:3000/pets/1-small.jpg",
    mainImageUrl: "http://localhost:3000/pets/1-big.jpg",
    age: 3,
    description:
      "Tom is a very active dog. He’s very friendly and loving, and likes to run a lot so he needs extra space. Chasing squirrels and running after a stick are his favorite activities!",
    shelterId: shelter3.id,
  });

  createPet({
    name: "Candy",
    nftImageUrl: "http://localhost:3000/pets/2-small.jpg",
    mainImageUrl: "http://localhost:3000/pets/2-big.jpg",
    age: 1,
    description:
      "Tom is a very active dog. He’s very friendly and loving, and likes to run a lot so he needs extra space. Chasing squirrels and running after a stick are his favorite activities!",
    shelterId: shelter3.id,
  });

  createPet({
    name: "Wero",
    nftImageUrl: "http://localhost:3000/pets/3-small.jpg",
    mainImageUrl: "http://localhost:3000/pets/3-big.jpg",
    age: 8,
    description:
      "Tom is a very active dog. He’s very friendly and loving, and likes to run a lot so he needs extra space. Chasing squirrels and running after a stick are his favorite activities!",
    shelterId: shelter3.id,
  });

  createPet({
    name: "Tom",
    nftImageUrl: "http://localhost:3000/pets/1-small.jpg",
    mainImageUrl: "http://localhost:3000/pets/1-big.jpg",
    age: 3,
    description:
      "Tom is a very active dog. He’s very friendly and loving, and likes to run a lot so he needs extra space. Chasing squirrels and running after a stick are his favorite activities!",
    shelterId: shelter3.id,
  });

  createPet({
    name: "Bongo",
    nftImageUrl: "http://localhost:3000/pets/2-small.jpg",
    mainImageUrl: "http://localhost:3000/pets/2-big.jpg",
    age: 6,
    description:
      "Tom is a very active dog. He’s very friendly and loving, and likes to run a lot so he needs extra space. Chasing squirrels and running after a stick are his favorite activities!",
    shelterId: shelter3.id,
  });

  await createPet({
    name: "Luna",
    age: 3,
    description: "Perrita juguetona",
    shelterId: shelter1.id,
    nftImageUrl: "http://localhost:3000/pets/3-small.jpg",
    mainImageUrl: "http://localhost:3000/pets/3-big.jpg",
  });

  await createPet({
    name: "Simón",
    age: 2,
    description: "Gatito curioso",
    shelterId: shelter2.id,
    nftImageUrl: "http://localhost:3000/pets/1-small.jpg",
    mainImageUrl: "http://localhost:3000/pets/1-big.jpg",
  });

  await createUser({
    name: "María",
    walletAddress: "0x1234567890abcdef",
    email: "maria@example.com",
  });

  await createUser({
    name: "Carlos",
    walletAddress: "0xabcdef1234567890",
  });
}

main()
  .then(() => {
    console.log("🌱 Seed con servicios completado");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
