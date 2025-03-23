import { getShelterById } from "@/backend/services/shelters";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop() as string;

    if (!id) {
        return NextResponse.json(
            { error: "El id es obligatorio" },
            { status: 400 }
        );
    }
    

    const data = await getShelterById(id);
    return NextResponse.json(data);
}
