import mongoose from "mongoose";
type user = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  timestamps: boolean;
};

const userSchema = new mongoose.Schema<user>({
  firstname: { required: false, type: String },
  lastname: { required: false, type: String },
  email: { required: true, type: String },
  password: { required: true, type: String },
  confirmPassword: { type: String },
  name: { type: String },
  // timestamps: true,
});

const User = mongoose.model("userSchema", userSchema);
export default User;
