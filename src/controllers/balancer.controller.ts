import { Request, Response } from "express";
import { SERVER_ERROR, SUCESS } from "../core/constants/http-status.constants";
import { getAssignmentData } from "../services/assignment.service";
import { getWorkloadBalance } from "../services/workload.service";
import { cleanQueryUtil } from "../core/utils/query.util";
import { SORT_ORDER } from "../core/enums/sort.enums";

export const getWorkloadBalanceController = (req: Request, res: Response) => {
    try {
        const { sort, order} = req.query;
        const sortWorkload = cleanQueryUtil(sort) === "true" ? true : false
        const sortOrder = cleanQueryUtil(order) === SORT_ORDER.DESCENDING ? SORT_ORDER.DESCENDING : SORT_ORDER.ASCENDING 
        const workloadData = getWorkloadBalance(sortWorkload, sortOrder );
        res.status(SUCESS).json({ data: workloadData });
    } catch (error) {
        console.error("Error processing workload balance:", error);
        res.status(SERVER_ERROR).json({ error: "Internal Server Error" });
    }
}

export const getAssignmentsController = (req: Request, res: Response) => {
    try {
        const assignmentData = getAssignmentData();
        res.status(SUCESS).json({ data: assignmentData })
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Internal Server Error" })
    }
}
