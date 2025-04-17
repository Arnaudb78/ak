import Challenge from "@/models/challenge";
import dbConnect from "@/database/connect";

export async function getChallenges() {
    await dbConnect();
    const challenges = await Challenge.find();
    return challenges;
}

export async function getChallengeByMonth(month: string) {
    await dbConnect();
    const challenges = await Challenge.find({ month });
    return challenges;
}

