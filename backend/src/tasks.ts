import { Router, Request, Response } from "express";
import { Task } from "./types";

// In-memory "database". Data is lost when the server restarts.
let tasks: Task[] = [
  { id: 1, title: "Learn TypeScript", completed: false },
  { id: 2, title: "Practice for the interview", completed: true },
  { id: 3, title: "Review the code", completed: false },
];

// Simple counter used to generate unique ids.
let nextId = tasks.length + 1;

export const tasksRouter = Router();

// GET /api/tasks -> returns all tasks
tasksRouter.get("/", (_req: Request, res: Response) => {
  res.json(tasks);
});

// POST /api/tasks -> creates a new task
tasksRouter.post("/", (req: Request, res: Response) => {
  const { title } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Invalid title" });
  }

  const newTask: Task = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id -> updates a task title
tasksRouter.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Invalid title" });
  }

  task.title = title.trim();
  task.completed = false;

  res.json(task);
});

// PATCH /api/tasks/:id -> marks a task as completed
tasksRouter.patch("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = true;
  res.json(task);
});
