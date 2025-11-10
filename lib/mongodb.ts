import mongoose from "mongoose";

// Define the structure of our cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global namespace to include our mongoose cache
declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    `Please define the MONGODB_URI environment variable inside .env.local `,
  );
}

// Initialize cache object to store the connection
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes and returns a cached MongoDB connection
 * This prevents multiple connections from being created during development hot reloads
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection promise if one doesn't exist
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Disable mongoose buffering
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, options)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    // Wait for connection promise to resolve
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise on error so next call attempts to reconnect
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
