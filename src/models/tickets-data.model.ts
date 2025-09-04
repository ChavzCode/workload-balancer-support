export interface TicketFromCSV {
    NumeroCaso: string;
    Prioridad: 'Baja' | 'Media' | 'Alta';
    Incidencia_Grave: 'Si' | 'No';
    Fecha_Apertura: string;
    Estado: string;
    Resumen: string;
    Descripcion: string;
    Grupo_Asignado: string;
    Ususario_Asignado: string;
    Cliente: string;
    tipo_ticket: string;
}


export interface Ticket {
    id: string;                // NumeroCaso
    priority: Priority;        // Prioridad
    isCritical: boolean;      // Incidencia_Grave
    creationDate: string;     // Fecha_Apertura
    status: TicketStatus;     // Estado
    summary: string;          // Resumen
    description: string;      // Descripcion
    assignedGroup: string;    // Grupo_Asignado
    assignee: string;         // Ususario_Asignado
    client: string;          // Cliente
    ticketType: string;      // tipo_ticket
}

export interface AllocateTicketReq extends Partial<Ticket> {
    assignee: string
}

export enum Priority {
    LOW = "Baja",
    MEDIUM = "Media",
    HIGH = "Alta"
}

export enum TicketStatus {
    ASSIGNED = "Asignado",
    OPEN = "Abierto",
    IN_PROGRESS = "En Progreso"
}