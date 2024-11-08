import { type Task, type Tag, type Status, type StatusOptions } from "@/types/task";

export const tasks: Array<Task> = [];

export const tags: Array<Tag> = [
  { id: 1, name: "shopping" },
  { id: 2, name: "planning" },
  { id: 3, name: "home" },
  { id: 4, name: "work" },
  { id: 5, name: "errands" },
  { id: 6, name: "family" },
  { id: 7, name: "friends" },
];

export const status: Array<Status> = [
  {
    id: 1,
    name: "default",
    label: "Default",
    color: "bg-slate-200"
  },
  {
    id: 2,
    name: "pending",
    label: "Pending",
    color: "bg-amber-500"
  },
  {
    id: 3,
    name: "in_progress",
    label: "In progress",
    color: "bg-blue-500"
  },
  {
    id: 4,
    name: "completed",
    label: "Completed",
    color: "bg-green-500"
  },
];

export const statusOptions: Array<StatusOptions> = [
  {
    name: "default",
    label: "Default",
    color: "bg-slate-200"
  },

  ...status
];

export enum StatusEnum {
  default = "bg-slate-200 text-gray-500",
  completed = "bg-green-100 text-green-500",
  in_progress = "bg-blue-100 text-blue-500",
  pending = "bg-amber-100 text-amber-500",
  overdue = "bg-red-100 text-red-500",
}
