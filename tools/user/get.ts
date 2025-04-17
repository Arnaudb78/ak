import mongoose from "mongoose";
import dbConnect from "@/database/connect";
import User from "@/models/User";

async function getUserById(id: mongoose.Types.ObjectId) {

    if (!id) throw new Error("Id is required");

    await dbConnect();

    const user = await User.findById(id);

    return user;
}

async function getUsers() {
    await dbConnect();

    const users = await User.find();

    return users;
}

export { getUserById, getUsers };
