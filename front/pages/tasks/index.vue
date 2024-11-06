<template>
  <layout-container>
    <div class="mx-auto max-w-2xl">
      <div>
        <div class="flex items-center justify-between space-x-4">
          <div>
            <h1 class="text-2xl font-bold text-sea-green">Good {{ dayTime }}, {{ user }}!</h1>
            <p>What do you feel like adding today?</p>
          </div>
          <div class="flex items-center space-x-3">
            <button
              type="button"
              class="btn border-black"
              @click="insightActive = true"
            >
              <brain-circuit :size="20" />
              <span>Insight</span>
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="newTaskForm.launch"
            >
              <plus :size="20"></plus>
              <span>Add a new task</span>
            </button>
          </div>
        </div>
        <div class="mt-4">
          <task-filters v-model="filters"/>
        </div>

        <template v-if="tasks.length">
          <transition-group
            name="tasks"
            tag="ul"
            class="space-y-3 flex flex-col mt-10"
          >
            <li v-for="task in tasks" :key="task._id">
              <task-item :task />
            </li>
          </transition-group>
        </template>
        <template v-else>
          <div class="p-10 flex gap-10 items-center card border-0 mt-10 bg-tea-green/50">
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
  <custom-modal title="Your insight" v-model:show="insightActive">
    <task-insight />
  </custom-modal>
</template>

<script lang="ts" setup>
// TODO: view by day, view by tag, view by status
import { useTasksStore } from "~/store/tasks";
import { Plus, BrainCircuit } from "lucide-vue-next";
import moment, { type Moment } from "moment";
import type { TaskStatus } from "~/types/task";
import { useAuthStore } from "~/store/auth";

definePageMeta({
  middleware: "auth",
});

const store = useTasksStore();
const auth = useAuthStore();
const filters = ref<{
  status: TaskStatus;
  date: null | string;
}>({
  status: "default",
  date: null,
});

const insightActive = ref(false);

const tasks = computed(() => store.tasks);
const newTaskForm = ref();

const user = computed(() =>
  auth.user ? auth.user.name.split(" ")[0] : "Unknown"
);
const dayTime = computed(() => {
  let h = moment().hours();
  let t;
  switch (true) {
    case h >= 6 && h < 12:
      t = "morning";
      break;

    case h >= 12 && h < 17:
      t = "afternoon";
      break;

    case h >= 17 && h < 21:
      t = "evening";
      break;

    case h >= 21:
      t = "night";
      break;

    default:
      t = "time";
      break;
  }

  return t;
});

onMounted(async () => {
  let dateString = moment().format("YYYY-MM-DD");
  await store.all(dateString, "default");
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
