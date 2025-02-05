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
}

export interface Task {
  id?: string;
  completed?: boolean | null;
  created_at?: string;
  description?: string | null;
  status: string;
  tags?: string[] | null;
  title: string;
  user_id: string;
}

export const useTasksStore = defineStore(
  "tasks",
  () => {
    const auth = useAuthStore();
    const tags = useTagsStore();
    const toasts = useToastsStore();
    const supabase = useSupabaseClient();
    const loading = ref(false);

    const weeklyActivity = ref([]);
    const tasks = ref<Task[]>([]);

    const get = async (
      range: { from: string; to: string } | null = null,
      status: string = 'default'
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

        if(range){
          const startOfFrom = range.from
          const endOfTo = range.to
          // start of from
          query.rangeGte('due_date', startOfFrom)

          // end of to
          query.rangeLte('due_date', endOfTo)
        }

        if(status !== 'default'){
          query.eq('status', status)
        }

        const { data, error } = await query

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
        if (data) {
          tasks.value = data;
        }
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
        }

        return true;
      } catch (error) {
        handleError(error);
      } finally {
        loading.value = false;
      }
    };

    const update = async () => {};

    const setDateRange = async () => {};

    const handleError = (message: string | unknown = "Unknown error") => {
      console.error({ error: "Tags store error", message });
      toasts.addError(
        "Tags error",
        typeof message === "string" ? message : "Unknown"
      );
    };

    return {
      tasks,
      get,
      getBy,
      create,
      update,
      setDateRange,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
