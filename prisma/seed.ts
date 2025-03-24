import { prisma } from "../src/backend/lib/prisma";
import { createPet } from "../src/backend/services/pets";
import { createShelter } from "../src/backend/services/shelters";
import { createDonation } from "../src/backend/services/donations";

async function main() {
    const shelter1 = await createShelter({
        name: "Refugio Huellitas",
        location: "Buenos Aires",
        description: "Refugio para animales de calle",
        imageUrl: "https://example.com/huellitas.jpg",
        contractAddress: "0x1234567890abcdef",
        ownerWallet: "0x1234567890abcdef",
    });

    const shelter2 = await createShelter({
        name: "Patitas Felices",
        location: "Córdoba",
        description: "Refugio para animales de calle",
        imageUrl: "https://example.com/patitas.jpg",
        contractAddress: "0xabcdef1234567890",
        ownerWallet: "0xabcdef1234567890",
    });

    const shelter3 = await createShelter({
        name: `Doggy Land`,
        location: "Buenos Aires",
        imageUrl: "/mock-data/shelter-1.png",
        description:
            "We give rescued dogs love and a chance for a better life. We promote responsible adoption and create lasting bonds between pets and people.",
        contractAddress: "0x1234567890abcdef",
        ownerWallet: "0x1234567890abcdef",
    });

    createPet({
        name: "Liza",
        mainImageUrl: "/pets/1-big.jpg",
        nftImageUrl: "/pets/1-small.jpg",
        age: 3,
        description:
            "Tom is a very active dog. He’s very friendly and loving, and likes to run a lot so he needs extra space. Chasing squirrels and running after a stick are his favorite activities!",
        shelterId: shelter3.id,
    });

    createPet({
        name: "Candy",
        mainImageUrl: "/pets/2-big.jpg",
        nftImageUrl: "/pets/2-small.jpg",
        age: 1,
        description:
            "Tom is a very active dog. He’s very friendly and loving, and likes to run a lot so he needs extra space. Chasing squirrels and running after a stick are his favorite activities!",
        shelterId: shelter3.id,
    });

    createPet({
        name: "Wero",
        mainImageUrl: "/pets/3-big.jpg",
        nftImageUrl: "/pets/3-small.jpg",
        age: 8,
        description:
            "Tom is a very active dog. He’s very friendly and loving, and likes to run a lot so he needs extra space. Chasing squirrels and running after a stick are his favorite activities!",
        shelterId: shelter3.id,
    });

    createPet({
        name: "Tom",
        mainImageUrl: "/pets/1-big.jpg",
        nftImageUrl: "/pets/1-small.jpg",
        age: 3,
        description:
            "Tom is a very active dog. He’s very friendly and loving, and likes to run a lot so he needs extra space. Chasing squirrels and running after a stick are his favorite activities!",
        shelterId: shelter3.id,
    });

    createPet({
        name: "Bongo",
        mainImageUrl: "/pets/2-big.jpg",
        nftImageUrl: "/pets/2-small.jpg",
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
        mainImageUrl: "/pets/3-big.jpg",
        nftImageUrl: "/pets/3-small.jpg",
    });

    await createPet({
        name: "Simón",
        age: 2,
        description: "Gatito curioso",
        shelterId: shelter2.id,
        mainImageUrl: "/pets/2-big.jpg",
        nftImageUrl: "/pets/2-small.jpg",
    });

    const pets = await prisma.pet.findMany();

    await createDonation({
        petId: pets[0].id,
        amount: 100,
        wallet: "0x1234567890abcdef",
        transactionId: "0x1234567890abcdef1",
        date: new Date(),
    });

    await createDonation({
        petId: pets[1].id,
        amount: 50,
        wallet: "0x1234567890abcdef",
        transactionId: "0x1234567890abcdef2",
        date: new Date(),
    });

    await createDonation({
        petId: pets[2].id,
        amount: 75,
        wallet: "0x1234567890abcdef",
        transactionId: "0x1234567890abcdef3",
        date: new Date(),
    });

    await createDonation({
        petId: pets[2].id,
        amount: 25,
        wallet: "0x1234567890abcdef",
        transactionId: "0x1234567890abcdef4",
        date: new Date(),
    });

    await createDonation({
        petId: pets[1].id,
        amount: 150,
        wallet: "0x1234567890abcdef",
        transactionId: "0x1234567890abcdef5",
        date: new Date(),
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
