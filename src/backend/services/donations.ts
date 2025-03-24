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
    console.log("getPetsDonationsByUser", donations, wallet);
    const groupedDonations = donations.reduce((acc, donation) => {
        const petId = donation.petId;
        if (!acc[petId]) {
            acc[petId] = [];
        }
        acc[petId].push(donation);
        return acc;
    }, {} as Record<string, typeof donations>);

    return groupedDonations;
}

export async function getDonation(id: string) {
    return prisma.donation.findUnique({
        where: { id },
        include: { pet: true },
    });
}
