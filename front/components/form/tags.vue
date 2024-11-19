<template>
  <div ref="target">
    <button class="btn" @click="active = !active">
      <span>Tags</span>
      <PlusCircle :size="20" />
    </button>
    <div v-show="active" class="card bg-white absolute z-[10] mt-2">
      <ul class="space-y-2">
        <li v-for="item in tags" :key="item._id">
          <input
            type="checkbox"
            class="h-0 w-0 absolute"
            :name="id"
            v-model="model"
            :value="item._id"
            :id="item._id"
          />
          <label :for="item._id">
            <tag-item :item />
          </label>
        </li>
        <li>
          <a
            href="#tags"
            @click.prevent="store.viewActive = true"
            class="block text-sm py-2 text-center hover:underline hover:text-celadon"
            >Update tags</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { PlusCircle } from "lucide-vue-next";
import { useTagsStore } from "~/store/tags";

const store = useTagsStore();
const id = useId();
const model = ref([]);
const tags = computed(() => store.tags);
const active = ref(false);
onMounted(store.get);

const target = ref();
onClickOutside(target, () => {
  active.value = false;
});
</script>
