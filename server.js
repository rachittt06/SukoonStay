/**
 * Run the API from the repo root: `node server.js`
 * (Real entry: server/index.js — cwd is set to server/ so .env loads.)
 */
const { spawn } = require("child_process");
const path = require("path");

const serverDir = path.join(__dirname, "server");
const child = spawn("node", ["index.js"], {
  cwd: serverDir,
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code ?? 0));
