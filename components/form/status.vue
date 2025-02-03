<template>
  <div ref="statuspicker">
    <button type="button" class="btn !border-current" :class="StatusEnum[model as TaskStatus]" @click="showMenu = !showMenu">
      <span>
        {{ selected }}
      </span>
      <span
        class="h-2 w-2 rounded-full shadow-current shadow-lg !bg-current"
        :class="StatusEnum[model as TaskStatus]"
      ></span>
    </button>
    <div
      class="card bg-white mt-2 absolute z-10 p-0 overflow-hidden space-y-2"
      v-show="showMenu"
    >
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
          class="flex-auto"
        >
          <div class="flex border border-current rounded-full items-center p-1 text-center hover:shadow hover:shadow-current/50" :class="StatusEnum[name]">
            <span class="h-2 w-2 rounded-full"></span>
            <span class="flex-auto pr-4 text-sm font-medium">{{ label }}</span>
            <check :size="16" v-show="model === name"></check>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { statusOptions as dummyStatusTag } from "@/data/tasks";
import { type StatusOptions, type TaskStatus, type TaskStatusOptions } from "@/types/task";
import { StatusEnum } from "@/data/tasks";
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

const tags = ref<Array<StatusOptions>>(dummyStatusTag);
const inputId = useId();
const model = defineModel<TaskStatusOptions>({default:"default"});
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

onMounted(() => {
  if(!model.value){
    model.value = 'default'
  }
})
</script>
