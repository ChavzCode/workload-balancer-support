export interface AssignmentDbRecord {
    id?: string;
    task_id: string;
    assignee: string;
    story_points: number;
    title: string;
    state: string;
    work_item_type: string;
    created_at?: string;
}
