export interface TicketRaw {
    "Mostrar ID": string;
    "Fecha deseada": string;
    "Estado de SLM": string;
    "Nombre completo de cliente": string;
    Assignee: string;
    Resumen: string;
    Estado: string;
    "Fecha de última actualización": string;
    "Fecha de resolución": string;
    "Fecha de creación": string;
}

export interface Ticket {
    id: string;
    slm: SLM;
    client: string;
    assignee: string;
    resume: string;
    status: TICKET_STATUS;
    lastUpdate: string;
    resolutionDate: string;
    creationDate: string;
}

export interface TicketsWorkload {
    assignee: string;
    ticketsAssigned: number;
    estimatedEffort: number;
    complianceRisk: boolean;
    assigneeTickets: Ticket[];
}

export interface AllocateTicketReq extends Partial<Omit<Ticket, "creationDate" | "client" | "resolutionDate" | "lastUpdate">> {
    assignee: string
}

export enum SLM {
    ONTIME = "ontime",
    WARNING = "warning"
}

export enum TICKET_STATUS {
    ASSIGNED = "assigned",
    ONGOING = "ongoing",
    UNKNOWN = "unknown"
} 