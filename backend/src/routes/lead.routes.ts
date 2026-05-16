import { Router } from "express";

import {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
   exportLeads,
} from "../controllers/lead.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { UserRole } from "../models/user.model";

const router = Router();

// All routes are protected
router.get("/", protect, getLeads);
router.get("/export/csv", protect, restrictTo(UserRole.ADMIN), exportLeads);
router.get("/:id", protect, getLead);
router.post("/", protect, createLead);
router.put("/:id", protect, updateLead);

// Admin only
router.delete("/:id", protect, restrictTo(UserRole.ADMIN), deleteLead);

export default router;