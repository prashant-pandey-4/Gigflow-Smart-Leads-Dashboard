import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  await mongoose.connect(mongoUri);
};

export { connectDb };
