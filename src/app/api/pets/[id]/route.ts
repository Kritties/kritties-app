import { NextResponse } from "next/server";
import { getPetById } from "@/backend/services/pets";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop() as string;

    if (!id) {
        return NextResponse.json(
            { error: "El id es obligatorio" },
            { status: 400 }
        );
    }
    

    const pet = await getPetById(id);
    return NextResponse.json(pet);
}
