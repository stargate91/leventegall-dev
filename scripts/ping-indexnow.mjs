import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = process.env.INDEXNOW_HOST || "leventegall.dev";
const KEY_FILE_NAME = "stargate91-indexnow-leventegall-key.txt";
const KEY_PATH = path.resolve(__dirname, "..", "public", KEY_FILE_NAME);

if (!fs.existsSync(KEY_PATH)) {
  console.error(`[IndexNow] Key file not found at ${KEY_PATH}`);
  process.exit(1);
}

const key = fs.readFileSync(KEY_PATH, "utf-8").trim();
const keyLocation = `https://${HOST}/${KEY_FILE_NAME}`;

const URL_LIST = [
  `https://${HOST}`,
  `https://${HOST}/hu`,
  `https://${HOST}/projects/swaya`,
];

const payload = {
  host: HOST,
  key,
  keyLocation,
  urlList: URL_LIST,
};

const isDryRun = process.argv.includes("--dry-run");
const continueOnError =
  process.argv.includes("--continue-on-error") ||
  process.env.INDEXNOW_CONTINUE_ON_ERROR === "true";

async function pingIndexNow() {
  console.log(`[IndexNow] Submitting ${URL_LIST.length} URLs for host: ${HOST}`);
  console.log(`[IndexNow] Key Location: ${keyLocation}`);

  if (isDryRun) {
    console.log("[IndexNow] --dry-run active. Payload generated successfully:");
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200 || response.status === 202) {
      console.log(`[IndexNow] Success! Status: ${response.status} (${response.statusText || "Accepted"})`);
    } else {
      const responseText = await response.text().catch(() => "");
      console.error(
        `[IndexNow] Submission rejected. HTTP Status: ${response.status} ${response.statusText}. Response: ${responseText}`,
      );
      if (continueOnError) {
        console.warn("[IndexNow] Continuing execution due to --continue-on-error flag.");
        return;
      }
      process.exit(1);
    }
  } catch (error) {
    console.error("[IndexNow] Network error connecting to api.indexnow.org:", error);
    if (continueOnError) {
      console.warn("[IndexNow] Continuing execution due to --continue-on-error flag.");
      return;
    }
    process.exit(1);
  }
}

void pingIndexNow();
