import { type Task, type Tag } from "@/types/task";

export const tasks: Array<Task> = [
  {
    id: 1,
    title: "Plan project timeline",
    description: "Create a detailed timeline for the project phases.",
    due_date: "2024-10-20",
    status: "in_progress",
  },
  {
    id: 2,
    title: "Set up Docker environment",
    description:
      "Configure Docker containers for front-end and back-end services.",
    due_date: "2024-10-18",
    status: "completed",
  },
  {
    id: 3,
    title: "Research MongoDB indexes",
    description:
      "Look into optimizing queries by adding proper indexes in MongoDB.",
    due_date: "2024-10-22",
    status: "pending",
  },
  {
    id: 4,
    title: "Write API documentation",
    description: "Document the API endpoints for future reference.",
    due_date: "2024-10-25",
    status: "pending",
  },
  {
    id: 5,
    title: "Design the homepage",
    description: "Create wireframes and a UI design for the landing page.",
    due_date: "2024-10-19",
    status: "in_progress",
  },
  {
    id: 6,
    title: "Integrate Express.js with MongoDB",
    description: "Set up a MongoDB connection in the Express.js API.",
    due_date: "2024-10-21",
    status: "in_progress",
  },
  {
    id: 7,
    title: "Fix frontend responsive issues",
    description: "Resolve layout issues when viewing on mobile devices.",
    due_date: "2024-10-24",
    status: "pending",
  },
  {
    id: 8,
    title: "Optimize site performance",
    description: "Analyze and optimize load times across all pages.",
    due_date: "2024-10-23",
    status: "pending",
  },
  {
    id: 9,
    title: "Test API routes",
    description: "Ensure all API routes are functioning as expected.",
    due_date: "2024-10-20",
    status: "in_progress",
  },
  {
    id: 10,
    title: "Set up user authentication",
    description: "Implement authentication using JWT for the Express.js API.",
    due_date: "2024-10-21",
    status: "pending",
  },
];

export const tags : Array<Tag> = [
  { id: 1, name: "shopping" },
  { id: 2, name: "planning" },
  { id: 3, name: "home" },
  { id: 4, name: "work" },
  { id: 5, name: "errands" },
  { id: 6, name: "family" },
  { id: 7, name: "friends" },
];