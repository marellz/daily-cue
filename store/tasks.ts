import type { TaskStatus } from "~/types/task";
import { useAuthStore } from "./auth";
import { useTagsStore } from "./tags";
import { useToastsStore } from "./toasts";

export interface TaskForm {
  description?: string | null;
  tags: string[];
  status: string;
  title: string;
  user_id: string;
  id?: string;
  due_date: string;
  completed?: boolean;
}

export interface TaskFilter {
  tags: string[];
  status: TaskStatus | "default";
  date: string;
}

export interface Task {
  id: string;
  completed: boolean;
  created_at: string;
  description?: string | null;
  status: string;
  tags: string[];
  title: string;
  due_date: string;
  user_id: string;
}

export const useTasksStore = defineStore(
  "tasks",
  () => {
    const auth = useAuthStore();
    const toasts = useToastsStore();
    const supabase = useSupabaseClient();
    const moment = useMoment();
    const loading = ref(false);

    const tasks = ref<Task[]>([]);

    const today = computed(() => {
      const today = moment();
      const startDate = today.clone().startOf("day").toISOString();
      const endDate = today.clone().endOf("day").toISOString();

      return {
        from: startDate,
        to: endDate,
      };
    });


    const filters = ref<TaskFilter>({
      status: "default",
      date: moment().toISOString(),
      tags: [],
    });


    const updateFilters = (newFilters: TaskFilter) => {
      filters.value = newFilters
    }

    const get = async (
      range: { from: string; to: string } | null = today.value,
      status: string = "default",
      tags: string[] | null = []
    ) => {
      if (!auth.user) {
        handleError("Not authenticated");
        return;
      }

      const userId = auth.user.id;
      loading.value = true;

      try {
        const query = supabase.from("tasks").select("*").eq("user_id", userId);

        // filters

        if (range) {
          const startOf = range.from;
          const endOf = range.to;


          console.log(range)

          // start of from
          query.gte("due_date", startOf);

          // end of to
          query.lte("due_date", endOf);
        }

        if (status !== "default") {
          query.eq("status", status);
        }

        const { data, error } = await query;

        if (error) {
          handleError(error.message);
        }
        if (data) {
          tasks.value = data;
        }
      } catch (error) {
        handleError(error);
      } finally {
        loading.value = false;
      }
    };

    const getBy = async (key: string, value: string) => {
      if (!auth.user) {
        handleError("Not authenticated");
        return;
      }

      const userId = auth.user.id;

      loading.value = true;

      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq(key, value)
          .eq("user_id", userId);

        if (error) {
          handleError(error.message);
        }
        if (data?.length) {
          return data[0];
        }

        return null;
      } catch (error) {
        handleError(error);
      } finally {
        loading.value = false;
      }
    };

    const create = async (form: Omit<TaskForm, "user_id">) => {
      if (!auth.user) {
        handleError("Not authenticated");
        return;
      }
      const payload = { ...form, user_id: auth.user.id };

      loading.value = true;

      try {
        const { data, error } = await supabase
          .from("tasks")
          .insert(payload)
          .select("*");

        if (error) {
          handleError(error.message);
          return false;
        }
        if (data) {
          tasks.value = [...tasks.value, ...data];
          toasts.addSuccess("Created", "Task was successfully created!");
        }

        return true;
      } catch (error) {
        handleError(error);
      } finally {
        loading.value = false;
      }
    };

    const update = async (id: string, form: TaskForm) => {
      if (!auth.user) {
        handleError("Not authenticated");
        return;
      }

      loading.value = true;

      try {
        const { status, error } = await supabase
          .from("tasks")
          .update(form)
          .eq("id", id);

        if (error) {
          handleError(error.message);
          return false;
        }
        if (status === 204) {
          tasks.value = tasks.value.map((t) => {
            return t.id === id ? { ...t, ...form } : t;
          });

          toasts.addSuccess("Updated", "Task was successfully updated!");

          return true;
        }

        return true;
      } catch (error) {
        handleError(error);
      } finally {
        loading.value = false;
      }
    };

    const destroy = async (id: string) => {
      if (!auth.user) {
        handleError("Not authenticated");
        return;
      }

      loading.value = true;

      try {
        const { status, error } = await supabase
          .from("tasks")
          .delete()
          .eq("id", id);

        if (error) {
          handleError(error.message);
          return false;
        }
        if (status === 204) {
          let _updatedIndex = tasks.value.findIndex((t) => t.id === id);
          tasks.value = [...tasks.value.splice(_updatedIndex, 1)];

          toasts.addSuccess("Deleted", "Task was successfully deleted!");

          return true;
        }

        return true;
      } catch (error) {
        handleError(error);
      } finally {
        loading.value = false;
      }
    };

    const handleError = (message: string | unknown = "Unknown error") => {
      console.error({ error: "Tasks store error", message });
      toasts.addError(
        "Tasks error",
        typeof message === "string" ? message : "Unknown"
      );
    };

    return {
      today,
      tasks,
      get,
      getBy,
      create,
      update,
      destroy,

      // 
      filters,
      updateFilters
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
