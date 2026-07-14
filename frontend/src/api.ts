import type { Task } from "./types";

// Backend base URL. Change this if the server runs elsewhere.
const API_URL = "http://localhost:3001/api/tasks";

// Fetches all tasks
export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Could not fetch tasks");
  }
  return res.json();
}

// Creates a new task from its title
export async function createTask(title: string): Promise<Task> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    throw new Error("Could not create task");
  }
  return res.json();
}

// Updates the title of an existing task
export async function updateTask(id: number, title: string): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    throw new Error("Could not update task");
  }
  return res.json();
}

// Marks a task as completed
export async function completeTask(id: number): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
  });
  if (!res.ok) {
    throw new Error("Could not complete task");
  }
  return res.json();
}
