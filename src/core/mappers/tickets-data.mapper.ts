import { AllocateTicketReq, Priority, Ticket, TicketFromCSV, TicketStatus} from "../models/tickets-data.model";

export const mapFileToTicketData = (rawData: TicketFromCSV[]): Ticket[] => {
    try {
        const data = rawData.map((item) => {
            return {
                id: item.NumeroCaso,
                priority: mappedPriority(item.Prioridad),
                isCritical: item.Incidencia_Grave === 'Si',
                creationDate: item.Fecha_Apertura,
                status: mappedStatus(item.Estado),
                summary: item.Resumen,
                description: item.Descripcion,
                assignedGroup: item.Grupo_Asignado,
                assignee: item.Ususario_Asignado,
                client: item.Cliente,
                ticketType: item.tipo_ticket
            }
        })
        return data;
    } catch (error) {
        return []
    }
}

export const mapReqToTicketData = (data: AllocateTicketReq): Ticket => {
    return {
        id: data.id || `INC${generateRandomId()}`,
        assignee: data.assignee,
        assignedGroup: data.assignedGroup || "",
        client: data.client || "",
        description: data.description || "",
        priority: mappedPriority(data.priority || "Baja"),
        status: mappedStatus(data.status || "Abierto"),
        summary: data.summary || "",
        ticketType: data.ticketType || "",
        creationDate: new Date().toISOString(),
        isCritical: data.isCritical || false
    }
}

const generateRandomId = (): string => {
    return Math.random().toString(36).substr(2, 9);
}

const mappedPriority = (rawPriority: string): Priority => {
    switch (rawPriority) {
        case "Baja":
            return Priority.LOW
        case "Media":
            return Priority.MEDIUM
        case "Alta":
            return Priority.HIGH
        default:
            throw new Error(`Unknown priority: ${rawPriority}`)
    }
}

const mappedStatus = (rawStatus: string): TicketStatus => {
    switch (rawStatus) {
        case "Asignado":
            return TicketStatus.ASSIGNED
        case "Abierto":
            return TicketStatus.OPEN
        case "En Progreso":
            return TicketStatus.IN_PROGRESS
        default:
            throw new Error(`Unknown status: ${rawStatus}`)
    }
}