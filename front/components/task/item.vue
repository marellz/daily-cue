<template>
  <div
    class="border rounded-lg p-4 flex"
    :class="{ 'opacity-50 text-gray-700': isComplete }"
  >
    <div class="flex-auto">
      <template v-if="!isComplete">
        <div class="flex items-center space-x-3">
          <task-status :task></task-status>
        </div>
      </template>
      <div class="mt-4">
        <h1 class="text-xl font-medium">
          {{ task.title }}
        </h1>
      </div>
      <p class="text-gray-600">
        {{ task.description }}
      </p>
    </div>

    <button
      type="button"
      class="p-5 rounded-full self-center border flex-none disabled:text-slate-400 disabled:border-slate-200"
      @click="markAsComplete"
    >
      <check :size="32" />
    </button>
  </div>
</template>
<script lang="ts" setup>
// TODO: review design
import type { Task, TaskStatus } from "@/types/task";
import { Check } from "lucide-vue-next";
import { useTasksStore } from "~/store/tasks";
const store = useTasksStore()
const props = defineProps<{
  task: Task;
}>();

const isComplete = computed(() => props.task.status === "completed");

const markAsComplete = async () => {
  if(props.task._id){
    await store.update(props.task._id,{...props.task, completed: true, status:"completed"})
  }
}
</script>
