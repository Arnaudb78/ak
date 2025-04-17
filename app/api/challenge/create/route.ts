import { createChallenge } from "@/tools/challenge/create";
import { NextResponse } from "next/server";
import { saveImage } from "@/tools/save-pic";

export async function POST(req: Request) {
    const body = await req.json();
    const { title, description, image, month } = body;

    if (!title || !description || !image || !month) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const picturePath = await saveImage(image);

    try {
        const challenge = await createChallenge({ title, description, image: picturePath, month });
        return NextResponse.json(challenge, { status: 201 });
    } catch (error) {
        console.error("Error creating challenge:", error);
        return NextResponse.json({ message: "Error creating challenge" }, { status: 500 });
    }
}
