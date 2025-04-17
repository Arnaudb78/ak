import mongoose from "mongoose";
import dotenv from "dotenv";

// Initialize dotenv to ensure environment variables are loaded
dotenv.config();

console.log(process.env.MONGODB_URI, "MONGODB_URI");

if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

interface ConnectionCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

let globalMongoose: ConnectionCache;

if (!global.__mongooseCache) {
    global.__mongooseCache = { conn: null, promise: null };
}

globalMongoose = global.__mongooseCache;

async function dbConnect(): Promise<typeof mongoose> {
    if (globalMongoose.conn) {
        return globalMongoose.conn;
    }

    if (!globalMongoose.promise) {
        const opts = {
            bufferCommands: false,
        };

        globalMongoose.promise = mongoose.connect(MONGODB_URI, opts);
    }

    try {
        // Await the connection
        globalMongoose.conn = await globalMongoose.promise;
    } catch (e) {
        // If connection fails, clear the promise to retry next time
        globalMongoose.promise = null;
        throw e;
    }

    return globalMongoose.conn;
}

// Declare the global variable for TypeScript
declare global {
    var __mongooseCache: ConnectionCache;
}

export default dbConnect;
