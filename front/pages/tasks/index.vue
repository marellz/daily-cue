<template>
  <layout-container>
    <div>
      <div class="grid grid-cols-2 gap-10">
        <task-overview />
        <div>
          <div class="flex items-center justify-between space-x-4">
            <page-title> My Tasks </page-title>
            <button
              type="button"
              class="btn btn-primary"
              @click="newTaskForm.launch"
            >
              <plus></plus>
              <span>Add a new task</span>
            </button>
          </div>
          <div class="flex items-start space-x-4 mt-4">
            <form-datepicker v-model="filters.date"></form-datepicker>
            <form-status v-model="filters.status"></form-status>
          </div>
          <perfect-scrollbar v-if="filtered.length" class="max-h-[50vh] mt-10">
            <transition-group
              name="tasks"
              tag="ul"
              class="space-y-3 flex flex-col"
            >
              <li v-for="task in filtered" :key="task._id">
                <task-item :task />
              </li>
            </transition-group>
          </perfect-scrollbar>
          <template v-else>
            <div class="p-10 flex gap-10 items-center card mt-10 bg-slate-100">
              <img class="h-48" src="@/assets/images/empty.svg" alt="" />
              <div class="mb-10 space-y-2">
                <h1 class="font-semibold text-3xl">No tasks.</h1>
                <p class="text-lg text-slate-500">
                  No created tasks for this day.
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </layout-container>
  <dataform-new-task ref="newTaskForm" />
</template>

<script lang="ts" setup>
// TODO: view by day, view by tag, view by status
import { useTasksStore } from "~/store/tasks";
import { Plus } from "lucide-vue-next";
import moment, { type Moment } from "moment";
import type { TaskStatus } from "~/types/task";

definePageMeta({
  middleware: "auth",
});

const store = useTasksStore();
const filters = ref<{
  status: TaskStatus;
  date: null | Moment;
}>({
  status: "default",
  date: null,
});

const filtered = computed(() => {
  let filtered = [...store.tasks];
  if (filters.value.status !== "default") {
    filtered = filtered.filter((t) => t.status === filters.value.status);
  }

  if (filters.value.date !== null) {
    filtered = filtered.filter(
      (t) =>
        filters.value.date &&
        moment(t.due_date).isSame(filters.value.date, "day")
    );
  }

  filtered.sort((a, b) => {
    if (a.completed || a.status === "completed") {
      return 1;
    } else {
      return -1;
    }
  });

  return filtered;
});

const newTaskForm = ref();

watch(
  () => filters.value.date,
  () => {
    filters.value.status = "default";
  }
);

onMounted(async () => {
  await store.all();
});
</script>
<style lang="scss" scoped>
.tasks {
  &-enter-to,
  &-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  &-leave-active,
  &-enter-active {
    transition: all 0.15s ease;
  }

  &-leave-active {
    position: absolute;
  }
}
</style>
