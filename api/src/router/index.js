import home from "./routes/home.js";
import tasks from "./routes/tasks.js";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import tests from "./routes/tests.js";
import tags from "./routes/tags.js";
import activity from "./routes/activity.js";
import verifyToken from "#middleware/verify-token.js";
const routes = [
  {
    path: "/",
    actions: home,
  },
  {
    path: "/tasks",
    middleware: verifyToken,
    actions: tasks,
  },
  {
    path: "/activity",
    middleware: verifyToken,
    actions: activity,
  },
  {
    path: "/auth",
    actions: auth,
  },
  {
    path: "/user",
    actions: user,
  },
  {
    path: "/tags",
    middleware: verifyToken,
    actions: tags,
  },
  {
    path: "/test",
    actions: tests 
  },
];

export default routes;
