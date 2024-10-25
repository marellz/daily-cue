import moment from "moment";

let tasks = [
  {
    id: 1,
    title: "Plan project timeline",
    description: "Create a detailed timeline for the project phases.",
    status: "in_progress",
  },
  {
    id: 2,
    title: "Set up Docker environment",
    description:
      "Configure Docker containers for front-end and back-end services.",
    status: "completed",
  },
  {
    id: 3,
    title: "Research MongoDB indexes",
    description:
      "Look into optimizing queries by adding proper indexes in MongoDB.",
    status: "pending",
  },
  {
    id: 4,
    title: "Write API documentation",
    description: "Document the API endpoints for future reference.",
    status: "pending",
  },
  {
    id: 5,
    title: "Design the homepage",
    description: "Create wireframes and a UI design for the landing page.",
    status: "in_progress",
  },
  {
    id: 6,
    title: "Integrate Express.js with MongoDB",
    description: "Set up a MongoDB connection in the Express.js API.",
    status: "in_progress",
  },
  {
    id: 7,
    title: "Fix frontend responsive issues",
    description: "Resolve layout issues when viewing on mobile devices.",
    status: "pending",
  },
  {
    id: 8,
    title: "Optimize site performance",
    description: "Analyze and optimize load times across all pages.",
    status: "pending",
  },
  {
    id: 9,
    title: "Test API routes",
    description: "Ensure all API routes are functioning as expected.",
    status: "in_progress",
  },
  {
    id: 10,
    title: "Set up user authentication",
    description: "Implement authentication using JWT for the Express.js API.",
    status: "pending",
  },
].map((task) => {
  let random = (number) => Math.floor(Math.random() * number);
  let isNegative = (number) => {
    if (Math.floor(Math.random)) {
      return -number;
    } else {
      return number;
    }
  };

  let extraDays = random(3);

  let extraHours = random(12);

  return {
    ...task,
    due_date: moment()
      .startOf("day")
      .add(isNegative(extraDays), "days")
      .add(isNegative(extraHours), "hours"),
  };
});
export default tasks;
