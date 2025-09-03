import { Request, Response } from "express";
import { SERVER_ERROR, SUCESS } from "../core/constants/http-status.constants";

export const getAssignmentsController = (req: Request, res: Response) => {
  try {
    const assignmentData = {};
    res.status(SUCESS).json({ data: assignmentData });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

export const uploadAssignmentsFileController = (
  req: Request,
  res: Response
) => {
  try {
    // To be implemented
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};
