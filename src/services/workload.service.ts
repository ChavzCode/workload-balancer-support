import { FIVE, ONE, TEN, TWO, ZERO } from "../core/constants/numbers.constants";
import { SORT_ORDER } from "../core/enums/sort.enums";
import { sortingFn } from "../core/utils/sort.util";
import { assignmentsDb } from "../infrastructure/db/services/assignments.db.service";
import { teamMembersDb } from "../infrastructure/db/services/team-members.db.service";
import { ticketsDb } from "../infrastructure/db/services/tickets.db.service";
import { MEMBER_STATUS, TeamMember } from "../core/models/team-member.model";
import { Workload } from "../core/models/workload-data.model";
import { groupTicketsByAssignee } from "./tickets.service";
import { SIGNIFICANT_EFFORT_DIFFERENCE } from "../core/constants/effort.constants";

interface MemberScore extends Workload {
  score: number;
  allocation: number;
}

const calculateMemberScore = (
  work: Workload,
  memberInfo: TeamMember | undefined
): MemberScore | null => {
  const allocation = memberInfo?.ticketEffortAllocation ?? ZERO;
  const currentCapacity = work.effort;

  if (!normalAssignment(memberInfo)) {
    return null;
  }

  const score =
    allocation > ZERO
      ? ONE - currentCapacity / (allocation * TEN)
      : -currentCapacity;

  return {
    member: work.member,
    effort: work.effort,
    score,
    allocation,
  };
};

const sortMembersByPriority = (a: MemberScore, b: MemberScore): number => {
  const effortDifference = Math.abs(a.effort - b.effort);
  const maxAllocation = Math.max(a.allocation, b.allocation);
  const minAllocation = Math.min(a.allocation, b.allocation);
  const allocationRatio = minAllocation / maxAllocation;
  const adjustedEffortThreshold = SIGNIFICANT_EFFORT_DIFFERENCE * allocationRatio;
  if (effortDifference >= adjustedEffortThreshold) {
    return a.effort - b.effort;
  }
  if (Math.abs(a.allocation - b.allocation) >= TWO) {
    return b.allocation - a.allocation;
  }
  return b.score - a.score;
};

export const getWorkloadBalance = (
  sort: boolean = true,
  sortOrder: SORT_ORDER = SORT_ORDER.ASCENDING
): Workload[] => {
  const assignmentData = assignmentsDb.getAllAssignments();
  const ticketsData = groupTicketsByAssignee(ticketsDb.getAllTickets());

  const workloadMap = new Map<string, number>();

  assignmentData.forEach((item) => {
    const assignee = item.assignee.toUpperCase();
    workloadMap.set(assignee, item.storyPoints);
  });

  ticketsData.forEach((item) => {
    const assignee = item.assignee.toUpperCase();

    if (workloadMap.has(assignee)) {
      const crrEffort = workloadMap.get(assignee) ?? ZERO;
      const summedEffort = crrEffort + item.estimatedEffort;
      workloadMap.set(assignee, summedEffort);
    } else {
      workloadMap.set(assignee, item.estimatedEffort);
    }
  });

  const data = Array.from(workloadMap, ([key, value]) => ({
    member: key,
    effort: value,
  }));

  if (sort) {
    return sortingFn(data, "effort", sortOrder === SORT_ORDER.ASCENDING);
  }

  return data;
};

export const whoIsNext = (): Workload => {
  const workload = getWorkloadBalance(true, SORT_ORDER.ASCENDING);
  const allMembers: TeamMember[] = teamMembersDb.getAllMembers();

  const memberScores = workload
    .map((work) => {
      const memberInfo = getMemberInfo(allMembers, work.member);
      return calculateMemberScore(work, memberInfo);
    })
    .filter((member): member is MemberScore => member !== null);

  const sortedMembers = memberScores.sort(sortMembersByPriority);

  if (sortedMembers.length === 0) {
    return workload[ZERO];
  }

  return {
    member: sortedMembers[ZERO].member,
    effort: sortedMembers[ZERO].effort,
  };
};

const getMemberInfo = (
  members: TeamMember[],
  memberName: string
): TeamMember | undefined => {
  return members.find((member) => member.name === memberName);
};

const normalAssignment = (memberInfo?: TeamMember): boolean => {
  if (memberInfo) {
    return memberInfo?.status === MEMBER_STATUS.NORMAL;
  } else {
    return true;
  }
};
