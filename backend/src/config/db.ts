import colors from "colors";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const store: any = process.env.MONGO_URI! as string;
    const conn: any = await mongoose.connect(store, {});

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`error in conneecting ${error}`);
    process.exit(1);
  }
};

export default connectDB;
