import { Router, Request, Response } from "express";
import { saveEnquiryToExcel, EnquiryData, EXCEL_FILE_PATH } from "../lib/excel";
import path from "path";
import fs from "fs";

const router = Router();

// Registration handler (alias for enquiry)
router.post("/registration", async (req: Request, res: Response) => {
  try {
    const data: EnquiryData = req.body;
    
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.sport || !data.enquiryType || !data.message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Save to Excel
    saveEnquiryToExcel(data);

    return res.status(200).json({ success: true, message: "Registration saved successfully" });
  } catch (error) {
    console.error(`[REGISTRATION ERROR] Failed to save registration:`, error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/enquiry", async (req: Request, res: Response) => {
  try {
    const data: EnquiryData = req.body;
    
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.sport || !data.enquiryType || !data.message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Save to Excel
    saveEnquiryToExcel(data);

    return res.status(200).json({ success: true, message: "Enquiry saved successfully" });
  } catch (error) {
    console.error(`[ENQUIRY ERROR] Failed to save enquiry:`, error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route to download the Excel sheet
router.get("/download-enquiries", (req: Request, res: Response) => {
  if (fs.existsSync(EXCEL_FILE_PATH)) {
    res.download(EXCEL_FILE_PATH, 'enquiries.xlsx');
  } else {
    res.status(404).json({ error: "Excel file not found yet. Submit some registrations first!" });
  }
});

export default router;
