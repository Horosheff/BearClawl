#!/usr/bin/env node
/** On Windows (or when bash is missing), skip A2UI bundle step so build can continue. */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const bundlePath = path.join(rootDir, "src", "canvas-host", "a2ui", "a2ui.bundle.js");

const isWin = process.platform === "win32";
const hasBash = spawnSync("bash", ["-c", "exit 0"], { encoding: "utf8", shell: false }).status === 0;

if (isWin || !hasBash) {
  if (existsSync(bundlePath)) {
    console.log("A2UI bundle exists; skipping bundle step (no bash on this platform).");
  } else {
    console.warn("A2UI bundle step skipped (no bash). Build will continue; set OPENCLAW_A2UI_SKIP_MISSING=1 if canvas-a2ui-copy fails.");
  }
  process.exit(0);
}

const r = spawnSync("bash", ["scripts/bundle-a2ui.sh"], { cwd: rootDir, stdio: "inherit", shell: false });
process.exit(r.status ?? 1);
