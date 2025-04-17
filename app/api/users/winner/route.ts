import { NextResponse } from "next/server";
import dbConnect from "@/database/connect";
import User from "@/models/User";

export async function GET() {
    try {
        await dbConnect();
        
        const topUsers = await User.find()
            .sort({ posts: -1 })
            .limit(3);
        
        return NextResponse.json(topUsers);
    } catch (error) {
        console.error("Error getting top users:", error);
        return NextResponse.json({ message: "Error getting top users" }, { status: 500 });
    }
}
