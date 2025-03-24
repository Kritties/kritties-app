import { Pet } from "@prisma/client";
import React, { useCallback } from "react";
import { GetNextPetsType } from "./api/pets/next/route";

export function useGetNextPets() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [pets, setPets] = React.useState<GetNextPetsType[]>([]);

  async function fetchNextPets(url: string, prevPets: Pet[]) {
    const prev = prevPets.map((pet) => pet.id).join(",");

    const data = await fetch(`${url}?prev=${prev}`).then((res) => res.json() as Promise<GetNextPetsType[]>);
    setPets((prev) => [...prev, ...data]);
    setIsLoading(false);
  }

  React.useEffect(() => {
    fetchNextPets(`/api/pets/next`, []);
  }, []);

  const nextPets = useCallback(() => {
    setIsLoading(true);
    fetchNextPets(`/api/pets/next`, pets);
  }, [pets]);

  return { pets, nextPets, isLoading };
}
