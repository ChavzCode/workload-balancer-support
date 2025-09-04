import { Request, Response } from 'express';
import { teamMembersDb } from '../infrastructure/db/services/team-members.db.service';


export const getTeamMembersController = (req: Request, res: Response) => {
    try {
        const teamMembers = teamMembersDb.getAllMembers();
        res.status(200).json(teamMembers);
    } catch (error) {
        console.error('Error getting team members:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const addTeamMembersController = (req: Request, res: Response) => {
    try {
        const teamMembers = req.body;
        if(!teamMembers || !Array.isArray(teamMembers)) {
            return res.status(400).json({ error: 'Invalid team members data' });
        }
        const insertedCount = teamMembersDb.insertMembers(teamMembers);
        res.status(201).json({ insertedCount });
    } catch (error) {
        console.error('Error adding team members:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};

export const clearTeamMembersController = (req: Request, res: Response) => {
    try {
        teamMembersDb.clearMembers();
        res.status(200).json({"message": "Team members cleared successfully"});
    } catch (error) {
        console.error('Error clearing team members:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
