<template>
  <custom-modal v-model:show="store.viewActive" title="Your tags">
    <div class="space-y-4">
      <div class="flex items-center space-x-3 justify-end">
        <base-button
          class="btn-primary"
          @click="createable = true"
          :disabled="createable || editable !== null"
        >
          <PlusCircle />
          <span>Add tag</span>
        </base-button>
        <base-button @click="store.viewActive = false">
          <span>Close</span>
        </base-button>
      </div>

      <template v-if="createable">
        <fieldset class="card">
          <legend class="px-2">
            <h1 class="font-medium text-sm">New tag</h1>
          </legend>
          <tag-form @cancel="createable = false" @submit="create"></tag-form>
        </fieldset>
      </template>

      <template v-if="store.tags.length">
        <h1 class="font-medium text-sm mb-4">Current tags</h1>

        <ul class="space-y-4">
          <li v-for="tag in store.tags" :key="tag._id">
            <tag-form
              v-if="editable === tag._id"
              :tag
              @cancel="editable = null"
              @submit="update"
            ></tag-form>
            <div
              v-else
              class="flex items-center space-x-3 border p-2 rounded-xl"
            >
              <div class="flex-none">
                <span
                  class="h-5 w-5 block rounded"
                  :class="TagColors[tag.color]"
                ></span>
              </div>
              <div>
                <h3 class="font-medium">
                  {{ tag.name }}
                </h3>

                <p v-if="tag.description" class="text-sm">
                  {{ tag.description }}
                </p>
              </div>
              <div class="!ml-auto flex space-x-2">
                <button
                  type="button"
                  @click="editable = tag._id"
                  class="p-2 bg-slate-100 hover:text-celadon rounded-full"
                >
                  <EditIcon />
                </button>
                <button
                  type="button"
                  class="p-2 bg-red-100 rounded-full hover:border-red-500 hover:text-red-500"
                  @click="destroy(tag._id)"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </template>
      <template v-else>
        <h1 class="font-medium text-sm mb-4 text-center py-4 text-slate-600">
          No tags currently
        </h1>
      </template>
    </div>
  </custom-modal>
</template>
<script lang="ts" setup>
import { EditIcon, PlusCircle, Trash2 } from "lucide-vue-next";
import { useTagsStore } from "~/store/tags";
import { TagColors, type TagForm } from "~/types/tag";

const store = useTagsStore();

const createable = ref<boolean>(false);
const editable = ref<string | null>(null);

const update = async (form: TagForm) => {
  if (!editable.value) return;
  let updated = await store.update(editable.value, form);
  if (updated) {
    editable.value = null;
  }
};

const create = async (form: TagForm) => {
  let created = await store.create(form);
  if (created) {
    createable.value = false;
  }
};

const destroy = async (id: string) => {
  if (!confirm("Are you sure you want to delete?")) return;
  await store.destroy(id);
};

watch(
  () => store.viewActive,
  () => {
    createable.value = false;
    editable.value = null;
  }
);
</script>
