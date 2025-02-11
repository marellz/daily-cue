<template>
  <div>
    <!-- top bar -->
    <div class="flex items-start space-x-4 mt-4">
      <form-status v-model="filters.status"></form-status>
      <form-tags v-model="filters.tags"></form-tags>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTasksStore, type TaskFilter } from "~/store/tasks";

interface Day {
  date: number;
  month: string;
  isToday: boolean;
  dateString: string;
  // activity: TaskActivity | null;
}
const store = useTasksStore();
const moment = useMoment();

const filters = ref<TaskFilter>({...store.filters});


const timeout = ref();


const fetch = async (
  { date, status, tags }: TaskFilter,
  { date: dateBefore }: TaskFilter
) => {
  let range = store.today;
  await store.get(range, status, tags);

  if (date !== dateBefore) {
    filters.value.status = "default";
  }
};

watch(
  filters,
  async (to, from) => {
    // todo: debounce only for filters.tags
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    timeout.value = setTimeout(async () => {
      await fetch(to, from);
    }, 1000);
  },
  {
    deep: true,
  }
);

onMounted(() => {
  filters.value.date = moment().format("YYYY-MM-DD");

});
</script>
