import mongoose from "mongoose";
import User from "./User.ts";
import dbConnect from "../database/connect.ts";

const userTest = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
};

async function createUser() {
    try {
        console.log("Connecting to database...");
        await dbConnect();

        console.log("Creating test user...");
        const user = await User.create(userTest);
        console.log("User created successfully:");
        console.log(user);

        // Disconnect from the database
        await mongoose.disconnect();
        console.log("Database connection closed");
    } catch (error) {
        console.error("Error creating user:");
        console.error(error);
    } finally {
        process.exit(0);
    }
}

createUser();
