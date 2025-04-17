import { NextResponse } from "next/server";
import { getUserById } from "@/tools/user/get";
import mongoose from "mongoose";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const userId = new mongoose.Types.ObjectId(id);

        const user = await getUserById(userId);
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
