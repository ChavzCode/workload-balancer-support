import { ONE, ZERO } from "../core/constants/numbers.constants";
import { TEAM_MEMBERS } from "../core/constants/team-members.constants";
import { SORT_ORDER } from "../core/enums/sort.enums";
import { sortingFn } from "../core/utils/sort.util";
import { MEMBER_STATUS, TeamMember } from "../models/team-member.model";
import { Workload } from "../models/workload-data.model";
import { getAssignmentData } from "./assignment.service";
import { getTicketsData } from "./tickets.service";


export const getWorkloadBalance = (sort: boolean = true, sortOrder: SORT_ORDER = SORT_ORDER.ASCENDING): Workload[] => {
    const assignmentData = getAssignmentData();
    const ticketsData = getTicketsData()

    const workloadMap = new Map<string, number>

    assignmentData.forEach((item) => {
        const assignee = item.assignee.toUpperCase();
        workloadMap.set(assignee, item.workItemsEffort);
    })

    ticketsData.forEach((item) => {
        const assignee = item.assignee.toUpperCase();

        if (workloadMap.has(assignee)) {
            const crrEffort = workloadMap.get(assignee) ?? ZERO;
            const summedEffort = crrEffort + item.estimatedEffort;
            workloadMap.set(assignee, summedEffort)
        } else {
            workloadMap.set(assignee, item.estimatedEffort)
        };
    })

    const data = Array.from(workloadMap, ([key, value]) => ({
        member: key,
        capacity: value
    }));

    if (sort) {
        return sortingFn(data, "capacity", sortOrder === SORT_ORDER.ASCENDING);
    }

    return data;
}

export const whoIsNext = (): Workload  => {
    const workload = getWorkloadBalance(true, SORT_ORDER.ASCENDING);

    for(let i = ZERO; i < workload.length; i++){
        const lowerWorkload = workload[i];
        const memberInfo = getMemberInfo(lowerWorkload.member)
        const nextLowerWorload = workload[i + ONE];
        const nextLowerMemberInfo = getMemberInfo(nextLowerWorload.member)
        const lowerAllocation = (memberInfo?.ticketEffortAllocation ?? ZERO) < (nextLowerMemberInfo?.ticketEffortAllocation ?? ZERO)
    
        if(!normalAssignment(memberInfo) || lowerAllocation ){
            const isNextNormal = normalAssignment(nextLowerMemberInfo)

            if(isNextNormal){
                return nextLowerWorload
            } else {
                continue;
            }
        }

        return lowerWorkload
    }

    return workload[ZERO]
}


const getMemberInfo = (memberName: string): TeamMember | undefined => {
    return TEAM_MEMBERS.find((tm) => tm.name === memberName)
}

const normalAssignment = (memberInfo?: TeamMember): boolean => {
    if(memberInfo){
        return memberInfo?.status === MEMBER_STATUS.NORMAL 
    } else {
        return true
    }
}

