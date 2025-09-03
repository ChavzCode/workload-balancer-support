import { AssignmentData } from "../../../models/assignment-data.model";
import { AssignmentDbRecord } from "../interfaces/assignment-db.model";

export const mapDataToDbRecord = (data: AssignmentData): AssignmentDbRecord => {
    return {
        id: data.id,
        task_id: data.id,
        assignee: data.assignee,
        story_points: data.storyPoints,
        title: data.title,
        state: data.state,
        work_item_type: data.workItemType
    };
};
