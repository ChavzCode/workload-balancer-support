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
  slm TEXT,
  client TEXT,
  assignee TEXT,
  resume TEXT,
  status TEXT,
  lastUpdate TEXT,
  resolutionDate TEXT,
  creationDate TEXT
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
  storyPoints INTEGER,
  workItemType TEXT
);
`;

export const runMigrations = () => {
  db.exec(createMembersTable);
  db.exec(createTicketsTable);
  db.exec(createAssignmentsTable);
};

export default runMigrations;
