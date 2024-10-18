<template>
  <div class="card">
    <p class="text-gray-600 mb-2">Current tasks</p>
    <h1 class="text-xl font-medium">
      You have 3 <span class="text-gray-900">urgent</span> tasks for today.
    </h1>
    <hr class="my-2" />
    <div class="flex flex-wrap gap-4">
      <span v-for="{ id, name} in tags" :key="id">
        {{ name }}
    </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTasksStore } from '~/store/tasks';

const store = useTasksStore()

const tags = computed(() => store.tags)
</script>
