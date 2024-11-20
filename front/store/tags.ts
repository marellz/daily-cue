import { defineStore, acceptHMRUpdate } from "pinia";
import { useToastsStore } from "./toasts";
import type { Tag, TagForm } from "~/types/tag";

export const useTagsStore = defineStore(
  "tags",
  () => {
    const { $api } = useNuxtApp();
    const toasts = useToastsStore();

    const tags = ref<Array<Tag>>([]);

    const viewActive = ref(false);

    const get = async () => {
      const {
        data,
        error,
        message,
      }: { data?: Array<Tag>; error?: String; message?: string } =
        await $api.get("/tags");

      if (error) {
        // todo: toast

        return false;
      }

      if (data) {
        tags.value = data;
      }
    };

    const create = async (tag: TagForm) => {
      const {
        data,
        error,
        message,
      }: { data?: Tag; error?: string; message?: string } = await $api.post(
        "/tags",
        { tag }
      );

      if (error) {
        //todo: toast
      }

      if (data) {
        tags.value.push(data);
        return true;
      }

      return false;
    };

    const update = async (id: string, payload: TagForm) => {
      const {
        data,
        updated,
        error,
        message,
      }: { data?: Tag; error?: string; message?: string, updated: boolean } = await $api.put(
        `/tags/${id}`,
        payload
      );

      if (error || !updated) {
        //todo: toast

        return false
      }

      if (data && updated) {
        const item = tags.value.findIndex((i) => i._id === data._id);
        tags.value[item] = {...data, ...payload} 
      }

      return true;
    };

    const destroy = async (id: string) => {
      const {
        deleted,
        error,
        message,
      }: { deleted?: boolean; error?: string; message?: string } = await $api.delete(
        `/tags/${id}`
      );

      if (error || !deleted) {
        //todo: toast

        return false
      }

      if (deleted) {
        let index = tags.value.findIndex(i=>i._id === id)
        tags.value.splice(index, 1)
        return true
      }
    };

    onMounted(get);

    return {
      tags,
      viewActive,
      get,
      update,
      create,
      destroy,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTagsStore, import.meta.hot));
}
