import { defineStore, acceptHMRUpdate } from "pinia";

import { tags as dummyTags } from "@/data/tasks";
import type { Task, TaskForm, TaskActivity, TaskStatusOptions } from "~/types/task";
import type { Tag } from "~/types/tag";
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

    const dateRange = ref<ActivityDateRange | null>();

    const currentDay = ref(moment().format("YYYY-MM-DD"));

    const weeklyActivity = ref<Array<TaskActivity>>();

    const tags = ref<Array<Tag>>(dummyTags);

    const all = async (date: string, status: TaskStatusOptions) => {
      currentDay.value = date;

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

    const get = async (id: string | number) => {
      try {
        const { data, error }: { data?: Task; error?: string } = await $api.get(
          `/tasks/${id}`
        );
        if (error) {
          toasts.add({
            variant: "error",
            title: error,
          });
        }

        if (data) {
          return data;
        }

        return null;
      } catch (error) {
        toasts.add({
          variant: "error",
          title: "Error getting this task",
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
        title: "Task has been created!",
      });

      return true;
    };

    const update = async (id: string | number, task: Task |  TaskForm) => {
      const {
        data,
        updated,
        message,
        error,
      }: { data?: Task; updated: boolean; error?: string; message?: string } =
        await $api.put(`/tasks/${id}`, task);

      if (!updated) {
        toasts.add({
          variant: "error",
          title: error ?? "Error updating task",
          description: message,
        });
        console.error({ error, message });
        return false;
      }

      // update task
      if (data) {
        const taskDay = moment(data.due_date);

        const isSameDay = moment(currentDay.value).isSame(taskDay, "day");
        let indexOf = tasks.value.findIndex((t: Task) => t._id === data._id);

        if (!isSameDay) {
          tasks.value.splice(indexOf, 1);

        // todo: move this splice action to form/modal unmount hook.
        } else {
          tasks.value[indexOf] = data;
        }
      }

      toasts.add({
        variant: "success",
        title: "Task has been updated",
      });

      // refresh week activity
      getWeeklyActivity();

      return true;
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
      all,
      get,
      create,
      update,
      destroy,

      currentDay,
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
