import express from "express";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import envConfig from "./config/envConfig";
import taskRoutes from "../src/routes/task.route";

const api: string = envConfig.API_URL || "/api/v1/task-manager-api";

const app = express();

app.use(express.json());
app.use(logger);
app.use(errorHandler);

app.use(`${api}/tasks`, taskRoutes);

export default app;
