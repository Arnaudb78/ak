import { getChallenges } from "@/tools/challenge/get";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const challenges = await getChallenges();
        return NextResponse.json(challenges);
    } catch (error) {
        console.error("Error getting challenges:", error);
        return NextResponse.json({ message: "Error getting challenges" }, { status: 500 });
    }
}
