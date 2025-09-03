export interface TeamMember {
  name: string;
  status: MEMBER_STATUS,
  ticketEffortAllocation: ALLOCATION_SCALE
}

export enum MEMBER_STATUS {
  NORMAL = "normal",
  VACATION = "vacation",
  LOW_RUN = "low_run",
  NO_TICKETS = "no_tickets"
}

export enum ALLOCATION_SCALE {
  Min = 1,
  Low = 3,
  Medium = 5,
  High = 7,
  Max = 10
}