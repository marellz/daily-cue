import home from './routes/home.js'
import tasks from './routes/tasks.js'
import auth from './routes/auth.js'
import verifyToken from '#middleware/verify-token.js'
const routes = [
  {
    path: "/",
    actions: home
  },
  {
    path: '/tasks',
    middleware: verifyToken,
    actions: tasks
  },
  {
    path: '/auth',
    actions: auth
  }
]

export default routes