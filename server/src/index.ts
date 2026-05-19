import app from "./app";
import { logger } from "./lib/logger";

const port = Number(process.env.PORT) || 5175;

const server = app.listen(port, () => {
  logger.info({ port }, "Server listening");
});

server.on("error", (err: any) => {
  logger.error({ err }, "Error listening on port");
  process.exit(1);
});
