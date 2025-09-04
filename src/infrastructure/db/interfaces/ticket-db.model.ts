export interface TicketDbRecord {
    id: string;
    priority: string;
    is_critical: number;
    creation_date: string;
    status: string;
    summary: string;
    description: string;
    assigned_group: string;
    assignee: string;
    client: string;
    ticket_type: string;
}
