<template>
  <div ref="statuspicker">
    <button type="button" class="btn" @click="showMenu = !showMenu">
      <span>
        {{ selected }}
      </span>
      <span
        class="h-2 w-2 bg-slate-500 rounded-full shadow-current shadow-lg"
      ></span>
    </button>
    <div class="card bg-white mt-2 absolute z-10 p-0 overflow-hidden" v-show="showMenu">
      <div class="flex" v-for="{ name, label } in tags">
        <input
          type="radio"
          :name="inputId"
          :id="`${inputId}-${name}`"
          :value="name"
          v-model="model"
          @change="showMenu = false"
          class="invisible opacity-0 h-0 w-0"
        />
        <label
          :for="`${inputId}-${name}`"
          class="flex items-center py-2 px-2 flex-auto hover:bg-slate-200"
          >
          <span class="flex-auto pr-4">{{ label }}</span>
          <check :size="16" v-show="model === name"></check>
          </label
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { status as dummyStatusTag } from "@/data/tasks";
import { type Status } from "@/types/task";
import { onClickOutside } from "@vueuse/core";
import { Check } from "lucide-vue-next";
const props = withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: "Default",
  }
);

const tags = ref<Array<Status>>(dummyStatusTag);
const inputId = useId();
const model = defineModel();
const showMenu = ref(false);
const selected = computed(() => {
  if (!model.value) {
    return props.placeholder;
  } else {
    return tags.value.find((t) => t.name === model.value)?.label;
  }
});

const statuspicker = ref();

onClickOutside(statuspicker, () => {
  showMenu.value = false;
});

</script>
