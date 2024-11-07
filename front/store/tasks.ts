import { defineStore, acceptHMRUpdate } from "pinia";

import { tags as dummyTags } from "@/data/tasks";
import type { Task, Tag, TaskStatus, TaskActivity } from "~/types/task";
import { useToastsStore } from "./toasts";
import useMoment from "~/composables/useMoment";

interface ActivityDateRange {
  from: string;
  to: string;
}

export const useTasksStore = defineStore(
  "tasks",
  () => {
    const moment = useMoment();

    const toasts = useToastsStore();

    const { $api } = useNuxtApp();

    const tasks = ref<Array<Task>>([]);

    const overdue = ref(0);
    const urgent = ref(0);
    const current = ref(0);

    const dateRange = ref<ActivityDateRange | null>();

    const weeklyActivity = ref<Array<TaskActivity>>();

    const tags = ref<Array<Tag>>(dummyTags);

    const all = async (date: string, status: TaskStatus) => {
      try {
        const { data }: { data: Task[] } = await $api.get(`tasks`, {
          params: {
            date,
            status,
          },
        });
        tasks.value = data.map((task: Task) => {
          return { ...task, due_date: moment(task.due_date).toDate() };
        });
      } catch (error: any) {
        console.error(error);
        toasts.add({
          variant: "error",
          title: "Error getting tasks",
        });
      }
    };

    const create = async (task: Task) => {
      const { data: item }: { data: Task } = await $api.post("/tasks", task);
      if (item && item._id) {
        tasks.value.push(item);
      }
      toasts.add({
        variant: "success",
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
          variant: "success",
          title: "Task has been updated",
        });

        // refresh week activity
        getWeeklyActivity();
      }
    };

    const destroy = async (id: string | number) => {
      const { deleted }: { deleted: boolean } = await $api.post(`/tasks/${id}`);
      let index = tasks.value.findIndex((t) => t._id === id);

      if (deleted && index) {
        // remove task
        tasks.value.splice(index, 1);

        toasts.add({
          variant: "success",
          title: "Task has been deleted",
        });
      }
    };

    const getWeeklyActivity = async () => {
      if (!dateRange.value) {
        console.log("didn't update weekly");
        return;
      }

      let start_date = dateRange.value.from;

      const {
        days,
        error,
        message,
      }: { days?: Array<TaskActivity>; error?: string; message?: string } =
        await $api.get("/activity/weekly", {
          params: {
            start_date,
          },
        });

      if (error && message) {
        toasts.add({
          variant: "error",
          title: error,
          description: message,
        });

        return null;
      }

      return (weeklyActivity.value = days);
    };

    const setDateRange = (range: ActivityDateRange) => {
      if (range) {
        dateRange.value = range;
      }
    };

    watch(() => dateRange.value, getWeeklyActivity, { deep: true });

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

      dateRange,
      weeklyActivity,
      setDateRange,
      getWeeklyActivity,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
