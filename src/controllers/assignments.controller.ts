import { Request, Response } from "express";
import { SERVER_ERROR, SUCESS } from "../core/constants/http-status.constants";
import { assignmentsDb } from "../infrastructure/db/services/assignments.db.service";
import { AssignmentDataFromCSV } from "../models/assignment-data.model";
import { parseFile } from "../core/utils/files.util";
import { mapFileToAssignmentData } from "../core/mappers/assignment-data.mapper";

export const getAssignmentsController = (req: Request, res: Response) => {
    try {
        const assignmentData = assignmentsDb.getAllAssignments();
        res.status(SUCESS).json({ data: assignmentData });
    } catch (error) {
        console.error('Error getting assignments:', error);
        res.status(SERVER_ERROR).json({ error: "Internal Server Error" });
    }
}

export const uploadAssignmentsFileController = (req: Request, res: Response) => {
    try {
        const fileData = req.file?.buffer.toString('utf-8') || "";
        const csvRecords = parseFile(fileData) as AssignmentDataFromCSV[];
        const mappedData = mapFileToAssignmentData(csvRecords);
        const insertedCount = assignmentsDb.insertAssignments(mappedData);

        res.status(SUCESS).json({ 
            message: `Successfully uploaded ${insertedCount} assignments`,
            data: mappedData
        });
    }
    catch (error) {
        console.error('Error uploading assignments:', error);
        res.status(SERVER_ERROR).json({ error: "Internal Server Error" });
    }
}

export const clearAssignmentsController = (req: Request, res: Response) => {
    try {
        assignmentsDb.clearAssignments();
        res.status(SUCESS).json({ message: "Successfully cleared all assignments" });
    } catch (error) {
        console.error('Error clearing assignments:', error);
        res.status(SERVER_ERROR).json({ error: "Internal Server Error" });
    }
}
