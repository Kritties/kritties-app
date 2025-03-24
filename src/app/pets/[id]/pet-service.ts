import { Pet } from "@prisma/client";
import React from "react";

export function useGetPetById(id: string) {
  const [pet, setPet] = React.useState<Pet>();

  
  async function fetchById(url: string) {
    const pet = await fetch(url).then((res) => res.json() as Promise<Pet>);
    setPet(pet);
  }

  React.useEffect(() => {
    if (id) {
      fetchById(`/api/pets/${id}`);
    }
  }, [id]);

  return pet;
}


export function saveDonation(petId: string, wallet: string, amount: number, hash: string) {
  const data = {
    petId,
    wallet,
    amount,
    transactionId: hash,
  };

  fetch("/api/donations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
