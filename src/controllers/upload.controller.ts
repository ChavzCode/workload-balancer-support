import { Request, Response } from "express";

export const uploadFileController = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Error uploading file" });
  }
};
