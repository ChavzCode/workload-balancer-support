import { AllocateTicketReq, SLM, Ticket, TICKET_STATUS, TicketRaw } from "../../models/tickets-data.model";

export const mapToTicketData = (rawData: TicketRaw[]): Ticket[] => {
    try {
        const data = rawData.map((item) => {
            return {
                id: item["Mostrar ID"],
                slm: slmMapper(item["Estado de SLM"]),
                client: item["Nombre completo de cliente"],
                assignee: item.Assignee,
                resume: item.Resumen,
                status: statusMapper(item.Estado),
                lastUpdate: item["Fecha de última actualización"],
                resolutionDate: item["Fecha de resolución"],
                creationDate: item["Fecha de creación"]
            }
        })
        return data;
    } catch (error) {
        return []
    }
}

export const mapReqToFileFormat = (data: AllocateTicketReq): TicketRaw => {
    return {
        "Mostrar ID": data.id ?? '',
        "Fecha deseada": "",
        "Estado de SLM": "Dentro del Objetivo",
        "Nombre completo de cliente": "OD",
        Assignee: data.assignee,
        Resumen: data.resume ?? "Incidente",
        Estado: data.status ?? "Asignado",
        "Fecha de última actualización": new Date().toDateString(),
        "Fecha de resolución": "",
        "Fecha de creación": "",
    }
} 

const slmMapper = (rawSlm: string): SLM  => {
    return rawSlm.includes('Advertencia') ? SLM.WARNING : SLM.ONTIME
} 

const statusMapper = (rawStatus: string): TICKET_STATUS => {
    switch (rawStatus) {
        case "Asignado":
            return TICKET_STATUS.ASSIGNED
        case "En curso":
            return TICKET_STATUS.ONGOING
        default:
            return TICKET_STATUS.UNKNOWN 
            
    }
}