<template>
  <layout-container>
    <div class="mx-auto max-w-xl">
      <div>
        <div class="flex items-center justify-between space-x-4">
          <page-title> My Tasks </page-title>
          <div class="flex items-center space-x-3">
            <button type="button" class="btn border-black">
              <brain-circuit :size="20"/>
              <span>Insight</span>
            </button>
            <button type="button" class="btn btn-primary" @click="newTaskForm.launch">
              <plus :size="20"></plus>
              <span>Add a new task</span>
            </button>
          </div>
        </div>
        <div class="flex items-start space-x-4 mt-4">
          <form-status v-model="filters.status"></form-status>
        </div>
        <div class="mt-4">
          <date-week v-model="filters.date"></date-week>
        </div>
        <perfect-scrollbar v-if="tasks.length" class="max-h-[50vh] mt-10">
          <transition-group name="tasks" tag="ul" class="space-y-3 flex flex-col">
            <li v-for="task in tasks" :key="task._id">
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
  </layout-container>
  <dataform-new-task ref="newTaskForm" />
</template>

<script lang="ts" setup>
// TODO: view by day, view by tag, view by status
import { useTasksStore } from "~/store/tasks";
import { Plus, BrainCircuit } from "lucide-vue-next";
import moment, { type Moment } from "moment";
import type { TaskStatus } from "~/types/task";

definePageMeta({
  middleware: "auth",
});

const store = useTasksStore();
const filters = ref<{
  status: TaskStatus;
  date: null | string;
}>({
  status: "default",
  date: null,
});

const tasks = computed(() => store.tasks)

const newTaskForm = ref();

watch(
  () => filters.value.date,
  () => {
    filters.value.status = "default";
  }
);

watch(
  () => filters.value,
  async ({ date, status }) => {

    let dateString = date ? date : moment().format('YYYY-MM-DD')
    await store.all(dateString, status)
  }, {
  deep: true
}
)

onMounted(async () => {
  let dateString = moment().format('YYYY-MM-DD')
  await store.all(dateString, 'default');
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
  &-leave-to  {
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
