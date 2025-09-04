import {
  FIB_TICKER_EFFORT,
  PERCENTAGE_INCREASE_ON_WARNING,
} from "../core/constants/effort.constants";
import { ONE_HUNDRED, TWO, ZERO } from "../core/constants/numbers.constants";
import { sortingFn } from "../core/utils/sort.util";
import { Ticket } from "../models/tickets-data.model";
import { TicketsWorkload } from "../models/workload-data.model";

export const groupTicketsByAssignee = (
  tickets: Ticket[]
): TicketsWorkload[] => {
  const ticketsByMember: { [key: string]: Ticket[] } = {};

  tickets.forEach((ticket) => {
    if (!ticketsByMember[ticket.assignee]) {
      ticketsByMember[ticket.assignee] = [];
    }
    ticketsByMember[ticket.assignee].push(ticket);
  });

  const ticketsWorkload: TicketsWorkload[] = Object.entries(
    ticketsByMember
  ).map((entry) => {
    const [assignee, tickets] = entry;

    return {
      assignee,
      ticketsAssigned: tickets.length,
      estimatedEffort: calculateTicketEffort(tickets),
      complianceRisk: calculateComplianceRisk(tickets),
      assigneeTickets: tickets,
    };
  });

  return sortingFn(ticketsWorkload, "estimatedEffort") ?? ticketsWorkload;
};

export const getTicketsComplianceRisk = (
  tickets: Ticket[]
): TicketsWorkload[] => {
  return groupTicketsByAssignee(tickets).filter(
    (tickets) => tickets.complianceRisk
  );
};

const calculateTicketEffort = (tickets: Ticket[]): number => {
  let totalEffort = ZERO;

  tickets.forEach((item) => {
    let ticketEffort = FIB_TICKER_EFFORT;
    if (item.isCritical) {
      ticketEffort =
        ticketEffort +
        ticketEffort * (PERCENTAGE_INCREASE_ON_WARNING / ONE_HUNDRED);
    }
    totalEffort += ticketEffort;
  });

  return totalEffort;
};

const calculateComplianceRisk = (tickets: Ticket[]): boolean => {
  const ticketsOnRisk = tickets.filter((i) => i.isCritical);
  return ticketsOnRisk.length > tickets.length / TWO;
};
