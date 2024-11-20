<template>
  <layout-container>
    <div class="mx-auto max-w-2xl">
      <!-- header -->
      <div class="sticky rounded-xl p-4 -mx-4 top-10 pb-10 backdrop-blur-lg z-[2]">
        <div class="flex items-center justify-between space-x-4">
          <div class="flex-auto animate-home">
            <client-only>
              <h1 class="text-2xl font-bold text-sea-green">
                Good {{ dayTime }}, {{ user }}!
              </h1>
              <p>What do you feel like adding today?</p>
            </client-only>
          </div>
          <div class="flex items-center space-x-3">
            <button type="button" class="btn border-black" @click="insightActive = true">
              <brain-circuit :size="20" />
              <span>Insight</span>
            </button>
            <button type="button" class="btn btn-primary" @click="newTaskForm.launch">
              <plus :size="20"></plus>
              <span>Add a new task</span>
            </button>
          </div>
        </div>
        <div class="mt-4">
          <task-filters v-model="filters" />
        </div>
      </div>

      <div v-if="currentDay" class="bg-tea-green/25 px-3 py-4 rounded-xl">
        <h1 class="text-xl font-medium">Your tasks for {{currentDay}}</h1>
        <!-- todo: wrap in transition -->
        <p class="text-slate-400" v-if="todaysActivity && todaysActivity.total">
          <span v-if="todaysActivity.remaining">{{ todaysActivity.remaining }} more to go!</span>
          <span v-else>All caught up, keep it up!</span>
        </p>
        <p class="text-slate-400">You have no tasks for this day.</p>
      </div>

      <transition-group name="tasks" tag="ul" class="space-y-3 flex flex-col mt-4 relative">
        <li v-for="task in tasks" :key="task._id">
          <task-item class="max-w-full" :task @show-task="showTaskModal" />
        </li>
        <div v-if="!tasks.length" class="p-10 flex gap-10 items-center card border-0 mt-10 bg-tea-green/50">
          <img class="h-48" src="@/assets/images/empty.svg" alt="" />
          <div class="mb-10 space-y-2">
            <h1 class="font-semibold text-3xl">No tasks.</h1>
            <p class="text-lg text-slate-500">No created tasks for this day.</p>
          </div>
        </div>
      </transition-group>
    </div>
  </layout-container>
  <task-create ref="newTaskForm" />
  <task-insight v-model:active="insightActive" />
  <task-view v-model:active="taskModalActive" v-if="currentTask" :id="currentTask" />
</template>

<script lang="ts" setup>
// TODO: view by day✅, view by tag👨🏽‍💻, view by status✅
import { useTasksStore } from "~/store/tasks";
import { Plus, BrainCircuit } from "lucide-vue-next";
import type { Task, TaskFilter } from "~/types/task";
import { useAuthStore } from "~/store/auth";
import useMoment from "~/composables/useMoment";

definePageMeta({
  middleware: "auth",
});

const moment = useMoment();
const store = useTasksStore();
const auth = useAuthStore();
const filters = ref<TaskFilter>({
  status: "default",
  date: null,
  tags: []
});

const insightActive = ref(false);

const tasks = computed(() => store.tasks);
const newTaskForm = ref();
const currentDay = computed(() => {
  let _c = filters.value.date
  if(!_c){
    return null
  }
  if(moment(_c).isSame(moment(),'day')) return 'today'

  return moment(_c).format('Do MMM')
})
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
const taskModalActive = ref(false);
const currentTask = ref<string | number | null>();
const showTaskModal = async (id: string) => {
  currentTask.value = id;
  taskModalActive.value = true;
};

const todaysActivity = computed(() => {
  let _a = store.weeklyActivity?.find(d => d.day===filters.value.date)
  if(!_a){
    return null
  }
  return {
    total: _a.total,
    remaining: _a.pending + _a.in_progress
  }
})

onMounted(async () => {
  await store.all(store.currentDay, "default");
});
</script>
<style lang="scss" scoped>
.tasks {
  &-enter-to,
  &-leave-from {
    transform: translateY(0);
    opacity: 1;
  }

  &-enter-from,
  &-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

  &-enter-to {
    transition-duration: 0.7s;
  }

  &-enter-active {
    position: absolute;
    opacity: 0;
  }

  &-leave-active,
  &-enter-active {
    transition: all 0.5s ease;
  }
}
</style>
