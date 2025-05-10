import { GetShelterByIdType } from "@/backend/services/shelters";
import { useDonationContract } from "@/hooks/useKrittiesContract";
import React from "react";

export function useCreateShelter() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [shelter, setShelter] = React.useState<GetShelterByIdType>();
    const { createShelter } = useDonationContract();
    async function create(
        name: string,
        symbol: string,
        location: string,
        imageUrl: string,
        description: string,
        ownerWallet: string
    ) {
        setIsLoading(true);
        const contractAddress = await createShelter(name, symbol);
        console.log("contract deployed!!", contractAddress);
        const shelter = await fetch("/api/shelters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                location,
                imageUrl,
                description,
                ownerWallet,
                contractAddress
            }),
        });
        const data = await shelter.json();
        console.log("shelter created!!", data);
        setShelter(data);
        setIsLoading(false);
        return data;
    }

    return { create, isLoading, shelter };
} 