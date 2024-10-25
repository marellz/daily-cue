<template>
  <div class="py-20">
    <h1 class="text-[80px] leading-[90px] font-bold">
      <span class="text-gray-700 font-normal tracking-tight">
        Good morning,
      </span>
      Dave!
    </h1>

    <div class="mt-10 max-w-lg space-y-3">
      <stats-overdue v-if="overdue" :count="overdue" />
      <stats-current v-if="current" v-bind="{ current, urgent }" />
      <stats-progress v-bind="{ growth }" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTasksStore } from "~/store/tasks";
const store = useTasksStore();
const overdue = computed(() => store.overdue);
const current = computed(() => store.current);
const urgent = computed(() => store.urgent);
const growth = ref()
</script>
