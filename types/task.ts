import { type Tag } from "~/types/tag";

export type TaskStatus =  "in_progress" | "completed" | "pending";

export type TaskStatusOptions = TaskStatus | "default";

export interface Task {
  _id?: string | number;
  title: string;
  description?: string;
  due_date: string | Date;
  status?: TaskStatus;
  completed?: boolean;
  tags?: Array<Tag>;
}


export interface StatusAttributes{
 label: string;
  color: string;
}

export interface Status extends StatusAttributes {
  name: TaskStatus;
 
}

export interface StatusOptions extends StatusAttributes{
  name: TaskStatusOptions,
}

export interface TaskActivity {
  day: string;
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
}

export interface TaskFilter {
  status: TaskStatusOptions;
  date: string | null;
  tags: Array<string>
}

export type TaskDate = Date | Object;

export interface TaskForm {
  title: string;
  description: string;
  due_date: TaskDate;
  status?: TaskStatus
  tags: Array<string>
}