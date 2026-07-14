import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Task } from "./types";
import { getTasks, createTask, updateTask, completeTask } from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError("Could not load tasks"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const title = newTitle.trim();
    if (title === "") {
      setError("Title cannot be empty");
      return;
    }

    try {
      if (editingId !== null) {
        const updated = await updateTask(editingId, title);
        setTasks((prev) => prev.map((t) => (t.id === editingId ? updated : t)));
        setEditingId(null);
        setNewTitle("");
      } else {
        const task = await createTask(title);
        setTasks((prev) => [...prev, task]);
        setNewTitle("");
      }
    } catch {
      setError(
        editingId !== null
          ? "Could not update task"
          : "Could not add task"
      );
    }
  }

  function handleEdit(task: Task) {
    setEditingId(task.id);
    setNewTitle(task.title);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setNewTitle("");
  }

  async function handleCompleteTask(id: number) {
    try {
      const updatedTask = await completeTask(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
    } catch {
      setError("Could not complete task");
    }
  }

  function getVisibleTasks() {
    let visible = tasks;

    // TODO: Implement search filter
    if (search) {
    }

    if (sortBy === "asc" || sortBy === "desc") {
    }

    return visible;
  }

  const visibleTasks = getVisibleTasks();

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">No sorting</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={
            editingId !== null
              ? "Edit task..."
              : "Write a new task..."
          }
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit">
          {editingId !== null ? "Save" : "Add"}
        </button>
        {editingId !== null && (
          <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <span>{task.title}</span>
              <div className="task-actions">
                <button className="edit-btn" onClick={() => handleEdit(task)}>
                  Edit
                </button>
                {!task.completed && (
                  <button onClick={() => handleCompleteTask(task.id)}>
                    Complete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
