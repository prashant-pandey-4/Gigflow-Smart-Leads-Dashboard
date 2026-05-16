import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Register new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get current user
router.get("/me", protect, getMe);

export default router;