import { Response } from "express";
import Lead from "../models/lead.model";
import { AuthRequest } from "../middleware/auth.middleware";
import { UserRole } from "../models/user.model";
import { convertToCSV } from "../utils/csvExport";

// Get all leads with filter + search + sort + pagination
export const getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, source, search, sort, page = 1, limit = 10 } = req.query;

    
    const filter: Record<string, unknown> = {};

    // Admin sees all, sales sees only their own
    if (req.user?.role !== UserRole.ADMIN) {
      filter.createdBy = req.user?._id;
    }

    // Filter by status
    if (status) filter.status = status;

    // Filter by source
    if (source) filter.source = source;

    // Search by name or email
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Sort
    const sortOption: { createdAt: 1 | -1 } = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    // Pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [leads, total] = await Promise.all([
      Lead.find(filter).sort(sortOption).skip(skip).limit(limitNum),
      Lead.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: leads,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get single lead
export const getLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404).json({ success: false, message: "Lead not found" });
      return;
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Create lead
export const createLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, status, source } = req.body;

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      createdBy: req.user?._id,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Update lead
export const updateLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404).json({ success: false, message: "Lead not found" });
      return;
    }

    // Sales user can only update their own leads
    if (
      req.user?.role !== UserRole.ADMIN &&
      lead.createdBy.toString() !== req.user?._id
    ) {
      res.status(403).json({ success: false, message: "Not authorized" });
      return;
    }

    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete lead — Admin only
export const deleteLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404).json({ success: false, message: "Lead not found" });
      return;
    }

    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
// CSV Export — Admin only
export const exportLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const leads = await Lead.find({});
    const csv = convertToCSV(leads);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};