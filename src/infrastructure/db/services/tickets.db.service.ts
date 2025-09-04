import db from "../database";
import { Ticket } from "../../../core/models/tickets-data.model";
import { mapDbRecordToTicket } from "../mappers/tickets-db.mapper";
import { TicketDbRecord } from "../interfaces/ticket-db.model";

export class TicketsDbService {
  private static instance: TicketsDbService;

  public static getInstance(): TicketsDbService {
    if (!TicketsDbService.instance) {
      TicketsDbService.instance = new TicketsDbService();
    }
    return TicketsDbService.instance;
  }

  public insertTicket(ticket: Ticket): void {
    const insert = db.prepare(`
            INSERT INTO tickets (
                id, priority, is_critical, creation_date, status, summary, description, assigned_group, assignee, client, ticket_type
            ) VALUES (
                @id, @priority, @isCritical, @creationDate, @status, @summary, @description, @assignedGroup, @assignee, @client, @ticketType
            )
        `);
    insert.run({
      id: ticket.id,
      priority: ticket.priority,
      isCritical: ticket.isCritical ? 1 : 0,
      creationDate: ticket.creationDate,
      status: ticket.status,
      summary: ticket.description,
      description: ticket.description,
      assignedGroup: ticket.assignedGroup,
      assignee: ticket.assignee,
      client: ticket.client,
      ticketType: ticket.ticketType,
    });
  }

  public insertTickets(tickets: Ticket[]): number {
    const insert = db.prepare(`
            INSERT INTO tickets (
                id, priority, is_critical, creation_date, status, summary, description, assigned_group, assignee, client, ticket_type
            ) VALUES (
                @id, @priority, @isCritical, @creationDate, @status, @summary, @description, @assignedGroup, @assignee, @client, @ticketType
            )
        `);

    const insertMany = db.transaction((tickets: Ticket[]) => {
      let count = 0;
      for (const ticket of tickets) {
        insert.run({
          id: ticket.id,
          priority: ticket.priority,
          isCritical: ticket.isCritical ? 1 : 0,
          creationDate: ticket.creationDate,
          status: ticket.status,
          summary: ticket.description,
          description: ticket.description,
          assignedGroup: ticket.assignedGroup,
          assignee: ticket.assignee,
          client: ticket.client,
          ticketType: ticket.ticketType,
        });
        count++;
      }
      return count;
    });

    return insertMany(tickets);
  }

  public getAllTickets(): Ticket[] {
    const data = db.prepare("SELECT * FROM tickets").all();
    return data.map((record) =>
      mapDbRecordToTicket(record as unknown as TicketDbRecord)
    );
  }

  public getTicketById(id: string): Ticket | undefined {
    const record = db.prepare("SELECT * FROM tickets WHERE id = ?").get(id);
    return record
      ? mapDbRecordToTicket(record as unknown as TicketDbRecord)
      : undefined;
  }

  public clearTickets(): void {
    db.prepare("DELETE FROM tickets").run();
  }
}

export const ticketsDb = TicketsDbService.getInstance();
