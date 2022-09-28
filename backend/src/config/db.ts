import colors from "colors";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const store =
      "mongodb+srv://durotimi:durotimi123@cluster0.ghmvky7.mongodb.net/test";
    const conn: any = await mongoose.connect(store, {});

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`error in conneecting ${error}`);
    process.exit(1);
  }
};

export default connectDB;
