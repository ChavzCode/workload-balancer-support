import { MEMBER_STATUS, TeamMember } from "../../../core/models/team-member.model";
import { TeamMemberDbRecord } from "../interfaces/team-members-db.model";

export const mapTeamMemberDbRecordToDomain = (
  record: TeamMemberDbRecord[]
): TeamMember[] => {
  return record.map((item) => ({
    id: item.id,
    name: item.name,
    status: mapMemberStatus(item.status),
    ticketEffortAllocation: item.ticketEffortAllocation,
  }));
};

export const mapDomainToDbRecord = (member: TeamMember): TeamMemberDbRecord => {
  return {
    name: member.name,
    status: member.status,
    ticketEffortAllocation: member.ticketEffortAllocation,
  };
};

const mapMemberStatus = (status: string): MEMBER_STATUS => {
  switch (status) {
    case "normal":
      return MEMBER_STATUS.NORMAL;
    case "vacation":
      return MEMBER_STATUS.VACATION;
    case "sick":
      return MEMBER_STATUS.SICK;
    case "no_tickets":
      return MEMBER_STATUS.NO_TICKETS;
    default:
      return MEMBER_STATUS.NORMAL;
  }
};
