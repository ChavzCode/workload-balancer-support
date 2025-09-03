import { FIB_TICKER_EFFORT, PERCENTAGE_INCREASE_ON_WARNING } from "../core/constants/effort.constants";
import { ONE_HUNDRED, TWO, ZERO } from "../core/constants/numbers.constants";
import { mapReqToFileFormat, mapToTicketData } from "../core/mappers/tickets-data.mapper";
import { getFileData, writeOnFile } from "../core/utils/files.util"
import { sortingFn } from "../core/utils/sort.util";
import { AllocateTicketReq, SLM, Ticket, TicketRaw, TicketsWorkload } from "../models/tickets-data.model";

export const getTicketsData = (): TicketsWorkload[] => {
    const records: TicketRaw[] = getFileData('data/tickets.csv');
    const mappedData: Ticket[] = mapToTicketData(records);

    const ticketsByMember: { [key: string]: Ticket[] } = {}
    mappedData.forEach((ticket) => {
        if (!ticketsByMember[ticket.assignee]) {
            ticketsByMember[ticket.assignee] = [];
        };
        ticketsByMember[ticket.assignee].push(ticket);
    })


    const ticketsWorkload: TicketsWorkload[] = Object.entries(ticketsByMember).map((entry) => {
        const [assignee, tickets] = entry;

        return {
            assignee,
            ticketsAssigned: tickets.length,
            estimatedEffort: calculateTicketEffort(tickets),
            complianceRisk: calculateComplianceRisk(tickets),
            assigneeTickets: tickets
        }
    })
    
    return sortingFn(ticketsWorkload, "estimatedEffort") ?? ticketsWorkload
}

export const getTicketsComplianceRisk = (): TicketsWorkload[] => {
    return getTicketsData().filter((tickets) => tickets.complianceRisk)
}

export const allocateTicketResponsability = (data: AllocateTicketReq ) => {
    const ticket: TicketRaw = mapReqToFileFormat(data);

    writeOnFile('data/tickets.csv', ticket);

    return true;
}

const calculateTicketEffort = (tickets: Ticket[]): number => {
    let totalEffort = ZERO;

    tickets.forEach((item) => {
        let ticketEffort = FIB_TICKER_EFFORT;
        if (item.slm === SLM.WARNING) {
            ticketEffort = ticketEffort + (ticketEffort * (PERCENTAGE_INCREASE_ON_WARNING / ONE_HUNDRED))
        }
        totalEffort += ticketEffort;
    })

    return totalEffort;
}

const calculateComplianceRisk = (tickets: Ticket[]): boolean => {
    const ticketsOnRisk = tickets.filter((i) => i.slm === SLM.WARNING);
    return ticketsOnRisk.length > (tickets.length / TWO);
}