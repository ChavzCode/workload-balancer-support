import { Priority, Ticket, TicketStatus } from "../../../models/tickets-data.model";
import { TicketDbRecord } from "../interfaces/ticket-db.model";

export const mapDbRecordToTicket = (record: TicketDbRecord): Ticket => {
    return {
        id: record.id,
        priority: mapPriority(record.priority),
        isCritical: record.is_critical === 1,
        creationDate: record.creation_date,
        status: mapTicketStatus(record.status),
        summary: record.summary,
        description: record.description,
        assignedGroup: record.assigned_group,
        assignee: record.assignee,
        client: record.client,
        ticketType: record.ticket_type
    };
};


const mapPriority = (priority: string): Priority => {
    switch (priority) {
        case "Baja":
            return Priority.LOW;
        case "Media":
            return Priority.MEDIUM;
        case "Alta":
            return Priority.HIGH;
        default:
            throw new Error(`Unknown priority: ${priority}`);
    }
};

const mapTicketStatus = (status: string): TicketStatus => {
    switch (status) {
        case "Asignado":
            return TicketStatus.ASSIGNED;
        case "Abierto":
            return TicketStatus.OPEN;
        case "En Progreso":
            return TicketStatus.IN_PROGRESS;
        default:
            throw new Error(`Unknown status: ${status}`);
    }
};
