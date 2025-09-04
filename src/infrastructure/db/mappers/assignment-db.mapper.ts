import { AssignmentData } from "../../../models/assignment-data.model";
import { AssignmentDbRecord } from "../interfaces/assignment-db.model";

export const mapDbRecordToDomain = (data: AssignmentDbRecord[]): AssignmentData[]  => {
    return data.map(item => ({
        id: item.id,
        task_id: item.id,
        assignee: item.assignee,
        storyPoints: item.story_points,
        title: item.title,
        state: item.state,
        workItemType: item.work_item_type
    }));
};
