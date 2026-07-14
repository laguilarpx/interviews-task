import express from "express";
import cors from "cors";
import { tasksRouter } from "./tasks";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
