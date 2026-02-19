import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/** Only connect when a real MongoDB URI is set (starts with mongodb+srv:// or mongodb://). */
function isMongoUriConfigured(): boolean {
  if (!MONGODB_URI || typeof MONGODB_URI !== "string") return false;
  const u = MONGODB_URI.trim();
  return u.startsWith("mongodb+srv://") || u.startsWith("mongodb://");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };
if (!global.mongoose) global.mongoose = cached;

/**
 * Connect to MongoDB. Uses process.env.MONGODB_URI.
 * Returns null if MONGODB_URI is not set or not a valid MongoDB URI (avoids MongoParseError).
 * Uncomment the connection logic below when you are ready to use MongoDB.
 */
export async function connectDB(): Promise<typeof mongoose | null> {
  if (!isMongoUriConfigured()) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
