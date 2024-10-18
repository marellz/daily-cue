import { defineStore, acceptHMRUpdate } from "pinia";

import { tasks as dummyTasks, tags as dummyTags } from "@/data/tasks";
import type { Task, Tag } from "~/types/task";

export const useTasksStore = defineStore(
  "tasks",
  () => {
    const tasks = ref<Array<Task>>(dummyTasks);
    const tags = ref<Array<Tag>>(dummyTags);

    const addTask = () => {};
    const updateTask = () => {};
    const deleteTask = () => {};

    return {
      tasks,
      tags,
      addTask,
      updateTask,
      deleteTask,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
