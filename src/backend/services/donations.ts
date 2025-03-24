import { Address } from "viem";
import { prisma } from "../lib/prisma";

export async function createDonation(data: {
    petId: string;
    amount: number;
    transactionId: string;
    date: Date;
    wallet: string;
}) {
    return prisma.donation.create({
        data,
    });
}

export async function getDonationsByUser(wallet: string) {
    return prisma.donation.findMany({
        where: { wallet },
        include: { pet: true },
        orderBy: { date: "desc" },
    });
}

export async function getPetsDonationsByUser(wallet: string) {
 const donations = await prisma.donation.findMany({
     where: { wallet },
     include: { pet: true },
     orderBy: { date: "desc" },
 });

 const grouped = donations.reduce((acc, donation) => {
     const petId = donation.petId;

     if (!acc[petId]) {
         acc[petId] = {
             pet: donation.pet,
             totalAmount: 0,
             donations: [],
         };
     }

     acc[petId].totalAmount += donation.amount;
     acc[petId].donations.push(donation);

     return acc;
 }, {} as Record<string, {
     pet: typeof donations[number]['pet'],
     totalAmount: number,
     donations: typeof donations,
 }>);

 // Convertir a array si querés devolverlo como lista
 return Object.values(grouped);
}


export async function getDonation(id: string) {
    return prisma.donation.findUnique({
        where: { id },
        include: { pet: true },
    });
}
