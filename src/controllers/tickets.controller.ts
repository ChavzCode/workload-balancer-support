import { SUCESS, SERVER_ERROR } from "../core/constants/http-status.constants";
import { Response, Request } from "express";
import { parseFile } from "../core/utils/files.util";
import { TicketFromCSV } from "../core/models/tickets-data.model";
import {
  mapFileToTicketData,
  mapReqToTicketData,
} from "../core/mappers/tickets-data.mapper";
import { ticketsDb } from "../infrastructure/db/services/tickets.db.service";
import {
  getTicketsComplianceRisk,
  groupTicketsByAssignee,
} from "../services/tickets.service";

export const getTicketsController = (req: Request, res: Response) => {
  try {
    const tickets = ticketsDb.getAllTickets();
    res.status(SUCESS).json({ data: tickets });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

export const getTicketsByAssigneeController = (req: Request, res: Response) => {
  try {
    const tickets = ticketsDb.getAllTickets();
    const ticketsByAssignee = groupTicketsByAssignee(tickets);
    res.status(SUCESS).json({ data: ticketsByAssignee });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

export const getTicketsComplianceRiskController = (
  req: Request,
  res: Response
) => {
  try {
    const tickets = ticketsDb.getAllTickets();
    const complianceRisk = getTicketsComplianceRisk(tickets);
    res.status(SUCESS).json({ data: complianceRisk });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

export const postTicketAllocationController = (req: Request, res: Response) => {
  try {
    const ticketInfo = req.body;

    if (!ticketInfo.assignee) {
      return res.status(400).json({ error: "Missing assignee" });
    }

    const mappedData = mapReqToTicketData(ticketInfo);
    ticketsDb.insertTicket(mappedData);

    res.status(SUCESS).json({ data: { "Ticket Created": mappedData } });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

export const postUploadTicketsFile = (req: Request, res: Response) => {
  try {
    const fileData = req.file?.buffer.toString("utf-8") || "";
    const csvRecords = parseFile(fileData, ",") as TicketFromCSV[];
    const mappedData = mapFileToTicketData(csvRecords);
    const insertedCount = ticketsDb.insertTickets(mappedData);

    res.status(SUCESS).json({
      message: `Successfully uploaded ${insertedCount} tickets`,
      data: mappedData,
    });
  } catch (error) {
    console.error("Error uploading tickets:", error);
    res.status(SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};
