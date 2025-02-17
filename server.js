import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pawrentRouter from "./routes/pawrentRouter.js";
import hewanRouter from "./routes/hewanRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
  })
);

// Routes
app.use("/api", pawrentRouter);
app.use("/api", hewanRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
