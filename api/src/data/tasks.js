import { v4 as uuidv4 } from "uuid";

let tasks = [
  "Buy sweet potatoes",
  "Learn Dart",
  "Finish todo app",
  "Send details on project",
  "Fix something on the car",
  "Do a massive clean up",
  "Walk the dog",
  "Check on my mother",
];

tasks = tasks.map((task) => ({
  id: uuidv4(),
  label: task,
}));


export default tasks;
