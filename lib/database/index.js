const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

let cached = mongoose || { conn: null, promise: null };

const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI)
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env"
    );

  cached.promise =
    cached.promise ||
    await mongoose.connect(MONGODB_URI, {
      dbName: "cam-counter",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
module.exports = { connectToDatabase };