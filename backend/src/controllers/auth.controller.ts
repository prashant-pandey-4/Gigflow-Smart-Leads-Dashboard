import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

// generate token and assign
const generateToken = (id: string, role: string): string => {
  return jwt.sign(
    { _id: id, role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
};

// Register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // Email already exist?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "Email already exists" });
      return;
    }

    // User banao
    const user = await User.create({ name, email, password, role });

    const token = generateToken(user._id.toString(), user.role);

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      data: { user, token },
    });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.name === "ValidationError"
    ) {
      const validationError = error as any;
      const messages: string[] = Object.values(validationError.errors).map(
        (e: any) => e.message
      );
      res.status(400).json({ success: false, message: messages[0] });
      return;
    }
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // User dhundo — password bhi include karo
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // Password check karo
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user, token },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get Current User
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};