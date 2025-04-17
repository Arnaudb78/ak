import { NextResponse } from "next/server";
import { createUser } from "@/tools/user/create";

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    try {
        console.log("Creating user...");
    
        const newUser = await createUser({ name, email, password });

        if (newUser.message) {
            return NextResponse.json({ message: newUser.message }, { status: 400 });
        }

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Error creating user" }, { status: 500 });
    }
}
