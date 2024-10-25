export type TaskStatus = "default" | "in_progress" | "completed" | "pending";

export interface Task {
  _id?: string | number;
  title: string;
  description?: string;
  due_date: string | Date;
  status?: TaskStatus;
  completed?: boolean;
  tags?: Array<Tag>;
}

export interface Tag {
  id?: string | number;
  name: string;
}

export interface Status {
  id?: string | number;
  name: TaskStatus;
  label: string;
  color: string;
}
