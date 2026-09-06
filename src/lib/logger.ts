/* eslint-disable no-console */
type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  traceId?: string;
  context?: Record<string, unknown>;
  error?: {
    name?: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private serviceName: string;

  constructor(serviceName = "cosmic-portfolio") {
    this.serviceName = serviceName;
  }

  private log(
    level: LogLevel,
    message: string,
    meta?: { traceId?: string; context?: Record<string, unknown>; error?: unknown },
  ) {
    const timestamp = new Date().toISOString();
    const entry: LogEntry = {
      level,
      message: `[${this.serviceName.toUpperCase()}] ${message}`,
      timestamp,
      ...(meta?.traceId ? { traceId: meta.traceId } : {}),
      ...(meta?.context ? { context: meta.context } : {}),
    };

    if (meta?.error) {
      if (meta.error instanceof Error) {
        entry.error = {
          name: meta.error.name,
          message: meta.error.message,
          ...(meta.error.stack ? { stack: meta.error.stack } : {}),
        };
      } else {
        entry.error = {
          message: String(meta.error),
        };
      }
    }

    const output = JSON.stringify(entry);

    switch (level) {
      case "error":
        console.error(output);
        break;
      case "warn":
        console.warn(output);
        break;
      case "debug":
        console.debug(output);
        break;
      default:
        console.info(output);
        break;
    }
  }

  public debug(message: string, meta?: { traceId?: string; context?: Record<string, unknown> }) {
    this.log("debug", message, meta);
  }

  public info(message: string, meta?: { traceId?: string; context?: Record<string, unknown> }) {
    this.log("info", message, meta);
  }

  public warn(message: string, meta?: { traceId?: string; context?: Record<string, unknown> }) {
    this.log("warn", message, meta);
  }

  public error(
    message: string,
    meta?: { traceId?: string; context?: Record<string, unknown>; error?: unknown },
  ) {
    this.log("error", message, meta);
  }

  public createTraceId(): string {
    return `trc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }
}

export const logger = new Logger("cosmic-api");
