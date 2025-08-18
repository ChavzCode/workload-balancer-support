import { AssignmentData, AssignmentDataFromCSV, ItemsByAssignee } from "../models/assignment-data.model";
import { getFileData } from "../core/utils/files.util";
import { mapFileToAssignmentData } from "../core/mappers/assignment-data.mapper";
import { ZERO } from "../core/constants/numbers.constants";

export const getAssignmentData = (): ItemsByAssignee[] => {
    try {
        const records: AssignmentDataFromCSV[] = getFileData('data/assignments.csv');
        const mappedData: AssignmentData[] = mapFileToAssignmentData(records);

        const assignmentByMember: { [assignee: string]: AssignmentData[] } = {};
        mappedData.forEach(item => {
            if (!assignmentByMember[item.assignee]) {
                assignmentByMember[item.assignee] = [];
            }
            assignmentByMember[item.assignee].push(item);
        })

        const result: ItemsByAssignee[] = Object.entries(assignmentByMember).map((entry) => {
            const [assignee, workItems] = entry;
            return {
                assignee,
                workItemsEffort: workItems.reduce((acc, cur) => { return acc += cur.storyPoints }, ZERO),
                workItemsCount: workItems.length,
                workItems
            }
        })
        return result
    } catch (error) {
        console.error("Error reading or parsing CSV file:", error);
        throw new Error("Failed to read assignment data");
    }
}
