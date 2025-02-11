import { useAuthStore } from "./auth";
import { useToastsStore } from "./toasts";

export interface TagForm {
  id?: string;
  created_at: string | null;
  color: string;
  user_id: string;
  name: string;
}

export interface Tag {
  id: string;
  created_at: string | null;
  color: string;
  user_id: string;
  name: string;
}

export const useTagsStore = defineStore(
  "tags",
  () => {
    const toasts = useToastsStore();
    const supabase = useSupabaseClient();
    const tags = ref<Tag[]>([]);
    const loading = ref(false);
    const auth = useAuthStore()

    const get = async () => {
      loading.value = true;
      try {
        const { data, error } = await supabase.from("tags").select();
        if (error) {
          handleError(error.message);
          return;
        }

        if (data) {
          tags.value = [...data];
        }
      } catch (error) {
        handleError(error);
      } finally {
        loading.value = false;
      }
    };

    const getBy = async (key: string, value: string) => {
      loading.value = true;
      try {
        const { data, error } = await supabase
          .from("tags")
          .select()
          .eq(key, value);
        if (error) {
          handleError(error.message);
        }

        if (data) {
          return data;
        }

        return null;
      } catch (error: unknown) {
        handleError(error);
      } finally {
        loading.value = false;
      }
    };

    const create = async (form: TagForm) => {
      loading.value = true;
      if(!auth.user){
        handleError('Not authenticated')
        return 
      }
      try {
        const { data, error } = await supabase
          .from("tags")
          .insert({...form, user_id: auth.user.id})
          .select();
        if (error) {
          handleError(error.message);
        }

        if (data) {
          tags.value = [...tags.value, ...data];
          return data;
        }

        return null;
      } catch (error) {
        handleError(error);
      } finally {
        loading.value = false;
      }
    };

    const update = async (id: string, form: TagForm) => {
      loading.value = true;
      try {
        const { status, error } = await supabase
          .from("tags")
          .update(form)
          .eq("id", id);
        if (error) {
          handleError(error);
        }

        if (status === 204) {
          let _tagIndex = tags.value.findIndex((t) => t.id === id);
          if (_tagIndex !== -1) {
            tags.value[_tagIndex] = { ...tags.value[_tagIndex], ...form };
          }
          return true;
        }

        return false;
      } catch (error) {
        handleError(error);
      } finally {
        loading.value = false;
      }
    };

    const destroy = async (id: string) => {
      loading.value = true;
      try {
        const { status, error } = await supabase
          .from("tags")
          .delete()
          .eq("id", id);
        if (error) {
          handleError(error.message);
        }

        if (status === 204) {
          // mark as deleted
          let _tagIndex = tags.value.findIndex((t) => t.id === id);
          tags.value = [...tags.value.splice(_tagIndex, 1)];
          return true;
        }

        return false;
      } catch (error) {
        handleError(error);
      } finally {
        loading.value = false;
      }
    };

    const handleError = (message: string | unknown = "Unknown error") => {
      console.error({ error: "Tags store error", message });
      toasts.addError(
        "Tags error",
        typeof message === "string" ? message : "Unknown"
      );
    };

    return {
      loading,
      get,
      getBy,
      update,
      create,
      destroy,
      tags,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTagsStore, import.meta.hot));
}
