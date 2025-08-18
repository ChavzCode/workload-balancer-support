import { SLM, Ticket, TICKET_STATUS, TicketRaw } from "../../models/tickets-data.model";

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