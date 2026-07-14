// Shape of a task. Shared across files to avoid repeating the type.
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}
