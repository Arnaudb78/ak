import dbConnect from "@/database/connect";
import Challenge from "@/models/challenge";

export interface ChallengeData {
    title: string;
    description: string;
    image: string;
    month: string;
}

async function createChallenge(body: ChallengeData) {
    if (!body) throw new Error("Body is required");

    await dbConnect();

    const challenge = await Challenge.create(body);

    return challenge;
}

export { createChallenge };
