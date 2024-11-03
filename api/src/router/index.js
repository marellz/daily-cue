import home from './routes/home.js'
import tasks from './routes/tasks.js'
import auth from './routes/auth.js'
const routes = [
  {
    path: "/",
    actions: home
  },
  {
    path: '/tasks',
    actions: tasks
  },
  {
    path: '/auth',
    actions: auth
  }
]

export default routes