import express from "express";
import path from "path";
import router from "./src/route/route.js";
import errorHandler from "./src/middleware/errorHandler.js";
import { NotFoundError } from "./src/core/error.response.js";
import { config } from "./src/config/.env.config.js";
import { connectDB } from "./src/config/db.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/", router);

app.use((req, res, next) => {
  next(new NotFoundError(`Resource ${req.originalUrl} not found`));
});

app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(config.app.port, () => {
    console.log(`Server is running on port http://localhost:${config.app.port}`);
  });
};

startServer();
