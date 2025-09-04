export interface TicketFromCSV {
  NumeroCaso: string;
  Prioridad: "Baja" | "Media" | "Alta";
  Incidencia_Grave: "Si" | "No";
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
  id: string;
  priority: Priority;
  isCritical: boolean;
  creationDate: string;
  status: TicketStatus;
  description: string;
  assignedGroup: string;
  assignee: string;
  client: string;
  ticketType: string;
}

export interface AllocateTicketReq extends Partial<Ticket> {
  assignee: string;
}

export enum Priority {
  LOW = "Baja",
  MEDIUM = "Media",
  HIGH = "Alta",
}

export enum TicketStatus {
  ASSIGNED = "Asignado",
  OPEN = "Abierto",
  IN_PROGRESS = "En Progreso",
}
