import db from '../database';
import { AssignmentData } from '../../../models/assignment-data.model';
import { AssignmentDbRecord } from '../interfaces/assignment-db.model';

export class AssignmentsDbService {
    private static instance: AssignmentsDbService;

    public static getInstance(): AssignmentsDbService {
        if (!AssignmentsDbService.instance) {
            AssignmentsDbService.instance = new AssignmentsDbService();
        }
        return AssignmentsDbService.instance;
    }

    public insertAssignments(assignments: AssignmentData[]): number {
        const insert = db.prepare(`
            INSERT INTO assignments (id, assignee, story_points, title, state, work_item_type)
            VALUES (@id, @assignee, @story_points, @title, @state, @work_item_type)
        `);

        const insertMany = db.transaction((assignments: AssignmentData[]) => {
            let count = 0;
            for (const assignment of assignments) {
                insert.run({
                    id: assignment.id,
                    assignee: assignment.assignee,
                    story_points: assignment.storyPoints,
                    title: assignment.title,
                    state: assignment.state,
                    work_item_type: assignment.workItemType
                });
                count++;
            }
            return count;
        });

        return insertMany(assignments);
    }

    public getAllAssignments(): AssignmentDbRecord[] {
        return db.prepare('SELECT * FROM assignments').all() as AssignmentDbRecord[];
    }

    public getAssignmentsByAssignee(assignee: string): AssignmentDbRecord[] {
        return db.prepare('SELECT * FROM assignments WHERE assignee = ?').all(assignee) as AssignmentDbRecord[];
    }

    public clearAssignments(): void {
        db.prepare('DELETE FROM assignments').run();
    }
}

export const assignmentsDb = AssignmentsDbService.getInstance();
