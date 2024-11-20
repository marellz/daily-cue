import type { Task, Status, StatusOptions, TaskForm } from "@/types/task";

export const tasks: Array<Task> = [];

export const status: Array<Status> = [
  {
    name: "pending",
    label: "Pending",
    color: "bg-amber-500",
  },
  {
    name: "in_progress",
    label: "In progress",
    color: "bg-blue-500",
  },
  {
    name: "completed",
    label: "Completed",
    color: "bg-green-500",
  },
];

export const statusOptions: Array<StatusOptions> = [
  {
    name: "default",
    label: "Default",
    color: "bg-slate-200",
  },

  ...status,
];

export enum StatusEnum {
  default = "bg-slate-200 text-gray-500",
  completed = "bg-green-100 text-green-500",
  in_progress = "bg-blue-100 text-blue-500",
  pending = "bg-amber-100 text-amber-500",
  overdue = "bg-red-100 text-red-500",
}

export const newTask: TaskForm = {
  title: "",
  description: "",
  due_date: new Date(),
  status: "pending",
  tags: []
};
