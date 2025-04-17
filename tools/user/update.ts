import mongoose from "mongoose";
import dbConnect from "@/database/connect";
import User from "@/models/User";

async function updateUser(id: mongoose.Types.ObjectId, body: typeof User) {
    
    if (!id || !body) throw new Error("Id and body are required");

    await dbConnect();

    const user = await User.findByIdAndUpdate(id, body, { new: true });

    await mongoose.disconnect();

    return user;
}

export { updateUser };
