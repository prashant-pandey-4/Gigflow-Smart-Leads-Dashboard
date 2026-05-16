import { Router } from "express";
import  authRouter  from "./auth.routes";
import leadRouter from "./lead.routes";

const router = Router();

// Auth routes
router.use("/auth", authRouter);
router.use("/leads", leadRouter);

export { router };