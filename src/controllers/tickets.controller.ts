import { getTicketsComplianceRisk, getTicketsData } from "../services/tickets.service";
import { SUCESS, SERVER_ERROR } from "../core/constants/http-status.constants";
import { Response, Request } from "express";

export const getTicketsController = (req: Request, res: Response) => {
    try {
        const ticketsData = getTicketsData();
        res.status(SUCESS).json({ data: ticketsData })
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Internal Server Error" })
    }
}

export const getTicketsComplianceRiskController = (req: Request,  res: Response) => {
    try {   
        const complianceRisk = getTicketsComplianceRisk();
        res.status(SUCESS).json({data: complianceRisk})
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: "Internal Server Error" })
    }
}