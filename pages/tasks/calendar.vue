<template>
  <div class="space-y-10">
    <div v-if="currentDay" class="bg-tea-green/25 px-3 py-4 rounded-xl">
      <h1 class="text-xl font-medium">Your tasks for {{ currentDay }}</h1>
    </div>
    <div>
      <calendar />
    </div>

    <task-list :tasks />
  </div>
</template>

<script lang="ts" setup>
import { useTasksStore } from "~/store/tasks";
import type { TaskFilter } from "~/types/task";
import { useAuthStore } from "~/store/auth";
import useMoment from "~/composables/useMoment";

definePageMeta({
  middleware: "auth",
});

const moment = useMoment();
const store = useTasksStore();
const filters = ref<TaskFilter>({
  status: "default",
  date: null,
  tags: [],
});

const tasks = computed(() => store.tasks);

const currentDay = computed(() => {
  let _c = filters.value.date;
  if (!_c) {
    return null;
  }
  if (moment(_c).isSame(moment(), "day")) return "today";

  return moment(_c).format("Do MMM");
});



onMounted(async () => {
  /**already happending in filters.vue */
  // await store.get(store.today, "default");
});
</script>
