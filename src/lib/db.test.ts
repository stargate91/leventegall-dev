import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getDb, insertInquiry, getInquiries, closeDb, getDatabasePath } from "./db";

describe("SQLite Unified Database Persistence Layer", () => {
  const testDbPath = ":memory:";

  beforeEach(() => {
    closeDb();
  });

  afterEach(() => {
    closeDb();
  });

  it("returns default database path", () => {
    const defaultPath = getDatabasePath();
    expect(defaultPath).toContain("app.db");
  });

  it("initializes SQLite database in memory with inquiries table", () => {
    const db = getDb(testDbPath);
    expect(db).toBeDefined();

    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='inquiries';")
      .all();
    expect(tables.length).toBe(1);
  });

  it("inserts an inquiry and returns the full persisted record", () => {
    const inquiry = {
      telemetryId: "TX-TEST-001",
      name: "Gordon Freeman",
      email: "gordon@blackmesa.gov",
      tier: "full-orbit",
      timeline: "2-3-weeks",
      brief: "Need a new portal system interface.",
      clientIp: "127.0.0.1",
    };

    const record = insertInquiry(inquiry, testDbPath);

    expect(record.id).toBeGreaterThan(0);
    expect(record.telemetry_id).toBe("TX-TEST-001");
    expect(record.name).toBe("Gordon Freeman");
    expect(record.email).toBe("gordon@blackmesa.gov");
    expect(record.tier).toBe("full-orbit");
    expect(record.timeline).toBe("2-3-weeks");
    expect(record.brief).toBe("Need a new portal system interface.");
    expect(record.client_ip).toBe("127.0.0.1");
    expect(record.status).toBe("unread");
    expect(record.created_at).toBeDefined();
  });

  it("handles optional fields when inserting an inquiry", () => {
    const inquiry = {
      telemetryId: "TX-TEST-002",
      name: "Alyx Vance",
      email: "alyx@city17.org",
      brief: "Rebellion communications network.",
    };

    const record = insertInquiry(inquiry, testDbPath);

    expect(record.id).toBeGreaterThan(0);
    expect(record.tier).toBeNull();
    expect(record.timeline).toBeNull();
    expect(record.client_ip).toBeNull();
  });

  it("rejects duplicate telemetry_id due to UNIQUE constraint", () => {
    const inquiry = {
      telemetryId: "TX-DUP-001",
      name: "Barney Calhoun",
      email: "barney@blackmesa.gov",
      brief: "About that beer I owed you.",
    };

    insertInquiry(inquiry, testDbPath);

    expect(() => {
      insertInquiry(inquiry, testDbPath);
    }).toThrow();
  });

  it("retrieves inquiries with pagination and status filter", () => {
    for (let i = 1; i <= 5; i++) {
      insertInquiry(
        {
          telemetryId: `TX-FILTER-00${i}`,
          name: `User ${i}`,
          email: `user${i}@example.com`,
          brief: `Inquiry message ${i} with enough length.`,
        },
        testDbPath,
      );
    }

    const allRecords = getInquiries({ limit: 10 }, testDbPath);
    expect(allRecords.length).toBe(5);
    expect(allRecords[0]?.telemetry_id).toBe("TX-FILTER-005");

    const pagedRecords = getInquiries({ limit: 2, offset: 1 }, testDbPath);
    expect(pagedRecords.length).toBe(2);
    expect(pagedRecords[0]?.telemetry_id).toBe("TX-FILTER-004");

    const unreadRecords = getInquiries({ status: "unread" }, testDbPath);
    expect(unreadRecords.length).toBe(5);

    const repliedRecords = getInquiries({ status: "replied" }, testDbPath);
    expect(repliedRecords.length).toBe(0);
  });
});
