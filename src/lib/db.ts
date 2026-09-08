import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { logger } from "@/lib/logger";

export interface NewInquiry {
  telemetryId: string;
  name: string;
  email: string;
  tier?: string | undefined;
  timeline?: string | undefined;
  brief: string;
  clientIp?: string | undefined;
}

export interface InquiryRecord {
  id: number;
  telemetry_id: string;
  name: string;
  email: string;
  tier: string | null;
  timeline: string | null;
  brief: string;
  client_ip: string | null;
  status: "unread" | "replied" | "archived";
  created_at: string;
}

let dbInstance: DatabaseSync | null = null;
let currentDbPath: string | null = null;

export function getDatabasePath(): string {
  return process.env.DATABASE_PATH || path.join(process.cwd(), "data", "app.db");
}

export function getDb(customPath?: string): DatabaseSync {
  const targetPath = customPath || getDatabasePath();

  if (dbInstance && currentDbPath === targetPath) {
    return dbInstance;
  }

  if (targetPath !== ":memory:") {
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const db = new DatabaseSync(targetPath);

  // Performance and safety pragmas
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec("PRAGMA synchronous = NORMAL;");

  // Initialize unified application schema
  db.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      telemetry_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      tier TEXT,
      timeline TEXT,
      brief TEXT NOT NULL,
      client_ip TEXT,
      status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'replied', 'archived')),
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_inquiries_telemetry_id ON inquiries(telemetry_id);
    CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
  `);

  dbInstance = db;
  currentDbPath = targetPath;
  return db;
}

export function insertInquiry(inquiry: NewInquiry, customPath?: string): InquiryRecord {
  const db = getDb(customPath);

  const stmt = db.prepare(`
    INSERT INTO inquiries (telemetry_id, name, email, tier, timeline, brief, client_ip)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    RETURNING *;
  `);

  const row = stmt.get(
    inquiry.telemetryId,
    inquiry.name,
    inquiry.email,
    inquiry.tier ?? null,
    inquiry.timeline ?? null,
    inquiry.brief,
    inquiry.clientIp ?? null,
  ) as unknown as InquiryRecord;

  logger.info("Inquiry persisted to database", {
    context: {
      telemetryId: inquiry.telemetryId,
      id: row.id,
    },
  });

  return row;
}

export function getInquiries(
  filter?: { status?: InquiryRecord["status"]; limit?: number; offset?: number },
  customPath?: string,
): InquiryRecord[] {
  const db = getDb(customPath);
  const limit = filter?.limit ?? 50;
  const offset = filter?.offset ?? 0;

  if (filter?.status) {
    const stmt = db.prepare(`
      SELECT * FROM inquiries
      WHERE status = ?
      ORDER BY id DESC
      LIMIT ? OFFSET ?;
    `);
    return stmt.all(filter.status, limit, offset) as unknown as InquiryRecord[];
  }

  const stmt = db.prepare(`
    SELECT * FROM inquiries
    ORDER BY id DESC
    LIMIT ? OFFSET ?;
  `);
  return stmt.all(limit, offset) as unknown as InquiryRecord[];
}

export function closeDb(): void {
  if (dbInstance) {
    try {
      dbInstance.close();
    } catch {
      // Ignore if already closed
    }
    dbInstance = null;
    currentDbPath = null;
  }
}
