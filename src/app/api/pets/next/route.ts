import { NextResponse } from "next/server";
import { prisma } from "@/backend/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const prev = url.searchParams.get("prev");

  const excludedPets = prev ? prev.split(",") : [];

  const pets = await prisma.pet.findMany({
    where: {
      id: { notIn: excludedPets },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      shelter: {
        select: {
          name: true,
        },
      },
    },
    take: 10,
  });

  const result = pets.sort(() => 0.5 - Math.random()).slice(0, 2);

  return NextResponse.json(result);
}

export type GetNextPetsType = Prisma.PetGetPayload<{
  include: {
    shelter: {
      select: {
        name: true;
      };
    };
  };
}>;
