import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user";
import { Request, Response } from "express";

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, firstname, lastname } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        msg: "password do not match ",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await new User({
      name: `${firstname} ${lastname}`,
      // firstname,
      // lastname,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    console.log("res", result);
    result.save();
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    return res.status(200).json({ result, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
