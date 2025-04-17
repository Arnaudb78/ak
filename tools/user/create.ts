import dbConnect from "@/database/connect";
import User from "@/models/User";

// Define the interface for user data
export interface UserData {
    name: string;
    email: string;
    password: string;
}

async function createUser(body: UserData) {
    if (!body) throw new Error("Body is required");

    await dbConnect();

    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) return { message: "Cette adresse email est déjà utilisée." };

    const user = await User.create(body);

    return user;
}

export { createUser };
