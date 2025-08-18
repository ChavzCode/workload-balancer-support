import { AssignmentData, AssignmentDataFromCSV } from "../../models/assignment-data.model";

export const mapFileToAssignmentData = (data: AssignmentDataFromCSV[]): AssignmentData[] => {
    return data.map(item => ({
        id: item.ID,
        title: item.Title,
        state: item.State,
        assignee: item["Assigned To"],
        storyPoints: parseFloat(item["Story Points"]) || 1,
        workItemType: item["Work Item Type"]
    }));
}