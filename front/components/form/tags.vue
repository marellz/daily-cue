<template>
  <div ref="target">
    <button class="btn" @click="active = !active" :title="model.length ? tagNames: ''">
      <span>Select tags <span class="font-medium" v-if="model.length">({{ model.length }})</span> </span>
      <PlusCircle :size="20" />
    </button>
    <div v-show="active" class="card !p-0 bg-white absolute z-[10] mt-2 overflow-hidden">
      <ul class="gap-3 flex flex-wrap p-4">
        <li v-for="item in tags" :key="item._id">
          <input type="checkbox" class="h-0 w-0 absolute" :name="id" v-model="model" :value="item._id" :id="item._id" />
          <label :for="item._id">
            <tag-item :item :checked="model.includes(item._id)" />
          </label>
        </li>
      </ul>
      <div class="px-4 py-2 bg-slate-100 text-left">
        <a href="#tags" @click.prevent="store.viewActive = true"
          class="block text-sm py-2 hover:underline hover:text-celadon">Update tags</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { PlusCircle } from "lucide-vue-next";
import { useTagsStore } from "~/store/tags";

const store = useTagsStore();
const id = useId();
const model = defineModel<Array<string>>({ default: [] });
const tags = computed(() => store.tags);
const active = ref(false);
const tagNames = computed(() => store.tags.filter(t=>model.value.includes(t._id)).map(t=>t.name).join('\n'))
onMounted(store.get);

const target = ref();
onClickOutside(target, () => {
  active.value = false;
});
</script>
