import { NextResponse } from "next/server";
import { createShelter, getAllShelters } from "@/backend/services/shelters";

export async function GET() {
    const shelters = await getAllShelters();
    return NextResponse.json(shelters);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { name, location, description, imageUrl } = body;

    if (!name || !location) {
        return NextResponse.json(
            { error: "name y location son obligatorios" },
            { status: 400 }
        );
    }

    const newShelter = await createShelter({
        name,
        location,
        description,
        imageUrl,
    });
    return NextResponse.json(newShelter);
}
