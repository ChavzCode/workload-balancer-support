import { Ticket } from "./tickets-data.model";

export interface Workload {
    member: string;
    effort: number; 
}

export interface TicketsWorkload {
    assignee: string;
    ticketsAssigned: number;
    estimatedEffort: number;
    complianceRisk: boolean;
    assigneeTickets: Ticket[];
}
