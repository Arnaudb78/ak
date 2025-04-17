// ES module version of the test script
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

async function testConnection() {
    try {
        console.log("Attempting to connect to MongoDB...");
        console.log(`Connection URI: ${process.env.MONGODB_URI.replace(/:[^:]*@/, ":****@")}`);

        await mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: false,
        });

        console.log("Connection successful!");
        console.log(`Connected to MongoDB at: ${mongoose.connection.host}`);
        console.log(`Database name: ${mongoose.connection.db.databaseName}`);

        // Close the connection after testing
        await mongoose.disconnect();
        console.log("Connection closed successfully");
    } catch (error) {
        console.error("Connection failed:");
        console.error(error);
    } finally {
        process.exit(0);
    }
}

// Run the test
testConnection();
