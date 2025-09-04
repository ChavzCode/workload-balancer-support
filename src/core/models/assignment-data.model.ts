export interface AssignmentDataFromCSV {
    ID: string;
    Title: string;
    State: string;
    "Assigned To": string;
    "Story Points": string;
    "Work Item Type": string;
}

export interface AssignmentData {
    id: string;
    title: string;
    state: string;
    assignee: string;
    storyPoints: number;
    workItemType: string;
}

export interface ItemsByAssignee {
    assignee: string;
    workItemsEffort: number;
    workItemsCount: number;
    workItems: AssignmentData[]; 
}