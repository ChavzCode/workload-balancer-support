import {
  AssignmentData,
  ItemsByAssignee,
} from "../core/models/assignment-data.model";
import { ZERO } from "../core/constants/numbers.constants";

export const getAssignmentDataGroupedByAssignee = (
  assignments: AssignmentData[]
): ItemsByAssignee[] => {
  try {
    const assignmentByMember: { [assignee: string]: AssignmentData[] } = {};
    assignments.forEach((item) => {
      if (!assignmentByMember[item.assignee]) {
        assignmentByMember[item.assignee] = [];
      }
      assignmentByMember[item.assignee].push(item);
    });

    const result: ItemsByAssignee[] = Object.entries(assignmentByMember).map(
      (entry) => {
        const [assignee, workItems] = entry;
        return {
          assignee,
          workItemsEffort: workItems.reduce((acc, cur) => {
            return (acc += cur.storyPoints);
          }, ZERO),
          workItemsCount: workItems.length,
          workItems,
        };
      }
    );
    return result;
  } catch (error) {
    console.error("Error reading or parsing CSV file:", error);
    throw new Error("Failed to read assignment data");
  }
};
