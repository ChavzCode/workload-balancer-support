import { ONE, ZERO } from "../core/constants/numbers.constants";
import { SORT_ORDER } from "../core/enums/sort.enums";
import { sortingFn } from "../core/utils/sort.util";
import { Workload } from "../models/workload-data.model";
import { getAssignmentData } from "./assignment.service";
import { getTicketsData } from "./tickets.service";


export const getWorkloadBalance = (sort: boolean = true, sortOrder: SORT_ORDER = SORT_ORDER.DESCENDING): Workload[] => {
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



