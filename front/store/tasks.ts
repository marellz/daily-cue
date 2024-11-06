import { defineStore, acceptHMRUpdate } from "pinia";

import { tags as dummyTags } from "@/data/tasks";
import type { Task, Tag, TaskStatus } from "~/types/task";
import { useToastsStore } from "./toasts";
import moment from "moment";

export const useTasksStore = defineStore(
  "tasks",
  () => {
    const toasts = useToastsStore();

    const { $api } = useNuxtApp();

    const tasks = ref<Array<Task>>([]);

    const overdue = ref(0);
    const urgent = ref(0);
    const current = ref(0);

    const tags = ref<Array<Tag>>(dummyTags);

    const all = async (date: string, status: TaskStatus) => {
      const { data }: { data: Task[] } = await $api.get(`tasks`, {
        params: {
          date,
          status,
        },
      });
      tasks.value = data.map((task: Task) => {
        return { ...task, due_date: moment(task.due_date).toDate() };
      });
    };

    const create = async (task: Task) => {
      const { data: item }: { data: Task } = await $api.post("/tasks", task);
      if (item && item._id) {
        tasks.value.push(item);
      }
      toasts.add({
        title: "Task has been created!", // todo: add more info to toast
      });

      return true;
    };

    const update = async (id: string | number, task: Task) => {
      const { data }: { data: Task; updated: boolean } = await $api.put(
        `/tasks/${id}`,
        task
      );

      if (data._id) {
        // update task
        let indexOf = tasks.value.findIndex((t: Task) => t._id === data._id);
        tasks.value[indexOf] = data;

        toasts.add({
          title: "Task has been updated",
        });
      }
    };

    const destroy = async (id: string | number) => {
      const { deleted }: { deleted: boolean } = await $api.post(`/tasks/${id}`);
      let index = tasks.value.findIndex((t) => t._id === id);

      if (deleted && index) {
        // remove task
        tasks.value.splice(index, 1);

        toasts.add({
          title: "Task has been deleted",
        });
      }
    };

    return {
      tasks,
      tags,
      current,
      urgent,
      overdue,
      all,
      create,
      update,
      destroy,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
