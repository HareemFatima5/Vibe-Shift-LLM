// lib/db.ts
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure the .db directory exists
const dbDir = path.join(process.cwd(), '.db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize the database file in the .db folder
const dbPath = path.join(dbDir, 'vibeshift.db');
const db = new Database(dbPath);

// Create the history table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS transformations (
    id TEXT PRIMARY KEY,
    input TEXT NOT NULL,
    output TEXT NOT NULL,
    style TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    scores_accuracy INTEGER,
    scores_entertainment INTEGER,
    scores_faithfulness INTEGER,
    scores_overall INTEGER
  )
`);

export interface TransformationRecord {
  id: string;
  input: string;
  output: string;
  style: string;
  timestamp: number;
  scores: {
    styleAccuracy: number;
    entertainment: number;
    faithfulness: number;
    overall: number;
  };
}

// Save a transformation
export function saveTransformation(record: TransformationRecord) {
  try {
    const stmt = db.prepare(`
      INSERT INTO transformations (id, input, output, style, timestamp, scores_accuracy, scores_entertainment, scores_faithfulness, scores_overall)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      record.id,
      record.input,
      record.output,
      record.style,
      record.timestamp,
      record.scores.styleAccuracy,
      record.scores.entertainment,
      record.scores.faithfulness,
      record.scores.overall
    );
  } catch (error) {
    console.error("Failed to save transformation to DB:", error);
  }
}

// Get all transformations
export function getTransformations(): TransformationRecord[] {
  try {
    const stmt = db.prepare('SELECT * FROM transformations ORDER BY timestamp DESC');
    const rows = stmt.all() as any[];
    return rows.map(row => ({
      id: row.id,
      input: row.input,
      output: row.output,
      style: row.style,
      timestamp: row.timestamp,
      scores: {
        styleAccuracy: row.scores_accuracy,
        entertainment: row.scores_entertainment,
        faithfulness: row.scores_faithfulness,
        overall: row.scores_overall,
      }
    }));
  } catch (error) {
    console.error("Failed to fetch transformations from DB:", error);
    return [];
  }
}