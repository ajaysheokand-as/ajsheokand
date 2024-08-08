import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string || "mongodb://user:Ajay%40user@23.142.25.32:27017/portfolio?directConnection=true&authSource=mydatabase&appName=mongosh+2.2.15";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Use cached connection to avoid multiple connections
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };
    cached.promise = await mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        // console.log("Connection Successful =>", mongoose);
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
