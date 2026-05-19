import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import pinoHttp from "pino-http";
import helmet from "helmet";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Security and performance middleware
app.set("trust proxy", 1);
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api", limiter);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error({ err }, "Unhandled application error");
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ error: message });
});

export default app;
