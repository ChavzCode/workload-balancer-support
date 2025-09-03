import { Request, Response } from "express";
import { SERVER_ERROR, SUCESS } from "../core/constants/http-status.constants";

import { getWorkloadBalance, whoIsNext } from "../services/workload.service";
import { cleanQueryUtil } from "../core/utils/query.util";
import { SORT_ORDER } from "../core/enums/sort.enums";
import { allocateTicketResponsability } from "../services/tickets.service";

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

export const getWhoIsNextController = (req: Request, res: Response) => {
    try {   
        const next = whoIsNext();
        res.status(SUCESS).json({data: next})
    } catch (error) {
        res.status(SERVER_ERROR).json({error: "Internal Server Error"})
    }
}

export const getAllocateTicketBalancerController = (req: Request, res: Response) => {
    try {
        const nextAssignee = whoIsNext();
        allocateTicketResponsability({
            assignee: nextAssignee.member
        })
        const response = `Ticket has been assigned to: ${nextAssignee.member}, previous capacity was: ${nextAssignee.capacity}`
        res.status(SUCESS).json({data: response})
    } catch (error) {
        res.status(SERVER_ERROR).json({error: "Internal Server Error"})
    }
}

