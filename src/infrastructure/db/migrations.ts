import db from "./database";

// Members table
// Based on TeamMember model
const createMembersTable = `
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  ticketEffortAllocation INTEGER NOT NULL
);
`;

// Tickets table
// Based on Ticket model
const createTicketsTable = `
CREATE TABLE IF NOT EXISTS tickets (
  id TEXT PRIMARY KEY,
  priority TEXT NOT NULL,
  is_critical BOOLEAN NOT NULL,
  creation_date TEXT NOT NULL,
  status TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  assigned_group TEXT NOT NULL,
  assignee TEXT NOT NULL,
  client TEXT NOT NULL,
  ticket_type TEXT NOT NULL
);
`;

// Assignments table
// Based on AssignmentData model
const createAssignmentsTable = `
CREATE TABLE IF NOT EXISTS assignments (
  id TEXT PRIMARY KEY,
  title TEXT,
  state TEXT,
  assignee TEXT,
  story_points INTEGER,
  work_item_type TEXT
);
`;

export const runMigrations = () => {
  db.exec(createMembersTable);
  db.exec(createTicketsTable);
  db.exec(createAssignmentsTable);
};

export default runMigrations;
