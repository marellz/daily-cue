<template>
  <div class="border rounded-lg p-4">
    <div>
      <task-status :status="task.status"></task-status>
    </div>
    <div class="mt-4">
      <h1 class="text-xl font-medium">
        {{ task.title }}
      </h1>
    </div>
    <p class="text-gray-600">
      {{ task.description }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import type { Task } from "@/types/task";
defineProps<{
  task: Task;
}>();
</script>
