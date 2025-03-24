import { NextResponse } from "next/server";
import {
    createDonation,
    getPetsDonationsByUser,
} from "@/backend/services/donations";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet");
    console.log("get by wallet", wallet);
    const pets = await getPetsDonationsByUser(wallet || "");
    console.log(pets);
    return NextResponse.json(pets);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { petId, wallet, amount, transactionId } = body;

    if (!petId || !wallet || !amount) {
        return NextResponse.json(
            { error: "Todos los campos son obligatorios" },
            { status: 400 }
        );
    }

    const animal = await createDonation({
        petId,
        wallet,
        amount,
        transactionId,
        date: new Date(),
    });
    return NextResponse.json(animal);
}
