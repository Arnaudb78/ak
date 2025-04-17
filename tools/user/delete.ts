import mongoose from "mongoose";
import dbConnect from "@/database/connect";
import User from "@/models/User";

async function deleteUser(id: mongoose.Types.ObjectId) {
    if (!id) throw new Error("Id is required");

    await dbConnect();

    const user = await User.findByIdAndDelete(id);

    return user;
}

export { deleteUser };
