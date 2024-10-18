export type TaskStatus = "in_progress" | "completed" | "pending";

export interface Task {
  id?: string | number;
  title: string;
  description?: string;
  due_date: string;
  is_urgent?: boolean;
  is_important?: boolean;
  status: TaskStatus;
  tags?: Array<Tag>
}

export interface Tag {
  id?: string | number;
  name: string;
}