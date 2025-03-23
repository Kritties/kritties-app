import { NextResponse } from 'next/server';
import { createAnimal, getAllAnimals } from '@/backend/services/animals';

export async function GET() {
  const animals = await getAllAnimals();
  return NextResponse.json(animals);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, age, description, shelterId } = body;

  if (!name || !age || !description || !shelterId) {
    return NextResponse.json(
      { error: 'Todos los campos son obligatorios' },
      { status: 400 }
    );
  }

  const animal = await createAnimal({ name, age, description, shelterId });
  return NextResponse.json(animal);
}
