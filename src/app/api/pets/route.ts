import { NextResponse } from "next/server";
import { createPet, getAllPets } from "@/backend/services/pets";

export async function GET() {
  const animals = await getAllPets();
  return NextResponse.json(animals);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, age, description, shelterId, nftImageUrl, mainImageUrl } = body;

  if (
    !name ||
    !age ||
    !description ||
    !shelterId ||
    !nftImageUrl ||
    !mainImageUrl
  ) {
    return NextResponse.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }

  const animal = await createPet({
    name,
    age,
    description,
    shelterId,
    nftImageUrl,
    mainImageUrl,
  });
  return NextResponse.json(animal);
}
