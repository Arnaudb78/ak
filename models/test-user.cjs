// CommonJS version
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Initialize environment variables
dotenv.config();

// Check for MongoDB URI
if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

async function createUser() {
    try {
        console.log("Connecting to database...");

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: false,
        });
        console.log("Connected to database");

        // Define User Schema (inline for testing)
        const userSchema = new mongoose.Schema({
            name: String,
            email: String,
            password: String,
        });

        // Create model (or get existing one)
        const User = mongoose.models.User || mongoose.model("User", userSchema);

        // User data to insert
        const userTest = {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
        };

        // Create the user
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

// Run the function
createUser();
