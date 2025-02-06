<template>
  <div class="bg-tea-green/25 px-3 py-4 rounded-xl">
    <h1 class="text-xl font-medium">Your tasks for today</h1>
  </div>
  <task-list :tasks></task-list>
</template>
<script lang="ts" setup>
import { useTasksStore } from "~/store/tasks";
const store = useTasksStore();
const tasks = computed(() => store.tasks);
</script>
