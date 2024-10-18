import home from './routes/home.js'
import tasks from './routes/tasks.js'

const routes = [
  {
    path: "/",
    actions: home
  },
  {
    path: '/tasks',
    actions: tasks
  }
]

export default routes