import { TeamMember } from '../../../core/models/team-member.model';
import db from '../database';
import { TeamMemberDbRecord } from '../interfaces/team-members-db.model';
import { mapDomainToDbRecord, mapTeamMemberDbRecordToDomain } from '../mappers/team-member-db.mapper';

export class TeamMembersDbService {
  private static instance: TeamMembersDbService;

  public static getInstance(): TeamMembersDbService {
    if (!TeamMembersDbService.instance) {
      TeamMembersDbService.instance = new TeamMembersDbService();
    }
    return TeamMembersDbService.instance;
  }

  public insertMember(member: TeamMemberDbRecord): void {
    const insert = db.prepare(`
      INSERT INTO members (name, status, ticketEffortAllocation)
      VALUES (@name, @status, @ticketEffortAllocation)
    `);
    insert.run({
      name: member.name,
      status: member.status,
      ticketEffortAllocation: member.ticketEffortAllocation
    });
  }

  public insertMembers(teamMembers: TeamMember[]): number {
    const members = teamMembers.map(mapDomainToDbRecord);
    const insert = db.prepare(`
      INSERT INTO members (name, status, ticketEffortAllocation)
      VALUES (@name, @status, @ticketEffortAllocation)
    `);
    const insertMany = db.transaction((members: TeamMemberDbRecord[]) => {
      let count = 0;
      for (const member of members) {
        insert.run({
          name: member.name,
          status: member.status,
          ticketEffortAllocation: member.ticketEffortAllocation
        });
        count++;
      }
      return count;
    });
    return insertMany(members);
  }

  public getAllMembers(): TeamMember[] {
    const records = db.prepare('SELECT * FROM members').all() as TeamMemberDbRecord[];
    const data = mapTeamMemberDbRecordToDomain(records);
    return data;
  }

  public getMemberById(id: number): TeamMemberDbRecord | undefined {
    return db.prepare('SELECT * FROM members WHERE id = ?').get(id) as TeamMemberDbRecord | undefined;
  }

  public clearMembers(): void {
    db.prepare('DELETE FROM members').run();
  }
}

export const teamMembersDb = TeamMembersDbService.getInstance();
