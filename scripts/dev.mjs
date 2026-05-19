import { spawn } from "node:child_process";

const isWindows = /^win/.test(process.platform);
const cmd = isWindows ? 'pnpm.cmd' : 'pnpm';

console.log("Starting client and server...");

const env = { ...process.env, NODE_ENV: 'development' };
const server = spawn(cmd, ["--filter", "@workspace/server", "dev"], { stdio: "inherit", shell: isWindows, env });
const client = spawn(cmd, ["--filter", "@workspace/client", "dev"], { stdio: "inherit", shell: isWindows, env });

const onCancel = () => {
  console.log("Shutting down processes...");
  server.kill("SIGINT");
  client.kill("SIGINT");
  process.exit();
};

process.on("SIGINT", onCancel);
process.on("SIGTERM", onCancel);
